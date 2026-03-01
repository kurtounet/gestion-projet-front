import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  hexToRgba(hex: string | undefined, alpha: number = 1): string {
    if (!hex) return 'transparent';
    const cleanHex = hex.startsWith('#') ? hex.slice(1) : hex;
    // Gestion des formats courts (ex: #f00 -> ff0000)
    let fullHex = cleanHex;
    if (cleanHex.length === 3) {
      fullHex = cleanHex
        .split('')
        .map((char) => char + char)
        .join('');
    }

    if (fullHex.length !== 6) return 'transparent';

    const r = parseInt(fullHex.slice(0, 2), 16);
    const g = parseInt(fullHex.slice(2, 4), 16);
    const b = parseInt(fullHex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
