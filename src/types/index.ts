export interface Reaction {
  id: string;
  content: string;
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
export interface IRepository {
  id: string;
  description: string;
  url: string;
  name: string;
  issues: {
    totalCount: number;
    nodes: Issue[];
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
