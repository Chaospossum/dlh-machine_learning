#!/usr/bin/env python3
"""The Greeks pronounce it sEEgma: summation of (9i - 2k) for k = 1 to 4."""
i_coefficient = sum(9 for k in range(1, 5))
constant = sum(-2 * k for k in range(1, 5))
# Summation gives 36i - 20, matching choice 2.
choices = {1: (0, 70), 2: (36, -20)}
result = (i_coefficient, constant)
print(next(number for number, value in choices.items() if value == result))
