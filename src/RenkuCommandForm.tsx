import * as React from 'react';
import '../style/index.css';
import RenkuTerminalManager from './RenkuTerminalManager';

export interface IRenkuCommand {
    command: string;
    name: string;
    shortcut: string;
    terminalManager: RenkuTerminalManager;
};

class RenkuCommandForm extends React.Component<IRenkuCommand>{

    constructor(props: IRenkuCommand) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.terminalManager.runCommand(this.props.command);
    }

    render() {
        return ([
            <li className="p-CommandPalette-item">
                <div className="p-CommandPalette-itemIcon"></div>
                <div className="p-CommandPalette-itemContent">
                    <div className="p-CommandPalette-itemLabel" >
                        {this.props.name}
                    </div>
                </div>
            </li>
            ,
            <li className="p-CommandPalette-item rk-innerTabElement" >
                <div className="p-CommandPalette-itemIcon"></div>
                <textarea defaultValue="command..." className="jp-textEditorTabBar" />
                <button onClick={this.handleClick}>
                    Run
                </button>
            </li>
        ]
        );
    }
}

export default RenkuCommandForm;
