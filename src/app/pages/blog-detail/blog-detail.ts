import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.css']
})
export class BlogDetail implements OnInit {

  post: any;

  allPosts = [
    {
      id: 1,
      title: 'Cách tải video TikTok không logo chất lượng 4K mới nhất 2026',
      excerpt: 'Khám phá bí quyết sở hữu những video TikTok sạch bóng watermark...',
      content: `
        <p>TikTok hiện là nền tảng video ngắn lớn nhất thế giới.</p>

        <p>Nếu bạn muốn tải video TikTok không logo, SnapVideo là giải pháp nhanh chóng và miễn phí.</p>

        <h3>Cách thực hiện</h3>

        <p>Bước 1: Sao chép liên kết video TikTok.</p>
        <p>Bước 2: Dán vào ô tải xuống.</p>
        <p>Bước 3: Chọn chất lượng HD hoặc 4K.</p>

        <h3>Lợi ích</h3>

        <p>Tốc độ nhanh, không watermark, không cần cài app.</p>
      `,
      category: 'Thủ thuật TikTok',
      date: '28/04/2026',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 2,
      title: 'SnapVideo chính thức hỗ trợ tải video Xiaohongshu',
      excerpt: 'Tin vui cho cộng đồng mê decor và thời trang...',
      content: `
        <p>SnapVideo đã cập nhật tính năng tải video Xiaohongshu.</p>

        <p>Chỉ cần sao chép liên kết bài đăng và dán vào hệ thống.</p>

        <h3>Tại sao nên dùng?</h3>

        <p>Không cần đăng nhập, tốc độ tải cao, hỗ trợ chất lượng gốc.</p>
      `,
      category: 'Cập nhật',
      date: '25/04/2026',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 3,
      title: '5 lý do SnapVideo là công cụ tải Facebook tốt nhất hiện nay',
      excerpt: 'Tại sao người dùng lại chuyển từ công cụ cũ...',
      content: `
        <p>Facebook chứa rất nhiều video hữu ích.</p>

        <h3>5 lý do nên dùng</h3>

        <p>1. Tải nhanh</p>
        <p>2. Không giới hạn</p>
        <p>3. Không quảng cáo khó chịu</p>
        <p>4. Giữ chất lượng gốc</p>
        <p>5. Miễn phí</p>
      `,
      category: 'Đánh giá',
      date: '22/04/2026',
      image: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.post = this.allPosts.find(p => p.id === id);

    if (this.post) {
      this.title.setTitle(this.post.title + ' | SnapVideo');

      this.meta.updateTag({
        name: 'description',
        content: this.post.excerpt
      });

      this.meta.updateTag({
        property: 'og:title',
        content: this.post.title
      });

      this.meta.updateTag({
        property: 'og:image',
        content: this.post.image
      });
    }
  }
}