import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Xiaohongshu } from './xiaohongshu';

describe('Xiaohongshu', () => {
  let component: Xiaohongshu;
  let fixture: ComponentFixture<Xiaohongshu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Xiaohongshu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Xiaohongshu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
