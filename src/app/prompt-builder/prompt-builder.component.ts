import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-prompt-builder',
  templateUrl: './prompt-builder.component.html',
  styleUrls: ['./prompt-builder.component.css']
})
export class PromptBuilderComponent implements OnInit {
  
  private pictureText = "[type of picture]";
  private subjectText = "[main subject]";
  private artistText = "[style cues]*";

  @Output() promptReadyEvent = new EventEmitter<boolean>();
  @Output() promptEvent = new EventEmitter<string>();


  subject = "";
  artist = "";
  typeOfPicture = "";
  style = "";
  prompt = "";
  name = "";

  useTemplate = true;

  
  ngOnInit(): void {
    this.updatePrompt();
  }



  updatePrompt () {
    let subText = this.subjectText;
    let artText = this.artistText;

    if (this.subject !== "") {
      subText = this.subject;
    } 
    if (this.hasStyleOrArtist()) {
      artText = (this.style + " " + this.artist).trim();
    }


    if (this.useTemplate) {
      let picText = this.pictureText;      
      if (this.typeOfPicture !== "") {
        picText = this.typeOfPicture;
      }
      
      this.prompt = `A ${picText} of a ${subText}, ${artText}`;
    } else {
      if (this.hasStyleOrArtist()) {
        artText = (this.style + " " + this.artist).trim();
        this.prompt = `${subText}, ${artText}`;
      } else {
        this.prompt = subText;
      }
    }

    this.isPromptReady();
  }


  private hasStyleOrArtist () {
    return this.style !== "" || this.artist !== ""
  }


  isPromptReady () {
    let promptReady = false;
    if (this.useTemplate) {
      promptReady = this.subject !== "" && this.typeOfPicture !== "" &&  (this.style !== "" || this.artist !== "");
    } else {
      promptReady = this.subject !== "";
    }

    if (promptReady) {
      this.promptEvent.emit(this.prompt);
    }

    this.promptReadyEvent.emit(promptReady);
  }

}
