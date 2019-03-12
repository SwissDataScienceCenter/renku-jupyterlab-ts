import * as React from 'react';
import '../style/index.css';
import RenkuTerminalManager from './RenkuTerminalManager';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { PathExt } from '@jupyterlab/coreutils';
import { JupyterLab } from '@jupyterlab/application';

export interface IRenkuPapermillCommand {
    id: string;
    command: string;
    name: string;
    shortcut: string;
    terminalManager: RenkuTerminalManager;
    notebooks: INotebookTracker;
    arguments: Array<string>;
    app:JupyterLab;
};


class RenkuPapermillCommand extends React.Component<IRenkuPapermillCommand>{

    constructor(props: IRenkuPapermillCommand) {
        super(props);
        this.props.notebooks.currentChanged.connect(() => { console.log('changed'); });
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {       
        const nbWidget : NotebookPanel = this.props.app.shell.currentWidget as NotebookPanel;
        //console.log(this.props.app.shell.currentWidget.constructor.name === 'NotebookPanel');
        const nbDirname = PathExt.dirname(nbWidget.context.path);

        if(nbDirname !== ''){
            this.props.terminalManager.runCommand(`cd ${nbDirname};`);
        }

        const nbBasename = PathExt.basename(nbWidget.context.path);
        let command = `renku run papermill ${nbBasename} ${nbBasename.replace('.ipynb', '.ran.ipynb')}\n`
        this.props.terminalManager.runCommand(command);
    }

    render() {
        return (
        
            <li className="p-CommandPalette-item" onClick={this.handleClick}>
                <div className="p-CommandPalette-itemIcon"></div>
                <div className="p-CommandPalette-itemContent">
                    <div className="p-CommandPalette-itemLabel" >
                        {this.props.name}
                    </div>
                </div>
            </li>
        
        );
    }
} export default RenkuPapermillCommand;

