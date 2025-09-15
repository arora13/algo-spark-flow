#!/usr/bin/env python3
import argparse
from utils import load_problems, list_problems_for_algorithm, get_problem, load_user_solution, format_problem
from grader import grade

def main():
    parser = argparse.ArgumentParser(description="AlgoFlow CLI Tool")
    subparsers = parser.add_subparsers(dest="command", required=True)

    # List problems
    list_parser = subparsers.add_parser("list", help="List available problems")
    list_parser.add_argument("algorithm", help="Algorithm name (e.g., bubble_sort, quick_sort)")

    # Run solution
    run_parser = subparsers.add_parser("run", help="Run your solution against test cases")
    run_parser.add_argument("algorithm", help="Algorithm name")
    run_parser.add_argument("problem_id", help="Problem ID (e.g., 1, 2)")
    run_parser.add_argument("solution_file", help="Path to your solution.py file")

    args = parser.parse_args()
    problems = load_problems()

    if args.command == "list":
        problems_for_algo = list_problems_for_algorithm(problems, args.algorithm)
        if not problems_for_algo:
            print(f"No problems found for {args.algorithm}")
        else:
            for problem in problems_for_algo:
                print(f"{problem['id']}: {problem['title']}")

    elif args.command == "run":
        problem = get_problem(problems, args.algorithm, args.problem_id)
        if not problem:
            print(f"Problem {args.problem_id} not found for {args.algorithm}")
            return

        print("\n" + format_problem(problem))

        solve_fn = load_user_solution(args.solution_file, args.algorithm)
        results = grade(solve_fn, problem, solution_file=args.solution_file)

        for res in results:
            if res.get("passed"):
                if "swaps" in res:
                    print(f"[PASS] Test {res['test']}: swaps={res['swaps']} → output={res['output']}")
                else:
                    print(f"[PASS] Test {res['test']}: output={res['output']}")
            else:
                err_msg = res.get("error")
                if err_msg:
                    print(f"[ERROR] Test {res['test']}: {err_msg}")
                else:
                    print(f"[FAIL] Test {res['test']}: input={res['input']} → expected={res['expected']}, got={res['output']}")

if __name__ == "__main__":
    main()
