import * as React from 'react';
import * as ReactDOM from 'react-dom';
import '../../style/index.css';
import { JupyterLab } from '@jupyterlab/application';
import { Widget } from '@phosphor/widgets';
import { MainAreaWidget } from '@jupyterlab/apputils';
import CheatSheetTab from './CheatSheetTab';


export interface ICheatSheetCommand {
    id: string;
    name: string;
    app: JupyterLab;
};


class CheatSheetCommand extends React.Component<ICheatSheetCommand>{
    /**
   * The image element associated with the widget.
   */
    //readonly img: HTMLImageElement;
    widget: Widget;
    main: MainAreaWidget;

    constructor(props: ICheatSheetCommand) {
        super(props);
        this.state = {
            show: false
        }
        this.handleClick = this.handleClick.bind(this);

       
        
    }

    handleClick() {
        if (this.main === undefined || !this.main.isAttached) {
            //
            // Create a single widget
            this.widget = new Widget();
            this.widget.id = 'renku-cheatsheet';
            this.widget.title.label = 'Cheat Sheet';
            this.widget.title.closable = true;
            this.widget.addClass('overflow-y-scroll');
            this.widget.title.icon='icon-help-tab';

            const body = document.createElement('div');
            body.id = 'renku-cheatsheet-body';
            body.innerHTML='<div id="renku-cheatsheet-content"></div>';
            this.widget.node.appendChild(body);

            this.main = new MainAreaWidget({content:this.widget});
            this.main.id = 'renku-main-cheatsheet';
            this.main.title.label = "Cheat Sheet";
            this.main.title.icon='icon-help-tab';
            this.widget.title.closable = true;

            // Attach the widget to the main work area if it's not there
            this.props.app.shell.addToMainArea(this.main);
            ReactDOM.render(
                React.createElement(CheatSheetTab,
                  {
                  }),
                document.getElementById('renku-cheatsheet-content')
              );
        }
        
        // Activate the widget
        this.props.app.shell.activateById(this.main.id);
    }


    render() {
        const iconHTML =
            <div className={"p-CommandPalette-itemIcon"} ></div>

        return (
            <li key={this.props.id} className="p-CommandPalette-item" onClick={this.handleClick}>
                {iconHTML}
                <div className="p-CommandPalette-itemContent">
                    <div className="p-CommandPalette-itemLabel" >
                        {this.props.name}
                    </div>
                </div>
            </li>

        );
    }
} export default CheatSheetCommand;
