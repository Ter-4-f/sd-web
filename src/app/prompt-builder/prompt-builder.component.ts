import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-prompt-builder',
  templateUrl: './prompt-builder.component.html',
  styleUrls: ['./prompt-builder.component.css']
})
export class PromptBuilderComponent implements OnInit {
  
  private pictureText = "[type of picture]";
  private subjectText = "[main subject]";
  private artistText = "[style cues]*";


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
        this.prompt = this.subjectText;
      }
    }
  }


  private hasStyleOrArtist () {
    return this.style !== "" || this.artist !== ""
  }

}
