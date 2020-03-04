/**
 * 单选按钮组
 * 适用于列表项很少的按钮组
 */
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RadioModel } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-radio',
  templateUrl: './radio.component.html',
  styleUrls: [
    './radio.component.scss',
  ],
})
export class RadioComponent {
  @Input() model: RadioModel;
  @Input() form: FormGroup;
}
