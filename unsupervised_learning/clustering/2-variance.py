#!/usr/bin/env python3
"""Module that calculates the total intra-cluster variance."""
import numpy as np


def variance(X, C):
    """Calculate the total intra-cluster variance for a data set.

    Args:
        X: numpy.ndarray of shape (n, d) containing the data set.
        C: numpy.ndarray of shape (k, d) containing the centroid means
            for each cluster.

    Returns:
        var, the total variance, or None on failure.
    """
    if not isinstance(X, np.ndarray) or X.ndim != 2:
        return None
    if not isinstance(C, np.ndarray) or C.ndim != 2:
        return None
    if X.shape[1] != C.shape[1]:
        return None
    dist = np.sum((X[:, np.newaxis] - C) ** 2, axis=2)
    return np.sum(np.min(dist, axis=1))
