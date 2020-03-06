import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InComponentComponent } from '../in-component/in-component.component';

@Directive({
  selector: '[ngxTestField]',
})
export class TestFieldDirective implements OnInit {
  @Input() model: any; // 表单项
  @Input() form: FormGroup; // 表单

  component: any;

  constructor(private resolver: ComponentFactoryResolver,
              private container: ViewContainerRef) {
  }

  ngOnInit() {
    const component = InComponentComponent;
    if (component) {
      const factory = this.resolver.resolveComponentFactory<any>(component);
      this.component = this.container.createComponent(factory); // 创建组件
      this.component.instance.model = this.model;
      this.component.instance.form = this.form;
    }
  }
}
