/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/* eslint-disable */
import { Platform } from './platform';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./platform";
/**
 * Configuration for the isFocusable method.
 */
export class IsFocusableConfig {
    constructor() {
        /**
         * Whether to count an element as focusable even if it is not currently visible.
         */
        this.ignoreVisibility = false;
    }
}
// The InteractivityChecker leans heavily on the ally.js accessibility utilities.
// Methods like `isTabbable` are only covering specific edge-cases for the browsers which are
// supported.
/**
 * Utility for checking the interactivity of an element, such as whether is is focusable or
 * tabbable.
 */
export class InteractivityChecker {
    constructor(_platform) {
        this._platform = _platform;
    }
    /**
     * Gets whether an element is disabled.
     *
     * @param element Element to be checked.
     * @returns Whether the element is disabled.
     */
    isDisabled(element) {
        // This does not capture some cases, such as a non-form control with a disabled attribute or
        // a form control inside of a disabled form, but should capture the most common cases.
        return element.hasAttribute('disabled');
    }
    /**
     * Gets whether an element is visible for the purposes of interactivity.
     *
     * This will capture states like `display: none` and `visibility: hidden`, but not things like
     * being clipped by an `overflow: hidden` parent or being outside the viewport.
     *
     * @returns Whether the element is visible.
     */
    isVisible(element) {
        return hasGeometry(element) && getComputedStyle(element).visibility === 'visible';
    }
    /**
     * Gets whether an element can be reached via Tab key.
     * Assumes that the element has already been checked with isFocusable.
     *
     * @param element Element to be checked.
     * @returns Whether the element is tabbable.
     */
    isTabbable(element) {
        // Nothing is tabbable on the server 😎
        if (!this._platform.isBrowser) {
            return false;
        }
        const frameElement = getFrameElement(getWindow(element));
        if (frameElement) {
            // Frame elements inherit their tabindex onto all child elements.
            if (getTabIndexValue(frameElement) === -1) {
                return false;
            }
            // Browsers disable tabbing to an element inside of an invisible frame.
            if (!this.isVisible(frameElement)) {
                return false;
            }
        }
        let nodeName = element.nodeName.toLowerCase();
        let tabIndexValue = getTabIndexValue(element);
        if (element.hasAttribute('contenteditable')) {
            return tabIndexValue !== -1;
        }
        if (nodeName === 'iframe' || nodeName === 'object') {
            // The frame or object's content may be tabbable depending on the content, but it's
            // not possibly to reliably detect the content of the frames. We always consider such
            // elements as non-tabbable.
            return false;
        }
        // In iOS, the browser only considers some specific elements as tabbable.
        if (this._platform.WEBKIT && this._platform.IOS && !isPotentiallyTabbableIOS(element)) {
            return false;
        }
        if (nodeName === 'audio') {
            // Audio elements without controls enabled are never tabbable, regardless
            // of the tabindex attribute explicitly being set.
            if (!element.hasAttribute('controls')) {
                return false;
            }
            // Audio elements with controls are by default tabbable unless the
            // tabindex attribute is set to `-1` explicitly.
            return tabIndexValue !== -1;
        }
        if (nodeName === 'video') {
            // For all video elements, if the tabindex attribute is set to `-1`, the video
            // is not tabbable. Note: We cannot rely on the default `HTMLElement.tabIndex`
            // property as that one is set to `-1` in Chrome, Edge and Safari v13.1. The
            // tabindex attribute is the source of truth here.
            if (tabIndexValue === -1) {
                return false;
            }
            // If the tabindex is explicitly set, and not `-1` (as per check before), the
            // video element is always tabbable (regardless of whether it has controls or not).
            if (tabIndexValue !== null) {
                return true;
            }
            // Otherwise (when no explicit tabindex is set), a video is only tabbable if it
            // has controls enabled. Firefox is special as videos are always tabbable regardless
            // of whether there are controls or not.
            return this._platform.FIREFOX || element.hasAttribute('controls');
        }
        return element.tabIndex >= 0;
    }
    /**
     * Gets whether an element can be focused by the user.
     *
     * @param element Element to be checked.
     * @param config The config object with options to customize this method's behavior
     * @returns Whether the element is focusable.
     */
    isFocusable(element, config) {
        // Perform checks in order of left to most expensive.
        // Again, naive approach that does not capture many edge cases and browser quirks.
        return isPotentiallyFocusable(element) && !this.isDisabled(element) &&
            (config?.ignoreVisibility || this.isVisible(element));
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: InteractivityChecker, deps: [{ token: i1.Platform }], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: InteractivityChecker, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: InteractivityChecker, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }], ctorParameters: () => [{ type: i1.Platform }] });
/**
 * Returns the frame element from a window object. Since browsers like MS Edge throw errors if
 * the frameElement property is being accessed from a different host address, this property
 * should be accessed carefully.
 */
