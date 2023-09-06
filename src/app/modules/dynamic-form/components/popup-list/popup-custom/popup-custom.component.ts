import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';

import { PopupCustomModel } from '../../../dynamic-form.options';
import { LangProvider } from '../../../providers/data/lang.provider';
import { ComponentReset } from '../../../providers/interface/component-reset';

@Component({
  selector: 'sff-popup-custom',
  templateUrl: './popup-custom.component.html',
  styleUrls: [
    '../../../dynamic-form.component.scss',
    './popup-custom.component.scss',
  ],
})
export class PopupCustomComponent implements OnInit, ComponentReset {

  customComponent: any;
  lang: any;
  text: string; // 显示内容
  @Input() model: PopupCustomModel;
  @Input() form: FormGroup;

  constructor(private dialogService: NbDialogService,
              private langProvider: LangProvider) {
    this.lang = langProvider.lang;
  }

  ngOnInit() {
    this.text = this.model?.text || '';
    if (this.model && !this.customComponent) {
      
    }
  }

  resetModel() {
  }

  /**
   * 选择
   */
  choose() {
    if (this.model.renderComponent) {
      this.dialogService
      .open(this.model.renderComponent, {context: this.model})
      .onClose.subscribe(event => {
        if (event) {
          if (event?.text) {
            this.text = event.text;
          }
          if (event?.value) {
            this.model.value = event.value;
            this.form.controls[this.model.name].setValue(this.model.value);
          }
        }
      });
    }
  }

  /**
   * 清空
   */
  destroy() {
    this.text = '';
    this.model.value = null;
    this.form.controls[this.model.name].setValue(null); // 清空表单值
  }
}
