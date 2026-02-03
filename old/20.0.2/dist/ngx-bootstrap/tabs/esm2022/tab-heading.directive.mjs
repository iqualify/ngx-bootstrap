import { Directive, TemplateRef } from '@angular/core';
import { TabDirective } from './tab.directive';
import * as i0 from "@angular/core";
import * as i1 from "./tab.directive";
/** Should be used to mark <ng-template> element as a template for tab heading */
export class TabHeadingDirective {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(templateRef, tab) {
        tab.headingRef = templateRef;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabHeadingDirective, deps: [{ token: i0.TemplateRef }, { token: i1.TabDirective }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.1", type: TabHeadingDirective, selector: "[tabHeading]", ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabHeadingDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[tabHeading]' }]
        }], ctorParameters: () => [{ type: i0.TemplateRef }, { type: i1.TabDirective }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFiLWhlYWRpbmcuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3RhYnMvdGFiLWhlYWRpbmcuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXZELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBRS9DLGlGQUFpRjtBQUVqRixNQUFNLE9BQU8sbUJBQW1CO0lBSTlCLDhEQUE4RDtJQUM5RCxZQUFZLFdBQTZCLEVBQUUsR0FBaUI7UUFDMUQsR0FBRyxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7SUFDL0IsQ0FBQzs4R0FQVSxtQkFBbUI7a0dBQW5CLG1CQUFtQjs7MkZBQW5CLG1CQUFtQjtrQkFEL0IsU0FBUzttQkFBQyxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBUYWJEaXJlY3RpdmUgfSBmcm9tICcuL3RhYi5kaXJlY3RpdmUnO1xyXG5cclxuLyoqIFNob3VsZCBiZSB1c2VkIHRvIG1hcmsgPG5nLXRlbXBsYXRlPiBlbGVtZW50IGFzIGEgdGVtcGxhdGUgZm9yIHRhYiBoZWFkaW5nICovXHJcbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1t0YWJIZWFkaW5nXScgfSlcclxuZXhwb3J0IGNsYXNzIFRhYkhlYWRpbmdEaXJlY3RpdmUge1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgdGVtcGxhdGVSZWY/OiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gIGNvbnN0cnVjdG9yKHRlbXBsYXRlUmVmOiBUZW1wbGF0ZVJlZjxhbnk+LCB0YWI6IFRhYkRpcmVjdGl2ZSkge1xyXG4gICAgdGFiLmhlYWRpbmdSZWYgPSB0ZW1wbGF0ZVJlZjtcclxuICB9XHJcbn1cclxuIl19