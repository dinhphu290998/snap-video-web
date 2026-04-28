import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Tiktok } from './pages/tiktok/tiktok';
import { Facebook } from './pages/facebook/facebook';
import { Instagram } from './pages/instagram/instagram';
import { Xiaohongshu } from './pages/xiaohongshu/xiaohongshu';
import { AboutUs } from './pages/about-us/about-us';
import { PrivacyPolicy } from './pages/privacy-policy/privacy-policy';
import { TermsOfService } from './pages/terms-of-service/terms-of-service';
import { Contact } from './pages/contact/contact';
import { Blogs } from './pages/blogs/blogs';
import { BlogDetail } from './pages/blog-detail/blog-detail';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'tiktok-downloader', component: Tiktok },
  { path: 'facebook-video-download', component: Facebook },
  { path: 'instagram-downloader', component: Instagram },
  { path: 'xiaohongshu-downloader', component: Xiaohongshu },
  { path: 'about-us', component: AboutUs },
  { path: 'privacy-policy', component: PrivacyPolicy },
  { path: 'terms-of-service', component: TermsOfService },
  { path: 'contact', component: Contact },
  { path: 'blogs', component: Blogs },
  { path: 'blogs/:id', component: BlogDetail }, // Thêm dòng này để nhận biến ID
];