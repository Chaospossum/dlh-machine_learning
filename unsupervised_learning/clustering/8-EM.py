#!/usr/bin/env python3
"""Module that performs expectation maximization for a GMM."""
import numpy as np
initialize = __import__('4-initialize').initialize
expectation = __import__('6-expectation').expectation
maximization = __import__('7-maximization').maximization


def expectation_maximization(X, k, iterations=1000, tol=1e-5,
                             verbose=False):
    """Perform the expectation maximization for a GMM.

    Args:
        X: numpy.ndarray of shape (n, d) containing the data set.
        k: positive integer containing the number of clusters.
        iterations: positive integer, maximum number of iterations.
        tol: non-negative float, tolerance of the log likelihood used for
            early stopping.
        verbose: boolean, whether to print the log likelihood every 10
            iterations and after the last iteration.

    Returns:
        pi, m, S, g, l, or None, None, None, None, None on failure.
    """
    if not isinstance(X, np.ndarray) or X.ndim != 2:
        return None, None, None, None, None
    if not isinstance(k, int) or k <= 0:
        return None, None, None, None, None
    if not isinstance(iterations, int) or iterations <= 0:
        return None, None, None, None, None
    if not isinstance(tol, (int, float)) or tol < 0:
        return None, None, None, None, None
    if not isinstance(verbose, bool):
        return None, None, None, None, None

    pi, m, S = initialize(X, k)
    g, lkhd = expectation(X, pi, m, S)
    i = 0
    while i < iterations:
        if verbose and i % 10 == 0:
            print("Log Likelihood after {} iterations: {}".format(
                i, round(lkhd, 5)))
        pi, m, S = maximization(X, g)
        l_prev = lkhd
        g, lkhd = expectation(X, pi, m, S)
        i += 1
        if abs(lkhd - l_prev) <= tol:
            break
    if verbose:
        print("Log Likelihood after {} iterations: {}".format(
            i, round(lkhd, 5)))
    return pi, m, S, g, lkhd
