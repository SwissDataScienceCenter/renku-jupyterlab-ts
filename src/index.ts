import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from "@jupyterlab/application";
import { ICommandPalette } from "@jupyterlab/apputils";
import { IMainMenu } from "@jupyterlab/mainmenu";

import {
  CommandIds,
  CreateRenkuMenu,
  CreateRenkuPanelWidget,
  RegisterRenkuCommands,
} from "./renku";

/**
 * Initialization data for the jl-renku extension.
 */
const extension: JupyterFrontEndPlugin<void> = {
  id: "jl-renku",
  autoStart: true,
  requires: [IMainMenu, ICommandPalette],
  activate: (
    app: JupyterFrontEnd,
    mainMenu: IMainMenu,
    palette: ICommandPalette
  ) => {
    // DEBUG
    //
    // console.log("JupyterLab extension jl-renku is activated!");

    const renkuMain = CreateRenkuPanelWidget(app.commands);

    // Register all the commands
    RegisterRenkuCommands(app.commands, app.shell, renkuMain);

    // Add a menu for the plugin
    mainMenu.addMenu(CreateRenkuMenu(app.commands), { rank: 60 });

    // Add the RenkuMain button to the left toolbar
    app.shell.add(renkuMain, "left", { rank: 250 });

    // Add the command to the palette.
    palette.addItem({ command: CommandIds.renkuMain, category: "Renku" });
  }
};

export default extension;
