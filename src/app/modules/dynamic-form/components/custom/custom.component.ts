import {
  Component,
  EventEmitter,
  Input,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { CustomModel } from '../../dynamic-form.options';
import { ComponentReset } from '../../providers/interface/component-reset';

@Component({
  selector: 'sff-custom',
  template: `
  <div [formGroup]="form">
    <ng-template #contentTemplate></ng-template>
    <input [formControlName]="model.name" type="hidden" [name]="model.name" [value]="model.value">
  </div>
  `,
})
export class CustomComponent implements OnInit, ComponentReset {

  @Input() model: CustomModel;
  @Input() form: FormGroup;

  @ViewChild('contentTemplate', { read: ViewContainerRef, static: true }) contentTemplate: ViewContainerRef;

  customComponent: any;
  componentSubjects: Subscription[] = [];

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    if (this.model && !this.customComponent && this.model.renderComponent) {
      this.createCustomComponent();
      this.callOnComponentInit();
      this.patchInstance();
      this.subscribeComponent();
    }
  }

  ngOnDestroy() {
    if (this.customComponent) {
      this.customComponent.destroy();
    }
    this.componentSubjects.forEach(s => {
      s.unsubscribe();
    });
  }

  resetModel() {
    if (this.customComponent?.instance) {
      this.patchInstance(); // 实例重置
    }
  }

  protected createCustomComponent() {
    const componentFactory = this.resolver.resolveComponentFactory(this.model.renderComponent);
    this.customComponent = this.contentTemplate.createComponent(componentFactory);
  }

  protected callOnComponentInit() {
    const onComponentInitFunction = this.model.onComponentInitFunction;
    onComponentInitFunction && onComponentInitFunction(this.customComponent.instance);
  }

  protected patchInstance() {
    Object.assign(this.customComponent.instance, this.model);
  }

  protected subscribeComponent() {
    if (this.customComponent?.instance) {
      /* 表单值改变事件 */
      if (this.customComponent.instance.hasOwnProperty('update')) {
        const subject = this.customComponent.instance['update'];
        if (subject instanceof EventEmitter) {
          this.componentSubjects.push(
            subject.subscribe(value => {
              // 不能过滤空值，否则无法清空
              this.model.value = value;
              this.form.controls[this.model.name].setValue(this.model.value);
            })
          );
        }
      }
    }
  }
}
