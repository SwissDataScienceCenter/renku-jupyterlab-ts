import * as React from 'react';

import RenkuCommand from './RenkuCommand';
import RenkuTerminalManager from './RenkuTerminalManager';
import RenkuPapermillCommand from './RenkuRunPapermillCommand';
import { JupyterLab } from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import AboutCommand from './help/AboutCommand';
import HelpCommand from './help/HelpCommand';
import CheatSheetCommand from './help/CheatSheetCommand';

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
                    id="renku"
                    name="Renku"
                    command="renku"
                    terminalManager={this.props.terminalManager}
                    arguments={[{id:"help", label:"Help", arg:"--help", type:"checkbox" , value:false, quotes:false},
                                {id:"version", label:"Version", arg:"--version", type:"checkbox" , value:false, quotes:false}]} 
                    submitLabel="Run" />
                
                <RenkuCommand
                    id="renkustatus"
                    name="Renku Status"
                    command="renku status"
                    terminalManager={this.props.terminalManager}
                    arguments={[]}
                    submitLabel=""  />

                <RenkuCommand
                    id="renkulog"
                    name="Renku Log"
                    command="renku log"
                    terminalManager={this.props.terminalManager}
                    arguments={[]}
                    submitLabel=""  />

                <RenkuCommand
                    id="renkurun"
                    name="Renku Run"
                    command="renku run"
                    terminalManager={this.props.terminalManager}
                    arguments={[]}
                    submitLabel=""  />

                <RenkuPapermillCommand
                    id="renkupapermill"
                    name="Renku Run Papermill"
                    command="renku run papermill"
                    app={this.props.app}
                    enabled={this.props.app.shell.currentWidget !== null && this.props.app.shell.currentWidget.constructor.name === 'NotebookPanel'}
                    terminalManager={this.props.terminalManager}
                    arguments={[]}
                    notebooks={this.props.notebooks} />

                <RenkuCommand
                    id="datasetcreate"
                    name="Create Datasettt"
                    command="renku dataset create"
                    terminalManager={this.props.terminalManager}
                    arguments={[{id:"datasetname", label:"Dataset Name", arg:" ", type:"text" , value:"", quotes:false}]}
                    submitLabel="Create"  />

                <RenkuCommand
                    id="datasetadd"
                    name="Add Dataset"
                    command="renku dataset add"
                    terminalManager={this.props.terminalManager}
                    arguments={[{id:"datasetname", label:"Dataset Name", arg:" ", type:"text" , value:"", quotes:false},
                                {id:"datasetudl", label:"Dataset URL", arg:" ", type:"text" , value:"", quotes:false}]}
                    submitLabel="Add"  />


                <RenkuCommand
                    id="gitlfstrack"
                    name="Git Lfs Track"
                    command="git lfs track"
                    terminalManager={this.props.terminalManager}
                    arguments={[]} 
                    submitLabel="" />

                {/* <RenkuCommand
                    id="importdataset"
                    name="import datasettt"
                    command="renku dataset import"
                    terminalManager={this.props.terminalManager}
                    arguments={[{id:"url", label:"Url", arg:"-h", type:"text" , value:""},
                        {id:"doi",  label:"DOI", arg:"-h", type:"text" , value:""}]} /> */}
                    
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
                    id="gitstatus"
                    name="Status"
                    command="git status"
                    terminalManager={this.props.terminalManager}
                    arguments={[]}
                    submitLabel="" />

                <RenkuCommand
                    id="gitaddall"
                    name="Add All (.)"
                    command="git add ."
                    terminalManager={this.props.terminalManager}
                    arguments={[]}
                    submitLabel=""  />   

                <RenkuCommand
                    id="gitcommit"
                    name="Commit"
                    command="git commit"
                    terminalManager={this.props.terminalManager}
                    arguments={[{id:"message", label:"Message", arg:"-m", type:"text" , value:"", quotes:true}]}
                    submitLabel="Commit"  />

                <RenkuCommand
                    id="gitpush"
                    name="Push"
                    command="git push"
                    terminalManager={this.props.terminalManager}
                    arguments={[]}
                    submitLabel=""  />
                
            </ul>
        );
    };
} export { GitCommands };

class HelpCommands extends React.Component<IRenkuCommands>{

    constructor(props: IRenkuCommands) {
        super(props);
    };

    render() {
        return (
            <ul className="p-CommandPalette-content">
                <AboutCommand
                    id="aboutcommand"
                    name="About Renku"
                    app={this.props.app}
                />
                <HelpCommand
                    id="helpcommand"
                    name="Nav Bar Help"
                    app={this.props.app}
                />
                <CheatSheetCommand
                    id="cheatsheetcommand"
                    name="Cheat Sheet"
                    app={this.props.app}
                />

            </ul>
        );
    };
} export { HelpCommands };