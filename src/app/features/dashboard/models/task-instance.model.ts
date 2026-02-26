export interface ITaskInstance {
  '@id'?: string;
  '@type'?: string;
  id: number;
  user: string;
  taskTemplate: string;
  sprintInstance: string;
  icon: string;
  priority: string;
  status: string;
  color: string;
  typeTask: string;
  name: string;
  description: string;
  startDate: Date;
  dueDate: Date;
  parentTask: string;
  dependency: number;
  createdAt?: Date;
  updatedAt?: Date;
  comment?: string;
  position: number;
  completed: string;
}
