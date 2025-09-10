import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector, NgZone } from '@angular/core';
import { ComponentLoader } from './component-loader.class';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/positioning";
export class ComponentLoaderFactory {
    constructor(_componentFactoryResolver, _ngZone, _injector, _posService, _applicationRef, _document) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this._ngZone = _ngZone;
        this._injector = _injector;
        this._posService = _posService;
        this._applicationRef = _applicationRef;
        this._document = _document;
    }
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     */
    createLoader(_elementRef, _viewContainerRef, _renderer) {
        return new ComponentLoader(_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._applicationRef, this._posService, this._document);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ComponentLoaderFactory, deps: [{ token: i0.ComponentFactoryResolver }, { token: i0.NgZone }, { token: i0.Injector }, { token: i1.PositioningService }, { token: i0.ApplicationRef }, { token: DOCUMENT }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ComponentLoaderFactory, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ComponentLoaderFactory, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i0.ComponentFactoryResolver }, { type: i0.NgZone }, { type: i0.Injector }, { type: i1.PositioningService }, { type: i0.ApplicationRef }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWxvYWRlci5mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudC1sb2FkZXIvY29tcG9uZW50LWxvYWRlci5mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQUUsd0JBQXdCLEVBQWMsTUFBTSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQ2xGLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDL0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFHM0MsTUFBTSxPQUFPLHNCQUFzQjtJQUNqQyxZQUFvQix5QkFBbUQsRUFDbkQsT0FBZSxFQUNmLFNBQW1CLEVBQ25CLFdBQStCLEVBQy9CLGVBQStCLEVBQ2IsU0FBbUI7UUFMckMsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEwQjtRQUNuRCxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBVTtRQUNuQixnQkFBVyxHQUFYLFdBQVcsQ0FBb0I7UUFDL0Isb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQ2IsY0FBUyxHQUFULFNBQVMsQ0FBVTtJQUN0RCxDQUFDO0lBRUo7Ozs7O09BS0c7SUFDSCxZQUFZLENBQW1CLFdBQXdCLEVBQ3ZDLGlCQUFvQyxFQUNwQyxTQUFxQjtRQUVuQyxPQUFPLElBQUksZUFBZSxDQUN4QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFdBQVcsRUFDWCxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyx5QkFBeUIsRUFDOUIsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsZUFBZSxFQUNwQixJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsU0FBUyxDQUNmLENBQUM7SUFDSixDQUFDOzhHQTlCVSxzQkFBc0Isd0tBTWIsUUFBUTtrSEFOakIsc0JBQXNCLGNBRFYsTUFBTTs7MkZBQ2xCLHNCQUFzQjtrQkFEbEMsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUM7OzBCQU9qQixNQUFNOzJCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIEVsZW1lbnRSZWYsIEluamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0b3IsXHJcbiAgTmdab25lLCBSZW5kZXJlcjIsIFZpZXdDb250YWluZXJSZWZcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyIH0gZnJvbSAnLi9jb21wb25lbnQtbG9hZGVyLmNsYXNzJztcclxuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgQ29tcG9uZW50TG9hZGVyRmFjdG9yeSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXHJcbiAgICAgICAgICAgICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgICAgICAgICAgIHByaXZhdGUgX3Bvc1NlcnZpY2U6IFBvc2l0aW9uaW5nU2VydmljZSxcclxuICAgICAgICAgICAgICBwcml2YXRlIF9hcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXHJcbiAgICAgICAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50XHJcbiAgKSB7fVxyXG5cclxuICAvKipcclxuICAgKlxyXG4gICAqIEBwYXJhbSBfZWxlbWVudFJlZlxyXG4gICAqIEBwYXJhbSBfdmlld0NvbnRhaW5lclJlZlxyXG4gICAqIEBwYXJhbSBfcmVuZGVyZXJcclxuICAgKi9cclxuICBjcmVhdGVMb2FkZXI8VCBleHRlbmRzIG9iamVjdD4oX2VsZW1lbnRSZWY/OiBFbGVtZW50UmVmLFxyXG4gICAgICAgICAgICAgICAgICBfdmlld0NvbnRhaW5lclJlZj86IFZpZXdDb250YWluZXJSZWYsXHJcbiAgICAgICAgICAgICAgICAgIF9yZW5kZXJlcj86IFJlbmRlcmVyMixcclxuICApOiBDb21wb25lbnRMb2FkZXI8VD4ge1xyXG4gICAgcmV0dXJuIG5ldyBDb21wb25lbnRMb2FkZXI8VD4oXHJcbiAgICAgIF92aWV3Q29udGFpbmVyUmVmLFxyXG4gICAgICBfcmVuZGVyZXIsXHJcbiAgICAgIF9lbGVtZW50UmVmLFxyXG4gICAgICB0aGlzLl9pbmplY3RvcixcclxuICAgICAgdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgICB0aGlzLl9uZ1pvbmUsXHJcbiAgICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLFxyXG4gICAgICB0aGlzLl9wb3NTZXJ2aWNlLFxyXG4gICAgICB0aGlzLl9kb2N1bWVudFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19