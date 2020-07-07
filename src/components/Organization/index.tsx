import React from "react";
import { IOrganization } from "../../types";
import "./Organization.scss";

const Organization: React.FC<Props> = (props) => {
  const {
    organization: { name, id, url, avatarUrl },
  } = props;
  return (
    <div className="organization">
      <a href={url} target="_blank">
        <h2>{name}</h2>
      </a>
      <img src={avatarUrl} />
    </div>
  );
};

interface Props {
  organization: IOrganization;
}
export default Organization;
