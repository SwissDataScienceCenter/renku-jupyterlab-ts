import * as React from 'react';
import '../../style/help-style.css';
import '../../style/materialize/materialize.min.css';



class CheatSheetTab extends React.Component {

    render() {
        return (
            [<div className="section no-pad-bot" id="index-banner">
                <div className="container">
                    <br /><br />
                    <h2 className="header center purple-text">Renku Cheat Sheet</h2>
                    <div className="row center">
                        <h5 className="header col s12 light">You can find our detailed and latest CLI and SDK for python documentation <a target="_blank" href="https://renku-python.readthedocs.io/en/latest/index.html">here</a>.</h5>
                    </div>
                </div>
            </div>,
            <div key="renku-cheatsheet-main" className="container">
                <div className="section">
                    <div className="row center">
                        <div className="col s12 m12 ">
                            <table className="striped">
                                <thead className="text-darken-1">
                                    <tr>
                                        <th className="s4 m4">Comand</th>
                                        <th className="s8 m8">Functionality</th>
                                    </tr>
                                </thead>
                                <tbody className="light">
                                    <tr>
                                        <td><strong>renku (base command) or renku --help</strong></td>
                                        <td>List available commands (both renku or renku --renku help will return this)</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku --version</strong></td>
                                        <td>Print version number</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku init (inside project path) </strong></td>
                                        <td>This creates a new subdirectory named .renku that contains all the necessary files
                                    for managing the project configuration </td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku init --force</strong></td>
                                        <td>There are situations when the required structure of a Renku project needs to be
                                            recreated or you have an existing Git repository. You can solve these situation by
                                    simply adding the --force option</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku init --force --external-storage</strong></td>
                                        <td>You can also enable the external storage system for output files, if it was not
                                    installed previously</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku config</strong></td>
                                        <td>Get and set Renku repository or global option</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku dataset create my-dataset</strong></td>
                                        <td>Creating an empty dataset inside a Renku project</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku dataset</strong></td>
                                        <td>List all datasets</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku dataset rm some-dataset</strong></td>
                                        <td>Delete a dataset</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku dataset add my-dataset http://data-url</strong></td>
                                        <td>Add data to the dataset</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku dataset add my-dataset git+ssh://host.io/namespace/project.git</strong></td>
                                        <td>To add data from a git repository, you can specify it via https or git+ssh URL schemes</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku run</strong></td>
                                        <td>Track provenance of data created by executing programs. If there were uncommitted changes in the repository, then the renku run command fails. See git status for details</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku log</strong></td>
                                        <td>Show provenance of data created by executing programs</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku status</strong></td>
                                        <td>Show status of data files created in the repository</td>
                                    </tr>
                                    <tr>
                                        <td><strong>renku update</strong></td>
                                        <td>Update outdated files created by the “run” command</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
                , <footer key="renku-cheatsheet-footer" className="about-footer">Built by the <a target="_blank" href="https://datascience.ch/">SDSC</a>. Icons by <a target="_blank" href="https://icons8.com/icon/11691/box-important">Icons8</a> </footer>]
        );
    }

} export default CheatSheetTab;
