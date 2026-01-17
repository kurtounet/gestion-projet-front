import { inject, Injectable, signal } from '@angular/core';
import { INotification } from '../models/notification.model';
import { NotificationService } from '../services/notification.service';
 export const initialNotificationState: INotification = {
  id: 0,
  userId: 0,
  message: "",
  date: new Date('now()'),
  type: "",
};
@Injectable({
  providedIn: 'root',
})
export class NotificationStore {
  readonly notificationService = inject(NotificationService);

  notifications = signal<INotification[]>([]);
  currentNotification = signal<INotification>(initialNotificationState);
  notificationLoading = signal<boolean>(false);
  notificationLoaded = signal<boolean>(false);

  notification = signal<INotification[]>([]);

  getAllNotification(): void {
    this.notificationLoading.set(true);
    this.notificationService.getAllNotification().subscribe({
      next: (data) => {
        if (data) {
          this.notifications.set(data);
          this.notificationLoaded.set(true);
          this.notificationLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des notification', err);
        this.notificationLoading.set(false);
      },
    });
  }
  getNotificationById(id: string): void {
    this.notificationLoading.set(true);
    this.notificationService.getNotificationById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentNotification.set(data);
          this.notificationLoaded.set(true);
          this.notificationLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du notification', err);
        this.notificationLoading.set(false);
      },
    });
  }
  updateNotification(id: string, body: INotification) {
    this.notificationService.updateNotification(id, body).subscribe({
      next: (data) => {
        //this.getCurrentNotification(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createNotification(body: INotification) {
    this.notificationService.createNotification(body).subscribe({
      next: (data) => {
        // this.getCurrentNotification(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteNotification(id: string) {
    this.notificationService.deleteNotification(id).subscribe({
      next: (data) => {
        // this.getCurrentNotification(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
