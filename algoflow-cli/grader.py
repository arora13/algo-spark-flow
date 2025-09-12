#!/usr/bin/env python3
def grade(user_function, problem, hidden_tests=None):
    if not user_function:
        return [{"error": "Solution function not found"}]
    
    test_cases = problem["examples"] + (hidden_tests or [])
    results = []

    for i, test_case in enumerate(test_cases, start=1):
        try:
            user_output = user_function(test_case["input"])
            expected_output = test_case["output"]
            passed = user_output == expected_output
            results.append({
                "test": i,
                "input": test_case["input"],
                "output": user_output,
                "expected": expected_output,
                "passed": passed
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
