# Clustering

Implementation of clustering algorithms with NumPy, scikit-learn and SciPy
for the Digital Learning Hub curriculum.

## Contents

| File | Description |
| --- | --- |
| `0-initialize.py` | `initialize(X, k)` — initializes K-means centroids with a multivariate uniform distribution |
| `1-kmeans.py` | `kmeans(X, k, iterations)` — performs K-means clustering |
| `2-variance.py` | `variance(X, C)` — total intra-cluster variance |
| `3-optimum.py` | `optimum_k(X, kmin, kmax, iterations)` — tests the optimum number of clusters by variance |
| `4-initialize.py` | `initialize(X, k)` — initializes priors, means and covariances for a GMM |
| `5-pdf.py` | `pdf(X, m, S)` — probability density function of a multivariate Gaussian |
| `6-expectation.py` | `expectation(X, pi, m, S)` — E-step of the EM algorithm for a GMM |
| `7-maximization.py` | `maximization(X, g)` — M-step of the EM algorithm for a GMM |
| `8-EM.py` | `expectation_maximization(X, k, iterations, tol, verbose)` — full EM for a GMM |
| `9-BIC.py` | `BIC(X, kmin, kmax, iterations, tol, verbose)` — best number of GMM clusters by BIC |
| `10-kmeans.py` | `kmeans(X, k)` — K-means with scikit-learn |
| `11-gmm.py` | `gmm(X, k)` — Gaussian Mixture Model with scikit-learn |
| `12-agglomerative.py` | `agglomerative(X, dist)` — agglomerative clustering with Ward linkage (SciPy) |

## Topics

- K-means clustering and centroid initialization
- Gaussian Mixture Models and the Expectation-Maximization algorithm
- Choosing the number of clusters (elbow method, BIC)
- Hierarchical / agglomerative clustering (Ward's method)

## Requirements

- Ubuntu 20.04 LTS, Python 3.9
- numpy 1.25.2, scikit-learn 1.5.0, scipy 1.11.4
- pycodestyle 2.11.1
