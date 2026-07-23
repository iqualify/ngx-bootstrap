import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TypeaheadModule } from '@iqualify/ngx-bootstrap/typeahead';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    TypeaheadModule.forRoot(),
    ...
  ]
})
export class AppModule(){}
