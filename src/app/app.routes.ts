import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Tiktok } from './pages/tiktok/tiktok';
import { Facebook } from './pages/facebook/facebook';
import { Instagram } from './pages/instagram/instagram';
import { Xiaohongshu } from './pages/xiaohongshu/xiaohongshu';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'tiktok-downloader', component: Tiktok },
  { path: 'facebook-video-download', component: Facebook },
  { path: 'instagram-downloader', component: Instagram },
  { path: 'xiaohongshu-downloader', component: Xiaohongshu }
];