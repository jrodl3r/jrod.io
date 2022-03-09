import { Component, OnInit } from '@angular/core';
import { UiService } from '../_services/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isLoaded: Boolean = false;

  constructor(public ui: UiService) { }

  ngOnInit(): void {
    setTimeout(() => { this.isLoaded = true; }, 1400);
  }

}
