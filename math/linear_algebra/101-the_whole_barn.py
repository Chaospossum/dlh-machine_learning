#!/usr/bin/env python3
"""Module that provides a function to add two matrices."""


def matrix_shape(matrix):
    """Return the shape of a matrix as a list of integers."""
    shape = []
    while isinstance(matrix, list):
        shape.append(len(matrix))
        matrix = matrix[0]
    return shape


def add_matrices(mat1, mat2):
    """Return a new matrix with element-wise sums, or None if shapes differ."""
    if matrix_shape(mat1) != matrix_shape(mat2):
        return None

    if not isinstance(mat1, list):
        return mat1 + mat2

    return [add_matrices(mat1[i], mat2[i]) for i in range(len(mat1))]
