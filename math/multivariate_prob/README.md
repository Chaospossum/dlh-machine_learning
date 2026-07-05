# Multivariate Probability

Probability, but in more than one dimension. This project is about
describing datasets with multiple variables: how they spread
(covariance), how they move together (correlation), and how to model
them with the multivariate normal distribution.

Numpy is allowed here, but the interesting parts — like the covariance
matrix and the multivariate normal PDF — still have to be computed from
the formulas rather than calling `np.cov` and friends.

## Files

| File | What it does |
|------|--------------|
| `0-mean_cov.py` | Takes a dataset and returns its mean vector and covariance matrix |
| `1-correlation.py` | Turns a covariance matrix into a correlation matrix |
| `multinormal.py` | A `MultiNormal` class — computes mean/covariance on init and has a `pdf()` method |

The correlation task is a nice one-liner once you realize correlation is
just covariance normalized by the standard deviations.

## Notes

- Python 3 + numpy, pycodestyle-compliant
- Input validation everywhere — wrong shapes and types raise the exact
  error messages the checker expects
