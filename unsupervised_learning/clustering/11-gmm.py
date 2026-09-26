#!/usr/bin/env python3
"""Module that calculates a GMM with scikit-learn."""
import sklearn.mixture


def gmm(X, k):
    """Calculate a Gaussian Mixture Model from a dataset.

    Args:
        X: numpy.ndarray of shape (n, d) containing the dataset.
        k: number of clusters.

    Returns:
        pi, m, S, clss, bic: the cluster priors, the centroid means, the
        covariance matrices, the cluster index of each data point and the
        BIC value of the model.
    """
    model = sklearn.mixture.GaussianMixture(n_components=k).fit(X)
    pi = model.weights_
    m = model.means_
    S = model.covariances_
    clss = model.predict(X)
    bic = model.bic(X)
    return pi, m, S, clss, bic
