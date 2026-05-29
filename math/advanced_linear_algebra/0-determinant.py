#!/usr/bin/env python3
"""Module that calculates the determinant of a matrix."""


def determinant(matrix):
    """Calculate the determinant of a square matrix."""

    # TODO 1: Validate input is a NON-EMPTY list of lists.
    #   - If matrix is not a list, OR it is empty (len 0),
    #     OR any element inside it is not a list,
    #     raise TypeError("matrix must be a list of lists")
    #   Hint: use type(matrix) is list  and  all(... for row in matrix)

    # TODO 2: Handle the special 0x0 matrix.
    #   - If matrix == [[]], return 1

    # TODO 3: Validate it is square.
    #   - Let n = len(matrix)
    #   - If any row's length != n, raise
    #     ValueError("matrix must be a square matrix")

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
