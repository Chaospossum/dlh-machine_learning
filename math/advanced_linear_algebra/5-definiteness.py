#!/usr/bin/env python3
"""Module that calculates the definiteness of a matrix."""
import numpy as np


def definiteness(matrix):
    """Calculate the definiteness of a matrix."""
    if not isinstance(matrix, np.ndarray):
        raise TypeError("matrix must be a numpy.ndarray")

    # Must be a non-empty square matrix.
    if matrix.ndim != 2 or matrix.shape[0] != matrix.shape[1] or \
            matrix.shape[0] == 0:
        return None

    # Must be symmetric to have a defined definiteness.
    if not np.array_equal(matrix, matrix.T):
        return None

    eigenvalues = np.linalg.eigvals(matrix)

    if np.all(eigenvalues > 0):
        return "Positive definite"
    if np.all(eigenvalues >= 0):
        return "Positive semi-definite"
    if np.all(eigenvalues < 0):
        return "Negative definite"
    if np.all(eigenvalues <= 0):
        return "Negative semi-definite"
    return "Indefinite"
