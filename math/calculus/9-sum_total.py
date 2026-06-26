#!/usr/bin/env python3
"""Calculate the summation of i squared from i = 1 to n."""


def summation_i_squared(n):
    """Return the sum of i^2 for i from 1 to n, or None if n is invalid."""
    if not isinstance(n, int) or n < 1:
        return None
    return n * (n + 1) * (2 * n + 1) // 6
