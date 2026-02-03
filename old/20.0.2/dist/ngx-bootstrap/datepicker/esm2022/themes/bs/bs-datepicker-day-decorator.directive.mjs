import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import * as i0 from "@angular/core";
import * as i1 from "../../bs-datepicker.config";
export class BsDatepickerDayDecoratorComponent {
    constructor(_config, _elRef, _renderer) {
        this._config = _config;
        this._elRef = _elRef;
        this._renderer = _renderer;
        this.day = { date: new Date(), label: '' };
    }
    ngOnInit() {
        if (this.day?.isToday && this._config && this._config.customTodayClass) {
            this._renderer.addClass(this._elRef.nativeElement, this._config.customTodayClass);
        }
        if (typeof this.day?.customClasses === 'string') {
            this.day?.customClasses.split(' ')
                .filter((className) => className)
                .forEach((className) => {
                this._renderer.addClass(this._elRef.nativeElement, className);
            });
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDatepickerDayDecoratorComponent, deps: [{ token: i1.BsDatepickerConfig }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: BsDatepickerDayDecoratorComponent, selector: "[bsDatepickerDayDecorator]", inputs: { day: "day" }, host: { properties: { "class.disabled": "day.isDisabled", "class.is-highlighted": "day.isHovered", "class.is-other-month": "day.isOtherMonth", "class.is-active-other-month": "day.isOtherMonthHovered", "class.in-range": "day.isInRange", "class.select-start": "day.isSelectionStart", "class.select-end": "day.isSelectionEnd", "class.selected": "day.isSelected" } }, ngImport: i0, template: `{{ day && day.label || '' }}`, isInline: true, changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDatepickerDayDecoratorComponent, decorators: [{
            type: Component,
            args: [{
                    selector: '[bsDatepickerDayDecorator]',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    host: {
                        '[class.disabled]': 'day.isDisabled',
                        '[class.is-highlighted]': 'day.isHovered',
                        '[class.is-other-month]': 'day.isOtherMonth',
                        '[class.is-active-other-month]': 'day.isOtherMonthHovered',
                        '[class.in-range]': 'day.isInRange',
                        '[class.select-start]': 'day.isSelectionStart',
                        '[class.select-end]': 'day.isSelectionEnd',
                        '[class.selected]': 'day.isSelected'
                    },
                    template: `{{ day && day.label || '' }}`
                }]
        }], ctorParameters: () => [{ type: i1.BsDatepickerConfig }, { type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { day: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci1kYXktZGVjb3JhdG9yLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL3RoZW1lcy9icy9icy1kYXRlcGlja2VyLWRheS1kZWNvcmF0b3IuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBRUwsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7QUFrQmhFLE1BQU0sT0FBTyxpQ0FBaUM7SUFHNUMsWUFDVSxPQUEyQixFQUMzQixNQUFrQixFQUNsQixTQUFvQjtRQUZwQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixXQUFNLEdBQU4sTUFBTSxDQUFZO1FBQ2xCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFMckIsUUFBRyxHQUFpQixFQUFFLElBQUksRUFBRSxJQUFJLElBQUksRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQztJQU16RCxDQUFDO0lBRUwsUUFBUTtRQUVOLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDdkUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BGLENBQUM7UUFFRCxJQUFJLE9BQU8sSUFBSSxDQUFDLEdBQUcsRUFBRSxhQUFhLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDaEQsSUFBSSxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDL0IsTUFBTSxDQUFDLENBQUMsU0FBaUIsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDO2lCQUN4QyxPQUFPLENBQUMsQ0FBQyxTQUFpQixFQUFFLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztJQUNILENBQUM7OEdBdEJVLGlDQUFpQztrR0FBakMsaUNBQWlDLHNjQUZsQyw4QkFBOEI7OzJGQUU3QixpQ0FBaUM7a0JBZjdDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDRCQUE0QjtvQkFDdEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLElBQUksRUFBRTt3QkFDSixrQkFBa0IsRUFBRSxnQkFBZ0I7d0JBQ3BDLHdCQUF3QixFQUFFLGVBQWU7d0JBQ3pDLHdCQUF3QixFQUFFLGtCQUFrQjt3QkFDNUMsK0JBQStCLEVBQUUseUJBQXlCO3dCQUMxRCxrQkFBa0IsRUFBRSxlQUFlO3dCQUNuQyxzQkFBc0IsRUFBRSxzQkFBc0I7d0JBQzlDLG9CQUFvQixFQUFFLG9CQUFvQjt3QkFDMUMsa0JBQWtCLEVBQUUsZ0JBQWdCO3FCQUNyQztvQkFDRCxRQUFRLEVBQUUsOEJBQThCO2lCQUN6Qzt3SUFFVSxHQUFHO3NCQUFYLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIElucHV0LFxyXG4gIE9uSW5pdCxcclxuICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckNvbmZpZyB9IGZyb20gJy4uLy4uL2JzLWRhdGVwaWNrZXIuY29uZmlnJztcclxuaW1wb3J0IHsgRGF5Vmlld01vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnW2JzRGF0ZXBpY2tlckRheURlY29yYXRvcl0nLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2RheS5pc0Rpc2FibGVkJyxcclxuICAgICdbY2xhc3MuaXMtaGlnaGxpZ2h0ZWRdJzogJ2RheS5pc0hvdmVyZWQnLFxyXG4gICAgJ1tjbGFzcy5pcy1vdGhlci1tb250aF0nOiAnZGF5LmlzT3RoZXJNb250aCcsXHJcbiAgICAnW2NsYXNzLmlzLWFjdGl2ZS1vdGhlci1tb250aF0nOiAnZGF5LmlzT3RoZXJNb250aEhvdmVyZWQnLFxyXG4gICAgJ1tjbGFzcy5pbi1yYW5nZV0nOiAnZGF5LmlzSW5SYW5nZScsXHJcbiAgICAnW2NsYXNzLnNlbGVjdC1zdGFydF0nOiAnZGF5LmlzU2VsZWN0aW9uU3RhcnQnLFxyXG4gICAgJ1tjbGFzcy5zZWxlY3QtZW5kXSc6ICdkYXkuaXNTZWxlY3Rpb25FbmQnLFxyXG4gICAgJ1tjbGFzcy5zZWxlY3RlZF0nOiAnZGF5LmlzU2VsZWN0ZWQnXHJcbiAgfSxcclxuICB0ZW1wbGF0ZTogYHt7IGRheSAmJiBkYXkubGFiZWwgfHwgJycgfX1gXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBCc0RhdGVwaWNrZXJEYXlEZWNvcmF0b3JDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gIEBJbnB1dCgpIGRheTogRGF5Vmlld01vZGVsID0geyBkYXRlOiBuZXcgRGF0ZSgpLCBsYWJlbDogJycgfTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9jb25maWc6IEJzRGF0ZXBpY2tlckNvbmZpZyxcclxuICAgIHByaXZhdGUgX2VsUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMlxyXG4gICkgeyB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG5cclxuICAgIGlmICh0aGlzLmRheT8uaXNUb2RheSAmJiB0aGlzLl9jb25maWcgJiYgdGhpcy5fY29uZmlnLmN1c3RvbVRvZGF5Q2xhc3MpIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgdGhpcy5fY29uZmlnLmN1c3RvbVRvZGF5Q2xhc3MpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0eXBlb2YgdGhpcy5kYXk/LmN1c3RvbUNsYXNzZXMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHRoaXMuZGF5Py5jdXN0b21DbGFzc2VzLnNwbGl0KCcgJylcclxuICAgICAgICAuZmlsdGVyKChjbGFzc05hbWU6IHN0cmluZykgPT4gY2xhc3NOYW1lKVxyXG4gICAgICAgIC5mb3JFYWNoKChjbGFzc05hbWU6IHN0cmluZykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxSZWYubmF0aXZlRWxlbWVudCwgY2xhc3NOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19