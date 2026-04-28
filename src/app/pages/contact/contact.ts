import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // 1. Import này
@Component({
  selector: 'app-contact',
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  imports: [ReactiveFormsModule]
})
export class Contact implements OnInit {
  contactForm: FormGroup;

  constructor(
    private title: Title,
    private meta: Meta,
    private fb: FormBuilder,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  ngOnInit(): void {
    this.updateSEO();
  }

  updateSEO() {
    this.title.setTitle('Liên hệ SnapVideo - Hỗ trợ kỹ thuật 24/7');
    this.meta.updateTag({ name: 'description', content: 'Gửi yêu cầu hỗ trợ hoặc góp ý cho SnapVideo. Đội ngũ kỹ thuật của chúng tôi sẽ phản hồi bạn trong vòng 24 giờ.' });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form Submitted', this.contactForm.value);
      alert('Yêu cầu đã được gửi thành công!');
      this.contactForm.reset();
    }
  }
}