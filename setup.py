"""
jl_renku setup
"""
import json
from pathlib import Path

from jupyter_packaging import (
    create_cmdclass,
    install_npm,
    ensure_targets,
    combine_commands,
    skip_if_exists,
)
import setuptools

HERE = Path(__file__).parent.resolve()

# The name of the project
name = "jl_renku"

# Get our version
pkg_json = json.loads((HERE / "package.json").read_bytes())
version = pkg_json["version"]

lab_path = HERE / name / "labextension"

# Representative files that should exist after a successful build
jstargets = [
    str(lab_path / "package.json"),
]

package_data_spec = {
    name: ["*"],
}

labext_name = "jl-renku"

data_files_spec = [
    ("share/jupyter/labextensions/%s" % labext_name, str(lab_path), "**"),
    ("share/jupyter/labextensions/%s" % labext_name, str(HERE), "install.json"),  # noqa: 501
    ("etc/jupyter/jupyter_server_config.d", "jupyter-config", "jl_renku.json"),
]

cmdclass = create_cmdclass("jsdeps", package_data_spec=package_data_spec, data_files_spec=data_files_spec)  # noqa: 501

js_command = combine_commands(
    install_npm(HERE, build_cmd="build:prod", npm=["jlpm"]),
    ensure_targets(jstargets),
)

is_repo = (HERE / ".git").exists()
if is_repo:
    cmdclass["jsdeps"] = js_command
else:
    cmdclass["jsdeps"] = skip_if_exists(jstargets, js_command)

long_description = (HERE / "README.md").read_text()

tests_require = [
    "black==19.10b0",
    "check-manifest>=0.37,<0.47",
    "coverage>=4.5.3,<5.4",
    "fakeredis>=1.4.1,<1.4.6",
    "flake8>=3.8,<3.9",
    "flaky==3.7.0",
    "freezegun>=0.3.12,<1.0.1",
    "isort>=5.3.2,<5.8.0",
    "pydocstyle>=3.0.0,<5.1.2",
    "pytest-black>=0.3.10,<0.3.13",
    "pytest-cache==1.0",
    "pytest-cov>=2.5.1,<2.11.0",
    "pytest-flake8>=1.0.6,<1.0.8",
    "pytest-mock>=3.2.0,<3.6.0",
    "pytest-timeout==1.4.2",
    "pytest-pep8==1.0.6",
    "pytest-xdist>=1.34.0,<2.3.0",
    "pytest>=4.0.0,<6.2.2",
    "responses>=0.7.0,<0.12.2",
]

extras_require = {
    "tests": tests_require,
}

setup_args = dict(
    name=name,
    version=pkg_json["version"],
    url=pkg_json["homepage"],
    author=pkg_json["author"],
    description=pkg_json["description"],
    license=pkg_json["license"],
    long_description=long_description,
    long_description_content_type="text/markdown",
    cmdclass=cmdclass,
    packages=setuptools.find_packages(),
    install_requires=["jupyterlab~=3.0", "gitpython~=3.1"],
    zip_safe=False,
    include_package_data=True,
    python_requires=">=3.6",
    platforms="Linux, Mac OS X, Windows",
    extras_require=extras_require,
    tests_require=tests_require,
    keywords=["Jupyter", "JupyterLab", "JupyterLab3"],
    classifiers=[
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Framework :: Jupyter",
    ],
)


if __name__ == "__main__":
    setuptools.setup(**setup_args)
