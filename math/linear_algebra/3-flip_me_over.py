#!/usr/bin/env python3
"""Module that provides a function to transpose a 2D matrix """

def matrix_transpose(matrix):
    """Return the transpose of a 2D matrix"""
    num_rows = len(matrix)
    num_cols = len(matrix[0])

    transposed = []
    for i in range(num_cols):
        new_row = []
        for j in(num_rows)
            new_row.append(matrix[j][i])
        transposed.append(new_row)
    return transposed
