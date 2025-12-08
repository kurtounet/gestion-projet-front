export interface ITask {
  id: number;
  title: string;
  description?: string;
  assignedTo: string;
  tags: string[];
  dueDate: string;
  completed: string;
  position: number;
  dependencies: number[];
  subtasks: string[];
  priority: number;
}
