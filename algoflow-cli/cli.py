#!/usr/bin/env python3
import argparse
from utils import (
    load_problems,
    list_algorithms,
    list_problems_for_algorithm,
    get_problem,
    format_problem,
    load_user_solution,
)
from grader import grade

def main():
    parser = argparse.ArgumentParser(description="AlgoFlow: Practice algorithms like LeetCode 🚀")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # list algorithms
    subparsers.add_parser("algos", help="List all available algorithms")

    # list problems for a given algorithm
    list_parser = subparsers.add_parser("list", help="List problems for an algorithm")
    list_parser.add_argument("algorithm", help="Algorithm name (e.g., bubble_sort, quick_sort)")

    # show full problem details
    show_parser = subparsers.add_parser("show", help="Show details of a problem")
    show_parser.add_argument("algorithm", help="Algorithm name")
    show_parser.add_argument("problem_id", help="Problem ID")

    # run solution against test cases
    run_parser = subparsers.add_parser("run", help="Run your solution against test cases")
    run_parser.add_argument("algorithm", help="Algorithm name")
    run_parser.add_argument("problem_id", help="Problem ID")
    run_parser.add_argument("solution_file", help="Path to your solution.py file")

    args = parser.parse_args()
    problems = load_problems()

    if args.command == "algos":
        algos = list_algorithms(problems)
        if not algos:
            print("No algorithms available.")
        else:
            print("Available algorithms:")
            for algo in algos:
                print(f"- {algo}")

    elif args.command == "list":
        problems_for_algo = list_problems_for_algorithm(problems, args.algorithm)
        if not problems_for_algo:
            print(f"No problems found for {args.algorithm}")
        else:
            print(f"Problems for {args.algorithm}:")
            for problem in problems_for_algo:
                print(f"{problem['id']}: {problem['title']}")

    elif args.command == "show":
        problem = get_problem(problems, args.algorithm, args.problem_id)
        if not problem:
            print(f"Problem {args.problem_id} not found for {args.algorithm}")
        else:
            print(format_problem(problem))

    elif args.command == "run":
        problem = get_problem(problems, args.algorithm, args.problem_id)
        if not problem:
            print(f"Problem {args.problem_id} not found for {args.algorithm}")
            return

        solve_fn = load_user_solution(args.solution_file, args.algorithm)
        results = grade(solve_fn, problem, solution_file=args.solution_file)

        for res in results:
            if res.get("error"):
                print(f"[ERROR] {res['error']}")
                continue

            if res["passed"]:
                print(f"[PASS] Test {res['test']}: input={res['input']} → output={res['output']} (swaps={res['swaps']})")
            else:
                print(
                    f"[FAIL] Test {res['test']}: "
                    f"input={res['input']} → expected={res['expected']}, got={res['output']}"
                )

if __name__ == "__main__":
    main()
