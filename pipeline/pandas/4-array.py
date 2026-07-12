#!/usr/bin/env python3
import pandas as pd


def array(df):
    """Select last 10 rows of High and Close, convert to NumPy array."""
    return df[['High', 'Close']].tail(10).to_numpy()