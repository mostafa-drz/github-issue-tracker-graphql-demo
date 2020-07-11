import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
  responseType: "json",
  transformResponse: (resp: AxiosResponse) => {
    if (resp.data) {
      return resp.data;
    } else {
      return resp;
    }
  },
});

export const GET_ORG_Repo = `
  query GetOrganization($orgName: String!, $repoName: String!, $issueCount: Int = 5){
  organization(login:$orgName){
    id,
    name,
    url,
    avatarUrl
    repository(name: $repoName){
      id,
      description,
      url,
      name,
      issues(last:$issueCount, states:[OPEN]){
				nodes{
          id,
          title,
          url,
          reactions(last:100){
            totalCount,
            nodes{
              id,
              content
            }
          }
        }
        totalCount
      }
    }
  }
}
`;
