
import { TabBar } from '@phosphor/widgets';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import '../style/index.css';

import { JupyterLab } from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import RenkuCommands, { HelpCommands } from './RenkuCommands';
import { GitCommands, DatasetCommands } from './RenkuCommands';
import RenkuTerminalManager from './RenkuTerminalManager';

export interface IRenkuTabBar {
  app: JupyterLab;
  notebooks: INotebookTracker;
  terminalManager : RenkuTerminalManager;
};

class RenkuTabBar extends TabBar<void>{

  private props: IRenkuTabBar;

  constructor(props: IRenkuTabBar) {
    super();
    this.orientation = 'vertical';
    this.id = 'tab-manager';
    this.title.iconClass = 'sdsc-TabIcon jp-SideBar-tabIcon';
    this.title.caption = 'Renku';
    this.createTabBarItem('Git','git-tab',this.node,this.contentNode);
    this.createTabBarItem('Renku','renku-tab',this.node,this.contentNode);
    this.createTabBarItem('Dataset','dataset-tab',this.node,this.contentNode);
    this.createTabBarItem('Help','renku-tab-help',this.node,this.contentNode);
    this.props = props;
  }

  createTabBarItem(name: string, id: string , node: Node , contentNode: HTMLUListElement) {
    const header = document.createElement('header');
    header.textContent = name;
    node.insertBefore(header, contentNode);
    const body = document.createElement('body');
    body.id = id+'-body';
    body.innerHTML='<div id="'+id+'-content"></div>';
    node.insertBefore(body, contentNode);
  }

  onAfterAttach() {

    ReactDOM.render(
      React.createElement(GitCommands,
        {
          app: this.props.app,
          notebooks: this.props.notebooks,
          terminalManager: this.props.terminalManager
        }),
      document.getElementById('git-tab-content')
    );

    ReactDOM.render(
      React.createElement(RenkuCommands,
        {
          app: this.props.app,
          notebooks: this.props.notebooks,
          terminalManager: this.props.terminalManager
        }),
      document.getElementById('renku-tab-content')
    );

    ReactDOM.render(
      React.createElement(DatasetCommands,
        {
          app: this.props.app,
          notebooks: this.props.notebooks,
          terminalManager: this.props.terminalManager
        }),
      document.getElementById('dataset-tab-content')
    );

    ReactDOM.render(
      React.createElement(HelpCommands,
        {
          app: this.props.app,
          notebooks: this.props.notebooks,
          terminalManager: this.props.terminalManager
        }),
      document.getElementById('renku-tab-help-content')
    );
    
  };
} export default RenkuTabBar;