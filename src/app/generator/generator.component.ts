import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfigDialogComponent } from '../config-dialog/config-dialog.component';
import { ImageMakerComponent } from '../image-maker/image-maker.component';
import { COPY_CONFIG, ImageConfig } from '../model/ImageConfig';
import { LocalImageConfigService } from '../services/local-image-config.service';

@Component({
  providers: [ImageMakerComponent],
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit  {

  protected generationConfig: ImageConfig;
  protected canGenerate = false;
  protected updateList = false;

  private config: ImageConfig;
  private generateImage = false;


  constructor (private localConfig: LocalImageConfigService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.config = this.localConfig.loadConfig();
  }


  public updatePromtStatus (value: boolean) {
    this.canGenerate = value;
  }

  public updatePromt (value: string) {
    this.config.prompt = value;
  }

  public updateName (value: string) {
    if (value && value !== "") {
      this.config.name = value;
    }
  }


  public onGenerate() {
    this.updateList = false;
    setTimeout(() => { this.updateList = true; });

    this.generationConfig = COPY_CONFIG(this.config)
  }

  protected showAdvancedOptions () {
    const dialogRef = this.dialog.open(ConfigDialogComponent, {
      data: this.config,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined) {
        this.config = result;
      }
    });
    // open dialog with the options
    // load options from local storage
  }
}
