#!/usr/bin/env python3
"""Module that finds the best number of clusters for a GMM using BIC."""
import numpy as np
expectation_maximization = __import__('8-EM').expectation_maximization


def BIC(X, kmin=1, kmax=None, iterations=1000, tol=1e-5, verbose=False):
    """Find the best number of clusters for a GMM using the BIC.

    Args:
        X: numpy.ndarray of shape (n, d) containing the data set.
        kmin: positive integer, minimum number of clusters (inclusive).
        kmax: positive integer, maximum number of clusters (inclusive).
        iterations: positive integer, maximum number of EM iterations.
        tol: non-negative float, tolerance for the EM algorithm.
        verbose: boolean, whether the EM algorithm prints information.

    Returns:
        best_k, best_result, l, b, or None, None, None, None on failure.
        best_k is the best value for k based on its BIC, best_result is
        the tuple (pi, m, S) for best_k, l is a numpy.ndarray with the log
        likelihood for each cluster size tested, and b is a numpy.ndarray
        with the BIC value for each cluster size tested.
    """
    if not isinstance(X, np.ndarray) or X.ndim != 2:
        return None, None, None, None
    n, d = X.shape
    if kmax is None:
        kmax = n
    if not isinstance(kmin, int) or kmin <= 0 or kmin >= n:
        return None, None, None, None
    if not isinstance(kmax, int) or kmax <= kmin or kmax > n:
        return None, None, None, None
    if not isinstance(iterations, int) or iterations <= 0:
        return None, None, None, None
    if not isinstance(tol, (int, float)) or tol < 0:
        return None, None, None, None
    if not isinstance(verbose, bool):
        return None, None, None, None

    results = []
    lkhd = np.zeros(kmax - kmin + 1)
    b = np.zeros(kmax - kmin + 1)
    for i, k in enumerate(range(kmin, kmax + 1)):
        pi, m, S, _, lkhd[i] = expectation_maximization(
            X, k, iterations, tol, verbose)
        results.append((pi, m, S))
        p = (k - 1) + k * d + k * d * (d + 1) / 2
        b[i] = p * np.log(n) - 2 * lkhd[i]

    best = np.argmin(b)
    return kmin + best, results[best], lkhd, b
