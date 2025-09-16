import { Injectable } from '@angular/core';
import * as QRCode from 'qrcode';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  constructor() {}

  async generateQrCodeUrl(baseUrl: string, id: number): Promise<string> {
    try {
      // Final URL that will be inside the QR
      const url = `${baseUrl}/${id}`;

      // Convert to QR (Base64 image string)
      return await QRCode.toDataURL(url, {
        errorCorrectionLevel: 'H',
        type: 'image/png',
        width: 300,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
    } catch (err) {
      console.error('QR Code generation failed', err);
      throw err;
    }
  }
}
