#!/usr/bin/env python3
"""Module that performs element-wise operations on two numpy.ndarrays."""


def np_elementwise(mat1, mat2):
    """Return element-wise sum, difference, product, and quotient."""
    return (
        mat1 + mat2,
        mat1 - mat2,
        mat1 * mat2,
        mat1 / mat2,
    )
