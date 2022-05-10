import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ResumeService } from 'src/app/_services/resume.service';
import { UiService } from '../../_services/ui.service';

@Component({
  selector: 'app-resume-menu',
  templateUrl: './resume-menu.component.html',
  styleUrls: ['./resume-menu.component.scss']
})
export class ResumeMenuComponent implements OnInit {

  constructor(
    public breakpoint: BreakpointObserver,
    public resume: ResumeService,
    public ui: UiService
  ) { }

  ngOnInit(): void {
    this.breakpoint
      .observe(['(max-width: 900px)'])
      .subscribe((state: BreakpointState) => this.ui.closeMenu());
  }

}
