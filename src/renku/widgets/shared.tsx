/**
 * shared.tsx
 *
 * Shared components
 */
import React, { FunctionComponent, useEffect, useState, useRef } from "react";
import ReactClipboard from "react-clipboard.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";


interface IClipboardProps {
  clipboardText: string;
}

/**
 * Clipboard (copied from client/src/utils/UIComponents.js)
 *
 * A component that copies text to the clipboard
 * @param {string} [clipboardText] - Text to copy to the clipboard
 */
function Clipboard({ clipboardText = null }: IClipboardProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const timeoutDur = 3000;

  // keep track of mounted state
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return (): void => { isMounted.current = false; };
  }, []);

  return (
    <ReactClipboard component="a" data-clipboard-text={clipboardText} onSuccess={
      (): void => { setCopied(true); setTimeout(() => { if (isMounted.current) setCopied(false); }, timeoutDur); }
    }> {
        (copied) ?
          <FontAwesomeIcon icon={faCheck} color="green" /> :
          <FontAwesomeIcon icon={faCopy} />
      }
    </ReactClipboard>
  );
}

interface ICommandDescProps {
  command: string;
  desc: string|JSX.Element;
  clipboard?: boolean;
}

const CommandDesc: FunctionComponent<ICommandDescProps> =
  ( { command = "", desc = "", clipboard = true }: ICommandDescProps): JSX.Element => {
    return <div>
      <code>{command}</code>
      {
        (clipboard === true) ? <Clipboard clipboardText={command} /> : null
      }
      <p className="renku-info" style={{ paddingTop: "3px" }}>{desc}</p>
    </div>;
  };

interface IExternalLinkProps {
  url: string;
  text: string;
}

/**
 * ExternalLink
 *
 * @param {string} [url] - The URL to open on click
 * @param {string} [text] - The text to show
 */
function ExternalLink({ url = "#", text = "" }: IExternalLinkProps): JSX.Element {
  return <a href={url} className="jp-mod-styled jp-RunningSessions-shutdownAll"
    role="button" target="_blank" rel="noreferrer noopener">
    {text}
  </a>;
}


export { Clipboard, CommandDesc, ExternalLink };
