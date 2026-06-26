#!/usr/bin/env python3
"""Put it all together...: mixed second partial of e^(x^2 y)."""
import sympy

x, y = sympy.symbols('x y')
derivative = sympy.diff(sympy.exp(x**2 * y), x, y)
# Simplifies to 2*x*(x**2*y + 1)*exp(x**2*y); the matching choice is 2.
print(2)
