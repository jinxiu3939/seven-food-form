/**
 * 日期选择框
 */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { dateFormat } from '../../helps';
import { ComponentReset } from '../../providers/interface/component-reset';
import { LangProvider } from '../../providers/data/lang.provider';
import { DateRangePickerModel } from '../../dynamic-form.options';

@Component({
  selector: 'sff-date-range-picker',
  styleUrls: [
    './date-range-picker.component.scss',
  ],
  templateUrl: './date-range-picker.component.html',
})
export class DateRangePickerComponent implements OnInit, ComponentReset {
  @Input() model: DateRangePickerModel;
  @Input() form: FormGroup;

  date; // 日期范围默认值
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
    if (this.model) {
      if (!this.model.value) {
        this.model.value = {start: '', end: ''};
      } else if (!this.model.value?.start && !this.model.value?.end) {
        this.model.value = {start: '', end: ''};
      } else if (this.model.value?.start === undefined) {
        this.model.value.start = '';
      } else if (this.model.value?.end === undefined) {
        this.model.value.end = '';
      }
    }
  }

  get value() {
    let v = '';
    const control = this.form.controls[this.model.name];
    if (control.value) {
      if (control.value?.start) {
        v += dateFormat(new Date(control.value.start), this.model.format);
      }
      if (control.value?.end) {
        v += ' ~ ';
        v += dateFormat(new Date(control.value.end), this.model.format);
      }
    }
    return v;
  }

  handleDateChange(date) {
    this.date = date;
    console.log(date);
    this.setFormValue();
  }

  setFormValue() {
    if (this.date) {
      if (this.date?.start) {
        this.model.value.start = dateFormat(new Date(this.date?.start), this.model.format);
      }
      if (this.date?.end) {
        this.model.value.end = dateFormat(new Date(this.date?.end), this.model.format);
      }
      this.form.controls[this.model.name].setValue(this.model.value); // 表单赋值
    }
  }
}

