import { inject, Injectable, signal } from '@angular/core';
import { IProjectInstance } from '../models/project-instance.model';
import { ProjectInstanceService } from '../services/project-instance.service';
import { ICardStat } from '../models/components/static.model';
import { StatisticService } from '../services/statistic.service';
import { ISprintInstance } from '../models/sprint-instance.model';
import { ITaskInstance } from '../models/task-instance.model';
import { SprintInstanceService } from '../services/sprint-instance.service';
import { TaskInstanceService } from '../services/task-instance.service';
import { LocalStorageService } from '../services/local-storage.service';
import { fa } from 'zod/locales';
import { map } from 'zod';
import { IPayloadItemOrder } from '../models/payload-item-order.model';
import { OrderService } from '../services/order.service';

export const initialProjectState: IProjectInstance = {
  '@id': '',
  '@type': '',
  id: 0,
  name: '',
  description: '',
  icon: '',
  color: '',
  position: 0,
  startDate: new Date('now()'),
  endDate: new Date('now()'),
  status: '',
  priority: '',
  projectTemplate: '',
  pathProject: '',
  pathFileDatabase: '',
  projectInstances: [],
  comment: '',
  sprintInstances: [],
  createdAt: new Date(),
  updatedAt: new Date(),
  favory: false,
};
@Injectable({
  providedIn: 'root',
})
export class ProjectInstanceStore {
  readonly statisticService = inject(StatisticService);
  readonly StorageService = inject(LocalStorageService);
  readonly taskInstanceService = inject(TaskInstanceService);
  readonly sprintInstanceService = inject(SprintInstanceService);
  readonly projectInstanceService = inject(ProjectInstanceService);

  readonly projectsLoading = signal<boolean>(false);
  readonly projectsLoaded = signal<boolean>(false);
  readonly sprintLoading = signal<boolean>(false);
  readonly selectedSprintId = signal<number | null>(null);
  readonly sprintLoaded = signal<boolean>(false);
  readonly taskLoading = signal<boolean>(false);
  readonly taskLoaded = signal<boolean>(false);
  readonly sortOrder = signal<string>('desc');

  initialProjectState = signal<IProjectInstance>(initialProjectState);
  favoryProjectsLoading = signal(false);
  projects = signal<IProjectInstance[]>([]);
  statisticsCurrentProject: ICardStat[] = [];
  favoryProjects = signal<IProjectInstance[]>([]);
  selectedSprint = signal<ISprintInstance | null>(null);
  currentProjectSprints = signal<ISprintInstance[]>([]);
  currentTasks = signal<ITaskInstance[]>([]);
  currentProject = signal<IProjectInstance>(initialProjectState);

  getAllProjectInstance(): void {
    this.resetAll();
    this.projectsLoading.set(true);
    this.projectsLoaded.set(false);
    this.projectInstanceService.getAllProjectInstance().subscribe({
      next: (data: IProjectInstance[]) => {
        this.projects.set(data);
        this.projectsLoading.set(false);
        this.projectsLoaded.set(true);
        this.favoryProjects.set(data.filter((project) => project.favory));
        this.StorageService.setItem('projects', data);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des projets', err);
        this.projectsLoading.set(false);
      },
    });
  }

  getProjectInstanceById(id: number) {
    this.resetAll();
    this.projectInstanceService.getProjectInstanceById(id).subscribe({
      next: (data) => {
        this.currentProject.set(data);
        this.StorageService.setItem('current-project', data);
        this.getAllSprintsCurrentProject(data.id);
      },
      error: (err) => {
        console.error('getProjectInstanceById: error', err);
        // éventuellement : this.currentProject.set(null);
      },
    });
  }
  getAllSprintsCurrentProject(projectId?: number) {
    this.sortOrder.set('asc');
    if (projectId !== undefined) {
      this.sprintInstanceService.getAllSprintProjectInstance(projectId).subscribe({
        next: (data) => {
          this.currentProjectSprints.set(data);
          this.StorageService.setItem('current-sprints', data);
          this.sprintLoading.set(false);
          this.sprintLoaded.set(true);
        },
        error: (err) => {
          console.error('getCurrentSprints: error', err);
        },
      });
    }
  }
  getCurrentSprintTask(sprintId: number) {
    this.resetTasks();
    this.taskLoading.set(true);
    this.taskLoaded.set(false);
    this.selectedSprintId.set(sprintId);
    console.log( 'getCurrentSprintTask');

    if (sprintId !== undefined) {
      this.taskInstanceService.getAllTaskBySprintInstance(sprintId).subscribe({
        next: (data) => {
          this.currentTasks.set(data);
          this.taskLoaded.set(true);
          this.StorageService.setItem('current-tasks', data);
          this.taskLoading.set(false);
        },
        error: (err) => {
          console.error('getCurrentSprints: error', err);
          // éventuellement : this.currentSprints.set([]);
        },
      });
    }
  }
  getCurrentProjectTask(id: number) {
    this.taskInstanceService
      .getAllTaskBySprintInstance(id)
      .subscribe((data) => this.currentTasks.set(data));
    this.getStatisticsCurrentProject();
  }
  getStatisticsCurrentProject(projectId?: number) {
    return (this.statisticsCurrentProject = this.statisticService.getCardStatAll());
  }
  resetTasks() {
    this.currentTasks.set([]);
  }
  resetProject() {
    this.currentProject.set(initialProjectState);
  }
  resetSprints() {
    this.currentProjectSprints.set([]);
  }
  resetAll() {
    this.resetSprints();
    this.resetTasks();
    this.resetProject();
  }
  updateSprintOrder(list: ISprintInstance[]) {
    const payload: IPayloadItemOrder = {
      items: list.map((sprint, index) => ({
        id: sprint.id,
        position: index,
      })),
    };
    this.sprintInstanceService.updateSprintOrder(payload).subscribe({
      next: () => {
        // on met à jour localement l’ordre dans le store
          // this.currentProjectSprints.set([...list]);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l’ordre des sprints', error);
      },
    });
  }
  updateProjectOrder(list: IProjectInstance[]) {
    const payload: IPayloadItemOrder = {
      items: list.map((project, index) => ({
        id: project.id,
        position: index,
      })),
    };
    this.projectInstanceService.updateProjectOrder(payload).subscribe({
      next: () => {
        // on met à jour localement l’ordre dans le store
        this.projects.set(list);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l’ordre des projets', error);
      },
    });
  }
  updateTaskOrder(list: ITaskInstance[]) {
    const payload: IPayloadItemOrder = {
      items: list.map((sprint, index) => ({
        id: sprint.id,
        position: index,
      })),
    };
    this.taskInstanceService.updateTaskOrder(payload).subscribe({
      next: () => {
        // on met à jour localement l’ordre dans le store
        this.currentTasks.set(list);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour de l’ordre des taches', error);
      },
    });
  }
  getAllCompletedStatus() {
    return this.taskInstanceService.getAllCompletedStatus();
  }
  createProjectInstance(body: IProjectInstance) {
    return this.projectInstanceService.createProjectInstance(body);
  }
  updateProjectInstance(id: string, body: IProjectInstance) {
    return this.projectInstanceService.updateProjectInstance(id, body);
  }
}
