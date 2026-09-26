#!/usr/bin/env python3
"""Module that performs agglomerative clustering with Ward linkage."""
import scipy.cluster.hierarchy
import matplotlib.pyplot as plt


def agglomerative(X, dist):
    """Perform agglomerative clustering on a dataset.

    Args:
        X: numpy.ndarray of shape (n, d) containing the dataset.
        dist: maximum cophenetic distance for all clusters.

    Returns:
        clss, a numpy.ndarray of shape (n,) containing the cluster indices
        for each data point.
    """
    Z = scipy.cluster.hierarchy.linkage(X, method='ward')
    clss = scipy.cluster.hierarchy.fcluster(Z, t=dist, criterion='distance')
    scipy.cluster.hierarchy.dendrogram(Z, color_threshold=dist)
    plt.show()
    return clss
