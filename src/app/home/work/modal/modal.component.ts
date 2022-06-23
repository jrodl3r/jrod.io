import { Component } from '@angular/core';
import { UiService } from 'src/app/_services/ui.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

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
