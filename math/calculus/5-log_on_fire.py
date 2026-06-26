#!/usr/bin/env python3
"""A log on the fire: compute the derivative of x * ln(x)."""
import sympy

x = sympy.Symbol('x')
derivative = sympy.diff(x * sympy.log(x), x)
choices = {
    1: sympy.log(x),
    2: 1 / x + 1,
    3: sympy.log(x) + 1,
    4: 1 / x,
}
match = next(n for n, e in choices.items()
             if sympy.simplify(derivative - e) == 0)
print(match)
