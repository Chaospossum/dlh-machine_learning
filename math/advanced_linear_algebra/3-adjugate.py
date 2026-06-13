#!/usr/bin/env python3
"""Module that calculates the adjugate matrix of a matrix."""


def determinant(matrix):
    """Calculate the determinant of a square matrix."""
    if matrix == [[]]:
        return 1
    n = len(matrix)
    if n == 1:
        return matrix[0][0]
    if n == 2:
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
    det = 0
    for col in range(n):
        sub = [[row[c] for c in range(n) if c != col] for row in matrix[1:]]
        det += (-1) ** col * matrix[0][col] * determinant(sub)
    return det


def cofactor(matrix):
    """Calculate the cofactor matrix of a square matrix."""
    n = len(matrix)
    if n == 1:
        return [[1]]
    cofactors = []
    for i in range(n):
        row = []
        for j in range(n):
            sub = [[matrix[r][c] for c in range(n) if c != j]
                   for r in range(n) if r != i]
            row.append((-1) ** (i + j) * determinant(sub))
        cofactors.append(row)
    return cofactors


def adjugate(matrix):
    """Calculate the adjugate matrix of a square matrix."""
    if type(matrix) is not list or len(matrix) == 0 or not all(
            type(row) is list for row in matrix):
        raise TypeError("matrix must be a list of lists")

    n = len(matrix)
    if not all(len(row) == n for row in matrix) or n == 0:
        raise ValueError("matrix must be a non-empty square matrix")

    cof = cofactor(matrix)
    # The adjugate is the transpose of the cofactor matrix.
    return [[cof[r][c] for r in range(n)] for c in range(n)]
