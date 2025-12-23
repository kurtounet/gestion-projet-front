import { Component, computed, Inject, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectInstanceStore } from './features/dashboard/stores/project-instance.store';
import { Modal } from './features/dashboard/components/modal/modal';
import { LocalStorageService } from './features/dashboard/services/local-storage.service';
import { InitAppService } from './features/dashboard/services/init-app.service';
import { LoadingSpinner } from "./features/dashboard/components/loading-spinner/loading-spinner";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Modal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
