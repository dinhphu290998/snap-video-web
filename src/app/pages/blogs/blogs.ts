import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [CommonModule, RouterLink], // Đảm bảo đã import đầy đủ
  templateUrl: './blogs.html',
  styleUrls: ['./blogs.css']
})
export class Blogs implements OnInit {
  // Mảng dữ liệu bài viết ĐÃ SỬA LINK ẢNH
  posts = [
    {
      id: 1,
      title: 'Cách tải video TikTok không logo chất lượng 4K mới nhất 2026',
      excerpt: 'Khám phá bí quyết sở hữu những video TikTok sạch bóng watermark chỉ với vài cú click chuột bằng công nghệ bóc tách CDN tiên tiến...',
      category: 'Thủ thuật TikTok',
      date: '28/04/2026',
      // ẢNH ĐÃ FIX: Chuyên nghiệp về Tech/Social
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'SnapVideo chính thức hỗ trợ tải video Xiaohongshu (Little Red Book)',
      excerpt: 'Tin vui cho cộng đồng mê decor và thời trang! Giờ đây bạn đã có thể lưu lại những thước phim nghệ thuật từ Xiaohongshu cực dễ dàng...',
      category: 'Cập nhật',
      date: '25/04/2026',
      // ẢNH ĐÃ FIX: Tone màu phù hợp thời trang/lifestyle
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 3,
      title: '5 lý do SnapVideo là công cụ tải video Facebook tốt nhất hiện nay',
      excerpt: 'Tại sao người dùng lại chuyển từ các công cụ truyền thống sang SnapVideo? Tốc độ, độ phân giải 2K và tính bảo mật là câu trả lời...',
      category: 'Đánh giá',
      date: '22/04/2026',
      // ẢNH ĐÃ FIX: Facebook/Desktop tech
      image: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Hướng dẫn tải Reels Instagram với độ phân giải nguyên bản',
      excerpt: 'Đừng để chất lượng video bị giảm sút khi tải về. SnapVideo giúp bạn giữ trọn vẹn từng pixel từ những thước phim Instagram Reels...',
      category: 'Thủ thuật Instagram',
      date: '20/04/2026',
      // ẢNH ĐÃ FIX: Màu sắc tươi sáng phù hợp Insta
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'Bảo mật dữ liệu: SnapVideo bảo vệ quyền riêng tư của bạn thế nào?',
      excerpt: 'Chúng tôi cam kết không lưu trữ lịch sử tải xuống và thông tin cá nhân. Hãy tìm hiểu về cơ chế xóa dữ liệu tự động của hệ thống...',
      category: 'Bảo mật',
      date: '18/04/2026',
      // ẢNH ĐÃ FIX: Tone tối, an toàn
      image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'Mẹo tối ưu dung lượng bộ nhớ khi tải video số lượng lớn',
      excerpt: 'Làm thế nào để quản lý hàng trăm video tải về mà không làm đầy máy? Những mẹo nhỏ về định dạng file sẽ giúp bạn giải quyết vấn đề này...',
      category: 'Tips & Tricks',
      date: '15/04/2026',
      // ẢNH ĐÃ FIX: Lưu trữ/Data
      image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Blog SnapVideo - Chia sẻ thủ thuật tải video mạng xã hội');
    this.meta.updateTag({ name: 'description', content: 'Cập nhật tin tức, hướng dẫn tải video TikTok, Facebook, Instagram không logo và các xu hướng công nghệ mới nhất.' });
  }
}