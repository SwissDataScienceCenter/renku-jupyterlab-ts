import { JupyterLab } from '@jupyterlab/application';
import { INotebookTracker } from '@jupyterlab/notebook';
import { TerminalSession } from "@jupyterlab/services/lib";
import { Terminal } from '@jupyterlab/terminal';


import RenkuTerminalWindow from './RenkuTerminalWindow';

interface ITerminalManager {
    app: JupyterLab;
    notebooks: INotebookTracker;
}


class RenkuTerminalManager {

    private props: ITerminalManager;
    private terminal: Terminal;
    private widget: RenkuTerminalWindow;
    private sessionPromise: Promise<TerminalSession.ISession>;

    constructor(props: ITerminalManager) {
        this.props = props;
        this.initializeTerminal();

    }

    initializeTerminal() {
        if (this.terminal !== undefined)
            this.terminal.dispose();
        this.terminal = new Terminal();
        this.widget = new RenkuTerminalWindow({ content: this.terminal });
    }

    runCommand(command: string) {
        const { serviceManager } = this.props.app;
        const services = serviceManager;
        if (this.sessionPromise === undefined) {
            this.sessionPromise = services.terminals.startNew();
        }
        if (this.widget.isDisposed) {
            this.initializeTerminal();
        }
        this.widget.attachToMainArea(this.props.app);

        return this.sessionPromise
            .then(session => {
                this.terminal.session = session;
                this.widget.title.label = "Renku Terminal";
                const termMsg: TerminalSession.IMessage = {
                    type: "stdin" as TerminalSession.MessageType,
                    content: [command + '\n']
                };

                this.terminal.session.send(termMsg);
                return this.widget;
            })
            .catch(() => {
                this.terminal.dispose();
            });
    }

} export default RenkuTerminalManager;