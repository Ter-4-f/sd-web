import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { ImageConfig } from '../model/ImageConfig';
import { Job } from '../model/Job';
import { BackendService } from '../services/backend.service';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { switchMap, map, tap, takeWhile } from 'rxjs/operators';
import {ChangeDetectorRef} from '@angular/core'
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-image-maker',
  templateUrl: './image-maker.component.html',
  styleUrls: ['./image-maker.component.css']
})
export class ImageMakerComponent{  

  @Input() set config(value: ImageConfig) {
    if (this.initialized) {
      this.makeImage(value);
    } else {
      // is called on load
      this.initialized = true;
    }
  }

  protected progress = 0;
  protected error = "";
  protected image: SafeUrl;

  protected displayProgress = false;
  protected displayError = false;
  protected displayImage = false;

  private initialized = false;

  
  constructor(private backendService: BackendService) { }
  
  public makeImage (config: ImageConfig) {
    this.progress = 0;
    this.displayProgress = true;
    this.displayError = false;
    this.displayImage = false;
    
    this.backendService.createImage(config)
      .subscribe({
        next: (data) => this.updateProgress(data),
        error: (e) => this.handleError(e),
      })
  }

  private loadImage (name: string) {    
    this.backendService.getImage(name)
      .then(image => {
        this.image = image;
        this.displayProgress = false;
        this.displayError = false;
        this.displayImage = true;
      });
  }


  private updateProgress (job: Job) {
    interval(5000).pipe(
      switchMap(() => this.backendService.getProgress(job.id)),
      tap(jobStatus => this.progress = jobStatus.progress)
    ).subscribe({
      error: (e) => this.progressError(e, job) }
    );
  }

  private handleError (error: any) {
    console.warn(error)
    this.error = error.error;
    this.displayError = true;
    this.displayProgress = false;
  }

  private progressError (error: any, job: Job) {
    if (error.error.status === 404) {
      this.loadImage(job.name);
    } else {
      this.handleError(error);
    }
  }
}
