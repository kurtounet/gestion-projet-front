import { Component, computed, Inject, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Modal } from './features/dashboard/components/modal/modal';
import { Dialog } from './features/dashboard/components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Modal, Dialog],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
