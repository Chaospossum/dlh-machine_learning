# Tensorflow 2 & Keras

Building, training, saving and loading neural networks with `tf.keras`
for the Digital Learning Hub curriculum.

## Contents

| File | Description |
| --- | --- |
| `0-sequential.py` | `build_model(nx, layers, activations, lambtha, keep_prob)` — builds a network with the Sequential API |
| `1-input.py` | `build_model(nx, layers, activations, lambtha, keep_prob)` — builds a network with the Functional API |
| `2-optimize.py` | `optimize_model(network, alpha, beta1, beta2)` — sets up Adam with categorical crossentropy |
| `3-one_hot.py` | `one_hot(labels, classes=None)` — converts labels to a one-hot matrix |
| `4-train.py` | `train_model(...)` — trains with mini-batch gradient descent |
| `5-train.py` | `train_model(...)` — adds validation data |
| `6-train.py` | `train_model(...)` — adds early stopping |
| `7-train.py` | `train_model(...)` — adds inverse time learning rate decay |
| `8-train.py` | `train_model(...)` — adds saving the best model |
| `9-model.py` | `save_model` / `load_model` — saves and loads an entire model |
| `10-weights.py` | `save_weights` / `load_weights` — saves and loads model weights |
| `11-config.py` | `save_config` / `load_config` — saves and loads a model's JSON configuration |
| `12-test.py` | `test_model(network, data, labels, verbose=True)` — evaluates a model |
| `13-predict.py` | `predict(network, data, verbose=False)` — makes predictions |

## Topics

- Keras models (Sequential and Functional API)
- L2 regularization, dropout and batch normalization
- Compiling, fitting, validating and early stopping
- Evaluating models and making predictions
- Saving and loading models, weights and configurations (HDF5)
