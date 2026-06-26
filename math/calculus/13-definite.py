#!/usr/bin/env python3
"""Create a definite plan...: definite integral of x^2 from 0 to 3."""
import sympy

x = sympy.Symbol('x')
value = sympy.integrate(x**2, (x, 0, 3))
choices = {1: 3, 2: 6, 3: 9, 4: 27}
print(next(n for n, v in choices.items() if v == value))
