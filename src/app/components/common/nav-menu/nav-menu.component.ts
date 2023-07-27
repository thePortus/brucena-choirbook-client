import { Component, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  // event emitter to signal when nav menus selection made
  @Output() navMenuSelected = new EventEmitter<string>();

  // links for the nav menu, label is what displays, path is where it points
  menuLinks = [{
    'label': 'Home',
    'path': '',
  }, {
    'label': 'Sample',
    'path': 'sample'
  }];

  constructor(
    private _router: Router
  ) { }

  /**
   * Navigates router to specified path, calls event emitter to signal choice has been made.
   * 
   * @param path - URL of desired route
   */
  navigate(path: string) {
    this._router.navigate([path]);
    this.navMenuSelected.emit();
  }

}
