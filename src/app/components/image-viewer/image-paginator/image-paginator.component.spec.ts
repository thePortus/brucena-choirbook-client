import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePaginatorComponent } from './image-paginator.component';

describe('ImagePaginatorComponent', () => {
  let component: ImagePaginatorComponent;
  let fixture: ComponentFixture<ImagePaginatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImagePaginatorComponent]
    });
    fixture = TestBed.createComponent(ImagePaginatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
