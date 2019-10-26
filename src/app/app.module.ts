import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
// pwa: enable app to ctrl network requests, cache those requests to improve performance, n provide offline access to cached content.

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { environment } from '../environments/environment';  // production
import { AppComponent } from './app.component';
import { ListComponent } from './components/list.component';
import { FormComponent } from './components/form.component';
import { ConfirmComponent } from './components/confirm.component';
import { EditComponent } from './components/edit.component';
import { BitcoinService } from './services/bitcoin.service';
import { TransactService } from './services/transact.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    ConfirmComponent,
    EditComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [BitcoinService, TransactService],
  bootstrap: [AppComponent]
})
export class AppModule { }