export interface INotification {
  id: number;
  message: string;
  date: string;
  type: string;
  user?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
}
