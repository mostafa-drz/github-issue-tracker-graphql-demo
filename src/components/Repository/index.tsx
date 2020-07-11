import React from "react";
import { IRepository } from "../../types";
import "./Repository.scss";

const Repository: React.FC<{ repository: IRepository }> = (props) => {
  const { name, url, description } = props.repository;
  return (
    <div className="repository">
      <a href={url} target="_blank">
        <h2>{name}</h2>
      </a>
      <p>{description}</p>
    </div>
  );
};

export default Repository;
