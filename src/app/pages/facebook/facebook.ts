import { ChangeDetectorRef, Component, HostListener, Inject, NgZone } from '@angular/core';
import { VideoService } from '../../services/video';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common'; // Thêm DOCUMENT
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-facebook',
  imports: [
    CommonModule,
    FormsModule // Bắt buộc phải có ở đây
  ],
  templateUrl: './facebook.html',
  styleUrl: './facebook.css',
})
export class Facebook {
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
    this.updateSEOForFacebook();
    this.checkConsole();
  }

  isDevToolsOpen = false;

  // Lắng nghe sự kiện thay đổi kích thước màn hình
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkConsole();
  }
  checkConsole() {
    const screenWidth = window.innerWidth;
    const hasTouch =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Phone: màn hình nhỏ + touch
    const isPhone = screenWidth <= 768 && hasTouch;

    // Tablet: màn hình vừa + touch
    const isTablet =
      screenWidth > 768 &&
      screenWidth <= 1024 &&
      hasTouch;

    // Nếu phone hoặc tablet thì bỏ qua
    if (isPhone || isTablet) {
      this.isDevToolsOpen = false;
      return;
    }

    // Chỉ desktop/laptop mới check
    const threshold = 160;

    const widthDiff =
      window.outerWidth - window.innerWidth > threshold;

    const heightDiff =
      window.outerHeight - window.innerHeight > threshold;

    if (widthDiff || heightDiff) {
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

  // --- TỐI ƯU SEO CHO TAB FACEBOOK ---
  updateSEOForFacebook() {
    // 1. Tiêu đề tập trung từ khóa trọng tâm
    this.title.setTitle('Tải Video Facebook (FB) Không Logo, Chất Lượng HD - SnapVideo');

    // 2. Meta Description chứa từ khóa phụ và lời kêu gọi hành động
    this.meta.updateTag({
      name: 'description',
      content: 'Công cụ tải video Facebook trực tuyến tốt nhất. Hỗ trợ tải clip FB, Reels, video riêng tư chất lượng Full HD, 2K, 4K không dính logo hoàn toàn miễn phí.'
    });

    // 3. Cập nhật JSON-LD Schema chi tiết hơn cho công cụ Web
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Facebook Video Downloader - SnapVideo",
      "alternateName": "Trình tải video Facebook",
      "url": "https://yourdomain.com/facebook", // Thay bằng link thực tế của bạn
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "VND"
      },
      "description": "Tải video từ Facebook về máy tính, điện thoại nhanh chóng với độ phân giải cao nhất."
    };

    // Xóa script cũ (nếu có) để tránh lặp dữ liệu cấu trúc
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
