import { Component, Inject, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectInstantStore } from './features/dashboard/stores/project-instant.store';
import { Modal } from "./features/dashboard/components/modal/modal";
import { LocalStorageService } from './features/dashboard/services/local-storage.service';
import { InitAppService } from './features/dashboard/services/init-app.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Modal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  initService = inject(InitAppService).Init();

}
