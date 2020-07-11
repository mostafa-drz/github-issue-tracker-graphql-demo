import React from "react";
import { Issue, Reaction } from "../../types";
import "./Issues.scss";

const REACTION: { [key: string]: string } = {
  THUMBS_UP: "👍",
  THUMBS_DOWN: "👎",
  LAUGH: "🙂",
  HOORAY: "🎉",
  CONFUSED: "😕",
  HEART: "❤️",
  ROCKET: "🚀",
  EYES: "👀",
};
const Issues: React.FC<{ issues: Issue[] }> = (props) => {
  const { issues } = props;
  const _issuesReactions: {
    [issueId: string]: {
      [key: string]: number;
    };
  } = issues.reduce((accu, currentIssue: Issue) => {
    const reactions = currentIssue.reactions.nodes.reduce(
      (raccu: { [key: string]: number }, current: Reaction) => {
        if (raccu[current.content]) {
          return {
            ...raccu,
            [current.content]: raccu[current.content] + 1,
          };
        } else {
          return {
            ...raccu,
            [current.content]: 1,
          };
        }
      },
      {}
    );
    return {
      ...accu,
      [currentIssue.id]: reactions,
    };
  }, {});
  return (
    <ul className="issues">
      {issues.map((issue: Issue) => (
        <li key={issue.id} className="issue">
          <a href={issue.url} target="_blank">
            {issue.title}
          </a>
          <span> - {issue.reactions.totalCount}</span>
          <div className="reactions">
            {Object.keys(_issuesReactions[issue.id]).map((current: string) => (
              <span>
                <span className="reaction-number">
                  {_issuesReactions[issue.id][current]}
                </span>
                <span className="reaction-emoji">{REACTION[current]} </span>
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default React.memo(Issues);
