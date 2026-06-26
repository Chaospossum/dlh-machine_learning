#!/usr/bin/env python3
"""Derivative of ln(x^2) (It is difficult to free fools...)."""
import sympy

x = sympy.Symbol('x', positive=True)
derivative = sympy.diff(sympy.log(x**2), x)
choices = {
    1: 2 / x,
    2: 2 / x**2,
    3: 1 / x**2,
    4: 2 / x,
}
match = next(n for n, e in choices.items()
             if sympy.simplify(derivative - e) == 0)
print(match)
