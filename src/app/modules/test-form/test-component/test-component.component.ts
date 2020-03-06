import { Component, OnInit } from '@angular/core';

import { Option, SpreadsheetModel } from '../test-form.options';
import { ResourceProvider } from '../test-form.provider';

@Component({
  selector: 'ngx-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  option: Option<string>;
  model: SpreadsheetModel;
  form: any;

  constructor(private provider: ResourceProvider) {
    this.form = 'hello';
  }

  ngOnInit() {
    this.option = { text: '标签', value: '值'};
  }

}
