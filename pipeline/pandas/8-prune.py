#!/usr/bin/env python3
"""Module that removes rows with NaN Close values."""


def prune(df):
    """Remove entries where Close has NaN values.

    Args:
        df: pd.DataFrame to prune.

    Returns:
        The modified pd.DataFrame.
    """
    return df.dropna(subset=['Close'])
