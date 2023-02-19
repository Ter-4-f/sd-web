import { Component, Output, OnInit, EventEmitter, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-prompt-builder',
  templateUrl: './prompt-builder.component.html',
  styleUrls: ['./prompt-builder.component.css']
})
export class PromptBuilderComponent implements OnInit, AfterViewInit {

  @Output() promptReadyEvent = new EventEmitter<boolean>();
  @Output() promptEvent = new EventEmitter<string>();
  @Output() nameEvent = new EventEmitter<string>();


  protected subject = "of a [yellow lemon tree]";
  protected artist = "art by Bob Ross RossDraws";
  protected typeOfPicture = "A [polaroid picture]";
  protected style = "4k UHD";
  protected name = "";
  protected prompt = "";


  protected usedArtist = this.artist;
  protected usedTypeOfPicture = this.typeOfPicture;
  protected usedStyle = this.style;


  protected useTemplate = true;
  protected editedOutput = false;

  protected useArtist = true;
  protected useStyle = true;
  protected usePicture = true;

  protected parts: number[] = [0, 0, 0, 0];


  private fontSize: string;
  private fontFamily: string;



  @ViewChild('prompt_out') inputField: ElementRef;
  @ViewChild('marker_picture') pictureMarker: ElementRef;
  @ViewChild('marker_subject') subjectMarker: ElementRef;
  @ViewChild('marker_style') styleMarker: ElementRef;
  @ViewChild('marker_artist') artistMarker: ElementRef;


  constructor(private renderer: Renderer2) {}


  ngOnInit(): void {
    this.updatePrompt();
  }

  ngAfterViewInit (): void {
    this.fontSize = window.getComputedStyle(this.inputField.nativeElement).fontSize;
    this.fontFamily = window.getComputedStyle(this.inputField.nativeElement).fontFamily;

    const allMarkers: ElementRef[] = [
      this.pictureMarker, this.subjectMarker, this.styleMarker, this.artistMarker
    ];
    allMarkers.forEach(element => {
      element.nativeElement.style.fontSize = this.fontSize;
      element.nativeElement.style.fontFamily = this.fontFamily;
    })

    this.markerUpdate();
  }

  protected onNameChange () {
    this.nameEvent.emit(this.name);
  }

  protected markerUpdate () {
    if (this.usePicture) {
      this.setTextBackground(this.typeOfPicture, this.pictureMarker);
      this.setTextBackground(this.subject  + ", ", this.subjectMarker);
      this.showMarker(this.pictureMarker);
    } else {
      this.setTextBackground(this.subject, this.subjectMarker);
      this.hideMarker(this.pictureMarker);
    }

    if (this.useStyle) {
      this.setTextBackground(", " + this.style, this.styleMarker);
      this.showMarker(this.styleMarker);
    } else {
      this.hideMarker(this.styleMarker);
    }

    if (this.useArtist) {
      this.setTextBackground(", art by " + this.artist, this.artistMarker);
      this.showMarker(this.artistMarker);
    } else {
      this.hideMarker(this.artistMarker);
    }
  }


  private showMarker (marker: ElementRef) {
    marker.nativeElement.style.display='unset';
  }

  private hideMarker (marker: ElementRef) {
    marker.nativeElement.style.display='none';
  }


  protected updatePrompt () {
    this.prompt = "";

    if (this.usePicture) {
      this.prompt += this.typeOfPicture + " ";
      this.parts[0] = this.typeOfPicture.length;
    }

    this.prompt += this.subject;
    this.parts[1] = this.subject.length;

    if (this.useStyle) {
      this.prompt += ", " + this.style;
      this.parts[2] = this.style.length;
    }

    if (this.useArtist) {
      this.prompt += ", art by " + this.artist;
      this.parts[3] = this.artist.length;
    }

    this.checkPromptReady();
  }

  private checkPromptReady (): void {
    if (this.prompt.indexOf("[") > -1 || this.prompt.indexOf("]") > -1) {
      return;
    }

    if (this.subject.length === 0) {
      return;
    }

    this.promptReadyEvent.emit(true);
  }





  private setTextBackground (text: string, marker: ElementRef) {
    const element = marker.nativeElement;
    element.textContent = text;

    element.style.fontSize = this.fontSize;
    element.style.fontFamily = this.fontFamily;

    // document.body.appendChild(element);
    const wordWidth = element.offsetWidth;
    // document.body.removeChild(element);

    console.log("Width", wordWidth);
  }
}
