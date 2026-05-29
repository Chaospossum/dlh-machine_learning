#!/usr/bin/env python3
"""Module that calculates the determinant of a matrix."""


def determinant(matrix):
    """Calculate the determinant of a square matrix.

    matrix is a list of lists whose determinant should be calculated.
    The list [[]] represents a 0x0 matrix (determinant is 1).
    """
    # --- Check 1: it must be a non-empty list of lists ---
    if type(matrix) is not list or len(matrix) == 0 or not all(
            type(row) is list for row in matrix):
        raise TypeError("matrix must be a list of lists")

    # --- Special case: the 0x0 matrix [[]] has determinant 1 ---
    if matrix == [[]]:
        return 1

    # --- Check 2: it must be square (n rows, each row of length n) ---
    n = len(matrix)
    if not all(len(row) == n for row in matrix):
        raise ValueError("matrix must be a square matrix")

    # --- Base case: 1x1 matrix -> the single number ---
    if n == 1:
        return matrix[0][0]

    # --- Base case: 2x2 matrix -> a*d - b*c ---
    if n == 2:
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]

    # --- Recursive case: cofactor expansion along the first row ---
    det = 0
    for col in range(n):
        # Build the minor: drop row 0 and the current column.
        minor = [[row[c] for c in range(n) if c != col]
                 for row in matrix[1:]]
        # Sign flips +, -, +, -, ... ; multiply by the element; recurse.
        sign = (-1) ** col
        det += sign * matrix[0][col] * determinant(minor)
    return det
