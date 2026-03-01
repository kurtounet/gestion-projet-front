export interface IStatus {
  '@id': string;
  '@type': string;
  id: number;
  label: string;
  color?: string | null;
  context: string | null;
  createdAt: string;
  updatedAt?: string | null;
}
