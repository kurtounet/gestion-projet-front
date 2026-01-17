export interface ISprintInstance {
  '@id': string;
  '@type': string;
  id: number;
  projectInstance: string;
  priority: string;
  sprintTemplate: string;
  sprintDependency: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  startDate: Date;
  endDate: Date;
  status: string;
  position: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
