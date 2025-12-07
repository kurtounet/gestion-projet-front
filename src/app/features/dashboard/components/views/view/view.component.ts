import { Component, ComponentRef,Type, ViewChild, ViewContainerRef } from '@angular/core';

import { ViewKanbanComponent } from '../view-kanban/view-kanban.component';

@Component({
  selector: 'app-view',
  imports: [
    // ViewKanbanComponent,
  ],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent {
  @ViewChild('dynamicHost', { read: ViewContainerRef })
  dynamicHost!: ViewContainerRef;

  private currentComponentRef: ComponentRef<any> | null = null;

  loadComponent(componentType: Type<any>, data?: any) {
    // Nettoyer le composant précédent
    this.dynamicHost.clear();
    if (this.currentComponentRef) {
      this.currentComponentRef.destroy();
    }

    // Créer le nouveau composant
    this.currentComponentRef = this.dynamicHost.createComponent(componentType);

    // Passer des données au composant si nécessaire
    if (data && this.currentComponentRef.instance) {
      Object.assign(this.currentComponentRef.instance, data);
    }
  }

  ngOnDestroy() {
    if (this.currentComponentRef) {
      this.currentComponentRef.destroy();
    }
  }
/*
  vrc = inject(ViewContainerRef);
  viewType!: string;
  ngOnInit() {
    // Creer dynamiquement le composant ViewListeTypeBar
    const componentRef = this.vrc.createComponent(ViewKanbanComponent);
    // Vous pouvez accéder à l'instance du composant si nécessaire
    const instance = componentRef.instance;
  }
*/
}
