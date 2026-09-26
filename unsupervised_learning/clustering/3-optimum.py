#!/usr/bin/env python3
"""Module that tests for the optimum number of clusters by variance."""
import numpy as np
kmeans = __import__('1-kmeans').kmeans
variance = __import__('2-variance').variance


def optimum_k(X, kmin=1, kmax=None, iterations=1000):
    """Test for the optimum number of clusters by variance.

    Args:
        X: numpy.ndarray of shape (n, d) containing the data set.
        kmin: positive integer, minimum number of clusters (inclusive).
        kmax: positive integer, maximum number of clusters (inclusive).
        iterations: positive integer, maximum number of K-means iterations.

    Returns:
        results, d_vars, or None, None on failure.
        results is a list with the outputs of K-means for each cluster size.
        d_vars is a list with the difference in variance from the smallest
        cluster size for each cluster size.
    """
    if not isinstance(X, np.ndarray) or X.ndim != 2:
        return None, None
    if kmax is None:
        kmax = X.shape[0]
    if not isinstance(kmin, int) or kmin <= 0:
        return None, None
    if not isinstance(kmax, int) or kmax <= kmin:
        return None, None
    if not isinstance(iterations, int) or iterations <= 0:
        return None, None

    results = []
    d_vars = []
    for k in range(kmin, kmax + 1):
        C, clss = kmeans(X, k, iterations)
        results.append((C, clss))
        var = variance(X, C)
        if k == kmin:
            first_var = var
        d_vars.append(first_var - var)
    return results, d_vars
