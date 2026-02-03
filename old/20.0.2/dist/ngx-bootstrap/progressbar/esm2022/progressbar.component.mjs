import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProgressbarConfig } from './progressbar.config';
import * as i0 from "@angular/core";
import * as i1 from "./progressbar.config";
import * as i2 from "@angular/common";
import * as i3 from "./bar.component";
export class ProgressbarComponent {
    /** current value of progress bar. Could be a number or array of objects
     * like {"value":15,"type":"info","label":"15 %"}
     */
    set value(value) {
        this.isStacked = Array.isArray(value);
        if (typeof value === 'number') {
            this._value = value;
            this._values = void 0;
        }
        else {
            this._value = void 0;
            this._values = value;
        }
    }
    constructor(config) {
        /** maximum total value of progress element */
        this.max = 100;
        /** if `true` changing value of progress bar will be animated */
        this.animate = false;
        /** If `true`, striped classes are applied */
        this.striped = false;
        this.isStacked = false;
        this._value = 0;
        Object.assign(this, config);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ProgressbarComponent, deps: [{ token: i1.ProgressbarConfig }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: ProgressbarComponent, selector: "progressbar", inputs: { max: "max", animate: "animate", striped: "striped", type: "type", value: "value" }, host: { properties: { "class.progress": "true", "attr.max": "max" } }, ngImport: i0, template: "<ng-container *ngIf=\"!isStacked then NotStacked else Stacked\"></ng-container>\r\n\r\n<ng-template #NotStacked>\r\n  <bar [type]=\"type\" [value]=\"_value\" [max]=\"max\" [animate]=\"animate\" [striped]=\"striped\">\r\n    <ng-content></ng-content>\r\n  </bar>\r\n</ng-template>\r\n\r\n<ng-template #Stacked>\r\n  <bar *ngFor=\"let item of _values\"\r\n       [type]=\"item.type\" [value]=\"item.value\" [max]=\"item.max || max\" [animate]=\"animate\" [striped]=\"striped\">{{ item.label }}</bar>\r\n</ng-template>\r\n", styles: [":host{width:100%;display:flex}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i3.BarComponent, selector: "bar", inputs: ["max", "value", "animate", "striped", "type"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ProgressbarComponent, decorators: [{
            type: Component,
            args: [{ selector: 'progressbar', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class.progress]': 'true',
                        '[attr.max]': 'max'
                    }, template: "<ng-container *ngIf=\"!isStacked then NotStacked else Stacked\"></ng-container>\r\n\r\n<ng-template #NotStacked>\r\n  <bar [type]=\"type\" [value]=\"_value\" [max]=\"max\" [animate]=\"animate\" [striped]=\"striped\">\r\n    <ng-content></ng-content>\r\n  </bar>\r\n</ng-template>\r\n\r\n<ng-template #Stacked>\r\n  <bar *ngFor=\"let item of _values\"\r\n       [type]=\"item.type\" [value]=\"item.value\" [max]=\"item.max || max\" [animate]=\"animate\" [striped]=\"striped\">{{ item.label }}</bar>\r\n</ng-template>\r\n", styles: [":host{width:100%;display:flex}\n"] }]
        }], ctorParameters: () => [{ type: i1.ProgressbarConfig }], propDecorators: { max: [{
                type: Input
            }], animate: [{
                type: Input
            }], striped: [{
                type: Input
            }], type: [{
                type: Input
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NiYXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb2dyZXNzYmFyL3Byb2dyZXNzYmFyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy9wcm9ncmVzc2Jhci9wcm9ncmVzc2Jhci5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQzs7Ozs7QUFpQnpELE1BQU0sT0FBTyxvQkFBb0I7SUFhL0I7O09BRUc7SUFDSCxJQUNJLEtBQUssQ0FBQyxLQUEwQjtRQUNsQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO0lBQ0gsQ0FBQztJQU1ELFlBQVksTUFBeUI7UUEvQnJDLDhDQUE4QztRQUNyQyxRQUFHLEdBQUcsR0FBRyxDQUFDO1FBRW5CLGdFQUFnRTtRQUN2RCxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBRXpCLDZDQUE2QztRQUNwQyxZQUFPLEdBQUcsS0FBSyxDQUFDO1FBb0J6QixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ2xCLFdBQU0sR0FBSSxDQUFDLENBQUM7UUFJVixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDOzhHQWxDVSxvQkFBb0I7a0dBQXBCLG9CQUFvQix3TkNuQmpDLHlnQkFZQTs7MkZET2Esb0JBQW9CO2tCQWZoQyxTQUFTOytCQUNFLGFBQWEsbUJBRU4sdUJBQXVCLENBQUMsTUFBTSxRQUV6Qzt3QkFDSixrQkFBa0IsRUFBRSxNQUFNO3dCQUMxQixZQUFZLEVBQUUsS0FBSztxQkFDcEI7c0ZBU1EsR0FBRztzQkFBWCxLQUFLO2dCQUdHLE9BQU87c0JBQWYsS0FBSztnQkFHRyxPQUFPO3NCQUFmLEtBQUs7Z0JBR0csSUFBSTtzQkFBWixLQUFLO2dCQU1GLEtBQUs7c0JBRFIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEJhclZhbHVlLCBQcm9ncmVzc2JhclR5cGUgfSBmcm9tICcuL3Byb2dyZXNzYmFyLXR5cGUuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgUHJvZ3Jlc3NiYXJDb25maWcgfSBmcm9tICcuL3Byb2dyZXNzYmFyLmNvbmZpZyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ3Byb2dyZXNzYmFyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vcHJvZ3Jlc3NiYXIuY29tcG9uZW50Lmh0bWwnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3MucHJvZ3Jlc3NdJzogJ3RydWUnLFxyXG4gICAgJ1thdHRyLm1heF0nOiAnbWF4J1xyXG4gIH0sXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3Qge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgZGlzcGxheTogZmxleDtcclxuICAgIH0gYF1cclxufSlcclxuZXhwb3J0IGNsYXNzIFByb2dyZXNzYmFyQ29tcG9uZW50IHtcclxuICAvKiogbWF4aW11bSB0b3RhbCB2YWx1ZSBvZiBwcm9ncmVzcyBlbGVtZW50ICovXHJcbiAgQElucHV0KCkgbWF4ID0gMTAwO1xyXG5cclxuICAvKiogaWYgYHRydWVgIGNoYW5naW5nIHZhbHVlIG9mIHByb2dyZXNzIGJhciB3aWxsIGJlIGFuaW1hdGVkICovXHJcbiAgQElucHV0KCkgYW5pbWF0ZSA9IGZhbHNlO1xyXG5cclxuICAvKiogSWYgYHRydWVgLCBzdHJpcGVkIGNsYXNzZXMgYXJlIGFwcGxpZWQgKi9cclxuICBASW5wdXQoKSBzdHJpcGVkID0gZmFsc2U7XHJcblxyXG4gIC8qKiBwcm92aWRlIG9uZSBvZiB0aGUgZm91ciBzdXBwb3J0ZWQgY29udGV4dHVhbCBjbGFzc2VzOiBgc3VjY2Vzc2AsIGBpbmZvYCwgYHdhcm5pbmdgLCBgZGFuZ2VyYCAqL1xyXG4gIEBJbnB1dCgpIHR5cGU/OiBQcm9ncmVzc2JhclR5cGU7XHJcblxyXG4gIC8qKiBjdXJyZW50IHZhbHVlIG9mIHByb2dyZXNzIGJhci4gQ291bGQgYmUgYSBudW1iZXIgb3IgYXJyYXkgb2Ygb2JqZWN0c1xyXG4gICAqIGxpa2Uge1widmFsdWVcIjoxNSxcInR5cGVcIjpcImluZm9cIixcImxhYmVsXCI6XCIxNSAlXCJ9XHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBzZXQgdmFsdWUodmFsdWU6IG51bWJlciB8IEJhclZhbHVlW10pIHtcclxuICAgIHRoaXMuaXNTdGFja2VkID0gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XHJcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgICB0aGlzLl92YWx1ZXMgPSB2b2lkIDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl92YWx1ZSA9IHZvaWQgMDtcclxuICAgICAgdGhpcy5fdmFsdWVzID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpc1N0YWNrZWQgPSBmYWxzZTtcclxuICBfdmFsdWU/ID0gMDtcclxuICBfdmFsdWVzPzogQmFyVmFsdWVbXTtcclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBQcm9ncmVzc2JhckNvbmZpZykge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xyXG4gIH1cclxufVxyXG4iLCI8bmctY29udGFpbmVyICpuZ0lmPVwiIWlzU3RhY2tlZCB0aGVuIE5vdFN0YWNrZWQgZWxzZSBTdGFja2VkXCI+PC9uZy1jb250YWluZXI+XHJcblxyXG48bmctdGVtcGxhdGUgI05vdFN0YWNrZWQ+XHJcbiAgPGJhciBbdHlwZV09XCJ0eXBlXCIgW3ZhbHVlXT1cIl92YWx1ZVwiIFttYXhdPVwibWF4XCIgW2FuaW1hdGVdPVwiYW5pbWF0ZVwiIFtzdHJpcGVkXT1cInN0cmlwZWRcIj5cclxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICA8L2Jhcj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjxuZy10ZW1wbGF0ZSAjU3RhY2tlZD5cclxuICA8YmFyICpuZ0Zvcj1cImxldCBpdGVtIG9mIF92YWx1ZXNcIlxyXG4gICAgICAgW3R5cGVdPVwiaXRlbS50eXBlXCIgW3ZhbHVlXT1cIml0ZW0udmFsdWVcIiBbbWF4XT1cIml0ZW0ubWF4IHx8IG1heFwiIFthbmltYXRlXT1cImFuaW1hdGVcIiBbc3RyaXBlZF09XCJzdHJpcGVkXCI+e3sgaXRlbS5sYWJlbCB9fTwvYmFyPlxyXG48L25nLXRlbXBsYXRlPlxyXG4iXX0=