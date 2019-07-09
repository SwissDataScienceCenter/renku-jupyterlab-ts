import RenkuTabBar from './RenkuTabBar';
import RenkuTerminalManager from './RenkuTerminalManager';
import { ILayoutRestorer, JupyterLabPlugin, JupyterLab } from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import { DocumentManager } from '@jupyterlab/docmanager';
import { DocumentWidget } from '@jupyterlab/docregistry';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';

function activate(app: JupyterLab, restorer: ILayoutRestorer, notebooks: INotebookTracker, factory: IFileBrowserFactory) {
  const { shell } = app;
  const terminalManager = new RenkuTerminalManager({
    app: app,
    notebooks: notebooks
  });

  let opener = {open: (widget: DocumentWidget) => { }};
  let docManager = new DocumentManager({
      registry: app.docRegistry,
      manager: app.serviceManager,
      opener
  });
  const tabs = new RenkuTabBar({
    app: app,
    notebooks: notebooks,
    terminalManager: terminalManager,
    docManager: docManager,
    factoryBrowserFactory: factory
  });

  shell.addToLeftArea(tabs, { rank: 600 });
};

const extension: JupyterLabPlugin<void> = {
  id: 'renku-jupyterlab-ts',
  autoStart: true,
  requires: [ILayoutRestorer, INotebookTracker, IFileBrowserFactory],
  activate: activate
};

export default extension;
