import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CLASS_NAME } from './modal-options.class';
import { Utils } from 'ngx-bootstrap/utils';
import * as i0 from "@angular/core";
/** This component will be added as background layout for modals if enabled */
export class ModalBackdropComponent {
    get isAnimated() {
        return this._isAnimated;
    }
    set isAnimated(value) {
        this._isAnimated = value;
    }
    get isShown() {
        return this._isShown;
    }
    set isShown(value) {
        this._isShown = value;
        if (value) {
            this.renderer.addClass(this.element.nativeElement, `${CLASS_NAME.SHOW}`);
        }
        else {
            this.renderer.removeClass(this.element.nativeElement, `${CLASS_NAME.SHOW}`);
        }
    }
    constructor(element, renderer) {
        this._isAnimated = false;
        this._isShown = false;
        this.element = element;
        this.renderer = renderer;
    }
    ngOnInit() {
        if (this.isAnimated) {
            this.renderer.addClass(this.element.nativeElement, `${CLASS_NAME.FADE}`);
            Utils.reflow(this.element.nativeElement);
        }
        this.isShown = true;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ModalBackdropComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: ModalBackdropComponent, selector: "bs-modal-backdrop", host: { classAttribute: "modal-backdrop" }, ngImport: i0, template: ' ', isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ModalBackdropComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-modal-backdrop',
                    template: ' ',
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: { class: CLASS_NAME.BACKDROP }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwtYmFja2Ryb3AuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGFsL21vZGFsLWJhY2tkcm9wLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBVSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFekUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ25ELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7QUFHNUMsOEVBQThFO0FBTzlFLE1BQU0sT0FBTyxzQkFBc0I7SUFDakMsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLFVBQVUsQ0FBQyxLQUFjO1FBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDdkIsQ0FBQztJQUVELElBQUksT0FBTyxDQUFDLEtBQWM7UUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFDMUIsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQ3JCLENBQUM7UUFDSixDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFDMUIsR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQ3JCLENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQztJQVFELFlBQVksT0FBbUIsRUFBRSxRQUFtQjtRQUgxQyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixhQUFRLEdBQUcsS0FBSyxDQUFDO1FBR3pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUMxQixHQUFHLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FDckIsQ0FBQztZQUNGLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQ0QsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDdEIsQ0FBQzs4R0FoRFUsc0JBQXNCO2tHQUF0QixzQkFBc0IscUdBSnZCLEdBQUc7OzJGQUlGLHNCQUFzQjtrQkFObEMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixRQUFRLEVBQUUsR0FBRztvQkFDYixxRUFBcUU7b0JBQ3JFLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFO2lCQUNyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgT25Jbml0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENMQVNTX05BTUUgfSBmcm9tICcuL21vZGFsLW9wdGlvbnMuY2xhc3MnO1xyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xyXG5cclxuXHJcbi8qKiBUaGlzIGNvbXBvbmVudCB3aWxsIGJlIGFkZGVkIGFzIGJhY2tncm91bmQgbGF5b3V0IGZvciBtb2RhbHMgaWYgZW5hYmxlZCAqL1xyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2JzLW1vZGFsLWJhY2tkcm9wJyxcclxuICB0ZW1wbGF0ZTogJyAnLFxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxyXG4gIGhvc3Q6IHsgY2xhc3M6IENMQVNTX05BTUUuQkFDS0RST1AgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTW9kYWxCYWNrZHJvcENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgZ2V0IGlzQW5pbWF0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5faXNBbmltYXRlZDtcclxuICB9XHJcblxyXG4gIHNldCBpc0FuaW1hdGVkKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB0aGlzLl9pc0FuaW1hdGVkID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNTaG93bigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9pc1Nob3duO1xyXG4gIH1cclxuXHJcbiAgc2V0IGlzU2hvd24odmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuX2lzU2hvd24gPSB2YWx1ZTtcclxuICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKFxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgIGAke0NMQVNTX05BTUUuU0hPV31gXHJcbiAgICAgICk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKFxyXG4gICAgICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAgIGAke0NMQVNTX05BTUUuU0hPV31gXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbGVtZW50OiBFbGVtZW50UmVmO1xyXG4gIHJlbmRlcmVyOiBSZW5kZXJlcjI7XHJcblxyXG4gIHByb3RlY3RlZCBfaXNBbmltYXRlZCA9IGZhbHNlO1xyXG4gIHByb3RlY3RlZCBfaXNTaG93biA9IGZhbHNlO1xyXG5cclxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmLCByZW5kZXJlcjogUmVuZGVyZXIyKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgdGhpcy5yZW5kZXJlciA9IHJlbmRlcmVyO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc0FuaW1hdGVkKSB7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoXHJcbiAgICAgICAgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICAgYCR7Q0xBU1NfTkFNRS5GQURFfWBcclxuICAgICAgKTtcclxuICAgICAgVXRpbHMucmVmbG93KHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50KTtcclxuICAgIH1cclxuICAgIHRoaXMuaXNTaG93biA9IHRydWU7XHJcbiAgfVxyXG59XHJcbiJdfQ==