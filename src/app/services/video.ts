import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class VideoService {

  // ⚠️ KHÔNG PHẢI SECRET BẢO MẬT
  // chỉ là "client identifier logic"
  private CLIENT_ID = 'snapvideo-web-client';

  private createPayload(url: string) {
    const timestamp = Date.now();
    const nonce = Math.random().toString(36).substring(2);

    return { url, timestamp, nonce };
  }

  private createSignature(url: string, timestamp: number, nonce: string) {
    const payload = `${url}|${timestamp}|${nonce}`;

    // vẫn có HMAC nhưng KHÔNG coi là bảo mật thật
    return CryptoJS.HmacSHA256(payload, this.CLIENT_ID).toString();
  }

  async getData(url: string) {
    const API_URL =
      location.hostname === 'localhost'
        ? 'https://snap-video-web.vercel.app/api/download'
        : '/api/download';

    const { timestamp, nonce } = this.createPayload(url);
    const signature = this.createSignature(url, timestamp, nonce);

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url,
        timestamp,
        nonce,
        signature
      })
    });

    if (!res.ok) {
      throw new Error('API error');
    }

    return await res.json();
  }
}