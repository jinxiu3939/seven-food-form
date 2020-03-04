/**
 * 日期选择框
 */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as moment from 'moment';

import { AllHours, AllMinutes } from './time.const';
import { DatePickerModel } from '../../dynamic-form.options';

@Component({
  selector: 'ngx-date-picker',
  styles: [
    '.date-input {width: 7.5rem; height: 2.5rem;}',
    '.date-time-input {width: auto;}',
  ],
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent implements OnInit {
  @Input() model: DatePickerModel;
  @Input() form: FormGroup;

  hours = AllHours;
  minutes = AllMinutes;
  date: Date; // 日期默认值
  hour: string; // 小时
  minute: string; // 分钟

  ngOnInit() {
    if (this.model && this.model.value) {
      this.date = new Date(this.model.value); // 字符串转换成日期格式
      this.hour = this.model.value.substr(11, 2);
      this.minute = this.model.value.substr(14, 2);
    }
  }

  get day() {
    return this.model.value ? this.model.value.substr(0, 10) : '';
  }

  handleDateChange(date: Date) {
    this.date = date;
    this.setFormValue();
  }

  selectTime() {
    this.setFormValue();
  }

  setFormValue() {
    if (this.date) {
      this.model.value = moment(this.date).add(this.hour, 'hours')
        .add(this.minute, 'minutes')
        .format(this.model.format);
      this.form.controls[this.model.name].setValue(this.model.value); // 表单赋值
    }
  }
}

