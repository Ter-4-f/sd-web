import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatTooltipModule} from '@angular/material/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneratorComponent } from './generator/generator.component';
import { PromptBuilderComponent } from './prompt-builder/prompt-builder.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    PromptBuilderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSlideToggleModule,
    ClipboardModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
