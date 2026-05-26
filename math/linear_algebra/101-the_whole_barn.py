#!/usr/bin/env python3


def add_matrices(mat1, mat2):
    if matrix.shape(mat1) != matrix.shape(mat2):
        return None
    if not isinstance(mat1,list):
        return mat1 + mat2
