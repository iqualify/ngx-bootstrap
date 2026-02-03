import { ChangeDetectorRef, Component, ElementRef, HostListener, QueryList, Renderer2, ViewChild, ViewChildren, Output, EventEmitter } from '@angular/core';
import { Utils } from 'ngx-bootstrap/utils';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { Subscription } from 'rxjs';
import { latinize } from './typeahead-utils';
import { typeaheadAnimation } from './typeahead-animations';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/positioning";
import * as i2 from "@angular/common";
let nextWindowId = 0;
export class TypeaheadContainerComponent {
    get typeaheadTemplateMethods() {
        return {
            selectMatch: this.selectMatch.bind(this),
            selectActive: this.selectActive.bind(this),
            isActive: this.isActive.bind(this)
        };
    }
    constructor(positionService, renderer, element, changeDetectorRef) {
        this.positionService = positionService;
        this.renderer = renderer;
        this.element = element;
        this.changeDetectorRef = changeDetectorRef;
        // eslint-disable-next-line @angular-eslint/no-output-rename
        this.activeChangeEvent = new EventEmitter();
        this.isFocused = false;
        this.positionServiceSubscription = new Subscription();
        this.height = 0;
        this.popupId = `ngb-typeahead-${nextWindowId++}`;
        this._matches = [];
        this.renderer.setAttribute(this.element.nativeElement, 'id', this.popupId);
        this.positionServiceSubscription.add(this.positionService.event$?.subscribe(() => {
            if (this.isAnimated) {
                this.animationState = this.isTopPosition ? 'animated-up' : 'animated-down';
                this.changeDetectorRef.detectChanges();
                return;
            }
            this.animationState = 'unanimated';
            this.changeDetectorRef.detectChanges();
        }));
    }
    get active() {
        return this._active;
    }
    set active(active) {
        this._active = active;
        this.activeChanged();
    }
    get matches() {
        return this._matches;
    }
    set matches(value) {
        this.positionService.setOptions({
            modifiers: { flip: { enabled: this.adaptivePosition } },
            allowedPositions: ['top', 'bottom']
        });
        this._matches = value;
        this.needScrollbar = this.typeaheadScrollable && this.typeaheadOptionsInScrollableView < this.matches.length;
        if (this.typeaheadScrollable) {
            setTimeout(() => {
                this.setScrollableMode();
            });
        }
        if (this.typeaheadIsFirstItemActive && this._matches.length > 0) {
            this.setActive(this._matches[0]);
            if (this._active?.isHeader()) {
                this.nextActiveMatch();
            }
        }
        if (this._active && !this.typeaheadIsFirstItemActive) {
            const concurrency = this._matches.find(match => match.value === this._active?.value);
            if (concurrency) {
                this.selectActive(concurrency);
                return;
            }
            this.active = void 0;
        }
    }
    get isTopPosition() {
        return this.element.nativeElement.classList.contains('top');
    }
    get optionsListTemplate() {
        return this.parent ? this.parent.optionsListTemplate : undefined;
    }
    get isAnimated() {
        return this.parent ? this.parent.isAnimated : false;
    }
    get adaptivePosition() {
        return this.parent ? this.parent.adaptivePosition : false;
    }
    get typeaheadScrollable() {
        return this.parent ? this.parent.typeaheadScrollable : false;
    }
    get typeaheadOptionsInScrollableView() {
        return this.parent ? this.parent.typeaheadOptionsInScrollableView : 5;
    }
    get typeaheadIsFirstItemActive() {
        return this.parent ? this.parent.typeaheadIsFirstItemActive : true;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get itemTemplate() {
        return this.parent ? this.parent.typeaheadItemTemplate : undefined;
    }
    get canSelectItemsOnBlur() {
        return !!this.parent?.selectItemOnBlur;
    }
    selectActiveMatch(isActiveItemChanged) {
        if (this._active && this.parent?.typeaheadSelectFirstItem) {
            this.selectMatch(this._active);
        }
        if (!this.parent?.typeaheadSelectFirstItem && isActiveItemChanged) {
            this.selectMatch(this._active);
        }
    }
    activeChanged() {
        if (!this._active) {
            return;
        }
        const index = this.matches.indexOf(this._active);
        this.activeChangeEvent.emit(`${this.popupId}-${index}`);
    }
    prevActiveMatch() {
        if (!this._active) {
            return;
        }
        const index = this.matches.indexOf(this._active);
        this.setActive(this.matches[index - 1 < 0 ? this.matches.length - 1 : index - 1]);
        if (this._active.isHeader()) {
            this.prevActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollPrevious(index);
        }
    }
    nextActiveMatch() {
        const index = this._active ? this.matches.indexOf(this._active) : -1;
        this.setActive(this.matches[index + 1 > this.matches.length - 1 ? 0 : index + 1]);
        if (this._active?.isHeader()) {
            this.nextActiveMatch();
        }
        if (this.typeaheadScrollable) {
            this.scrollNext(index);
        }
    }
    selectActive(value) {
        this.isFocused = true;
        this.setActive(value);
    }
    highlight(match, query) {
        let itemStr = match.value;
        let itemStrHelper = (this.parent && this.parent.typeaheadLatinize
            ? latinize(itemStr)
            : itemStr).toLowerCase();
        let startIdx;
        let tokenLen;
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query === 'object') {
            const queryLen = query.length;
            for (let i = 0; i < queryLen; i += 1) {
                // query[i] is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr =
                        `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
                            `${itemStr.substring(startIdx + tokenLen)}`;
                    itemStrHelper =
                        `${itemStrHelper.substring(0, startIdx)}        ${' '.repeat(tokenLen)}         ` +
                            `${itemStrHelper.substring(startIdx + tokenLen)}`;
                }
            }
        }
        else if (query) {
            // query is already latinized and lower case
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr =
                    `${itemStr.substring(0, startIdx)}<strong>${itemStr.substring(startIdx, startIdx + tokenLen)}</strong>` +
                        `${itemStr.substring(startIdx + tokenLen)}`;
            }
        }
        return itemStr;
    }
    focusLost() {
        this.isFocused = false;
        if (!this.canSelectItemsOnBlur) {
            this.setActive(void 0);
        }
    }
    isActive(value) {
        return this.active === value;
    }
    selectMatch(value, event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        this.parent?.changeModel(value);
        setTimeout(() => this.parent?.typeaheadOnSelect.emit(value), 0);
        return false;
    }
    setScrollableMode() {
        if (!this.ulElement) {
            this.ulElement = this.element;
        }
        if (this.liElements?.first) {
            const ulStyles = Utils.getStyles(this.ulElement.nativeElement);
            const liStyles = Utils.getStyles(this.liElements.first.nativeElement);
            const ulPaddingBottom = parseFloat((ulStyles['padding-bottom'] ? ulStyles['padding-bottom'] : '')
                .replace('px', ''));
            const ulPaddingTop = parseFloat((ulStyles['padding-top'] ? ulStyles['padding-top'] : '0')
                .replace('px', ''));
            const optionHeight = parseFloat((liStyles.height ? liStyles.height : '0')
                .replace('px', ''));
            const height = this.typeaheadOptionsInScrollableView * optionHeight;
            this.guiHeight = `${height + ulPaddingTop + ulPaddingBottom}px`;
        }
        this.renderer.setStyle(this.element.nativeElement, 'visibility', 'visible');
    }
    scrollPrevious(index) {
        if (index === 0) {
            this.scrollToBottom();
            return;
        }
        if (this.liElements && this.ulElement) {
            const liElement = this.liElements.toArray()[index - 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop = liElement.nativeElement.offsetTop;
            }
        }
    }
    scrollNext(index) {
        if (index + 1 > this.matches.length - 1) {
            this.scrollToTop();
            return;
        }
        if (this.liElements && this.ulElement) {
            const liElement = this.liElements.toArray()[index + 1];
            if (liElement && !this.isScrolledIntoView(liElement.nativeElement)) {
                this.ulElement.nativeElement.scrollTop =
                    liElement.nativeElement.offsetTop -
                        Number(this.ulElement.nativeElement.offsetHeight) +
                        Number(liElement.nativeElement.offsetHeight);
            }
        }
    }
    ngOnDestroy() {
        this.positionServiceSubscription.unsubscribe();
    }
    setActive(value) {
        this._active = value;
        let preview;
        if (!(this._active == null || this._active.isHeader())) {
            preview = value;
        }
        this.parent?.typeaheadOnPreview.emit(preview);
    }
    isScrolledIntoView(elem) {
        if (!this.ulElement) {
            return false;
        }
        const containerViewTop = this.ulElement.nativeElement.scrollTop;
        const containerViewBottom = containerViewTop + Number(this.ulElement.nativeElement.offsetHeight);
        const elemTop = elem.offsetTop;
        const elemBottom = elemTop + elem.offsetHeight;
        return ((elemBottom <= containerViewBottom) && (elemTop >= containerViewTop));
    }
    scrollToBottom() {
        if (!this.ulElement?.nativeElement) {
            return;
        }
        this.ulElement.nativeElement.scrollTop = this.ulElement.nativeElement.scrollHeight;
    }
    scrollToTop() {
        if (!this.ulElement?.nativeElement) {
            return;
        }
        this.ulElement.nativeElement.scrollTop = 0;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TypeaheadContainerComponent, deps: [{ token: i1.PositioningService }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: TypeaheadContainerComponent, selector: "typeahead-container", outputs: { activeChangeEvent: "activeChange" }, host: { listeners: { "mouseleave": "focusLost()", "blur": "focusLost()" }, properties: { "style.height": "needScrollbar ? guiHeight: 'auto'", "style.visibility": "'inherit'", "class.dropup": "dropup", "attr.role": "'listbox'" }, styleAttribute: "position: absolute;display: block;", classAttribute: "dropdown open bottom dropdown-menu" }, viewQueries: [{ propertyName: "ulElement", first: true, predicate: ["ulElement"], descendants: true }, { propertyName: "liElements", predicate: ["liElements"], descendants: true }], ngImport: i0, template: "<!-- inject options list template -->\r\n<ng-template [ngTemplateOutlet]=\"optionsListTemplate || bs4Template\"\r\n             [ngTemplateOutletContext]=\"{\r\n               matches: matches,\r\n               itemTemplate: itemTemplate || bsItemTemplate,\r\n               query: query,\r\n               $implicit: typeaheadTemplateMethods\r\n             }\">\r\n</ng-template>\r\n\r\n<!-- default options item template -->\r\n<ng-template #bsItemTemplate let-match=\"match\" let-query=\"query\">\r\n  <span [innerHtml]=\"highlight(match, query)\"></span>\r\n</ng-template>\r\n\r\n<!-- Bootstrap 4 options list template -->\r\n<ng-template #bs4Template>\r\n  <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\r\n    <h6 *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</h6>\r\n    <ng-template [ngIf]=\"!match.isHeader()\">\r\n      <button #liElements\r\n              [id]=\"popupId + '-' + i\"\r\n              role=\"option\"\r\n              [@typeaheadAnimation]=\"animationState\"\r\n              class=\"dropdown-item\"\r\n              (click)=\"selectMatch(match, $event)\"\r\n              (mouseenter)=\"selectActive(match)\"\r\n              [class.active]=\"isActive(match)\">\r\n        <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\"\r\n                     [ngTemplateOutletContext]=\"{item: match.item, index: i, match: match, query: query}\">\r\n        </ng-template>\r\n      </button>\r\n    </ng-template>\r\n  </ng-template>\r\n</ng-template>\r\n", styles: [":host.dropdown{z-index:1000}:host.dropdown-menu,.dropdown-menu{overflow-y:auto;height:100px}\n"], dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], animations: [typeaheadAnimation] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TypeaheadContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'typeahead-container', host: {
                        class: 'dropdown open bottom dropdown-menu',
                        '[style.height]': `needScrollbar ? guiHeight: 'auto'`,
                        '[style.visibility]': `'inherit'`,
                        '[class.dropup]': 'dropup',
                        style: 'position: absolute;display: block;',
                        '[attr.role]': `'listbox'`
                    }, animations: [typeaheadAnimation], template: "<!-- inject options list template -->\r\n<ng-template [ngTemplateOutlet]=\"optionsListTemplate || bs4Template\"\r\n             [ngTemplateOutletContext]=\"{\r\n               matches: matches,\r\n               itemTemplate: itemTemplate || bsItemTemplate,\r\n               query: query,\r\n               $implicit: typeaheadTemplateMethods\r\n             }\">\r\n</ng-template>\r\n\r\n<!-- default options item template -->\r\n<ng-template #bsItemTemplate let-match=\"match\" let-query=\"query\">\r\n  <span [innerHtml]=\"highlight(match, query)\"></span>\r\n</ng-template>\r\n\r\n<!-- Bootstrap 4 options list template -->\r\n<ng-template #bs4Template>\r\n  <ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\r\n    <h6 *ngIf=\"match.isHeader()\" class=\"dropdown-header\">{{ match }}</h6>\r\n    <ng-template [ngIf]=\"!match.isHeader()\">\r\n      <button #liElements\r\n              [id]=\"popupId + '-' + i\"\r\n              role=\"option\"\r\n              [@typeaheadAnimation]=\"animationState\"\r\n              class=\"dropdown-item\"\r\n              (click)=\"selectMatch(match, $event)\"\r\n              (mouseenter)=\"selectActive(match)\"\r\n              [class.active]=\"isActive(match)\">\r\n        <ng-template [ngTemplateOutlet]=\"itemTemplate || bsItemTemplate\"\r\n                     [ngTemplateOutletContext]=\"{item: match.item, index: i, match: match, query: query}\">\r\n        </ng-template>\r\n      </button>\r\n    </ng-template>\r\n  </ng-template>\r\n</ng-template>\r\n", styles: [":host.dropdown{z-index:1000}:host.dropdown-menu,.dropdown-menu{overflow-y:auto;height:100px}\n"] }]
        }], ctorParameters: () => [{ type: i1.PositioningService }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }], propDecorators: { activeChangeEvent: [{
                type: Output,
                args: ['activeChange']
            }], ulElement: [{
                type: ViewChild,
                args: ['ulElement', { static: false }]
            }], liElements: [{
                type: ViewChildren,
                args: ['liElements']
            }], focusLost: [{
                type: HostListener,
                args: ['mouseleave']
            }, {
                type: HostListener,
                args: ['blur']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdHlwZWFoZWFkL3R5cGVhaGVhZC1jb250YWluZXIuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vc3JjL3R5cGVhaGVhZC90eXBlYWhlYWQtY29udGFpbmVyLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxpQkFBaUIsRUFDakIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBRVosU0FBUyxFQUNULFNBQVMsRUFFVCxTQUFTLEVBQ1QsWUFBWSxFQUNaLE1BQU0sRUFDTixZQUFZLEVBQ2IsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzVDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFcEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRzdDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLHdCQUF3QixDQUFDOzs7O0FBRzVELElBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQTZCckIsTUFBTSxPQUFPLDJCQUEyQjtJQW1CdEMsSUFBSSx3QkFBd0I7UUFDMUIsT0FBTztZQUNMLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEMsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUMxQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ25DLENBQUM7SUFDSixDQUFDO0lBV0QsWUFDVSxlQUFtQyxFQUNuQyxRQUFtQixFQUNwQixPQUFtQixFQUNs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M0IsMkJBQTJCLG9uQkN0RHhDLDIvQ0FtQ0Esa2hCRGdCYyxDQUFDLGtCQUFrQixDQUFDOzsyRkFHckIsMkJBQTJCO2tCQTNCdkMsU0FBUzsrQkFDRSxxQkFBcUIsUUFHekI7d0JBQ0osS0FBSyxFQUFFLG9DQUFvQzt3QkFDM0MsZ0JBQWdCLEVBQUUsbUNBQW1DO3dCQUNyRCxvQkFBb0IsRUFBRSxXQUFXO3dCQUNqQyxnQkFBZ0IsRUFBRSxRQUFRO3dCQUMxQixLQUFLLEVBQUUsb0NBQW9DO3dCQUMzQyxhQUFhLEVBQUUsV0FBVztxQkFDM0IsY0FhVyxDQUFDLGtCQUFrQixDQUFDO3dLQUtSLGlCQUFpQjtzQkFBeEMsTUFBTTt1QkFBQyxjQUFjO2dCQTZCZCxTQUFTO3NCQURoQixTQUFTO3VCQUFDLFdBQVcsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUU7Z0JBSWpDLFVBQVU7c0JBRGpCLFlBQVk7dUJBQUMsWUFBWTtnQkErTTFCLFNBQVM7c0JBRlIsWUFBWTt1QkFBQyxZQUFZOztzQkFDekIsWUFBWTt1QkFBQyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgT25EZXN0cm95LFxyXG4gIFF1ZXJ5TGlzdCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVGVtcGxhdGVSZWYsXHJcbiAgVmlld0NoaWxkLFxyXG4gIFZpZXdDaGlsZHJlbixcclxuICBPdXRwdXQsXHJcbiAgRXZlbnRFbWl0dGVyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBVdGlscyB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xyXG5pbXBvcnQgeyBQb3NpdGlvbmluZ1NlcnZpY2UgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBsYXRpbml6ZSB9IGZyb20gJy4vdHlwZWFoZWFkLXV0aWxzJztcclxuaW1wb3J0IHsgVHlwZWFoZWFkTWF0Y2ggfSBmcm9tICcuL3R5cGVhaGVhZC1tYXRjaC5jbGFzcyc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZERpcmVjdGl2ZSB9IGZyb20gJy4vdHlwZWFoZWFkLmRpcmVjdGl2ZSc7XHJcbmltcG9ydCB7IHR5cGVhaGVhZEFuaW1hdGlvbiB9IGZyb20gJy4vdHlwZWFoZWFkLWFuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRPcHRpb25JdGVtQ29udGV4dCwgVHlwZWFoZWFkT3B0aW9uTGlzdENvbnRleHQsIFR5cGVhaGVhZFRlbXBsYXRlTWV0aG9kcyB9IGZyb20gJy4vbW9kZWxzJztcclxuXHJcbmxldCBuZXh0V2luZG93SWQgPSAwO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICd0eXBlYWhlYWQtY29udGFpbmVyJyxcclxuICB0ZW1wbGF0ZVVybDogJy4vdHlwZWFoZWFkLWNvbnRhaW5lci5jb21wb25lbnQuaHRtbCcsXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdkcm9wZG93biBvcGVuIGJvdHRvbSBkcm9wZG93bi1tZW51JyxcclxuICAgICdbc3R5bGUuaGVpZ2h0XSc6IGBuZWVkU2Nyb2xsYmFyID8gZ3VpSGVpZ2h0OiAnYXV0bydgLFxyXG4gICAgJ1tzdHlsZS52aXNpYmlsaXR5XSc6IGAnaW5oZXJpdCdgLFxyXG4gICAgJ1tjbGFzcy5kcm9wdXBdJzogJ2Ryb3B1cCcsXHJcbiAgICBzdHlsZTogJ3Bvc2l0aW9uOiBhYnNvbHV0ZTtkaXNwbGF5OiBibG9jazsnLFxyXG4gICAgJ1thdHRyLnJvbGVdJzogYCdsaXN0Ym94J2BcclxuICB9LFxyXG4gIHN0eWxlczogW1xyXG4gICAgYFxyXG4gICAgOmhvc3QuZHJvcGRvd24ge1xyXG4gICAgICB6LWluZGV4OiAxMDAwO1xyXG4gICAgfVxyXG5cclxuICAgIDpob3N0LmRyb3Bkb3duLW1lbnUsIC5kcm9wZG93bi1tZW51IHtcclxuICAgICAgb3ZlcmZsb3cteTogYXV0bztcclxuICAgICAgaGVpZ2h0OiAxMDBweDtcclxuICAgIH1cclxuICBgXHJcbiAgXSxcclxuICBhbmltYXRpb25zOiBbdHlwZWFoZWFkQW5pbWF0aW9uXVxyXG59KVxyXG5cclxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1vdXRwdXQtcmVuYW1lXHJcbiAgQE91dHB1dCgnYWN0aXZlQ2hhbmdlJykgYWN0aXZlQ2hhbmdlRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIHBhcmVudD86IFR5cGVhaGVhZERpcmVjdGl2ZTtcclxuICBxdWVyeT86IHN0cmluZ1tdIHwgc3RyaW5nO1xyXG4gIGlzRm9jdXNlZCA9IGZhbHNlO1xyXG4gIHRvcD86IHN0cmluZztcclxuICBsZWZ0Pzogc3RyaW5nO1xyXG4gIGRpc3BsYXk/OiBzdHJpbmc7XHJcbiAgcGxhY2VtZW4/OiBzdHJpbmc7XHJcbiAgZHJvcHVwPzogYm9vbGVhbjtcclxuICBndWlIZWlnaHQ/OiBzdHJpbmc7XHJcbiAgbmVlZFNjcm9sbGJhcj86IGJvb2xlYW47XHJcbiAgYW5pbWF0aW9uU3RhdGU/OiBzdHJpbmc7XHJcbiAgcG9zaXRpb25TZXJ2aWNlU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xyXG4gIGhlaWdodCA9IDA7XHJcbiAgcG9wdXBJZCA9IGBuZ2ItdHlwZWFoZWFkLSR7bmV4dFdpbmRvd0lkKyt9YDtcclxuXHJcbiAgZ2V0IHR5cGVhaGVhZFRlbXBsYXRlTWV0aG9kcygpOiBUeXBlYWhlYWRUZW1wbGF0ZU1ldGhvZHMge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgc2VsZWN0TWF0Y2g6IHRoaXMuc2VsZWN0TWF0Y2guYmluZCh0aGlzKSxcclxuICAgICAgc2VsZWN0QWN0aXZlOiB0aGlzLnNlbGVjdEFjdGl2ZS5iaW5kKHRoaXMpLFxyXG4gICAgICBpc0FjdGl2ZTogdGhpcy5pc0FjdGl2ZS5iaW5kKHRoaXMpXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIF9hY3RpdmU/OiBUeXBlYWhlYWRNYXRjaDtcclxuICBwcm90ZWN0ZWQgX21hdGNoZXM6IFR5cGVhaGVhZE1hdGNoW10gPSBbXTtcclxuXHJcbiAgQFZpZXdDaGlsZCgndWxFbGVtZW50JywgeyBzdGF0aWM6IGZhbHNlIH0pXHJcbiAgcHJpdmF0ZSB1bEVsZW1lbnQ/OiBFbGVtZW50UmVmO1xyXG5cclxuICBAVmlld0NoaWxkcmVuKCdsaUVsZW1lbnRzJylcclxuICBwcml2YXRlIGxpRWxlbWVudHM/OiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBwb3NpdGlvblNlcnZpY2U6IFBvc2l0aW9uaW5nU2VydmljZSxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHB1YmxpYyBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWZcclxuICApIHtcclxuICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnaWQnLCB0aGlzLnBvcHVwSWQpO1xyXG4gICAgdGhpcy5wb3NpdGlvblNlcnZpY2VTdWJzY3JpcHRpb24uYWRkKHRoaXMucG9zaXRpb25TZXJ2aWNlLmV2ZW50JD8uc3Vic2NyaWJlKFxyXG4gICAgICAoKSA9PiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNBbmltYXRlZCkge1xyXG4gICAgICAgICAgdGhpcy5hbmltYXRpb25TdGF0ZSA9IHRoaXMuaXNUb3BQb3NpdGlvbiA/ICdhbmltYXRlZC11cCcgOiAnYW5pbWF0ZWQtZG93bic7XHJcbiAgICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcclxuXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmFuaW1hdGlvblN0YXRlID0gJ3VuYW5pbWF0ZWQnO1xyXG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xyXG4gICAgICB9XHJcbiAgICApKTtcclxuICB9XHJcblxyXG4gIGdldCBhY3RpdmUoKTogVHlwZWFoZWFkTWF0Y2ggfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjdGl2ZTtcclxuICB9XHJcblxyXG4gIHNldCBhY3RpdmUoYWN0aXZlOiBUeXBlYWhlYWRNYXRjaCB8IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5fYWN0aXZlID0gYWN0aXZlO1xyXG4gICAgdGhpcy5hY3RpdmVDaGFuZ2VkKCk7XHJcbiAgfVxyXG5cclxuICBnZXQgbWF0Y2hlcygpOiBUeXBlYWhlYWRNYXRjaFtdIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXRjaGVzO1xyXG4gIH1cclxuXHJcbiAgc2V0IG1hdGNoZXModmFsdWU6IFR5cGVhaGVhZE1hdGNoW10pIHtcclxuICAgIHRoaXMucG9zaXRpb25TZXJ2aWNlLnNldE9wdGlvbnMoe1xyXG4gICAgICBtb2RpZmllcnM6IHsgZmxpcDogeyBlbmFibGVkOiB0aGlzLmFkYXB0aXZlUG9zaXRpb24gfSB9LFxyXG4gICAgICBhbGxvd2VkUG9zaXRpb25zOiBbJ3RvcCcsICdib3R0b20nXVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5fbWF0Y2hlcyA9IHZhbHVlO1xyXG5cclxuICAgIHRoaXMubmVlZFNjcm9sbGJhciA9IHRoaXMudHlwZWFoZWFkU2Nyb2xsYWJsZSAmJiB0aGlzLnR5cGVhaGVhZE9wdGlvbnNJblNjcm9sbGFibGVWaWV3IDwgdGhpcy5tYXRjaGVzLmxlbmd0aDtcclxuXHJcbiAgICBpZiAodGhpcy50eXBlYWhlYWRTY3JvbGxhYmxlKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U2Nyb2xsYWJsZU1vZGUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHlwZWFoZWFkSXNGaXJzdEl0ZW1BY3RpdmUgJiYgdGhpcy5fbWF0Y2hlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMuc2V0QWN0aXZlKHRoaXMuX21hdGNoZXNbMF0pO1xyXG5cclxuICAgICAgaWYgKHRoaXMuX2FjdGl2ZT8uaXNIZWFkZXIoKSkge1xyXG4gICAgICAgIHRoaXMubmV4dEFjdGl2ZU1hdGNoKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fYWN0aXZlICYmICF0aGlzLnR5cGVhaGVhZElzRmlyc3RJdGVtQWN0aXZlKSB7XHJcbiAgICAgIGNvbnN0IGNvbmN1cnJlbmN5ID0gdGhpcy5fbWF0Y2hlcy5maW5kKG1hdGNoID0+IG1hdGNoLnZhbHVlID09PSB0aGlzLl9hY3RpdmU/LnZhbHVlKTtcclxuXHJcbiAgICAgIGlmIChjb25jdXJyZW5jeSkge1xyXG4gICAgICAgIHRoaXMuc2VsZWN0QWN0aXZlKGNvbmN1cnJlbmN5KTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmFjdGl2ZSA9IHZvaWQgMDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBpc1RvcFBvc2l0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucygndG9wJyk7XHJcbiAgfVxyXG5cclxuICBnZXQgb3B0aW9uc0xpc3RUZW1wbGF0ZSgpOiBUZW1wbGF0ZVJlZjxUeXBlYWhlYWRPcHRpb25MaXN0Q29udGV4dD4gfCB1bmRlZmluZWQge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQub3B0aW9uc0xpc3RUZW1wbGF0ZSA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGdldCBpc0FuaW1hdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuaXNBbmltYXRlZCA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGFkYXB0aXZlUG9zaXRpb24oKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQgPyB0aGlzLnBhcmVudC5hZGFwdGl2ZVBvc2l0aW9uIDogZmFsc2U7XHJcbiAgfVxyXG5cclxuICBnZXQgdHlwZWFoZWFkU2Nyb2xsYWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnR5cGVhaGVhZFNjcm9sbGFibGUgOiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGdldCB0eXBlYWhlYWRPcHRpb25zSW5TY3JvbGxhYmxlVmlldygpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQudHlwZWFoZWFkT3B0aW9uc0luU2Nyb2xsYWJsZVZpZXcgOiA1O1xyXG4gIH1cclxuXHJcbiAgZ2V0IHR5cGVhaGVhZElzRmlyc3RJdGVtQWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQudHlwZWFoZWFkSXNGaXJzdEl0ZW1BY3RpdmUgOiB0cnVlO1xyXG4gIH1cclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gIGdldCBpdGVtVGVtcGxhdGUoKTogVGVtcGxhdGVSZWY8VHlwZWFoZWFkT3B0aW9uSXRlbUNvbnRleHQ+IHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LnR5cGVhaGVhZEl0ZW1UZW1wbGF0ZSA6IHVuZGVmaW5lZDtcclxuICB9XHJcblxyXG4gIGdldCBjYW5TZWxlY3RJdGVtc09uQmx1cigpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhIXRoaXMucGFyZW50Py5zZWxlY3RJdGVtT25CbHVyO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0QWN0aXZlTWF0Y2goaXNBY3RpdmVJdGVtQ2hhbmdlZD86IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9hY3RpdmUgJiYgdGhpcy5wYXJlbnQ/LnR5cGVhaGVhZFNlbGVjdEZpcnN0SXRlbSkge1xyXG4gICAgICB0aGlzLnNlbGVjdE1hdGNoKHRoaXMuX2FjdGl2ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnBhcmVudD8udHlwZWFoZWFkU2VsZWN0Rmlyc3RJdGVtICYmIGlzQWN0aXZlSXRlbUNoYW5nZWQpIHtcclxuICAgICAgdGhpcy5zZWxlY3RNYXRjaCh0aGlzLl9hY3RpdmUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgYWN0aXZlQ2hhbmdlZCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5fYWN0aXZlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5tYXRjaGVzLmluZGV4T2YodGhpcy5fYWN0aXZlKTtcclxuICAgIHRoaXMuYWN0aXZlQ2hhbmdlRXZlbnQuZW1pdChgJHt0aGlzLnBvcHVwSWR9LSR7aW5kZXh9YCk7XHJcbiAgfVxyXG5cclxuICBwcmV2QWN0aXZlTWF0Y2goKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX2FjdGl2ZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5kZXggPSB0aGlzLm1hdGNoZXMuaW5kZXhPZih0aGlzLl9hY3RpdmUpO1xyXG4gICAgdGhpcy5zZXRBY3RpdmUodGhpcy5tYXRjaGVzW1xyXG4gICAgICBpbmRleCAtIDEgPCAwID8gdGhpcy5tYXRjaGVzLmxlbmd0aCAtIDEgOiBpbmRleCAtIDFcclxuICAgICAgXSk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2FjdGl2ZS5pc0hlYWRlcigpKSB7XHJcbiAgICAgIHRoaXMucHJldkFjdGl2ZU1hdGNoKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMudHlwZWFoZWFkU2Nyb2xsYWJsZSkge1xyXG4gICAgICB0aGlzLnNjcm9sbFByZXZpb3VzKGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5leHRBY3RpdmVNYXRjaCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5fYWN0aXZlID8gdGhpcy5tYXRjaGVzLmluZGV4T2YodGhpcy5fYWN0aXZlKSA6IC0xO1xyXG4gICAgdGhpcy5zZXRBY3RpdmUodGhpcy5tYXRjaGVzW1xyXG4gICAgICBpbmRleCArIDEgPiB0aGlzLm1hdGNoZXMubGVuZ3RoIC0gMSA/IDAgOiBpbmRleCArIDFcclxuICAgICAgXSk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2FjdGl2ZT8uaXNIZWFkZXIoKSkge1xyXG4gICAgICB0aGlzLm5leHRBY3RpdmVNYXRjaCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLnR5cGVhaGVhZFNjcm9sbGFibGUpIHtcclxuICAgICAgdGhpcy5zY3JvbGxOZXh0KGluZGV4KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHNlbGVjdEFjdGl2ZSh2YWx1ZTogVHlwZWFoZWFkTWF0Y2gpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNGb2N1c2VkID0gdHJ1ZTtcclxuICAgIHRoaXMuc2V0QWN0aXZlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIGhpZ2hsaWdodChtYXRjaDogVHlwZWFoZWFkTWF0Y2gsIHF1ZXJ5OiBzdHJpbmdbXSB8IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICBsZXQgaXRlbVN0cjogc3RyaW5nID0gbWF0Y2gudmFsdWU7XHJcbiAgICBsZXQgaXRlbVN0ckhlbHBlcjogc3RyaW5nID0gKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LnR5cGVhaGVhZExhdGluaXplXHJcbiAgICAgID8gbGF0aW5pemUoaXRlbVN0cilcclxuICAgICAgOiBpdGVtU3RyKS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgbGV0IHN0YXJ0SWR4OiBudW1iZXI7XHJcbiAgICBsZXQgdG9rZW5MZW46IG51bWJlcjtcclxuICAgIC8vIFJlcGxhY2VzIHRoZSBjYXB0dXJlIHN0cmluZyB3aXRoIHRoZSBzYW1lIHN0cmluZyBpbnNpZGUgb2YgYSBcInN0cm9uZ1wiIHRhZ1xyXG4gICAgaWYgKHR5cGVvZiBxdWVyeSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgY29uc3QgcXVlcnlMZW46IG51bWJlciA9IHF1ZXJ5Lmxlbmd0aDtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBxdWVyeUxlbjsgaSArPSAxKSB7XHJcbiAgICAgICAgLy8gcXVlcnlbaV0gaXMgYWxyZWFkeSBsYXRpbml6ZWQgYW5kIGxvd2VyIGNhc2VcclxuICAgICAgICBzdGFydElkeCA9IGl0ZW1TdHJIZWxwZXIuaW5kZXhPZihxdWVyeVtpXSk7XHJcbiAgICAgICAgdG9rZW5MZW4gPSBxdWVyeVtpXS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHN0YXJ0SWR4ID49IDAgJiYgdG9rZW5MZW4gPiAwKSB7XHJcbiAgICAgICAgICBpdGVtU3RyID1cclxuICAgICAgICAgICAgYCR7aXRlbVN0ci5zdWJzdHJpbmcoMCwgc3RhcnRJZHgpfTxzdHJvbmc+JHtpdGVtU3RyLnN1YnN0cmluZyhzdGFydElkeCwgc3RhcnRJZHggKyB0b2tlbkxlbil9PC9zdHJvbmc+YCArXHJcbiAgICAgICAgICAgIGAke2l0ZW1TdHIuc3Vic3RyaW5nKHN0YXJ0SWR4ICsgdG9rZW5MZW4pfWA7XHJcbiAgICAgICAgICBpdGVtU3RySGVscGVyID1cclxuICAgICAgICAgICAgYCR7aXRlbVN0ckhlbHBlci5zdWJzdHJpbmcoMCwgc3RhcnRJZHgpfSAgICAgICAgJHsnICcucmVwZWF0KHRva2VuTGVuKX0gICAgICAgICBgICtcclxuICAgICAgICAgICAgYCR7aXRlbVN0ckhlbHBlci5zdWJzdHJpbmcoc3RhcnRJZHggKyB0b2tlbkxlbil9YDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAocXVlcnkpIHtcclxuICAgICAgLy8gcXVlcnkgaXMgYWxyZWFkeSBsYXRpbml6ZWQgYW5kIGxvd2VyIGNhc2VcclxuICAgICAgc3RhcnRJZHggPSBpdGVtU3RySGVscGVyLmluZGV4T2YocXVlcnkpO1xyXG4gICAgICB0b2tlbkxlbiA9IHF1ZXJ5Lmxlbmd0aDtcclxuICAgICAgaWYgKHN0YXJ0SWR4ID49IDAgJiYgdG9rZW5MZW4gPiAwKSB7XHJcbiAgICAgICAgaXRlbVN0ciA9XHJcbiAgICAgICAgICBgJHtpdGVtU3RyLnN1YnN0cmluZygwLCBzdGFydElkeCl9PHN0cm9uZz4ke2l0ZW1TdHIuc3Vic3RyaW5nKHN0YXJ0SWR4LCBzdGFydElkeCArIHRva2VuTGVuKX08L3N0cm9uZz5gICtcclxuICAgICAgICAgIGAke2l0ZW1TdHIuc3Vic3RyaW5nKHN0YXJ0SWR4ICsgdG9rZW5MZW4pfWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaXRlbVN0cjtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxyXG4gIGZvY3VzTG9zdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XHJcbiAgICBpZiAoIXRoaXMuY2FuU2VsZWN0SXRlbXNPbkJsdXIpIHtcclxuICAgICAgdGhpcy5zZXRBY3RpdmUodm9pZCAwKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlzQWN0aXZlKHZhbHVlOiBUeXBlYWhlYWRNYXRjaCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuYWN0aXZlID09PSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIHNlbGVjdE1hdGNoKHZhbHVlPzogVHlwZWFoZWFkTWF0Y2gsIGV2ZW50PzogRXZlbnQpOiBib29sZWFuIHtcclxuICAgIGlmIChldmVudCkge1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH1cclxuICAgIHRoaXMucGFyZW50Py5jaGFuZ2VNb2RlbCh2YWx1ZSk7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGFyZW50Py50eXBlYWhlYWRPblNlbGVjdC5lbWl0KHZhbHVlKSwgMCk7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgc2V0U2Nyb2xsYWJsZU1vZGUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMudWxFbGVtZW50KSB7XHJcbiAgICAgIHRoaXMudWxFbGVtZW50ID0gdGhpcy5lbGVtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmxpRWxlbWVudHM/LmZpcnN0KSB7XHJcbiAgICAgIGNvbnN0IHVsU3R5bGVzID0gVXRpbHMuZ2V0U3R5bGVzKHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICBjb25zdCBsaVN0eWxlcyA9IFV0aWxzLmdldFN0eWxlcyh0aGlzLmxpRWxlbWVudHMuZmlyc3QubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIGNvbnN0IHVsUGFkZGluZ0JvdHRvbSA9IHBhcnNlRmxvYXQoKHVsU3R5bGVzWydwYWRkaW5nLWJvdHRvbSddID8gdWxTdHlsZXNbJ3BhZGRpbmctYm90dG9tJ10gOiAnJylcclxuICAgICAgICAucmVwbGFjZSgncHgnLCAnJykpO1xyXG4gICAgICBjb25zdCB1bFBhZGRpbmdUb3AgPSBwYXJzZUZsb2F0KCh1bFN0eWxlc1sncGFkZGluZy10b3AnXSA/IHVsU3R5bGVzWydwYWRkaW5nLXRvcCddIDogJzAnKVxyXG4gICAgICAgIC5yZXBsYWNlKCdweCcsICcnKSk7XHJcbiAgICAgIGNvbnN0IG9wdGlvbkhlaWdodCA9IHBhcnNlRmxvYXQoKGxpU3R5bGVzLmhlaWdodCA/IGxpU3R5bGVzLmhlaWdodCA6ICcwJylcclxuICAgICAgICAucmVwbGFjZSgncHgnLCAnJykpO1xyXG4gICAgICBjb25zdCBoZWlnaHQgPSB0aGlzLnR5cGVhaGVhZE9wdGlvbnNJblNjcm9sbGFibGVWaWV3ICogb3B0aW9uSGVpZ2h0O1xyXG4gICAgICB0aGlzLmd1aUhlaWdodCA9IGAke2hlaWdodCArIHVsUGFkZGluZ1RvcCArIHVsUGFkZGluZ0JvdHRvbX1weGA7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmVsZW1lbnQubmF0aXZlRWxlbWVudCwgJ3Zpc2liaWxpdHknLCAndmlzaWJsZScpO1xyXG4gIH1cclxuXHJcbiAgc2Nyb2xsUHJldmlvdXMoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKGluZGV4ID09PSAwKSB7XHJcbiAgICAgIHRoaXMuc2Nyb2xsVG9Cb3R0b20oKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxpRWxlbWVudHMgJiYgdGhpcy51bEVsZW1lbnQpIHtcclxuICAgICAgY29uc3QgbGlFbGVtZW50ID0gdGhpcy5saUVsZW1lbnRzLnRvQXJyYXkoKVtpbmRleCAtIDFdO1xyXG4gICAgICBpZiAobGlFbGVtZW50ICYmICF0aGlzLmlzU2Nyb2xsZWRJbnRvVmlldyhsaUVsZW1lbnQubmF0aXZlRWxlbWVudCkpIHtcclxuICAgICAgICB0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbFRvcCA9IGxpRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcDtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2Nyb2xsTmV4dChpbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICBpZiAoaW5kZXggKyAxID4gdGhpcy5tYXRjaGVzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgdGhpcy5zY3JvbGxUb1RvcCgpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGlFbGVtZW50cyAmJiB0aGlzLnVsRWxlbWVudCkge1xyXG4gICAgICBjb25zdCBsaUVsZW1lbnQgPSB0aGlzLmxpRWxlbWVudHMudG9BcnJheSgpW2luZGV4ICsgMV07XHJcbiAgICAgIGlmIChsaUVsZW1lbnQgJiYgIXRoaXMuaXNTY3JvbGxlZEludG9WaWV3KGxpRWxlbWVudC5uYXRpdmVFbGVtZW50KSkge1xyXG4gICAgICAgIHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID1cclxuICAgICAgICAgIGxpRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldFRvcCAtXHJcbiAgICAgICAgICBOdW1iZXIodGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpICtcclxuICAgICAgICAgIE51bWJlcihsaUVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMucG9zaXRpb25TZXJ2aWNlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgc2V0QWN0aXZlKHZhbHVlPzogVHlwZWFoZWFkTWF0Y2gpOiB2b2lkIHtcclxuICAgIHRoaXMuX2FjdGl2ZSA9IHZhbHVlO1xyXG4gICAgbGV0IHByZXZpZXc7XHJcbiAgICBpZiAoISh0aGlzLl9hY3RpdmUgPT0gbnVsbCB8fCB0aGlzLl9hY3RpdmUuaXNIZWFkZXIoKSkpIHtcclxuICAgICAgcHJldmlldyA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5wYXJlbnQ/LnR5cGVhaGVhZE9uUHJldmlldy5lbWl0KHByZXZpZXcpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc1Njcm9sbGVkSW50b1ZpZXcoZWxlbTogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy51bEVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgY29udGFpbmVyVmlld1RvcDogbnVtYmVyID0gdGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICBjb25zdCBjb250YWluZXJWaWV3Qm90dG9tID0gY29udGFpbmVyVmlld1RvcCArIE51bWJlcih0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodCk7XHJcbiAgICBjb25zdCBlbGVtVG9wID0gZWxlbS5vZmZzZXRUb3A7XHJcbiAgICBjb25zdCBlbGVtQm90dG9tID0gZWxlbVRvcCArIGVsZW0ub2Zmc2V0SGVpZ2h0O1xyXG5cclxuICAgIHJldHVybiAoKGVsZW1Cb3R0b20gPD0gY29udGFpbmVyVmlld0JvdHRvbSkgJiYgKGVsZW1Ub3AgPj0gY29udGFpbmVyVmlld1RvcCkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzY3JvbGxUb0JvdHRvbSgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy51bEVsZW1lbnQ/Lm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy51bEVsZW1lbnQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSB0aGlzLnVsRWxlbWVudC5uYXRpdmVFbGVtZW50LnNjcm9sbEhlaWdodDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2Nyb2xsVG9Ub3AoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMudWxFbGVtZW50Py5uYXRpdmVFbGVtZW50KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMudWxFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gMDtcclxuICB9XHJcbn1cclxuIiwiPCEtLSBpbmplY3Qgb3B0aW9ucyBsaXN0IHRlbXBsYXRlIC0tPlxyXG48bmctdGVtcGxhdGUgW25nVGVtcGxhdGVPdXRsZXRdPVwib3B0aW9uc0xpc3RUZW1wbGF0ZSB8fCBiczRUZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICBbbmdUZW1wbGF0ZU91dGxldENvbnRleHRdPVwie1xyXG4gICAgICAgICAgICAgICBtYXRjaGVzOiBtYXRjaGVzLFxyXG4gICAgICAgICAgICAgICBpdGVtVGVtcGxhdGU6IGl0ZW1UZW1wbGF0ZSB8fCBic0l0ZW1UZW1wbGF0ZSxcclxuICAgICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxyXG4gICAgICAgICAgICAgICAkaW1wbGljaXQ6IHR5cGVhaGVhZFRlbXBsYXRlTWV0aG9kc1xyXG4gICAgICAgICAgICAgfVwiPlxyXG48L25nLXRlbXBsYXRlPlxyXG5cclxuPCEtLSBkZWZhdWx0IG9wdGlvbnMgaXRlbSB0ZW1wbGF0ZSAtLT5cclxuPG5nLXRlbXBsYXRlICNic0l0ZW1UZW1wbGF0ZSBsZXQtbWF0Y2g9XCJtYXRjaFwiIGxldC1xdWVyeT1cInF1ZXJ5XCI+XHJcbiAgPHNwYW4gW2lubmVySHRtbF09XCJoaWdobGlnaHQobWF0Y2gsIHF1ZXJ5KVwiPjwvc3Bhbj5cclxuPC9uZy10ZW1wbGF0ZT5cclxuXHJcbjwhLS0gQm9vdHN0cmFwIDQgb3B0aW9ucyBsaXN0IHRlbXBsYXRlIC0tPlxyXG48bmctdGVtcGxhdGUgI2JzNFRlbXBsYXRlPlxyXG4gIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtbWF0Y2ggbGV0LWk9XCJpbmRleFwiIFtuZ0Zvck9mXT1cIm1hdGNoZXNcIj5cclxuICAgIDxoNiAqbmdJZj1cIm1hdGNoLmlzSGVhZGVyKClcIiBjbGFzcz1cImRyb3Bkb3duLWhlYWRlclwiPnt7IG1hdGNoIH19PC9oNj5cclxuICAgIDxuZy10ZW1wbGF0ZSBbbmdJZl09XCIhbWF0Y2guaXNIZWFkZXIoKVwiPlxyXG4gICAgICA8YnV0dG9uICNsaUVsZW1lbnRzXHJcbiAgICAgICAgICAgICAgW2lkXT1cInBvcHVwSWQgKyAnLScgKyBpXCJcclxuICAgICAgICAgICAgICByb2xlPVwib3B0aW9uXCJcclxuICAgICAgICAgICAgICBbQHR5cGVhaGVhZEFuaW1hdGlvbl09XCJhbmltYXRpb25TdGF0ZVwiXHJcbiAgICAgICAgICAgICAgY2xhc3M9XCJkcm9wZG93bi1pdGVtXCJcclxuICAgICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0TWF0Y2gobWF0Y2gsICRldmVudClcIlxyXG4gICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cInNlbGVjdEFjdGl2ZShtYXRjaClcIlxyXG4gICAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmUobWF0Y2gpXCI+XHJcbiAgICAgICAgPG5nLXRlbXBsYXRlIFtuZ1RlbXBsYXRlT3V0bGV0XT1cIml0ZW1UZW1wbGF0ZSB8fCBic0l0ZW1UZW1wbGF0ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7aXRlbTogbWF0Y2guaXRlbSwgaW5kZXg6IGksIG1hdGNoOiBtYXRjaCwgcXVlcnk6IHF1ZXJ5fVwiPlxyXG4gICAgICAgIDwvbmctdGVtcGxhdGU+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9uZy10ZW1wbGF0ZT5cclxuICA8L25nLXRlbXBsYXRlPlxyXG48L25nLXRlbXBsYXRlPlxyXG4iXX0=