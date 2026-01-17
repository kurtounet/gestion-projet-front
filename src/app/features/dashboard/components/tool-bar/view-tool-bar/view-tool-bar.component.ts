import { Component, inject, input, Input, signal } from '@angular/core';
import { ProjectInstanceStore } from '@app/features/dashboard/stores/project-instant.store';

@Component({
  selector: 'app-view-tool-bar',
  imports: [],
  templateUrl: './view-tool-bar.component.html',
  styleUrl: './view-tool-bar.component.scss',
})
export class ViewToolBarComponent {
  projectInstanceStore = inject(ProjectInstanceStore);

  title = input<string>('');

  layoutList: boolean = true;

  toggleList() {
    this.layoutList = !this.layoutList;
  }
}
