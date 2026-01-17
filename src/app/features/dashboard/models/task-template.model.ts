export interface ITaskTemplate {
  id: number;
  sprintTemplateId: number;
  name: string;
  description: string;
  parentTask: number;
  typeTaskId: number;
  createdAt: Date;
  updatedAt: Date;
}
