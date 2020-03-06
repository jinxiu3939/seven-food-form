import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  NbThemeModule,
  NbCardModule,
  NbSidebarModule,
  NbLayoutModule,
  NbButtonModule,
} from '@nebular/theme';

import { SfDynamicFormModule } from './modules/dynamic-form/dynamic-form.module';
import { TestFormModule } from './modules/test-form/test-form.module';

import { AppComponent } from './app.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NbThemeModule.forRoot(),
    NbCardModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    SfDynamicFormModule.forRoot(),
    TestFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
