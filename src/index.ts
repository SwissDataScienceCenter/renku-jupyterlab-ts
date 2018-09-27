import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import '../style/index.css';


/**
 * Initialization data for the renku-jupyterlab-ts extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'renku-jupyterlab-ts',
  autoStart: true,
  activate: (app: JupyterLab) => {
    console.log('JupyterLab extension renku-jupyterlab-ts is activated!');
  }
};

export default extension;
