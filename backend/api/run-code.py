#!/usr/bin/env python3
"""
API endpoint to run code using the AlgoFlow CLI tool
"""
import os
import sys
import json
import tempfile
import subprocess
from pathlib import Path

# Add the CLI tool to the path
cli_path = Path(__file__).parent.parent.parent / "algoflow-cli"
sys.path.insert(0, str(cli_path))

from utils import load_problems, get_problem
from grader import grade

def run_code_api(request_data):
    """
    Run code using the AlgoFlow CLI tool and return results
    """
    try:
        # Extract data from request
        code = request_data.get('code', '')
        algorithm = request_data.get('algorithm', '')
        problem_id = request_data.get('problemId', 1)
        file_name = request_data.get('fileName', 'solution.py')
        
        if not code or not algorithm:
            return {"error": "Missing code or algorithm parameter"}
        
        # Load problems
        problems = load_problems()
        
        # Get the specific problem
        problem = get_problem(problems, algorithm, problem_id)
        if not problem:
            return {"error": f"Problem {problem_id} not found for {algorithm}"}
        
        # Create a temporary file with the user's code
        with tempfile.NamedTemporaryFile(mode='w', suffix='.py', delete=False) as temp_file:
            temp_file.write(code)
            temp_file_path = temp_file.name
        
        try:
            # Create a simple solve function wrapper
            def solve_wrapper(input_data):
                # Import the user's code
                import importlib.util
                spec = importlib.util.spec_from_file_location("user_solution", temp_file_path)
                user_module = importlib.util.module_from_spec(spec)
                spec.loader.exec_module(user_module)
                
                # Call the solve function
                if hasattr(user_module, 'solve'):
                    return user_module.solve(input_data)
                else:
                    raise AttributeError("No 'solve' function found in your code")
            
            # Grade the solution
            results = grade(solve_wrapper, problem, solution_file=temp_file_path)
            
            return {"results": results}
            
        finally:
            # Clean up temporary file
            if os.path.exists(temp_file_path):
                os.unlink(temp_file_path)
                
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    # For testing
    test_data = {
        "code": "def solve(input_data):\n    return sorted(input_data)",
        "algorithm": "bubble_sort",
        "problemId": 1,
        "fileName": "test.py"
    }
    
    result = run_code_api(test_data)
    print(json.dumps(result, indent=2))
