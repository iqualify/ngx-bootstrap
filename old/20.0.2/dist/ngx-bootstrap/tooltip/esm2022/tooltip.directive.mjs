import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, ViewContainerRef } from '@angular/core';
import { TooltipContainerComponent } from './tooltip-container.component';
import { TooltipConfig } from './tooltip.config';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { OnChange, warnOnce, parseTriggers } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { timer } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/component-loader";
import * as i2 from "./tooltip.config";
import * as i3 from "ngx-bootstrap/positioning";
let id = 0;
export class TooltipDirective {
    /**
     * Returns whether or not the tooltip is currently being shown
     */
    get isOpen() {
        return this._tooltip.isShown;
    }
    set isOpen(value) {
        if (value) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    /** @deprecated - please use `tooltip` instead */
    set htmlContent(value) {
        warnOnce('tooltipHtml was deprecated, please use `tooltip` instead');
        this.tooltip = value;
    }
    /** @deprecated - please use `placement` instead */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _placement(value) {
        warnOnce('tooltipPlacement was deprecated, please use `placement` instead');
        this.placement = value;
    }
    /** @deprecated - please use `isOpen` instead */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _isOpen(value) {
        warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
        this.isOpen = value;
    }
    get _isOpen() {
        warnOnce('tooltipIsOpen was deprecated, please use `isOpen` instead');
        return this.isOpen;
    }
    /** @deprecated - please use `isDisabled` instead */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _enable(value) {
        warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
        this.isDisabled = !value;
    }
    get _enable() {
        warnOnce('tooltipEnable was deprecated, please use `isDisabled` instead');
        return this.isDisabled;
    }
    /** @deprecated - please use `container="body"` instead */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _appendToBody(value) {
        warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
        this.container = value ? 'body' : this.container;
    }
    get _appendToBody() {
        warnOnce('tooltipAppendToBody was deprecated, please use `container="body"` instead');
        return this.container === 'body';
    }
    /** @deprecated - will replaced with customClass */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _popupClass(value) {
        warnOnce('tooltipClass deprecated');
    }
    /** @deprecated - removed */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _tooltipContext(value) {
        warnOnce('tooltipContext deprecated');
    }
    /** @deprecated */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    set _tooltipPopupDelay(value) {
        warnOnce('tooltipPopupDelay is deprecated, use `delay` instead');
        this.delay = value;
    }
    /** @deprecated -  please use `triggers` instead */
    get _tooltipTrigger() {
        warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
        return this.triggers;
    }
    set _tooltipTrigger(value) {
        warnOnce('tooltipTrigger was deprecated, please use `triggers` instead');
        this.triggers = (value || '').toString();
    }
    constructor(_viewContainerRef, cis, config, _elementRef, _renderer, _positionService) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._positionService = _positionService;
        this.tooltipId = id++;
        /** sets disable adaptive position */
        this.adaptivePosition = true;
        /** Fired when tooltip content changes */
        this.tooltipChange = new EventEmitter();
        /**
         * Placement of a tooltip. Accepts: "top", "bottom", "left", "right"
         */
        this.placement = 'top';
        /**
         * Specifies events that should trigger. Supports a space separated list of
         * event names.
         */
        this.triggers = 'hover focus';
        /**
         * Css class for tooltip container
         */
        this.containerClass = '';
        /**
         * Allows to disable tooltip
         */
        this.isDisabled = false;
        /**
         * Delay before showing the tooltip
         */
        this.delay = 0;
        /** @deprecated - removed, will be added to configuration */
        this.tooltipAnimation = true;
        /** @deprecated */
        this.tooltipFadeDuration = 150;
        /** @deprecated */
        this.tooltipStateChanged = new EventEmitter();
        this._tooltip = cis
            .createLoader(this._elementRef, _viewContainerRef, this._renderer)
            .provide({ provide: TooltipConfig, useValue: config });
        Object.assign(this, config);
        this.onShown = this._tooltip.onShown;
        this.onHidden = this._tooltip.onHidden;
    }
    ngOnInit() {
        this._tooltip.listen({
            triggers: this.triggers,
            show: () => this.show()
        });
        this.tooltipChange.subscribe((value) => {
            if (!value) {
                this._tooltip.hide();
            }
        });
        this.onShown.subscribe(() => {
            this.setAriaDescribedBy();
        });
        this.onHidden.subscribe(() => {
            this.setAriaDescribedBy();
        });
    }
    setAriaDescribedBy() {
        this._ariaDescribedby = this.isOpen ? `tooltip-${this.tooltipId}` : void 0;
        if (this._ariaDescribedby) {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-describedby', this._ariaDescribedby);
        }
        else {
            this._renderer.removeAttribute(this._elementRef.nativeElement, 'aria-describedby');
        }
    }
    /**
     * Toggles an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    toggle() {
        if (this.isOpen) {
            return this.hide();
        }
        this.show();
    }
    /**
     * Opens an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    show() {
        this._positionService.setOptions({
            modifiers: {
                flip: {
                    enabled: this.adaptivePosition
                },
                preventOverflow: {
                    enabled: this.adaptivePosition,
                    boundariesElement: this.boundariesElement || 'scrollParent'
                }
            }
        });
        if (this.isOpen || this.isDisabled || this._delayTimeoutId || !this.tooltip) {
            return;
        }
        const showTooltip = () => {
            if (this._delayTimeoutId) {
                this._delayTimeoutId = undefined;
            }
            this._tooltip
                .attach(TooltipContainerComponent)
                .to(this.container)
                .position({ attachment: this.placement })
                .show({
                content: this.tooltip,
                placement: this.placement,
                containerClass: this.containerClass,
                id: `tooltip-${this.tooltipId}`
            });
        };
        const cancelDelayedTooltipShowing = () => {
            if (this._tooltipCancelShowFn) {
                this._tooltipCancelShowFn();
            }
        };
        if (this.delay) {
            if (this._delaySubscription) {
                this._delaySubscription.unsubscribe();
            }
            this._delaySubscription = timer(this.delay).subscribe(() => {
                showTooltip();
                cancelDelayedTooltipShowing();
            });
            if (this.triggers) {
                parseTriggers(this.triggers).forEach((trigger) => {
                    if (!trigger.close) {
                        return;
                    }
                    this._tooltipCancelShowFn = this._renderer.listen(this._elementRef.nativeElement, trigger.close, () => {
                        this._delaySubscription?.unsubscribe();
                        cancelDelayedTooltipShowing();
                    });
                });
            }
        }
        else {
            showTooltip();
        }
    }
    /**
     * Closes an element’s tooltip. This is considered a “manual” triggering of
     * the tooltip.
     */
    hide() {
        if (this._delayTimeoutId) {
            clearTimeout(this._delayTimeoutId);
            this._delayTimeoutId = undefined;
        }
        if (!this._tooltip.isShown) {
            return;
        }
        if (this._tooltip.instance?.classMap) {
            this._tooltip.instance.classMap['in'] = false;
        }
        setTimeout(() => {
            this._tooltip.hide();
        }, this.tooltipFadeDuration);
    }
    ngOnDestroy() {
        this._tooltip.dispose();
        this.tooltipChange.unsubscribe();
        if (this._delaySubscription) {
            this._delaySubscription.unsubscribe();
        }
        this.onShown.unsubscribe();
        this.onHidden.unsubscribe();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TooltipDirective, deps: [{ token: i0.ViewContainerRef }, { token: i1.ComponentLoaderFactory }, { token: i2.TooltipConfig }, { token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i3.PositioningService }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.1", type: TooltipDirective, selector: "[tooltip], [tooltipHtml]", inputs: { adaptivePosition: "adaptivePosition", tooltip: "tooltip", placement: "placement", triggers: "triggers", container: "container", containerClass: "containerClass", boundariesElement: "boundariesElement", isOpen: "isOpen", isDisabled: "isDisabled", delay: "delay", htmlContent: ["tooltipHtml", "htmlContent"], _placement: ["tooltipPlacement", "_placement"], _isOpen: ["tooltipIsOpen", "_isOpen"], _enable: ["tooltipEnable", "_enable"], _appendToBody: ["tooltipAppendToBody", "_appendToBody"], tooltipAnimation: "tooltipAnimation", _popupClass: ["tooltipClass", "_popupClass"], _tooltipContext: ["tooltipContext", "_tooltipContext"], _tooltipPopupDelay: ["tooltipPopupDelay", "_tooltipPopupDelay"], tooltipFadeDuration: "tooltipFadeDuration", _tooltipTrigger: ["tooltipTrigger", "_tooltipTrigger"] }, outputs: { tooltipChange: "tooltipChange", onShown: "onShown", onHidden: "onHidden", tooltipStateChanged: "tooltipStateChanged" }, exportAs: ["bs-tooltip"], ngImport: i0 }); }
}
__decorate([
    OnChange(),
    __metadata("design:type", Object)
], TooltipDirective.prototype, "tooltip", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TooltipDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[tooltip], [tooltipHtml]',
                    exportAs: 'bs-tooltip'
                }]
        }], ctorParameters: () => [{ type: i0.ViewContainerRef }, { type: i1.ComponentLoaderFactory }, { type: i2.TooltipConfig }, { type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i3.PositioningService }], propDecorators: { adaptivePosition: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], tooltipChange: [{
                type: Output
            }], placement: [{
                type: Input
            }], triggers: [{
                type: Input
            }], container: [{
                type: Input
            }], containerClass: [{
                type: Input
            }], boundariesElement: [{
                type: Input
            }], isOpen: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], delay: [{
                type: Input
            }], onShown: [{
                type: Output
            }], onHidden: [{
                type: Output
            }], htmlContent: [{
                type: Input,
                args: ['tooltipHtml']
            }], _placement: [{
                type: Input,
                args: ['tooltipPlacement']
            }], _isOpen: [{
                type: Input,
                args: ['tooltipIsOpen']
            }], _enable: [{
                type: Input,
                args: ['tooltipEnable']
            }], _appendToBody: [{
                type: Input,
                args: ['tooltipAppendToBody']
            }], tooltipAnimation: [{
                type: Input
            }], _popupClass: [{
                type: Input,
                args: ['tooltipClass']
            }], _tooltipContext: [{
                type: Input,
                args: ['tooltipContext']
            }], _tooltipPopupDelay: [{
                type: Input,
                args: ['tooltipPopupDelay']
            }], tooltipFadeDuration: [{
                type: Input
            }], _tooltipTrigger: [{
                type: Input,
                args: ['tooltipTrigger']
            }], tooltipStateChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdG9vbHRpcC90b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFHTCxNQUFNLEVBQ04sU0FBUyxFQUVULGdCQUFnQixFQUNqQixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUseUJBQXlCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFFakQsT0FBTyxFQUFtQixzQkFBc0IsRUFBRSxNQUFNLGdDQUFnQyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBVyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRS9ELE9BQU8sRUFBRSxLQUFLLEVBQWdCLE1BQU0sTUFBTSxDQUFDOzs7OztBQUczQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFNWCxNQUFNLE9BQU8sZ0JBQWdCO0lBZ0MzQjs7T0FFRztJQUNILElBQ0ksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUM7SUFDL0IsQ0FBQztJQUVELElBQUksTUFBTSxDQUFDLEtBQWM7UUFDdkIsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNkLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFxQkQsaURBQWlEO0lBQ2pELElBQ0ksV0FBVyxDQUFDLEtBQW9DO1FBQ2xELFFBQVEsQ0FBQywwREFBMEQsQ0FBQyxDQUFDO1FBQ3JFLElBQUks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QUtJLE9BQU87c0JBQWhCLE1BQU07Z0JBSUcsUUFBUTtzQkFBakIsTUFBTTtnQkFJSCxXQUFXO3NCQURkLEtBQUs7dUJBQUMsYUFBYTtnQkFTaEIsVUFBVTtzQkFEYixLQUFLO3VCQUFDLGtCQUFrQjtnQkFTckIsT0FBTztzQkFEVixLQUFLO3VCQUFDLGVBQWU7Z0JBZWxCLE9BQU87c0JBRFYsS0FBSzt1QkFBQyxlQUFlO2dCQWVsQixhQUFhO3NCQURoQixLQUFLO3VCQUFDLHFCQUFxQjtnQkFhbkIsZ0JBQWdCO3NCQUF4QixLQUFLO2dCQUtGLFdBQVc7c0JBRGQsS0FBSzt1QkFBQyxjQUFjO2dCQVFqQixlQUFlO3NCQURsQixLQUFLO3VCQUFDLGdCQUFnQjtnQkFRbkIsa0JBQWtCO3NCQURyQixLQUFLO3VCQUFDLG1CQUFtQjtnQkFPakIsbUJBQW1CO3NCQUEzQixLQUFLO2dCQUlGLGVBQWU7c0JBRGxCLEtBQUs7dUJBQUMsZ0JBQWdCO2dCQWN2QixtQkFBbUI7c0JBRGxCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgT25Jbml0LFxyXG4gIE91dHB1dCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NvbnRhaW5lclJlZlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgVG9vbHRpcENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdG9vbHRpcC1jb250YWluZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVG9vbHRpcENvbmZpZyB9IGZyb20gJy4vdG9vbHRpcC5jb25maWcnO1xyXG5cclxuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyLCBDb21wb25lbnRMb2FkZXJGYWN0b3J5IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyJztcclxuaW1wb3J0IHsgT25DaGFuZ2UsIHdhcm5PbmNlLCBwYXJzZVRyaWdnZXJzLCBUcmlnZ2VyIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC91dGlscyc7XHJcbmltcG9ydCB7IFBvc2l0aW9uaW5nU2VydmljZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xyXG5cclxuaW1wb3J0IHsgdGltZXIsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBBdmFpbGFibGVCU1Bvc2l0aW9ucyB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xyXG5cclxubGV0IGlkID0gMDtcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gIHNlbGVjdG9yOiAnW3Rvb2x0aXBdLCBbdG9vbHRpcEh0bWxdJyxcclxuICBleHBvcnRBczogJ2JzLXRvb2x0aXAnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUb29sdGlwRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIHRvb2x0aXBJZCA9IGlkKys7XHJcbiAgLyoqIHNldHMgZGlzYWJsZSBhZGFwdGl2ZSBwb3NpdGlvbiAqL1xyXG4gIEBJbnB1dCgpIGFkYXB0aXZlUG9zaXRpb24gPSB0cnVlO1xyXG4gIC8qKlxyXG4gICAqIENvbnRlbnQgdG8gYmUgZGlzcGxheWVkIGFzIHRvb2x0aXAuXHJcbiAgICovXHJcbiAgQE9uQ2hhbmdlKClcclxuICBASW5wdXQoKVxyXG4gIHRvb2x0aXA/OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjx1bmtub3duPjtcclxuICAvKiogRmlyZWQgd2hlbiB0b29sdGlwIGNvbnRlbnQgY2hhbmdlcyAqL1xyXG4gIEBPdXRwdXQoKVxyXG4gIHRvb2x0aXBDaGFuZ2U6IEV2ZW50RW1pdHRlcjxzdHJpbmcgfCBUZW1wbGF0ZVJlZjx1bmtub3duPj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFBsYWNlbWVudCBvZiBhIHRvb2x0aXAuIEFjY2VwdHM6IFwidG9wXCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLCBcInJpZ2h0XCJcclxuICAgKi9cclxuICBASW5wdXQoKSBwbGFjZW1lbnQ6IEF2YWlsYWJsZUJTUG9zaXRpb25zID0gJ3RvcCc7XHJcbiAgLyoqXHJcbiAgICogU3BlY2lmaWVzIGV2ZW50cyB0aGF0IHNob3VsZCB0cmlnZ2VyLiBTdXBwb3J0cyBhIHNwYWNlIHNlcGFyYXRlZCBsaXN0IG9mXHJcbiAgICogZXZlbnQgbmFtZXMuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHJpZ2dlcnMgPSAnaG92ZXIgZm9jdXMnO1xyXG4gIC8qKlxyXG4gICAqIEEgc2VsZWN0b3Igc3BlY2lmeWluZyB0aGUgZWxlbWVudCB0aGUgdG9vbHRpcCBzaG91bGQgYmUgYXBwZW5kZWQgdG8uXHJcbiAgICovXHJcbiAgQElucHV0KCkgY29udGFpbmVyPzogc3RyaW5nO1xyXG4gIC8qKlxyXG4gICAqIENzcyBjbGFzcyBmb3IgdG9vbHRpcCBjb250YWluZXJcclxuICAgKi9cclxuICBASW5wdXQoKSBjb250YWluZXJDbGFzcyA9ICcnO1xyXG4gIEBJbnB1dCgpIGJvdW5kYXJpZXNFbGVtZW50PzogJ3ZpZXdwb3J0JyB8ICdzY3JvbGxQYXJlbnQnIHwgJ3dpbmRvdyc7XHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCB0aGUgdG9vbHRpcCBpcyBjdXJyZW50bHkgYmVpbmcgc2hvd25cclxuICAgKi9cclxuICBASW5wdXQoKVxyXG4gIGdldCBpc09wZW4oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fdG9vbHRpcC5pc1Nob3duO1xyXG4gIH1cclxuXHJcbiAgc2V0IGlzT3Blbih2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBbGxvd3MgdG8gZGlzYWJsZSB0b29sdGlwXHJcbiAgICovXHJcbiAgQElucHV0KCkgaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAvKipcclxuICAgKiBEZWxheSBiZWZvcmUgc2hvd2luZyB0aGUgdG9vbHRpcFxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGRlbGF5ID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBzaG93blxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSBvblNob3duOiBFdmVudEVtaXR0ZXI8dW5rbm93bj47XHJcbiAgLyoqXHJcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgdG9vbHRpcCBpcyBoaWRkZW5cclxuICAgKi9cclxuICBAT3V0cHV0KCkgb25IaWRkZW46IEV2ZW50RW1pdHRlcjx1bmtub3duPjtcclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgdG9vbHRpcGAgaW5zdGVhZCAqL1xyXG4gIEBJbnB1dCgndG9vbHRpcEh0bWwnKVxyXG4gIHNldCBodG1sQ29udGVudCh2YWx1ZTogc3RyaW5nIHwgVGVtcGxhdGVSZWY8dW5rbm93bj4pIHtcclxuICAgIHdhcm5PbmNlKCd0b29sdGlwSHRtbCB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgdG9vbHRpcGAgaW5zdGVhZCcpO1xyXG4gICAgdGhpcy50b29sdGlwID0gdmFsdWU7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgLSBwbGVhc2UgdXNlIGBwbGFjZW1lbnRgIGluc3RlYWQgKi9cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgndG9vbHRpcFBsYWNlbWVudCcpXHJcbiAgc2V0IF9wbGFjZW1lbnQodmFsdWU6IEF2YWlsYWJsZUJTUG9zaXRpb25zKSB7XHJcbiAgICB3YXJuT25jZSgndG9vbHRpcFBsYWNlbWVudCB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgcGxhY2VtZW50YCBpbnN0ZWFkJyk7XHJcbiAgICB0aGlzLnBsYWNlbWVudCA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgaXNPcGVuYCBpbnN0ZWFkICovXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ3Rvb2x0aXBJc09wZW4nKVxyXG4gIHNldCBfaXNPcGVuKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB3YXJuT25jZSgndG9vbHRpcElzT3BlbiB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgaXNPcGVuYCBpbnN0ZWFkJyk7XHJcbiAgICB0aGlzLmlzT3BlbiA9IHZhbHVlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IF9pc09wZW4oKTogYm9vbGVhbiB7XHJcbiAgICB3YXJuT25jZSgndG9vbHRpcElzT3BlbiB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgaXNPcGVuYCBpbnN0ZWFkJyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuaXNPcGVuO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgaXNEaXNhYmxlZGAgaW5zdGVhZCAqL1xyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taW5wdXQtcmVuYW1lXHJcbiAgQElucHV0KCd0b29sdGlwRW5hYmxlJylcclxuICBzZXQgX2VuYWJsZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBFbmFibGUgd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGlzRGlzYWJsZWRgIGluc3RlYWQnKTtcclxuICAgIHRoaXMuaXNEaXNhYmxlZCA9ICF2YWx1ZTtcclxuICB9XHJcblxyXG4gIGdldCBfZW5hYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBFbmFibGUgd2FzIGRlcHJlY2F0ZWQsIHBsZWFzZSB1c2UgYGlzRGlzYWJsZWRgIGluc3RlYWQnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5pc0Rpc2FibGVkO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBkZXByZWNhdGVkIC0gcGxlYXNlIHVzZSBgY29udGFpbmVyPVwiYm9keVwiYCBpbnN0ZWFkICovXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ3Rvb2x0aXBBcHBlbmRUb0JvZHknKVxyXG4gIHNldCBfYXBwZW5kVG9Cb2R5KHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICB3YXJuT25jZSgndG9vbHRpcEFwcGVuZFRvQm9keSB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgY29udGFpbmVyPVwiYm9keVwiYCBpbnN0ZWFkJyk7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IHZhbHVlID8gJ2JvZHknIDogdGhpcy5jb250YWluZXI7XHJcbiAgfVxyXG5cclxuICBnZXQgX2FwcGVuZFRvQm9keSgpOiBib29sZWFuIHtcclxuICAgIHdhcm5PbmNlKCd0b29sdGlwQXBwZW5kVG9Cb2R5IHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGBjb250YWluZXI9XCJib2R5XCJgIGluc3RlYWQnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5jb250YWluZXIgPT09ICdib2R5JztcclxuICB9XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCAtIHJlbW92ZWQsIHdpbGwgYmUgYWRkZWQgdG8gY29uZmlndXJhdGlvbiAqL1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBBbmltYXRpb24gPSB0cnVlO1xyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgLSB3aWxsIHJlcGxhY2VkIHdpdGggY3VzdG9tQ2xhc3MgKi9cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgndG9vbHRpcENsYXNzJylcclxuICBzZXQgX3BvcHVwQ2xhc3ModmFsdWU6IHN0cmluZykge1xyXG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBDbGFzcyBkZXByZWNhdGVkJyk7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgLSByZW1vdmVkICovXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1pbnB1dC1yZW5hbWVcclxuICBASW5wdXQoJ3Rvb2x0aXBDb250ZXh0JylcclxuICBzZXQgX3Rvb2x0aXBDb250ZXh0KHZhbHVlOiB1bmRlZmluZWQpIHtcclxuICAgIHdhcm5PbmNlKCd0b29sdGlwQ29udGV4dCBkZXByZWNhdGVkJyk7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgKi9cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWlucHV0LXJlbmFtZVxyXG4gIEBJbnB1dCgndG9vbHRpcFBvcHVwRGVsYXknKVxyXG4gIHNldCBfdG9vbHRpcFBvcHVwRGVsYXkodmFsdWU6IG51bWJlcikge1xyXG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBQb3B1cERlbGF5IGlzIGRlcHJlY2F0ZWQsIHVzZSBgZGVsYXlgIGluc3RlYWQnKTtcclxuICAgIHRoaXMuZGVsYXkgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCAqL1xyXG4gIEBJbnB1dCgpIHRvb2x0aXBGYWRlRHVyYXRpb24gPSAxNTA7XHJcblxyXG4gIC8qKiBAZGVwcmVjYXRlZCAtICBwbGVhc2UgdXNlIGB0cmlnZ2Vyc2AgaW5zdGVhZCAqL1xyXG4gIEBJbnB1dCgndG9vbHRpcFRyaWdnZXInKVxyXG4gIGdldCBfdG9vbHRpcFRyaWdnZXIoKTogc3RyaW5nIHwgc3RyaW5nW10ge1xyXG4gICAgd2Fybk9uY2UoJ3Rvb2x0aXBUcmlnZ2VyIHdhcyBkZXByZWNhdGVkLCBwbGVhc2UgdXNlIGB0cmlnZ2Vyc2AgaW5zdGVhZCcpO1xyXG5cclxuICAgIHJldHVybiB0aGlzLnRyaWdnZXJzO1xyXG4gIH1cclxuXHJcbiAgc2V0IF90b29sdGlwVHJpZ2dlcih2YWx1ZTogc3RyaW5nIHwgc3RyaW5nW10pIHtcclxuICAgIHdhcm5PbmNlKCd0b29sdGlwVHJpZ2dlciB3YXMgZGVwcmVjYXRlZCwgcGxlYXNlIHVzZSBgdHJpZ2dlcnNgIGluc3RlYWQnKTtcclxuICAgIHRoaXMudHJpZ2dlcnMgPSAodmFsdWUgfHwgJycpLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgKi9cclxuICBAT3V0cHV0KClcclxuICB0b29sdGlwU3RhdGVDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gIHByb3RlY3RlZCBfZGVsYXlUaW1lb3V0SWQ/OiBudW1iZXI7XHJcbiAgcHJvdGVjdGVkIF90b29sdGlwQ2FuY2VsU2hvd0ZuPzogKCkgPT4gdm9pZDtcclxuXHJcbiAgcHJpdmF0ZSBfdG9vbHRpcDogQ29tcG9uZW50TG9hZGVyPFRvb2x0aXBDb250YWluZXJDb21wb25lbnQ+O1xyXG4gIHByaXZhdGUgX2RlbGF5U3Vic2NyaXB0aW9uPzogU3Vic2NyaXB0aW9uO1xyXG4gIHByaXZhdGUgX2FyaWFEZXNjcmliZWRieT86IHN0cmluZztcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxyXG4gICAgY2lzOiBDb21wb25lbnRMb2FkZXJGYWN0b3J5LFxyXG4gICAgY29uZmlnOiBUb29sdGlwQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIF9wb3NpdGlvblNlcnZpY2U6IFBvc2l0aW9uaW5nU2VydmljZVxyXG4gICkge1xyXG4gICAgdGhpcy5fdG9vbHRpcCA9IGNpc1xyXG4gICAgICAuY3JlYXRlTG9hZGVyPFRvb2x0aXBDb250YWluZXJDb21wb25lbnQ+KHRoaXMuX2VsZW1lbnRSZWYsIF92aWV3Q29udGFpbmVyUmVmLCB0aGlzLl9yZW5kZXJlcilcclxuICAgICAgLnByb3ZpZGUoeyBwcm92aWRlOiBUb29sdGlwQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnIH0pO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcclxuICAgIHRoaXMub25TaG93biA9IHRoaXMuX3Rvb2x0aXAub25TaG93bjtcclxuICAgIHRoaXMub25IaWRkZW4gPSB0aGlzLl90b29sdGlwLm9uSGlkZGVuO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLl90b29sdGlwLmxpc3Rlbih7XHJcbiAgICAgIHRyaWdnZXJzOiB0aGlzLnRyaWdnZXJzLFxyXG4gICAgICBzaG93OiAoKSA9PiB0aGlzLnNob3coKVxyXG4gICAgfSk7XHJcbiAgICB0aGlzLnRvb2x0aXBDaGFuZ2Uuc3Vic2NyaWJlKCh2YWx1ZSkgPT4ge1xyXG4gICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5fdG9vbHRpcC5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub25TaG93bi5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNldEFyaWFEZXNjcmliZWRCeSgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbkhpZGRlbi5zdWJzY3JpYmUoKCkgPT4ge1xyXG4gICAgICB0aGlzLnNldEFyaWFEZXNjcmliZWRCeSgpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRBcmlhRGVzY3JpYmVkQnkoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9hcmlhRGVzY3JpYmVkYnkgPSB0aGlzLmlzT3BlbiA/IGB0b29sdGlwLSR7dGhpcy50b29sdGlwSWR9YCA6IHZvaWQgMDtcclxuXHJcbiAgICBpZiAodGhpcy5fYXJpYURlc2NyaWJlZGJ5KSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5JywgdGhpcy5fYXJpYURlc2NyaWJlZGJ5KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdhcmlhLWRlc2NyaWJlZGJ5Jyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUb2dnbGVzIGFuIGVsZW1lbnTigJlzIHRvb2x0aXAuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mXHJcbiAgICogdGhlIHRvb2x0aXAuXHJcbiAgICovXHJcbiAgdG9nZ2xlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNPcGVuKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNob3coKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wZW5zIGFuIGVsZW1lbnTigJlzIHRvb2x0aXAuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mXHJcbiAgICogdGhlIHRvb2x0aXAuXHJcbiAgICovXHJcbiAgc2hvdygpOiB2b2lkIHtcclxuICAgIHRoaXMuX3Bvc2l0aW9uU2VydmljZS5zZXRPcHRpb25zKHtcclxuICAgICAgbW9kaWZpZXJzOiB7XHJcbiAgICAgICAgZmxpcDoge1xyXG4gICAgICAgICAgZW5hYmxlZDogdGhpcy5hZGFwdGl2ZVBvc2l0aW9uXHJcbiAgICAgICAgfSxcclxuICAgICAgICBwcmV2ZW50T3ZlcmZsb3c6IHtcclxuICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuYWRhcHRpdmVQb3NpdGlvbixcclxuICAgICAgICAgIGJvdW5kYXJpZXNFbGVtZW50OiB0aGlzLmJvdW5kYXJpZXNFbGVtZW50IHx8ICdzY3JvbGxQYXJlbnQnXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAodGhpcy5pc09wZW4gfHwgdGhpcy5pc0Rpc2FibGVkIHx8IHRoaXMuX2RlbGF5VGltZW91dElkIHx8ICF0aGlzLnRvb2x0aXApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHNob3dUb29sdGlwID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fZGVsYXlUaW1lb3V0SWQpIHtcclxuICAgICAgICB0aGlzLl9kZWxheVRpbWVvdXRJZCA9IHVuZGVmaW5lZDtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fdG9vbHRpcFxyXG4gICAgICAgIC5hdHRhY2goVG9vbHRpcENvbnRhaW5lckNvbXBvbmVudClcclxuICAgICAgICAudG8odGhpcy5jb250YWluZXIpXHJcbiAgICAgICAgLnBvc2l0aW9uKHsgYXR0YWNobWVudDogdGhpcy5wbGFjZW1lbnQgfSlcclxuICAgICAgICAuc2hvdyh7XHJcbiAgICAgICAgICBjb250ZW50OiB0aGlzLnRvb2x0aXAsXHJcbiAgICAgICAgICBwbGFjZW1lbnQ6IHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgICAgY29udGFpbmVyQ2xhc3M6IHRoaXMuY29udGFpbmVyQ2xhc3MsXHJcbiAgICAgICAgICBpZDogYHRvb2x0aXAtJHt0aGlzLnRvb2x0aXBJZH1gXHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG4gICAgY29uc3QgY2FuY2VsRGVsYXllZFRvb2x0aXBTaG93aW5nID0gKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5fdG9vbHRpcENhbmNlbFNob3dGbikge1xyXG4gICAgICAgIHRoaXMuX3Rvb2x0aXBDYW5jZWxTaG93Rm4oKTtcclxuICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5kZWxheSkge1xyXG4gICAgICBpZiAodGhpcy5fZGVsYXlTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICB0aGlzLl9kZWxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9kZWxheVN1YnNjcmlwdGlvbiA9IHRpbWVyKHRoaXMuZGVsYXkpLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgICAgc2hvd1Rvb2x0aXAoKTtcclxuICAgICAgICBjYW5jZWxEZWxheWVkVG9vbHRpcFNob3dpbmcoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpZiAodGhpcy50cmlnZ2Vycykge1xyXG4gICAgICAgIHBhcnNlVHJpZ2dlcnModGhpcy50cmlnZ2VycykuZm9yRWFjaCgodHJpZ2dlcjogVHJpZ2dlcikgPT4ge1xyXG4gICAgICAgICAgaWYgKCF0cmlnZ2VyLmNsb3NlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuX3Rvb2x0aXBDYW5jZWxTaG93Rm4gPSB0aGlzLl9yZW5kZXJlci5saXN0ZW4odGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCB0cmlnZ2VyLmNsb3NlLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuX2RlbGF5U3Vic2NyaXB0aW9uPy51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICBjYW5jZWxEZWxheWVkVG9vbHRpcFNob3dpbmcoKTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzaG93VG9vbHRpcCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2VzIGFuIGVsZW1lbnTigJlzIHRvb2x0aXAuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mXHJcbiAgICogdGhlIHRvb2x0aXAuXHJcbiAgICovXHJcbiAgaGlkZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9kZWxheVRpbWVvdXRJZCkge1xyXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5fZGVsYXlUaW1lb3V0SWQpO1xyXG4gICAgICB0aGlzLl9kZWxheVRpbWVvdXRJZCA9IHVuZGVmaW5lZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuX3Rvb2x0aXAuaXNTaG93bikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX3Rvb2x0aXAuaW5zdGFuY2U/LmNsYXNzTWFwKSB7XHJcbiAgICAgIHRoaXMuX3Rvb2x0aXAuaW5zdGFuY2UuY2xhc3NNYXBbJ2luJ10gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5fdG9vbHRpcC5oaWRlKCk7XHJcbiAgICB9LCB0aGlzLnRvb2x0aXBGYWRlRHVyYXRpb24pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLl90b29sdGlwLmRpc3Bvc2UoKTtcclxuICAgIHRoaXMudG9vbHRpcENoYW5nZS51bnN1YnNjcmliZSgpO1xyXG4gICAgaWYgKHRoaXMuX2RlbGF5U3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHRoaXMuX2RlbGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm9uU2hvd24udW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMub25IaWRkZW4udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcbn1cclxuIl19