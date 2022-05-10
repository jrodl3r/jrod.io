import { Component, OnInit } from '@angular/core';
import { UiService } from '../_services/ui.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
  isLoaded: Boolean = false;

  constructor(public ui: UiService) { }

  ngOnInit(): void {
    setTimeout(() => { this.isLoaded = true; }, 1400);
  }

}
