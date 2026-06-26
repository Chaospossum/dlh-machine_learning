#!/usr/bin/env python3
"""The Greeks pronounce it pEE: evaluate the product of i for i = 0 to 10."""
product = 1
for i in range(0, 11):
    product *= i
# The factor i = 0 makes the whole product 0, which is choice 4.
print(4 if product == 0 else None)
