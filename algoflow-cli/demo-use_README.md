### AlgoFlow Quicktime Demo Use CLI-tool

AlgoFlow provides an interactive CLI-tool for helping users gather a visual understanding of algorithms in use for any given list-input

### Instalation

```
git clone https://github.com/<your-username>/algoflow-cli.git
cd algoflow-cli
```
Make sure Python 3.8+ is installed to use this tool

### Usage

Command Structure:

```
python algoflow.py run <algorithm> <numbers...>
```

Example command:

```
python algoflow.py run bubble_sort 6 3 2 5 9

Output:

Running bubble_sort on list: [6, 3, 2, 5, 9]

Swapped 6 and 3. Updated list: [3, 6, 2, 5, 9]
Swapped 6 and 2. Updated list: [3, 2, 6, 5, 9]
Swapped 6 and 5. Updated list: [3, 2, 5, 6, 9]
Swapped 3 and 2. Updated list: [2, 3, 5, 6, 9]
Finished bubble sort algorithm

Sorted list: [2, 3, 5, 6, 9]
```

### Available Algorithms for use

* bubble_sort
* merge_sort 
* quick_sort
* selection_sort 
* insertion_sort
