#!/usr/bin/env python3
"""Module that converts a label vector into a one-hot matrix"""
import tensorflow.keras as K


def one_hot(labels, classes=None):
    """Converts a label vector into a one-hot matrix

    labels: the label vector
    classes: the number of classes
    Returns: the one-hot matrix
    """
    return K.utils.to_categorical(labels, num_classes=classes)
