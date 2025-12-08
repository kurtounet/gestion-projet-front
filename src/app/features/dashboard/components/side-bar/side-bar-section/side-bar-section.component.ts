import { Component, inject, input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IMenuGroups } from '../../../models/menu-item.model';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-side-bar-section',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './side-bar-section.component.html',
  styleUrl: './side-bar-section.component.scss',
})
export class SideBarSectionComponent {
  private readonly router = inject(Router);
  section = input<IMenuGroups>();
  sideBarCollapsed = false;
  isCollapsed = true;
  isMobile = false;
  isOpen = false;

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  isActiveRoute(path: string | null): boolean {
    return this.router.url === path;
  }

  /*
  constructor(
    private readonly router: Router) {
    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isCollapsed = true;
    }
  }

  toggleSidebar() {
    if (this.isMobile) {
      this.isOpen = !this.isOpen;
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  closeSidebar() {
    if (this.isMobile) {
      this.isOpen = false;
    }
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
    this.closeSidebar();
  }


    */
}
