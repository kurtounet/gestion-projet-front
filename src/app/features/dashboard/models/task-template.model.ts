export interface ITaskTemplate {
  id: number;
  sprint_template_id: number;
  name: string;
  description: string;
  parent_task: number;
  type_task_id: number;
  created_At: Date;
  updated_At: Date;
}
