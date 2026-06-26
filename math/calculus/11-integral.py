#!/usr/bin/env python3
"""Good grooming is integral...: indefinite integral of x^3."""
import sympy

x = sympy.Symbol('x')
integral = sympy.integrate(x**3, x)
choices = {
    1: 3*x**2,
    2: x**4 / 4,
    3: x**4,
    4: x**4 / 3,
}
match = next(n for n, e in choices.items()
             if sympy.simplify(integral - e) == 0)
print(match)
