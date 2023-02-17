import { Component, OnInit, Input } from '@angular/core';
import { ImageConfig } from '../model/ImageConfig';
import { VImage } from '../model/VImage';
import { BackendService } from '../services/backend.service';
import { of } from 'rxjs';
import { switchMap, map, tap, takeWhile, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-recent-file-list',
  templateUrl: './recent-file-list.component.html',
  styleUrls: ['./recent-file-list.component.css']
})
export class RecentFileListComponent implements OnInit {

  @Input() set updateEvent(value: boolean) {
    if (value) {
      this.updateList();
    }
  }

  protected showVersions = true;
  protected images: VImage[] = [];




  constructor (private backendService: BackendService) {}


  ngOnInit(): void {
    this.updateList();
  }


  protected async updateList () {
    this.images = [];

    this.backendService.loadRecentFileConfigs(20).subscribe(
      configs => {
        configs.forEach(config => {
          if (config.id != undefined) {
            const v = {config: config, image: undefined } as VImage;
            this.images.push(v);

            this.backendService.getImage(config.id).then(image => {
              v.image = image;
            })
          }
        })
      }
    );
  }

  protected showInfo(config: ImageConfig) {
    console.log(config);
  }

  private extracIds (configs: ImageConfig[]): string[] {
    let ids: string[] = [];

    console.log("Ids", configs);

    configs.forEach(config => {
      if (config.id != undefined) {
        ids.push(config.id);
      }
    });

    return ids;
  }

  private getConfigByName (configs: ImageConfig[], name: string): ImageConfig {
    return configs.find(config => config.name === name) || {prompt: "?Error?"};
  }
}
