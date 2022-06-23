import { Component } from '@angular/core';
import { UiService } from 'src/app/_services/ui.service';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent {

  constructor(public ui: UiService) { }

  openModal(project: number) {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('modal-active');
    this.ui.openModal(project);
  }

  closeModal() {
    if (!this.ui.isScreenActive) {
      let body = document.getElementsByTagName('body')[0];
      body.classList.remove('modal-active');
    }
    this.ui.closeModal();
  }

}
