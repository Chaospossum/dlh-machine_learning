#!/usr/bin/env python3
"""We are all an integral part...: integral of e^(2y) dy."""
import sympy

y = sympy.Symbol('y')
integral = sympy.integrate(sympy.exp(2 * y), y)
choices = {
    1: sympy.exp(2 * y),
    2: sympy.exp(y),
    3: sympy.exp(2 * y) / 2,
    4: sympy.exp(y) / 2,
}
match = next(n for n, e in choices.items()
             if sympy.simplify(integral - e) == 0)
print(match)
