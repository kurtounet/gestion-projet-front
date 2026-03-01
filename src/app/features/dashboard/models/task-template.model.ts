export interface ITaskTemplate {
  id: number;
  name: string;
  description: string;
  parentTask: number;
  createdAt?: string;
  updatedAt?: string | null;
  sprintTemplate?: string | null;
  typeTask?: string | null;
}
