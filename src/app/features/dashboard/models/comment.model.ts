export interface IComment {
  id: number;
  task_id: number;
  user_id: number;
  subject: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}
