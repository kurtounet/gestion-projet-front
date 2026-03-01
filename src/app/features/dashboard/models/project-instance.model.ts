export interface IProjectInstance {
  '@id'?: string;
  '@type'?: string;
  id: number;
  name: string;
  description: string | null;
  pathProject: string | null;
  pathFileDatabase: string | null;
  color: string | null;
  icon: string | null;
  position: number;
  startDate: string;
  endDate: string;
  status: string | null;
  priority: string | null;
  projectTemplate: string | null;
  comment: string | null;
  sprintInstances?: (string | null)[];
  projectInstances?: (string | null)[];
  parent?: string | null;
  configFramework?: string | null;
  createdByUser?: string | null;
  updatedByUser?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
  isFavory: boolean;
}
