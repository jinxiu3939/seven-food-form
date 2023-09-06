/**
 * 时钟选择框
 */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ComponentReset } from '../../providers/interface/component-reset';
import { LangProvider } from '../../providers/data/lang.provider';
import { AllHours, AllMinutes } from './time.const';
import { ClockModel } from '../../dynamic-form.options';

@Component({
  selector: 'sff-clock',
  styles: [
    ``,
  ],
  template: `
  <div [formGroup]="form">
    <nb-select [placeholder]="lang.hour" [disabled]="model.readonly" [(selected)]="hour" (selectedChange)="selectTime()">
      <nb-option *ngFor="let h of hours" [value]="h">{{ h }}</nb-option>
    </nb-select>
    <nb-select [placeholder]="lang.minute" [disabled]="model.readonly" [(selected)]="minute" (selectedChange)="selectTime()">
      <nb-option *ngFor="let m of minutes" [value]="m">{{ m }}</nb-option>
    </nb-select>
    <nb-select *ngIf="isTwelve" [disabled]="model.readonly" [(selected)]="twelve" (selectedChange)="selectTime()">
      <nb-option value="am">am</nb-option>
      <nb-option value="pm">pm</nb-option>
    </nb-select>
  </div>
  `,
})
export class ClockComponent implements OnInit, ComponentReset {
  @Input() model: ClockModel;
  @Input() form: FormGroup;

  hours = [];
  minutes = AllMinutes;
  hour = '00';
  minute = '00';
  twelve = '';
  lang: any;
  isTwelve = false; // 是否为12小时制

  constructor(private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    if (this.model.kind === '12') {
      this.isTwelve = true;
      this.twelve = 'am';
    }
    this.hours = AllHours.slice(0, +this.model.kind);
    this.loadDate();
  }

  resetModel() {
    this.loadDate();
  }

  loadDate() {
    if (this.model && this.model.value) {
      /* 小时格式化 */
      const hour = parseInt(this.model.value.h);
      if (hour > 0 && hour < 10) {
        this.hour = '0' + hour;
      } else if (hour > 9 && hour < +this.model.kind) {
        this.hour = hour + '';
      }

      /* 分钟格式化 */
      const minute = parseInt(this.model.value.i);
      if (minute > 0 && minute < 10) {
        this.minute = '0' + minute;
      } else if (minute > 9 && minute < 60) {
        this.minute = minute + '';
      }

      if (this.model.value.a) {
        this.twelve = this.model.value.a.toLowerCase();
      }
    }
  }

  selectTime() {
    this.model.value = {h: this.hour, i: this.minute, a: this.twelve};
    this.form.controls[this.model.name].setValue(this.model.value); // 表单赋值
  }
}

