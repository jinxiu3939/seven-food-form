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
import { DateConfigComponent } from './pages/date-config.component';
import { MapConfigComponent } from './pages/map.component';

const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    DateConfigComponent,
    MapConfigComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, { useHash: true }),
    NbThemeModule.forRoot({name: 'default'}),
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
  bootstrap: [AppComponent],
  entryComponents: [
    DateConfigComponent,
    MapConfigComponent,
  ]
})
export class AppModule { }
