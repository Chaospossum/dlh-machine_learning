#!/usr/bin/env python3
"""Module that slices a numpy.ndarray along specific axes."""


def np_slice(matrix, axes={}):
    """Return a new numpy.ndarray sliced according to the axes dict."""
    slices = []
    for i in range(matrix.ndim):
        if i in axes:
            slices.append(slice(*axes[i]))
        else:
            slices.append(slice(None))
    return matrix[tuple(slices)]
