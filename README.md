# jl-renku

![Github Actions Status](hhttps://github.com/SwissDataScienceCenter/renku-ui/workflows/Build/badge.svg)

A JupyterLab extension for Renku.

This extension is composed of a Python package named `jl_renku`
for the server extension and a NPM package named `jl-renku`
for the frontend extension.

## Requirements

- JupyterLab >= 3.0

## Install

To install from pypi, run the following command (this will fail at the moment, since jl_renku has not been published to pypi yet):

```bash
pip install jl_renku
```

If you have NodeJS available, you can also install from the repo:

```bash
pip install .
```

## Troubleshoot

If you are seeing the frontend extension, but it is not working, check
that the server extension is enabled:

```bash
jupyter server extension list
```

If the server extension is installed and enabled, but you are not seeing
the frontend extension, check the frontend extension is installed:

```bash
jupyter labextension list
```

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

#### Create environment for development (optional)

If you have not already done so, you will probably want to set up an environment for developing the extension. Detailed instructions are in the [JupyterLab Extension Tutorial](https://jupyterlab.readthedocs.io/en/stable/extension/extension_tutorial.html#set-up-a-development-environment).

Here are the key commands (assuming [conda](https://docs.conda.io/en/latest/miniconda.html) is installed) to create a conda environment that includes all prerequisites and the development version of JupyterLab:

```
conda create -n jupyterlab-ext --override-channels --strict-channel-priority -c conda-forge -c anaconda cookiecutter nodejs jupyter-packaging git
conda activate jupyterlab-ext
pip install jupyterlab --pre
```

#### Install extension in development mode

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the renku-jupyterlab-ts directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Building

To build the extension for deployment as a python package, first make sure `jupyter_packaging` is installed. If not, install it with

```
pip install jupyter_packaging
```

Then you can create a wheel package with

```
python setup.py bdist_wheel
```

You will find the package in the `dist/` directory.

[Refer to the JupyterLab documentation](https://jupyterlab.readthedocs.io/en/stable/extension/extension_tutorial.html?highlight=extension#packaging-your-extension) for more detailed instructions.

### Uninstall

```bash
pip uninstall jl_renku
jupyter labextension uninstall jl-renku
```
