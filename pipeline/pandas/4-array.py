#!/usr/bin/env python3
"""Module that converts the last 10 rows of two DataFrame columns to NumPy."""
import pandas as pd


def array(df):
    """Select last 10 rows of High and Close, convert to NumPy array."""
    return df[['High', 'Close']].tail(10).to_numpy()
