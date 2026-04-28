import { ChangeDetectorRef, Component, HostListener, Inject, NgZone } from '@angular/core';
import { VideoService } from '../../services/video';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DOCUMENT } from '@angular/common'; // Thêm DOCUMENT
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-instagram',
  imports: [
    CommonModule,
    FormsModule // Bắt buộc phải có ở đây
  ],
  templateUrl: './instagram.html',
  styleUrl: './instagram.css',
})

export class Instagram {
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
    this.updateSEOForInstagram();
    this.checkConsole();
  }

  isDevToolsOpen = false;

  // Lắng nghe sự kiện thay đổi kích thước màn hình
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkConsole();
  }

  checkConsole() {
    const threshold = 160;
    const widthDiff = window.outerWidth - window.innerWidth > threshold;
    const heightDiff = window.outerHeight - window.innerHeight > threshold;

    if (widthDiff || heightDiff) {
      this.isDevToolsOpen = true;
      this.loading = false; // Dừng mọi tiến trình đang chạy
      console.clear();      // Xóa dấu vết API
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
  // --- TỐI ƯU SEO CHO TAB INSTAGRAM ---
  updateSEOForInstagram() {
    // 1. Tiêu đề tập trung vào Reels và Story (2 thứ được tải nhiều nhất)
    this.title.setTitle('Tải Video Instagram, Reels, Story HD Không Logo - SnapVideo');

    // 2. Meta Description chứa các từ khóa ngách: Story, IGTV, Private
    this.meta.updateTag({
      name: 'description',
      content: 'Trình tải video Instagram (IG) tốt nhất. Hỗ trợ tải Reels, ảnh, Story và IGTV chất lượng cao. Tải nhanh clip Instagram không logo, miễn phí 100%.'
    });

    // 3. JSON-LD Schema cho công cụ Instagram
    const schema = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Instagram Downloader - SnapVideo",
      "alternateName": "Tải video IG, Tải Reels Instagram",
      "url": "https://yourdomain.com/instagram",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "VND"
      },
      "description": "Dịch vụ trực tuyến cho phép lưu video, ảnh và Reels từ Instagram với chất lượng gốc."
    };

    // Xử lý dọn dẹp và chèn script mới
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
