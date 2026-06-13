#!/usr/bin/env python3
"""Module that provides a function to add two arrays."""


def add_arrays(arr1, arr2):
    """Return a new list with element-wise sums, or None if shapes differ."""
    if len(arr1) != len(arr2):
        return None

    result = []
    for i in range(len(arr1)):
        result.append(arr1[i] + arr2[i])
    return result
