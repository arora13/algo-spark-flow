#!/usr/bin/env python3
import json
import os
import importlib.util

PROBLEMS_FILE = os.path.join(os.path.dirname(__file__), "problems.json")

def load_problems():
    if not os.path.exists(PROBLEMS_FILE):
        raise FileNotFoundError(f"{PROBLEMS_FILE} not found.")
    
    with open(PROBLEMS_FILE, "r") as f:
        return json.load(f)

def list_algorithms(problems):
    return list(problems.keys())

def list_problems_for_algorithm(problems, algorithm):
    return problems.get(algorithm, [])

def get_problem(problems, algorithm, problem_id):
    for problem in problems.get(algorithm, []):
        if str(problem["id"]) == str(problem_id):
            return problem
    return None

def format_problem(problem):
    desc = (
        f"Problem {problem['id']}: {problem['title']}\n\n"
        f"Description: {problem['description']}\n\n"
        f"Input: {problem['input_desc']}\n"
        f"Output: {problem['output_desc']}\n\n"
        f"Constraints:\n- " + "\n- ".join(problem.get("constraints", [])) + "\n\n"
        f"Examples:\n"
    )
    for example in problem["examples"]:
        desc += f"Input: {example['input']}\nOutput: {example['output']}\n\n"
    return desc

def load_user_solution(solution_file, func_name):
    spec = importlib.util.spec_from_file_location("solution", solution_file)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return getattr(module, func_name, None)
