#!/usr/bin/env python3
"""Builds a neural network with Keras (Sequential)"""
import tensorflow.keras as K


def build_model(nx, layers, activations, lambtha, keep_prob):
    """Builds a Keras model with L2 regularization and dropout"""
    model = K.Sequential()
    for i in range(len(layers)):
        reg = K.regularizers.L2(lambtha)
        if i == 0:
            model.add(K.layers.Dense(layers[i],
                                     activation=activations[i],
                                     kernel_regularizer=reg,
                                     input_shape=(nx,)))
        else:
            model.add(K.layers.Dense(layers[i],
                                     activation=activations[i],
                                     kernel_regularizer=reg))
        if i < len(layers) - 1:
            model.add(K.layers.Dropout(1 - keep_prob))
    return model