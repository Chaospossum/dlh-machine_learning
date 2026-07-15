#!/usr/bin/env python3
"""Module that sorts a DataFrame in reverse order and transposes it."""


def flip_switch(df):
    """Sort in reverse chronological order and transpose.

    Args:
        df: pd.DataFrame to transform.

    Returns:
        The transposed, reverse-sorted pd.DataFrame.
    """
    return df.sort_values(by='Timestamp', ascending=False).transpose()
