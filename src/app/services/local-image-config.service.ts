import { Injectable } from '@angular/core';
import { EMPTY_CONFIG, ImageConfig } from '../model/ImageConfig';

@Injectable({
  providedIn: 'root'
})
export class LocalImageConfigService {

  public DEFAULT = "default-image-config";

  constructor() { }


  public saveConfig(config: ImageConfig): void;
  public saveConfig(config: ImageConfig, key?: string): void {
    key = key ?? this.DEFAULT;
    localStorage.setItem(key, JSON.stringify(config));
  }


  public loadConfig(): ImageConfig;
  public loadConfig(key?: string): ImageConfig{
    key = key ?? this.DEFAULT;

    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value) as ImageConfig;
    } else {
      return EMPTY_CONFIG();
    }
  }
}
