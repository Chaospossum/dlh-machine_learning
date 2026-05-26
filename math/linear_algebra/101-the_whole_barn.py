#!/usr/bin/env python3
from numpy import matrix


def add_matrices(mat1, mat2):
    if matrix.shape(mat1) != matrix.shape(mat2):
        return None
    if not isinstance(mat1,list):
        return mat1 + mat2
    return [add_matrices(mat1[i],mat2[i]) for i in range[len(mat)]]
