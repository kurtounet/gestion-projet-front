export interface IComment {
  id: number;
  taskId: number;
  userId: number;
  subject: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
