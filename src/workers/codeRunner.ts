/* Web Worker to safely evaluate user code against tests */

// Types
interface TestCase { input: any[]; expected: any }

function deepEqual(a: any, b: any): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== typeof b) return false;
  if (a && b && typeof a === 'object') {
    if (Array.isArray(a)) {
      if (!Array.isArray(b) || a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
      return true;
    }
    const ak = Object.keys(a); const bk = Object.keys(b);
    if (ak.length !== bk.length) return false;
    for (const k of ak) if (!deepEqual(a[k], (b as any)[k])) return false;
    return true;
  }
  return false;
}

function toDisplay(v: any): string {
  try { return typeof v === 'string' ? v : JSON.stringify(v); } catch { return String(v); }
}

function runWithTimeout(fn: Function, args: any[], ms: number): Promise<any> {
  return new Promise((resolve, reject) => {
    let finished = false;
    const id = setTimeout(() => {
      if (!finished) {
        finished = true;
        reject(new Error('Timeout'));
      }
    }, ms);
    try {
      const res = fn(...args);
      if (res && typeof res.then === 'function') {
        (res as Promise<any>).then((v) => { if (!finished) { finished = true; clearTimeout(id); resolve(v); } })
          .catch((e) => { if (!finished) { finished = true; clearTimeout(id); reject(e); } });
      } else {
        if (!finished) { finished = true; clearTimeout(id); resolve(res); }
      }
    } catch (e) {
      if (!finished) { finished = true; clearTimeout(id); reject(e); }
    }
  });
}

self.onmessage = async (e: MessageEvent) => {
  const { code, functionName, tests, timeoutMs = 2000 } = e.data as { code: string; functionName: string; tests: TestCase[]; timeoutMs?: number };
  let userFn: any;
  try {
    // eslint-disable-next-line no-new-func
    const moduleFactory = new Function(`${code}; return typeof ${functionName} !== 'undefined' ? ${functionName} : null;`);
    userFn = moduleFactory();
  } catch (err: any) {
    (self as any).postMessage({ error: `Compilation error: ${err?.message || String(err)}` });
    return;
  }

  if (typeof userFn !== 'function') {
    (self as any).postMessage({ error: `Function ${functionName} was not found. Please define it exactly.` });
    return;
  }

  const results = [] as Array<{ passed: boolean; input: string; expected: string; actual: string; error?: string; timeMs?: number }>;

  for (const t of tests as TestCase[]) {
    const start = performance.now();
    try {
      const actual = await runWithTimeout(userFn, t.input, timeoutMs);
      const passed = deepEqual(actual, t.expected);
      const timeMs = Math.round(performance.now() - start);
      results.push({
        passed,
        input: toDisplay(t.input),
        expected: toDisplay(t.expected),
        actual: toDisplay(actual),
        timeMs,
      });
    } catch (err: any) {
      const timeMs = Math.round(performance.now() - start);
      results.push({
        passed: false,
        input: toDisplay(t.input),
        expected: toDisplay(t.expected),
        actual: 'Error',
        error: err?.message || String(err),
        timeMs,
      });
    }
  }

  const passedCount = results.filter(r => r.passed).length;
  (self as any).postMessage({ results, summary: `${passedCount}/${results.length} tests passed` });
};
