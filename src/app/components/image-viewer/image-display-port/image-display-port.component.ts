import { Component, Input, SimpleChanges } from '@angular/core';

import { imageDatum } from 'app/interfaces/image-datum';

@Component({
  selector: 'app-image-display-port',
  templateUrl: './image-display-port.component.html',
  styleUrls: ['./image-display-port.component.scss']
})
export class ImageDisplayPortComponent {
  @Input() imageDatum: imageDatum = {
    path: '',
    versoDisplay: '',
    rectoDisplay: ''
  };

  hasLoaded: boolean = false;
  /**
   * On component changes, re-build empty fields for input.
   * 
   * @param changes - Data on nature of component changes (unnecessary)
   */
  ngOnChanges(changes: SimpleChanges) {
    this.hasLoaded = false;
  }

  /**
   * Gets image datum and parses out the path
   * 
   * @param imageDatum - object with filename, recto, and verso page information
   */
  getPath(imageDatum: any) {
    return 'assets/images/choirbook/' + imageDatum.path;
  }

  /**
   * Gets image datum and parses out the alt text
   * 
   * @param imageDatum - object with filename, recto, and verso page information
   */
  getAltText(imageDatum: any) {
    return 'Manuscript opening of ' + imageDatum.versoDisplay + ' + ' + imageDatum.rectoDisplay;
  }

  /**
   * Sets display flag when image has loaded
   */
  imageLoaded() {
    this.hasLoaded = true;
  }

  /**
   * Zooms the main image
   */
  zoomImage() {

  }

}
