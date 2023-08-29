import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-map-config',
  template: `
  <div>
    <span>{{ payload }}</span>
    <input class="form-control"
         [value]="value">
    <a nbButton status="info" (click)="formChange()">ok</a>
  </div>
  `,
})
export class MapConfigComponent implements OnInit {

  value: any;
  payload: any;
  @Output() change = new EventEmitter<any>();

  ngOnInit() {
    console.log(this.payload);
  }

  formChange() {
    this.change.emit('let\'s go');
  }

}
