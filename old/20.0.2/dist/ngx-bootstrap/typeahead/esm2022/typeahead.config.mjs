import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** Default values provider for typeahead */
export class TypeaheadConfig {
    constructor() {
        /** sets use adaptive position */
        this.adaptivePosition = false;
        /** turn on/off animation */
        this.isAnimated = false;
        /** used to hide results on blur */
        this.hideResultsOnBlur = true;
        /** if true, typeahead will cancel async request on blur */
        this.cancelRequestOnFocusLost = false;
        /** used to choose the first item in typeahead container */
        this.selectFirstItem = true;
        /** used to active/inactive the first item in typeahead container */
        this.isFirstItemActive = true;
        /** used to choose set minimal no of characters that needs to
         * be entered before typeahead kicks-in
         */
        this.minLength = 1;
        /**
         * used to choose item on blur event
         */
        this.selectItemOnBlur = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TypeaheadConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TypeaheadConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TypeaheadConfig, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlYWhlYWQvdHlwZWFoZWFkLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyw0Q0FBNEM7QUFFNUMsTUFBTSxPQUFPLGVBQWU7SUFENUI7UUFFRSxpQ0FBaUM7UUFDakMscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLDRCQUE0QjtRQUM1QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ25CLG1DQUFtQztRQUNuQyxzQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFDekIsMkRBQTJEO1FBQzNELDZCQUF3QixHQUFHLEtBQUssQ0FBQztRQUNqQywyREFBMkQ7UUFDM0Qsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFDdkIsb0VBQW9FO1FBQ3BFLHNCQUFpQixHQUFHLElBQUksQ0FBQztRQUN6Qjs7V0FFRztRQUNILGNBQVMsR0FBRyxDQUFDLENBQUM7UUFDZDs7V0FFRztRQUNILHFCQUFnQixHQUFHLEtBQUssQ0FBQztLQUMxQjs4R0FyQlksZUFBZTtrSEFBZixlQUFlLGNBREYsTUFBTTs7MkZBQ25CLGVBQWU7a0JBRDNCLFVBQVU7bUJBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuLyoqIERlZmF1bHQgdmFsdWVzIHByb3ZpZGVyIGZvciB0eXBlYWhlYWQgKi9cclxuQEluamVjdGFibGUoeyBwcm92aWRlZEluOiAncm9vdCcgfSlcclxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZENvbmZpZyB7XHJcbiAgLyoqIHNldHMgdXNlIGFkYXB0aXZlIHBvc2l0aW9uICovXHJcbiAgYWRhcHRpdmVQb3NpdGlvbiA9IGZhbHNlO1xyXG4gIC8qKiB0dXJuIG9uL29mZiBhbmltYXRpb24gKi9cclxuICBpc0FuaW1hdGVkID0gZmFsc2U7XHJcbiAgLyoqIHVzZWQgdG8gaGlkZSByZXN1bHRzIG9uIGJsdXIgKi9cclxuICBoaWRlUmVzdWx0c09uQmx1ciA9IHRydWU7XHJcbiAgLyoqIGlmIHRydWUsIHR5cGVhaGVhZCB3aWxsIGNhbmNlbCBhc3luYyByZXF1ZXN0IG9uIGJsdXIgKi9cclxuICBjYW5jZWxSZXF1ZXN0T25Gb2N1c0xvc3QgPSBmYWxzZTtcclxuICAvKiogdXNlZCB0byBjaG9vc2UgdGhlIGZpcnN0IGl0ZW0gaW4gdHlwZWFoZWFkIGNvbnRhaW5lciAqL1xyXG4gIHNlbGVjdEZpcnN0SXRlbSA9IHRydWU7XHJcbiAgLyoqIHVzZWQgdG8gYWN0aXZlL2luYWN0aXZlIHRoZSBmaXJzdCBpdGVtIGluIHR5cGVhaGVhZCBjb250YWluZXIgKi9cclxuICBpc0ZpcnN0SXRlbUFjdGl2ZSA9IHRydWU7XHJcbiAgLyoqIHVzZWQgdG8gY2hvb3NlIHNldCBtaW5pbWFsIG5vIG9mIGNoYXJhY3RlcnMgdGhhdCBuZWVkcyB0b1xyXG4gICAqIGJlIGVudGVyZWQgYmVmb3JlIHR5cGVhaGVhZCBraWNrcy1pblxyXG4gICAqL1xyXG4gIG1pbkxlbmd0aCA9IDE7XHJcbiAgLyoqXHJcbiAgICogdXNlZCB0byBjaG9vc2UgaXRlbSBvbiBibHVyIGV2ZW50XHJcbiAgICovXHJcbiAgc2VsZWN0SXRlbU9uQmx1ciA9IGZhbHNlO1xyXG59XHJcbiJdfQ==