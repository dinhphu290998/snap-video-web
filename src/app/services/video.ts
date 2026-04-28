import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class VideoService {

  async getData(url: string) {
    const API_URL =
      location.hostname === 'localhost'
        ? 'https://snap-video-web.vercel.app/api/download'
        : '/api/download';

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url })
    });

    if (!res.ok) {
      throw new Error('API error');
    }

    return await res.json();
  }
}