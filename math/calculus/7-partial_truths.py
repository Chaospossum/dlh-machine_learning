#!/usr/bin/env python3
"""Partial truths...: partial derivative wrt y of e^(xy)."""
import sympy

x, y = sympy.symbols('x y')
derivative = sympy.diff(sympy.exp(x * y), y)
choices = {
    1: sympy.exp(x * y),
    2: x * sympy.exp(x * y),
    3: y * sympy.exp(x * y),
    4: x * y * sympy.exp(x * y),
}
match = next(n for n, e in choices.items()
             if sympy.simplify(derivative - e) == 0)
print(match)
