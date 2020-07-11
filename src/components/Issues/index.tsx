import React from "react";
import { Issue, Reaction, PageInfo } from "../../types";
import "./Issues.scss";
import { Button } from "antd";

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
const Issues: React.FC<Props> = (props) => {
  const { issues, totalCount, onLoadMore, pageInfo } = props;
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
    <>
      <h3>There are {totalCount} issues open for this repository</h3>
      <ul className="issues">
        {issues.map((issue: Issue) => (
          <li key={issue.id} className="issue">
            <a href={issue.url} target="_blank" rel="noopener noreferrer">
              {issue.title}
            </a>
            <div className="reactions">
              {Object.keys(_issuesReactions[issue.id]).map(
                (current: string) => (
                  <span>
                    <span className="reaction-number">
                      {_issuesReactions[issue.id][current]}
                    </span>
                    <span className="reaction-emoji">{REACTION[current]} </span>
                  </span>
                )
              )}
            </div>
          </li>
        ))}
      </ul>
      {pageInfo?.hasPreviousPage && (
        <Button type="primary" onClick={onLoadMore}>
          Load More
        </Button>
      )}
    </>
  );
};

interface Props {
  issues: Issue[];
  totalCount: number;
  onLoadMore: () => void;
  pageInfo: PageInfo;
}
export default React.memo(Issues);
