import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.html',
  styleUrls: ['./about-us.css']
})
export class AboutUs implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    this.updateSEO();
  }

  updateSEO() {
    // 1. Cập nhật Title & Meta Tags
    this.title.setTitle('Về SnapVideo - Công cụ tải video TikTok, FB, IG không logo');
    this.meta.updateTag({
      name: 'description',
      content: 'Tìm hiểu về SnapVideo - Giải pháp tải video hàng đầu cho TikTok, Facebook, Instagram và Douyin. Chất lượng 4K, hoàn toàn miễn phí và không dính logo.'
    });

    // 2. Chèn JSON-LD Schema (Tối ưu Rich Snippet)
    const schema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "SnapVideo Downloader",
      "operatingSystem": "All",
      "applicationCategory": "MultimediaApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "VND"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "12560"
      }
    };

    // Dọn dẹp script cũ và chèn script mới
    const oldScript = this.document.querySelector('script[id="about-schema"]');
    if (oldScript) { this.renderer.removeChild(this.document.head, oldScript); }

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'about-schema';
    script.text = JSON.stringify(schema);
    this.renderer.appendChild(this.document.head, script);
  }
}