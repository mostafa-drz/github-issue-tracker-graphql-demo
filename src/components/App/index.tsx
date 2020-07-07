import React, { useState, FormEvent } from "react";
import { Input, Button } from "antd";
import { GET_ORG_Repo } from "../../utils/api";
import { IOrganization } from "../../types";
import useAPI from "../../utils/useAPI";
import { Spin } from "antd";

import "./App.scss";
import Organization from "../Organization";

function App() {
  const [orgName, setOrgnName] = useState<string>("");
  const [repo, setRepo] = useState<string>("");

  const { fetch, data, isLoading, error } = useAPI<{
    organization: IOrganization;
  }>();
  const onOrgChange = (e: React.FormEvent<HTMLInputElement>) => {
    setOrgnName(e.currentTarget.value);
  };
  const onRepoChange = (e: React.FormEvent<HTMLInputElement>) => {
    setRepo(e.currentTarget.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch(GET_ORG_Repo, { orgName, repoName: repo });
  };
  return (
    <div className="main-container">
      <h1>Github Issue Tracker</h1>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Orgnaization name"
          value={orgName}
          onChange={onOrgChange}
        />
        <Input
          placeholder="Repository name"
          value={repo}
          onChange={onRepoChange}
        />
        <Button
          onClick={handleSubmit}
          type="primary"
          size="large"
          style={{ marginTop: "3%", width: "200px" }}
          disabled={isLoading}
        >
          {!isLoading ? (
            <>
              <span>Search</span>
              <span role="img" aria-label="search">
                🕵🏼‍♀️
              </span>
            </>
          ) : (
            <Spin />
          )}
        </Button>
      </form>
      {data?.organization && <Organization organization={data.organization} />}
    </div>
  );
}

export default App;
