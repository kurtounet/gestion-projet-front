export interface ISprintTemplate {
  sprintTemplateId: number;
  name: string;
  description: string;
  duration: number;
  createdAt?: string;
  updatedAt?: string | null;
}
