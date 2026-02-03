import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';
import { dropdownAnimation } from './dropdown-animations';
import { AnimationBuilder } from '@angular/animations';
import * as i0 from "@angular/core";
import * as i1 from "./bs-dropdown.state";
import * as i2 from "@angular/animations";
import * as i3 from "@angular/common";
// todo: revert ngClass to [class] when false positive angular-cli issue is fixed
//          [class.dropdown]="direction === 'down'"-->
export class BsDropdownContainerComponent {
    get direction() {
        return this._state.direction;
    }
    constructor(_state, cd, _renderer, _element, _builder) {
        this._state = _state;
        this.cd = cd;
        this._renderer = _renderer;
        this._element = _element;
        this.isOpen = false;
        this._factoryDropDownAnimation = _builder.build(dropdownAnimation);
        this._subscription = _state.isOpenChange.subscribe((value) => {
            this.isOpen = value;
            const dropdown = this._element.nativeElement.querySelector('.dropdown-menu');
            this._renderer.addClass(this._element.nativeElement.querySelector('div'), 'open');
            if (dropdown) {
                this._renderer.addClass(dropdown, 'show');
                if (dropdown.classList.contains('dropdown-menu-right') || dropdown.classList.contains('dropdown-menu-end')) {
                    this._renderer.setStyle(dropdown, 'left', 'auto');
                    this._renderer.setStyle(dropdown, 'right', '0');
                }
                if (this.direction === 'up') {
                    this._renderer.setStyle(dropdown, 'top', 'auto');
                    this._renderer.setStyle(dropdown, 'transform', 'translateY(-101%)');
                }
            }
            if (dropdown && this._state.isAnimated) {
                this._factoryDropDownAnimation.create(dropdown)
                    .play();
            }
            this.cd.markForCheck();
            this.cd.detectChanges();
        });
    }
    /** @internal */
    _contains(el) {
        return this._element.nativeElement.contains(el);
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDropdownContainerComponent, deps: [{ token: i1.BsDropdownState }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i2.AnimationBuilder }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: BsDropdownContainerComponent, selector: "bs-dropdown-container", host: { styleAttribute: "display:block;position: absolute;z-index: 1040" }, ngImport: i0, template: `
    <div [class.dropup]="direction === 'up'"
         [ngClass]="{dropdown: direction === 'down'}"
         [class.show]="isOpen"
         [class.open]="isOpen"><ng-content></ng-content>
    </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: i3.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDropdownContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-dropdown-container',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        style: 'display:block;position: absolute;z-index: 1040'
                    },
                    template: `
    <div [class.dropup]="direction === 'up'"
         [ngClass]="{dropdown: direction === 'down'}"
         [class.show]="isOpen"
         [class.open]="isOpen"><ng-content></ng-content>
    </div>
  `
                }]
        }], ctorParameters: () => [{ type: i1.BsDropdownState }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i2.AnimationBuilder }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZHJvcGRvd24tY29udGFpbmVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kcm9wZG93bi9icy1kcm9wZG93bi1jb250YWluZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBRVYsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUV0RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUMxRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQW9CLE1BQU0scUJBQXFCLENBQUM7Ozs7O0FBR3pFLGlGQUFpRjtBQUNqRixzREFBc0Q7QUFnQnRELE1BQU0sT0FBTyw0QkFBNEI7SUFLdkMsSUFBSSxTQUFTO1FBQ1gsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUMvQixDQUFDO0lBSUQsWUFDVSxNQUF1QixFQUN2QixFQUFxQixFQUNyQixTQUFvQixFQUNwQixRQUFvQixFQUM1QixRQUEwQjtRQUpsQixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUN2QixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQUNyQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLGFBQVEsR0FBUixRQUFRLENBQVk7UUFkOUIsV0FBTSxHQUFHLEtBQUssQ0FBQztRQWlCYixJQUFJLENBQUMseUJBQXlCLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBRW5FLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFjLEVBQUUsRUFBRTtZQUNwRSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNwQixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUU3RSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFbEYsSUFBSSxRQUFRLEVBQUUsQ0FBQztnQkFDYixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRTFDLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUM7b0JBQzNHLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ2xELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2xELENBQUM7Z0JBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRSxDQUFDO29CQUM1QixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDckIsUUFBUSxFQUNSLFdBQVcsRUFDWCxtQkFBbUIsQ0FDcEIsQ0FBQztnQkFDSixDQUFDO1lBQ0gsQ0FBQztZQUVELElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO3FCQUM1QyxJQUFJLEVBQUUsQ0FBQztZQUNaLENBQUM7WUFFRCxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsZ0JBQWdCO0lBQ2hCLFNBQVMsQ0FBQyxFQUFXO1FBQ25CLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDOzhHQTVEVSw0QkFBNEI7a0dBQTVCLDRCQUE0Qix5SUFSN0I7Ozs7OztHQU1UOzsyRkFFVSw0QkFBNEI7a0JBZnhDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLHFFQUFxRTtvQkFDckUsSUFBSSxFQUFFO3dCQUNKLEtBQUssRUFBRSxnREFBZ0Q7cUJBQ3hEO29CQUNELFFBQVEsRUFBRTs7Ozs7O0dBTVQ7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxyXG4gIENoYW5nZURldGVjdG9yUmVmLFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIE9uRGVzdHJveSxcclxuICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IEJzRHJvcGRvd25TdGF0ZSB9IGZyb20gJy4vYnMtZHJvcGRvd24uc3RhdGUnO1xyXG5cclxuaW1wb3J0IHsgZHJvcGRvd25BbmltYXRpb24gfSBmcm9tICcuL2Ryb3Bkb3duLWFuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBBbmltYXRpb25CdWlsZGVyLCBBbmltYXRpb25GYWN0b3J5IH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuLy8gdG9kbzogcmV2ZXJ0IG5nQ2xhc3MgdG8gW2NsYXNzXSB3aGVuIGZhbHNlIHBvc2l0aXZlIGFuZ3VsYXItY2xpIGlzc3VlIGlzIGZpeGVkXHJcbi8vICAgICAgICAgIFtjbGFzcy5kcm9wZG93bl09XCJkaXJlY3Rpb24gPT09ICdkb3duJ1wiLS0+XHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYnMtZHJvcGRvd24tY29udGFpbmVyJyxcclxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQGFuZ3VsYXItZXNsaW50L25vLWhvc3QtbWV0YWRhdGEtcHJvcGVydHlcclxuICBob3N0OiB7XHJcbiAgICBzdHlsZTogJ2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246IGFic29sdXRlO3otaW5kZXg6IDEwNDAnXHJcbiAgfSxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGRpdiBbY2xhc3MuZHJvcHVwXT1cImRpcmVjdGlvbiA9PT0gJ3VwJ1wiXHJcbiAgICAgICAgIFtuZ0NsYXNzXT1cIntkcm9wZG93bjogZGlyZWN0aW9uID09PSAnZG93bid9XCJcclxuICAgICAgICAgW2NsYXNzLnNob3ddPVwiaXNPcGVuXCJcclxuICAgICAgICAgW2NsYXNzLm9wZW5dPVwiaXNPcGVuXCI+PG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnNEcm9wZG93bkNvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgaXNPcGVuID0gZmFsc2U7XHJcblxyXG4gIHByaXZhdGUgX2ZhY3RvcnlEcm9wRG93bkFuaW1hdGlvbjogQW5pbWF0aW9uRmFjdG9yeTtcclxuXHJcbiAgZ2V0IGRpcmVjdGlvbigpOiAnZG93bicgfCAndXAnIHtcclxuICAgIHJldHVybiB0aGlzLl9zdGF0ZS5kaXJlY3Rpb247XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9zdGF0ZTogQnNEcm9wZG93blN0YXRlLFxyXG4gICAgcHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIF9idWlsZGVyOiBBbmltYXRpb25CdWlsZGVyXHJcbiAgKSB7XHJcbiAgICB0aGlzLl9mYWN0b3J5RHJvcERvd25BbmltYXRpb24gPSBfYnVpbGRlci5idWlsZChkcm9wZG93bkFuaW1hdGlvbik7XHJcblxyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gX3N0YXRlLmlzT3BlbkNoYW5nZS5zdWJzY3JpYmUoKHZhbHVlOiBib29sZWFuKSA9PiB7XHJcbiAgICAgIHRoaXMuaXNPcGVuID0gdmFsdWU7XHJcbiAgICAgIGNvbnN0IGRyb3Bkb3duID0gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kcm9wZG93bi1tZW51Jyk7XHJcblxyXG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignZGl2JyksICdvcGVuJyk7XHJcblxyXG4gICAgICBpZiAoZHJvcGRvd24pIHtcclxuICAgICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhkcm9wZG93biwgJ3Nob3cnKTtcclxuXHJcbiAgICAgICAgaWYgKGRyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucygnZHJvcGRvd24tbWVudS1yaWdodCcpIHx8IGRyb3Bkb3duLmNsYXNzTGlzdC5jb250YWlucygnZHJvcGRvd24tbWVudS1lbmQnKSkge1xyXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZHJvcGRvd24sICdsZWZ0JywgJ2F1dG8nKTtcclxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duLCAncmlnaHQnLCAnMCcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICd1cCcpIHtcclxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGRyb3Bkb3duLCAndG9wJywgJ2F1dG8nKTtcclxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxyXG4gICAgICAgICAgICBkcm9wZG93bixcclxuICAgICAgICAgICAgJ3RyYW5zZm9ybScsXHJcbiAgICAgICAgICAgICd0cmFuc2xhdGVZKC0xMDElKSdcclxuICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZHJvcGRvd24gJiYgdGhpcy5fc3RhdGUuaXNBbmltYXRlZCkge1xyXG4gICAgICAgIHRoaXMuX2ZhY3RvcnlEcm9wRG93bkFuaW1hdGlvbi5jcmVhdGUoZHJvcGRvd24pXHJcbiAgICAgICAgICAucGxheSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICB0aGlzLmNkLmRldGVjdENoYW5nZXMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLyoqIEBpbnRlcm5hbCAqL1xyXG4gIF9jb250YWlucyhlbDogRWxlbWVudCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyhlbCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxufVxyXG4iXX0=