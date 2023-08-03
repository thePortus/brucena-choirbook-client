import { Component, Input, SimpleChanges, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';

import { imageDatum } from 'app/interfaces/image-datum';

@Component({
  selector: 'app-image-display-port',
  templateUrl: './image-display-port.component.html',
  styleUrls: ['./image-display-port.component.scss']
})
export class ImageDisplayPortComponent implements AfterViewInit {
  @ViewChild('imageWrapper') imageWrapper: ElementRef<HTMLDivElement>;
  @ViewChild('mainImage') mainImage: ElementRef<HTMLImageElement>;
  @Input() imageDatum: imageDatum = {
    path: '',
    versoDisplay: '',
    rectoDisplay: ''
  };

  // tracks whether images has loaded yet (for hiding during loading)
  hasLoaded: boolean = false;
  // tracks zoom and pan of image
  xPan = 0;
  yPan = 0;
  zoomLevel = 1;
  // trackers to store mouse move distance for mouseup/down events
  mouseDown = false;
  mouseX = 0;
  mouseY = 0;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.adjustSizes();
    }, 100); // Add a slight delay to ensure the DOM is fully rendered
  }

  /**
   * On component changes, resize images
   * 
   * @param changes - Data on nature of component changes (unnecessary)
   */
  ngOnChanges(changes: SimpleChanges) {
    // prevent recalcing image if changes happen before image has loaded in
    if (this.hasLoaded) {
      this.adjustSizes();
    }
    this.resetImage();
    this.hasLoaded = false;

  }

  /**
   * Sets display flag when image has loaded
   */
  imageLoaded() {
    this.hasLoaded = true;
    setTimeout(() => {
      this.adjustSizes();
    }, 100); // Add a slight delay to ensure the DOM is fully rendered
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

  /**\
   * Resets image pan and zoom
   */
  resetImage() {
    this.zoomLevel = 1;
    this.xPan = 0;
    this.yPan = 0;
  }

  /**
   * Increases zoom level of image.
   * 
   * @param multiplier optional to increase the zoom level
   */
  increaseZoom(multiplier:number = 1) {
    this.zoomLevel += 0.1 * multiplier;
    if (this.zoomLevel < 0) {
      this.zoomLevel = 0;
    }
  }

  /**
   * Decreases zoom level of image.
   * 
   * @param multiplier optional to increase the zoom level
   */
  decreaseZoom(multiplier:number = 1) {
    this.zoomLevel -= 0.1 * multiplier;
    if (this.zoomLevel <= 0) {
      this.zoomLevel = 0.1;
    }
  }

  /**
   * Increases the pan of a given dimension
   * 
   * @param dimension x or y, which dimension to change the pan on
   * @param pixels optional, can specify exact number of pixels to move
   */
  increasePan(dimension: string = 'x', pixels:number = 20) {
    if (dimension == 'x') {
      this.xPan += pixels;
    }
    else {
      this.yPan += pixels;
    }
  }

  /**
   * Decreases the pan of a given dimension
   * 
   * @param dimension x or y, which dimension to change the pan on
   * @param pixels optional, can specify exact number of pixels to move
   */
  decreasePan(dimension: string = 'x', pixels:number = 20) {
    if (dimension == 'x') {
      this.xPan -= pixels;
    }
    else {
      this.yPan -= pixels;
    }
  }

  /**
   * Checks the size of the image container and calculates maximum dimensions.
   * 
   * @returns Object with height and width properties for resizing image
   */
  calcImageDimensions() {
    const wrapperHeight = this.imageWrapper.nativeElement.offsetHeight;
    const wrapperWidth = this.imageWrapper.nativeElement.offsetWidth;
    const imageHeight = this.mainImage.nativeElement.offsetHeight;
    const imageWidth = this.mainImage.nativeElement.offsetWidth;
    const heightToWidthRatio = imageHeight / imageWidth;

    let dimensions = {
      height: wrapperHeight,
      width: wrapperWidth,
      orientation: 'height'
    };
    
    // Check if height must be resized
    const heightToFitWidth = wrapperWidth * heightToWidthRatio;
    if (heightToFitWidth <= wrapperHeight) {
      dimensions.height = heightToFitWidth;
      dimensions.width = wrapperWidth;
      dimensions.orientation = 'width';
    }
    return dimensions;
  }

  /**
   * Resizes the picture based on the size of the parent container element.
   * 
   */
  adjustSizes() {
    const dimensions = this.calcImageDimensions();
    if (dimensions.orientation == 'height') {
      this.mainImage.nativeElement.style.height = dimensions.height - 20 + 'px';
      this.mainImage.nativeElement.style.width = 'auto';
    }
    else {
      this.mainImage.nativeElement.style.height = dimensions.height + 'px';
      this.mainImage.nativeElement.style.width = dimensions.width + 'px';
    }
  }

  /**
   * Called by event emitter of child directive, applies changes to xPan and yPan
   * 
   */
  updatePan(event: any) {
    this.xPan = event.x;
    this.yPan = event.y;
  }

  @HostListener ('window:resize', ['$event'])
  sizeChange(event: any) {
    this.adjustSizes();
  }

  @HostListener ('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key == '=' || event.key == '+') {
      this.increaseZoom();
    }
    else if (event.key == '-' || event.key == '_') {
      this.decreaseZoom();
    }
  }

  @HostListener ('document:keydown', ['$event'])
  handleArrowKeyEvent(event: KeyboardEvent) {
    if (event.key == 'ArrowUp') {
      this.decreasePan('y');
    }
    else if (event.key == 'ArrowDown') {
      this.increasePan('y');
    }
    else if (event.key == 'ArrowLeft') {
      this.decreasePan('x');
    }
    else if (event.key == 'ArrowRight') {
      this.increasePan('x');
    }
    else if (event.key == 'Backspace' || event.key == ' ' || event.key == 'Enter') {
      this.resetImage();
    }
  }

  @HostListener('wheel', ['$event'])
  onMouseWheel(event: WheelEvent) {
    if(event.deltaY < 0) {
      this.increaseZoom(Math.abs(event.deltaY) / 150);
    }
    else {
      this.decreaseZoom(event.deltaY / 150);
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    // stores location of mouse upon mouse down, to later calculate translation
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.mouseDown = true;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    // calculates how much the mouse has moved since mousedown and then translates to pan
    if (this.mouseDown) {
      const translateX = (event.clientX - this.mouseX);
      const translateY = (event.clientY - this.mouseY);
      // store new mouse location
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
      // move image
      this.increasePan('x', translateX);
      this.increasePan('y', translateY);
    }
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(event: MouseEvent) {
    // calculates how much the mouse has moved since mousedown and then translates to pan, then clears mouseDown flag
    this.mouseDown = false;
    const translateX = (event.clientX - this.mouseX);
    const translateY = (event.clientY - this.mouseY);
    // move image
    this.increasePan('x', translateX);
    this.increasePan('y', translateY);
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    let touch = event.touches[0];
    // stores location of mouse upon touch, to later calculate translation
    this.mouseX = touch.pageX;
    this.mouseY = touch.pageY;
    this.mouseDown = true;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    let touch = event.touches[0];
    // calculates how much the mouse has moved since touch and then translates to pan
    if (this.mouseDown) {
      const translateX = (touch.pageX - this.mouseX);
      const translateY = (touch.pageY - this.mouseY);
      // store new mouse location
      this.mouseX = touch.pageX;
      this.mouseY = touch.pageY;
      // move image
      this.increasePan('x', translateX);
      this.increasePan('y', translateY);
    }
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    let touch = event.touches[0];
    // calculates how much the mouse has moved since touch and then translates to pan, then clears mouseDown flag
    this.mouseDown = false;
    const translateX = (touch.pageX - this.mouseX);
    const translateY = (touch.pageY - this.mouseY);
    // move image
    this.increasePan('x', translateX);
    this.increasePan('y', translateY);
  }

}
