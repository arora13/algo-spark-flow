import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import FloatingElements from "@/components/FloatingElements";
import {
  Play,
  Code,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Target,
  Brain,
  HelpCircle,
  Trophy,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import { problemSpecs } from "@/lib/tests";

/* ------------------------------ QUIZ CONTENT ------------------------------- */
type QuizOption = { id: string; text: string; correct: boolean };
type QuizQ = {
  id: string;
  prompt: string;
  options: QuizOption[];
  explanation: string;
};

const quizBank: Record<string, QuizQ[]> = {
  "search-insert": [
    {
      id: "q1",
      prompt: "Binary search’s insertion point (when target is not found) equals…",
      options: [
        { id: "a", text: "Right pointer (r)", correct: false },
        { id: "b", text: "Middle index (m)", correct: false },
        { id: "c", text: "Left pointer (l)", correct: true },
        { id: "d", text: "Last index", correct: false },
      ],
      explanation:
        "When the loop ends without a match, l sits at the first index where the target can be inserted while maintaining order.",
    },
    {
      id: "q2",
      prompt: "Time complexity of binary search on a sorted array is:",
      options: [
        { id: "a", text: "O(n)", correct: false },
        { id: "b", text: "O(log n)", correct: true },
        { id: "c", text: "O(1)", correct: false },
        { id: "d", text: "O(n log n)", correct: false },
      ],
      explanation: "Each step halves the search space, yielding logarithmic complexity.",
    },
    {
      id: "q3",
      prompt: "Which loop condition is the most common for iterative binary search?",
      options: [
        { id: "a", text: "while (l < r)", correct: false },
        { id: "b", text: "while (l <= r)", correct: true },
        { id: "c", text: "while (true)", correct: false },
        { id: "d", text: "while (m)", correct: false },
      ],
      explanation:
        "Both patterns appear in practice, but the classic inclusive range uses while (l <= r).",
    },
  ],
  "kth-largest": [
    {
      id: "q1",
      prompt: "Quickselect’s average time complexity to find the k-th largest is:",
      options: [
        { id: "a", text: "O(n)", correct: true },
        { id: "b", text: "O(log n)", correct: false },
        { id: "c", text: "O(n log n)", correct: false },
        { id: "d", text: "O(n²)", correct: false },
      ],
      explanation: "Average case is linear; worst case is quadratic without good pivoting.",
    },
    {
      id: "q2",
      prompt: "After partitioning around a pivot p, which side do we recurse on?",
      options: [
        { id: "a", text: "Always left side", correct: false },
        { id: "b", text: "Always right side", correct: false },
        { id: "c", text: "The side that contains the k-th index", correct: true },
        { id: "d", text: "Both sides", correct: false },
      ],
      explanation:
        "Only the side that contains the answer matters, which gives the O(n) average time.",
    },
  ],
  "merge-intervals": [
    {
      id: "q1",
      prompt: "First step in merging intervals is usually:",
      options: [
        { id: "a", text: "Reverse the list", correct: false },
        { id: "b", text: "Sort by start time", correct: true },
        { id: "c", text: "Sort by end time", correct: false },
        { id: "d", text: "Use a stack to reverse", correct: false },
      ],
      explanation: "Sorting by start time lets you scan in one pass and merge overlaps.",
    },
  ],
};

/* ------------------------------- UTILITIES -------------------------------- */
const sanitize = (s: string) =>
  // keep newlines; only collapse runs of spaces/tabs (not \n)
  s.replace(/[^\S\r\n]{2,}/g, " ").trim();

/** Execute tests in the page as a fallback when the Worker is not available. */
function runTestsInPage(
  code: string,
  functionName: string,
  tests: Array<{ input: any[]; expected: any }>
) {
  const results: Array<{ passed: boolean; input: string; expected: string; actual: string }> = [];
  try {
    // Build a Function that defines user's code and returns the named function
    const factory = new Function(
      `"use strict";
${code}
if (typeof ${functionName} !== "function") { throw new Error("Function \`${functionName}\` not found"); }
return ${functionName};`
    );
    const fn = factory();

    for (const t of tests) {
      let actual: any;
      let passed = false;
      try {
        actual = fn(...t.input);
        // simple deep-ish compare by JSON stringify (good enough for our use)
        passed = JSON.stringify(actual) === JSON.stringify(t.expected);
      } catch (err: any) {
        actual = `Error: ${err?.message || String(err)}`;
      }
      results.push({
        passed,
        input: JSON.stringify(t.input),
        expected: JSON.stringify(t.expected),
        actual: typeof actual === "string" ? actual : JSON.stringify(actual),
      });
    }
    return { ok: true, results };
  } catch (err: any) {
    return { ok: false, error: err?.message || String(err) };
  }
}

/* -------------------------- PRACTICE PAGE COMPONENT ------------------------- */
const Practice = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string | null>(null);
  const [selectedProblem, setSelectedProblem] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<
    Array<{ passed: boolean; input: string; expected: string; actual: string }>
  >([]);

  // Quiz state
  const [quizSelections, setQuizSelections] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Worker state
  const workerRef = useRef<Worker | null>(null);
  const [workerReady, setWorkerReady] = useState(false);

  useEffect(() => {
    let w: Worker | null = null;
    try {
      // NOTE: keep the SAME relative path structure you had when it worked.
      // If your worker file is at src/workers/codeRunner.ts and this page is src/pages/Practice.tsx,
      // the following relative import is correct for Vite.
      w = new Worker(new URL("../workers/codeRunner.ts", import.meta.url), { type: "module" });
      workerRef.current = w;
      setWorkerReady(true);
      w.onmessage = (e: MessageEvent) => {
        if (e.data?.error) {
          setOutput(sanitize(`Error: ${e.data.error}`));
          setTestResults([]);
          setIsRunning(false);
          return;
        }
        const results = (e.data?.results || []).map((r: any) => ({
          passed: !!r.passed,
          input: String(r.input),
          expected: String(r.expected),
          actual: String(r.actual),
        }));
        const passedCount = results.filter((r: any) => r.passed).length;
        setTestResults(results);
        setOutput(
          sanitize(`Execution completed!\nResults: ${passedCount}/${results.length} test cases passed`)
        );
        setIsRunning(false);
      };
      w.onerror = (err) => {
        setWorkerReady(false);
        setOutput(sanitize(`Runner error (worker): ${String(err.message || err)}`));
      };
    } catch (err: any) {
      setWorkerReady(false);
      setOutput(sanitize(`Runner setup failed: ${err?.message || String(err)}`));
    }
    return () => {
      w?.terminate();
      workerRef.current = null;
    };
  }, []);

  // Reset quiz + console when switching problems
  useEffect(() => {
    setQuizSelections({});
    setQuizSubmitted(false);
    setOutput("");
    setTestResults([]);
    setCode("");
  }, [selectedProblem]);

  /* --------------------------------- DATA --------------------------------- */
  const algorithms = [
    {
      id: "merge-sort",
      name: "Merge Sort",
      description: "Master divide and conquer with these challenging problems",
      problemCount: 3,
      difficulty: "Medium",
      color: "from-blue-500 to-cyan-400",
    },
    {
      id: "quick-sort",
      name: "Quick Sort",
      description: "Practice partitioning and pivot selection strategies",
      problemCount: 3,
      difficulty: "Medium",
      color: "from-purple-500 to-pink-400",
    },
    {
      id: "binary-search",
      name: "Binary Search",
      description: "Perfect your search skills with these curated challenges",
      problemCount: 3,
      difficulty: "Easy",
      color: "from-emerald-500 to-green-400",
    },
    {
      id: "sorting-basics",
      name: "Sorting Fundamentals",
      description: "Build foundation with bubble, insertion, and selection sort",
      problemCount: 4,
      difficulty: "Easy",
      color: "from-amber-400 to-orange-400",
    },
  ] as const;

  const problems = {
    "merge-sort": [
      {
        id: "merge-intervals",
        title: "Merge Intervals",
        difficulty: "Medium",
        description:
          "Given an array of intervals, merge all overlapping intervals and return an array of non-overlapping intervals.",
        detailedDescription:
          "Sort by start time, then linearly merge overlaps — similar to merging runs in merge sort.",
        keyPoints: ["Sort by start", "Linear scan", "Merge overlaps"],
        hints: [
          "Sort intervals by start time.",
          "Keep a result array; compare current.start with last.end.",
          "If overlapping, update last.end = max(last.end, current.end).",
        ],
        examples: [
          {
            input: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
            output: "[[1,6],[8,10],[15,18]]",
            explanation: "Since [1,3] & [2,6] overlap, they merge into [1,6].",
          },
        ],
        template: `function merge(intervals) {
  intervals.sort((a,b) => a[0]-b[0]);
  const res = [];
  for (const iv of intervals) {
    if (!res.length || res[res.length-1][1] < iv[0]) {
      res.push([...iv]);
    } else {
      res[res.length-1][1] = Math.max(res[res.length-1][1], iv[1]);
    }
  }
  return res;
}`,
      },
    ],
    "quick-sort": [
      {
        id: "kth-largest",
        title: "Kth Largest Element",
        difficulty: "Medium",
        description: "Find the k-th largest element in an unsorted array using quickselect.",
        detailedDescription:
          "Partition the array; recurse into the side that contains the k-th largest.",
        keyPoints: ["Quickselect", "Partitioning", "Average O(n)"],
        hints: [
          "Convert k-th largest to index n-k in 0-indexed sorted order.",
          "Use Lomuto or Hoare partition; only recurse on relevant side.",
        ],
        examples: [
          {
            input: "nums=[3,2,1,5,6,4], k=2",
            output: "5",
            explanation: "Second largest is 5.",
          },
        ],
        template: `function findKthLargest(nums, k) {
  const target = nums.length - k;
  let l = 0, r = nums.length - 1;
  const swap = (i,j) => ([nums[i], nums[j]] = [nums[j], nums[i]]);
  while (l <= r) {
    const p = r;
    let i = l;
    for (let j = l; j < r; j++) if (nums[j] <= nums[p]) swap(i++, j);
    swap(i, p);
    if (i === target) return nums[i];
    if (i < target) l = i + 1; else r = i - 1;
  }
  return -1;
}`,
      },
    ],
    "binary-search": [
      {
        id: "search-insert",
        title: "Search Insert Position",
        difficulty: "Easy",
        description:
          "Given a sorted array and a target value, return the index where target should be inserted.",
        detailedDescription: "Binary search variant that returns insertion point when not found.",
        keyPoints: ["Binary search", "Insertion index", "Sorted array"],
        hints: [
          "Classic while (l <= r) with mid check.",
          "Return l when not found.",
        ],
        examples: [
          { input: "nums=[1,3,5,6], target=5", output: "2", explanation: "5 exists at index 2." },
          { input: "nums=[1,3,5,6], target=2", output: "1", explanation: "Insert at index 1." },
        ],
        template: `function searchInsert(nums, target) {
  let l = 0, r = nums.length - 1;
  while (l <= r) {
    const m = (l + r) >> 1;
    if (nums[m] === target) return m;
    if (nums[m] < target) l = m + 1; else r = m - 1;
  }
  return l;
}`,
      },
    ],
    "sorting-basics": [],
  } as const;

  /* ------------------------------ CODE RUNNER ------------------------------ */
  const handleRunCode = async () => {
    if (!selectedProblem) return;
    setIsRunning(true);
    setOutput(sanitize("Running your solution...\nExecuting test cases..."));

    const spec = problemSpecs[selectedProblem];
    if (!spec) {
      setOutput(sanitize("No tests available for this problem yet."));
      setIsRunning(false);
      return;
    }

    const algorithmProblems = problems[selectedAlgorithm as keyof typeof problems] as unknown as any[] || [];
    const currentProblem = algorithmProblems.find((p: any) => p.id === selectedProblem);
    const codeToRun = code || currentProblem?.template || "";

    // Prefer Worker; fall back to in-page runner if worker isn't ready
    if (workerReady && workerRef.current) {
      try {
        workerRef.current.postMessage({
          code: codeToRun,
          functionName: spec.functionName,
          tests: spec.tests,
          timeoutMs: 2500,
        });
        return; // results handled in onmessage
      } catch (err: any) {
        setOutput(sanitize(`Runner postMessage failed: ${err?.message || String(err)}\nFalling back...`));
      }
    }

    // Fallback path
    const fallback = runTestsInPage(codeToRun, spec.functionName, spec.tests);
    if (!fallback.ok) {
      setOutput(sanitize(`Error: ${fallback.error}`));
      setTestResults([]);
      setIsRunning(false);
      return;
    }
    const results = fallback.results;
    const passedCount = results.filter((r) => r.passed).length;
    setTestResults(results);
    setOutput(
      sanitize(`Execution completed!\nResults: ${passedCount}/${results.length} test cases passed`)
    );
    setIsRunning(false);
  };

  /* ------------------------------- RENDERING ------------------------------- */

  // Algorithm selection
  if (!selectedAlgorithm) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-[#0b1f24] text-white">
        <FloatingElements />
        <div className="relative z-10 pt-28 pb-20">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl lg:text-6xl font-extrabold mb-4">Algorithm Practice</h1>
              <p className="text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
                Build real intuition with focused challenges and instant feedback.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {algorithms.map((algorithm, index) => (
                <motion.div
                  key={algorithm.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedAlgorithm(algorithm.id)}
                  className="group cursor-pointer"
                >
                  <Card className="bg-white/[0.06] border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 h-full rounded-2xl">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div
                          className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${algorithm.color} flex items-center justify-center shadow-lg`}
                        >
                          <Code className="h-7 w-7 text-white" />
                        </div>
                        <Badge
                          variant={algorithm.difficulty === "Easy" ? "secondary" : "outline"}
                          className="text-sm font-medium"
                        >
                          {algorithm.difficulty}
                        </Badge>
                      </div>

                      <h3 className="text-2xl font-bold mb-3">{algorithm.name}</h3>
                      <p className="text-white/80 mb-6 leading-relaxed text-lg">
                        {algorithm.description}
                      </p>

                      <div className="flex items-center justify-between text-white/80">
                        <span className="font-medium">{algorithm.problemCount} challenges</span>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">Start Practice</span>
                          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Problem list
  if (!selectedProblem) {
    const algorithmProblems = problems[selectedAlgorithm as keyof typeof problems] || [];
    const currentAlgorithm = algorithms.find((a) => a.id === selectedAlgorithm);

    return (
      <div className="min-h-screen relative overflow-hidden bg-[#0b1f24] text-white">
        <FloatingElements />
        <div className="relative z-10 pt-28 pb-20">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
              <Button
                onClick={() => setSelectedAlgorithm(null)}
                variant="ghost"
                className="mb-6 text-white/90 hover:text-white hover:bg-white/10 p-3 rounded-xl"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Algorithms
              </Button>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">{currentAlgorithm?.name} Challenges</h1>
              <p className="text-xl text-white/85">{currentAlgorithm?.description}</p>
            </motion.div>

            <div className="space-y-6">
              {algorithmProblems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  whileHover={{ y: -4 }}
                  onClick={() => setSelectedProblem(problem.id)}
                  className="group cursor-pointer"
                >
                  <Card className="bg-white/[0.06] border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-start space-x-6">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">{problem.title}</h3>
                            <p className="text-white/85 leading-relaxed text-lg mb-3">{problem.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {problem.keyPoints?.map((point, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 bg-emerald-500/15 text-emerald-300 rounded-full text-sm font-medium border border-emerald-400/20"
                                >
                                  {point}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={
                            problem.difficulty === "Easy"
                              ? "secondary"
                              : problem.difficulty === "Medium"
                              ? "outline"
                              : "destructive"
                          }
                          className="text-sm font-medium"
                        >
                          {problem.difficulty}
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between text-white/75">
                        <div className="flex items-center space-x-4 text-sm">
                          <span>{problem.examples?.length || 1} example{(problem.examples?.length || 1) > 1 ? "s" : ""}</span>
                          <span>•</span>
                          <span>{problem.hints?.length || 0} hint{(problem.hints?.length || 0) !== 1 ? "s" : ""}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold mr-2">Solve Challenge</span>
                          <Target className="h-5 w-5 group-hover:scale-110 transition-transform" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Problem detail
  const algorithmProblems = problems[selectedAlgorithm as keyof typeof problems] as unknown as any[] || [];
  const currentProblem = algorithmProblems.find((p: any) => p.id === selectedProblem);
  const currentAlgorithm = algorithms.find((a) => a.id === selectedAlgorithm);
  if (!currentProblem) return null;

  const quizForProblem = quizBank[selectedProblem] || [];
  const correctCount = quizForProblem.filter(
    (q) => quizSelections[q.id] && q.options.find((o) => o.id === quizSelections[q.id])?.correct
  ).length;

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0b1f24] text-white">
      <FloatingElements />
      <div className="relative z-10 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="mb-6">
            <Button
              onClick={() => setSelectedProblem(null)}
              variant="ghost"
              className="text-white/90 hover:text-white hover:bg-white/10 p-3 rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to {currentAlgorithm?.name} Problems
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Problem description */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-3xl font-extrabold">{currentProblem.title}</CardTitle>
                    <Badge
                      variant={
                        currentProblem.difficulty === "Easy"
                          ? "secondary"
                          : currentProblem.difficulty === "Medium"
                          ? "outline"
                          : "destructive"
                      }
                    >
                      {currentProblem.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/85 leading-relaxed text-lg mb-4">{currentProblem.description}</p>

                    <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-2xl p-5 mb-4">
                      <div className="flex items-start space-x-3">
                        <Brain className="h-6 w-6 text-emerald-300 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-emerald-200 mb-1">Algorithm Connection</h4>
                          <p className="text-emerald-100/90 leading-relaxed">{currentProblem.detailedDescription}</p>
                        </div>
                      </div>
                    </div>

                    {currentProblem.keyPoints && (
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2 flex items-center">
                          <Target className="h-5 w-5 text-emerald-300 mr-2" />
                          Key Concepts
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {currentProblem.keyPoints.map((point, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-emerald-500/15 text-emerald-200 rounded-lg text-sm font-medium border border-emerald-400/20"
                            >
                              {point}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <h4 className="text-lg font-semibold mb-2 flex items-center">
                      <Lightbulb className="h-5 w-5 text-yellow-300 mr-2" />
                      Examples
                    </h4>

                    {currentProblem.examples.map((example, index) => (
                      <div key={index} className="bg-white/[0.06] p-5 rounded-2xl mb-3 border border-white/10">
                        <div className="space-y-3">
                          <div className="bg-white/5 p-3 rounded-xl">
                            <span className="font-semibold block mb-1">Input:</span>
                            <code className="text-sm bg-black/30 px-3 py-2 rounded-lg border border-white/10 block">
                              {example.input}
                            </code>
                          </div>
                          <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-400/20">
                            <span className="font-semibold block mb-1">Output:</span>
                            <code className="text-sm bg-black/30 px-3 py-2 rounded-lg border border-white/10 block">
                              {example.output}
                            </code>
                          </div>
                          <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-400/20">
                            <span className="font-semibold block mb-1">Explanation:</span>
                            <p className="text-sm text-white/90 leading-relaxed">{example.explanation}</p>
                          </div>
                        </div>
                      </div>
                    ))}

                    {currentProblem.hints && (
                      <div className="mt-4">
                        <h4 className="text-lg font-semibold mb-2 flex items-center">
                          <HelpCircle className="h-5 w-5 text-purple-300 mr-2" />
                          Hints
                        </h4>
                        <div className="space-y-2">
                          {currentProblem.hints.map((hint, index) => (
                            <div key={index} className="bg-purple-500/10 border border-purple-400/20 p-3 rounded-xl">
                              <p className="text-purple-100/90 text-sm leading-relaxed">
                                <strong>Hint {index + 1}:</strong> {hint}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Editor + Console + Results + Quiz */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="space-y-6">
              {/* Editor */}
              <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold flex items-center">
                      <Code className="mr-3 h-6 w-6 text-blue-300" />
                      Code Editor
                    </CardTitle>
                    <div className="flex space-x-3">
                      <Button
                        onClick={() =>
                          setOutput(
                            sanitize(
                              "Hint: " +
                                (currentProblem.hints?.[0] ||
                                  "Think about the key properties of " +
                                    (currentAlgorithm?.name.toLowerCase() || "the algorithm") +
                                    " and how they apply to this problem.")
                            )
                          )
                        }
                        variant="outline"
                        size="sm"
                        className="border-yellow-400/30 text-yellow-200 hover:bg-yellow-400/10"
                      >
                        <HelpCircle className="h-4 w-4 mr-2" />
                        Get Hint
                      </Button>
                      <Button
                        onClick={handleRunCode}
                        disabled={isRunning}
                        className="bg-white text-[#0b1f24] hover:bg-gray-200 font-semibold shadow-lg"
                      >
                        {isRunning ? (
                          <>
                            <div className="animate-spin h-4 w-4 mr-2 border-2 border-[#0b1f24] border-t-transparent rounded-full" />
                            Running...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Run Code
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-2xl p-6 bg-[#0c121b] border border-white/10">
                    <Textarea
                      value={code || currentProblem.template}
                      onChange={(e) => setCode(e.target.value)}
                      className="min-h-[360px] bg-transparent border-0 text-emerald-300 font-mono text-sm resize-none focus-visible:ring-0 placeholder:text-white/50"
                      placeholder="Write your solution here..."
                    />
                    {!workerReady && (
                      <p className="mt-3 text-xs text-white/60">
                        (Running in fallback mode because the sandbox worker isn’t ready)
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Console */}
              <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl font-bold flex items-center">
                    <Brain className="mr-2 h-6 w-6 text-purple-300" />
                    Console Output
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-[#0c121b] rounded-2xl p-6 font-mono text-sm min-h-[140px] border border-white/10">
                    <pre className="text-emerald-300 whitespace-pre-wrap leading-relaxed">
                      {output ||
                        'Welcome to AlgoFlow Practice.\n\nWrite your solution and click "Run Code".\nUse "Get Hint" if you need guidance.\n\nHappy coding!'}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Test Results */}
              {testResults.length > 0 && (
                <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold flex items-center">
                      <Trophy className="mr-2 h-6 w-6 text-amber-300" />
                      Test Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {testResults.map((test, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.06 }}
                          className={`p-4 rounded-xl border-l-4 ${
                            test.passed ? "border-emerald-500 bg-emerald-500/10" : "border-red-500 bg-red-500/10"
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-1">
                            {test.passed ? (
                              <CheckCircle className="h-5 w-5 text-emerald-400" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-400" />
                            )}
                            <span className="font-semibold">{test.input}</span>
                          </div>
                          {!test.passed && (
                            <div className="text-sm space-y-1 ml-8">
                              <div className="text-red-200">
                                Expected:{" "}
                                <code className="bg-black/30 px-2 py-1 rounded border border-white/10">
                                  {test.expected}
                                </code>
                              </div>
                              <div className="text-red-200">
                                Got:{" "}
                                <code className="bg-black/30 px-2 py-1 rounded border border-white/10">
                                  {test.actual}
                                </code>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quiz */}
              {quizForProblem.length > 0 && (
                <Card className="bg-white/[0.06] border border-white/10 shadow-xl rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-bold">📝 Quick Check</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {quizForProblem.map((q, idx) => {
                      const selected = quizSelections[q.id];
                      const correctOpt = q.options.find((o) => o.correct)?.id;
                      return (
                        <div key={q.id} className="p-4 rounded-xl bg-white/[0.04] border border-white/10">
                          <div className="flex items-start gap-3">
                            <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center font-bold">
                              {idx + 1}
                            </div>
                            <div className="flex-1">
                              <p className="mb-3 text-white/90">{q.prompt}</p>
                              <div className="grid sm:grid-cols-2 gap-2">
                                {q.options.map((opt) => {
                                  const isPicked = selected === opt.id;
                                  const showCorrect = quizSubmitted && opt.id === correctOpt;
                                  const showWrong = quizSubmitted && isPicked && !opt.correct;
                                  return (
                                    <button
                                      key={opt.id}
                                      onClick={() =>
                                        !quizSubmitted &&
                                        setQuizSelections((s) => ({ ...s, [q.id]: opt.id }))
                                      }
                                      className={[
                                        "text-left px-4 py-3 rounded-lg border transition",
                                        "bg-white/[0.03] border-white/10 hover:bg-white/[0.08]",
                                        isPicked && !quizSubmitted ? "ring-2 ring-emerald-400/50" : "",
                                        showCorrect ? "bg-emerald-500/15 border-emerald-400/30" : "",
                                        showWrong ? "bg-red-500/15 border-red-400/30" : "",
                                      ].join(" ")}
                                    >
                                      <span className="font-medium">{opt.text}</span>
                                      {quizSubmitted && showCorrect && <span className="ml-2">✅</span>}
                                      {quizSubmitted && showWrong && <span className="ml-2">❌</span>}
                                    </button>
                                  );
                                })}
                              </div>
                              {quizSubmitted && (
                                <p className="mt-3 text-sm text-white/80">
                                  <span className="font-semibold">Why: </span>
                                  {q.explanation}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="flex items-center justify-between pt-2">
                      {!quizSubmitted ? (
                        <Button
                          onClick={() => setQuizSubmitted(true)}
                          className="bg-white text-[#0b1f24] hover:bg-gray-200 font-semibold"
                        >
                          Grade Quiz
                        </Button>
                      ) : (
                        <>
                          <div className="text-white/90 font-semibold">
                            Score: {correctCount}/{quizForProblem.length}
                          </div>
                          <div className="space-x-2">
                            <Button
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                              onClick={() => {
                                setQuizSelections({});
                                setQuizSubmitted(false);
                              }}
                            >
                              Reset
                            </Button>
                            <Button
                              className={`${
                                testResults.every((t) => t.passed)
                                  ? "bg-white text-[#0b1f24] hover:bg-gray-200"
                                  : "bg-white/20 text-white/70 cursor-not-allowed"
                              } font-semibold`}
                              disabled={!testResults.every((t) => t.passed)}
                            >
                              Submit Solution
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Practice;
