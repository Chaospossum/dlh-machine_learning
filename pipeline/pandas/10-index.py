#!/usr/bin/env python3
"""Module that sets the Timestamp column as the index."""


def index(df):
    """Set the Timestamp column as the DataFrame index.

    Args:
        df: pd.DataFrame to modify.

    Returns:
        The modified pd.DataFrame.
    """
    return df.set_index('Timestamp')
