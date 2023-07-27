import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { imageDatum } from 'app/interfaces/image-datum';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnInit {
  @Input() imageData: imageDatum[] = [];
  currentImageIndex = 0;
  endImageIndex = 0;

  ngOnInit(): void {
    this.currentImageIndex = 0;
    this.endImageIndex = this.imageData.length;
  }

  /**
   * On component changes, re-build empty fields for input.
   * 
   * @param changes - Data on nature of component changes (unnecessary)
   */
  ngOnChanges(changes: SimpleChanges) {
    this.currentImageIndex = 0;
    this.endImageIndex = this.imageData.length;
  }

  /**
   * Executed upon event emission from child pagination widget.
   * 
   * @param newIndex - even containing new index
   */
  changePagination(newIndex: any) {
    this.currentImageIndex = newIndex - 1;
  }

}
