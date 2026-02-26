import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UriService {
  extractId(uri: string): string {
    const parts = uri.split('/');
    return parts[parts.length - 1];
  }
  extractResource(uri: string): string {
    const parts = uri.split('/');
    return parts[parts.length - 2];
  }
}
