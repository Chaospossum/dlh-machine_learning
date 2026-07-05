# Machine Learning

Hey! This is my repo for the machine learning track of the Higher Level
Programming curriculum at Digital Learning Hub. It's basically me working
through all the math you need before the actual ML stuff gets fun —
linear algebra, calculus, probability, plotting — plus some database work
for data pipelines.

Everything here is written in Python 3 (with numpy and matplotlib where
allowed) and SQL. A lot of the tasks intentionally ban imports so you're
forced to actually understand what's going on under the hood instead of
just calling a library function.

## What's inside

### math/

- [`linear_algebra/`](math/linear_algebra) — slicing, transposing,
  matrix math, and getting comfortable with numpy
- [`calculus/`](math/calculus) — sigma/pi notation, derivatives, and
  integrals
- [`plotting/`](math/plotting) — a bunch of matplotlib exercises, from a
  simple line graph to a stacked bar chart
- [`probability/`](math/probability) — Poisson, Exponential, Normal and
  Binomial distributions built completely from scratch
- [`multivariate_prob/`](math/multivariate_prob) — mean, covariance,
  correlation, and the multivariate normal distribution
- [`bayesian_prob/`](math/bayesian_prob) — likelihood, priors and
  posteriors the Bayesian way
- [`advanced_linear_algebra/`](math/advanced_linear_algebra) —
  determinants, minors, cofactors, inverses and definiteness, all done
  by hand

### pipeline/

- [`databases/`](pipeline/databases) — MySQL queries for the data
  pipeline side of things

## Running stuff

Most Python files are standalone scripts or modules with a single
function/class. They all start with `#!/usr/bin/env python3` and follow
pycodestyle, because the checker at DLH is merciless about that. Each
project folder has its own README with the details.
