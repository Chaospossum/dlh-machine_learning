#!/usr/bin/env python3
"""Module that saves and loads a keras model's configuration in JSON"""
import tensorflow.keras as K


def save_config(network, filename):
    """Saves a model's configuration in JSON format

    network: the model whose configuration should be saved
    filename: the path of the file that the configuration should be saved to
    Returns: None
    """
    with open(filename, 'w') as f:
        f.write(network.to_json())


def load_config(filename):
    """Loads a model with a specific configuration

    filename: the path of the file containing the model's configuration
    Returns: the loaded model
    """
    with open(filename, 'r') as f:
        return K.models.model_from_json(f.read())
