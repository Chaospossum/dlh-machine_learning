#!/usr/bin/env python3
"""Calculate the derivative of a polynomial."""


def poly_derivative(poly):
    """Return the derivative of a polynomial given as a list of coefficients.

    The index of each coefficient is the power of x it belongs to. Returns
    None if poly is not a valid list of coefficients, and [0] if the
    derivative is 0.
    """
    if not isinstance(poly, list) or len(poly) == 0:
        return None
    if not all(isinstance(coef, (int, float)) for coef in poly):
        return None
    if len(poly) == 1:
        return [0]
    return [poly[power] * power for power in range(1, len(poly))]
