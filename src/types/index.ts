export interface Issue {
  id: string;
  title: string;
  url: string;
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
