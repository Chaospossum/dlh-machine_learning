# Probability

Four classic probability distributions implemented completely from
scratch — no numpy, no scipy, not even the math module. Just raw Python.
That means writing your own factorial, your own e^x, and your own erf
approximation for the Normal CDF. Painful, but you come out of it
actually knowing what a PDF and a CDF are instead of just importing them.

Each distribution is a class that works two ways: hand it a list of data
and it estimates its own parameters, or pass the parameters directly.

## The distributions

| File | Class | Parameters | Good for modelling |
|------|-------|------------|--------------------|
| `poisson.py` | `Poisson` | `lambtha` | How many events happen in a fixed time window |
| `exponential.py` | `Exponential` | `lambtha` | How long you wait between those events |
| `normal.py` | `Normal` | `mean`, `stddev` | The bell curve — most "natural" measurements |
| `binomial.py` | `Binomial` | `n`, `p` | Number of successes in n coin-flip-style trials |

Each class has the methods you'd expect: `pmf`/`pdf` for the probability
of a value, `cdf` for the cumulative probability, and Normal also gets
`z_score`/`x_value` conversion.

And yes, it's spelled `lambtha` — `lambda` is a reserved word in Python,
so the curriculum went with that. It hurts me too.

## Notes

- Python 3, zero imports, pycodestyle-compliant
- Invalid input raises proper errors (`lambtha must be a positive value`,
  `data must contain multiple values`, etc.)
