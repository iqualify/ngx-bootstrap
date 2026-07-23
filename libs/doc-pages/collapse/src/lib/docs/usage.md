import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CollapseModule } from '@iqualify/ngx-bootstrap/collapse';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ...
  ]
})
export class AppModule(){}

Also should be added web-animations-js polyfill for IE browser (Edge)
