#!/usr/bin/env python3
"""Module that calculates the PDF of a Gaussian distribution."""
import numpy as np


def pdf(X, m, S):
    """Calculate the probability density function of a Gaussian.

    Args:
        X: numpy.ndarray of shape (n, d) containing the data points whose
            PDF should be evaluated.
        m: numpy.ndarray of shape (d,) containing the mean.
        S: numpy.ndarray of shape (d, d) containing the covariance.

    Returns:
        P, a numpy.ndarray of shape (n,) containing the PDF values for
        each data point (minimum value 1e-300), or None on failure.
    """
    if not isinstance(X, np.ndarray) or X.ndim != 2:
        return None
    d = X.shape[1]
    if not isinstance(m, np.ndarray) or m.shape != (d,):
        return None
    if not isinstance(S, np.ndarray) or S.shape != (d, d):
        return None
    det = np.linalg.det(S)
    inv = np.linalg.inv(S)
    diff = X - m
    exponent = -0.5 * np.sum(diff @ inv * diff, axis=1)
    P = np.exp(exponent) / np.sqrt(((2 * np.pi) ** d) * det)
    return np.maximum(P, 1e-300)
