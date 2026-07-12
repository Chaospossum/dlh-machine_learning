#!/usr/bin/env python3
import pandas as pd


def rename(df):
    """Rename Timestamp to Datetime, convert to datetime, and select columns."""
    df = df.rename(columns={'Timestamp': 'Datetime'})
    df['Datetime'] = pd.to_datetime(df['Datetime'], unit='s')
    return df[['Datetime', 'Close']]