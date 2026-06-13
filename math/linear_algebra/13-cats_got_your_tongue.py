#!/usr/bin/env python3
"""Module that concatenates two numpy.ndarrays along a specific axis."""
import numpy as np


def np_cat(mat1, mat2, axis=0):
    """Return a new numpy.ndarray from concatenating along axis."""
    return np.concatenate((mat1, mat2), axis=axis)
