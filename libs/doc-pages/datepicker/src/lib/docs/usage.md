import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BsDatepickerModule } from '@iqualify/ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    ...
  ]
})
export class AppModule(){}
