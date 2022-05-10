import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeMenuComponent } from './resume-menu.component';

describe('ResumeMenuComponent', () => {
  let component: ResumeMenuComponent;
  let fixture: ComponentFixture<ResumeMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumeMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
