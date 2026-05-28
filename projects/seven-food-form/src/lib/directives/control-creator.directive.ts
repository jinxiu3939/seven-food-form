import {
  Directive,
  ViewContainerRef,
  ComponentFactoryResolver,
  Input,
  OnInit,
  OnDestroy,
  ComponentRef,
  Injector,
  EventEmitter
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { SfControlModel } from '../models/controls/control.model';
import { SfTextBoxModel } from '../models/controls/text-box.model';
import { SfTextAreaModel } from '../models/controls/text-area.model';
import { SfTextBoxComponent } from '../components/controls/text-box/text-box.component';
import { SfTextAreaComponent } from '../components/controls/text-area/text-area.component';
import { SF_CONTROL_RESET } from '../tokens/control-reset.token';

@Directive({
  selector: '[sfControlCreator]',
  standalone: true
})
export class SfControlCreatorDirective implements OnInit, OnDestroy {
  @Input('sfControlCreator') control!: AbstractControl | null;
  @Input('sfControlModel') model!: SfControlModel;

  private componentRef: ComponentRef<any> | null = null;
  private resetEvent = new EventEmitter<void>();

  constructor(
    private viewContainerRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.createControl();
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
    this.resetEvent.complete();
  }

  private createControl(): void {
    if (!this.control) return;

    const component = this.getComponentForModel(this.model);
    if (!component) return;

    this.viewContainerRef.clear();

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: SF_CONTROL_RESET, useValue: this.resetEvent }
      ]
    });

    const factory = this.resolver.resolveComponentFactory(component);
    this.componentRef = this.viewContainerRef.createComponent(factory, 0, injector);

    this.componentRef.instance.control = this.control;
    this.componentRef.instance.model = this.model;

    if (this.componentRef.instance && typeof this.componentRef.instance.reset === 'function') {
      (this.control as any).resetControl = () => {
        this.componentRef?.instance.reset();
      };
      (this.control as any).resetEvent = this.resetEvent;
    }
  }

  private getComponentForModel(model: SfControlModel): any {
    if (model instanceof SfTextBoxModel) {
      return SfTextBoxComponent;
    }
    if (model instanceof SfTextAreaModel) {
      return SfTextAreaComponent;
    }
    return null;
  }
}
