#!/usr/bin/env python3
"""Hello, derivatives! Compute dy/dx for y = x^4 + 3x^3 - 5x + 1."""
import sympy

x = sympy.Symbol('x')
derivative = sympy.diff(x**4 + 3*x**3 - 5*x + 1, x)
choices = {
    1: 3*x**3 + 6*x**2 - 4,
    2: 4*x**3 + 6*x**2 - 5,
    3: 4*x**3 + 9*x**2 - 5,
    4: 4*x**3 + 9*x**2 - 4,
}
match = next(n for n, e in choices.items()
             if sympy.simplify(derivative - e) == 0)
print(match)
