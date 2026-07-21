# Tree Models

Implementation of tree-based machine learning models from scratch for the Digital Learning Hub curriculum.

## What's inside

This directory will contain implementations of tree-based supervised learning algorithms, built without relying on ML
libraries (like scikit-learn) to ensure a deep understanding of how these models work under the hood.

### Planned contents

- **Decision Trees** — Classification and regression trees, including:
    - Splitting criteria (Gini impurity, entropy, MSE)
    - Tree construction and pruning
    - Handling categorical and continuous features

- **Ensemble Methods** — Building on decision trees:
    - Random Forests (bagging)
    - Gradient Boosting (XGBoost-like)
    - AdaBoost

- **Evaluation & Utilities** — Helper functions for:
    - Cross-validation
    - Feature importance
    - Hyperparameter tuning

## Structure

Each model will be implemented in its own Python file with:

- Clear docstrings explaining the algorithm
- Type hints where applicable
- Unit tests in a corresponding `tests/` directory
- Example usage in the file's docstring or a separate example file

## Dependencies

- numpy 2.0.2
- scikit-learn 1.6.1
- lightgbm 4.5.0
- xgboost 2.1.4
- matplotlib 3.10.0
- pillow 11.3.0
