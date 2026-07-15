#!/usr/bin/env python3
"""Module that slices selected columns of a DataFrame every 60th row."""
import pandas as pd


def slice(df):
    """Extract High, Low, Close, Volume_(BTC) and select every 60th row.

    Args:
        df (pd.DataFrame): Input DataFrame containing the specified columns.

    Returns:
        pd.DataFrame: Sliced DataFrame with every 60th row of the columns.
    """
    return df[['High', 'Low', 'Close', 'Volume_(BTC)']].iloc[::60]
