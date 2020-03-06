import { Component, OnInit, Input } from '@angular/core';
import { SpreadsheetModel } from '../test-form.options';

@Component({
  selector: 'ngx-in-component',
  templateUrl: './in-component.component.html',
  styleUrls: ['./in-component.component.css']
})
export class InComponentComponent implements OnInit {

  @Input() model: SpreadsheetModel;
  @Input() form: any;

  constructor() { }

  ngOnInit() {
  }

}
