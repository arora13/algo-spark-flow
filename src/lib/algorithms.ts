// Algorithm step generators for visualizations
// Keep it simple but accurate, returning a list of states after each meaningful operation

export type SortStep = { array: number[] };
export type SearchStep = { array: number[]; left: number; right: number; mid: number; found: number };

const clone = (arr: number[]) => arr.slice();

function bubbleSortSteps(arr: number[]): SortStep[] {
  const a = clone(arr);
  const steps: SortStep[] = [{ array: clone(a) }];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j] > a[j + 1]) {
        const t = a[j];
        a[j] = a[j + 1];
        a[j + 1] = t;
        steps.push({ array: clone(a) });
      }
    }
  }
  return steps;
}

function insertionSortSteps(arr: number[]): SortStep[] {
  const a = clone(arr);
  const steps: SortStep[] = [{ array: clone(a) }];
  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j--;
      steps.push({ array: clone(a) });
    }
    a[j + 1] = key;
    steps.push({ array: clone(a) });
  }
  return steps;
}

function selectionSortSteps(arr: number[]): SortStep[] {
  const a = clone(arr);
  const steps: SortStep[] = [{ array: clone(a) }];
  for (let i = 0; i < a.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < a.length; j++) {
      if (a[j] < a[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      [a[i], a[minIndex]] = [a[minIndex], a[i]];
      steps.push({ array: clone(a) });
    }
  }
  return steps;
}

function quickSortSteps(arr: number[]): SortStep[] {
  const a = clone(arr);
  const steps: SortStep[] = [{ array: clone(a) }];

  function partition(lo: number, hi: number): number {
    const pivot = a[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      if (a[j] <= pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({ array: clone(a) });
        i++;
      }
    }
    [a[i], a[hi]] = [a[hi], a[i]];
    steps.push({ array: clone(a) });
    return i;
  }

  function qs(lo: number, hi: number) {
    if (lo >= hi) return;
    const p = partition(lo, hi);
    qs(lo, p - 1);
    qs(p + 1, hi);
  }

  qs(0, a.length - 1);
  return steps;
}

function mergeSortSteps(arr: number[]): SortStep[] {
  const a = clone(arr);
  const steps: SortStep[] = [{ array: clone(a) }];
  const aux = new Array(a.length);

  function merge(lo: number, mid: number, hi: number) {
    for (let k = lo; k <= hi; k++) aux[k] = a[k];
    let i = lo, j = mid + 1;
    for (let k = lo; k <= hi; k++) {
      if (i > mid) a[k] = aux[j++];
      else if (j > hi) a[k] = aux[i++];
      else if (aux[j] < aux[i]) a[k] = aux[j++];
      else a[k] = aux[i++];
      steps.push({ array: clone(a) });
    }
  }

  function sort(lo: number, hi: number) {
    if (lo >= hi) return;
    const mid = Math.floor((lo + hi) / 2);
    sort(lo, mid);
    sort(mid + 1, hi);
    merge(lo, mid, hi);
  }

  sort(0, a.length - 1);
  return steps;
}

function binarySearchSteps(arr: number[], target: number): SearchStep[] {
  const a = clone(arr).sort((x, y) => x - y);
  const steps: SearchStep[] = [];
  let left = 0, right = a.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (a[mid] === target) {
      steps.push({ array: clone(a), left, right, mid, found: mid });
      break;
    }
    steps.push({ array: clone(a), left, right, mid, found: -1 });
    if (a[mid] < target) left = mid + 1; else right = mid - 1;
  }
  if (steps.length === 0) steps.push({ array: clone(a), left: 0, right: a.length - 1, mid: -1, found: -1 });
  return steps;
}

export function generateAlgorithmSteps(algorithmId: string, arr: number[], target = 9) {
  switch (algorithmId) {
    case 'merge-sort':
      return mergeSortSteps(arr);
    case 'quick-sort':
      return quickSortSteps(arr);
    case 'bubble-sort':
      return bubbleSortSteps(arr);
    case 'insertion-sort':
      return insertionSortSteps(arr);
    case 'selection-sort':
      return selectionSortSteps(arr);
    case 'binary-search':
      return binarySearchSteps(arr, target);
    default:
      return [{ array: clone(arr) }];
  }
}
