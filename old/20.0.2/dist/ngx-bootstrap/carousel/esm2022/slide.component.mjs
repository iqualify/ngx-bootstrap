import { Component, HostBinding, Input } from '@angular/core';
import { CarouselComponent } from './carousel.component';
import * as i0 from "@angular/core";
import * as i1 from "./carousel.component";
export class SlideComponent {
    constructor(carousel) {
        /** Is current slide active */
        this.active = false;
        this.itemWidth = '100%';
        this.order = 0;
        this.isAnimated = false;
        /** Wraps element by appropriate CSS classes */
        this.addClass = true;
        this.multilist = false;
        this.carousel = carousel;
    }
    /** Fires changes in container collection after adding a new slide instance */
    ngOnInit() {
        this.carousel.addSlide(this);
        this.itemWidth = `${100 / this.carousel.itemsPerSlide}%`;
        this.multilist = this.carousel?.itemsPerSlide > 1;
    }
    /** Fires changes in container collection after removing of this slide instance */
    ngOnDestroy() {
        this.carousel.removeSlide(this);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: SlideComponent, deps: [{ token: i1.CarouselComponent }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: SlideComponent, selector: "slide", inputs: { active: "active" }, host: { properties: { "attr.aria-hidden": "!active", "class.multilist-margin": "multilist", "class.active": "this.active", "style.width": "this.itemWidth", "style.order": "this.order", "class.carousel-animation": "this.isAnimated", "class.item": "this.addClass", "class.carousel-item": "this.addClass" } }, ngImport: i0, template: `
    <div [class.active]="active" class="item">
      <ng-content></ng-content>
    </div>
  `, isInline: true, styles: [":host.carousel-animation{transition:opacity .6s ease,visibility .6s ease;float:left}:host.carousel-animation.active{opacity:1;visibility:visible}:host.carousel-animation:not(.active){display:block;position:absolute;opacity:0;visibility:hidden}:host.multilist-margin{margin-right:auto}:host.carousel-item{perspective:1000px}\n"] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: SlideComponent, decorators: [{
            type: Component,
            args: [{ selector: 'slide', template: `
    <div [class.active]="active" class="item">
      <ng-content></ng-content>
    </div>
  `, host: {
                        '[attr.aria-hidden]': '!active',
                        '[class.multilist-margin]': 'multilist'
                    }, styles: [":host.carousel-animation{transition:opacity .6s ease,visibility .6s ease;float:left}:host.carousel-animation.active{opacity:1;visibility:visible}:host.carousel-animation:not(.active){display:block;position:absolute;opacity:0;visibility:hidden}:host.multilist-margin{margin-right:auto}:host.carousel-item{perspective:1000px}\n"] }]
        }], ctorParameters: () => [{ type: i1.CarouselComponent }], propDecorators: { active: [{
                type: HostBinding,
                args: ['class.active']
            }, {
                type: Input
            }], itemWidth: [{
                type: HostBinding,
                args: ['style.width']
            }], order: [{
                type: HostBinding,
                args: ['style.order']
            }], isAnimated: [{
                type: HostBinding,
                args: ['class.carousel-animation']
            }], addClass: [{
                type: HostBinding,
                args: ['class.item']
            }, {
                type: HostBinding,
                args: ['class.carousel-item']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhcm91c2VsL3NsaWRlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULFdBQVcsRUFFWCxLQUFLLEVBRU4sTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7OztBQXFDekQsTUFBTSxPQUFPLGNBQWM7SUFrQnpCLFlBQVksUUFBMkI7UUFqQnZDLDhCQUE4QjtRQUc5QixXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRWEsY0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ0csZUFBVSxHQUFHLEtBQUssQ0FBQztRQUU1RCwrQ0FBK0M7UUFHL0MsYUFBUSxHQUFHLElBQUksQ0FBQztRQUloQixjQUFTLEdBQUcsS0FBSyxDQUFDO1FBRWhCLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQzNCLENBQUM7SUFFRCw4RUFBOEU7SUFDOUUsUUFBUTtRQUNOLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEdBQUcsQ0FBQztRQUN6RCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsYUFBYSxHQUFHLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBRUQsa0ZBQWtGO0lBQ2xGLFdBQVc7UUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxDQUFDOzhHQWhDVSxjQUFjO2tHQUFkLGNBQWMsOFhBakNmOzs7O0dBSVQ7OzJGQTZCVSxjQUFjO2tCQW5DMUIsU0FBUzsrQkFDRSxPQUFPLFlBQ1A7Ozs7R0FJVCxRQUVLO3dCQUNKLG9CQUFvQixFQUFFLFNBQVM7d0JBQy9CLDBCQUEwQixFQUFFLFdBQVc7cUJBQ3hDO3NGQTRCRCxNQUFNO3NCQUZMLFdBQVc7dUJBQUMsY0FBYzs7c0JBQzFCLEtBQUs7Z0JBR3NCLFNBQVM7c0JBQXBDLFdBQVc7dUJBQUMsYUFBYTtnQkFDRSxLQUFLO3NCQUFoQyxXQUFXO3VCQUFDLGFBQWE7Z0JBQ2UsVUFBVTtzQkFBbEQsV0FBVzt1QkFBQywwQkFBMEI7Z0JBS3ZDLFFBQVE7c0JBRlAsV0FBVzt1QkFBQyxZQUFZOztzQkFDeEIsV0FBVzt1QkFBQyxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbXBvbmVudCxcclxuICBIb3N0QmluZGluZyxcclxuICBPbkRlc3Ryb3ksXHJcbiAgSW5wdXQsXHJcbiAgT25Jbml0XHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBDYXJvdXNlbENvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnc2xpZGUnLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IFtjbGFzcy5hY3RpdmVdPVwiYWN0aXZlXCIgY2xhc3M9XCJpdGVtXCI+XHJcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XHJcbiAgaG9zdDoge1xyXG4gICAgJ1thdHRyLmFyaWEtaGlkZGVuXSc6ICchYWN0aXZlJyxcclxuICAgICdbY2xhc3MubXVsdGlsaXN0LW1hcmdpbl0nOiAnbXVsdGlsaXN0J1xyXG4gIH0sXHJcbiAgc3R5bGVzOiBbYFxyXG4gICAgOmhvc3QuY2Fyb3VzZWwtYW5pbWF0aW9uIHtcclxuICAgICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC42cyBlYXNlLCB2aXNpYmlsaXR5IDAuNnMgZWFzZTtcclxuICAgICAgIGZsb2F0OiBsZWZ0O1xyXG4gICAgfVxyXG4gICAgOmhvc3QuY2Fyb3VzZWwtYW5pbWF0aW9uLmFjdGl2ZSB7XHJcbiAgICAgIG9wYWNpdHk6IDE7XHJcbiAgICAgIHZpc2liaWxpdHk6IHZpc2libGU7XHJcbiAgICB9XHJcbiAgICA6aG9zdC5jYXJvdXNlbC1hbmltYXRpb246bm90KC5hY3RpdmUpIHtcclxuICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgICAgb3BhY2l0eTogMDtcclxuICAgICAgdmlzaWJpbGl0eTogaGlkZGVuO1xyXG4gICAgfVxyXG4gICAgOmhvc3QubXVsdGlsaXN0LW1hcmdpbiB7XHJcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcclxuICAgIH1cclxuICAgIDpob3N0LmNhcm91c2VsLWl0ZW0ge1xyXG4gICAgICBwZXJzcGVjdGl2ZTogMTAwMHB4O1xyXG4gICAgfVxyXG4gIGBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbGlkZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcclxuICAvKiogSXMgY3VycmVudCBzbGlkZSBhY3RpdmUgKi9cclxuICBASG9zdEJpbmRpbmcoJ2NsYXNzLmFjdGl2ZScpXHJcbiAgQElucHV0KClcclxuICBhY3RpdmUgPSBmYWxzZTtcclxuXHJcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS53aWR0aCcpIGl0ZW1XaWR0aCA9ICcxMDAlJztcclxuICBASG9zdEJpbmRpbmcoJ3N0eWxlLm9yZGVyJykgb3JkZXIgPSAwO1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuY2Fyb3VzZWwtYW5pbWF0aW9uJykgaXNBbmltYXRlZCA9IGZhbHNlO1xyXG5cclxuICAvKiogV3JhcHMgZWxlbWVudCBieSBhcHByb3ByaWF0ZSBDU1MgY2xhc3NlcyAqL1xyXG4gIEBIb3N0QmluZGluZygnY2xhc3MuaXRlbScpXHJcbiAgQEhvc3RCaW5kaW5nKCdjbGFzcy5jYXJvdXNlbC1pdGVtJylcclxuICBhZGRDbGFzcyA9IHRydWU7XHJcblxyXG4gIC8qKiBMaW5rIHRvIFBhcmVudChjb250YWluZXItY29sbGVjdGlvbikgY29tcG9uZW50ICovXHJcbiAgcHJvdGVjdGVkIGNhcm91c2VsOiBDYXJvdXNlbENvbXBvbmVudDtcclxuICBtdWx0aWxpc3QgPSBmYWxzZTtcclxuICBjb25zdHJ1Y3RvcihjYXJvdXNlbDogQ2Fyb3VzZWxDb21wb25lbnQpIHtcclxuICAgIHRoaXMuY2Fyb3VzZWwgPSBjYXJvdXNlbDtcclxuICB9XHJcblxyXG4gIC8qKiBGaXJlcyBjaGFuZ2VzIGluIGNvbnRhaW5lciBjb2xsZWN0aW9uIGFmdGVyIGFkZGluZyBhIG5ldyBzbGlkZSBpbnN0YW5jZSAqL1xyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5jYXJvdXNlbC5hZGRTbGlkZSh0aGlzKTtcclxuICAgIHRoaXMuaXRlbVdpZHRoID0gYCR7MTAwIC8gdGhpcy5jYXJvdXNlbC5pdGVtc1BlclNsaWRlfSVgO1xyXG4gICAgdGhpcy5tdWx0aWxpc3QgPSB0aGlzLmNhcm91c2VsPy5pdGVtc1BlclNsaWRlID4gMTtcclxuICB9XHJcblxyXG4gIC8qKiBGaXJlcyBjaGFuZ2VzIGluIGNvbnRhaW5lciBjb2xsZWN0aW9uIGFmdGVyIHJlbW92aW5nIG9mIHRoaXMgc2xpZGUgaW5zdGFuY2UgKi9cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2Fyb3VzZWwucmVtb3ZlU2xpZGUodGhpcyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==