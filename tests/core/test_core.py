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
import os

from git import Repo

from jl_renku import core


def test_session_info_implicit(renku_repo):
    # Test the repo_info function when no repo path is provided
    repo = Repo(renku_repo)
    repo_info = core.repo_info()
    assert repo_info["project"] == "jl-extension-test-0-12"
    assert repo_info["renkulabUrl"] == "https://dev.renku.ch/projects/cramakri/jl-extension-test-0-12"
    assert repo_info["branch"] == str(repo.active_branch)
    assert repo_info["commit"] == str(repo.head.ref.commit.hexsha)
    assert repo_info["isDirty"] is False

    with open(os.path.join(renku_repo, "foo.txt"), "w+") as f:
        f.write("Blah blah\n")

    assert core.repo_info()["isDirty"] is True


def test_session_info_explicit(renku_repo):
    # Test the repo_info function when a repo path is provided
    repo = Repo(renku_repo)
    repo_info = core.repo_info(renku_repo)
    # A more dynamic way of doing the project name check compared to other test
    assert repo_info["project"] == os.path.basename(renku_repo)
    assert repo_info["commit"] == repo.head.ref.commit.hexsha
