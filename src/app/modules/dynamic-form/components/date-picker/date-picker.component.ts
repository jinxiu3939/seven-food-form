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
    '.row {margin-left: 0;}',
  ],
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent implements OnInit {
  @Input() model: DatePickerModel;
  @Input() form: FormGroup;

  hours = AllHours;
  minutes = AllMinutes;
  date: Date; // 日期默认值

  tmpHour: string = '00';
  tmpMinute: string = '00';

  ngOnInit() {
    if (this.model && this.model.value) {
      this.date = new Date(this.model.value); // 字符串转换成日期格式
    }
  }

  get day() {
    const control = this.form.controls[this.model.name];
    return control.value ? control.value.substr(0, 10) : '';
  }

  get hour() {
    const control = this.form.controls[this.model.name];
    let hour: string = '00'; // 小时
    if (control.value) {
      const date = new Date(control.value); // 字符串转换成日期格式
      if (date.getHours() < 10) {
        hour = '0' + date.getHours();
      } else {
        hour = date.getHours() + '';
      }
    }
    return hour;
  }

  set hour(h) {
    this.tmpHour = h;
  }

  get minute() {
    const control = this.form.controls[this.model.name];
    let minute: string = '00'; // 分钟
    if (control.value) {
      const date = new Date(control.value); // 字符串转换成日期格式
      if (date.getMinutes() < 10) {
        minute = '0' + date.getMinutes();
      } else {
        minute = date.getMinutes() + '';
      }
    }
    return minute;
  }

  set minute(m) {
    this.tmpMinute = m;
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
      const str_date = this.date.setHours(+this.tmpHour, +this.tmpMinute);
      this.model.value = dateFormat(new Date(str_date), this.model.format);
      this.form.controls[this.model.name].setValue(this.model.value); // 表单赋值
    }
  }
}

