import React from "react";
import { Issue } from "../../types";
import "./Issues.scss";

const Issues: React.FC<{ issues: Issue[] }> = (props) => {
  const { issues } = props;
  return (
    <ul className="issues">
      {issues.map((issue: Issue) => (
        <li key={issue.id}>
          <a href={issue.url} target="_blank">
            {issue.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default Issues;
