#!/usr/bin/env python3
"""
Module that contains the likelihood function for Bayesian probability
calculations.
"""

import numpy as np


def likelihood(x, n, P):
    """
    Calculate the likelihood of obtaining data (x, n) given various
    hypothetical probabilities of developing severe side effects.

    The likelihood is calculated using the binomial probability mass
    function:
    L(p) = C(n, x) * p^x * (1-p)^(n-x)

    Parameters:
        x (int): The number of patients that develop severe side effects
        n (int): The total number of patients observed
        P (numpy.ndarray): A 1D numpy array containing various hypothetical
            probabilities

    Returns:
        numpy.ndarray: A 1D numpy array containing the likelihood of
            obtaining the data, x and n, for each probability in P,
            respectively

    Raises:
        ValueError: If n is not a positive integer
        ValueError: If x is not an integer >= 0
        ValueError: If x > n
        TypeError: If P is not a 1D numpy.ndarray
        ValueError: If any value in P is not in [0, 1]
    """
    # Validate n
    if not isinstance(n, int) or n <= 0:
        raise ValueError("n must be a positive integer")

    # Validate x
    if not isinstance(x, int) or x < 0:
        raise ValueError(
            "x must be an integer that is greater than or equal to 0")

    # Validate x <= n
    if x > n:
        raise ValueError("x cannot be greater than n")

    # Validate P is a 1D numpy array
    if not isinstance(P, np.ndarray) or P.ndim != 1:
        raise TypeError("P must be a 1D numpy.ndarray")

    # Validate all values in P are in [0, 1]
    if np.any(P < 0) or np.any(P > 1):
        raise ValueError("All values in P must be in the range [0, 1]")

    # Calculate binomial coefficient C(n, x) iteratively to avoid overflow
    # C(n, x) = product from i=1 to x of (n - x + i) / i
    if x == 0 or x == n:
        binom_coeff = 1.0
    else:
        # Use the smaller of x and n-x for efficiency
        k = min(x, n - x)
        binom_coeff = 1.0
        for i in range(1, k + 1):
            binom_coeff = binom_coeff * (n - k + i) / i

    # Calculate likelihood for each p in P
    likelihoods = binom_coeff * (P ** x) * ((1 - P) ** (n - x))

    return likelihoods
