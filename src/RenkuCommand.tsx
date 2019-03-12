import * as React from 'react';
import '../style/index.css';
import RenkuTerminalManager from './RenkuTerminalManager';


export interface IRenkuCommand {
    id: string;
    command: string;
    name: string;
    terminalManager: RenkuTerminalManager;
    arguments: Array<string>;
};

class RenkuCommandArgs extends React.Component<IRenkuCommand>{

    constructor(props: IRenkuCommand) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const input = document.getElementById(this.props.id + "-input").innerText;
        this.props.terminalManager.runCommand(this.props.command + input);
    }

    render() {
        return (
            (this.props.arguments.length !== 0) ?
                <li className="rk-innerTabElement p-CommandPalette-item p-display-none">
                    <div className="p-CommandPalette-itemIcon" ></div>
                    <textarea id={this.props.id + "-input"} rows={2} defaultValue={this.props.arguments[0]} className="jp-textEditorTabBar rk-innerTabTextArea" />
                    <button onClick={this.handleClick}>
                        Run
                    </button>
                </li>
                :
                <p></p>
        )
    }
}

class RenkuCommand extends React.Component<IRenkuCommand, { show: boolean }>{

    constructor(props: IRenkuCommand) {
        super(props);
        this.state = {
            show: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.showAndHide = this.showAndHide.bind(this);
    }

    handleClick() {
        if (this.props.arguments.length === 0)
            this.props.terminalManager.runCommand(this.props.command);
        else
            this.showAndHide();
    }

    showAndHide() {
        this.setState(prevState => ({ show: !prevState.show }));
    }

    render() {
        let showOrHide = this.state.show ? "" : "jp-display-none";
        let icon = this.state.show ? "jp-closedTabElement" : "jp-openedTabElement";
        const iconHTML = (this.props.arguments.length === 0) ?
            <div className={"p-CommandPalette-itemIcon"} onClick={this.showAndHide}></div>
            :
            <div className={"p-CommandPalette-itemIcon " + icon} onClick={this.showAndHide}></div>

        return (
            [
                <li key={this.props.id} className="p-CommandPalette-item" onClick={this.handleClick}>
                    {iconHTML}
                    <div className="p-CommandPalette-itemContent">
                        <div className="p-CommandPalette-itemLabel" >
                            {this.props.name}
                        </div>
                    </div>
                </li>,
                <div id={"args-" + this.props.id} key={"args-" + this.props.id} className={showOrHide}>
                    <RenkuCommandArgs {...this.props} />
                </div>
            ]
        );
    }
} export default RenkuCommand;
