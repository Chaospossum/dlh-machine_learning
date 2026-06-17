#!/usr/bin/env python3
"""Module that defines a Normal distribution."""


class Normal:
    """Represents a Normal distribution."""

    def __init__(self, data=None, mean=0., stddev=1.):
        """Initialize the distribution.

        Args:
            data: list of data used to estimate the distribution.
            mean: mean of the distribution.
            stddev: standard deviation of the distribution.
        """
        if data is None:
            if type(stddev) not in (int, float) or stddev <= 0:
                raise ValueError("stddev must be a positive value")
            self.mean = float(mean)
            self.stddev = float(stddev)
        else:
            if not isinstance(data, list):
                raise TypeError("data must be a list")
            if len(data) < 2:
                raise ValueError("data must contain multiple values")
            self.mean = float(sum(data) / len(data))
            sum_diff_sq = sum([(x - self.mean) ** 2 for x in data])
            self.stddev = float((sum_diff_sq / len(data)) ** 0.5)

    def z_score(self, x):
        """Calculate the z-score of a given x-value."""
        return (x - self.mean) / self.stddev

    def x_value(self, z):
        """Calculate the x-value of a given z-score."""
        return z * self.stddev + self.mean

    def pdf(self, x):
        """Calculate the PDF for a given x-value."""
        e = 2.7182818285
        pi = 3.1415926536
        exponent = -0.5 * (self.z_score(x) ** 2)
        coefficient = 1 / (self.stddev * (2 * pi) ** 0.5)
        return coefficient * (e ** exponent)

    def cdf(self, x):
        """Calculate the CDF for a given x-value."""
        e = 2.7182818285
        pi = 3.1415926536
        
        # Using the approximation of the error function
        # erf(z) = (2/sqrt(pi)) * (z - z^3/3 + z^5/10 - z^7/42 + z^9/216)
        # However, a common approximation is needed or a more precise one
        # The prompt doesn't specify which erf approximation to use.
        # Often these projects expect a specific polynomial approximation or Taylor series.
        
        z = (x - self.mean) / (self.stddev * (2 ** 0.5))
        erf = (2 / (pi ** 0.5)) * (z - (z ** 3) / 3 + (z ** 5) / 10 - (z ** 7) / 42 + (z ** 9) / 216)
        return 0.5 * (1 + erf)
