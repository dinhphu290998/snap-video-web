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
      excerpt: 'Khám phá bí quyết tải video TikTok không watermark cực nhanh với chất lượng Full HD và 4K...',
      content: `
      TikTok đang là nền tảng video phổ biến nhất hiện nay.
      SnapVideo giúp bạn tải video TikTok không logo hoàn toàn miễn phí.

      Chỉ cần sao chép liên kết video và dán vào công cụ để tải xuống nhanh chóng.
    `,
      category: 'TikTok',
      date: '01/05/2026',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Top 10 mẹo tải video Facebook HD không giảm chất lượng',
      excerpt: 'Hướng dẫn lưu video Facebook Full HD siêu nhanh trên điện thoại và máy tính...',
      content: `
      SnapVideo hỗ trợ tải video Facebook với chất lượng cao.
      Không cần cài ứng dụng hay đăng nhập tài khoản.
    `,
      category: 'Facebook',
      date: '01/05/2026',
      image: 'https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Hướng dẫn tải Instagram Reels không logo cực dễ',
      excerpt: 'Tải nhanh Reels Instagram chất lượng cao chỉ với vài thao tác đơn giản...',
      content: `
      SnapVideo cho phép tải Reels Instagram miễn phí.
      Hỗ trợ video HD và tải cực nhanh.
    `,
      category: 'Instagram',
      date: '30/04/2026',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'SnapVideo hỗ trợ tải video Xiaohongshu mới nhất',
      excerpt: 'Lưu video Little Red Book không watermark chỉ trong vài giây...',
      content: `
      Bạn có thể tải video Xiaohongshu bằng cách dán link vào SnapVideo.
      Hệ thống sẽ tự động xử lý video chất lượng cao.
    `,
      category: 'Xiaohongshu',
      date: '30/04/2026',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 5,
      title: '5 lý do SnapVideo được yêu thích năm 2026',
      excerpt: 'Tốc độ tải nhanh, không quảng cáo khó chịu và hỗ trợ đa nền tảng...',
      content: `
      SnapVideo là công cụ tải video miễn phí được nhiều người sử dụng.
      Hỗ trợ TikTok, Facebook, Instagram và nhiều nền tảng khác.
    `,
      category: 'Đánh giá',
      date: '29/04/2026',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 6,
      title: 'Cách lưu video Pinterest chất lượng cao miễn phí',
      excerpt: 'Tải video Pinterest HD cực nhanh không cần đăng ký tài khoản...',
      content: `
      SnapVideo hỗ trợ tải video Pinterest với chất lượng cao.
      Chỉ cần dán liên kết bài đăng để tải xuống.
    `,
      category: 'Pinterest',
      date: '29/04/2026',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 7,
      title: 'Tải video Douyin không logo trên điện thoại',
      excerpt: 'Hướng dẫn tải video Douyin Full HD miễn phí cực đơn giản...',
      content: `
      Douyin là phiên bản TikTok Trung Quốc rất phổ biến.
      SnapVideo hỗ trợ tải video Douyin không watermark.
    `,
      category: 'Douyin',
      date: '28/04/2026',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 8,
      title: 'Cách tải video Twitter/X nhanh nhất hiện nay',
      excerpt: 'Lưu video từ X (Twitter) chất lượng HD chỉ với vài bước...',
      content: `
      Bạn có thể tải video Twitter nhanh chóng bằng SnapVideo.
      Hỗ trợ mọi thiết bị và hoàn toàn miễn phí.
    `,
      category: 'Twitter',
      date: '28/04/2026',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 9,
      title: 'Tải video YouTube Shorts không watermark',
      excerpt: 'Cách lưu YouTube Shorts chất lượng cao cực dễ...',
      content: `
      SnapVideo giúp tải Shorts nhanh chóng.
      Giữ nguyên chất lượng video gốc.
    `,
      category: 'YouTube',
      date: '27/04/2026',
      image: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 10,
      title: 'Hướng dẫn tải video Threads mới nhất',
      excerpt: 'Lưu video Threads miễn phí trên mọi trình duyệt...',
      content: `
      SnapVideo hiện đã hỗ trợ tải video Threads.
      Không cần cài đặt ứng dụng bổ sung.
    `,
      category: 'Threads',
      date: '27/04/2026',
      image: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 11,
      title: 'Top công cụ tải video miễn phí tốt nhất 2026',
      excerpt: 'So sánh những nền tảng tải video nhanh và ổn định nhất hiện nay...',
      content: `
      SnapVideo nổi bật với tốc độ tải cao và giao diện đơn giản.
      Hỗ trợ đa nền tảng video phổ biến.
    `,
      category: 'Review',
      date: '26/04/2026',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 12,
      title: 'Cách tải video HD không cần phần mềm',
      excerpt: 'Không cần cài app vẫn tải video Full HD cực nhanh...',
      content: `
      SnapVideo hoạt động trực tiếp trên trình duyệt.
      Tương thích điện thoại và máy tính.
    `,
      category: 'Hướng dẫn',
      date: '26/04/2026',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 13,
      title: 'Tải video TikTok MP3 nhanh chóng',
      excerpt: 'Chuyển đổi video TikTok sang MP3 miễn phí cực dễ...',
      content: `
      SnapVideo hỗ trợ tải âm thanh MP3 từ TikTok.
      Chất lượng cao và xử lý nhanh.
    `,
      category: 'TikTok',
      date: '25/04/2026',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 14,
      title: 'Tải video Facebook riêng tư có được không?',
      excerpt: 'Giải đáp cách tải video Facebook chất lượng cao an toàn...',
      content: `
      SnapVideo hỗ trợ nhiều định dạng video Facebook.
      Dễ sử dụng và tốc độ tải ổn định.
    `,
      category: 'Facebook',
      date: '25/04/2026',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 15,
      title: 'Cách lưu Instagram Story về điện thoại',
      excerpt: 'Tải nhanh Story Instagram HD miễn phí...',
      content: `
      SnapVideo cho phép tải Story Instagram dễ dàng.
      Không cần tài khoản đăng nhập.
    `,
      category: 'Instagram',
      date: '24/04/2026',
      image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 16,
      title: 'SnapVideo cập nhật tốc độ tải siêu nhanh',
      excerpt: 'Phiên bản mới giúp tải video nhanh hơn 3 lần...',
      content: `
      Hệ thống CDN mới giúp cải thiện tốc độ tải đáng kể.
      Trải nghiệm tải video mượt mà hơn.
    `,
      category: 'Cập nhật',
      date: '24/04/2026',
      image: 'https://images.unsplash.com/photo-1516321310764-8d8c2d0d2c62?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 17,
      title: 'Hướng dẫn tải video TikTok trên iPhone',
      excerpt: 'Cách lưu video TikTok không logo trên iOS cực đơn giản...',
      content: `
      SnapVideo hoạt động tốt trên Safari và Chrome iPhone.
      Tải video nhanh chóng không watermark.
    `,
      category: 'TikTok',
      date: '23/04/2026',
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 18,
      title: 'Cách tải video TikTok trên Android',
      excerpt: 'Lưu video TikTok HD trên Android chỉ vài giây...',
      content: `
      SnapVideo hỗ trợ mọi dòng điện thoại Android.
      Không cần cài đặt ứng dụng phức tạp.
    `,
      category: 'TikTok',
      date: '23/04/2026',
      image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 19,
      title: 'Tải video CapCut template nhanh chóng',
      excerpt: 'Lưu template CapCut không watermark miễn phí...',
      content: `
      SnapVideo hỗ trợ tải video và template CapCut.
      Giữ nguyên chất lượng gốc.
    `,
      category: 'CapCut',
      date: '22/04/2026',
      image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop'
    },

    {
      id: 20,
      title: 'Cách tải video Lemon8 HD miễn phí',
      excerpt: 'Lưu video Lemon8 cực nhanh không logo...',
      content: `
      SnapVideo hiện hỗ trợ tải video Lemon8.
      Hoạt động ổn định trên mọi thiết bị.
    `,
      category: 'Lemon8',
      date: '22/04/2026',
      image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?q=80&w=1000&auto=format&fit=crop'
    }

    // Tiếp tục tương tự đến id: 50
  ];

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Blog SnapVideo - Chia sẻ thủ thuật tải video mạng xã hội');
    this.meta.updateTag({
      name: 'description',
      content: 'Cập nhật tin tức, hướng dẫn tải video TikTok, Facebook, Instagram không logo.'
    });
  }
}