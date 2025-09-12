#!/usr/bin/env python3
from setuptools import setup

setup(
    name = "algoflow",
    version = "0.1",
    py_modules = ["algoflow"],
    entr_points = {
        "console_scripts": [
            "algoflow = algoflow:main"
        ]
    }

)