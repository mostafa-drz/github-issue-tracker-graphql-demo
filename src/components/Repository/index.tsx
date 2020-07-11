import React, { useState } from "react";
import { IRepository } from "../../types";
import "./Repository.scss";
import { Button } from "antd";
import { StarOutlined, StarFilled } from "@ant-design/icons";
import useAPI from "../../utils/useAPI";
import { ADD_STAR, REMOVE_STAR } from "../../utils/api";

interface Starable {
  stargazers: {
    totalCount: number;
  };
}

const Repository: React.FC<{ repository: IRepository }> = (props) => {
  const {
    id,
    name,
    url,
    description,
    stargazers: { totalCount: stars },
    forkCount,
    viewerHasStarred,
  } = props.repository;

  const [stared, setStared] = useState<boolean>(viewerHasStarred);
  const [starsCount, setStarsCount] = useState<number>(stars);

  const { fetch: addStar } = useAPI<{ addStar: Starable }>();
  const { fetch: removeStar } = useAPI<{
    removeStar: Starable;
  }>();

  const handleStarClick = () => {
    if (stared) {
      removeStar({
        query: REMOVE_STAR,
        variables: { repoId: id },
        onSuccess: (data) => {
          if ("removeStar" in data) {
            setStared(false);
            setStarsCount(data.removeStar.stargazers.totalCount);
          }
        },
      });
    } else {
      addStar({
        query: ADD_STAR,
        variables: { repoId: id },
        onSuccess: (data) => {
          if ("addStar" in data) {
            setStared(true);
            setStarsCount(data.addStar.stargazers.totalCount);
          }
        },
      });
    }
  };
  return (
    <div className="repository">
      <div style={{ position: "relative" }}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <h2>{name}</h2>
        </a>
        <Button
          icon={
            stared ? (
              <StarFilled style={{ fontSize: "20px" }} />
            ) : (
              <StarOutlined style={{ fontSize: "20px" }} />
            )
          }
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            background: "none",
            border: "none",
            color: "yellow",
          }}
          onClick={handleStarClick}
        ></Button>
      </div>
      <div className="info">
        <p>{description}</p>
        <div className="stats">
          <Stat count={starsCount} title="Number of stars" emoji={"⭐️"} />
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
