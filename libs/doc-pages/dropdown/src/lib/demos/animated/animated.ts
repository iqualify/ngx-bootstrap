import { Component } from '@angular/core';
import { BsDropdownConfig } from '@iqualify/ngx-bootstrap/dropdown';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'demo-dropdown-animation',
  templateUrl: './animated.html',
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class DemoDropdownAnimatedComponent {}
