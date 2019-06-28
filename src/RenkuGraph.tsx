import * as React from 'react';

import RenkuTerminalManager from './RenkuTerminalManager';
import { JupyterLab } from '@jupyterlab/application';
import { MessageLoop } from '@phosphor/messaging';
import { FileBrowser, DirListing } from '@jupyterlab/filebrowser';
import { DocumentManager } from '@jupyterlab/docmanager';

export interface IRenkuGraphProps {
    app: JupyterLab;
    terminalManager: RenkuTerminalManager;
    docManager: DocumentManager;
};

interface IRenkuGraphState {
    visible: boolean;
    computing: boolean;
    error: string;
    currentFile: any;
    loopCounter: number;
}

const RENKU_GRAPH_PATH = ".git/renkuLineage.svg";

class RenkuGraph extends React.Component<IRenkuGraphProps, IRenkuGraphState> {
    constructor(props: IRenkuGraphProps) {
        super(props);
        this.state = {
            visible: false,
            computing: false,
            error: null,
            currentFile: null,
            loopCounter: 0
        }

        // create hook to get selected file data
        let fileBrowser;
        const leftWidgets = this.props.app.shell.widgets("left");
        for (let current = leftWidgets.next(); current !== undefined; current = leftWidgets.next()) {
            if (current.id === "filebrowser") {
                fileBrowser = current as FileBrowser;
                break;
            }
        }
        const dirlisting = fileBrowser["_listing"] as DirListing;
        this.createFileBrowserHook(dirlisting);

        // bindings
        this.toggleVisibility = this.toggleVisibility.bind(this);
        this.activateFileBrowser = this.activateFileBrowser.bind(this);
        this.graphGenerator = this.graphGenerator.bind(this);
    }

    toggleVisibility() {
        this.setState({ visible: !this.state.visible });
    }

    activateFileBrowser() {
        if (!this.state.computing) {
            this.props.app.shell.activateById("filebrowser");
        } 
    }

    createFileBrowserHook(dirListing: DirListing) {
        MessageLoop.installMessageHook(dirListing, () => {
            // consider only the last selected item for multi-selection.
            const { currentFile } = this.state;
            const newFile = dirListing.selectedItems().next();
            if (!newFile) {
                if (this.state.currentFile !== null) {
                    this.setState({ "currentFile" : null, "error": null });
                }
                return true;
            }
            if (currentFile === null || newFile.path !== currentFile.path) {
                this.setState({ "currentFile": newFile, "error": null });
            }
            return true;
        });
    }

    graphGenerator() {
        const { currentFile } = this.state;
        if (currentFile === null || currentFile.type === "directory") {
            this.setState({ error: "invalid input file" });
            return;
        }
        if (this.state.error !== null) {
            this.setState({ error: null });
        }
        this.setState({ computing: true });
        this.props.docManager.deleteFile(RENKU_GRAPH_PATH)
            .then(data => { this.createGraph(currentFile.path, RENKU_GRAPH_PATH)})
            .catch(error => { this.createGraph(currentFile.path, RENKU_GRAPH_PATH)});
    }

    createGraph(currentPath: string, outputPath: string) {
        const fullCurrentPath = this.buildFullPath(currentPath);
        const fullOutputPath = this.buildFullPath(outputPath);
        const command = "renku log --format dot " + fullCurrentPath + " | dot -Tsvg -o " + fullOutputPath;
        this.props.terminalManager.runCommand(command)
            .then(data => {
                this.setState({loopCounter: 0});
                this.openGraphLoop(fullOutputPath);
            })
            .catch(error => {this.setState({ error: "can't run renku command", computing: false })});
    }

    buildFullPath(partialPath: string) {
        return this.props.app.info.directories.serverRoot + "/" + partialPath;
    }
 
    openGraphLoop(path: string) {
        // check if the file has already been created
        this.props.docManager.rename(RENKU_GRAPH_PATH, RENKU_GRAPH_PATH)
            .then(data => { 
                const graph = this.props.docManager.open(RENKU_GRAPH_PATH);
                this.props.app.shell.addToMainArea(graph);
                this.setState({ computing: false });
            })
            .catch(error => {
                // timeout after a few loops
                const loopCounter = this.state.loopCounter + 1;
                if (loopCounter >= 50) {
                    this.setState({ error: "graph creation timeout", computing: false});
                    return;
                }
                this.setState({ loopCounter });
                setTimeout(() => {this.openGraphLoop(path)}, 1000);
            });
    }

    render() {
        const currentFile = this.state.currentFile === null ?
            "none" :
            this.state.currentFile.type === "directory" ?
                "invalid (directory)" :
                this.state.currentFile.path;
        const disabledButton = this.state.currentFile === null || this.state.currentFile.type === "directory" || this.state.computing ?
            true : false;
        const error = this.state.error ?
            <span className="error-text">Error: {this.state.error}</span> :
            null

        return [
            <li key="graphButton" className="p-CommandPalette-item" onClick={this.toggleVisibility}>
                <div className={"p-CommandPalette-itemIcon jp-" + (this.state.visible ? "closed" : "opened") + "TabElement" }></div>
                <div className="p-CommandPalette-itemContent">
                    <div className="p-CommandPalette-itemLabel">Compute Lineage</div>
                </div>
            </li>,
            <div key="graphInfo" className={!this.state.visible ? " jp-display-none" : ""}>
                <li key="graphInfo" className="p-CommandPalette-item rk-innerTabElement">
                <div className="p-CommandPalette-itemIcon"></div>
                <div className="rk-argumentsForm">
                        <div>
                            Current file
                            <textarea rows={2} className="jp-textEditorTabBar rk-innerTabTextArea"
                                value={currentFile} onClick={this.activateFileBrowser}
                                onChange={() => {}} readOnly />
                            {error}
                        </div>
                        <button onClick={this.graphGenerator} disabled={disabledButton}>
                            {this.state.computing ? "Creating graph..." : "Show Graph"}
	                    </button>
                    </div>
                </li>
            </div>
            
        ];
    }
} export { RenkuGraph };
