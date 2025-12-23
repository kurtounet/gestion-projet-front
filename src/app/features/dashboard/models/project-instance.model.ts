export interface IProjectInstance {
  '@id': string;
  '@type': string;
  id: number;
  name: string;
  description: string;
  icon: string;
  pathProject: string;
  pathFileDatabase: string;
  color: string;
  position: number;
  startDate: Date;
  endDate: Date;
  status: string;
  priority: string;
  projectTemplate: string;
  comment: string;
  sprintInstances: string[];
  projectInstances: string[];
  createdAt: Date;
  updatedAt: Date;
  favory: boolean;
}
