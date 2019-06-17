
import { Widget } from '@phosphor/widgets';
import { MainAreaWidget } from '@jupyterlab/apputils';
import { JupyterLab } from '@jupyterlab/application';

class RenkuTerminalWindow extends MainAreaWidget<Widget> {

    constructor(options: MainAreaWidget.IOptions<Widget>) {
        super(options);
        this.id = 'renku-run';
        this.title.label = 'Renku Terminal';
        this.title.caption = 'Renku Caption';
        this.title.iconClass = 'sdsc-WindowIcon p-TabBarIcon';
        this.title.closable = true;
    }

    public attachToMainArea = (app: JupyterLab) => {
        if (!this.isAttached) {
            app.shell.addToMainArea(this, {mode:"split-bottom"});
            app.shell.activateById(this.id);
        }
    }

    onBeforeDetach() {
        this.dispose();
    }

} export default RenkuTerminalWindow;
