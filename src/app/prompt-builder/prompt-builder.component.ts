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


  protected subject = "of a yellow lemon tree";
  protected artist = "art by RossDraws";
  protected typeOfPicture = "A polaroid picture";
  protected style = "4k UHD";
  protected name = "";
  protected prompt = "";
  private promptOld = "";


  protected useTemplate = true;
  protected editedOutput = false;

  protected useArtist = true;
  protected useStyle = true;
  protected usePicture = true;

  private parts: number[] = [0, 0, 0, 0];
  private partOrder = [this.typeOfPicture, this.subject, this.style, this.artist];


  private fontSize: string;
  private fontFamily: string;


  @ViewChild('prompt_out') inputField: ElementRef;
  @ViewChild('marker_picture') pictureMarker: ElementRef;
  @ViewChild('marker_subject') subjectMarker: ElementRef;
  @ViewChild('marker_style') styleMarker: ElementRef;
  @ViewChild('marker_artist') artistMarker: ElementRef;



  ngOnInit(): void {
    this.updatePrompt();
  }




  // TODO put everything that has to do with a part in a class.











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

  protected onStyleChange () {
    this.useStyle = true;
    this.updatePrompt();
    this.markerUpdate();
  }

  protected onArtistChange () {
    this.useArtist = true;
    this.updatePrompt();
    this.markerUpdate();
  }

  protected onSubjectChange () {
    this.updatePrompt();
    this.markerUpdate();
  }

  protected onPictureChange () {
    this.usePicture = true;
    this.updatePrompt();
    this.markerUpdate();
  }

  protected updatedCompletePrompt () {
    this.resolveDiffOfParts();

    this.updatePrompt();
    this.markerUpdate();
  }

  private resolveDiffOfParts () {
    const startDiff = this.getStartDiff(this.prompt, this.promptOld);
    const endDiff = this.getEndDiff(this.prompt, this.promptOld);

    const startDiffPart = this.partAtIndex(startDiff - 1);
    const endDiffPart = this.partAtIndex(this.promptOld.length - endDiff );

    console.log(`Start: ${startDiffPart}, End: ${endDiffPart}`);

    // Only one part changed
    if (endDiffPart - startDiffPart === 0) {
      this.updatePromptPart(startDiffPart);
      return;
    }

    // Multiple parts changed, put the parts together
    // -- Subject was changed
    if (startDiffPart <= 1 && 1 <= endDiffPart) {
      this.subject = this.removeUnchangedParts(startDiffPart, endDiffPart);
      this.deactivateUnusedParts(startDiffPart, endDiffPart);
    }
    // -- Style and artist was changed
    else {
      this.style = this.removeUnchangedParts(startDiffPart, endDiffPart);
      this.deactivateUnusedParts(endDiffPart, endDiffPart);
    }
  }

  private removeUnchangedParts (startPartChanged: number, endPartChanged: number) {
    let newPrompt = this.prompt;
    for (let i = 0; i < this.parts.length; i++) {
      if (i < startPartChanged || i > endPartChanged) {
        newPrompt = newPrompt.replace(this.partOrder[i], '');
      }
    }

    // remove trailing ',' and ' '.
     return newPrompt.replace(/^[,\s]+|[,\s]+$/g, "");
  }

  private deactivateUnusedParts (startPartChanged: number, endPartChanged: number) {
    for (let i = 0; i < this.parts.length; i++) {
      if (startPartChanged <= i && i <= endPartChanged) {
        this.deactivateParts(i);
      }
    }
  }

  private deactivateParts (part: number) {
    if (part === 0) {
      this.typeOfPicture = "";
      this.usePicture = false;
    } else if (part === 2) {
      this.style = "";
      this.useStyle = false;
    } else if (part === 3) {
      this.artist = "";
      this.useArtist = false;
    }
  }


  private partAtIndex (index: number): number {
    if (this.subject.length === 0) {
      return 1;
    }

    for (let i = 0; i < this.partOrder.length - 1; i++) {
      if (index < this.parts[i + 1]) {
        return i;
      }
    }

    return this.partOrder.length - 1;
  }


  private updatePromptPart (part: number) {
    const parts = [this.typeOfPicture, this.subject, this.style, this.artist];

    let prompt = this.prompt;
    for (let i = 0; i < parts.length; i++) {
      if (i != part) {
        prompt = prompt.replace(parts[i], '');
      }
    }

    prompt = prompt.replace(/^[,\s]+|[,\s]+$/g, "");

    if      (part === 0) { this.typeOfPicture = prompt; }
    else if (part === 1) { this.subject = prompt; }
    else if (part === 2) { this.style = prompt; }
    else if (part === 3) { this.artist = prompt; }
  }

  private getStartDiff (str1: string, str2: string): number {
    if (this.prompt === this.promptOld) {
      return -1; // if the strings are identical, return null
    }

    // get the length of the shorter string
    const length = Math.min(str1.length, str2.length);

    for (let i = 0; i < length; i++) {
      if (str1[i] !== str2[i]) {
        // found the first place where the strings differ
        return i;
      }
    }

    // strings differ only in their last characters
    return length;
  }


  private getEndDiff (str1: string, str2: string): number {
    const longString  = str1.length > str2.length ? str1 : str2;
    const shortString = str1.length > str2.length ? str2 : str1;

    for (let i = 0; i < shortString.length; i++) {
      if (longString[longString.length - i] !== shortString[shortString.length - i]) {
        // found the first place where the strings differ
        return i;
      }
    }

    // strings differ only in their first characters
    return shortString.length;
  }


  protected updatePrompt () {
    this.prompt = "";

    this.parts[0] = 0;
    if (this.usePicture) {
      this.prompt += this.typeOfPicture + " ";
    }

    this.parts[1] = this.prompt.length;
    this.prompt += this.subject;

    this.parts[2] = this.prompt.length;
    if (this.useStyle) {
      this.prompt += ", " + this.style;
    }

    this.parts[3] = this.prompt.length;
    if (this.useArtist) {
      this.prompt += ", " + this.artist;
    }

    this.promptOld = this.prompt;
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




  // Marker --- Marker --- Marker --- Marker --- Marker --- Marker --- Marker
  private markerUpdate () {
    if (this.usePicture) {
      this.setTextBackground(this.typeOfPicture + '\u00A0', this.pictureMarker);
      this.showMarker(this.pictureMarker);
    } else {
      this.setTextBackground(this.subject, this.subjectMarker);
      this.hideMarker(this.pictureMarker);
    }

    this.setTextBackground(this.subject, this.subjectMarker);

    if (this.useStyle) {
      this.setTextBackground(", " + this.style, this.styleMarker);
      this.showMarker(this.styleMarker);
    } else {
      this.hideMarker(this.styleMarker);
    }

    if (this.useArtist) {
      this.setTextBackground(", " + this.artist, this.artistMarker);
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

  private setTextBackground (text: string, marker: ElementRef) {
    marker.nativeElement.textContent = text.replaceAll(" ", '\xa0');
  }



}
