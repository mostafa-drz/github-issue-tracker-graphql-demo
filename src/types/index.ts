export interface Reaction {
  id: string;
  content: string;
}

export interface PageInfo {
  endCursor?: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
}
export interface Issue {
  id: string;
  title: string;
  url: string;
  reactions: {
    totalCount: number;
    nodes: Reaction[];
  };
}
export interface IIssues {
  totalCount: number;
  pageInfo: PageInfo;
  nodes: Issue[];
}
export interface IRepository {
  id: string;
  description: string;
  url: string;
  name: string;
  issues: IIssues;
  viewerHasStarred: boolean;
  forkCount: number;
  stargazers: {
    totalCount: number;
  };
}
export interface IOrganization {
  id: string;
  name: string;
  url: string;
  avatarUrl?: string;
  repository: IRepository;
}

export interface GraphqlError {
  errors: {
    message: string;
  }[];
}
