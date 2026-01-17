import { inject, Injectable, signal } from '@angular/core';
import { UserService } from '../services/user.service';
import { IUser } from '../models/user.model';
 export const initialUserState: IUser = {
  id: 0,
  role: ['ROLE_USER'],
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  createdAt: new Date('now()'),
  updatedAt: new Date('now()'),
};
@Injectable({
  providedIn: 'root',
})
export class UserStore {
  readonly userService = inject(UserService);

  users = signal<IUser[]>([]);
  currentUser = signal<IUser>(initialUserState);
  userLoading = signal<boolean>(false);
  userLoaded = signal<boolean>(false);

  user = signal<IUser[]>([]);

  getAllUser(): void {
    this.userLoading.set(true);
    this.userService.getAllUser().subscribe({
      next: (data) => {
        if (data) {
          this.users.set(data);
          this.userLoaded.set(true);
          this.userLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des user', err);
        this.userLoading.set(false);
      },
    });
  }
  getUserById(id: string): void {
    this.userLoading.set(true);
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        if (data) {
          this.currentUser.set(data);
          this.userLoaded.set(true);
          this.userLoading.set(false);
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du user', err);
        this.userLoading.set(false);
      },
    });
  }
  updateUser(id: string, body: IUser) {
    this.userService.updateUser(id, body).subscribe({
      next: (data) => {
        //this.getCurrentUser(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour : error', err);
      },
    });
  }
  createUser(body: IUser) {
    this.userService.createUser(body).subscribe({
      next: (data) => {
        // this.getCurrentUser(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la création : error', err);
      },
    });
  }
  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe({
      next: (data) => {
        // this.getCurrentUser(data.id);
      },
      error: (err) => {
        console.error('Erreur lors de la suppression: error', err);
      },
    });
  }
}
