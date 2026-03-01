export interface ITechnology {
  id: number;
  label: string;
  createdAt?: string;
  updatedAt?: string | null;
  framework?: (string | null)[];
}
