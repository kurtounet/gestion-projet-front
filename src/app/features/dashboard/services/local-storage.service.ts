import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  setItem(key: string, value: any) {
    if(!key) return
    localStorage.setItem(key, JSON.stringify(value));
  }
  getItem(key: string): string | null {
    if(!key) return null
    return localStorage.getItem(key);
  }
  remove(key: string) {
    if(!key) return
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
  keyName(index:number) {
    localStorage.key(index);
  }
  getCountKeys(): number {
    return localStorage.length;
  }
  getAllKeys(): string[] {
    let keys: string[] = [];
    for (let index = 0; index < localStorage.length; index++){
      keys.push(localStorage.key(index) as string);
    }
    return keys;
  }
}
