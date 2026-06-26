#!/usr/bin/env python3
"""Stacked bar graph of the quantity of fruit owned by each person."""
import numpy as np
import matplotlib.pyplot as plt


def bars():
    """Plot a stacked bar graph of fruit counts grouped by person."""
    np.random.seed(5)
    fruit = np.random.randint(0, 20, (4, 3))
    plt.figure(figsize=(6.4, 4.8))

    people = ['Farrah', 'Fred', 'Felicia']
    labels = ['apples', 'bananas', 'oranges', 'peaches']
    colors = ['red', 'yellow', '#ff8000', '#ffe5b4']
    positions = np.arange(3)
    bottom = np.zeros(3)
    for row in range(4):
        plt.bar(positions, fruit[row], width=0.5, bottom=bottom,
                color=colors[row], label=labels[row])
        bottom += fruit[row]

    plt.xticks(positions, people)
    plt.ylabel('Quantity of Fruit')
    plt.title('Number of Fruit per Person')
    plt.ylim(0, 80)
    plt.yticks(np.arange(0, 81, 10))
    plt.legend()
    plt.show()
