import { NgModule } from '@angular/core';
import { ButtonCheckboxDirective } from './button-checkbox.directive';
import { ButtonRadioDirective } from './button-radio.directive';
import { ButtonRadioGroupDirective } from './button-radio-group.directive';
import * as i0 from "@angular/core";
export class ButtonsModule {
    static forRoot() {
        return { ngModule: ButtonsModule, providers: [] };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ButtonsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: ButtonsModule, declarations: [ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective], exports: [ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ButtonsModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ButtonsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective],
                    exports: [ButtonCheckboxDirective, ButtonRadioDirective, ButtonRadioGroupDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9ucy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYnV0dG9ucy9idXR0b25zLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQztBQUU5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUN0RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7QUFNM0UsTUFBTSxPQUFPLGFBQWE7SUFDeEIsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDcEQsQ0FBQzs4R0FIVSxhQUFhOytHQUFiLGFBQWEsaUJBSFQsdUJBQXVCLEVBQUUsb0JBQW9CLEVBQUUseUJBQXlCLGFBQzdFLHVCQUF1QixFQUFFLG9CQUFvQixFQUFFLHlCQUF5QjsrR0FFdkUsYUFBYTs7MkZBQWIsYUFBYTtrQkFKekIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxvQkFBb0IsRUFBRSx5QkFBeUIsQ0FBQztvQkFDeEYsT0FBTyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsb0JBQW9CLEVBQUUseUJBQXlCLENBQUM7aUJBQ3BGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEJ1dHRvbkNoZWNrYm94RGlyZWN0aXZlIH0gZnJvbSAnLi9idXR0b24tY2hlY2tib3guZGlyZWN0aXZlJztcclxuaW1wb3J0IHsgQnV0dG9uUmFkaW9EaXJlY3RpdmUgfSBmcm9tICcuL2J1dHRvbi1yYWRpby5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBCdXR0b25SYWRpb0dyb3VwRGlyZWN0aXZlIH0gZnJvbSAnLi9idXR0b24tcmFkaW8tZ3JvdXAuZGlyZWN0aXZlJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgZGVjbGFyYXRpb25zOiBbQnV0dG9uQ2hlY2tib3hEaXJlY3RpdmUsIEJ1dHRvblJhZGlvRGlyZWN0aXZlLCBCdXR0b25SYWRpb0dyb3VwRGlyZWN0aXZlXSxcclxuICBleHBvcnRzOiBbQnV0dG9uQ2hlY2tib3hEaXJlY3RpdmUsIEJ1dHRvblJhZGlvRGlyZWN0aXZlLCBCdXR0b25SYWRpb0dyb3VwRGlyZWN0aXZlXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnV0dG9uc01vZHVsZSB7XHJcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxCdXR0b25zTW9kdWxlPiB7XHJcbiAgICByZXR1cm4geyBuZ01vZHVsZTogQnV0dG9uc01vZHVsZSwgcHJvdmlkZXJzOiBbXSB9O1xyXG4gIH1cclxufVxyXG4iXX0=