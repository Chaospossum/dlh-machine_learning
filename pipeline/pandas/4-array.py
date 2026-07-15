#!/usr/bin/env python3
"""Module that converts DataFrame columns to a numpy array."""


def array(df):
    """Select last 10 rows of High and Close and return as ndarray.

    Args:
        df: pd.DataFrame containing High and Close columns.

    Returns:
        A numpy.ndarray of the selected values.
    """
    return df[['High', 'Close']].tail(10).to_numpy()
