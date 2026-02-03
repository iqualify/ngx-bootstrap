import { ChangeDetectionStrategy, Input, Component } from '@angular/core';
import { PopoverConfig } from './popover.config';
import { getBsVer } from 'ngx-bootstrap/utils';
import { PlacementForBs5, checkMargins } from 'ngx-bootstrap/positioning';
import * as i0 from "@angular/core";
import * as i1 from "./popover.config";
import * as i2 from "@angular/common";
export class PopoverContainerComponent {
    set placement(value) {
        if (!this._bsVersions.isBs5) {
            this._placement = value;
        }
        else {
            this._placement = PlacementForBs5[value];
        }
    }
    get _bsVersions() {
        return getBsVer();
    }
    constructor(config) {
        this._placement = 'top';
        Object.assign(this, config);
    }
    checkMarginNecessity() {
        return checkMargins(this._placement);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PopoverContainerComponent, deps: [{ token: i1.PopoverConfig }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: PopoverContainerComponent, selector: "popover-container", inputs: { placement: "placement", title: "title" }, host: { attributes: { "role": "tooltip" }, properties: { "attr.id": "popoverId", "class": "\"popover in popover-\" + _placement + \" \" + \"bs-popover-\" + _placement + \" \" + _placement + \" \" + containerClass + \" \" + checkMarginNecessity()", "class.show": "!_bsVersions.isBs3", "class.bs3": "_bsVersions.isBs3" }, styleAttribute: "display:block; position:absolute" }, ngImport: i0, template: "<div class=\"popover-arrow arrow\"></div>\r\n<h3 class=\"popover-title popover-header\" *ngIf=\"title\">{{ title }}</h3>\r\n<div class=\"popover-content popover-body\">\r\n  <ng-content></ng-content>\r\n</div>\r\n", styles: [":host.popover.bottom>.arrow{margin-left:-4px}:host .popover-arrow{position:absolute}\n"], dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PopoverContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'popover-container', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[attr.id]': 'popoverId',
                        '[class]': '"popover in popover-" + _placement + " " + "bs-popover-" + _placement + " " + _placement + " " + containerClass + " " + checkMarginNecessity()',
                        '[class.show]': '!_bsVersions.isBs3',
                        '[class.bs3]': '_bsVersions.isBs3',
                        role: 'tooltip',
                        style: 'display:block; position:absolute'
                    }, template: "<div class=\"popover-arrow arrow\"></div>\r\n<h3 class=\"popover-title popover-header\" *ngIf=\"title\">{{ title }}</h3>\r\n<div class=\"popover-content popover-body\">\r\n  <ng-content></ng-content>\r\n</div>\r\n", styles: [":host.popover.bottom>.arrow{margin-left:-4px}:host .popover-arrow{position:absolute}\n"] }]
        }], ctorParameters: () => [{ type: i1.PopoverConfig }], propDecorators: { placement: [{
                type: Input
            }], title: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3BvcG92ZXIvcG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3BvcG92ZXIvcG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLHVCQUF1QixFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQ2pELE9BQU8sRUFBRSxRQUFRLEVBQWMsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsZUFBZSxFQUFFLFlBQVksRUFBd0IsTUFBTSwyQkFBMkIsQ0FBQzs7OztBQTRCaEcsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQyxJQUFhLFNBQVMsQ0FBQyxLQUEyQjtRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUMxQixDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLEtBQXFDLENBQUMsQ0FBQztRQUMzRSxDQUFDO0lBQ0gsQ0FBQztJQVFELElBQUksV0FBVztRQUNiLE9BQU8sUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVELFlBQVksTUFBcUI7UUFOakMsZUFBVSxHQUF5QixLQUFLLENBQUM7UUFPdkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELG9CQUFvQjtRQUNsQixPQUFPLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDdkMsQ0FBQzs4R0F6QlUseUJBQXlCO2tHQUF6Qix5QkFBeUIsbWVDL0J0Qyx1TkFLQTs7MkZEMEJhLHlCQUF5QjtrQkExQnJDLFNBQVM7K0JBQ0UsbUJBQW1CLG1CQUNaLHVCQUF1QixDQUFDLE1BQU0sUUFFekM7d0JBQ0osV0FBVyxFQUFFLFdBQVc7d0JBQ3hCLFNBQVMsRUFDUCxnSkFBZ0o7d0JBQ2xKLGNBQWMsRUFBRSxvQkFBb0I7d0JBQ3BDLGFBQWEsRUFBRSxtQkFBbUI7d0JBQ2xDLElBQUksRUFBRSxTQUFTO3dCQUNmLEtBQUssRUFBRSxrQ0FBa0M7cUJBQzFDO2tGQWVZLFNBQVM7c0JBQXJCLEtBQUs7Z0JBUUcsS0FBSztzQkFBYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIElucHV0LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgUG9wb3ZlckNvbmZpZyB9IGZyb20gJy4vcG9wb3Zlci5jb25maWcnO1xyXG5pbXBvcnQgeyBnZXRCc1ZlciwgSUJzVmVyc2lvbiB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xyXG5pbXBvcnQgeyBQbGFjZW1lbnRGb3JCczUsIGNoZWNrTWFyZ2lucywgQXZhaWxhYmxlQlNQb3NpdGlvbnMgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAncG9wb3Zlci1jb250YWluZXInLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxyXG4gIGhvc3Q6IHtcclxuICAgICdbYXR0ci5pZF0nOiAncG9wb3ZlcklkJyxcclxuICAgICdbY2xhc3NdJzpcclxuICAgICAgJ1wicG9wb3ZlciBpbiBwb3BvdmVyLVwiICsgX3BsYWNlbWVudCArIFwiIFwiICsgXCJicy1wb3BvdmVyLVwiICsgX3BsYWNlbWVudCArIFwiIFwiICsgX3BsYWNlbWVudCArIFwiIFwiICsgY29udGFpbmVyQ2xhc3MgKyBcIiBcIiArIGNoZWNrTWFyZ2luTmVjZXNzaXR5KCknLFxyXG4gICAgJ1tjbGFzcy5zaG93XSc6ICchX2JzVmVyc2lvbnMuaXNCczMnLFxyXG4gICAgJ1tjbGFzcy5iczNdJzogJ19ic1ZlcnNpb25zLmlzQnMzJyxcclxuICAgIHJvbGU6ICd0b29sdGlwJyxcclxuICAgIHN0eWxlOiAnZGlzcGxheTpibG9jazsgcG9zaXRpb246YWJzb2x1dGUnXHJcbiAgfSxcclxuICBzdHlsZXM6IFtcclxuICAgIGBcclxuICAgICAgOmhvc3QucG9wb3Zlci5ib3R0b20gPiAuYXJyb3cge1xyXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAtNHB4O1xyXG4gICAgICB9XHJcblxyXG4gICAgICA6aG9zdCAucG9wb3Zlci1hcnJvdyB7XHJcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgICB9XHJcbiAgICBgXHJcbiAgXSxcclxuICB0ZW1wbGF0ZVVybDogJy4vcG9wb3Zlci1jb250YWluZXIuY29tcG9uZW50Lmh0bWwnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBQb3BvdmVyQ29udGFpbmVyQ29tcG9uZW50IHtcclxuICBASW5wdXQoKSBzZXQgcGxhY2VtZW50KHZhbHVlOiBBdmFpbGFibGVCU1Bvc2l0aW9ucykge1xyXG4gICAgaWYgKCF0aGlzLl9ic1ZlcnNpb25zLmlzQnM1KSB7XHJcbiAgICAgIHRoaXMuX3BsYWNlbWVudCA9IHZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fcGxhY2VtZW50ID0gUGxhY2VtZW50Rm9yQnM1W3ZhbHVlIGFzIGtleW9mIHR5cGVvZiBQbGFjZW1lbnRGb3JCczVdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQElucHV0KCkgdGl0bGU/OiBzdHJpbmc7XHJcblxyXG4gIGNvbnRhaW5lckNsYXNzPzogc3RyaW5nO1xyXG4gIHBvcG92ZXJJZD86IHN0cmluZztcclxuICBfcGxhY2VtZW50OiBBdmFpbGFibGVCU1Bvc2l0aW9ucyA9ICd0b3AnO1xyXG5cclxuICBnZXQgX2JzVmVyc2lvbnMoKTogSUJzVmVyc2lvbiB7XHJcbiAgICByZXR1cm4gZ2V0QnNWZXIoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogUG9wb3ZlckNvbmZpZykge1xyXG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xyXG4gIH1cclxuXHJcbiAgY2hlY2tNYXJnaW5OZWNlc3NpdHkoKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBjaGVja01hcmdpbnModGhpcy5fcGxhY2VtZW50KTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiBjbGFzcz1cInBvcG92ZXItYXJyb3cgYXJyb3dcIj48L2Rpdj5cclxuPGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZSBwb3BvdmVyLWhlYWRlclwiICpuZ0lmPVwidGl0bGVcIj57eyB0aXRsZSB9fTwvaDM+XHJcbjxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnQgcG9wb3Zlci1ib2R5XCI+XHJcbiAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG48L2Rpdj5cclxuIl19