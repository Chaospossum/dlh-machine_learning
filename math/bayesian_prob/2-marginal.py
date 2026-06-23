#!/usr/bin/env python3
"""Module that calculates binomial marginal probabilities."""

import numpy as np


def marginal(x, n, P, Pr):
    """Calculate the marginal probability of observed data.

    Args:
        x (int): Number of observed successes.
        n (int): Total number of trials.
        P (numpy.ndarray): 1D array of hypothetical probabilities.
        Pr (numpy.ndarray): Prior beliefs corresponding to ``P``.

    Returns:
        float: Marginal probability of obtaining ``x`` out of ``n``.
    """
    if type(n) is not int or n <= 0:
        raise ValueError("n must be a positive integer")

    if type(x) is not int or x < 0:
        raise ValueError(
            "x must be an integer that is greater than or equal to 0"
        )

    if x > n:
        raise ValueError("x cannot be greater than n")

    if not isinstance(P, np.ndarray) or P.ndim != 1:
        raise TypeError("P must be a 1D numpy.ndarray")

    if not isinstance(Pr, np.ndarray) or Pr.shape != P.shape:
        raise TypeError("Pr must be a numpy.ndarray with the same shape as P")

    if np.any((P < 0) | (P > 1)):
        raise ValueError("All values in P must be in the range [0, 1]")

    if np.any((Pr < 0) | (Pr > 1)):
        raise ValueError("All values in Pr must be in the range [0, 1]")

    if not np.isclose(np.sum(Pr), 1):
        raise ValueError("Pr must sum to 1")

    def factorial(value):
        """Compute factorial for a non-negative integer."""
        result = 1
        for i in range(2, value + 1):
            result *= i
        return result

    coefficient = factorial(n) / (factorial(x) * factorial(n - x))
    likelihood = coefficient * (P ** x) * ((1 - P) ** (n - x))
    intersection = likelihood * Pr

    return np.sum(intersection)
