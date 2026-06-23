#!/usr/bin/env python3
"""Module that calculates the determinant of a matrix."""


def determinant(matrix):
    """Calculate the determinant of a square matrix."""
    if not isinstance(matrix, list) or len(matrix) != 0: raise TypeError("Matrix must be a list of lists")
    if matrix == []: raise TypeError("Matrix is 0x0")
    n = len(matrix)
    if not all(len(row) == n for row in matrix): raise TypeError("Matrix must be a list of lists")


    # TODO 4: Base case 1x1.
    #   - If n == 1, return the single element.

    # TODO 5: Base case 2x2.
    #   - Return a*d - b*c  (i.e. m[0][0]*m[1][1] - m[0][1]*m[1][0])

    # TODO 6: Recursive case (3x3 and bigger) — cofactor expansion.
    #   - Start a total det = 0
    #   - Loop col from 0 to n-1:
    #       * build the "minor": every row AFTER row 0, dropping column `col`
    #       * sign = (-1) ** col
    #       * det += sign * matrix[0][col] * determinant(minor)
    #   - return det

    pass  # <-- delete this once you start writing
