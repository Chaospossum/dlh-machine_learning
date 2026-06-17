#!/usr/bin/env python3
"""Module that defines a Binomial distribution."""


class Binomial:
    """Represents a Binomial distribution."""

    def __init__(self, data=None, n=1, p=0.5):
        """Initialize the distribution.

        Args:
            data: list of data used to estimate the distribution.
            n: number of Bernoulli trials.
            p: probability of success.
        """
        if data is None:
            if not isinstance(n, int) or n <= 0:
                raise ValueError("n must be a positive value")
            if type(p) not in (int, float) or p <= 0 or p >= 1:
                raise ValueError("p must be greater than 0 and less than 1")
            self.n = int(n)
            self.p = float(p)
        else:
            if not isinstance(data, list):
                raise TypeError("data must be a list")
            if len(data) < 2:
                raise ValueError("data must contain multiple values")

            mean = sum(data) / len(data)
            variance = sum([(x - mean) ** 2 for x in data]) / len(data)

            # Recalculate p and n from mean and variance
            # Mean = n * p
            # Variance = n * p * (1 - p)
            # Variance = Mean * (1 - p)
            # 1 - p = Variance / Mean
            # p = 1 - Variance / Mean

            p_est = 1 - (variance / mean)
            self.n = int(round(mean / p_est))
            mean = sum(data) / len(data)
            self.p = float(mean / self.n)

    def pmf(self, k):
        """Calculate the PMF for a given number of successes."""
        if not isinstance(k, int):
            k = int(k)
        if k < 0 or k > self.n:
            return 0

        # nCk = n! / (k! * (n-k)!)
        def factorial(num):
            res = 1
            for i in range(1, num + 1):
                res *= i
            return res

        n_fact = factorial(self.n)
        k_fact = factorial(k)
        nk_fact = factorial(self.n - k)
        
        n_choose_k = n_fact / (k_fact * nk_fact)
        return n_choose_k * (self.p ** k) * ((1 - self.p) ** (self.n - k))

    def cdf(self, k):
        """Calculate the CDF for a given number of successes."""
        if not isinstance(k, int):
            k = int(k)
        if k < 0:
            return 0
        if k >= self.n:
            return 1
        
        cdf_val = 0
        for i in range(k + 1):
            cdf_val += self.pmf(i)
        return cdf_val
