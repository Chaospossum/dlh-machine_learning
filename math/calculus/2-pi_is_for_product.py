#!/usr/bin/env python3
"""Pi is for Product: evaluate the product of i for i = 1 to m."""
m = 6
product = 1
for i in range(1, m + 1):
    product *= i
factorial = 1
for i in range(1, m + 1):
    factorial *= i
# The product equals m! for every m, which is choice 4.
print(4 if product == factorial else None)
