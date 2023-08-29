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
  date: Date; // datepicker日期值
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

  /**
   * 日期显示值
   */
  get day() {
    const control = this.form.controls[this.model.name];
    return control.value ? dateFormat(this.date, this.model.format) : ''; // 显示值格式不变
  }

  /**
   * 小时显示值
   */
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

  /**
   * 分钟显示值
   */
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

  /**
   * 时间显示值
   */
  get time() {
    if (this.hour || this.minute) {
      return this.hour + ':' + this.minute;
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
      const str_date = this.date.setHours(+this.tmpHour, +this.tmpMinute); // 设置时间
      this.model.value = dateFormat(new Date(str_date), this.model.format); // 返回值根据参数format格式化
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

