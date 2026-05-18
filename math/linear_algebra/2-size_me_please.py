#!/usr/bin/env python3
"""Module that provides a function to determine the shape of a matrix."""
def matrix_shape(matrix):
    """Return the shape of a matrix as a list of integers."""
    shape = []
    while isinstance(matrix, list):

        shape.append(len(matrix))
        matrix = matrix[0]
    return shape
