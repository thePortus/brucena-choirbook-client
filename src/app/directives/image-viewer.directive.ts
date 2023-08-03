import { Directive, Input, ElementRef, SimpleChanges, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appImageViewer]'
})
export class ImageViewerDirective {
  @Input() xPan: number = 0;
  @Input() yPan: number = 0;
  @Input() zoomLevel: number = 1;
  @Output() updatePan = new EventEmitter<any>;

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

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    let touch = event.touches[0];
    // stores location of mouse upon touch, to later calculate translation
    this.touchX = touch.pageX;
    this.touchY = touch.pageY;
    this.touchDown = true;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    let touch = event.touches[0];
    // calculates how much the mouse has moved since touch and then translates to pan
    if (this.touchDown) {
      const translateX = (touch.pageX - this.touchX);
      const translateY = (touch.pageY - this.touchY);
      // store new mouse location
      this.touchX = touch.pageX;
      this.touchY = touch.pageY;
      // emit changes to parent
      this.updatePan.emit({
        x: this.xPan += translateX,
        y: this.yPan += translateY
      });
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    let touch = event.touches[0];
    // calculates how much the mouse has moved since touch and then translates to pan, then clears mouseDown flag
    this.touchDown = false;
    const translateX = (touch.pageX - this.touchX);
    const translateY = (touch.pageY - this.touchY);
    // emit changes to parent
    this.updatePan.emit({
      x: this.xPan += translateX,
      y: this.yPan += translateY
    });
  }

}
