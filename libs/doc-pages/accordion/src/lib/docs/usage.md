import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AccordionModule } from '@iqualify/ngx-bootstrap/accordion';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    ...
  ]
})
export class AppModule(){}

Also should be added web-animations-js polyfill for IE browser (Edge)
