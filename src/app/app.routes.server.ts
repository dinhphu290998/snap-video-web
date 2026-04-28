import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender
  },

  {
    path: 'tiktok-downloader',
    renderMode: RenderMode.Prerender
  },

  {
    path: 'facebook-video-download',
    renderMode: RenderMode.Prerender
  },

  {
    path: 'instagram-downloader',
    renderMode: RenderMode.Prerender
  },

  {
    path: 'xiaohongshu-downloader',
    renderMode: RenderMode.Prerender
  },

  {
    path: 'about-us',
    renderMode: RenderMode.Prerender
  },

  {
    path: 'privacy-policy',
    renderMode: RenderMode.Prerender
  },

  {
    path: 'terms-of-service',
    renderMode: RenderMode.Prerender
  },

  {
    path: 'contact',
    renderMode: RenderMode.Prerender
  },

  {
    path: 'blogs',
    renderMode: RenderMode.Prerender
  },

  {
    path: 'blogs/:id',
    renderMode: RenderMode.Server
  },

  {
    path: '**',
    renderMode: RenderMode.Server
  }
];