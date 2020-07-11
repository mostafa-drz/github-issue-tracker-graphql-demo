import React from "react";
import { IRepository } from "../../types";
import "./Repository.scss";
import { fork } from "child_process";

const Repository: React.FC<{ repository: IRepository }> = (props) => {
  const {
    name,
    url,
    description,
    stargazers: { totalCount: stars },
    forkCount,
  } = props.repository;
  return (
    <div className="repository">
      <a href={url} target="_blank">
        <h2>{name}</h2>
      </a>
      <div className="info">
        <p>{description}</p>
        <div className="stats">
          <Stat count={stars} title="Number of stars" emoji={"⭐️"} />
          <Stat count={forkCount} title="Number of forks" emoji={"🍴"} />
        </div>
      </div>
    </div>
  );
};

const Stat: React.FC<StatProps> = (props) => {
  const { count, title, emoji } = props;
  return (
    <div className="stat">
      {count > 1000 ? (
        <span>{Math.floor(count / 1000)}k</span>
      ) : (
        <span>{count}</span>
      )}
      <span role="img" aria-label={title} className="emoji">
        {" "}
        {emoji}
      </span>
    </div>
  );
};

interface StatProps {
  count: number;
  title: string;
  emoji: string;
}
export default Repository;
