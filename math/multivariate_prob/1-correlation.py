#!/usr/bin/env python3
"""Module for calculating a correlation matrix from a covariance matrix."""
import numpy as np


def correlation(C):
    """Calculate a correlation matrix."""
    if not isinstance(C, np.ndarray):
        raise TypeError("C must be a numpy.ndarray")
    if C.ndim != 2 or C.shape[0] != C.shape[1]:
        raise ValueError("C must be a 2D square matrix")
    std = np.sqrt(np.diag(C))
    outer_std = np.outer(std, std)
    return C / outer_std
