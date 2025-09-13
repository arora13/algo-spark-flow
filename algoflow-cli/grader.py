#!/usr/bin/env python3
import ast

# --- helper: check for forbidden calls ---
def uses_forbidden_calls(solution_file, forbidden=("sorted", ".sort")):
    with open(solution_file, "r") as f:
        code = f.read()
    return any(fword in code for fword in forbidden)

# --- helper: check if code at least resembles bubble sort ---
def looks_like_bubble_sort(solution_file):
    """Lightweight AST check: must have nested loops + comparisons"""
    with open(solution_file, "r") as f:
        tree = ast.parse(f.read())

    loops = [node for node in ast.walk(tree) if isinstance(node, ast.For)]
    comparisons = [node for node in ast.walk(tree) if isinstance(node, ast.Compare)]
    return len(loops) >= 2 and len(comparisons) > 0

# --- main grading function ---
def grade(user_function, problem, hidden_tests=None, solution_file=None):
    if not user_function:
        return [{"error": "Solution function not found"}]

    # check for forbidden cheats
    if solution_file and uses_forbidden_calls(solution_file):
        return [{
            "error": "Forbidden function used (sorted() or .sort()). "
                     "You must implement bubble sort manually."
        }]

    # (optional) check structure looks like bubble sort
    if solution_file and not looks_like_bubble_sort(solution_file):
        return [{
            "error": "Solution does not appear to implement bubble sort "
                     "(missing nested loops or comparisons)."
        }]

    test_cases = problem["examples"] + (hidden_tests or [])
    results = []

    for i, test_case in enumerate(test_cases, start=1):
        input_copy = test_case["input"][:]

        try:
            # Track swaps by wrapping list
            swap_count = {"count": 0}

            class TrackList(list):
                def __setitem__(self, idx, value):
                    if 0 <= idx < len(self) - 1 and (self[idx] != value):
                        swap_count["count"] += 1
                    super().__setitem__(idx, value)

            tracked = TrackList(input_copy)
            user_output = user_function(tracked)

            expected_output = test_case["output"]

            passed = user_output == expected_output and swap_count["count"] > 0

            results.append({
                "test": i,
                "input": test_case["input"],
                "output": user_output,
                "expected": expected_output,
                "passed": passed,
                "swaps": swap_count["count"],
            })

        except Exception as e:
            results.append({
                "test": i,
                "input": test_case["input"],
                "output": str(e),
                "expected": test_case["output"],
                "passed": False
            })

    return results
