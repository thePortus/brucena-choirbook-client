import { Directive, Input, ElementRef, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appImageViewer]'
})
export class ImageViewerDirective {
  @Input() xPan: number = 0;
  @Input() yPan: number = 0;
  @Input() zoomLevel: number = 1;

  // tracks if touch gesture is currently pressed down
  touchDown = false;
  touchX = 0;
  touchY = 0;

  constructor(private el: ElementRef) {
    this.applyInputs();
  }

  /**
   * On component changes, reapply input fields
   * 
   * @param changes - Data on nature of component changes (unnecessary)
   */
  ngOnChanges(changes: SimpleChanges) {
    this.applyInputs();
  }

  /**
   * Applies the data from input fields to directive's DOM CSS styles
   */
  applyInputs() {
    this.el.nativeElement.style.transform = 'scale(' + this.zoomLevel +  ') translate(' + this.xPan + 'px, ' + this.yPan + 'px)';
  }

}
