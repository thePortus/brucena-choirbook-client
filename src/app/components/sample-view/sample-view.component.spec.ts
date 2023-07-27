import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleViewComponent } from './sample-view.component';

describe('SampleViewComponent', () => {
  let component: SampleViewComponent;
  let fixture: ComponentFixture<SampleViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SampleViewComponent]
    });
    fixture = TestBed.createComponent(SampleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
