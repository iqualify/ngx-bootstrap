// todo: add delay support
// todo: merge events onShow, onShown, etc...
// todo: add global positioning configuration?
import { ElementRef, EventEmitter, Injector, TemplateRef } from '@angular/core';
import { listenToTriggersV2, registerEscClick, registerOutsideClick } from 'ngx-bootstrap/utils';
import { ContentRef } from './content-ref.class';
export class ComponentLoader {
    /**
     * Do not use this directly, it should be instanced via
     * `ComponentLoadFactory.attach`
     * @internal
     */
    constructor(_viewContainerRef, _renderer, _elementRef, _injector, _componentFactoryResolver, _ngZone, _applicationRef, _posService, _document) {
        this._viewContainerRef = _viewContainerRef;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._injector = _injector;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._ngZone = _ngZone;
        this._applicationRef = _applicationRef;
        this._posService = _posService;
        this._document = _document;
        this.onBeforeShow = new EventEmitter();
        this.onShown = new EventEmitter();
        this.onBeforeHide = new EventEmitter();
        this.onHidden = new EventEmitter();
        this._providers = [];
        this._isHiding = false;
        /**
         * A selector used if container element was not found
         */
        this.containerDefaultSelector = 'body';
        this._listenOpts = {};
        this._globalListener = Function.prototype;
    }
    get isShown() {
        if (this._isHiding) {
            return false;
        }
        return !!this._componentRef;
    }
    attach(compType) {
        this._componentFactory = this._componentFactoryResolver
            .resolveComponentFactory(compType);
        return this;
    }
    // todo: add behaviour: to target element, `body`, custom element
    to(container) {
        this.container = container || this.container;
        return this;
    }
    position(opts) {
        if (!opts) {
            return this;
        }
        this.attachment = opts.attachment || this.attachment;
        this._elementRef = opts.target || this._elementRef;
        return this;
    }
    provide(provider) {
        this._providers.push(provider);
        return this;
    }
    // todo: appendChild to element or document.querySelector(this.container)
    show(opts = {}) {
        this._subscribePositioning();
        this._innerComponent = void 0;
        if (!this._componentRef) {
            this.onBeforeShow.emit();
            this._contentRef = this._getContentRef(opts.content, opts.context, opts.initialState);
            const injector = Injector.create({
                providers: this._providers,
                parent: this._injector
            });
            if (!this._componentFactory) {
                return;
            }
            this._componentRef = this._componentFactory.create(injector, this._contentRef.nodes);
            this._applicationRef.attachView(this._componentRef.hostView);
            // this._componentRef = this._viewContainerRef
            //   .createComponent(this._componentFactory, 0, injector, this._contentRef.nodes);
            this.instance = this._componentRef.instance;
            Object.assign(this._componentRef.instance, opts);
            if (this.container instanceof ElementRef) {
                this.container.nativeElement.appendChild(this._componentRef.location.nativeElement);
            }
            if (typeof this.container === 'string' && typeof this._document !== 'undefined') {
                const selectedElement = this._document.querySelector(this.container) ||
                    this._document.querySelector(this.containerDefaultSelector);
                if (!selectedElement) {
                    return;
                }
                selectedElement.appendChild(this._componentRef.location.nativeElement);
            }
            if (!this.container &&
                this._elementRef &&
                this._elementRef.nativeElement.parentElement) {
                this._elementRef.nativeElement.parentElement.appendChild(this._componentRef.location.nativeElement);
            }
            // we need to manually invoke change detection since events registered
            // via
            // Renderer::listen() are not picked up by change detection with the
            // OnPush strategy
            if (this._contentRef.componentRef) {
                this._innerComponent = this._contentRef.componentRef.instance;
                this._contentRef.componentRef.changeDetectorRef.markForCheck();
                this._contentRef.componentRef.changeDetectorRef.detectChanges();
            }
            this._componentRef.changeDetectorRef.markForCheck();
            this._componentRef.changeDetectorRef.detectChanges();
            this.onShown.emit(opts.id ? { id: opts.id } : this._componentRef.instance);
        }
        this._registerOutsideClick();
        return this._componentRef;
    }
    hide(id) {
        if (!this._componentRef) {
            return this;
        }
        this._posService.deletePositionElement(this._componentRef.location);
        this.onBeforeHide.emit(this._componentRef.instance);
        const componentEl = this._componentRef.location.nativeElement;
        componentEl.parentNode?.removeChild(componentEl);
        this._contentRef?.componentRef?.destroy();
        if (this._viewContainerRef && this._contentRef?.viewRef) {
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
        }
        this._contentRef?.viewRef?.destroy();
        this._contentRef = void 0;
        this._componentRef = void 0;
        this._removeGlobalListener();
        this.onHidden.emit(id ? { id } : null);
        return this;
    }
    toggle() {
        if (this.isShown) {
            this.hide();
            return;
        }
        this.show();
    }
    dispose() {
        if (this.isShown) {
            this.hide();
        }
        this._unsubscribePositioning();
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
    }
    listen(listenOpts) {
        this.triggers = listenOpts.triggers || this.triggers;
        this._listenOpts.outsideClick = listenOpts.outsideClick;
        this._listenOpts.outsideEsc = listenOpts.outsideEsc;
        listenOpts.target = listenOpts.target || this._elementRef?.nativeElement;
        const hide = (this._listenOpts.hide = () => listenOpts.hide ? listenOpts.hide() : void this.hide());
        const show = (this._listenOpts.show = (registerHide) => {
            listenOpts.show ? listenOpts.show(registerHide) : this.show(registerHide);
            registerHide();
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const toggle = (registerHide) => {
            this.isShown ? hide() : show(registerHide);
        };
        if (this._renderer) {
            this._unregisterListenersFn = listenToTriggersV2(this._renderer, {
                target: listenOpts.target,
                triggers: listenOpts.triggers,
                show,
                hide,
                toggle
            });
        }
        return this;
    }
    _removeGlobalListener() {
        if (this._globalListener) {
            this._globalListener();
            this._globalListener = Function.prototype;
        }
    }
    attachInline(vRef, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    template) {
        if (vRef && template) {
            this._inlineViewRef = vRef.createEmbeddedView(template);
        }
        return this;
    }
    _registerOutsideClick() {
        if (!this._componentRef || !this._componentRef.location) {
            return;
        }
        // why: should run after first event bubble
        if (this._listenOpts.outsideClick) {
            const target = this._componentRef.location.nativeElement;
            setTimeout(() => {
                if (this._renderer && this._elementRef) {
                    this._globalListener = registerOutsideClick(this._renderer, {
                        targets: [target, this._elementRef.nativeElement],
                        outsideClick: this._listenOpts.outsideClick,
                        hide: () => this._listenOpts.hide && this._listenOpts.hide()
                    });
                }
            });
        }
        if (this._listenOpts.outsideEsc && this._renderer && this._elementRef) {
            const target = this._componentRef.location.nativeElement;
            this._globalListener = registerEscClick(this._renderer, {
                targets: [target, this._elementRef.nativeElement],
                outsideEsc: this._listenOpts.outsideEsc,
                hide: () => this._listenOpts.hide && this._listenOpts.hide()
            });
        }
    }
    getInnerComponent() {
        return this._innerComponent;
    }
    _subscribePositioning() {
        if (this._zoneSubscription || !this.attachment) {
            return;
        }
        this.onShown.subscribe(() => {
            this._posService.position({
                element: this._componentRef?.location,
                target: this._elementRef,
                attachment: this.attachment,
                appendToBody: this.container === 'body'
            });
        });
        this._zoneSubscription = this._ngZone.onStable.subscribe(() => {
            if (!this._componentRef) {
                return;
            }
            this._posService.calcPosition();
        });
    }
    _unsubscribePositioning() {
        if (!this._zoneSubscription) {
            return;
        }
        this._zoneSubscription.unsubscribe();
        this._zoneSubscription = void 0;
    }
    _getContentRef(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialState) {
        if (!content) {
            return new ContentRef([]);
        }
        if (content instanceof TemplateRef) {
            if (this._viewContainerRef) {
                const _viewRef = this._viewContainerRef
                    .createEmbeddedView(content, context);
                _viewRef.markForCheck();
                return new ContentRef([_viewRef.rootNodes], _viewRef);
            }
            const viewRef = content.createEmbeddedView({});
            this._applicationRef.attachView(viewRef);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        if (typeof content === 'function') {
            const contentCmptFactory = this._componentFactoryResolver.resolveComponentFactory(content);
            const modalContentInjector = Injector.create({
                providers: this._providers,
                parent: this._injector
            });
            const componentRef = contentCmptFactory.create(modalContentInjector);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            Object.assign(componentRef.instance, initialState);
            this._applicationRef.attachView(componentRef.hostView);
            return new ContentRef([[componentRef.location.nativeElement]], componentRef.hostView, componentRef);
        }
        const nodes = this._renderer
            ? [this._renderer.createText(`${content}`)]
            : [];
        return new ContentRef([nodes]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWxvYWRlci5jbGFzcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnQtbG9hZGVyL2NvbXBvbmVudC1sb2FkZXIuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEJBQTBCO0FBQzFCLDZDQUE2QztBQUM3Qyw4Q0FBOEM7QUFDOUMsT0FBTyxFQUtMLFVBQVUsRUFFVixZQUFZLEVBQ1osUUFBUSxFQUlSLFdBQVcsRUFHWixNQUFNLGVBQWUsQ0FBQztBQUl2QixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUdqRyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFHakQsTUFBTSxPQUFPLGVBQWU7SUF1QzFCOzs7O09BSUc7SUFDSCxZQUNVLGlCQUErQyxFQUMvQyxTQUFnQyxFQUNoQyxXQUFtQyxFQUNuQyxTQUFtQixFQUNuQix5QkFBbUQsRUFDbkQsT0FBZSxFQUNmLGVBQStCLEVBQy9CLFdBQStCLEVBQy9CLFNBQW1CO1FBUm5CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBOEI7UUFDL0MsY0FBUyxHQUFULFNBQVMsQ0FBdUI7UUFDaEMsZ0JBQVcsR0FBWCxXQUFXLENBQXdCO1FBQ25DLGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEwQjtRQUNuRCxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBQ2Ysb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQixjQUFTLEdBQVQsU0FBUyxDQUFVO1FBcEQ3QixpQkFBWSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDbEMsWUFBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFDN0IsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ2xDLGFB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QztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdG9kbzogYWRkIGRlbGF5IHN1cHBvcnRcclxuLy8gdG9kbzogbWVyZ2UgZXZlbnRzIG9uU2hvdywgb25TaG93biwgZXRjLi4uXHJcbi8vIHRvZG86IGFkZCBnbG9iYWwgcG9zaXRpb25pbmcgY29uZmlndXJhdGlvbj9cclxuaW1wb3J0IHtcclxuICBBcHBsaWNhdGlvblJlZixcclxuICBDb21wb25lbnRGYWN0b3J5LFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgRWxlbWVudFJlZixcclxuICBFbWJlZGRlZFZpZXdSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEluamVjdG9yLFxyXG4gIE5nWm9uZSxcclxuICBSZW5kZXJlcjIsXHJcbiAgU3RhdGljUHJvdmlkZXIsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVHlwZSxcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBQb3NpdGlvbmluZ09wdGlvbnMsIFBvc2l0aW9uaW5nU2VydmljZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xyXG5cclxuaW1wb3J0IHsgbGlzdGVuVG9UcmlnZ2Vyc1YyLCByZWdpc3RlckVzY0NsaWNrLCByZWdpc3Rlck91dHNpZGVDbGljayB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IENvbnRlbnRSZWYgfSBmcm9tICcuL2NvbnRlbnQtcmVmLmNsYXNzJztcclxuaW1wb3J0IHsgTGlzdGVuT3B0aW9ucyB9IGZyb20gJy4vbGlzdGVuLW9wdGlvbnMubW9kZWwnO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbXBvbmVudExvYWRlcjxUIGV4dGVuZHMgb2JqZWN0PiB7XHJcbiAgb25CZWZvcmVTaG93ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIG9uU2hvd24gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcbiAgb25CZWZvcmVIaWRlID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG4gIG9uSGlkZGVuID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICBpbnN0YW5jZT86IFQ7XHJcbiAgX2NvbXBvbmVudFJlZj86IENvbXBvbmVudFJlZjxUPjtcclxuICBfaW5saW5lVmlld1JlZj86IEVtYmVkZGVkVmlld1JlZjxUPjtcclxuXHJcbiAgcHJpdmF0ZSBfcHJvdmlkZXJzOiBTdGF0aWNQcm92aWRlcltdID0gW107XHJcbiAgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeT86IENvbXBvbmVudEZhY3Rvcnk8VD47XHJcbiAgcHJpdmF0ZSBfem9uZVN1YnNjcmlwdGlvbj86IFN1YnNjcmlwdGlvbjtcclxuICBwcml2YXRlIF9jb250ZW50UmVmPzogQ29udGVudFJlZjtcclxuICBwcml2YXRlIF9pbm5lckNvbXBvbmVudD86IENvbXBvbmVudFJlZjxUPjtcclxuXHJcbiAgcHJpdmF0ZSBfdW5yZWdpc3Rlckxpc3RlbmVyc0ZuPzogKCkgPT4gdm9pZDtcclxuICBwcml2YXRlIF9pc0hpZGluZyA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIFBsYWNlbWVudCBvZiBhIGNvbXBvbmVudC4gQWNjZXB0czogXCJ0b3BcIiwgXCJib3R0b21cIiwgXCJsZWZ0XCIsIFwicmlnaHRcIlxyXG4gICAqL1xyXG4gIHByaXZhdGUgYXR0YWNobWVudD86IHN0cmluZztcclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHNwZWNpZnlpbmcgdGhlIGVsZW1lbnQgdGhlIHBvcG92ZXIgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqL1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBwcml2YXRlIGNvbnRhaW5lcjogc3RyaW5nIHwgRWxlbWVudFJlZiB8IGFueTtcclxuICAvKipcclxuICAgKiBBIHNlbGVjdG9yIHVzZWQgaWYgY29udGFpbmVyIGVsZW1lbnQgd2FzIG5vdCBmb3VuZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgY29udGFpbmVyRGVmYXVsdFNlbGVjdG9yID0gJ2JvZHknO1xyXG4gIC8qKlxyXG4gICAqIFNwZWNpZmllcyBldmVudHMgdGhhdCBzaG91bGQgdHJpZ2dlci4gU3VwcG9ydHMgYSBzcGFjZSBzZXBhcmF0ZWQgbGlzdCBvZlxyXG4gICAqIGV2ZW50IG5hbWVzLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgdHJpZ2dlcnM/OiBzdHJpbmc7XHJcbiAgcHJpdmF0ZSBfbGlzdGVuT3B0czogTGlzdGVuT3B0aW9ucyA9IHt9O1xyXG4gIHByaXZhdGUgX2dsb2JhbExpc3RlbmVyID0gRnVuY3Rpb24ucHJvdG90eXBlO1xyXG5cclxuICAvKipcclxuICAgKiBEbyBub3QgdXNlIHRoaXMgZGlyZWN0bHksIGl0IHNob3VsZCBiZSBpbnN0YW5jZWQgdmlhXHJcbiAgICogYENvbXBvbmVudExvYWRGYWN0b3J5LmF0dGFjaGBcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBwdWJsaWMgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF92aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmIHwgdW5kZWZpbmVkLFxyXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiB8IHVuZGVmaW5lZCxcclxuICAgIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQsXHJcbiAgICBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgX25nWm9uZTogTmdab25lLFxyXG4gICAgcHJpdmF0ZSBfYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgcHJpdmF0ZSBfcG9zU2VydmljZTogUG9zaXRpb25pbmdTZXJ2aWNlLFxyXG4gICAgcHJpdmF0ZSBfZG9jdW1lbnQ6IERvY3VtZW50LFxyXG4gICkge1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzU2hvd24oKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5faXNIaWRpbmcpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiAhIXRoaXMuX2NvbXBvbmVudFJlZjtcclxuICB9XHJcblxyXG4gIGF0dGFjaChjb21wVHlwZTogVHlwZTxUPik6IENvbXBvbmVudExvYWRlcjxUPiB7XHJcbiAgICB0aGlzLl9jb21wb25lbnRGYWN0b3J5ID0gdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyXHJcbiAgICAgIC5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeTxUPihjb21wVHlwZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyB0b2RvOiBhZGQgYmVoYXZpb3VyOiB0byB0YXJnZXQgZWxlbWVudCwgYGJvZHlgLCBjdXN0b20gZWxlbWVudFxyXG4gIHRvKGNvbnRhaW5lcj86IHN0cmluZyB8IEVsZW1lbnRSZWYpOiBDb21wb25lbnRMb2FkZXI8VD4ge1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXIgfHwgdGhpcy5jb250YWluZXI7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBwb3NpdGlvbihvcHRzPzogUG9zaXRpb25pbmdPcHRpb25zKTogQ29tcG9uZW50TG9hZGVyPFQ+IHtcclxuICAgIGlmICghb3B0cykge1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmF0dGFjaG1lbnQgPSBvcHRzLmF0dGFjaG1lbnQgfHwgdGhpcy5hdHRhY2htZW50O1xyXG4gICAgdGhpcy5fZWxlbWVudFJlZiA9IChvcHRzLnRhcmdldCBhcyBFbGVtZW50UmVmKSB8fCB0aGlzLl9lbGVtZW50UmVmO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgcHJvdmlkZShwcm92aWRlcjogU3RhdGljUHJvdmlkZXIpOiBDb21wb25lbnRMb2FkZXI8VD4ge1xyXG4gICAgdGhpcy5fcHJvdmlkZXJzLnB1c2gocHJvdmlkZXIpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gdG9kbzogYXBwZW5kQ2hpbGQgdG8gZWxlbWVudCBvciBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyKVxyXG5cclxuICBzaG93KG9wdHM6IHtcclxuICAgICAgICAgY29udGVudD86IHN0cmluZyB8IFRlbXBsYXRlUmVmPHVua25vd24+O1xyXG4gICAgICAgICBjb250ZXh0PzogdW5rbm93bjtcclxuICAgICAgICAgaW5pdGlhbFN0YXRlPzogdW5rbm93bjtcclxuICAgICAgICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcclxuICAgICAgICAgaWQ/OiBudW1iZXIgfCBzdHJpbmc7XHJcbiAgICAgICB9ID0ge31cclxuICApOiBDb21wb25lbnRSZWY8VD4gfCB1bmRlZmluZWQge1xyXG5cclxuICAgIHRoaXMuX3N1YnNjcmliZVBvc2l0aW9uaW5nKCk7XHJcbiAgICB0aGlzLl9pbm5lckNvbXBvbmVudCA9IHZvaWQgMDtcclxuXHJcbiAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZikge1xyXG4gICAgICB0aGlzLm9uQmVmb3JlU2hvdy5lbWl0KCk7XHJcbiAgICAgIHRoaXMuX2NvbnRlbnRSZWYgPSB0aGlzLl9nZXRDb250ZW50UmVmKG9wdHMuY29udGVudCwgb3B0cy5jb250ZXh0LCBvcHRzLmluaXRpYWxTdGF0ZSk7XHJcblxyXG4gICAgICBjb25zdCBpbmplY3RvciA9IEluamVjdG9yLmNyZWF0ZSh7XHJcbiAgICAgICAgcHJvdmlkZXJzOiB0aGlzLl9wcm92aWRlcnMsXHJcbiAgICAgICAgcGFyZW50OiB0aGlzLl9pbmplY3RvclxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGlmICghdGhpcy5fY29tcG9uZW50RmFjdG9yeSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fY29tcG9uZW50UmVmID0gdGhpcy5fY29tcG9uZW50RmFjdG9yeS5jcmVhdGUoaW5qZWN0b3IsIHRoaXMuX2NvbnRlbnRSZWYubm9kZXMpO1xyXG5cclxuICAgICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh0aGlzLl9jb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG4gICAgICAvLyB0aGlzLl9jb21wb25lbnRSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmXHJcbiAgICAgIC8vICAgLmNyZWF0ZUNvbXBvbmVudCh0aGlzLl9jb21wb25lbnRGYWN0b3J5LCAwLCBpbmplY3RvciwgdGhpcy5fY29udGVudFJlZi5ub2Rlcyk7XHJcbiAgICAgIHRoaXMuaW5zdGFuY2UgPSB0aGlzLl9jb21wb25lbnRSZWYuaW5zdGFuY2U7XHJcblxyXG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZSwgb3B0cyk7XHJcblxyXG4gICAgICBpZiAodGhpcy5jb250YWluZXIgaW5zdGFuY2VvZiBFbGVtZW50UmVmKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIubmF0aXZlRWxlbWVudC5hcHBlbmRDaGlsZChcclxuICAgICAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmNvbnRhaW5lciA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHRoaXMuX2RvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRWxlbWVudCA9IHRoaXMuX2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy5jb250YWluZXIpIHx8XHJcbiAgICAgICAgICB0aGlzLl9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMuY29udGFpbmVyRGVmYXVsdFNlbGVjdG9yKTtcclxuXHJcbiAgICAgICAgaWYgKCFzZWxlY3RlZEVsZW1lbnQpIHtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGVjdGVkRWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9jb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChcclxuICAgICAgICAhdGhpcy5jb250YWluZXIgJiZcclxuICAgICAgICB0aGlzLl9lbGVtZW50UmVmICYmXHJcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnRcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnBhcmVudEVsZW1lbnQuYXBwZW5kQ2hpbGQoXHJcbiAgICAgICAgICB0aGlzLl9jb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudFxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHdlIG5lZWQgdG8gbWFudWFsbHkgaW52b2tlIGNoYW5nZSBkZXRlY3Rpb24gc2luY2UgZXZlbnRzIHJlZ2lzdGVyZWRcclxuICAgICAgLy8gdmlhXHJcbiAgICAgIC8vIFJlbmRlcmVyOjpsaXN0ZW4oKSBhcmUgbm90IHBpY2tlZCB1cCBieSBjaGFuZ2UgZGV0ZWN0aW9uIHdpdGggdGhlXHJcbiAgICAgIC8vIE9uUHVzaCBzdHJhdGVneVxyXG4gICAgICBpZiAodGhpcy5fY29udGVudFJlZi5jb21wb25lbnRSZWYpIHtcclxuICAgICAgICB0aGlzLl9pbm5lckNvbXBvbmVudCA9IHRoaXMuX2NvbnRlbnRSZWYuY29tcG9uZW50UmVmLmluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnRSZWYuY29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgICAgIHRoaXMuX2NvbnRlbnRSZWYuY29tcG9uZW50UmVmLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLl9jb21wb25lbnRSZWYuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XHJcbiAgICAgIHRoaXMuX2NvbXBvbmVudFJlZi5jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XHJcblxyXG5cclxuICAgICAgdGhpcy5vblNob3duLmVtaXQob3B0cy5pZCA/IHsgaWQ6IG9wdHMuaWQgfSA6IHRoaXMuX2NvbXBvbmVudFJlZi5pbnN0YW5jZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcmVnaXN0ZXJPdXRzaWRlQ2xpY2soKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50UmVmO1xyXG4gIH1cclxuXHJcbiAgaGlkZShpZD86IG51bWJlciB8IHN0cmluZyk6IENvbXBvbmVudExvYWRlcjxUPiB7XHJcbiAgICBpZiAoIXRoaXMuX2NvbXBvbmVudFJlZikge1xyXG4gICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9wb3NTZXJ2aWNlLmRlbGV0ZVBvc2l0aW9uRWxlbWVudCh0aGlzLl9jb21wb25lbnRSZWYubG9jYXRpb24pO1xyXG5cclxuICAgIHRoaXMub25CZWZvcmVIaWRlLmVtaXQodGhpcy5fY29tcG9uZW50UmVmLmluc3RhbmNlKTtcclxuXHJcbiAgICBjb25zdCBjb21wb25lbnRFbCA9IHRoaXMuX2NvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50O1xyXG4gICAgY29tcG9uZW50RWwucGFyZW50Tm9kZT8ucmVtb3ZlQ2hpbGQoY29tcG9uZW50RWwpO1xyXG5cclxuICAgIHRoaXMuX2NvbnRlbnRSZWY/LmNvbXBvbmVudFJlZj8uZGVzdHJveSgpO1xyXG5cclxuICAgIGlmICh0aGlzLl92aWV3Q29udGFpbmVyUmVmICYmIHRoaXMuX2NvbnRlbnRSZWY/LnZpZXdSZWYpIHtcclxuICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5yZW1vdmUoXHJcbiAgICAgICAgdGhpcy5fdmlld0NvbnRhaW5lclJlZi5pbmRleE9mKHRoaXMuX2NvbnRlbnRSZWYudmlld1JlZilcclxuICAgICAgKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2NvbnRlbnRSZWY/LnZpZXdSZWY/LmRlc3Ryb3koKTtcclxuXHJcbiAgICB0aGlzLl9jb250ZW50UmVmID0gdm9pZCAwO1xyXG4gICAgdGhpcy5fY29tcG9uZW50UmVmID0gdm9pZCAwO1xyXG4gICAgdGhpcy5fcmVtb3ZlR2xvYmFsTGlzdGVuZXIoKTtcclxuXHJcbiAgICB0aGlzLm9uSGlkZGVuLmVtaXQoaWQgPyB7IGlkIH0gOiBudWxsKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIHRvZ2dsZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzU2hvd24pIHtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zaG93KCk7XHJcbiAgfVxyXG5cclxuICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNTaG93bikge1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl91bnN1YnNjcmliZVBvc2l0aW9uaW5nKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuX3VucmVnaXN0ZXJMaXN0ZW5lcnNGbikge1xyXG4gICAgICB0aGlzLl91bnJlZ2lzdGVyTGlzdGVuZXJzRm4oKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGxpc3RlbihsaXN0ZW5PcHRzOiBMaXN0ZW5PcHRpb25zKTogQ29tcG9uZW50TG9hZGVyPFQ+IHtcclxuICAgIHRoaXMudHJpZ2dlcnMgPSBsaXN0ZW5PcHRzLnRyaWdnZXJzIHx8IHRoaXMudHJpZ2dlcnM7XHJcbiAgICB0aGlzLl9saXN0ZW5PcHRzLm91dHNpZGVDbGljayA9IGxpc3Rlbk9wdHMub3V0c2lkZUNsaWNrO1xyXG4gICAgdGhpcy5fbGlzdGVuT3B0cy5vdXRzaWRlRXNjID0gbGlzdGVuT3B0cy5vdXRzaWRlRXNjO1xyXG4gICAgbGlzdGVuT3B0cy50YXJnZXQgPSBsaXN0ZW5PcHRzLnRhcmdldCB8fCB0aGlzLl9lbGVtZW50UmVmPy5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgIGNvbnN0IGhpZGUgPSAodGhpcy5fbGlzdGVuT3B0cy5oaWRlID0gKCkgPT5cclxuICAgICAgbGlzdGVuT3B0cy5oaWRlID8gbGlzdGVuT3B0cy5oaWRlKCkgOiB2b2lkIHRoaXMuaGlkZSgpKTtcclxuICAgIGNvbnN0IHNob3cgPSAodGhpcy5fbGlzdGVuT3B0cy5zaG93ID0gKHJlZ2lzdGVySGlkZSkgPT4ge1xyXG4gICAgICBsaXN0ZW5PcHRzLnNob3cgPyBsaXN0ZW5PcHRzLnNob3cocmVnaXN0ZXJIaWRlKSA6IHRoaXMuc2hvdyhyZWdpc3RlckhpZGUpO1xyXG4gICAgICByZWdpc3RlckhpZGUoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBjb25zdCB0b2dnbGUgPSAocmVnaXN0ZXJIaWRlOiBhbnkpID0+IHtcclxuICAgICAgdGhpcy5pc1Nob3duID8gaGlkZSgpIDogc2hvdyhyZWdpc3RlckhpZGUpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5fcmVuZGVyZXIpIHtcclxuICAgICAgdGhpcy5fdW5yZWdpc3Rlckxpc3RlbmVyc0ZuID0gbGlzdGVuVG9UcmlnZ2Vyc1YyKHRoaXMuX3JlbmRlcmVyLCB7XHJcbiAgICAgICAgdGFyZ2V0OiBsaXN0ZW5PcHRzLnRhcmdldCxcclxuICAgICAgICB0cmlnZ2VyczogbGlzdGVuT3B0cy50cmlnZ2VycyxcclxuICAgICAgICBzaG93LFxyXG4gICAgICAgIGhpZGUsXHJcbiAgICAgICAgdG9nZ2xlXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgX3JlbW92ZUdsb2JhbExpc3RlbmVyKCkge1xyXG4gICAgaWYgKHRoaXMuX2dsb2JhbExpc3RlbmVyKSB7XHJcbiAgICAgIHRoaXMuX2dsb2JhbExpc3RlbmVyKCk7XHJcbiAgICAgIHRoaXMuX2dsb2JhbExpc3RlbmVyID0gRnVuY3Rpb24ucHJvdG90eXBlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYXR0YWNoSW5saW5lKFxyXG4gICAgdlJlZjogVmlld0NvbnRhaW5lclJlZiB8IHVuZGVmaW5lZCxcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICB0ZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZFxyXG4gICk6IENvbXBvbmVudExvYWRlcjxUPiB7XHJcbiAgICBpZiAodlJlZiAmJiB0ZW1wbGF0ZSkge1xyXG4gICAgICB0aGlzLl9pbmxpbmVWaWV3UmVmID0gdlJlZi5jcmVhdGVFbWJlZGRlZFZpZXcodGVtcGxhdGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgX3JlZ2lzdGVyT3V0c2lkZUNsaWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLl9jb21wb25lbnRSZWYgfHwgIXRoaXMuX2NvbXBvbmVudFJlZi5sb2NhdGlvbikge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICAvLyB3aHk6IHNob3VsZCBydW4gYWZ0ZXIgZmlyc3QgZXZlbnQgYnViYmxlXHJcbiAgICBpZiAodGhpcy5fbGlzdGVuT3B0cy5vdXRzaWRlQ2xpY2spIHtcclxuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIGlmICh0aGlzLl9yZW5kZXJlciAmJiB0aGlzLl9lbGVtZW50UmVmKSB7XHJcbiAgICAgICAgICB0aGlzLl9nbG9iYWxMaXN0ZW5lciA9IHJlZ2lzdGVyT3V0c2lkZUNsaWNrKHRoaXMuX3JlbmRlcmVyLCB7XHJcbiAgICAgICAgICAgIHRhcmdldHM6IFt0YXJnZXQsIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudF0sXHJcbiAgICAgICAgICAgIG91dHNpZGVDbGljazogdGhpcy5fbGlzdGVuT3B0cy5vdXRzaWRlQ2xpY2ssXHJcbiAgICAgICAgICAgIGhpZGU6ICgpID0+IHRoaXMuX2xpc3Rlbk9wdHMuaGlkZSAmJiB0aGlzLl9saXN0ZW5PcHRzLmhpZGUoKVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9saXN0ZW5PcHRzLm91dHNpZGVFc2MgJiYgdGhpcy5fcmVuZGVyZXIgJiYgdGhpcy5fZWxlbWVudFJlZikge1xyXG4gICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLl9jb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudDtcclxuICAgICAgdGhpcy5fZ2xvYmFsTGlzdGVuZXIgPSByZWdpc3RlckVzY0NsaWNrKHRoaXMuX3JlbmRlcmVyLCB7XHJcbiAgICAgICAgdGFyZ2V0czogW3RhcmdldCwgdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50XSxcclxuICAgICAgICBvdXRzaWRlRXNjOiB0aGlzLl9saXN0ZW5PcHRzLm91dHNpZGVFc2MsXHJcbiAgICAgICAgaGlkZTogKCkgPT4gdGhpcy5fbGlzdGVuT3B0cy5oaWRlICYmIHRoaXMuX2xpc3Rlbk9wdHMuaGlkZSgpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0SW5uZXJDb21wb25lbnQoKTogQ29tcG9uZW50UmVmPFQ+IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLl9pbm5lckNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3N1YnNjcmliZVBvc2l0aW9uaW5nKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX3pvbmVTdWJzY3JpcHRpb24gfHwgIXRoaXMuYXR0YWNobWVudCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vblNob3duLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX3Bvc1NlcnZpY2UucG9zaXRpb24oe1xyXG4gICAgICAgIGVsZW1lbnQ6IHRoaXMuX2NvbXBvbmVudFJlZj8ubG9jYXRpb24sXHJcbiAgICAgICAgdGFyZ2V0OiB0aGlzLl9lbGVtZW50UmVmLFxyXG4gICAgICAgIGF0dGFjaG1lbnQ6IHRoaXMuYXR0YWNobWVudCxcclxuICAgICAgICBhcHBlbmRUb0JvZHk6IHRoaXMuY29udGFpbmVyID09PSAnYm9keSdcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gdGhpcy5fbmdab25lLm9uU3RhYmxlLnN1YnNjcmliZSgoKSA9PiB7XHJcbiAgICAgIGlmICghdGhpcy5fY29tcG9uZW50UmVmKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9wb3NTZXJ2aWNlLmNhbGNQb3NpdGlvbigpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91bnN1YnNjcmliZVBvc2l0aW9uaW5nKCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLl96b25lU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICB0aGlzLl96b25lU3Vic2NyaXB0aW9uID0gdm9pZCAwO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0Q29udGVudFJlZihcclxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICBjb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgYW55LFxyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgIGNvbnRleHQ/OiBhbnksXHJcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgaW5pdGlhbFN0YXRlPzogYW55XHJcbiAgKTogQ29udGVudFJlZiB7XHJcbiAgICBpZiAoIWNvbnRlbnQpIHtcclxuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtdKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XHJcbiAgICAgIGlmICh0aGlzLl92aWV3Q29udGFpbmVyUmVmKSB7XHJcbiAgICAgICAgY29uc3QgX3ZpZXdSZWYgPSB0aGlzLl92aWV3Q29udGFpbmVyUmVmXHJcbiAgICAgICAgICAuY3JlYXRlRW1iZWRkZWRWaWV3PFRlbXBsYXRlUmVmPFQ+Pihjb250ZW50LCBjb250ZXh0KTtcclxuICAgICAgICBfdmlld1JlZi5tYXJrRm9yQ2hlY2soKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFtfdmlld1JlZi5yb290Tm9kZXNdLCBfdmlld1JlZik7XHJcbiAgICAgIH1cclxuICAgICAgY29uc3Qgdmlld1JlZiA9IGNvbnRlbnQuY3JlYXRlRW1iZWRkZWRWaWV3KHt9KTtcclxuICAgICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyh2aWV3UmVmKTtcclxuXHJcbiAgICAgIHJldHVybiBuZXcgQ29udGVudFJlZihbdmlld1JlZi5yb290Tm9kZXNdLCB2aWV3UmVmKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgY29uc3QgY29udGVudENtcHRGYWN0b3J5ID0gdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KFxyXG4gICAgICAgIGNvbnRlbnRcclxuICAgICAgKTtcclxuXHJcbiAgICAgIGNvbnN0IG1vZGFsQ29udGVudEluamVjdG9yID0gSW5qZWN0b3IuY3JlYXRlKHtcclxuICAgICAgICBwcm92aWRlcnM6IHRoaXMuX3Byb3ZpZGVycyxcclxuICAgICAgICBwYXJlbnQ6IHRoaXMuX2luamVjdG9yXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgY29tcG9uZW50UmVmID0gY29udGVudENtcHRGYWN0b3J5LmNyZWF0ZShtb2RhbENvbnRlbnRJbmplY3Rvcik7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICBPYmplY3QuYXNzaWduKGNvbXBvbmVudFJlZi5pbnN0YW5jZSwgaW5pdGlhbFN0YXRlKTtcclxuICAgICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG5cclxuICAgICAgcmV0dXJuIG5ldyBDb250ZW50UmVmKFxyXG4gICAgICAgIFtbY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdXSxcclxuICAgICAgICBjb21wb25lbnRSZWYuaG9zdFZpZXcsXHJcbiAgICAgICAgY29tcG9uZW50UmVmXHJcbiAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgbm9kZXMgPSB0aGlzLl9yZW5kZXJlclxyXG4gICAgICA/IFt0aGlzLl9yZW5kZXJlci5jcmVhdGVUZXh0KGAke2NvbnRlbnR9YCldXHJcbiAgICAgIDogW107XHJcbiAgICByZXR1cm4gbmV3IENvbnRlbnRSZWYoW25vZGVzXSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==