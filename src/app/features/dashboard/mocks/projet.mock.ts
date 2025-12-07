
import { T } from "@angular/cdk/keycodes";
import { IProject } from "../models/project.model";


export const PROJET_MOCK: IProject[] = [
  {
    id: 1,
      name: "Projet 1",
      description: "Description du projet 1",
      tasks:[],
      tags: [],
      assignedTo: [],
      dueDate: new Date('now()').toDateString(),
      endDate: new Date('now()').toDateString(),
      completed: 'non',
      position: 1,
      dependencies:[1,2,3],
      status: 'En cours',
      priority: 1
  },
  {
    id: 1,
      name: "Projet 3",
      description: "Description du projet 3",
      tasks:[],
      tags: [],
      assignedTo: [],
      dueDate: new Date('now()').toDateString(),
      endDate: new Date('now()').toDateString(),
      completed: 'non',
      position: 1,
      dependencies:[1,2,3],
      status: 'En cours',
      priority: 1
  },
  {
    id: 1,
      name: "Projet 3",
      description: "Description du projet 3",
      tasks:[],
      tags: [],
      assignedTo: [],
      dueDate: new Date('now()').toDateString(),
      endDate: new Date('now()').toDateString(),
      completed: 'non',
      position: 1,
      dependencies:[1,2,3],
      status: 'En cours',
      priority: 1
  },


]
