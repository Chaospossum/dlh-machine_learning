#!/usr/bin/env python3
"""Double whammy: double integral of x^2 / y, x in [0,3], y in [1,2]."""
import sympy

x, y = sympy.symbols('x y')
inner = sympy.integrate(x**2, (x, 0, 3))
value = sympy.integrate(inner / y, (y, 1, 2))
choices = {
    1: 9 * sympy.log(2),
    2: 9,
    3: 27 * sympy.log(2),
    4: 27,
}
match = next(n for n, e in choices.items()
             if sympy.simplify(value - e) == 0)
print(match)
