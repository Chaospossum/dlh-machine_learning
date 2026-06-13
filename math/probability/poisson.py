#!/usr/bin/env python3
"""Module that defines a Poisson distribution."""


class Poisson:
    """Represents a Poisson distribution."""

    def __init__(self, data=None, lambtha=1.):
        """Initialize the distribution.

        Args:
            data: list of data used to estimate the distribution.
            lambtha: expected number of occurences in a given time frame.
        """
        if data is None:
            if type(lambtha) not in (int, float) or lambtha <= 0:
                raise ValueError("lambtha must be a positive value")
            self.lambtha = float(lambtha)
        else:
            if not isinstance(data, list):
                raise TypeError("data must be a list")
            if len(data) < 2:
                raise ValueError("data must contain multiple values")
            self.lambtha = float(sum(data) / len(data))
