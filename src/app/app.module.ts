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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GeneratorComponent } from './generator/generator.component';
import { PromptBuilderComponent } from './prompt-builder/prompt-builder.component';
import { ImageMakerComponent } from './image-maker/image-maker.component';
import { RecentFileListComponent } from './recent-file-list/recent-file-list.component';
import { ConfigDialogComponent } from './config-dialog/config-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneratorComponent,
    PromptBuilderComponent,
    ImageMakerComponent,
    RecentFileListComponent,
    ConfigDialogComponent
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
    MatTooltipModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
