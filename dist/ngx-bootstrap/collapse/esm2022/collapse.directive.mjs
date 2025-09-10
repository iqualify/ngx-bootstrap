import { AnimationBuilder } from '@angular/animations';
import { Directive, ElementRef, EventEmitter, HostBinding, Input, Output, Renderer2 } from '@angular/core';
import { collapseAnimation, expandAnimation } from './collapse-animations';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations";
export class CollapseDirective {
    set display(value) {
        this._display = value;
        if (value === 'none') {
            this.hide();
            return;
        }
        this.isAnimated ? this.toggle() : this.show();
    }
    /** A flag indicating visibility of content (shown or hidden) */
    set collapse(value) {
        this.collapseNewValue = value;
        if (!this._player || this._isAnimationDone) {
            this.isExpanded = value;
            this.toggle();
        }
    }
    get collapse() {
        return this.isExpanded;
    }
    constructor(_el, _renderer, _builder) {
        this._el = _el;
        this._renderer = _renderer;
        /** This event fires as soon as content collapses */
        this.collapsed = new EventEmitter();
        /** This event fires when collapsing is started */
        this.collapses = new EventEmitter();
        /** This event fires as soon as content becomes visible */
        this.expanded = new EventEmitter();
        /** This event fires when expansion is started */
        this.expands = new EventEmitter();
        // shown
        this.isExpanded = true;
        this.collapseNewValue = true;
        // hidden
        this.isCollapsed = false;
        // stale state
        this.isCollapse = true;
        // animation state
        this.isCollapsing = false;
        /** turn on/off animation */
        this.isAnimated = false;
        this._display = 'block';
        this._stylesLoaded = false;
        this._COLLAPSE_ACTION_NAME = 'collapse';
        this._EXPAND_ACTION_NAME = 'expand';
        this._factoryCollapseAnimation = _builder.build(collapseAnimation);
        this._factoryExpandAnimation = _builder.build(expandAnimation);
    }
    ngAfterViewChecked() {
        this._stylesLoaded = true;
        if (!this._player || !this._isAnimationDone) {
            return;
        }
        this._player.reset();
        this._renderer.setStyle(this._el.nativeElement, 'height', '*');
    }
    /** allows to manually toggle content visibility */
    toggle() {
        if (this.isExpanded) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    /** allows to manually hide content */
    hide() {
        this.isCollapsing = true;
        this.isExpanded = false;
        this.isCollapsed = true;
        this.isCollapsing = false;
        this.collapses.emit(this);
        this._isAnimationDone = false;
        this.animationRun(this.isAnimated, this._COLLAPSE_ACTION_NAME)(() => {
            this._isAnimationDone = true;
            if (this.collapseNewValue !== this.isCollapsed && this.isAnimated) {
                this.show();
                return;
            }
            this.collapsed.emit(this);
            this._renderer.setStyle(this._el.nativeElement, 'display', 'none');
        });
    }
    /** allows to manually show collapsed content */
    show() {
        this._renderer.setStyle(this._el.nativeElement, 'display', this._display);
        this.isCollapsing = true;
        this.isExpanded = true;
        this.isCollapsed = false;
        this.isCollapsing = false;
        this.expands.emit(this);
        this._isAnimationDone = false;
        this.animationRun(this.isAnimated, this._EXPAND_ACTION_NAME)(() => {
            this._isAnimationDone = true;
            if (this.collapseNewValue !== this.isCollapsed && this.isAnimated) {
                this.hide();
                return;
            }
            this.expanded.emit(this);
            this._renderer.removeStyle(this._el.nativeElement, 'overflow');
        });
    }
    animationRun(isAnimated, action) {
        if (!isAnimated || !this._stylesLoaded) {
            return (callback) => callback();
        }
        this._renderer.setStyle(this._el.nativeElement, 'overflow', 'hidden');
        this._renderer.addClass(this._el.nativeElement, 'collapse');
        const factoryAnimation = (action === this._EXPAND_ACTION_NAME)
            ? this._factoryExpandAnimation
            : this._factoryCollapseAnimation;
        if (this._player) {
            this._player.reset();
        }
        this._player = factoryAnimation.create(this._el.nativeElement);
        this._player.play();
        return (callback) => this._player?.onDone(callback);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CollapseDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.AnimationBuilder }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.1", type: CollapseDirective, selector: "[collapse]", inputs: { display: "display", isAnimated: "isAnimated", collapse: "collapse" }, outputs: { collapsed: "collapsed", collapses: "collapses", expanded: "expanded", expands: "expands" }, host: { properties: { "class.collapse": "this.isCollapse", "class.in": "this.isExpanded", "class.show": "this.isExpanded", "attr.aria-hidden": "this.isCollapsed", "class.collapsing": "this.isCollapsing" } }, exportAs: ["bs-collapse"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CollapseDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[collapse]',
                    exportAs: 'bs-collapse',
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        '[class.collapse]': 'true'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.AnimationBuilder }], propDecorators: { collapsed: [{
                type: Output
            }], collapses: [{
                type: Output
            }], expanded: [{
                type: Output
            }], expands: [{
                type: Output
            }], isExpanded: [{
                type: HostBinding,
                args: ['class.in']
            }, {
                type: HostBinding,
                args: ['class.show']
            }], isCollapsed: [{
                type: HostBinding,
                args: ['attr.aria-hidden']
            }], isCollapse: [{
                type: HostBinding,
                args: ['class.collapse']
            }], isCollapsing: [{
                type: HostBinding,
                args: ['class.collapsing']
            }], display: [{
                type: Input
            }], isAnimated: [{
                type: Input
            }], collapse: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGFwc2UuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbGxhcHNlL2NvbGxhcHNlLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsZ0JBQWdCLEVBR2pCLE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFDWCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDaEIsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBVS9CLE1BQU0sT0FBTyxpQkFBaUI7SUFzQjVCLElBQ0ksT0FBTyxDQUFDLEtBQWE7UUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ1osT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNoRCxDQUFDO0lBSUQsZ0VBQWdFO0lBQ2hFLElBQ0ksUUFBUSxDQUFDLEtBQWM7UUFDekIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMzQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDaEIsQ0FBQztJQUNILENBQUM7SUFFRCxJQUFJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7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QU07Z0JBRUcsU0FBUztzQkFBbEIsTUFBTTtnQkFFRyxRQUFRO3NCQUFqQixNQUFNO2dCQUVHLE9BQU87c0JBQWhCLE1BQU07Z0JBS1AsVUFBVTtzQkFIVCxXQUFXO3VCQUFDLFVBQVU7O3NCQUN0QixXQUFXO3VCQUFDLFlBQVk7Z0JBS1EsV0FBVztzQkFBM0MsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBRUEsVUFBVTtzQkFBeEMsV0FBVzt1QkFBQyxnQkFBZ0I7Z0JBRUksWUFBWTtzQkFBNUMsV0FBVzt1QkFBQyxrQkFBa0I7Z0JBRzNCLE9BQU87c0JBRFYsS0FBSztnQkFZRyxVQUFVO3NCQUFsQixLQUFLO2dCQUdGLFFBQVE7c0JBRFgsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQW5pbWF0aW9uQnVpbGRlcixcclxuICBBbmltYXRpb25GYWN0b3J5LFxyXG4gIEFuaW1hdGlvblBsYXllclxyXG59IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBBZnRlclZpZXdDaGVja2VkLFxyXG4gIERpcmVjdGl2ZSxcclxuICBFbGVtZW50UmVmLFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBIb3N0QmluZGluZyxcclxuICBJbnB1dCxcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQge1xyXG4gIGNvbGxhcHNlQW5pbWF0aW9uLFxyXG4gIGV4cGFuZEFuaW1hdGlvblxyXG59IGZyb20gJy4vY29sbGFwc2UtYW5pbWF0aW9ucyc7XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tjb2xsYXBzZV0nLFxyXG4gIGV4cG9ydEFzOiAnYnMtY29sbGFwc2UnLFxyXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAYW5ndWxhci1lc2xpbnQvbm8taG9zdC1tZXRhZGF0YS1wcm9wZXJ0eVxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3MuY29sbGFwc2VdJzogJ3RydWUnXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgQ29sbGFwc2VEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkIHtcclxuICAvKiogVGhpcyBldmVudCBmaXJlcyBhcyBzb29uIGFzIGNvbnRlbnQgY29sbGFwc2VzICovXHJcbiAgQE91dHB1dCgpIGNvbGxhcHNlZDogRXZlbnRFbWl0dGVyPENvbGxhcHNlRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKiogVGhpcyBldmVudCBmaXJlcyB3aGVuIGNvbGxhcHNpbmcgaXMgc3RhcnRlZCAqL1xyXG4gIEBPdXRwdXQoKSBjb2xsYXBzZXM6IEV2ZW50RW1pdHRlcjxDb2xsYXBzZURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLyoqIFRoaXMgZXZlbnQgZmlyZXMgYXMgc29vbiBhcyBjb250ZW50IGJlY29tZXMgdmlzaWJsZSAqL1xyXG4gIEBPdXRwdXQoKSBleHBhbmRlZDogRXZlbnRFbWl0dGVyPENvbGxhcHNlRGlyZWN0aXZlPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcclxuICAvKiogVGhpcyBldmVudCBmaXJlcyB3aGVuIGV4cGFuc2lvbiBpcyBzdGFydGVkICovXHJcbiAgQE91dHB1dCgpIGV4cGFuZHM6IEV2ZW50RW1pdHRlcjxDb2xsYXBzZURpcmVjdGl2ZT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgLy8gc2hvd25cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmluJylcclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLnNob3cnKVxyXG5cclxuICBpc0V4cGFuZGVkID0gdHJ1ZTtcclxuICBjb2xsYXBzZU5ld1ZhbHVlID0gdHJ1ZTtcclxuICAvLyBoaWRkZW5cclxuICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1oaWRkZW4nKSBpc0NvbGxhcHNlZCA9IGZhbHNlO1xyXG4gIC8vIHN0YWxlIHN0YXRlXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jb2xsYXBzZScpIGlzQ29sbGFwc2UgPSB0cnVlO1xyXG4gIC8vIGFuaW1hdGlvbiBzdGF0ZVxyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY29sbGFwc2luZycpIGlzQ29sbGFwc2luZyA9IGZhbHNlO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldCBkaXNwbGF5KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgIHRoaXMuX2Rpc3BsYXkgPSB2YWx1ZTtcclxuICAgIGlmICh2YWx1ZSA9PT0gJ25vbmUnKSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5pc0FuaW1hdGVkID8gdGhpcy50b2dnbGUoKSA6IHRoaXMuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgLyoqIHR1cm4gb24vb2ZmIGFuaW1hdGlvbiAqL1xyXG4gIEBJbnB1dCgpIGlzQW5pbWF0ZWQgPSBmYWxzZTtcclxuICAvKiogQSBmbGFnIGluZGljYXRpbmcgdmlzaWJpbGl0eSBvZiBjb250ZW50IChzaG93biBvciBoaWRkZW4pICovXHJcbiAgQElucHV0KClcclxuICBzZXQgY29sbGFwc2UodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuY29sbGFwc2VOZXdWYWx1ZSA9IHZhbHVlO1xyXG4gICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgdGhpcy5faXNBbmltYXRpb25Eb25lKSB7XHJcbiAgICAgIHRoaXMuaXNFeHBhbmRlZCA9IHZhbHVlO1xyXG4gICAgICB0aGlzLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGNvbGxhcHNlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuaXNFeHBhbmRlZDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Rpc3BsYXkgPSAnYmxvY2snO1xyXG4gIHByaXZhdGUgX2lzQW5pbWF0aW9uRG9uZT86IGJvb2xlYW47XHJcbiAgcHJpdmF0ZSBfcGxheWVyPzogQW5pbWF0aW9uUGxheWVyO1xyXG4gIHByaXZhdGUgX3N0eWxlc0xvYWRlZCA9IGZhbHNlO1xyXG5cclxuICBwcml2YXRlIF9DT0xMQVBTRV9BQ1RJT05fTkFNRSA9ICdjb2xsYXBzZSc7XHJcbiAgcHJpdmF0ZSBfRVhQQU5EX0FDVElPTl9OQU1FID0gJ2V4cGFuZCc7XHJcblxyXG4gIHByaXZhdGUgcmVhZG9ubHkgX2ZhY3RvcnlDb2xsYXBzZUFuaW1hdGlvbjogQW5pbWF0aW9uRmFjdG9yeTtcclxuICBwcml2YXRlIHJlYWRvbmx5IF9mYWN0b3J5RXhwYW5kQW5pbWF0aW9uOiBBbmltYXRpb25GYWN0b3J5O1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIF9idWlsZGVyOiBBbmltYXRpb25CdWlsZGVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9mYWN0b3J5Q29sbGFwc2VBbmltYXRpb24gPSBfYnVpbGRlci5idWlsZChjb2xsYXBzZUFuaW1hdGlvbik7XHJcbiAgICB0aGlzLl9mYWN0b3J5RXhwYW5kQW5pbWF0aW9uID0gX2J1aWxkZXIuYnVpbGQoZXhwYW5kQW5pbWF0aW9uKTtcclxuICB9XHJcblxyXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3N0eWxlc0xvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgaWYgKCF0aGlzLl9wbGF5ZXIgfHwgIXRoaXMuX2lzQW5pbWF0aW9uRG9uZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcGxheWVyLnJlc2V0KCk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgJyonKTtcclxuICB9XHJcblxyXG4gIC8qKiBhbGxvd3MgdG8gbWFudWFsbHkgdG9nZ2xlIGNvbnRlbnQgdmlzaWJpbGl0eSAqL1xyXG4gIHRvZ2dsZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzRXhwYW5kZWQpIHtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3coKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiBhbGxvd3MgdG8gbWFudWFsbHkgaGlkZSBjb250ZW50ICovXHJcbiAgaGlkZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMuaXNFeHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5pc0NvbGxhcHNlZCA9IHRydWU7XHJcbiAgICB0aGlzLmlzQ29sbGFwc2luZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuY29sbGFwc2VzLmVtaXQodGhpcyk7XHJcblxyXG4gICAgdGhpcy5faXNBbmltYXRpb25Eb25lID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5hbmltYXRpb25SdW4odGhpcy5pc0FuaW1hdGVkLCB0aGlzLl9DT0xMQVBTRV9BQ1RJT05fTkFNRSkoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9pc0FuaW1hdGlvbkRvbmUgPSB0cnVlO1xyXG4gICAgICBpZiAodGhpcy5jb2xsYXBzZU5ld1ZhbHVlICE9PSB0aGlzLmlzQ29sbGFwc2VkICYmIHRoaXMuaXNBbmltYXRlZCkge1xyXG4gICAgICAgIHRoaXMuc2hvdygpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5jb2xsYXBzZWQuZW1pdCh0aGlzKTtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIC8qKiBhbGxvd3MgdG8gbWFudWFsbHkgc2hvdyBjb2xsYXBzZWQgY29udGVudCAqL1xyXG4gIHNob3coKTogdm9pZCB7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsIHRoaXMuX2Rpc3BsYXkpO1xyXG5cclxuICAgIHRoaXMuaXNDb2xsYXBzaW5nID0gdHJ1ZTtcclxuICAgIHRoaXMuaXNFeHBhbmRlZCA9IHRydWU7XHJcbiAgICB0aGlzLmlzQ29sbGFwc2VkID0gZmFsc2U7XHJcbiAgICB0aGlzLmlzQ29sbGFwc2luZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZXhwYW5kcy5lbWl0KHRoaXMpO1xyXG5cclxuICAgIHRoaXMuX2lzQW5pbWF0aW9uRG9uZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5hbmltYXRpb25SdW4odGhpcy5pc0FuaW1hdGVkLCB0aGlzLl9FWFBBTkRfQUNUSU9OX05BTUUpKCgpID0+IHtcclxuICAgICAgdGhpcy5faXNBbmltYXRpb25Eb25lID0gdHJ1ZTtcclxuICAgICAgaWYgKHRoaXMuY29sbGFwc2VOZXdWYWx1ZSAhPT0gdGhpcy5pc0NvbGxhcHNlZCAmJiB0aGlzLmlzQW5pbWF0ZWQpIHtcclxuICAgICAgICB0aGlzLmhpZGUoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuZXhwYW5kZWQuZW1pdCh0aGlzKTtcclxuICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlU3R5bGUodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgJ292ZXJmbG93Jyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGFuaW1hdGlvblJ1bihpc0FuaW1hdGVkOiBib29sZWFuLCBhY3Rpb246IHN0cmluZykge1xyXG4gICAgaWYgKCFpc0FuaW1hdGVkIHx8ICF0aGlzLl9zdHlsZXNMb2FkZWQpIHtcclxuICAgICAgcmV0dXJuIChjYWxsYmFjazogKCkgPT4gdm9pZCkgPT4gY2FsbGJhY2soKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnb3ZlcmZsb3cnLCAnaGlkZGVuJyk7XHJcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCAnY29sbGFwc2UnKTtcclxuXHJcbiAgICBjb25zdCBmYWN0b3J5QW5pbWF0aW9uID0gKGFjdGlvbiA9PT0gdGhpcy5fRVhQQU5EX0FDVElPTl9OQU1FKVxyXG4gICAgICA/IHRoaXMuX2ZhY3RvcnlFeHBhbmRBbmltYXRpb25cclxuICAgICAgOiB0aGlzLl9mYWN0b3J5Q29sbGFwc2VBbmltYXRpb247XHJcblxyXG4gICAgaWYgKHRoaXMuX3BsYXllcikge1xyXG4gICAgICB0aGlzLl9wbGF5ZXIucmVzZXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9wbGF5ZXIgPSBmYWN0b3J5QW5pbWF0aW9uLmNyZWF0ZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcclxuICAgIHRoaXMuX3BsYXllci5wbGF5KCk7XHJcblxyXG4gICAgcmV0dXJuIChjYWxsYmFjazogKCkgPT4gdm9pZCkgPT4gdGhpcy5fcGxheWVyPy5vbkRvbmUoY2FsbGJhY2spO1xyXG4gIH1cclxufVxyXG4iXX0=