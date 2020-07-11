import React from "react";
import { IOrganization } from "../../types";
import "./Organization.scss";

const Organization: React.FC<Props> = (props) => {
  const {
    organization: { name, url, avatarUrl },
  } = props;
  return (
    <div className="organization">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <h2>{name}</h2>
      </a>
      <img src={avatarUrl} alt={name} />
    </div>
  );
};

interface Props {
  organization: IOrganization;
}
export default Organization;
