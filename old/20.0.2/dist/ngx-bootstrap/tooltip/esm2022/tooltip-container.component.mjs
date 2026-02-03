import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TooltipConfig } from './tooltip.config';
import { getBsVer } from 'ngx-bootstrap/utils';
import { PlacementForBs5 } from 'ngx-bootstrap/positioning';
import * as i0 from "@angular/core";
import * as i1 from "./tooltip.config";
export class TooltipContainerComponent {
    get _bsVersions() {
        return getBsVer();
    }
    constructor(config) {
        Object.assign(this, config);
    }
    ngAfterViewInit() {
        this.classMap = { in: false, fade: false };
        if (this.placement) {
            if (this._bsVersions.isBs5) {
                this.placement = PlacementForBs5[this.placement];
            }
            this.classMap[this.placement] = true;
        }
        this.classMap[`tooltip-${this.placement}`] = true;
        this.classMap["in"] = true;
        if (this.animation) {
            this.classMap["fade"] = true;
        }
        if (this.containerClass) {
            this.classMap[this.containerClass] = true;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TooltipContainerComponent, deps: [{ token: i1.TooltipConfig }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: TooltipContainerComponent, selector: "bs-tooltip-container", host: { attributes: { "role": "tooltip" }, properties: { "class": "\"show tooltip in tooltip-\" + placement + \" \" + \"bs-tooltip-\" + placement + \" \" + placement + \" \" + containerClass", "attr.id": "this.id" } }, ngImport: i0, template: `
    <div class="tooltip-arrow arrow"></div>
    <div class="tooltip-inner"><ng-content></ng-content></div>
    `, isInline: true, styles: [":host.tooltip{display:block;pointer-events:none;position:absolute}:host.tooltip .tooltip-arrow{position:absolute}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TooltipContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bs-tooltip-container', changeDetection: ChangeDetectionStrategy.OnPush, host: {
                        '[class]': '"show tooltip in tooltip-" + placement + " " + "bs-tooltip-" + placement + " " + placement + " " + containerClass',
                        '[attr.id]': 'this.id',
                        role: 'tooltip'
                    }, template: `
    <div class="tooltip-arrow arrow"></div>
    <div class="tooltip-inner"><ng-content></ng-content></div>
    `, styles: [":host.tooltip{display:block;pointer-events:none;position:absolute}:host.tooltip .tooltip-arrow{position:absolute}\n"] }]
        }], ctorParameters: () => [{ type: i1.TooltipConfig }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC1jb250YWluZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Rvb2x0aXAvdG9vbHRpcC1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUUsUUFBUSxFQUFjLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7QUE4QjVELE1BQU0sT0FBTyx5QkFBeUI7SUFPcEMsSUFBSSxXQUFXO1FBQ2IsT0FBTyxRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRUQsWUFBWSxNQUFxQjtRQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQztRQUMzQyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxTQUF5QyxDQUFDLENBQUM7WUFDcEYsQ0FBQztZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN2QyxDQUFDO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUVsRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMzQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztRQUMvQixDQUFDO1FBRUQsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDOzhHQWxDVSx5QkFBeUI7a0dBQXpCLHlCQUF5Qix1UkFMMUI7OztLQUdQOzsyRkFFUSx5QkFBeUI7a0JBNUJyQyxTQUFTOytCQUNFLHNCQUFzQixtQkFDZix1QkFBdUIsQ0FBQyxNQUFNLFFBRXpDO3dCQUNKLFNBQVMsRUFDUCxtSEFBbUg7d0JBQ3JILFdBQVcsRUFBRSxTQUFTO3dCQUN0QixJQUFJLEVBQUUsU0FBUztxQkFDaEIsWUFjUzs7O0tBR1AiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ29tcG9uZW50LFxyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IFRvb2x0aXBDb25maWcgfSBmcm9tICcuL3Rvb2x0aXAuY29uZmlnJztcclxuaW1wb3J0IHsgZ2V0QnNWZXIsIElCc1ZlcnNpb24gfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcclxuaW1wb3J0IHsgUGxhY2VtZW50Rm9yQnM1IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2JzLXRvb2x0aXAtY29udGFpbmVyJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzXSc6XHJcbiAgICAgICdcInNob3cgdG9vbHRpcCBpbiB0b29sdGlwLVwiICsgcGxhY2VtZW50ICsgXCIgXCIgKyBcImJzLXRvb2x0aXAtXCIgKyBwbGFjZW1lbnQgKyBcIiBcIiArIHBsYWNlbWVudCArIFwiIFwiICsgY29udGFpbmVyQ2xhc3MnLFxyXG4gICAgJ1thdHRyLmlkXSc6ICd0aGlzLmlkJyxcclxuICAgIHJvbGU6ICd0b29sdGlwJ1xyXG4gIH0sXHJcbiAgc3R5bGVzOiBbXHJcbiAgICBgXHJcbiAgICA6aG9zdC50b29sdGlwIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xyXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB9XHJcblxyXG4gICAgOmhvc3QudG9vbHRpcCAudG9vbHRpcC1hcnJvdyB7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIH1cclxuICBgXHJcbiAgXSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3cgYXJyb3dcIj48L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PjwvZGl2PlxyXG4gICAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgVG9vbHRpcENvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xyXG4gIGNsYXNzTWFwPzogeyBba2V5OiBzdHJpbmddOiBib29sZWFuIH07XHJcbiAgcGxhY2VtZW50Pzogc3RyaW5nO1xyXG4gIGNvbnRhaW5lckNsYXNzPzogc3RyaW5nO1xyXG4gIGFuaW1hdGlvbj86IGJvb2xlYW47XHJcbiAgaWQ/OiBzdHJpbmc7XHJcblxyXG4gIGdldCBfYnNWZXJzaW9ucygpOiBJQnNWZXJzaW9uIHtcclxuICAgIHJldHVybiBnZXRCc1ZlcigpO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoY29uZmlnOiBUb29sdGlwQ29uZmlnKSB7XHJcbiAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbmZpZyk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsYXNzTWFwID0geyBpbjogZmFsc2UsIGZhZGU6IGZhbHNlIH07XHJcbiAgICBpZiAodGhpcy5wbGFjZW1lbnQpIHtcclxuICAgICAgaWYgKHRoaXMuX2JzVmVyc2lvbnMuaXNCczUpIHtcclxuICAgICAgICB0aGlzLnBsYWNlbWVudCA9ICBQbGFjZW1lbnRGb3JCczVbdGhpcy5wbGFjZW1lbnQgYXMga2V5b2YgdHlwZW9mIFBsYWNlbWVudEZvckJzNV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuY2xhc3NNYXBbdGhpcy5wbGFjZW1lbnRdID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuY2xhc3NNYXBbYHRvb2x0aXAtJHt0aGlzLnBsYWNlbWVudH1gXSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5jbGFzc01hcFtcImluXCJdID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmFuaW1hdGlvbikge1xyXG4gICAgICB0aGlzLmNsYXNzTWFwW1wiZmFkZVwiXSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuY29udGFpbmVyQ2xhc3MpIHtcclxuICAgICAgdGhpcy5jbGFzc01hcFt0aGlzLmNvbnRhaW5lckNsYXNzXSA9IHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiJdfQ==