import { Component, OnInit, Inject, ChangeDetectorRef, HostListener } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common'; // Thêm DOCUMENT
import { FormsModule } from '@angular/forms'; // Bắt buộc để dùng [(ngModel)]
import { Title, Meta } from '@angular/platform-browser';
import { VideoService } from '../../services/video';
import { NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule // Bắt buộc phải có ở đây
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})

export class Home implements OnInit {
  // --- KHAI BÁO BIẾN (Để không bị lỗi ở HTML) ---
  url: string = '';
  result: any = null;
  loading: boolean = false;
  error: string = '';
  isFocused: boolean = false; // Biến này dùng cho hiệu ứng input khi focus

  constructor(
    private videoService: VideoService,
    private title: Title,
    private meta: Meta,
    private cdr: ChangeDetectorRef, // Inject vào đây
    private zone: NgZone,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document // Inject Document để làm SEO
  ) { }

  ngOnInit(): void {
    this.updateSEO();
  }

  isDevToolsOpen = false;

  // Lắng nghe sự kiện thay đổi kích thước màn hình
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    // this.checkConsole();
  }
  checkConsole() {
    const hasTouch =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const screenWidth = window.innerWidth;

    const threshold = 160;

    const widthDiff =
      window.outerWidth - window.innerWidth > threshold;

    const heightDiff =
      window.outerHeight - window.innerHeight > threshold;

    const devToolsDetected = widthDiff || heightDiff;

    // Mobile thật (điện thoại/tablet thật)
    const isRealMobile =
      hasTouch && screenWidth <= 1024 && !devToolsDetected;

    // Nếu là mobile thật thì bỏ qua check
    if (isRealMobile) {
      this.isDevToolsOpen = false;
      return;
    }

    // Desktop hoặc DevTools responsive mode vẫn check bình thường
    if (devToolsDetected) {
      this.isDevToolsOpen = true;
      this.loading = false;
      console.clear();
    } else {
      this.isDevToolsOpen = false;
    }
  }
  // --- HÀM TẢI VIDEO ---
  async download() {
    if (this.isDevToolsOpen) {
      alert('Vui lòng tắt F12 trước khi tải!');
      return;
    }

    if (!this.url || !this.url.trim()) {
      this.error = 'Vui lòng dán link video hợp lệ!';
      return;
    }

    this.error = '';
    this.loading = true;
    this.result = null;
    this.cdr.detectChanges(); // Hiện Spinner ngay lập tức

    try {
      const res = await this.videoService.getData(this.url.trim());
      console.log('Dữ liệu API:', res);
      this.loading = false;
      this.cdr.detectChanges();
      if (res && (res.medias?.length > 0)) {
        console.log('Dữ liệu medias:', res.medias);

        this.zone.run(() => {
          this.result = res;
          this.loading = false;
          this.error = '';
          this.cdr.detectChanges();
        });

        this.result = res;
        this.error = '';
        this.cdr.detectChanges();
      } else {
        this.error = 'Không tìm thấy link tải video này. Hãy thử link khác!';
      }
      this.cdr.detectChanges(); // Hiện Spinner ngay lập tức

    } catch (e) {
      this.zone.run(() => {
        this.loading = false;
        this.error = 'Không thể kết nối với máy chủ hoặc link không hợp lệ.';
        this.cdr.detectChanges(); // Hiện Spinner ngay lập tức
      });

      console.error(e);
    } finally {
      this.loading = false;

      // Tự động cuộn xuống vùng kết quả nếu có result
      if (this.result) {
        setTimeout(() => {
          const resultElement = document.querySelector('.result-card-modern');
          resultElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          this.cdr.detectChanges(); // Hiện Spinner ngay lập tức
        }, 50);
      }

      this.cdr.detectChanges(); // Render giao diện kết quả

    }
  }

  downloadVideo(url: string, title?: string) { if (!url) return; const fileName = (title ? title.replace(/[\\/:*?"<>|]/g, '').trim() : 'video') + '.mp4'; this.http.get(url, { responseType: 'blob' }).subscribe({ next: (blob) => { const blobUrl = window.URL.createObjectURL(blob); const a = this.document.createElement('a'); a.href = blobUrl; a.download = fileName; a.style.display = 'none'; this.document.body.appendChild(a); a.click(); a.remove(); window.URL.revokeObjectURL(blobUrl); }, error: () => { alert('Không thể tải video. Server chặn tải trực tiếp.'); } }); }

  // --- TỐI ƯU SEO ---
  updateSEO() {
    // 1. Tiêu đề: Bao quát các nền tảng chính và tính năng "Không logo"
    this.title.setTitle('SnapVideo - Tải Video TikTok, Facebook, Instagram Không Logo HD');

    // 2. Meta Description: Chứa các từ khóa hành động và liệt kê đầy đủ nền tảng
    this.meta.updateTag({
      name: 'description',
      content: 'SnapVideo - Công cụ tải video trực tuyến tốt nhất cho TikTok, Facebook, Instagram, Xiaohongshu và Douyin. Tải video không logo, chất lượng Full HD, 2K, 4K hoàn toàn miễn phí.'
    });

    // 3. JSON-LD Schema: Sử dụng "AggregateRating" (nếu có) hoặc mô tả ứng dụng tổng thể
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
      "featureList": [
        "Tải video TikTok không logo",
        "Tải video Facebook HD",
        "Tải Instagram Reels & Story",
        "Tải ảnh và video Xiaohongshu"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "12560"
      }
    };

    // Dọn dẹp script cũ để tránh trùng lặp khi người dùng điều hướng
    const oldScript = this.document.querySelector('script[type="application/ld+json"]');
    if (oldScript) {
      oldScript.remove();
    }

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }
}