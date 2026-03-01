export interface IUser {
  '@id'?: string;
  '@type'?: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: (string | null)[];
  password?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
}
