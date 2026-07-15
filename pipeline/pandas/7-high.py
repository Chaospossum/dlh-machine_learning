#!/usr/bin/env python3
"""Module that sorts a DataFrame by the High price."""


def high(df):
    """Sort a DataFrame by High price in descending order.

    Args:
        df: pd.DataFrame to sort.

    Returns:
        The sorted pd.DataFrame.
    """
    return df.sort_values(by='High', ascending=False)
