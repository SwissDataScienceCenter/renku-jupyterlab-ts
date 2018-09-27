import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  Widget
} from '@phosphor/widgets';

import '../style/index.css';


/**
 * Initialization data for the renku-jupyterlab-ts extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'renku-jupyterlab-ts',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterLab, palette: ICommandPalette) => {
    console.log('JupyterLab extension renku-jupyterlab-ts is activated!');
    console.log('ICommandPalette:', palette);

    // Create a single widget
    let widget: Widget = new Widget();
    widget.id = 'renku-run';
    widget.title.label = 'renku run';
    widget.title.closable = true;

    // Add an application command
    const command: string = 'renku:run';
    app.commands.addCommand(command, {
      label: 'Run notebook with Renku',
      execute: () => {
        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.addToMainArea(widget);
        }
        // Activate the widget
        app.shell.activateById(widget.id);
      }
    });

    // Add the command to the palette.
    palette.addItem({command, category: 'Renku'});
  }
};

export default extension;
