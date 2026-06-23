#!/usr/bin/env python3
"""Module that calculates binomial likelihood values."""

import numpy as np


def likelihood(x, n, P):
    """Calculate binomial likelihood values for observed data.

    Args:
        x (int): Number of observed successes.
        n (int): Total number of trials.
        P (numpy.ndarray): 1D array of hypothetical probabilities.

    Returns:
        numpy.ndarray: Likelihood of observing `x` successes out of `n`
        trials for each probability in `P`.
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

    if np.any((P < 0) | (P > 1)):
        raise ValueError("All values in P must be in the range [0, 1]")

    coefficient = np.math.factorial(n) / (
            np.math.factorial(x) * np.math.factorial(n - x)
    )

    return coefficient * (P ** x) * ((1 - P) ** (n - x))
