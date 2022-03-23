import { Component } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { Contact } from '../../_models/contact';

@Component({
  selector: 'home-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  model = new Contact('', '', '', '');
  captchaNums: Array<number> = [];
  emailRx: RegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  isHuman: boolean = false;
  isSending: boolean = false;
  isSent: boolean = false;
  isError: boolean = false;

  constructor() {
    this.captcha();
  }

  async submit(e: Event, form: any) {
    this.isError = false;
    this.isSending = true;
    emailjs
      .sendForm('default_service', 'template_k06f5lt', e.target as HTMLFormElement, 'vWsUnW9r-is62Oolr')
      .then((result: EmailJSResponseStatus) => {
        this.isSent = true;
        this.isSending = false;
        this.isHuman = false;
        form.reset();
      }, (error) => {
        this.isError = true;
        this.isSending = false;
      });
  }

  verify(e: Event) {
    if (parseInt((<HTMLInputElement>e.target).value) === this.captchaNums[2]) {
      this.isHuman = true;
    }
  }

  captcha() {
    this.captchaNums[0] = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    this.captchaNums[1] = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    this.captchaNums[2] = this.captchaNums[0] + this.captchaNums[1];
  }

  clear() { this.isError = false; }

}
