import * as React from 'react';

import RenkuCommand from './RenkuCommand';
import RenkuCommandForm from './RenkuCommandForm';
import RenkuTerminalManager from './RenkuTerminalManager';
import RenkuPapermillCommand from './RenkuRunPapermillCommand';
import { JupyterLab } from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';


export interface IRenkuCommands {
    app: JupyterLab;
    notebooks: INotebookTracker;
    terminalManager: RenkuTerminalManager;
};

class RenkuCommands extends React.Component<IRenkuCommands>{

    constructor(props: IRenkuCommands) {
        super(props);
        this.state = {
            currentWidget: this.props.app.shell.currentWidget
        }
        this.props.app.shell.currentChanged.connect(()=>{
            console.log("changeeeeedddd ddd dd d");
            this.setState({currentWidget:this.props.app.shell.currentWidget})});
    };

    render() {
        return (
            <ul className="p-CommandPalette-content">
                <RenkuCommand
                    id="renkustatus"
                    name="renku status"
                    command="status"
                    shortcut="shortcut"
                    terminalManager={this.props.terminalManager}
                    arguments={new Array<string>()} />

                <RenkuCommand
                    id="renkulog"
                    name="log"
                    command="renku log"
                    shortcut="shortcut 2"
                    terminalManager={this.props.terminalManager}
                    arguments={new Array<string>()} />

                { (this.props.app.shell.currentWidget!==null && this.props.app.shell.currentWidget.constructor.name === 'NotebookPanel') ?
                    <RenkuPapermillCommand
                        id="renkupapermill"
                        name="run papermill"
                        command="renku papermill"
                        shortcut="shortcut 2"
                        app={this.props.app}
                        terminalManager={this.props.terminalManager}
                        arguments={new Array<string>()}
                        notebooks={this.props.notebooks} /> :
                    <p />
                }

                <RenkuCommandForm
                    name="run"
                    command="renku run"
                    shortcut="shortcut 2"
                    terminalManager={this.props.terminalManager} />
            </ul>
        );
    };
} export default RenkuCommands;

class GitCommands extends React.Component<IRenkuCommands>{

    constructor(props: IRenkuCommands) {
        super(props);
    };

    render() {
        return (
            <ul className="p-CommandPalette-content">
                <RenkuCommand
                    id="gitpush"
                    name="push"
                    command="git push"
                    shortcut="shortcut"
                    terminalManager={this.props.terminalManager}
                    arguments={new Array<string>()} />

                <RenkuCommand
                    id="gitcommit"
                    name="commit"
                    command="git commit"
                    shortcut="shortcut 2"
                    terminalManager={this.props.terminalManager}
                    arguments={["-m"]} />
            </ul>
        );
    };
} export { GitCommands };