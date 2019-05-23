import * as React from 'react';
import '../style/index.css';
import RenkuTerminalManager from './RenkuTerminalManager';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
import { PathExt } from '@jupyterlab/coreutils';
import { JupyterLab } from '@jupyterlab/application';
import { ICellModel } from '@jupyterlab/cells';
import { IIterator } from '@phosphor/algorithm';

export interface IRenkuPapermillCommand {
    id: string;
    command: string;
    name: string;
    terminalManager: RenkuTerminalManager;
    notebooks: INotebookTracker;
    arguments: Array<string>;
    app: JupyterLab;
    enabled: boolean;
};

// renku dataset import --help

class RenkuPapermillCommand extends React.Component<IRenkuPapermillCommand, { firstClick: boolean, show: boolean, rows: number, paramsValueProcessed: string, paramsValueUnprocessed: string }> {
    constructor(props: IRenkuPapermillCommand) {
        super(props);
        this.state = {
            firstClick: false,
            show: false,
            rows: 0,
            paramsValueProcessed: "parameters...",
            paramsValueUnprocessed: "parameters..."
        }
        this.handleFirstClick = this.handleFirstClick.bind(this);
        this.handleSecondClick = this.handleSecondClick.bind(this);
        this.showAndHide = this.showAndHide.bind(this);
    }

    hasPropertyCell(cells: IIterator<ICellModel>) {
        let cell = cells.next() as ICellModel;
        while (cell !== undefined) {
            if (cell.metadata.values().length > 0) {
                let innerIter = cell.metadata.values().values();
                let innerJson = innerIter.next();
                while (innerIter !== undefined) {
                    if (innerJson.value.toString() === "parameters")
                        return cell.value.text;
                    innerJson = innerIter.next();
                }
            }
            cell = cells.next();
        }
        return null;
    }

    handleSecondClick() {
        let textAreaCmd: HTMLTextAreaElement = document.getElementById('parameters-processed-text') as HTMLTextAreaElement;
        let textValue = " " + textAreaCmd.value.replace("\n", " ");
        this.renkuRunPapermill(textValue);
    }

    renkuRunPapermill(params: string) {
        this.setState({ firstClick: true, show: true });
        const nbWidget: NotebookPanel = this.props.app.shell.currentWidget as NotebookPanel;
        const nbDirname = PathExt.dirname(nbWidget.context.path);
        if (nbDirname !== '') {
            this.props.terminalManager.runCommand(`cd ${nbDirname};`);
        }
        const nbBasename = PathExt.basename(nbWidget.context.path);
        let command = `renku run papermill ${nbBasename} ${nbBasename.replace('.ipynb', '.ran.ipynb')} ${params}  \n`
        this.props.terminalManager.runCommand(command);
    }

    hasParameters() {
        if (this.props.enabled) {
            const nbWidget: NotebookPanel = this.props.app.shell.currentWidget as NotebookPanel;
            let iterator: IIterator<ICellModel> = nbWidget.content.model.cells.iter() as IIterator<ICellModel>;
            let parameters = this.hasPropertyCell(iterator);
            if (parameters !== null)
                return true;
            else
                return false;
        } else {
            return false;
        }
    }

    handleFirstClick() {
        if (this.props.enabled) {
            const nbWidget: NotebookPanel = this.props.app.shell.currentWidget as NotebookPanel;
            this.processParameters();
            if (this.hasParameters()) {
                this.showAndHide();
            } else {
                const nbDirname = PathExt.dirname(nbWidget.context.path);
                if (nbDirname !== '') {
                    this.props.terminalManager.runCommand(`cd ${nbDirname};`);
                }
                const nbBasename = PathExt.basename(nbWidget.context.path);
                let command = `renku run papermill ${nbBasename} ${nbBasename.replace('.ipynb', '.ran.ipynb')}\n`
                this.props.terminalManager.runCommand(command);
            }
        }
    }

    processParameters() {
        if (this.props.enabled) {
            const nbWidget: NotebookPanel = this.props.app.shell.currentWidget as NotebookPanel;
            let iterator: IIterator<ICellModel> = nbWidget.content.model.cells.iter() as IIterator<ICellModel>;
            let parameters = this.hasPropertyCell(iterator);
            if (parameters !== null) {
                let paramsArray = parameters.split('\n');
                let paramsProcessed = "";
                this.setState({ rows: 0 });
                paramsArray.forEach((element) => {
                    if (this.state.rows <= 5)
                        this.setState(prevState => ({ rows: prevState.rows + 1 }));
                    if (element.search("=") > 0) {
                        element = element.replace("=", " ");
                        element = "-p " + element;
                        if (paramsProcessed !== "")
                            paramsProcessed = paramsProcessed + "\n";
                        paramsProcessed = paramsProcessed + element
                    }
                });
                this.setState({ paramsValueProcessed: paramsProcessed, paramsValueUnprocessed: parameters });
            } else {
                this.setState({ paramsValueProcessed: "parameters...", paramsValueUnprocessed: "parameters..." })
            }
        }
    }

    showAndHide() {
        this.setState(prevState => ({ show: !prevState.show }));
    }

    render() {
        let enabled = this.props.enabled ? "p-CommandPalette-item" : "p-CommandPalette-item p-mod-disabled";
        let showOrHide = this.state.show ? "" : "jp-display-none";
        let icon = this.state.show ? "jp-closedTabElement" : "jp-openedTabElement";
        let iconHtml = this.hasParameters() ?
            <div className={"p-CommandPalette-itemIcon " + icon}></div> :
            <div className={"p-CommandPalette-itemIcon "} ></div>

        let noEditTextArea = this.hasParameters() ?
            <li id="parameters-raw" key="parameters-raw" className={"rk-innerTabElement p-CommandPalette-item " + showOrHide + " " + enabled} >
                <div className="p-CommandPalette-itemIcon"></div>
                <textarea id="parameters-raw-text" rows={this.state.rows} readOnly={true} value={this.state.paramsValueUnprocessed} disabled={!this.props.enabled} className={"jp-textEditorTabBar rk-innerTabTextArea"} />
            </li>
            : <p key="parameters-raw"></p>

        let editTextArea = this.hasParameters() ?
            <li id="parameters-processed" key="parameters-processed" hidden={!this.hasParameters()} className={"rk-innerTabElement p-CommandPalette-item " + showOrHide} >
                <div className="p-CommandPalette-itemIcon"></div>
                <textarea id="parameters-processed-text" rows={this.state.rows} value={this.state.paramsValueProcessed} disabled={!this.props.enabled} className={"jp-textEditorTabBar rk-innerTabTextArea"} />
                <button onClick={this.handleSecondClick}>
                    Run
                 </button>
            </li>
            : <p key="parameters-processed"></p>

        return ([
            <li key={this.props.id} id={this.props.id} className={enabled} onClick={this.handleFirstClick}>
                {iconHtml}
                <div className="p-CommandPalette-itemContent"  >
                    <div className="p-CommandPalette-itemLabel" >
                        {this.props.name}
                    </div>
                </div>
            </li>,
            noEditTextArea
            ,
            editTextArea
        ]
        );
    }
} export default RenkuPapermillCommand;
