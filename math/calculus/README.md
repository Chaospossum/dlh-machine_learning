# Calculus

The calculus foundations you need before touching gradient descent —
summation notation, derivatives, and integrals. Most of this project is
multiple-choice questions (the answer files just contain a number), plus
three actual Python scripts at the end.

## Topics covered

- Sigma (summation) and Pi (product) notation
- Series
- Derivatives, product rule, chain rule
- Partial derivatives
- Indefinite, definite and double integrals

## Multiple choice answers

Each of these files contains just the answer to the corresponding
question. The file names are quotes from the curriculum — yes, really.

| File | Question topic |
|------|----------------|
| `0-sigma_is_for_sum` | Evaluating a sigma sum |
| `1-seegma` | Rewriting a sigma expression |
| `2-pi_is_for_product` | Evaluating a pi product |
| `3-pee` | Rewriting a pi expression |
| `4-hello_derivatives` | dy/dx of a polynomial |
| `5-log_on_fire` | Derivative involving a log |
| `6-voltaire` | Derivative of a log with a different base |
| `7-partial_truths` | Partial derivatives |
| `8-all-together` | Mixed second-order partial derivative |
| `11-integral`, `12-integral` | Indefinite integrals |
| `13-definite` – `15-definite` | Definite integrals |
| `16-double` | A double integral |

## Python scripts

| File | Function | What it does |
|------|----------|--------------|
| `9-sum_total.py` | `summation_i_squared(n)` | Sum of i² from 1 to n — using the closed-form formula, no loops |
| `10-matisse.py` | `poly_derivative(poly)` | Derivative of a polynomial given as a coefficient list |
| `17-integrate.py` | `poly_integral(poly, C=0)` | Integral of a polynomial, same coefficient-list format |

The polynomial format is a list where the index is the power, so
`[5, 3, 0, 1]` means x³ + 3x + 5. Once that clicks, the derivative and
integral tasks are just index shuffling.

## Notes

- Python 3, no imports allowed in the scripts, pycodestyle-compliant
