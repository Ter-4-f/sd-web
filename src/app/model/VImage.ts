import { SafeUrl } from "@angular/platform-browser";
import { ImageConfig } from "./ImageConfig";

export interface VImage {
    config: ImageConfig;
    image: SafeUrl | undefined;
}
