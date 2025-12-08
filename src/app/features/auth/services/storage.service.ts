import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public setLocalStorageToken(token: string): void {
    localStorage.setItem('token', token);
  }

  public getLocalStorageToken(): string | null {
    return localStorage.getItem('token');
  }

  //  getToken(): string | null {
  //   return localStorage.getItem('token');
  // }

  // public setLocalStorageUser(user: IUser): void {
  //   localStorage.setItem("user", JSON.stringify(user));
  // }

  // public getLocalStorageUser(): IUser {
  //   const user = localStorage.getItem("user");
  //   return user ? JSON.parse(user) : null;
  // }
}
