export interface IFramework {
  '@id': string;
  '@type': string;
  id: number;
  name?: string;
  label?: string;
  description?: string;
  icon: string;
  color: string;
  configuration: string;
  technology: string;
  createdAt?: Date;
  updatedAt?: Date;
}
