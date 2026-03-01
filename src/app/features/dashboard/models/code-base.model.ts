export interface ICodeBase {
  id: number;
  label: string;
  code: string;
  pathFile: string;
  feature: string;
  createdAt?: string;
  updatedAt?: string | null;
}
