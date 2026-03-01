export interface ISprintTask {
  sprintTemplateId: number;
  taskTemplateId: number;
  taskOrder: number;
  createdAt?: string;
  updatedAt?: string | null;
}
