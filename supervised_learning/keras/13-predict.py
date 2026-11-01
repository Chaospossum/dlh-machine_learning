#!/usr/bin/env python3
"""Module that makes a prediction using a keras neural network"""
import tensorflow.keras as K


def predict(network, data, verbose=False):
    """Makes a prediction using a neural network

    network: the network model to make the prediction with
    data: the input data to make the prediction with
    verbose: whether output should be printed during prediction
    Returns: the prediction for the data
    """
    return network.predict(data, verbose=verbose)
