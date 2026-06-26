#!/usr/bin/env python3
"""Plot y = x^3 for x from 0 to 10 as a solid red line graph."""
import numpy as np
import matplotlib.pyplot as plt


def line():
    """Draw y as a solid red line with the x-axis ranging from 0 to 10."""
    y = np.arange(0, 11) ** 3
    plt.figure(figsize=(6.4, 4.8))

    plt.plot(np.arange(0, 11), y, 'r-')
    plt.xlim(0, 10)
    plt.show()
