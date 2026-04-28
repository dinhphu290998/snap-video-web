import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.html',
  styleUrls: ['./blog-detail.css']
})
export class BlogDetail implements OnInit {
  post: any;

  // Dữ liệu giả lập (Sau này Phú gọi API dựa vào ID)
  allPosts = [
    {
      id: 1,
      title: 'Cách tải video TikTok không logo chất lượng 4K mới nhất 2026',
      content: `
        <p>TikTok hiện nay là nền tảng video ngắn lớn nhất thế giới, nhưng vấn đề dính logo (watermark) luôn khiến người dùng khó chịu khi muốn tái sử dụng nội dung...</p>
        <h3>1. Tại sao cần tải video không logo?</h3>
        <p>Việc tải video không logo giúp nội dung trông chuyên nghiệp hơn khi bạn chia sẻ lên các nền tảng khác như Reels hoặc Shorts...</p>
        <h3>2. Cách sử dụng SnapVideo</h3>
        <p>Chỉ cần dán link và nhấn nút, hệ thống AI của chúng tôi sẽ tự động xử lý...</p>
      `,
      date: '28/04/2026',
      category: 'Thủ thuật TikTok',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000'
    },
    // Thêm các bài khác vào đây...
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.post = this.allPosts.find(p => p.id == Number(id));
  }
}