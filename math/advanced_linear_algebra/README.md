# Advanced Linear Algebra

Linear algebra round two — the stuff that usually gets hand-waved away
with "just use numpy". Here almost everything is computed manually on
plain nested lists: determinants via recursive cofactor expansion,
minors, cofactors, adjugates, and finally the inverse built from all of
the above.

The tasks chain together nicely: the determinant feeds the minor
calculation, minors become cofactors, cofactors transpose into the
adjugate, and adjugate ÷ determinant gives you the inverse. By the last
file you've basically re-derived the classical inverse formula yourself.

## Files

| File | What it does |
|------|--------------|
| `0-determinant.py` | Determinant of a matrix, recursively via cofactor expansion |
| `1-minor.py` | The minor matrix (determinant of each submatrix) |
| `2-cofactor.py` | The cofactor matrix (minors with the checkerboard signs) |
| `3-adjugate.py` | The adjugate — transpose of the cofactor matrix |
| `4-inverse.py` | The inverse: adjugate divided by the determinant (or `None` if singular) |
| `5-definiteness.py` | Classifies a matrix as positive/negative (semi-)definite or indefinite using eigenvalues |

`5-definiteness.py` is the one exception where numpy is allowed —
computing eigenvalues by hand would be a whole other project.

## Notes

- Python 3, pycodestyle-compliant
- Edge cases matter: `[[]]` has determinant 1 (the 0×0 matrix), and
  non-square or malformed inputs raise the exact expected errors
