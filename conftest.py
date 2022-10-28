# -*- coding: utf-8 -*-
#
# Copyright 2021 Swiss Data Science Center (SDSC)
# A partnership between École Polytechnique Fédérale de Lausanne (EPFL) and
# Eidgenössische Technische Hochschule Zürich (ETHZ).
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

"""Pytest configuration."""
import tarfile
from pathlib import Path

import pytest


@pytest.fixture
def renku_repo(tmp_path):
    """Prepares a testing repo created by renku."""
    # based on renku-python/conftest.py::old_repository_with_submodules
    from jl_renku.contexts import chdir

    name = "jl-extension-test-0-12"
    base_path = Path(__file__).parent / "tests" / "fixtures" / f"{name}.tar.gz"

    working_dir = tmp_path / name

    with tarfile.open(str(base_path), "r") as repo:
        
        import os
        
        def is_within_directory(directory, target):
            
            abs_directory = os.path.abspath(directory)
            abs_target = os.path.abspath(target)
        
            prefix = os.path.commonprefix([abs_directory, abs_target])
            
            return prefix == abs_directory
        
        def safe_extract(tar, path=".", members=None, *, numeric_owner=False):
        
            for member in tar.getmembers():
                member_path = os.path.join(path, member.name)
                if not is_within_directory(path, member_path):
                    raise Exception("Attempted Path Traversal in Tar File")
        
            tar.extractall(path, members, numeric_owner=numeric_owner) 
            
        
        safe_extract(repo, working_dir)

    repo_path = working_dir / name

    with chdir(repo_path):
        yield repo_path
