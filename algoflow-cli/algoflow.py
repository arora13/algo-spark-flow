#!/usr/bin/env
import argparse
import time

def bubble_sort(arr):
    print(f"Running bubble_sort on list: {arr}\n")
    time.sleep(1)
    swap_counter = 1
    while swap_counter != 0:
        swap_counter = 0
        for i in range (1,len(arr)):
            num1 = arr[i-1]
            num2 = arr[i]
            if num1 > num2:
                temp = num2
                arr[i] = num1
                arr[i-1] = temp
                swap_counter+=1
                print(f"Swapped {num1} and {num2}. Updated list: {arr}")
                time.sleep(1)
    print("Finished bubble sort algorithm\n")
    time.sleep(1)
    return arr



def merge_sort(arr, delay=1):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid], delay)
    right = merge_sort(arr[mid:], delay)
    return merge(left, right, delay)

def merge(left, right, delay=1):
    result = []
    i = j = 0
    print(f"Merging {left} and {right}")
    time.sleep(delay)

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
        print(f"  Partial merged list: {result}")
        time.sleep(delay)

    while i < len(left):
        result.append(left[i])
        i += 1
        print(f"  Partial merged list: {result}")
        time.sleep(delay)

    while j < len(right):
        result.append(right[j])
        j += 1
        print(f"  Partial merged list: {result}")
        time.sleep(delay)

    print(f"Result after merge: {result}\n")
    time.sleep(delay)
    return result


def quick_sort(arr):
    print(f"Running quick_sort on list: {arr}\n")
    time.sleep(1)
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr)//2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)


def selection_sort(arr):
    print(f"Running selection_sort on list: {arr}\n")
    time.sleep(1)
    for i in range (len(arr)-1):
        current_min = i
        print(f"Current minimum: {arr[i]} at index {i}\n")
        time.sleep(1)
        for j in range (i+1, len(arr)):
            if arr[j] < arr[current_min]:
                current_min = j
        print(f"Selected minimum after traversal: {arr[current_min]} at index {current_min}")
        time.sleep(1)
        arr[i],arr[current_min] = arr[current_min],arr[i]
        print(f"Updated list after swap: {arr}\n")
        time.sleep(1)
    return arr

def insertion_sort(arr):
    print(f"Running insertion_sort on list: {arr}\n")
    time.sleep(1)
    for i in range(1, len(arr)):
        j = i
        print(f"Inserting element at index {i-1}: {arr[i]}")
        time.sleep(1)
        while j > 0 and arr[j-1] > arr[j]:
            print(f"{arr[j-1]} is greater than {arr[j]}. Shifting {arr[j-1]} to the right")
            time.sleep(1)
            arr[j-1],arr[j] = arr[j],arr[j-1]
            print(f"Updated list: {arr}")
            time.sleep(1)
            j-=1
        print(f"Placed {arr[j]} at index {j}, list now: {arr}\n")
        time.sleep(1)
    return arr


def run_algorithm(algo_name, arr):
    algorithms = {
        "bubble_sort": bubble_sort,
        "merge_sort": merge_sort,
        "quick_sort": quick_sort,
        "selection_sort": selection_sort,
        "insertion_sort": insertion_sort
    }
    if algo_name in algorithms:
        sorted_arr = algorithms[algo_name](arr)
        print(f"Sorted list: {sorted_arr}")
    else:
        print(f"Unknown algorithm: {algo_name}")
    
if __name__ == "__main__":
    parser = argparse.ArgumentParser(prog="algoflow", description="AlgoFlow quicktime CLI Tool")
    subparsers = parser.add_subparsers(dest="command")

    run_parser = subparsers.add_parser("run", help="Run a specifc Algorithm")
    run_parser.add_argument("algorithm", help="Algorithm name") 
    run_parser.add_argument("numbers", nargs="*", type=int, help="List of numbers")

    args = parser.parse_args()

    if args.command == "run":
        nums = args.numbers
        if not nums:
            user_input = input("Enter numbers separated by spaces: ")
            nums = list(map(int, user_input.strip().split()))
        run_algorithm(args.algorithm, nums)
    else:
        parser.print_help()
