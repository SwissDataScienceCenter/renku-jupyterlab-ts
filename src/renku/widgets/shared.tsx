/**
 * shared.tsx
 *
 * Shared components
 */
import React from "react";

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


export { ExternalLink };
