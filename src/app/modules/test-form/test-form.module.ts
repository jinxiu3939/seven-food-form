import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponentComponent } from './test-component/test-component.component';
import { ResourceProvider } from './test-form.provider';
import { DemoResourceProvider } from './providers/resource.provider';
@NgModule({
  declarations: [TestComponentComponent],
  imports: [
    CommonModule
  ],
  exports: [
    TestComponentComponent
  ],
  providers: [
    { provide: ResourceProvider, useClass: DemoResourceProvider },
  ],
})
export class TestFormModule { }
