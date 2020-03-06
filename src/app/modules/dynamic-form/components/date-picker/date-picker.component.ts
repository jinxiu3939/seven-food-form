/**
 * 日期选择框
 */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { dateFormat } from '../../helps';
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
      if (this.date.getHours() < 10) {
        this.hour = '0' + this.date.getHours();
      } else {
        this.hour = this.date.getHours() + '';
      }
      if (this.date.getMinutes() < 10) {
        this.minute = '0' + this.date.getMinutes();
      } else {
        this.minute = this.date.getMinutes() + '';
      }
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
      const str_date = this.date.setHours(+this.hour, +this.minute);
      this.model.value = dateFormat(new Date(str_date), this.model.format);
      this.form.controls[this.model.name].setValue(this.model.value); // 表单赋值
    }
  }
}

