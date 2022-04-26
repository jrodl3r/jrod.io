import { Component } from '@angular/core';
import { ResumeService } from 'src/app/_services/resume.service';
import { UiService } from '../../_services/ui.service';

@Component({
  selector: 'app-resume-header',
  templateUrl: './resume-header.component.html',
  styleUrls: ['./resume-header.component.scss']
})
export class ResumeHeaderComponent {

  constructor(
    public resume: ResumeService,
    public ui: UiService
  ) { }

}
