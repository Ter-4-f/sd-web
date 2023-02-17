import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Sanitizer } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, lastValueFrom, EMPTY, mergeMap, map, groupBy, of } from 'rxjs';
import { ImageConfig } from '../model/ImageConfig';
import { Job } from '../model/Job';
import * as JSZip from 'jszip';

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
    return this.blobToUrl(blobFile);
  }




  loadRecentFileConfigs (count: number): Observable<ImageConfig[]> {
    return this.http.get<ImageConfig[]>(this.url + "/configs/latests/" + count);
  }

  /**
   * Loads multiple images from backend, next is called multiple times.
   */
  loadImages (ids: string[]): Observable<BackendImage> {
    if (ids.length === 0) {
      return EMPTY;
    }

    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');


    return of(ids).pipe(
      mergeMap(ids => ids),
      mergeMap(async id => {
        const image = await this.getImage(id)
        return {id: id, url: image};
      })
    )

    // return this.http.get<BackendImage[]>(this.url + "/images?ids=" + ids.toString());
  }



  private getBlobFromBackend (id: string): Observable<Blob> {
    return this.http.get<Blob>(this.url + '/images/' + id, {
      responseType: 'Blob' as 'json'
    });
  }

  private blobToUrl (blobFile: Blob) {
    const url = URL.createObjectURL(blobFile);
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


}

export interface BackendImage {
  id: string;
  url: SafeUrl;
}
