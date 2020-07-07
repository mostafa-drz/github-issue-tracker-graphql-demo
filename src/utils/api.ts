import axios, { AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: "https://api.github.com/graphql",
  headers: {
    Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
  responseType: "json",
  transformResponse: (resp: AxiosResponse) => {
    return resp.data;
  },
});

export const GET_ORG_Repo = `
  query GetOrganization($orgName: String!, $repoName: String!){
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
      issues(first:10){
				nodes{
          id,
          title,
          url
        }
        totalCount
      }
    }
  }
}
`;
