import { Component, inject, signal } from '@angular/core';
import { CardProject } from "../../components/card-project/card-project";

import { Router, RouterLink } from '@angular/router';
import { ProjectInstanceService } from '../../services/project-instance.service';
import { AsyncPipe } from '@angular/common';
import { IProjectInstance } from '../../models/project-instance.model';
import { ProjectInstantStore } from '../../stores/project-instant.store';

@Component({
  selector: 'app-projet-list',
  imports: [CardProject],
  templateUrl: './projet-list.component.html',
  styleUrl: './projet-list.component.scss'
})
export class ProjetListComponent {
readonly projectInstanceStore = inject(ProjectInstantStore);
}
