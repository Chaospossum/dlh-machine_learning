#!/usr/bin/env python3
"""Module that builds a neural network with the Keras Sequential API."""
import tensorflow.keras as K


def build_model(nx, layers, activations, lambtha, keep_prob):
    """Builds a neural network with Keras.

    nx: number of input features
    layers: list with the number of nodes in each layer
    activations: list with the activation function of each layer
    lambtha: L2 regularization parameter
    keep_prob: probability that a node is kept for dropout
    Returns: the keras model
    """
    model = K.Sequential()
    reg= K.regularizers.l2(lambtha)

    for i in range

