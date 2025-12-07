export interface IProjectInstance {
  "@id": string;
  "@type": string;
  id: number;
  name: string;
  description: string;
  icon: string
  color: string,
  position: number,
  startDate: Date;
  endDate: Date;
  status: number;
  priority: number;
  projectTemplate: number;
  comment: number;
  sprintInstances: string[];
  createdAt: Date;
  updatedAt: Date;
  favory: boolean
}
/*
       "@id": "/api/project_instances/1",
      "@type": "ProjectInstance",
      "id": 1,
      "name": "Projet 1",
      "description": "Description du projet instance 1",
      "icon": "icon-1",
      "color": "#d30770",
      "position": 1,
      "startDate": "2025-12-01T14:56:28+00:00",
      "endDate": "2026-02-01T14:56:28+00:00",
      "status": "/api/statuses/1",
      "priority": "/api/priorities/1",
      "projectTemplate": "/api/project_templates/1",
      "comment": "/api/comments/30",
      "sprintInstances": [
        "/api/sprint_instances/1",
        "/api/sprint_instances/2",
        "/api/sprint_instances/3",
        "/api/sprint_instances/4",
        "/api/sprint_instances/5",
        "/api/sprint_instances/6",
        "/api/sprint_instances/7",
        "/api/sprint_instances/8",
        "/api/sprint_instances/9",
        "/api/sprint_instances/10"
      ],
      "createdAt": "2025-12-02T14:56:28+00:00",
      "updatedAt": "2025-12-02T14:56:29+00:00",
      "favory": false

      */
