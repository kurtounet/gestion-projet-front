export interface ISprintInstance {
  '@id'?: string;
  '@type'?: string;
  id?: number;
  projectInstance?: string | null;
  priority: string | null;
  sprintTemplate?: string | null;
  sprintDependency?: string | null;
  name: string;
  description: string | null;
  color: string | null;
  icon: string | null;
  startDate: string;
  endDate: string;
  status: string | null;
  position: number | null;
  comment?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
}
