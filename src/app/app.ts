import { Component, computed, Inject, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Modal } from './features/dashboard/components/modal/modal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Modal],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
