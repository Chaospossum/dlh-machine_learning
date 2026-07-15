#!/usr/bin/env python3
"""Module that concatenates the bitstamp and coinbase DataFrames."""
import pandas as pd
index = __import__('10-index').index


def concat(df1, df2):
    """Concatenate selected df2 rows on top of df1 with keys.

    Args:
        df1: coinbase pd.DataFrame.
        df2: bitstamp pd.DataFrame.

    Returns:
        The concatenated pd.DataFrame.
    """
    df1 = index(df1)
    df2 = index(df2)
    df2 = df2.loc[:1417411920]
    return pd.concat([df2, df1], keys=['bitstamp', 'coinbase'])
