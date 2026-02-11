export interface IProjectInstance {
  '@id'?: string;
  '@type'?: string;
  id: number;
  name: string;
  description: string;
  pathProject: string;
  pathFileDatabase: string;
  color: string;
  icon: string;
  position: number;
  startDate: string;
  endDate: string;
  status: string;
  priority: string;
  projectTemplate: string;
  comment: string;
  sprintInstances?: string[];
  projectInstances?: string[];
  createdAt?: Date;
  updatedAt?: Date;
  isFavory: boolean;
}
