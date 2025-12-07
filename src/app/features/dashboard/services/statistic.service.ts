import { Injectable } from '@angular/core';
import { ICardStat } from '../models/components/static.model';


@Injectable({
  providedIn: 'root',
})
export class StatisticService {

  getCardStatAll(): ICardStat[] {
    return  [
    {
    title: 'Projet',
    value: '',
    change: '',
    trend: 'up',
    icon: 'assets/svg/project.svg',
    color: 'blue',
    progress: [
          {
          title: 'Taches à faire',
          value: '50' + '%',
          progress: 50,
          target: '100%',
          current: '50' + '%',
          icon: 'project-diagram',
          color: 'blue'
        },
          {
          title: 'Taches à faire',
          value: '50' + '%',
          progress: 50,
          target: '100%',
          current: '50' + '%',
          icon: 'project-diagram',
          color: 'blue'
        },
        {
          title: 'Taches en cours',
          value: '50' + '%',
          progress: 50,
          target: '100%',
          current: '50' + '%',
          icon: 'project-diagram',
          color: 'blue'
        },
        {
          title: 'Taches Completées',
          value: '50' + '%',
          progress: 50,
          target: '100%',
          current: '50' + '%',
          icon: 'project-diagram',
          color: 'blue'
        }
      ]
    },
    {
    title: 'Sprints',
    value:  '',
    change: 'change',
    trend: 'up',
    icon: 'assets/svg/man-sprinting.svg',
    color: 'blue',
    progress: [
          {
          title: 'Sprints à faire',
          value: '50' + '%',
          progress: 50,
          target: '100%',
          current: '50' + '%',
          icon: 'project-diagram',
          color: 'blue'
        },
        {
          title: 'Sprints en cours',
          value: '50' + '%',
          progress: 50,
          target: '100%',
          current: '50' + '%',
          icon: 'project-diagram',
          color: 'blue'
        },
        {
          title: 'Sprints Completés',
          value: '50' + '%',
          progress: 50,
          target: '100%',
          current: '50' + '%',
          icon: 'project-diagram',
          color: 'blue'
        }
      ]
    },
    {
    title: 'Tâches',
    value: '50' + '%',
    change: '',
    trend: 'up',
    icon: 'assets/svg/task-list.svg',
    color: 'blue',
    progress: [
          {
          title: 'Taches à faire',
          value: '50' + '%',
          progress: 50,
          target: '100%',
          current: '50' + '%',
          icon: 'project-diagram',
          color: 'blue'
        },
        {
          title: 'Taches en cours',
          value: '50' + '%',
          progress: 50,
          target: '100%',
          current: '50' + '%',
          icon: 'project-diagram',
          color: 'blue'
        },
        {
          title: 'Taches Completées',
          value: '50' + '%',
          progress: 50,
          target: '100%',
          current: '50' + '%',
          icon: 'project-diagram',
          color: 'blue'
        }
      ]
    },
    ];
  }

  getProgressStatAll() {
    return  []//PROGESS_STATS;
  }

}
