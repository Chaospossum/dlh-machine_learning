#!/usr/bin/env python3
"""Module that calculates the maximization step of EM for a GMM."""
import numpy as np


def maximization(X, g):
    """Calculate the maximization step in the EM algorithm for a GMM.

    Args:
        X: numpy.ndarray of shape (n, d) containing the data set.
        g: numpy.ndarray of shape (k, n) containing the posterior
            probabilities for each data point in each cluster.

    Returns:
        pi, m, S, or None, None, None on failure.
        pi is a numpy.ndarray of shape (k,) with the updated priors,
        m is a numpy.ndarray of shape (k, d) with the updated means, and
        S is a numpy.ndarray of shape (k, d, d) with the updated
        covariance matrices.
    """
    if not isinstance(X, np.ndarray) or X.ndim != 2:
        return None, None, None
    if not isinstance(g, np.ndarray) or g.ndim != 2:
        return None, None, None
    n, d = X.shape
    k = g.shape[0]
    if g.shape[1] != n:
        return None, None, None
    if not np.isclose(np.sum(g, axis=0), 1).all():
        return None, None, None

    nk = np.sum(g, axis=1)
    pi = nk / n
    m = (g @ X) / nk[:, np.newaxis]
    S = np.zeros((k, d, d))
    for i in range(k):
        diff = X - m[i]
        S[i] = (g[i][:, np.newaxis] * diff).T @ diff / nk[i]
    return pi, m, S
