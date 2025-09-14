# AlgoFlow practice problems CLI-tool

AlgoFlow provides a CLI-tool for helping users attempt and master LeetCode style practice problems related to Algorithmic learning- directly from your terminal

It provides:
* A library of algorithmic problems covering (bubble_sort, merge_sort, quick_sort, selection_sort,insertion_sort, and binary search)
* Problem details that included descriptions, sample inputs and outputs, as well as specified constraints
* A built-in grader which runs your solution against test cases and gives instant feedback
* A check to see if you really implemented the algorithm in question

### Instalation

```
git clone https://github.com/<your-username>/algoflow-cli.git
cd algoflow-cli
```
Make sure Python 3.8+ is installed to use this tool

### Usage

List available practice libraries:
```
python cli.py algos

Output:

Available algorithms:
- bubble_sort
- quick_sort
- insertion_sort
...
```

List problems in a specific library:
```
python cli.py list bubble`-sort

Output:

Problems for bubble_sort:
1: Bubble Sort Basic Algorithm
...
```

Show full problem details:
```
python cli.py show bubble_sort 1

Output:

Problem 1: Bubble Sort Basic Algorithm

Description: Given an array of unsorted numbers, implement a basic bubble sorting algorithm which takes that input and orders the numbers from lowest to highest using that implementation

Input: An array of numbers arr (1 ≤ len(arr) ≤ 1000).
Output: A new array of strings sorted from lowest to highest using bubble sort

Constraints:
- The sorting must be done using bubble sort. Other sorting implementation will not suffice

Examples:
Input: [6, 3, 2, 5, 9]
Output: [2, 3, 5, 6, 9]

Input: [75, 89, 35, 12, 9, 100]
Output: [9, 12, 35, 75, 89, 100]
```

Submit personal solution file:
```
python cli.py run bubble_sort 1 solution.py

Output:

[PASS] Test 1: input=[6, 3, 2, 5, 9] → output=[2, 3, 5, 6, 9] (swaps=5)
[PASS] Test 2: input=[75, 89, 35, 12, 9, 100] → output=[9, 12, 35, 75, 89, 100] (swaps=8)


Example error output:

[ERROR] Forbidden function used (sorted() or .sort()). You must implement bubble sort manually.
```

### Future plans
* Expand problem sets (quick sort, insertion sort, binary search, etc.)
* Add difficulty levels (Easy, Medium, Hard)
* Track stats: attempts, passes, fails

