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
from git import Repo


def renkulab_url_from_gitlab_url(gitlab_url):
    # Replace "gitlab" with "projects" and drop ".git"
    return gitlab_url.replace("gitlab", "projects", 1)[0:-4]


def repo_info(path="."):
    """Return information about the repository.

    :param path: The path to the repository.
    :type path: string

    :return: dict. Return information about the repository.
    Keys: project, renkulabUrl, branch, commit
    """
    repo = Repo(path)
    result = {}
    origin_url = repo.remotes.origin.url
    url_comps = origin_url.split("/")
    renkulab_url = renkulab_url_from_gitlab_url(repo.remotes.origin.url)
    # the project name is the last part of the url - ".git"
    result["project"] = url_comps[-1][0:-4]
    # TS complains on identifiers that are not CamelCase
    result["renkulabUrl"] = renkulab_url
    result["branch"] = str(repo.active_branch)
    result["commit"] = str(repo.head.ref.commit.hexsha)
    result["isDirty"] = repo.is_dirty(untracked_files=True)
    return result
