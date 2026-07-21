#!/usr/bin/env python3
"""Module that builds a hierarchical concatenation of two DataFrames."""
import pandas as pd
index = __import__('10-index').index


def hierarchy(df1, df2):
    """Concatenate df1 and df2 over a timestamp range with Timestamp first.

    Args:
        df1: coinbase pd.DataFrame.
        df2: bitstamp pd.DataFrame.

    Returns:
        The concatenated pd.DataFrame in chronological order.
    """
    df1 = index(df1)
    df2 = index(df2)
    df1 = df1.loc[1417411980:1417417980]
    df2 = df2.loc[1417411980:1417417980]
    df = pd.concat([df2, df1], keys=['bitstamp', 'coinbase'])
    df = df.swaplevel(0, 1)
    return df.sort_index()
