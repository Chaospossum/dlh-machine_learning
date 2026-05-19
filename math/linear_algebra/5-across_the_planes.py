#!/usr/bin/env python3
"""Module that provides a function to add two matrices."""


def add_matrices2D(mat1, mat2):
    """Return a new matrix with element-wise sums, or None if shapes differ."""
    if len(mat1) != len(mat2) or len(mat1[0]) != len(mat2[0]):
        return None

    result = []
    for i in range(len(mat1)):
        new_row = []
        for j in range(len(mat1[0])):
            new_row.append(mat1[i][j] + mat2[i][j])
        result.append(new_row)
    return result
