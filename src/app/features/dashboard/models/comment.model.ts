export interface IComment {
  id: number;
  subject: string;
  content: string;
  createdAt?: string;
  updatedAt?: string | null;
  task?: string | null;
  user?: string | null;
}
