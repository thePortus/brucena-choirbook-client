import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDisplayPortComponent } from './image-display-port.component';

describe('ImageDisplayPortComponent', () => {
  let component: ImageDisplayPortComponent;
  let fixture: ComponentFixture<ImageDisplayPortComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageDisplayPortComponent]
    });
    fixture = TestBed.createComponent(ImageDisplayPortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