function getFrameElement(window) {
    try {
        return window.frameElement;
    }
    catch {
        return null;
    }
}
/** Checks whether the specified element has any geometry / rectangles. */
function hasGeometry(element) {
    // Use logic from jQuery to check for an invisible element.
    // See https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js#L12
    return !!(element.offsetWidth || element.offsetHeight ||
        (typeof element.getClientRects === 'function' && element.getClientRects().length));
}
/** Gets whether an element's  */
function isNativeFormElement(element) {
    let nodeName = element.nodeName.toLowerCase();
    return nodeName === 'input' ||
        nodeName === 'select' ||
        nodeName === 'button' ||
        nodeName === 'textarea';
}
/** Gets whether an element is an `<input type="hidden">`. */
function isHiddenInput(element) {
    return isInputElement(element) && element.type == 'hidden';
}
/** Gets whether an element is an anchor that has an href attribute. */
function isAnchorWithHref(element) {
    return isAnchorElement(element) && element.hasAttribute('href');
}
/** Gets whether an element is an input element. */
function isInputElement(element) {
    return element.nodeName.toLowerCase() == 'input';
}
/** Gets whether an element is an anchor element. */
function isAnchorElement(element) {
    return element.nodeName.toLowerCase() == 'a';
}
/** Gets whether an element has a valid tabindex. */
function hasValidTabIndex(element) {
    if (!element.hasAttribute('tabindex') || element.tabIndex === undefined) {
        return false;
    }
    let tabIndex = element.getAttribute('tabindex');
    // IE11 parses tabindex="" as the value "-32768"
    if (tabIndex == '-32768') {
        return false;
    }
    return !!(tabIndex && !isNaN(parseInt(tabIndex, 10)));
}
/**
 * Returns the parsed tabindex from the element attributes instead of returning the
 * evaluated tabindex from the browsers defaults.
 */
function getTabIndexValue(element) {
    if (!hasValidTabIndex(element)) {
        return null;
    }
    // See browser issue in Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
    const tabIndex = parseInt(element.getAttribute('tabindex') || '', 10);
    return isNaN(tabIndex) ? -1 : tabIndex;
}
/** Checks whether the specified element is potentially tabbable on iOS */
function isPotentiallyTabbableIOS(element) {
    let nodeName = element.nodeName.toLowerCase();
    let inputType = nodeName === 'input' && element.type;
    return inputType === 'text'
        || inputType === 'password'
        || nodeName === 'select'
        || nodeName === 'textarea';
}
/**
 * Gets whether an element is potentially focusable without taking current visible/disabled state
 * into account.
 */
