import { ITask } from './task.model';

export interface IProject {
  id: number;
  name: string;
  description: string;
  tasks: ITask[];
  tags: string[];
  assignedTo: string[];
  dueDate: string;
  endDate: string;
  completed: string;
  position: number;
  dependencies: number[];
  status: string;
  priority: number;
}
