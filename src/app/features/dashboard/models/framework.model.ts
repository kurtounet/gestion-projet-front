export interface IFramework {
  '@id': string;
  '@type': string;
  id: number;
  label: string;
  type: string;
  version: string;
  description?: string | null;
  configuration?: (string | null)[] | null;
  icon?: string | null;
  color?: string | null;
  createdAt: string;
  updatedAt?: string | null;
  configProjectFrameworks?: (string | null)[];
  technology?: string | null;
}
