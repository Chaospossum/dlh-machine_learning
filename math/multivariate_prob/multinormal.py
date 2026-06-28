#!/usr/bin/env python3
"""Module that defines the MultiNormal class."""
import numpy as np


class MultiNormal:
    """Represents a Multivariate Normal distribution."""

    def __init__(self, data):
        """Initialize the distribution from a data set."""
        if not isinstance(data, np.ndarray) or data.ndim != 2:
            raise TypeError("data must be a 2D numpy.ndarray")
        d, n = data.shape
        if n < 2:
            raise ValueError("data must contain multiple data points")
        self.mean = np.mean(data, axis=1, keepdims=True)
        deviation = data - self.mean
        self.cov = np.dot(deviation, deviation.T) / (n - 1)

    def pdf(self, x):
        """Calculate the PDF at a data point."""
        if not isinstance(x, np.ndarray):
            raise TypeError("x must be a numpy.ndarray")
        d = self.cov.shape[0]
        if x.ndim != 2 or x.shape != (d, 1):
            raise ValueError("x must have the shape ({}, 1)".format(d))
        det = np.linalg.det(self.cov)
        inv = np.linalg.inv(self.cov)
        deviation = x - self.mean
        exponent = -0.5 * np.dot(np.dot(deviation.T, inv), deviation)
        denom = np.sqrt(((2 * np.pi) ** d) * det)
        return float((1.0 / denom) * np.exp(exponent[0][0]))
