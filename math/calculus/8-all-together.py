#!/usr/bin/env python3
"""Put it all together...: mixed second partial of e^(x^2 y)."""
import sympy

x, y = sympy.symbols('x y')
derivative = sympy.diff(sympy.exp(x**2 * y), x, y)
choices = {
    1: 2*x*(1 + y)*sympy.exp(x**2 * y),
    2: 2*x*sympy.exp(2*x),
    3: 2*x*(1 + x**2*y)*sympy.exp(x**2 * y),
    4: sympy.exp(2*x),
}
match = next(n for n, e in choices.items()
             if sympy.simplify(derivative - e) == 0)
print(match)
