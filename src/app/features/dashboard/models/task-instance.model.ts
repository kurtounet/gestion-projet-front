export interface ITaskInstance {
  '@id'?: string;
  '@type'?: string;
  id: number;
  user?: string | null;
  taskTemplate?: string | null;
  sprintInstance?: string | null;
  icon: string;
  priority?: string | null;
  status?: string | null;
  color: string;
  typeTask?: string | null;
  name: string;
  description: string;
  startDate: string;
  dueDate: string;
  parentTask?: string | null;
  dependency?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
  createdByUser?: string | null;
  updatedByUser?: string | null;
  comment?: string | null;
  position: number | null;
  completed?: string | null;
}
