#!/usr/bin/env python3
"""K-means clustering"""
import numpy as np


def kmeans(X, k, iterations=1000):
    """Performs K-means on a dataset"""
    if not isinstance(X, np.ndarray) or X.ndim != 2:
        return None, None
    if not isinstance(k, int) or k <= 0:
        return None, None
    if not isinstance(iterations, int) or iterations <= 0:
        return None, None

    n, d = X.shape
    low = np.min(X, axis=0)
    high = np.max(X, axis=0)
    C = np.random.uniform(low, high, size=(k, d))

    for _ in range(iterations):
        prev = np.copy(C)

        dist = np.linalg.norm(X[:, np.newaxis] - C, axis=2)
        clss = np.argmin(dist, axis=1)

        for j in range(k):
            points = X[clss == j]
            if points.shape[0] == 0:
                C[j] = np.random.uniform(low, high, size=(1, d))
            else:
                C[j] = np.mean(points, axis=0)

        if np.array_equal(prev, C):
            return C, clss

    dist = np.linalg.norm(X[:, np.newaxis] - C, axis=2)
    clss = np.argmin(dist, axis=1)

    return C, clss
