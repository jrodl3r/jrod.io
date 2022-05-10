import { Injectable } from '@angular/core';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  constructor(public ui: UiService) { }

  download(): void {
    this.ui.closeMenu();
    window.location.href = 'https://storage.googleapis.com/jrod-new.appspot.com/resume/John%20Rodler%20-%20Full%20Stack%20Engineer.pdf';
  }

  print(): void {
    this.ui.closeMenu();
    setTimeout(() => window.print(), 100);
  }

  exit(): void {
    window.location.href = '/';
  }
}
