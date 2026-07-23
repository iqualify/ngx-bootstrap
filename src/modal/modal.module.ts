import { NgModule, ModuleWithProviders } from '@angular/core';

import { PositioningService } from '@iqualify/ngx-bootstrap/positioning';
import { ComponentLoaderFactory } from '@iqualify/ngx-bootstrap/component-loader';
import { FocusTrapModule } from '@iqualify/ngx-bootstrap/focus-trap';

import { ModalBackdropComponent } from './modal-backdrop.component';
import { ModalDirective } from './modal.directive';
import { ModalContainerComponent } from './modal-container.component';
import { BsModalService } from './bs-modal.service';

export const focusTrapModule = FocusTrapModule.forRoot();

@NgModule({
    imports: [FocusTrapModule],
    declarations: [
        ModalBackdropComponent,
        ModalDirective,
        ModalContainerComponent
    ],
    exports: [ModalBackdropComponent, ModalDirective]
})
export class ModalModule {
  static forRoot(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [BsModalService, ComponentLoaderFactory, PositioningService]
    };
  }
  static forChild(): ModuleWithProviders<ModalModule> {
    return {
      ngModule: ModalModule,
      providers: [BsModalService, ComponentLoaderFactory, PositioningService]
    };
  }
}
