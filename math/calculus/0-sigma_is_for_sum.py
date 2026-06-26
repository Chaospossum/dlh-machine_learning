#!/usr/bin/env python3
"""Sigma is for Sum: evaluate the summation of i for i = 2 to 5."""
total = sum(range(2, 6))
choices = {1: 3 + 4 + 5, 2: 3 + 4, 3: 2 + 3 + 4 + 5, 4: 2 + 3 + 4}
print(next(number for number, value in choices.items() if value == total))
