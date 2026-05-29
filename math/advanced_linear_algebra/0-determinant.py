#!/usr/bin/env python3
"""Module that calculates the determinant of a matrix."""


def determinant(matrix):
    """Calculate the determinant of a square matrix."""

    # Job 1: must be a non-empty list of lists -> else TypeError
    if type(matrix) is not list or len(matrix) == 0 or not all(
            type(row) is list for row in matrix):
        raise TypeError("matrix must be a list of lists")

    # Job 2: special 0x0 matrix [[]] -> determinant is 1
    if matrix == [[]]:
        return 1

    # Job 3: must be square (rows == columns) -> else ValueError
    n = len(matrix)
    if not all(len(row) == n for row in matrix):
        raise ValueError("matrix must be a square matrix")

    # Job 4a: 1x1 matrix -> the single number
    if n == 1:
        return matrix[0][0]

    # Job 4b: 2x2 matrix -> a*d - b*c
    if n == 2:
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]

    # Job 4c: bigger matrix -> cofactor expansion along the first row
    det = 0
    for col in range(n):
        # minor: every row after the first, with column `col` removed
        minor = [[row[c] for c in range(n) if c != col]
                 for row in matrix[1:]]
        sign = (-1) ** col
        det += sign * matrix[0][col] * determinant(minor)
    return det
