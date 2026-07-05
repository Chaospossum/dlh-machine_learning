# Bayesian Probability

Bayes' theorem, step by step. The setup for the whole project: patients
take a drug, `x` of them out of `n` develop side effects, and we want to
reason about the true underlying probability of a side effect.

The four tasks build on each other and together they're literally just
Bayes' rule assembled piece by piece:

> posterior = likelihood × prior / marginal

## Files

| File | What it computes |
|------|------------------|
| `0-likelihood.py` | Likelihood of seeing `x` side effects in `n` patients, for each hypothetical probability in `P` (binomial likelihood) |
| `1-intersection.py` | Likelihood × prior — the intersection of the data with each hypothesis |
| `2-marginal.py` | The marginal probability of the data (sum of all the intersections) |
| `3-posterior.py` | The posterior — what we actually believe about each probability after seeing the data |

## Notes

- Python 3 + numpy, pycodestyle-compliant
- The binomial coefficient is computed manually with factorials —
  no scipy shortcuts
- Lots of input validation; the error messages are specified by the
  checker down to the letter
