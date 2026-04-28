import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.html',
  styleUrls: ['./privacy-policy.css']
})
export class PrivacyPolicy implements OnInit {

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
    this.title.setTitle('Chính sách bảo mật | SnapVideo - An toàn & Riêng tư');
    this.meta.updateTag({
      name: 'description',
      content: 'SnapVideo cam kết bảo vệ quyền riêng tư của bạn. Chúng tôi không lưu trữ video và thông tin cá nhân của người dùng trên máy chủ.'
    });

    // FAQ Schema để tối ưu hiển thị câu hỏi bảo mật trên Google Search
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [{
        "@type": "Question",
        "name": "SnapVideo có lưu trữ video của tôi không?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Không, SnapVideo không lưu trữ bất kỳ bản sao video nào trên máy chủ của chúng tôi."
        }
      }]
    };

    const oldScript = this.document.querySelector('script[id="privacy-schema"]');
    if (oldScript) { this.renderer.removeChild(this.document.head, oldScript); }

    const script = this.renderer.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'privacy-schema';
    script.text = JSON.stringify(schema);
    this.renderer.appendChild(this.document.head, script);
  }

  // Hàm scroll mượt đến các mục
  scrollTo(id: string) {
    const element = this.document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}