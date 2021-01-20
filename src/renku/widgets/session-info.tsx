/**
 * session-info.tsx
 *
 * The session-info component
 */

import { ReactWidget, MainAreaWidget } from "@jupyterlab/apputils";
import React, { useState, useEffect } from "react";

import { renkuIcon } from "../icons";
import { ISessionInfoData, retrieveSessionInfo } from "../../handler";
import { ExternalLink } from "./shared";

interface ISessionInfoTableRowProps {
  header: string;
  value: string;
  component?: JSX.Element;
}

/**
 * SessionInfoTableRow
 *
 * @param {string} [header] - Row header
 * @param {string} [value] - Row value
 * @param {JSX.Element?} [component] - Optional component
 */
function SessionInfoTableRow({ header = "", value = "", component = null }: ISessionInfoTableRowProps): JSX.Element {
  return <tr>
    <th>{header}</th>
    <td>{value}</td>
    <td>{component}</td>
  </tr>;
}


interface ISessionInfoTableProps {
  sessionInfo: ISessionInfoData;
}

function SessionInfoTable({ sessionInfo = null }: ISessionInfoTableProps): JSX.Element {
  const projectLink = <ExternalLink url={sessionInfo.renkulabUrl} text="View in RenkuLab" />;
  return <table>
    <tbody>
      <SessionInfoTableRow header="Project" value={sessionInfo.project} component={projectLink} />
      <SessionInfoTableRow header="Branch" value={sessionInfo.branch} />
      <SessionInfoTableRow header="Commit" value={sessionInfo.commit} />
    </tbody>
  </table>;
}


/**
 * The Renku menu
 */
function SessionInfo(): JSX.Element {
  const [sessionInfo, setSessionInfo] = useState({
    project: null, renkulabUrl: null, branch: null, commit: null });
  useEffect(() => {
    (async function(): Promise<void> {
      const sessionInfo = await retrieveSessionInfo();
      setSessionInfo(sessionInfo);
    })();
  }, []);
  return <div className="container">
    <header>
      <h1>Session Info</h1>
    </header>
    <div className="row">
      <SessionInfoTable sessionInfo={sessionInfo} />
    </div>
  </div>;
}

/**
 * Wrapper on the Menu
 */
class SessionInfoWidget extends ReactWidget {
  /**
   * Constructs a new CounterWidget.
   */
  constructor() {
    super();
    [
      "jp-Renku",
      "jp-RenkuSessionInfo"
    ].forEach(c => this.addClass(c));
  }

  render(): JSX.Element {
    return <SessionInfo />;
  }
}

function CreateSessionInfoWidget(): MainAreaWidget {
  // Create a blank content widget inside of a MainAreaWidget
  const content = new SessionInfoWidget();
  const widget = new MainAreaWidget({ content });
  widget.id = "jl-renku-session_info";

  widget.title.label = "Session Info";
  widget.title.closable = true;
  widget.title.caption = "Renku Session Info";
  widget.title.icon = renkuIcon;

  return widget;
}

export { CreateSessionInfoWidget };
