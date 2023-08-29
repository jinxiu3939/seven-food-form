import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-date-config',
  template: `
  <div>
    <span>{{ payload }}</span>
    <a nbButton status="info" (click)="sure()">ok</a>
    <a nbButton status="warning" (click)="destroy()">cancel</a>
  </div>
  `,
})
export class DateConfigComponent implements OnInit {

  value: any;
  payload: any;

  constructor(protected ref: NbDialogRef<DateConfigComponent>) {}

  ngOnInit() {
    console.log(this.payload);
  }

  sure() {
    this.ref.close({value: 'popup', text: 'ok'});
  }

  destroy() {
    this.ref.close();
  }

}
