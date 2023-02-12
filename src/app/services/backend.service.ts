import { HttpClient } from '@angular/common/http';
import { Injectable, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, lastValueFrom, firstValueFrom } from 'rxjs';
import { ImageConfig } from '../model/ImageConfig';
import { Job } from '../model/Job';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  url = "http://localhost:8000"

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) { }

  createImage (config: ImageConfig): Observable<Job> {
    return this.http.post<Job>(this.url + "/generate", config);
  }


  getProgress (jobId: string): Observable<Job> {
    console.log('Get PRogress'); 
    return this.http.get<Job>(this.url + "/jobs/" + jobId);
  }

  async getImage (name: string): Promise<SafeUrl> {
    const blobFile = await lastValueFrom(this.getBlobFromBackend(name));
    const url =  URL.createObjectURL(blobFile);       
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


  
  private getBlobFromBackend (name: string): Observable<Blob> {
    return this.http.get<Blob>(this.url + '/images/' + name, {
      responseType: 'Blob' as 'json'
    });
  }

  private blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;

    b.lastModifiedDate = new Date();
    b.name = fileName;

    return <File> theBlob;
  }
}
