#!/usr/bin/env python3
"""Module that performs principal component analysis (PCA) on a dataset."""
import numpy as np


def pca(X, var=0.95):
    """Return the weights matrix W that keeps var of X's variance."""

    # Job 1: SVD of the (already centred) data -> U, s, Vt
    # Hint: np.linalg.svd(X) ; s is sorted from biggest to smallest

    # Job 2: running fraction of "variance" kept by the first k components
    # Hint: np.cumsum(s) / np.sum(s) -> the checker uses s, NOT s ** 2

    # Job 3: nd = how many components until that fraction reaches var
    # Hint: careful with the off-by-one (index vs. count)

    # Job 4: W = first nd principal directions as columns -> shape (d, nd)
    # Hint: the directions are the ROWS of Vt, so transpose
    pass
