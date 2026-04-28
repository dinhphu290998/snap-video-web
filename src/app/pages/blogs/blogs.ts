// blogs.ts
import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blogs.html',
  styleUrls: ['./blogs.css']
})
export class Blogs implements OnInit {

  posts = [
    {
      id: 1,
      title: 'Cách tải video TikTok không logo chất lượng 4K mới nhất 2026',
      excerpt: 'Khám phá bí quyết sở hữu những video TikTok sạch bóng watermark chỉ với vài cú click chuột bằng công nghệ bóc tách CDN tiên tiến...',
      content: `
        TikTok hiện là nền tảng video ngắn lớn nhất thế giới. 
        Nếu bạn muốn tải video TikTok không logo, SnapVideo là giải pháp nhanh chóng và miễn phí.

        Chỉ cần dán link video TikTok vào ô tìm kiếm, hệ thống sẽ xử lý và trả về file HD / 4K.
      `,
      category: 'Thủ thuật TikTok',
      date: '28/04/2026',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'SnapVideo chính thức hỗ trợ tải video Xiaohongshu (Little Red Book)',
      excerpt: 'Tin vui cho cộng đồng mê decor và thời trang! Giờ đây bạn đã có thể lưu lại những thước phim nghệ thuật từ Xiaohongshu cực dễ dàng...',
      content: `
        SnapVideo đã cập nhật tính năng tải video Xiaohongshu.

        Bạn chỉ cần sao chép liên kết bài đăng và dán vào SnapVideo để tải ngay.
      `,
      category: 'Cập nhật',
      date: '25/04/2026',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 3,
      title: '5 lý do SnapVideo là công cụ tải video Facebook tốt nhất hiện nay',
      excerpt: 'Tại sao người dùng lại chuyển từ các công cụ truyền thống sang SnapVideo? Tốc độ, độ phân giải 2K và tính bảo mật là câu trả lời...',
      content: `
        SnapVideo hỗ trợ tải Facebook Video cực nhanh.

        Không quảng cáo khó chịu, tốc độ cao và giữ nguyên chất lượng gốc.
      `,
      category: 'Đánh giá',
      date: '22/04/2026',
      image: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  constructor(
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Blog SnapVideo - Chia sẻ thủ thuật tải video mạng xã hội');
    this.meta.updateTag({
      name: 'description',
      content: 'Cập nhật tin tức, hướng dẫn tải video TikTok, Facebook, Instagram không logo.'
    });
  }
}