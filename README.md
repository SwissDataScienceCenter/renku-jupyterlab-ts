# renku-jupyterlab-ts

A Renku extension for JupyterLab.

*Nothing lasts forever. Except for reproducible research made with Renku.*

## Prerequisites

* JupyterLab

## Installation

```bash
jupyter labextension install renku-jupyterlab-ts
```

## Development

For a development install (requires npm version 4 or later), do the following
in the repository directory:

```bash
npm install -g yarn
yarn install
yarn build
jupyter labextension link .
```

To rebuild the package and the JupyterLab app:

```bash
yarn build
jupyter lab build
```
