#!/usr/bin/env python3
"""Module that renames and reformats a DataFrame's Timestamp column."""
import pandas as pd


def rename(df):
    """Rename Timestamp to Datetime, convert to datetime, keep Close.

    Args:
        df: pd.DataFrame containing a Timestamp column.

    Returns:
        The modified pd.DataFrame with only Datetime and Close columns.
    """
    df = df.rename(columns={'Timestamp': 'Datetime'})
    df['Datetime'] = pd.to_datetime(df['Datetime'], unit='s')
    return df[['Datetime', 'Close']]
