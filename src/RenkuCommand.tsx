import * as React from 'react';
import '../style/index.css';
import RenkuTerminalManager from './RenkuTerminalManager';


export interface IRenkuCommand {
    id: string;
    command: string;
    name: string;
    shortcut: string;
    terminalManager: RenkuTerminalManager;
    arguments: Array<string>;
};

class RenkuCommandArgs extends React.Component<IRenkuCommand>{

    constructor(props: IRenkuCommand) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const input = document.getElementById(this.props.id+"-input").innerText;
        this.props.terminalManager.runCommand(this.props.command+input);
        document.getElementById("args-" + this.props.id).classList.add("jp-display-none");
    }

    render() {
        return (
            (this.props.arguments.length!==0) ?
                <li id={"args-" + this.props.id} className="p-display-none">
                    <div className="p-CommandPalette-itemIcon" ></div>
                    <input id={this.props.id+"-input"} defaultValue="-m " className="jp-textEditorTabBar" />
                    <button onClick={this.handleClick}>
                        Run
                    </button>
                </li>
            :
                <p></p>  
        )
    }
}

class RenkuCommand extends React.Component<IRenkuCommand>{

    constructor(props: IRenkuCommand) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        if (arguments.length === 0)
            this.props.terminalManager.runCommand(this.props.command);
        else {
            document.getElementById("args-" + this.props.id).classList.remove("jp-display-none");
        }
    }

    render() {
        return (
        [
            <li className="p-CommandPalette-item" onClick={this.handleClick}>
                <div className="p-CommandPalette-itemIcon"></div>
                <div className="p-CommandPalette-itemContent">
                    <div className="p-CommandPalette-itemLabel" >
                        {this.props.name}
                    </div>
                </div>
            </li>,
            <RenkuCommandArgs {...this.props} />
        ]
        );
    }
} export default RenkuCommand;

