import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IMenuGroups } from '../../models/menu-item.model';
import { SidebarComponent } from '../../components/side-bar/side-bar.component';
import { HeaderComponent } from '../../components/header/header.component';
import { LocalStorageService } from '../../services/local-storage.service';

import { InitAppService } from '../../services/init-app.service';
import { ProjectInstanceStore } from '../../stores/project-instance.store';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  menuGroups: IMenuGroups[] = [];
  initService = inject(InitAppService).Init();
  ProjectInstanceStore = inject(ProjectInstanceStore);
  localStorageService = inject(LocalStorageService);

  projects = computed(() => this.ProjectInstanceStore.projects());
  favoryProjects = computed(() => this.projects().filter((p) => p.favory));
}
