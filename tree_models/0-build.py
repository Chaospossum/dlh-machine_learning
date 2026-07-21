#!/usr/bin/env python3
"""Decision tree builder module for tree_models package.

This module provides functions to build decision tree classifiers
using scikit-learn with Gini impurity criterion.
"""
from sklearn import tree


def build_decision_tree(min_samples_leaf, min_samples_split, random_state):
    """Build a decision tree based on gini impurity.

    Args:
        min_samples_leaf: Minimum number of samples
            required to be at a leaf node.
        min_samples_split: Minimum number of samples
            required to split an internal node.
        random_state: Seed used by the random number
            generator for reproducibility.

    Returns:
        DecisionTreeClassifier: Scikit-learn
            DecisionTreeClassifier instance.
    """
    model = tree.DecisionTreeClassifier(
        criterion='gini',
        min_samples_leaf=min_samples_leaf,
        min_samples_split=min_samples_split,
        random_state=random_state
    )
    return model


if __name__ == '__main__':
    dt = build_decision_tree(
        min_samples_leaf=1,
        min_samples_split=2,
        random_state=42
    )
    X = [[0, 0], [1, 1]]
    y = [0, 1]
    dt.fit(X, y)
    print(f"Decision Tree hyperparameters: {dt.get_params()}")
    print(f"Is the Decision Tree Classifier fitted: {hasattr(dt, 'tree_')}")
