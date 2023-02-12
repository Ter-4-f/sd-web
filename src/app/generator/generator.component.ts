import { Component, OnInit } from '@angular/core';
import { ImageMakerComponent } from '../image-maker/image-maker.component';
import { ImageConfig } from '../model/ImageConfig';

@Component({
  providers: [ImageMakerComponent],
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.css']
})
export class GeneratorComponent implements OnInit  {
  
  private generateButton: HTMLElement | null = null;

  protected config: ImageConfig;

  canGenerate = false;
  prompt = "";


  constructor () {}
  
  ngOnInit(): void {
    this.generateButton = document.getElementById("generate_button");
  }


  public updatePromtStatus (value: boolean) {
    this.canGenerate = value;
  }

  public updatePromt (value: string) {
    this.prompt = value;
  }


  public onGenerate() {
    this.config = {
      prompt: this.prompt,
      // name: string,
      // seed: number,
      inferenceSteps: 5,
      // size: number,
      // guidanceScale: number,
      // version: number,
      // createdAt: string,
      // generationTimeSeconds: number
    };
  }
}
