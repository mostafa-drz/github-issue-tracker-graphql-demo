import React, { useState, FormEvent } from "react";
import { Input, Button } from "antd";
import { GET_ORG_Repo, LOAD_MORE_ISSUES } from "../../utils/api";
import { IOrganization, IRepository, IIssues } from "../../types";
import useAPI from "../../utils/useAPI";
import { Spin } from "antd";
import { Alert } from "antd";

import "./App.scss";
import Organization from "../Organization";
import Repositorty from "../Repository";
import Issues from "../Issues";

function App() {
  const [orgName, setOrgnName] = useState<string>("");
  const [repo, setRepo] = useState<string>("");
  const [issues, setIssues] = useState<IIssues>();

  const { fetch, data, isLoading, error } = useAPI<{
    organization: IOrganization;
  }>();
  const { fetch: loadMore, data: moreIssues, error: moreIssuesError } = useAPI<{
    repository: IRepository;
  }>();

  const onOrgChange = (e: React.FormEvent<HTMLInputElement>) => {
    setOrgnName(e.currentTarget.value);
  };
  const onRepoChange = (e: React.FormEvent<HTMLInputElement>) => {
    setRepo(e.currentTarget.value);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch({
      query: GET_ORG_Repo,
      variables: { orgName, repoName: repo },
      onSuccess: (data) => {
        if ("organization" in data) {
          setIssues(data.organization.repository.issues);
        }
      },
    });
  };
  const handleLoadMoreIssues = () => {
    loadMore({
      query: LOAD_MORE_ISSUES,
      variables: {
        repoName: repo,
        owner: orgName,
        before: issues?.pageInfo.endCursor,
      },
      onSuccess: (data) => {
        if ("repository" in data) {
          if (issues?.nodes) {
            setIssues({
              ...data.repository.issues,
              nodes: issues?.nodes.concat(data.repository.issues.nodes),
            });
          } else {
            setIssues({
              ...data.repository.issues,
              nodes: data.repository.issues.nodes,
            });
          }
        }
      },
    });
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
      {data && "errors" in data ? (
        //Graphql error
        <ul className="errors">
          {data.errors.map((e) => (
            <Alert key={e.message} message={e.message} type="error" />
          ))}
        </ul>
      ) : (
        <>
          {data?.organization && (
            <Organization organization={data.organization} />
          )}
          {data?.organization?.repository && (
            <Repositorty repository={data.organization.repository} />
          )}
          {issues && (
            <Issues
              issues={issues.nodes}
              totalCount={issues.totalCount}
              onLoadMore={handleLoadMoreIssues}
              pageInfo={issues.pageInfo}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;
