import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { IMenuGroups } from '../../models/menu-item.model';
import { CommonModule } from '@angular/common';
import { SideBarSectionComponent } from './side-bar-section/side-bar-section.component';
import { SideBarHeaderComponent } from './side-bar-header/side-bar-header.component';
import { IProjectInstance } from '../../models/project-instance.model';
import { ProjectInstanceStore } from '../../stores/project-instance.store';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, SideBarSectionComponent, SideBarHeaderComponent],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SidebarComponent {
  title: string = 'Navigation';
  private readonly router = inject(Router);
  readonly ProjectInstanceStore = inject(ProjectInstanceStore);

  // État local en signaux
  readonly isCollapsed = signal(false);
  readonly isMobile = signal(false);
  readonly isOpen = signal(false);

  readonly menuGroups = computed<IMenuGroups[]>(() =>
    this.buildMenuGroups(this.ProjectInstanceStore.favoryProjects()),
  );

  toggleSidebar(newState: boolean) {
    this.isCollapsed.set(newState);
  }

  closeSidebar() {
    if (this.isMobile()) {
      this.isOpen.set(false);
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.closeSidebar();
  }

  isActiveRoute(path: string): boolean {
    return this.router.url === path;
  }

  buildMenuGroups(projects: IProjectInstance[]): IMenuGroups[] {
    let subGroups: IMenuGroups[] = [];

    for (const project of projects) {
      subGroups.push({ label: project.name, path: '/admin/project/' + project.id, icon: '📁' });
    }

    return [
      {
        label: 'Accueil',
        path: '/admin/home',
        icon: '👤',
      },
      {
        label: 'Projets',
        path: null,
        icon: '📁',
        subGroups: [
          { label: 'Tout les projets', path: '/admin/projects', icon: '📁' },
          ...subGroups,
        ],
      },
      {
        label: 'Profile',
        path: '/admin/profiles',
        icon: '👤',
        subGroups: [
          { label: 'Paramètres', path: '/admin/settings', icon: '⚙️' },
          { label: 'Profil', path: '/admin/profil', icon: '👤' },
          // { label: 'Aide', path: '/admin/help', icon: '📁' },
          { label: 'déconnexion', path: '/admin/logout', icon: '📁' },
        ],
      },
    ];
  }
}

// constructor(private readonly router: Router) {
//   this.checkScreenSize();
//   window.addEventListener('resize', () => {
//     this.checkScreenSize();
//   });
// }

// private checkScreenSize() {
//   this.isMobile = window.innerWidth < 768;
//   if (this.isMobile) {
//     this.isCollapsed = true;
//   }
// }
