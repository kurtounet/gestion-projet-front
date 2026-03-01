export interface IProjectTemplateSprintTemplate {
  projectTemplateId: number;
  sprintTemplateId: number;
  sprintOrder: number;
  createdAt?: string;
  updatedAt?: string | null;
  projectTemplate?: string | null;
  sprintTemplate?: string | null;
}
