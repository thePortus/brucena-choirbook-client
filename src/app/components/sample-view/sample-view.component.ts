import { Component } from '@angular/core';

import { Images } from './images';

@Component({
  selector: 'app-sample-view',
  templateUrl: './sample-view.component.html',
  styleUrls: ['./sample-view.component.scss']
})
export class SampleViewComponent {
  // list of choirbook images and page information
  images = Images;

}