function isPotentiallyFocusable(element) {
    // Inputs are potentially focusable *unless* they're type="hidden".
    if (isHiddenInput(element)) {
        return false;
    }
    return isNativeFormElement(element) ||
        isAnchorWithHref(element) ||
        element.hasAttribute('contenteditable') ||
        hasValidTabIndex(element);
}
/** Gets the parent window of a DOM node with regards of being inside of an iframe. */
function getWindow(node) {
    // ownerDocument is null if `node` itself *is* a document.
    return node.ownerDocument && node.ownerDocument.defaultView || window;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3Rpdml0eS1jaGVja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZvY3VzLXRyYXAvaW50ZXJhY3Rpdml0eS1jaGVja2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILG9CQUFvQjtBQUVwQixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7OztBQUUzQzs7R0FFRztBQUNILE1BQU0sT0FBTyxpQkFBaUI7SUFBOUI7UUFDRTs7V0FFRztRQUNILHFCQUFnQixHQUFZLEtBQUssQ0FBQztJQUNwQyxDQUFDO0NBQUE7QUFFRCxpRkFBaUY7QUFDakYsNkZBQTZGO0FBQzdGLGFBQWE7QUFFYjs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sb0JBQW9CO0lBRS9CLFlBQW9CLFNBQW1CO1FBQW5CLGNBQVMsR0FBVCxTQUFTLENBQVU7SUFDdkMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsVUFBVSxDQUFDLE9BQW9CO1FBQzdCLDRGQUE0RjtRQUM1RixzRkFBc0Y7UUFDdEYsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsU0FBUyxDQUFDLE9BQW9CO1FBQzVCLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUM7SUFDcEYsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILFVBQVUsQ0FBQyxPQUFvQjtRQUM3Qix1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDOUIsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsTUFBTSxZQUFZLEdBQUcsZUFBZSxDQUFDLFNBQVMsQ0FB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LE9BQTRCLENBQUMsSUFBSSxDQUFDO0lBRTNFLE9BQU8sU0FBUyxLQUFLLE1BQU07V0FDdEIsU0FBUyxLQUFLLFVBQVU7V0FDeEIsUUFBUSxLQUFLLFFBQVE7V0FDckIsUUFBUSxLQUFLLFVBQVUsQ0FBQztBQUMvQixDQUFDO0FBRUQ7OztHQUdHO0FBQ0gsU0FBUyxzQkFBc0IsQ0FBQyxPQUFvQjtJQUNsRCxtRUFBbUU7SUFDbkUsSUFBSSxhQUFhLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUMzQixPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7SUFFRCxPQUFPLG1CQUFtQixDQUFDLE9BQU8sQ0FBQztRQUNqQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUM7UUFDekIsT0FBTyxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQztRQUN2QyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBRUQsc0ZBQXNGO0FBQ3RGLFNBQVMsU0FBUyxDQUFDLElBQWlCO0lBQ2xDLDBEQUEwRDtJQUMxRCxPQUFPLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDO0FBQ3hFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbi8qIGVzbGludC1kaXNhYmxlICovXHJcblxyXG5pbXBvcnQgeyBQbGF0Zm9ybSB9IGZyb20gJy4vcGxhdGZvcm0nO1xyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQ29uZmlndXJhdGlvbiBmb3IgdGhlIGlzRm9jdXNhYmxlIG1ldGhvZC5cclxuICovXHJcbmV4cG9ydCBjbGFzcyBJc0ZvY3VzYWJsZUNvbmZpZyB7XHJcbiAgLyoqXHJcbiAgICogV2hldGhlciB0byBjb3VudCBhbiBlbGVtZW50IGFzIGZvY3VzYWJsZSBldmVuIGlmIGl0IGlzIG5vdCBjdXJyZW50bHkgdmlzaWJsZS5cclxuICAgKi9cclxuICBpZ25vcmVWaXNpYmlsaXR5OiBib29sZWFuID0gZmFsc2U7XHJcbn1cclxuXHJcbi8vIFRoZSBJbnRlcmFjdGl2aXR5Q2hlY2tlciBsZWFucyBoZWF2aWx5IG9uIHRoZSBhbGx5LmpzIGFjY2Vzc2liaWxpdHkgdXRpbGl0aWVzLlxyXG4vLyBNZXRob2RzIGxpa2UgYGlzVGFiYmFibGVgIGFyZSBvbmx5IGNvdmVyaW5nIHNwZWNpZmljIGVkZ2UtY2FzZXMgZm9yIHRoZSBicm93c2VycyB3aGljaCBhcmVcclxuLy8gc3VwcG9ydGVkLlxyXG5cclxuLyoqXHJcbiAqIFV0aWxpdHkgZm9yIGNoZWNraW5nIHRoZSBpbnRlcmFjdGl2aXR5IG9mIGFuIGVsZW1lbnQsIHN1Y2ggYXMgd2hldGhlciBpcyBpcyBmb2N1c2FibGUgb3JcclxuICogdGFiYmFibGUuXHJcbiAqL1xyXG5ASW5qZWN0YWJsZSh7IHByb3ZpZGVkSW46ICdyb290JyB9KVxyXG5leHBvcnQgY2xhc3MgSW50ZXJhY3Rpdml0eUNoZWNrZXIge1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9wbGF0Zm9ybTogUGxhdGZvcm0pIHtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldHMgd2hldGhlciBhbiBlbGVtZW50IGlzIGRpc2FibGVkLlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGVsZW1lbnQgRWxlbWVudCB0byBiZSBjaGVja2VkLlxyXG4gICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgZGlzYWJsZWQuXHJcbiAgICovXHJcbiAgaXNEaXNhYmxlZChlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xyXG4gICAgLy8gVGhpcyBkb2VzIG5vdCBjYXB0dXJlIHNvbWUgY2FzZXMsIHN1Y2ggYXMgYSBub24tZm9ybSBjb250cm9sIHdpdGggYSBkaXNhYmxlZCBhdHRyaWJ1dGUgb3JcclxuICAgIC8vIGEgZm9ybSBjb250cm9sIGluc2lkZSBvZiBhIGRpc2FibGVkIGZvcm0sIGJ1dCBzaG91bGQgY2FwdHVyZSB0aGUgbW9zdCBjb21tb24gY2FzZXMuXHJcbiAgICByZXR1cm4gZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHdoZXRoZXIgYW4gZWxlbWVudCBpcyB2aXNpYmxlIGZvciB0aGUgcHVycG9zZXMgb2YgaW50ZXJhY3Rpdml0eS5cclxuICAgKlxyXG4gICAqIFRoaXMgd2lsbCBjYXB0dXJlIHN0YXRlcyBsaWtlIGBkaXNwbGF5OiBub25lYCBhbmQgYHZpc2liaWxpdHk6IGhpZGRlbmAsIGJ1dCBub3QgdGhpbmdzIGxpa2VcclxuICAgKiBiZWluZyBjbGlwcGVkIGJ5IGFuIGBvdmVyZmxvdzogaGlkZGVuYCBwYXJlbnQgb3IgYmVpbmcgb3V0c2lkZSB0aGUgdmlld3BvcnQuXHJcbiAgICpcclxuICAgKiBAcmV0dXJucyBXaGV0aGVyIHRoZSBlbGVtZW50IGlzIHZpc2libGUuXHJcbiAgICovXHJcbiAgaXNWaXNpYmxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaGFzR2VvbWV0cnkoZWxlbWVudCkgJiYgZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KS52aXNpYmlsaXR5ID09PSAndmlzaWJsZSc7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHdoZXRoZXIgYW4gZWxlbWVudCBjYW4gYmUgcmVhY2hlZCB2aWEgVGFiIGtleS5cclxuICAgKiBBc3N1bWVzIHRoYXQgdGhlIGVsZW1lbnQgaGFzIGFscmVhZHkgYmVlbiBjaGVja2VkIHdpdGggaXNGb2N1c2FibGUuXHJcbiAgICpcclxuICAgKiBAcGFyYW0gZWxlbWVudCBFbGVtZW50IHRvIGJlIGNoZWNrZWQuXHJcbiAgICogQHJldHVybnMgV2hldGhlciB0aGUgZWxlbWVudCBpcyB0YWJiYWJsZS5cclxuICAgKi9cclxuICBpc1RhYmJhYmxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgICAvLyBOb3RoaW5nIGlzIHRhYmJhYmxlIG9uIHRoZSBzZXJ2ZXIg8J+YjlxyXG4gICAgaWYgKCF0aGlzLl9wbGF0Zm9ybS5pc0Jyb3dzZXIpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZyYW1lRWxlbWVudCA9IGdldEZyYW1lRWxlbWVudChnZXRXaW5kb3coZWxlbWVudCkpO1xyXG5cclxuICAgIGlmIChmcmFtZUVsZW1lbnQpIHtcclxuICAgICAgLy8gRnJhbWUgZWxlbWVudHMgaW5oZXJpdCB0aGVpciB0YWJpbmRleCBvbnRvIGFsbCBjaGlsZCBlbGVtZW50cy5cclxuICAgICAgaWYgKGdldFRhYkluZGV4VmFsdWUoZnJhbWVFbGVtZW50KSA9PT0gLTEpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEJyb3dzZXJzIGRpc2FibGUgdGFiYmluZyB0byBhbiBlbGVtZW50IGluc2lkZSBvZiBhbiBpbnZpc2libGUgZnJhbWUuXHJcbiAgICAgIGlmICghdGhpcy5pc1Zpc2libGUoZnJhbWVFbGVtZW50KSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBub2RlTmFtZSA9IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgIGxldCB0YWJJbmRleFZhbHVlID0gZ2V0VGFiSW5kZXhWYWx1ZShlbGVtZW50KTtcclxuXHJcbiAgICBpZiAoZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NvbnRlbnRlZGl0YWJsZScpKSB7XHJcbiAgICAgIHJldHVybiB0YWJJbmRleFZhbHVlICE9PSAtMTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobm9kZU5hbWUgPT09ICdpZnJhbWUnIHx8IG5vZGVOYW1lID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAvLyBUaGUgZnJhbWUgb3Igb2JqZWN0J3MgY29udGVudCBtYXkgYmUgdGFiYmFibGUgZGVwZW5kaW5nIG9uIHRoZSBjb250ZW50LCBidXQgaXQnc1xyXG4gICAgICAvLyBub3QgcG9zc2libHkgdG8gcmVsaWFibHkgZGV0ZWN0IHRoZSBjb250ZW50IG9mIHRoZSBmcmFtZXMuIFdlIGFsd2F5cyBjb25zaWRlciBzdWNoXHJcbiAgICAgIC8vIGVsZW1lbnRzIGFzIG5vbi10YWJiYWJsZS5cclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEluIGlPUywgdGhlIGJyb3dzZXIgb25seSBjb25zaWRlcnMgc29tZSBzcGVjaWZpYyBlbGVtZW50cyBhcyB0YWJiYWJsZS5cclxuICAgIGlmICh0aGlzLl9wbGF0Zm9ybS5XRUJLSVQgJiYgdGhpcy5fcGxhdGZvcm0uSU9TICYmICFpc1BvdGVudGlhbGx5VGFiYmFibGVJT1MoZWxlbWVudCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChub2RlTmFtZSA9PT0gJ2F1ZGlvJykge1xyXG4gICAgICAvLyBBdWRpbyBlbGVtZW50cyB3aXRob3V0IGNvbnRyb2xzIGVuYWJsZWQgYXJlIG5ldmVyIHRhYmJhYmxlLCByZWdhcmRsZXNzXHJcbiAgICAgIC8vIG9mIHRoZSB0YWJpbmRleCBhdHRyaWJ1dGUgZXhwbGljaXRseSBiZWluZyBzZXQuXHJcbiAgICAgIGlmICghZWxlbWVudC5oYXNBdHRyaWJ1dGUoJ2NvbnRyb2xzJykpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgLy8gQXVkaW8gZWxlbWVudHMgd2l0aCBjb250cm9scyBhcmUgYnkgZGVmYXVsdCB0YWJiYWJsZSB1bmxlc3MgdGhlXHJcbiAgICAgIC8vIHRhYmluZGV4IGF0dHJpYnV0ZSBpcyBzZXQgdG8gYC0xYCBleHBsaWNpdGx5LlxyXG4gICAgICByZXR1cm4gdGFiSW5kZXhWYWx1ZSAhPT0gLTE7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5vZGVOYW1lID09PSAndmlkZW8nKSB7XHJcbiAgICAgIC8vIEZvciBhbGwgdmlkZW8gZWxlbWVudHMsIGlmIHRoZSB0YWJpbmRleCBhdHRyaWJ1dGUgaXMgc2V0IHRvIGAtMWAsIHRoZSB2aWRlb1xyXG4gICAgICAvLyBpcyBub3QgdGFiYmFibGUuIE5vdGU6IFdlIGNhbm5vdCByZWx5IG9uIHRoZSBkZWZhdWx0IGBIVE1MRWxlbWVudC50YWJJbmRleGBcclxuICAgICAgLy8gcHJvcGVydHkgYXMgdGhhdCBvbmUgaXMgc2V0IHRvIGAtMWAgaW4gQ2hyb21lLCBFZGdlIGFuZCBTYWZhcmkgdjEzLjEuIFRoZVxyXG4gICAgICAvLyB0YWJpbmRleCBhdHRyaWJ1dGUgaXMgdGhlIHNvdXJjZSBvZiB0cnV0aCBoZXJlLlxyXG4gICAgICBpZiAodGFiSW5kZXhWYWx1ZSA9PT0gLTEpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgICAgLy8gSWYgdGhlIHRhYmluZGV4IGlzIGV4cGxpY2l0bHkgc2V0LCBhbmQgbm90IGAtMWAgKGFzIHBlciBjaGVjayBiZWZvcmUpLCB0aGVcclxuICAgICAgLy8gdmlkZW8gZWxlbWVudCBpcyBhbHdheXMgdGFiYmFibGUgKHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBpdCBoYXMgY29udHJvbHMgb3Igbm90KS5cclxuICAgICAgaWYgKHRhYkluZGV4VmFsdWUgIT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgICAvLyBPdGhlcndpc2UgKHdoZW4gbm8gZXhwbGljaXQgdGFiaW5kZXggaXMgc2V0KSwgYSB2aWRlbyBpcyBvbmx5IHRhYmJhYmxlIGlmIGl0XHJcbiAgICAgIC8vIGhhcyBjb250cm9scyBlbmFibGVkLiBGaXJlZm94IGlzIHNwZWNpYWwgYXMgdmlkZW9zIGFyZSBhbHdheXMgdGFiYmFibGUgcmVnYXJkbGVzc1xyXG4gICAgICAvLyBvZiB3aGV0aGVyIHRoZXJlIGFyZSBjb250cm9scyBvciBub3QuXHJcbiAgICAgIHJldHVybiB0aGlzLl9wbGF0Zm9ybS5GSVJFRk9YIHx8IGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb250cm9scycpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlbGVtZW50LnRhYkluZGV4ID49IDA7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXRzIHdoZXRoZXIgYW4gZWxlbWVudCBjYW4gYmUgZm9jdXNlZCBieSB0aGUgdXNlci5cclxuICAgKlxyXG4gICAqIEBwYXJhbSBlbGVtZW50IEVsZW1lbnQgdG8gYmUgY2hlY2tlZC5cclxuICAgKiBAcGFyYW0gY29uZmlnIFRoZSBjb25maWcgb2JqZWN0IHdpdGggb3B0aW9ucyB0byBjdXN0b21pemUgdGhpcyBtZXRob2QncyBiZWhhdmlvclxyXG4gICAqIEByZXR1cm5zIFdoZXRoZXIgdGhlIGVsZW1lbnQgaXMgZm9jdXNhYmxlLlxyXG4gICAqL1xyXG4gIGlzRm9jdXNhYmxlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBjb25maWc/OiBJc0ZvY3VzYWJsZUNvbmZpZyk6IGJvb2xlYW4ge1xyXG4gICAgLy8gUGVyZm9ybSBjaGVja3MgaW4gb3JkZXIgb2YgbGVmdCB0byBtb3N0IGV4cGVuc2l2ZS5cclxuICAgIC8vIEFnYWluLCBuYWl2ZSBhcHByb2FjaCB0aGF0IGRvZXMgbm90IGNhcHR1cmUgbWFueSBlZGdlIGNhc2VzIGFuZCBicm93c2VyIHF1aXJrcy5cclxuICAgIHJldHVybiBpc1BvdGVudGlhbGx5Rm9jdXNhYmxlKGVsZW1lbnQpICYmICF0aGlzLmlzRGlzYWJsZWQoZWxlbWVudCkgJiZcclxuICAgICAgKGNvbmZpZz8uaWdub3JlVmlzaWJpbGl0eSB8fCB0aGlzLmlzVmlzaWJsZShlbGVtZW50KSk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGZyYW1lIGVsZW1lbnQgZnJvbSBhIHdpbmRvdyBvYmplY3QuIFNpbmNlIGJyb3dzZXJzIGxpa2UgTVMgRWRnZSB0aHJvdyBlcnJvcnMgaWZcclxuICogdGhlIGZyYW1lRWxlbWVudCBwcm9wZXJ0eSBpcyBiZWluZyBhY2Nlc3NlZCBmcm9tIGEgZGlmZmVyZW50IGhvc3QgYWRkcmVzcywgdGhpcyBwcm9wZXJ0eVxyXG4gKiBzaG91bGQgYmUgYWNjZXNzZWQgY2FyZWZ1bGx5LlxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0RnJhbWVFbGVtZW50KHdpbmRvdzogV2luZG93KSB7XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiB3aW5kb3cuZnJhbWVFbGVtZW50IGFzIEhUTUxFbGVtZW50O1xyXG4gIH0gY2F0Y2gge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59XHJcblxyXG4vKiogQ2hlY2tzIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBlbGVtZW50IGhhcyBhbnkgZ2VvbWV0cnkgLyByZWN0YW5nbGVzLiAqL1xyXG5mdW5jdGlvbiBoYXNHZW9tZXRyeShlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xyXG4gIC8vIFVzZSBsb2dpYyBmcm9tIGpRdWVyeSB0byBjaGVjayBmb3IgYW4gaW52aXNpYmxlIGVsZW1lbnQuXHJcbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9qcXVlcnkvanF1ZXJ5L2Jsb2IvbWFzdGVyL3NyYy9jc3MvaGlkZGVuVmlzaWJsZVNlbGVjdG9ycy5qcyNMMTJcclxuICByZXR1cm4gISEoZWxlbWVudC5vZmZzZXRXaWR0aCB8fCBlbGVtZW50Lm9mZnNldEhlaWdodCB8fFxyXG4gICAgKHR5cGVvZiBlbGVtZW50LmdldENsaWVudFJlY3RzID09PSAnZnVuY3Rpb24nICYmIGVsZW1lbnQuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpKTtcclxufVxyXG5cclxuLyoqIEdldHMgd2hldGhlciBhbiBlbGVtZW50J3MgICovXHJcbmZ1bmN0aW9uIGlzTmF0aXZlRm9ybUVsZW1lbnQoZWxlbWVudDogTm9kZSkge1xyXG4gIGxldCBub2RlTmFtZSA9IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcclxuICByZXR1cm4gbm9kZU5hbWUgPT09ICdpbnB1dCcgfHxcclxuICAgIG5vZGVOYW1lID09PSAnc2VsZWN0JyB8fFxyXG4gICAgbm9kZU5hbWUgPT09ICdidXR0b24nIHx8XHJcbiAgICBub2RlTmFtZSA9PT0gJ3RleHRhcmVhJztcclxufVxyXG5cclxuLyoqIEdldHMgd2hldGhlciBhbiBlbGVtZW50IGlzIGFuIGA8aW5wdXQgdHlwZT1cImhpZGRlblwiPmAuICovXHJcbmZ1bmN0aW9uIGlzSGlkZGVuSW5wdXQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuICByZXR1cm4gaXNJbnB1dEVsZW1lbnQoZWxlbWVudCkgJiYgZWxlbWVudC50eXBlID09ICdoaWRkZW4nO1xyXG59XHJcblxyXG4vKiogR2V0cyB3aGV0aGVyIGFuIGVsZW1lbnQgaXMgYW4gYW5jaG9yIHRoYXQgaGFzIGFuIGhyZWYgYXR0cmlidXRlLiAqL1xyXG5mdW5jdGlvbiBpc0FuY2hvcldpdGhIcmVmKGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIGlzQW5jaG9yRWxlbWVudChlbGVtZW50KSAmJiBlbGVtZW50Lmhhc0F0dHJpYnV0ZSgnaHJlZicpO1xyXG59XHJcblxyXG4vKiogR2V0cyB3aGV0aGVyIGFuIGVsZW1lbnQgaXMgYW4gaW5wdXQgZWxlbWVudC4gKi9cclxuZnVuY3Rpb24gaXNJbnB1dEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBlbGVtZW50IGlzIEhUTUxJbnB1dEVsZW1lbnQge1xyXG4gIHJldHVybiBlbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ2lucHV0JztcclxufVxyXG5cclxuLyoqIEdldHMgd2hldGhlciBhbiBlbGVtZW50IGlzIGFuIGFuY2hvciBlbGVtZW50LiAqL1xyXG5mdW5jdGlvbiBpc0FuY2hvckVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBlbGVtZW50IGlzIEhUTUxBbmNob3JFbGVtZW50IHtcclxuICByZXR1cm4gZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09ICdhJztcclxufVxyXG5cclxuLyoqIEdldHMgd2hldGhlciBhbiBlbGVtZW50IGhhcyBhIHZhbGlkIHRhYmluZGV4LiAqL1xyXG5mdW5jdGlvbiBoYXNWYWxpZFRhYkluZGV4KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiB7XHJcbiAgaWYgKCFlbGVtZW50Lmhhc0F0dHJpYnV0ZSgndGFiaW5kZXgnKSB8fCBlbGVtZW50LnRhYkluZGV4ID09PSB1bmRlZmluZWQpIHtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcblxyXG4gIGxldCB0YWJJbmRleCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpO1xyXG5cclxuICAvLyBJRTExIHBhcnNlcyB0YWJpbmRleD1cIlwiIGFzIHRoZSB2YWx1ZSBcIi0zMjc2OFwiXHJcbiAgaWYgKHRhYkluZGV4ID09ICctMzI3NjgnKSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gISEodGFiSW5kZXggJiYgIWlzTmFOKHBhcnNlSW50KHRhYkluZGV4LCAxMCkpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIHBhcnNlZCB0YWJpbmRleCBmcm9tIHRoZSBlbGVtZW50IGF0dHJpYnV0ZXMgaW5zdGVhZCBvZiByZXR1cm5pbmcgdGhlXHJcbiAqIGV2YWx1YXRlZCB0YWJpbmRleCBmcm9tIHRoZSBicm93c2VycyBkZWZhdWx0cy5cclxuICovXHJcbmZ1bmN0aW9uIGdldFRhYkluZGV4VmFsdWUoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBudW1iZXIgfCBudWxsIHtcclxuICBpZiAoIWhhc1ZhbGlkVGFiSW5kZXgoZWxlbWVudCkpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgLy8gU2VlIGJyb3dzZXIgaXNzdWUgaW4gR2Vja28gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTEyODA1NFxyXG4gIGNvbnN0IHRhYkluZGV4ID0gcGFyc2VJbnQoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JykgfHwgJycsIDEwKTtcclxuXHJcbiAgcmV0dXJuIGlzTmFOKHRhYkluZGV4KSA/IC0xIDogdGFiSW5kZXg7XHJcbn1cclxuXHJcbi8qKiBDaGVja3Mgd2hldGhlciB0aGUgc3BlY2lmaWVkIGVsZW1lbnQgaXMgcG90ZW50aWFsbHkgdGFiYmFibGUgb24gaU9TICovXHJcbmZ1bmN0aW9uIGlzUG90ZW50aWFsbHlUYWJiYWJsZUlPUyhlbGVtZW50OiBIVE1MRWxlbWVudCk6IGJvb2xlYW4ge1xyXG4gIGxldCBub2RlTmFtZSA9IGVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcclxuICBsZXQgaW5wdXRUeXBlID0gbm9kZU5hbWUgPT09ICdpbnB1dCcgJiYgKGVsZW1lbnQgYXMgSFRNTElucHV0RWxlbWVudCkudHlwZTtcclxuXHJcbiAgcmV0dXJuIGlucHV0VHlwZSA9PT0gJ3RleHQnXHJcbiAgICB8fCBpbnB1dFR5cGUgPT09ICdwYXNzd29yZCdcclxuICAgIHx8IG5vZGVOYW1lID09PSAnc2VsZWN0J1xyXG4gICAgfHwgbm9kZU5hbWUgPT09ICd0ZXh0YXJlYSc7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXRzIHdoZXRoZXIgYW4gZWxlbWVudCBpcyBwb3RlbnRpYWxseSBmb2N1c2FibGUgd2l0aG91dCB0YWtpbmcgY3VycmVudCB2aXNpYmxlL2Rpc2FibGVkIHN0YXRlXHJcbiAqIGludG8gYWNjb3VudC5cclxuICovXHJcbmZ1bmN0aW9uIGlzUG90ZW50aWFsbHlGb2N1c2FibGUoZWxlbWVudDogSFRNTEVsZW1lbnQpOiBib29sZWFuIHtcclxuICAvLyBJbnB1dHMgYXJlIHBvdGVudGlhbGx5IGZvY3VzYWJsZSAqdW5sZXNzKiB0aGV5J3JlIHR5cGU9XCJoaWRkZW5cIi5cclxuICBpZiAoaXNIaWRkZW5JbnB1dChlbGVtZW50KSkge1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGlzTmF0aXZlRm9ybUVsZW1lbnQoZWxlbWVudCkgfHxcclxuICAgIGlzQW5jaG9yV2l0aEhyZWYoZWxlbWVudCkgfHxcclxuICAgIGVsZW1lbnQuaGFzQXR0cmlidXRlKCdjb250ZW50ZWRpdGFibGUnKSB8fFxyXG4gICAgaGFzVmFsaWRUYWJJbmRleChlbGVtZW50KTtcclxufVxyXG5cclxuLyoqIEdldHMgdGhlIHBhcmVudCB3aW5kb3cgb2YgYSBET00gbm9kZSB3aXRoIHJlZ2FyZHMgb2YgYmVpbmcgaW5zaWRlIG9mIGFuIGlmcmFtZS4gKi9cclxuZnVuY3Rpb24gZ2V0V2luZG93KG5vZGU6IEhUTUxFbGVtZW50KTogV2luZG93IHtcclxuICAvLyBvd25lckRvY3VtZW50IGlzIG51bGwgaWYgYG5vZGVgIGl0c2VsZiAqaXMqIGEgZG9jdW1lbnQuXHJcbiAgcmV0dXJuIG5vZGUub3duZXJEb2N1bWVudCAmJiBub2RlLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgfHwgd2luZG93O1xyXG59XHJcbiJdfQ==