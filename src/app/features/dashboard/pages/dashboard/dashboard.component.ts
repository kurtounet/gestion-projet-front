import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IMenuGroups } from '../../models/menu-item.model';
import { SidebarComponent } from '../../components/side-bar/side-bar.component';
import { HeaderComponent } from "../../components/header/header.component";
import { LocalStorageService } from '../../services/local-storage.service';
import { ProjectInstantStore } from '../../stores/project-instant.store';
import { IProjectInstance } from '../../models/project-instance.model';
import { InitAppService } from '../../services/init-app.service';



@Component({
  selector: 'app-dashboard',
  imports: [
    RouterOutlet,
    SidebarComponent,


  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  menuGroups: IMenuGroups[]= [];
  // favoryProjects = signal<IProjectInstance[]>([]);
  projectInstantStore = inject(ProjectInstantStore);
  localStorageService = inject(LocalStorageService);

  projects = computed(() => this.projectInstantStore.projects());
  favoryProjects = computed(() => this.projects().filter(p => p.favory));





}
