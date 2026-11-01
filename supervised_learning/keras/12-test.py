#!/usr/bin/env python3
"""Module that tests a keras neural network"""
import tensorflow.keras as K


def test_model(network, data, labels, verbose=True):
    """Tests a neural network

    network: the network model to test
    data: the input data to test the model with
    labels: the correct one-hot labels of data
    verbose: whether output should be printed during testing
    Returns: the loss and accuracy of the model with the testing data
    """
    return network.evaluate(data, labels, verbose=verbose)
