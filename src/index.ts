/**
 * @license
 * # Copyright 2018 - Swiss Data Science Center (SDSC)
 * A partnership between École Polytechnique Fédérale de Lausanne (EPFL) and
 * Eidgenössische Technische Hochschule Zürich (ETHZ).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { JupyterLab, JupyterLabPlugin } from '@jupyterlab/application';
import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';
import { PathExt } from '@jupyterlab/coreutils';
import { INotebookTracker } from '@jupyterlab/notebook';
import { TerminalSession } from "@jupyterlab/services/lib";
import { ITerminalTracker, Terminal } from '@jupyterlab/terminal';
import { Widget } from '@phosphor/widgets';
import '../style/index.css';

/**
 * Initialization data for the renku-jupyterlab-ts extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'renku-jupyterlab-ts',
  autoStart: true,
  requires: [ICommandPalette, INotebookTracker, ITerminalTracker],
  activate: (
    app: JupyterLab,
    palette: ICommandPalette,
    notebooks: INotebookTracker,
    terminals: ITerminalTracker
  ) => {
    console.log('JupyterLab extension renku-jupyterlab-ts is activated!');
    console.log('ICommandPalette:', palette);
    console.log('INotebookTracker', notebooks);
    console.log('ITerminalTracker', terminals);

    const { serviceManager } = app;

    const services = serviceManager;

    console.log('JupyterLab extension renku-jupyterlab-ts is activated!');
    console.log('ICommandPalette:', palette);

    // Create a single widget


    // Add an application command
    const command: string = 'renku:run';
    app.commands.addCommand(command, {
      label: 'Run notebook with Renku',
      execute: () => {
        const nbWidget = notebooks.currentWidget;

        console.log('current notebook: ', nbWidget);

        const term = new Terminal({
          initialCommand: `git add -A; git commit -a -m "renku: autosave"; cd ${PathExt.dirname(nbWidget.context.path)}`
        });

        let widget: Widget = new MainAreaWidget({ content: term });
        widget.id = 'renku-run';
        widget.title.label = 'renku run';
        widget.title.closable = true;

        // const name = 'foobar'
        const promise = services.terminals.startNew();

        if (!widget.isAttached) {
          // Attach the widget to the main work area if it's not there
          app.shell.addToMainArea(widget);
        }

        // Activate the widget
        //app.shell.activateById(widget.id);

        return promise
          .then(session => {
            term.session = session;
            // tracker.add(main);
            app.shell.activateById(widget.id);

            const nbBasename = PathExt.basename(nbWidget.context.path);
            const termMsg: TerminalSession.IMessage = {
              type: "stdin" as TerminalSession.MessageType,
              content: [`renku run papermill ${nbBasename} ${nbBasename.replace('.ipynb', '.ran.ipynb')}\n`]
            };

            console.log(session.send(termMsg));

            return widget;
          })
          .catch(() => {
            term.dispose();
          });
      }
    });

    // Add the command to the palette.
    palette.addItem({ command, category: 'Renku' });
  }
};

export default extension;
