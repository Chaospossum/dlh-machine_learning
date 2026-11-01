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
    reg = K.regularizers.l2(lambtha)

    for i in range(len(layers)):
        if i == 0:
            model.add(K.layers.Dense(
                layers[i],
                activation=activations[i],
                kernel_regularizer=reg,
                input_shape=(nx,),
            ))
        else:
            model.add(K.layers.Dense(
                layers[i],
                activation=activations[i],
                kernel_regularizer=reg,
            ))

        if i < len(layers) - 1:
            model.add(K.layers.Dropout(1 - keep_prob))
    return model
