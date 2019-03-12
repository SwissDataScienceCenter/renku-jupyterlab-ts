import RenkuTabBar from './RenkuTabBar';
import RenkuTerminalManager from './RenkuTerminalManager';

import {
  ILayoutRestorer,
  JupyterLabPlugin,
  JupyterLab
} from '@jupyterlab/application';

import { INotebookTracker } from '@jupyterlab/notebook';
import { ITerminalTracker } from '@jupyterlab/terminal';


function activate(app: JupyterLab, restorer: ILayoutRestorer, notebooks: INotebookTracker) {
  const { shell } = app;  
  const terminalManager = new RenkuTerminalManager({app:app, notebooks:notebooks});
  const tabs = new RenkuTabBar({ app: app, notebooks: notebooks, terminalManager: terminalManager});
  shell.addToLeftArea(tabs, { rank: 600 });
};

const extension: JupyterLabPlugin<void> = {
  id: 'renku-jupyterlab-ts',
  autoStart: true,
  requires: [INotebookTracker, ITerminalTracker, ILayoutRestorer],
  activate: activate
};

export default extension;