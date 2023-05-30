import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonComponentComponent } from './json-component/json-component.component';

import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MessageModule} from 'primeng/message';
import { MessagesModule} from 'primeng/messages';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    JsonComponentComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    CheckboxModule,
    RadioButtonModule,
    CardModule,
    ButtonModule,
    CalendarModule,
    KeyFilterModule,
    MessageModule,
    MessagesModule,
    InputTextareaModule,
    DropdownModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
