export interface IPriority {
  '@id': string;
  '@type': string;
  id: number;
  label: string;
  color: string | null;
  priorityNumber: number;
  createdAt?: string;
  updatedAt?: string | null;
}
