/**
 * 日期选择框
 */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { dateFormat } from '../../helps';
import { ComponentReset } from '../../providers/interface/component-reset';
import { LangProvider } from '../../providers/data/lang.provider';
import { AllHours, AllMinutes } from './time.const';
import { DatePickerModel } from '../../dynamic-form.options';

@Component({
  selector: 'sff-date-picker',
  styleUrls: [
    './date-picker.component.scss',
  ],
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent implements OnInit, ComponentReset {
  @Input() model: DatePickerModel;
  @Input() form: FormGroup;

  hours = AllHours;
  minutes = AllMinutes;
  date: Date; // 日期默认值
  isTime = false;
  tmpHour: string = '00';
  tmpMinute: string = '00';
  lang: any;

  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    this.loadDate();
  }

  resetModel() {
    this.loadDate();
  }

  loadDate() {
    if (this.model && this.model.value) {
      this.date = new Date(this.model.value); // 字符串转换成日期格式
    }
  }

  get day() {
    const control = this.form.controls[this.model.name];
    return control.value ? dateFormat(new Date(control.value), 'YYYY-MM-DD') : '';
  }

  get hour() {
    const control = this.form.controls[this.model.name];
    let hour: string = ''; // 小时
    if (control.value) {
      hour = dateFormat(new Date(control.value), 'HH');
    }
    return hour;
  }

  set hour(h) {
    this.tmpHour = h;
  }

  get minute() {
    const control = this.form.controls[this.model.name];
    let minute: string = ''; // 分钟
    if (control.value) {
      minute = dateFormat(new Date(control.value), 'mm');
    }
    return minute;
  }

  set minute(m) {
    this.tmpMinute = m;
  }

  get time() {
    this.hour;
    this.minute;
    
    if (+this.tmpHour || +this.tmpMinute) {
      return this.tmpHour + ':' + this.tmpMinute;
    } else {
      return this.lang.select_time;
    }
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

  hideTime() {
    this.isTime = false;
  }

  chooseTime() {
    this.isTime = true;
  }
}

