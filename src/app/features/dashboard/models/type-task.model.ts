export interface ITypeTask {
  id: number;
  name: string;
  color?: string | null;
  pathFileScript: string;
  description: string;
  automatique: boolean;
  code?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
}
