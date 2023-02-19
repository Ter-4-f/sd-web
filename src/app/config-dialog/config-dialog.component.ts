import { Component, Inject,OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { COPY_CONFIG, ImageConfig } from '../model/ImageConfig';

@Component({
  selector: 'app-config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.css']
})
export class ConfigDialogComponent implements OnInit {

  protected config: ImageConfig;

  constructor(
    public dialogRef: MatDialogRef<ConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) protected data: ImageConfig
  ) {
    this.config = COPY_CONFIG(data);
  }


  ngOnInit(): void {
    document.getElementById(this.dialogRef.id)?.classList.add("config-dialog");
  }



  protected intOnly (event: any): void {
    const newValue = parseInt(event.target.value) || null;
    event.target.value = newValue;
  }

  protected floatOnly (event: any): void {
    let value: string = event.target.value;
    const points = (value.match(new RegExp("\\.", "g")) || []).length;

    if (points !== 1 || value.slice(-1) !== ".") {
      if (value.slice(-1) !== "0") {
        const newValue = parseFloat(value) || null;
        event.target.value = newValue;
      }
    }
  }

}
