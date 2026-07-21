#!/usr/bin/env python3
"""Module that computes descriptive statistics for a DataFrame."""


def analyze(df):
    """Compute descriptive statistics for all columns except Timestamp.

    Args:
        df: pd.DataFrame to analyze.

    Returns:
        A new pd.DataFrame containing the descriptive statistics.
    """
    return df.drop(columns=['Timestamp']).describe()
