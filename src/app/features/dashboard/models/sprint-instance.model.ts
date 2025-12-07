export interface ISprintInstance {
  id: number;
  project_instance_id: number;
  priority_id: number;
  sprint_template_id: number;
  sprint_dependency_id: number;
  name: string;
  description: string;
  icon: string;
  start_date: Date;
  end_date: Date;
  status_id: number;
  order: number;
  comment_id: number;
  created_At: Date;
  updated_At: Date;
}
