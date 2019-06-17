import * as React from 'react';
import '../style/index.css';
import RenkuTerminalManager from './RenkuTerminalManager';

export interface IRenkuCommand {
    id: string;
    command: string;
    name: string;
    terminalManager: RenkuTerminalManager;
    arguments: Array<IRenkuArgField>;
    submitLabel:string;
};

export interface IRenkuArgField {
    label: string,
    arg: string,
    value: any,
    type: string,
    id: string, 
    quotes: boolean
}

const ARG_TYPES = {
    TEXT: "text",
    CHECKBOX: "checkbox"
}

type MyState = {arguments: Array<IRenkuArgField>}

class RenkuCommandArgs extends React.Component<IRenkuCommand, MyState>{

    constructor(props: IRenkuCommand) {
        super(props);
        this.state = {
            arguments: this.props.arguments
        }
        this.handleClick = this.handleClick.bind(this);

    }

    getArgumentsInput(){
        let argumentsText = "";
        this.state.arguments.map((element) => {
            if (element.type === ARG_TYPES.TEXT)
                if(element.quotes)
                    argumentsText+=" "+element.arg+" '"+element.value+"'";
                else argumentsText+=" "+element.arg+" "+element.value;
           else
               if(element.value === true) argumentsText+=" "+element.arg;
       })
       return argumentsText;
    }

    handleClick() {
        const input = this.getArgumentsInput();
        this.props.terminalManager.runCommand(this.props.command + input);
    }


    handleCheckboxArgChange(e:React.ChangeEvent<HTMLInputElement>){
        let tempArgs : Array<IRenkuArgField> = this.state.arguments;
        tempArgs.filter(function(item){return item.id===e.target.id})[0].value = e.target.checked;
        this.setState({arguments: tempArgs});
    }

    handleTextArgChange(e:React.ChangeEvent<HTMLTextAreaElement>){
        let tempArgs : Array<IRenkuArgField> = this.state.arguments;
        tempArgs.filter(function(item){return item.id===e.target.id})[0].value = e.target.value;
        this.setState({arguments: tempArgs});
    }

    render() {
        return (
            (this.props.arguments.length !== 0) ?
                <li className="rk-innerTabElement p-CommandPalette-item p-display-none">
                    <div className="p-CommandPalette-itemIcon" ></div>
                    <div id={this.props.id + "-input"} className="rk-argumentsForm">
                        {this.state.arguments.map((element) => {
                             if (element.type === ARG_TYPES.TEXT)
                             return <div key={element.id }>
                                {element.label}
                                 <textarea id={element.id} rows={2} className="jp-textEditorTabBar rk-innerTabTextArea" value={element.value} onChange={e => this.handleTextArgChange(e)}/>
                             </div>
                            else
                                return <div key={element.id }>
                                    <label><input  id={element.id} type="checkbox" name={element.arg} className="rk-checkbox" checked={element.value} onChange={e => this.handleCheckboxArgChange(e)} />{element.label}</label><br />
                                </div>
                        })}
                        <button onClick={this.handleClick}>
                            {this.props.submitLabel}
                        </button>
                    </div>

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
            <div className={"p-CommandPalette-itemIcon"}></div>
            :
            <div className={"p-CommandPalette-itemIcon " + icon}></div>

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
