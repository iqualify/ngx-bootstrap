import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import * as i0 from "@angular/core";
export class BarComponent {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        /** maximum total value of progress element */
        this.max = 100;
        /** current value of progress bar */
        this.value = 0;
        /** if `true` changing value of progress bar will be animated */
        this.animate = false;
        /** If `true`, striped classes are applied */
        this.striped = false;
        /** provide one of the four supported contextual classes: `success`, `info`, `warning`, `danger` */
        this.type = 'info';
        this.percent = 100;
    }
    ngOnChanges(changes) {
        if (changes["value"] || changes["max"]) {
            this.percent = 100 * (Number(changes["value"]?.currentValue || this.value)
                / Number((changes["max"]?.currentValue || this.max) || 100));
        }
        if (changes["type"]) {
            this.applyTypeClasses();
        }
    }
    applyTypeClasses() {
        if (this._prevType) {
            const barTypeClass = `progress-bar-${this._prevType}`;
            const bgClass = `bg-${this._prevType}`;
            this.renderer.removeClass(this.el.nativeElement, barTypeClass);
            this.renderer.removeClass(this.el.nativeElement, bgClass);
            this._prevType = void 0;
        }
        if (this.type) {
            const barTypeClass = `progress-bar-${this.type}`;
            const bgClass = `bg-${this.type}`;
            this.renderer.addClass(this.el.nativeElement, barTypeClass);
            this.renderer.addClass(this.el.nativeElement, bgClass);
            this._prevType = this.type;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BarComponent, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: BarComponent, selector: "bar", inputs: { max: "max", value: "value", animate: "animate", striped: "striped", type: "type" }, host: { attributes: { "role": "progressbar", "aria-valuemin": "0" }, properties: { "class.progress-bar": "true", "class.progress-bar-animated": "animate", "class.progress-bar-striped": "striped", "attr.aria-valuenow": "value", "attr.aria-valuetext": "percent ? percent.toFixed(0) + \"%\" : \"\"", "attr.aria-valuemax": "max", "style.height.%": "\"100\"", "style.width.%": "percent" } }, usesOnChanges: true, ngImport: i0, template: "<ng-content></ng-content>\r\n", changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bar', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        role: 'progressbar',
                        'aria-valuemin': '0',
                        '[class.progress-bar]': 'true',
                        '[class.progress-bar-animated]': 'animate',
                        '[class.progress-bar-striped]': 'striped',
                        '[attr.aria-valuenow]': 'value',
                        '[attr.aria-valuetext]': 'percent ? percent.toFixed(0) + "%" : ""',
                        '[attr.aria-valuemax]': 'max',
                        '[style.height.%]': '"100"',
                        '[style.width.%]': 'percent'
                    }, template: "<ng-content></ng-content>\r\n" }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { max: [{
                type: Input
            }], value: [{
                type: Input
            }], animate: [{
                type: Input
            }], striped: [{
                type: Input
            }], type: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9wcm9ncmVzc2Jhci9iYXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3Byb2dyZXNzYmFyL2Jhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUVMLFNBQVMsRUFFVixNQUFNLGVBQWUsQ0FBQzs7QUFzQnZCLE1BQU0sT0FBTyxZQUFZO0lBb0J2QixZQUNVLEVBQWMsRUFDZCxRQUFtQjtRQURuQixPQUFFLEdBQUYsRUFBRSxDQUFZO1FBQ2QsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQXJCN0IsOENBQThDO1FBQ3JDLFFBQUcsR0FBRyxHQUFHLENBQUM7UUFFbkIsb0NBQW9DO1FBQzNCLFVBQUssR0FBSSxDQUFDLENBQUM7UUFFcEIsZ0VBQWdFO1FBQ3ZELFlBQU8sR0FBSSxLQUFLLENBQUM7UUFFMUIsNkNBQTZDO1FBQ3BDLFlBQU8sR0FBSSxLQUFLLENBQUM7UUFFMUIsbUdBQW1HO1FBQzFGLFNBQUksR0FBcUIsTUFBTSxDQUFDO1FBRXpDLFlBQU8sR0FBRyxHQUFHLENBQUM7SUFPWCxDQUFDO0lBRUosV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQztrQkFDdEUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLFlBQVksSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBRUQsSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUMxQixDQUFDO0lBQ0gsQ0FBQztJQUVPLGdCQUFnQjtRQUN0QixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixNQUFNLFlBQVksR0FBRyxnQkFBZ0IsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3RELE1BQU0sT0FBTyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2QsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNqRCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUMsQ0FBQztZQUM1RCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7OEdBcERVLFlBQVk7a0dBQVosWUFBWSxpaUJDOUJ6QiwrQkFDQTs7MkZENkJhLFlBQVk7a0JBbEJ4QixTQUFTOytCQUNFLEtBQUssbUJBRUUsdUJBQXVCLENBQUMsTUFBTSxRQUV6Qzt3QkFDSixJQUFJLEVBQUUsYUFBYTt3QkFDbkIsZUFBZSxFQUFFLEdBQUc7d0JBQ3BCLHNCQUFzQixFQUFFLE1BQU07d0JBQzlCLCtCQUErQixFQUFFLFNBQVM7d0JBQzFDLDhCQUE4QixFQUFFLFNBQVM7d0JBQ3pDLHNCQUFzQixFQUFFLE9BQU87d0JBQy9CLHVCQUF1QixFQUFFLHlDQUF5Qzt3QkFDbEUsc0JBQXNCLEVBQUUsS0FBSzt3QkFDN0Isa0JBQWtCLEVBQUUsT0FBTzt3QkFDM0IsaUJBQWlCLEVBQUUsU0FBUztxQkFDN0I7dUdBSVEsR0FBRztzQkFBWCxLQUFLO2dCQUdHLEtBQUs7c0JBQWIsS0FBSztnQkFHRyxPQUFPO3NCQUFmLEtBQUs7Z0JBR0csT0FBTztzQkFBZixLQUFLO2dCQUdHLElBQUk7c0JBQVosS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIFJlbmRlcmVyMixcclxuICBTaW1wbGVDaGFuZ2VzXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBQcm9ncmVzc2JhclR5cGUgfSBmcm9tICcuL3Byb2dyZXNzYmFyLXR5cGUuaW50ZXJmYWNlJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYmFyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vYmFyLmNvbXBvbmVudC5odG1sJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcclxuICBob3N0OiB7XHJcbiAgICByb2xlOiAncHJvZ3Jlc3NiYXInLFxyXG4gICAgJ2FyaWEtdmFsdWVtaW4nOiAnMCcsXHJcbiAgICAnW2NsYXNzLnByb2dyZXNzLWJhcl0nOiAndHJ1ZScsXHJcbiAgICAnW2NsYXNzLnByb2dyZXNzLWJhci1hbmltYXRlZF0nOiAnYW5pbWF0ZScsXHJcbiAgICAnW2NsYXNzLnByb2dyZXNzLWJhci1zdHJpcGVkXSc6ICdzdHJpcGVkJyxcclxuICAgICdbYXR0ci5hcmlhLXZhbHVlbm93XSc6ICd2YWx1ZScsXHJcbiAgICAnW2F0dHIuYXJpYS12YWx1ZXRleHRdJzogJ3BlcmNlbnQgPyBwZXJjZW50LnRvRml4ZWQoMCkgKyBcIiVcIiA6IFwiXCInLFxyXG4gICAgJ1thdHRyLmFyaWEtdmFsdWVtYXhdJzogJ21heCcsXHJcbiAgICAnW3N0eWxlLmhlaWdodC4lXSc6ICdcIjEwMFwiJyxcclxuICAgICdbc3R5bGUud2lkdGguJV0nOiAncGVyY2VudCdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCYXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkNoYW5nZXMge1xyXG4gIC8qKiBtYXhpbXVtIHRvdGFsIHZhbHVlIG9mIHByb2dyZXNzIGVsZW1lbnQgKi9cclxuICBASW5wdXQoKSBtYXggPSAxMDA7XHJcblxyXG4gIC8qKiBjdXJyZW50IHZhbHVlIG9mIHByb2dyZXNzIGJhciAqL1xyXG4gIEBJbnB1dCgpIHZhbHVlPyA9IDA7XHJcblxyXG4gIC8qKiBpZiBgdHJ1ZWAgY2hhbmdpbmcgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyIHdpbGwgYmUgYW5pbWF0ZWQgKi9cclxuICBASW5wdXQoKSBhbmltYXRlPyA9IGZhbHNlO1xyXG5cclxuICAvKiogSWYgYHRydWVgLCBzdHJpcGVkIGNsYXNzZXMgYXJlIGFwcGxpZWQgKi9cclxuICBASW5wdXQoKSBzdHJpcGVkPyA9IGZhbHNlO1xyXG5cclxuICAvKiogcHJvdmlkZSBvbmUgb2YgdGhlIGZvdXIgc3VwcG9ydGVkIGNvbnRleHR1YWwgY2xhc3NlczogYHN1Y2Nlc3NgLCBgaW5mb2AsIGB3YXJuaW5nYCwgYGRhbmdlcmAgKi9cclxuICBASW5wdXQoKSB0eXBlPzogUHJvZ3Jlc3NiYXJUeXBlID0gJ2luZm8nO1xyXG5cclxuICBwZXJjZW50ID0gMTAwO1xyXG5cclxuICBwcml2YXRlIF9wcmV2VHlwZT86IHN0cmluZztcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIGVsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyXHJcbiAgKSB7fVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoY2hhbmdlc1tcInZhbHVlXCJdIHx8IGNoYW5nZXNbXCJtYXhcIl0pIHtcclxuICAgICAgdGhpcy5wZXJjZW50ID0gMTAwICogKE51bWJlcihjaGFuZ2VzW1widmFsdWVcIl0/LmN1cnJlbnRWYWx1ZSB8fCB0aGlzLnZhbHVlKVxyXG4gICAgICAgIC8gTnVtYmVyKChjaGFuZ2VzW1wibWF4XCJdPy5jdXJyZW50VmFsdWUgfHwgdGhpcy5tYXgpIHx8IDEwMCkpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChjaGFuZ2VzW1widHlwZVwiXSkge1xyXG4gICAgICB0aGlzLmFwcGx5VHlwZUNsYXNzZXMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXBwbHlUeXBlQ2xhc3NlcygpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9wcmV2VHlwZSkge1xyXG4gICAgICBjb25zdCBiYXJUeXBlQ2xhc3MgPSBgcHJvZ3Jlc3MtYmFyLSR7dGhpcy5fcHJldlR5cGV9YDtcclxuICAgICAgY29uc3QgYmdDbGFzcyA9IGBiZy0ke3RoaXMuX3ByZXZUeXBlfWA7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBiYXJUeXBlQ2xhc3MpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgYmdDbGFzcyk7XHJcbiAgICAgIHRoaXMuX3ByZXZUeXBlID0gdm9pZCAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnR5cGUpIHtcclxuICAgICAgY29uc3QgYmFyVHlwZUNsYXNzID0gYHByb2dyZXNzLWJhci0ke3RoaXMudHlwZX1gO1xyXG4gICAgICBjb25zdCBiZ0NsYXNzID0gYGJnLSR7dGhpcy50eXBlfWA7XHJcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbC5uYXRpdmVFbGVtZW50LCBiYXJUeXBlQ2xhc3MpO1xyXG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgYmdDbGFzcyk7XHJcbiAgICAgIHRoaXMuX3ByZXZUeXBlID0gdGhpcy50eXBlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCI8bmctY29udGVudD48L25nLWNvbnRlbnQ+XHJcbiJdfQ==