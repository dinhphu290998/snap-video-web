import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterLink } from '@angular/router'; // 1. Import cái này

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.html',
  styleUrls: ['./terms-of-service.css'],
  imports: [RouterLink, CommonModule]
})
export class TermsOfService implements OnInit {

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
    this.title.setTitle('Điều khoản dịch vụ | SnapVideo - Quy định sử dụng');
    this.meta.updateTag({
      name: 'description',
      content: 'Quy định và điều khoản sử dụng dịch vụ tải video SnapVideo. Tìm hiểu về quyền sở hữu trí tuệ và trách nhiệm người dùng khi sử dụng công cụ của chúng tôi.'
    });

    // Chèn WebPage Schema
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Terms of Service - SnapVideo",
      "description": "Điều khoản sử dụng dịch vụ tải video trực tuyến SnapVideo.",
      "publisher": {
        "@type": "Organization",
        "name": "SnapVideo"
      }
    };

    const oldScript = this.document.querySelector('script[id="terms-schema"]');
    if (oldScript) { this.renderer.removeChild(this.document.head, oldScript); }

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'terms-schema';
    script.text = JSON.stringify(schema);
    this.renderer.appendChild(this.document.head, script);
  }
}