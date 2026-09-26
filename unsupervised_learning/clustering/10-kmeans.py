#!/usr/bin/env python3
"""Module that performs K-means with scikit-learn."""
import sklearn.cluster


def kmeans(X, k):
    """Perform K-means on a dataset.

    Args:
        X: numpy.ndarray of shape (n, d) containing the dataset.
        k: number of clusters.

    Returns:
        C, clss: C is a numpy.ndarray of shape (k, d) with the centroid
        means for each cluster, and clss is a numpy.ndarray of shape (n,)
        with the index of the cluster in C each data point belongs to.
    """
    model = sklearn.cluster.KMeans(n_clusters=k).fit(X)
    return model.cluster_centers_, model.labels_
