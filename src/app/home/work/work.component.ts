import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { UiService } from 'src/app/_services/ui.service';

@Component({
  selector: 'home-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss']
})
export class WorkComponent implements OnInit {

  constructor(
    public breakpoint: BreakpointObserver,
    public ui: UiService
  ) { }

  ngOnInit(): void {
    this.breakpoint
      .observe(['(min-width: 860px)', '(max-width: 860px)', '(max-width: 1024px)'])
      .subscribe((state: BreakpointState) => this.ui.resetPage());
    this.breakpoint
      .observe(['(max-width: 860px)'])
      .subscribe((state: BreakpointState) => state.matches ? this.ui.updatePageMax(5) : null);
    this.breakpoint
      .observe(['(min-width: 860px)'])
      .subscribe((state: BreakpointState) => state.matches ? this.ui.updatePageMax(1) : null);
    this.breakpoint
      .observe(['(max-width: 1024px)'])
      .subscribe((state: BreakpointState) => state.matches ? this.ui.enableSwipe() : null);
    this.breakpoint
      .observe(['(min-width: 1024px)'])
      .subscribe((state: BreakpointState) => state.matches ? this.ui.disableSwipe() : null);
  }

}
