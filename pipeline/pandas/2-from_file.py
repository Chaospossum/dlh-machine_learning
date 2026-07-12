#!/usr/bin/env python3
"""Module that loads a file into a DataFrame using a given delimiter."""
import pandas as pd


def from_file(filename, delimiter):
    """Load a file into a DataFrame with a custom delimiter."""
    return pd.read_csv(filename, sep=delimiter)