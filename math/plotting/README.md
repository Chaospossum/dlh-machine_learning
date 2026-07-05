# Plotting

Matplotlib exercises — one small function per file, each producing a
specific plot. Nothing fancy conceptually, but it forces you to learn
the matplotlib API properly: axis scales, ranges, labels, legends,
histograms, and cramming multiple plots into one figure.

## The plots

| File | Function | What you get |
|------|----------|--------------|
| `0-line.py` | `line()` | A solid red line of y = x³ |
| `1-scatter.py` | `scatter()` | Magenta scatter plot of height vs weight |
| `2-change_scale.py` | `change_scale()` | Exponential decay of C-14 with a logarithmic y-axis |
| `3-two.py` | `two()` | Decay curves of C-14 and Ra-226 on the same axes, with a legend |
| `4-frequency.py` | `frequency()` | Histogram of student grades, bars every 10 units |
| `5-all_in_one.py` | `all_in_one()` | All five previous plots in a single 3×2 figure |
| `6-bars.py` | `bars()` | Stacked bar chart of who has how much fruit |

`5-all_in_one.py` is the one that takes the longest — getting the grid
layout and the smaller font sizes right is fiddlier than it looks.

## Setup

- Python 3.9 on Ubuntu 20.04
- numpy 1.25.2, matplotlib 3.8.3
- pycodestyle 2.11.1

Every file is executable, starts with `#!/usr/bin/env python3`, and is
documented.
