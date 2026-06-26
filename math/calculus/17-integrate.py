#!/usr/bin/env python3
"""Calculate the integral of a polynomial."""


def poly_integral(poly, C=0):
    """Return the integral of a polynomial given as a list of coefficients.

    C is the integration constant. The returned list is kept as small as
    possible and whole-number coefficients are represented as integers.
    Returns None if poly or C is invalid.
    """
    if not isinstance(poly, list) or len(poly) == 0:
        return None
    if not isinstance(C, (int, float)) or isinstance(C, bool):
        return None
    if not all(isinstance(coef, (int, float)) for coef in poly):
        return None
    integral = [C]
    for power, coef in enumerate(poly):
        result = coef / (power + 1)
        if result.is_integer():
            result = int(result)
        integral.append(result)
    while len(integral) > 1 and integral[-1] == 0:
        integral.pop()
    return integral
