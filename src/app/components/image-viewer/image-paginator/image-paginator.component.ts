import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-image-paginator',
  templateUrl: './image-paginator.component.html',
  styleUrls: ['./image-paginator.component.scss']
})
export class ImagePaginatorComponent {
  @Input() currentIndex: number = 0;
  @Input() maxIndex: number = 0;
  // event emitter
  @Output() paginationChange = new EventEmitter<number>();


  /**
   * Increments the image index, preventing going over max
   */
  incrementIndex() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex += 1;
    }
    // emit new pagination data out
    this.paginationChange.emit(this.currentIndex);
  }

  /**
   * Decrements the image index, preventing going below 0
   */
  decrementIndex() {
    if (this.currentIndex > 1) {
      this.currentIndex -= 1;
    }
    // emit new pagination data out
    this.paginationChange.emit(this.currentIndex);
  }

  /**
   * Goes to specifix index place, preventing going above max or below 0
  */
  gotoIndex(nextIndex: number) {
    if (nextIndex > 1 && nextIndex < this.maxIndex) {
      this.currentIndex = nextIndex;
    }
    else if (nextIndex < 1) {
      this.currentIndex = 1;
    }
    else if (nextIndex > this.maxIndex) {
      this.currentIndex = this.maxIndex;
    }
    // emit new pagination data out
    this.paginationChange.emit(this.currentIndex);
  }

  /**
   * Sets index to 0
   */
  gotoFirst() {
    this.currentIndex = 1;
    this.paginationChange.emit(this.currentIndex);
  }

  /**
   * Sets index to max
   */
  gotoLast() {
    this.currentIndex = this.maxIndex;
    this.paginationChange.emit(this.currentIndex);
  }

}
