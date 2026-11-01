#!/usr/bin/env python3
"""Module that trains a keras model using mini-batch gradient descent"""
import tensorflow.keras as K


def train_model(network, data, labels, batch_size, epochs,
                validation_data=None, early_stopping=False, patience=0,
                learning_rate_decay=False, alpha=0.1, decay_rate=1,
                save_best=False, filepath=None, verbose=True, shuffle=False):
    """Trains a model using mini-batch gradient descent

    network: the model to train
    data: numpy.ndarray of shape (m, nx) containing the input data
    labels: one-hot numpy.ndarray of shape (m, classes) of labels
    batch_size: size of the batch used for mini-batch gradient descent
    epochs: number of passes through data
    validation_data: the data to validate the model with, if not None
    early_stopping: whether early stopping should be used
    patience: the patience used for early stopping
    learning_rate_decay: whether learning rate decay should be used
    alpha: the initial learning rate
    decay_rate: the decay rate
    save_best: whether to save the best model after each epoch
    filepath: the file path where the model should be saved
    verbose: whether output should be printed during training
    shuffle: whether to shuffle the batches every epoch
    Returns: the History object generated after training the model
    """
    callbacks = []
    if early_stopping and validation_data is not None:
        callbacks.append(K.callbacks.EarlyStopping(monitor='val_loss',
                                                   patience=patience))
    if learning_rate_decay and validation_data is not None:
        def scheduler(epoch):
            """Inverse time decay of the learning rate"""
            return alpha / (1 + decay_rate * epoch)
        callbacks.append(K.callbacks.LearningRateScheduler(scheduler,
                                                           verbose=1))
    if save_best and filepath is not None:
        callbacks.append(K.callbacks.ModelCheckpoint(filepath,
                                                     monitor='val_loss',
                                                     save_best_only=True))
    return network.fit(data, labels, batch_size=batch_size,
                       epochs=epochs, validation_data=validation_data,
                       callbacks=callbacks, verbose=verbose,
                       shuffle=shuffle)
