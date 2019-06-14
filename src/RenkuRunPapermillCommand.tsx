import * as React from 'react';
import '../style/index.css';
import RenkuTerminalManager from './RenkuTerminalManager';
import { INotebookTracker, NotebookPanel } from '@jupyterlab/notebook';
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

type RunPapermillState = {
    firstClick: boolean,
    show: boolean,
    rows: number,
    paramsValueProcessed: string,
    paramsValueUnprocessed: string,
    hasParameters: boolean,
    notebookIsActive: boolean
};

class RenkuPapermillCommand extends React.Component<IRenkuPapermillCommand, RunPapermillState> {
    constructor(props: IRenkuPapermillCommand) {
        super(props);
        this.state = {
            firstClick: false,
            show: false,
            rows: 0,
            paramsValueProcessed: "parameters...",
            paramsValueUnprocessed: "parameters...",
            hasParameters: this.hasParameters(),
            notebookIsActive: false
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
        let textValue = " " + this.state.paramsValueProcessed.replace("\n", " ");
        this.renkuRunPapermill(textValue);
    }

    renkuRunPapermill(params: string) {
        this.setState({ firstClick: true, show: true });
        const nbWidget: NotebookPanel = this.props.app.shell.currentWidget as NotebookPanel;
        const path = nbWidget.context.path;
        this.props.terminalManager.runCommand(`pushd . && cd ${this.props.app.info.directories.serverRoot}`);
        this.props.terminalManager.runCommand(`git add ${path} && git commit -m"renku: snapshot ${path} before running"`);
        this.props.terminalManager.runCommand(`renku run papermill ${path} ${path.replace('.ipynb', '.ran.ipynb')} ${params}`);
        this.props.terminalManager.runCommand(`popd`);
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
            if (this.state.hasParameters !== this.hasParameters()) {
                const hasParams = this.hasParameters();
                if (hasParams) {
                    this.setState({ hasParameters: hasParams });
                    this.processParameters();
                    this.showAndHide();
                }
            } else {
                this.processParameters();
                if (this.state.hasParameters || this.hasParameters()) {
                    this.showAndHide();
                } else {
                    this.renkuRunPapermill("");
                }
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

    handleTextArgChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ paramsValueProcessed: e.target.value });
    }

    render() {
        let enabled = this.props.enabled ? "p-CommandPalette-item" : "p-CommandPalette-item p-mod-disabled";
        let showOrHide = this.state.show ? "" : "jp-display-none";
        let icon = this.state.show ? "jp-closedTabElement" : "jp-openedTabElement";
        let iconHtml = this.state.hasParameters ?
            <div className={"p-CommandPalette-itemIcon " + icon}></div> :
            <div className={"p-CommandPalette-itemIcon "} ></div>

        return ([
            <li key={this.props.id} id={this.props.id} className={enabled} onClick={this.handleFirstClick}>
                {iconHtml}
                <div className="p-CommandPalette-itemContent"  >
                    <div className="p-CommandPalette-itemLabel" >
                        {this.props.name}
                    </div>
                </div>
            </li>,
            this.state.hasParameters ? <div key="parameterRender">
                <li className={"rk-innerTabElement p-CommandPalette-item p-display-none " + showOrHide}>
                    <div className="p-CommandPalette-itemIcon"></div>
                    <div id="runrenkupapermill-input" className="rk-argumentsForm">
                        <div>Parameters (From Cell)
                    <textarea id="parameters-raw-text" rows={this.state.rows + 1} readOnly={true} value={this.state.paramsValueUnprocessed} disabled={!this.props.enabled} className={"jp-textEditorTabBar rk-innerTabTextArea"} />
                        </div>
                        <div>Parameters (Edit to Change)
                    <textarea id="parameters-processed-text" rows={this.state.rows + 1} value={this.state.paramsValueProcessed} disabled={!this.props.enabled} className={"jp-textEditorTabBar rk-innerTabTextArea"} onChange={e => this.handleTextArgChange(e)} />
                        </div>
                        <button onClick={this.handleSecondClick} >Run</button>
                    </div>
                </li>
            </div> : null
        ]
        );
    }
} export default RenkuPapermillCommand;
