import { Component, OnInit, AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
import { ImageConfig } from '../model/ImageConfig';
import { VImage } from '../model/VImage';
import { BackendService } from '../services/backend.service';
import { of, zip } from 'rxjs';
import { switchMap, map, tap, takeWhile, mergeMap } from 'rxjs/operators';
import { createInjectableType } from '@angular/compiler';

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

  private childWidth = 0;
  private gridCount = 0;
  private gridSize = 0;
  private gridGap = 0;
  private padding = 0;


  constructor (private backendService: BackendService) {}


  ngOnInit(): void {
    this.updateList();

    const parent = document.querySelector('.list-align');
    const child = document.querySelector('.list-cotainer');

    if (parent != null && child != null) {
      this.gridSize = parseInt(window.getComputedStyle(parent).getPropertyValue("--img-size"));
      this.gridGap = parseInt(window.getComputedStyle(child).getPropertyValue("grid-gap"));
      this.padding = parseInt(window.getComputedStyle(child).getPropertyValue("padding")) + parseInt(window.getComputedStyle(child).getPropertyValue("border-width"));
      this.gridCount = this.columnsForWidth(parent.clientWidth);
      child.setAttribute("style", "--grid-columns: " + this.gridCount);
      this.childWidth = child.getBoundingClientRect().width;
      new ResizeObserver(() => { this.onSizeChange(parent, child); }).observe(parent);
    }
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


  private columnsForWidth (maxWidth: number): number {
    const availableWidth = maxWidth - (2 * this.padding);
    const sizeColumn = this.gridSize + this.gridGap;
    return Math.max(1, Math.floor(availableWidth / sizeColumn));
  }

  private widthOfGrid (): number {
    return (this.padding * 2) + (this.gridCount * (this.gridSize + this.gridGap)) - this.gridGap;
  }


  private onSizeChange (parent: Element, child: Element) {
    const parentWidth = parent.clientWidth;
    const possibleColumns = this.columnsForWidth(parentWidth);
    let updated = false;

    if (this.gridCount > possibleColumns) {
      this.gridCount--;
      updated = true;
    } else if (this.gridCount < possibleColumns) {
      this.gridCount++;
      updated = true;
    }

    if (updated) {
      const nowWidth = this.childWidth;
      this.childWidth = this.widthOfGrid();

      this.changeWidth(nowWidth, this.childWidth - (2 * this.padding), this.gridCount, child);
    }
  }

  private changeWidth (from: number, to: number, columns: number, element: Element) {
    let actualColumnSize = columns;
    if (to > from) { // Grow
      actualColumnSize = columns -1;
    }

    element.setAttribute("style", `--from-width: ${from}px; --to-width: ${to}px; --grid-columns: ${actualColumnSize}`);

    element.addEventListener('animationend', function handler () {
      if (to > from) { // Grow
        element.setAttribute("style", `--grid-columns: ${columns}`);
      }

      element.classList.remove("size-animation");
      element.removeEventListener("animationend", handler);
    });


    element.classList.remove("size-animation");
    setTimeout(() => {
      element.classList.add("size-animation");
    })
  }
}
