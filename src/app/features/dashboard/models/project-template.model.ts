export interface IProjectTemplate {
  id: number;
  name: string;
  description: string;
  duration: number;
  createdAt?: string;
  updatedAt?: string | null;
}
