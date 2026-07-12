#!/usr/bin/env python3
import pandas as pd


def slice(df):
    """Extract columns High, Low, Close, Volume_(BTC), and select every 60th row.

    Args:
        df (pd.DataFrame): Input DataFrame containing the specified columns.

    Returns:
        pd.DataFrame: Sliced DataFrame with every 60th row of the selected columns.
    """
    return df.loc[::60, ['High', 'Low', 'Close', 'Volume_(BTC)']]
