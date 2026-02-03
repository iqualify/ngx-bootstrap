import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertConfig } from './alert.config';
import { OnChange } from 'ngx-bootstrap/utils';
import * as i0 from "@angular/core";
import * as i1 from "./alert.config";
import * as i2 from "@angular/common";
export class AlertComponent {
    constructor(_config, changeDetection) {
        this.changeDetection = changeDetection;
        /** Alert type.
         * Provides one of four bootstrap supported contextual classes:
         * `success`, `info`, `warning` and `danger`
         */
        this.type = 'warning';
        /** If set, displays an inline "Close" button */
        this.dismissible = false;
        /** Is alert visible */
        this.isOpen = true;
        /** This event fires immediately after close instance method is called,
         * $event is an instance of Alert component.
         */
        this.onClose = new EventEmitter();
        /** This event fires when alert closed, $event is an instance of Alert component */
        this.onClosed = new EventEmitter();
        this.classes = '';
        this.dismissibleChange = new EventEmitter();
        Object.assign(this, _config);
        this.dismissibleChange.subscribe(( /*dismissible: boolean*/) => {
            this.classes = this.dismissible ? 'alert-dismissible' : '';
            this.changeDetection.markForCheck();
        });
    }
    ngOnInit() {
        if (this.dismissOnTimeout) {
            // if dismissOnTimeout used as attr without binding, it will be a string
            setTimeout(() => this.close(), parseInt(this.dismissOnTimeout, 10));
        }
    }
    // todo: animation ` If the .fade and .in classes are present on the element,
    // the alert will fade out before it is removed`
    /**
     * Closes an alert by removing it from the DOM.
     */
    close() {
        if (!this.isOpen) {
            return;
        }
        this.onClose.emit(this);
        this.isOpen = false;
        this.changeDetection.markForCheck();
        this.onClosed.emit(this);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AlertComponent, deps: [{ token: i1.AlertConfig }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: AlertComponent, selector: "alert,bs-alert", inputs: { type: "type", dismissible: "dismissible", dismissOnTimeout: "dismissOnTimeout", isOpen: "isOpen" }, outputs: { onClose: "onClose", onClosed: "onClosed" }, ngImport: i0, template: "<ng-template [ngIf]=\"isOpen\">\r\n  <div [class]=\"'alert alert-' + type\" role=\"alert\" [ngClass]=\"classes\">\r\n    <ng-template [ngIf]=\"dismissible\">\r\n      <button type=\"button\" class=\"close btn-close\" aria-label=\"Close\" (click)=\"close()\">\r\n        <span aria-hidden=\"true\" class=\"visually-hidden\">&times;</span>\r\n        <span class=\"sr-only visually-hidden\">Close</span>\r\n      </button>\r\n    </ng-template>\r\n    <ng-content></ng-content>\r\n  </div>\r\n</ng-template>\r\n", dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
__decorate([
    OnChange(),
    __metadata("design:type", Object)
], AlertComponent.prototype, "dismissible", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: AlertComponent, decorators: [{
            type: Component,
            args: [{ selector: 'alert,bs-alert', changeDetection: ChangeDetectionStrategy.OnPush, template: "<ng-template [ngIf]=\"isOpen\">\r\n  <div [class]=\"'alert alert-' + type\" role=\"alert\" [ngClass]=\"classes\">\r\n    <ng-template [ngIf]=\"dismissible\">\r\n      <button type=\"button\" class=\"close btn-close\" aria-label=\"Close\" (click)=\"close()\">\r\n        <span aria-hidden=\"true\" class=\"visually-hidden\">&times;</span>\r\n        <span class=\"sr-only visually-hidden\">Close</span>\r\n      </button>\r\n    </ng-template>\r\n    <ng-content></ng-content>\r\n  </div>\r\n</ng-template>\r\n" }]
        }], ctorParameters: () => [{ type: i1.AlertConfig }, { type: i0.ChangeDetectorRef }], propDecorators: { type: [{
                type: Input
            }], dismissible: [{
                type: Input
            }], dismissOnTimeout: [{
                type: Input
            }], isOpen: [{
                type: Input
            }], onClose: [{
                type: Output
            }], onClosed: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2FsZXJ0L2FsZXJ0LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy9hbGVydC9hbGVydC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0scUJBQXFCLENBQUM7Ozs7QUFPL0MsTUFBTSxPQUFPLGNBQWM7SUF5QnpCLFlBQVksT0FBb0IsRUFBVSxlQUFrQztRQUFsQyxvQkFBZSxHQUFmLGVBQWUsQ0FBbUI7UUF4QjVFOzs7V0FHRztRQUNNLFNBQUksR0FBRyxTQUFTLENBQUM7UUFDMUIsZ0RBQWdEO1FBQ3ZCLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBSTdDLHVCQUF1QjtRQUNkLFdBQU0sR0FBRyxJQUFJLENBQUM7UUFFdkI7O1dBRUc7UUFDTyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFDdkQsbUZBQW1GO1FBQ3pFLGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBa0IsQ0FBQztRQUd4RCxZQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2Isc0JBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQVcsQ0FBQztRQUc5QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztRQUM3QixJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEVBQUMsd0JBQXdCLEVBQUUsRUFBRTtZQUM1RCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDM0QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxRQUFRO1FBQ04sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQix3RUFBd0U7WUFDeEUsVUFBVSxDQUNSLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFDbEIsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBMEIsRUFBRSxFQUFFLENBQUMsQ0FDOUMsQ0FBQztRQUNKLENBQUM7SUFDSCxDQUFDO0lBRUQsNkVBQTZFO0lBQzdFLGdEQUFnRDtJQUNoRDs7T0FFRztJQUNILEtBQUs7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFDcEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDOzhHQXpEVSxjQUFjO2tHQUFkLGNBQWMsMk5DakIzQiwrZkFXQTs7QURhMkI7SUFBeEIsUUFBUSxFQUFFOzttREFBa0M7MkZBUGxDLGNBQWM7a0JBTDFCLFNBQVM7K0JBQ0UsZ0JBQWdCLG1CQUVULHVCQUF1QixDQUFDLE1BQU07Z0hBT3RDLElBQUk7c0JBQVosS0FBSztnQkFFbUIsV0FBVztzQkFBckIsS0FBSztnQkFFWCxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBR0csTUFBTTtzQkFBZCxLQUFLO2dCQUtJLE9BQU87c0JBQWhCLE1BQU07Z0JBRUcsUUFBUTtzQkFBakIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEFsZXJ0Q29uZmlnIH0gZnJvbSAnLi9hbGVydC5jb25maWcnO1xyXG5pbXBvcnQgeyBPbkNoYW5nZSB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdhbGVydCxicy1hbGVydCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2FsZXJ0LmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQWxlcnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIC8qKiBBbGVydCB0eXBlLlxyXG4gICAqIFByb3ZpZGVzIG9uZSBvZiBmb3VyIGJvb3RzdHJhcCBzdXBwb3J0ZWQgY29udGV4dHVhbCBjbGFzc2VzOlxyXG4gICAqIGBzdWNjZXNzYCwgYGluZm9gLCBgd2FybmluZ2AgYW5kIGBkYW5nZXJgXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZSA9ICd3YXJuaW5nJztcclxuICAvKiogSWYgc2V0LCBkaXNwbGF5cyBhbiBpbmxpbmUgXCJDbG9zZVwiIGJ1dHRvbiAqL1xyXG4gIEBPbkNoYW5nZSgpICAgQElucHV0KCkgICBkaXNtaXNzaWJsZSA9IGZhbHNlO1xyXG4gIC8qKiBOdW1iZXIgaW4gbWlsbGlzZWNvbmRzLCBhZnRlciB3aGljaCBhbGVydCB3aWxsIGJlIGNsb3NlZCAqL1xyXG4gIEBJbnB1dCgpIGRpc21pc3NPblRpbWVvdXQ/OiBudW1iZXIgfCBzdHJpbmc7XHJcblxyXG4gIC8qKiBJcyBhbGVydCB2aXNpYmxlICovXHJcbiAgQElucHV0KCkgaXNPcGVuID0gdHJ1ZTtcclxuXHJcbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgaW1tZWRpYXRlbHkgYWZ0ZXIgY2xvc2UgaW5zdGFuY2UgbWV0aG9kIGlzIGNhbGxlZCxcclxuICAgKiAkZXZlbnQgaXMgYW4gaW5zdGFuY2Ugb2YgQWxlcnQgY29tcG9uZW50LlxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBvbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxBbGVydENvbXBvbmVudD4oKTtcclxuICAvKiogVGhpcyBldmVudCBmaXJlcyB3aGVuIGFsZXJ0IGNsb3NlZCwgJGV2ZW50IGlzIGFuIGluc3RhbmNlIG9mIEFsZXJ0IGNvbXBvbmVudCAqL1xyXG4gIEBPdXRwdXQoKSBvbkNsb3NlZCA9IG5ldyBFdmVudEVtaXR0ZXI8QWxlcnRDb21wb25lbnQ+KCk7XHJcblxyXG5cclxuICBjbGFzc2VzID0gJyc7XHJcbiAgZGlzbWlzc2libGVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKF9jb25maWc6IEFsZXJ0Q29uZmlnLCBwcml2YXRlIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgX2NvbmZpZyk7XHJcbiAgICB0aGlzLmRpc21pc3NpYmxlQ2hhbmdlLnN1YnNjcmliZSgoLypkaXNtaXNzaWJsZTogYm9vbGVhbiovKSA9PiB7XHJcbiAgICAgIHRoaXMuY2xhc3NlcyA9IHRoaXMuZGlzbWlzc2libGUgPyAnYWxlcnQtZGlzbWlzc2libGUnIDogJyc7XHJcbiAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmRpc21pc3NPblRpbWVvdXQpIHtcclxuICAgICAgLy8gaWYgZGlzbWlzc09uVGltZW91dCB1c2VkIGFzIGF0dHIgd2l0aG91dCBiaW5kaW5nLCBpdCB3aWxsIGJlIGEgc3RyaW5nXHJcbiAgICAgIHNldFRpbWVvdXQoXHJcbiAgICAgICAgKCkgPT4gdGhpcy5jbG9zZSgpLFxyXG4gICAgICAgIHBhcnNlSW50KHRoaXMuZGlzbWlzc09uVGltZW91dCBhcyBzdHJpbmcsIDEwKVxyXG4gICAgICApO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gdG9kbzogYW5pbWF0aW9uIGAgSWYgdGhlIC5mYWRlIGFuZCAuaW4gY2xhc3NlcyBhcmUgcHJlc2VudCBvbiB0aGUgZWxlbWVudCxcclxuICAvLyB0aGUgYWxlcnQgd2lsbCBmYWRlIG91dCBiZWZvcmUgaXQgaXMgcmVtb3ZlZGBcclxuICAvKipcclxuICAgKiBDbG9zZXMgYW4gYWxlcnQgYnkgcmVtb3ZpbmcgaXQgZnJvbSB0aGUgRE9NLlxyXG4gICAqL1xyXG4gIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmlzT3Blbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbkNsb3NlLmVtaXQodGhpcyk7XHJcbiAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb24ubWFya0ZvckNoZWNrKCk7XHJcbiAgICB0aGlzLm9uQ2xvc2VkLmVtaXQodGhpcyk7XHJcbiAgfVxyXG59XHJcbiIsIjxuZy10ZW1wbGF0ZSBbbmdJZl09XCJpc09wZW5cIj5cclxuICA8ZGl2IFtjbGFzc109XCInYWxlcnQgYWxlcnQtJyArIHR5cGVcIiByb2xlPVwiYWxlcnRcIiBbbmdDbGFzc109XCJjbGFzc2VzXCI+XHJcbiAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwiZGlzbWlzc2libGVcIj5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZSBidG4tY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiAoY2xpY2spPVwiY2xvc2UoKVwiPlxyXG4gICAgICAgIDxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIGNsYXNzPVwidmlzdWFsbHktaGlkZGVuXCI+JnRpbWVzOzwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cInNyLW9ubHkgdmlzdWFsbHktaGlkZGVuXCI+Q2xvc2U8L3NwYW4+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICA8L2Rpdj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuIl19