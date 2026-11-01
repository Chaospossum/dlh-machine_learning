#!/usr/bin/env python3
"""Module that trains a keras model using mini-batch gradient descent"""
import tensorflow.keras as K


def train_model(network, data, labels, batch_size, epochs,
                validation_data=None, verbose=True, shuffle=False):
    """Trains a model using mini-batch gradient descent

    network: the model to train
    data: numpy.ndarray of shape (m, nx) containing the input data
    labels: one-hot numpy.ndarray of shape (m, classes) of labels
    batch_size: size of the batch used for mini-batch gradient descent
    epochs: number of passes through data
    validation_data: the data to validate the model with, if not None
    verbose: whether output should be printed during training
    shuffle: whether to shuffle the batches every epoch
    Returns: the History object generated after training the model
    """
    return network.fit(data, labels, batch_size=batch_size,
                       epochs=epochs, validation_data=validation_data,
                       verbose=verbose, shuffle=shuffle)
