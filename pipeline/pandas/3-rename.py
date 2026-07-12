#!/usr/bin/env python3
import pandas as pd

def rename(df):
    """Rename Timestamp to Datetime, convert to datetime, and select columns."""
    df = df.rename(columns={'Timestamp': 'Datetime'})
    # Convert Unix timestamp (in seconds or nanoseconds) to datetime
    df['Datetime'] = pd.to_datetime(df['Datetime'], unit='s')  # Use 'ms' for milliseconds or 'ns' for nanoseconds
    return df[['Datetime', 'Close']]