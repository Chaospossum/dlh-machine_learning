#!/usr/bin/env python3
"""Create a pd.DataFrame from a np.ndarray."""
import pandas as pd


def from_numpy(array):
    """Create a pd.DataFrame from a np.ndarray.

    Args:
        array (np.ndarray): array from which to create the pd.DataFrame.

    Returns:
        pd.DataFrame: the newly created DataFrame, with columns labeled
        in alphabetical order and capitalized.
    """
    columns = [chr(ord('A') + i) for i in range(array.shape[1])]
    return pd.DataFrame(array, columns=columns)
