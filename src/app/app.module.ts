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
import { ApiService } from './services/api.service';
import { AppComponent } from './app.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NbThemeModule.forRoot({name: 'cosmic'}),
    NbCardModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbButtonModule,
    SfDynamicFormModule.forRoot(),
    TestFormModule,
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
