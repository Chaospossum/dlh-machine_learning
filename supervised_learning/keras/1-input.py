#!/usr/bin/env python3
"""Builds a neural network with the Keras Functional API"""
import tensorflow.keras as K


def build_model(nx, layers, activations, lambtha, keep_prob):
    """Builds a neural network using the Keras Functional API.

    Args:
        nx: Number of input features.
        layers: Number of nodes in each dense layer.
        activations: Activation function for each dense layer.
        lambtha: L2 regularization parameter.
        keep_prob: Probability of keeping a node during dropout.

    Returns:
        A Keras model with L2 regularization and dropout on hidden layers.
    """
    inputs = K.Input(shape=(nx,))
    x = inputs
    for i in range(len(layers)):
        reg = K.regularizers.L2(lambtha)
        x = K.layers.Dense(layers[i],
                           activation=activations[i],
                           kernel_regularizer=reg)(x)
        if i < len(layers) - 1:
            x = K.layers.Dropout(1 - keep_prob)(x)
    model = K.Model(inputs=inputs, outputs=x)
    return model
