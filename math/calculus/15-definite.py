#!/usr/bin/env python3
"""Winners are people with definite purpose...: integral of x dy, 0 to 5."""
import sympy

x, y = sympy.symbols('x y')
value = sympy.integrate(x, (y, 0, 5))
choices = {1: 5, 2: 5 * x, 3: 25, 4: 25 * x}
match = next(n for n, e in choices.items()
             if sympy.simplify(value - e) == 0)
print(match)
