import * as React from 'react';

import RenkuCommand from './RenkuCommand';
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
        this.props.app.shell.currentChanged.connect(() => {
            this.setState({ currentWidget: this.props.app.shell.currentWidget })
        });
    };

    render() {
        return (
            <ul className="p-CommandPalette-content">
                <RenkuCommand
                    id="renkustatus"
                    name="renku status"
                    command="renku status"
                    terminalManager={this.props.terminalManager}
                    arguments={[]} />

                <RenkuCommand
                    id="renkulog"
                    name="log"
                    command="renku log"
                    terminalManager={this.props.terminalManager}
                    arguments={[]} />

                <RenkuCommand
                    id="renkurun"
                    name="renku run"
                    command="renku run"
                    terminalManager={this.props.terminalManager}
                    arguments={["arguments... run -h for help"]} />

                <RenkuPapermillCommand
                    id="renkupapermill"
                    name="renku run papermill"
                    command="renku run papermill"
                    app={this.props.app}
                    enabled={this.props.app.shell.currentWidget !== null && this.props.app.shell.currentWidget.constructor.name === 'NotebookPanel'}
                    terminalManager={this.props.terminalManager}
                    arguments={[]}
                    notebooks={this.props.notebooks} />
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
                    terminalManager={this.props.terminalManager}
                    arguments={[]} />

                <RenkuCommand
                    id="gitcommit"
                    name="commit"
                    command="git commit"
                    terminalManager={this.props.terminalManager}
                    arguments={["-m"]} />
            </ul>
        );
    };
} export { GitCommands };