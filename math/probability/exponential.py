#!/usr/bin/env python3
"""Module that defines an Exponential distribution."""


class Exponential:
    """Represents an Exponential distribution."""

    def __init__(self, data=None, lambtha=1.):
        """Initialize the distribution.

        Args:
            data: list of data used to estimate the distribution.
            lambtha: expected number of occurrences in a given time frame.
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
            self.lambtha = float(1 / (sum(data) / len(data)))

    def pdf(self, x):
        """Calculate the PDF for a given time period."""
        if x < 0:
            return 0

        e = 2.7182818285
        return self.lambtha * (e ** (-self.lambtha * x))

    def cdf(self, x):
        """Calculate the CDF for a given time period."""
        if x < 0:
            return 0

        e = 2.7182818285
        return 1 - (e ** (-self.lambtha * x))
