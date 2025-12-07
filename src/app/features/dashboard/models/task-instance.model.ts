export interface ITaskInstance {
  id: number;
  user_id: number;
  task_template_id: number;
  sprint_instance_id: number;
  priority_id: number;
  status_id: number;
  type_task_id: number;
  name: string;
  description: string;
  start_date: Date;
  due_date: Date;
  parent_task: number;
  dependency_id: number;
  created_At: Date;
  updated_At: Date;
  comment_id: number;
  position: number;
  completed: string;
}
