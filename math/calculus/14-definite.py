#!/usr/bin/env python3
"""My talents fall within definite limitations: integral of 1/v across 0."""
import sympy

v = sympy.Symbol('v')
# Antiderivative is log|v|; the interval spans the singularity at v = 0,
# so the definite integral does not converge (undefined) -> choice 4.
antiderivative = sympy.integrate(1 / v, v)
print(4)
