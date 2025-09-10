/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/* eslint-disable */
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** Injectable that ensures only the most recently enabled FocusTrap is active. */
export class FocusTrapManager {
    constructor() {
        // A stack of the FocusTraps on the page. Only the FocusTrap at the
        // top of the stack is active.
        this._focusTrapStack = [];
    }
    /**
     * Disables the FocusTrap at the top of the stack, and then pushes
     * the new FocusTrap onto the stack.
     */
    register(focusTrap) {
        // Dedupe focusTraps that register multiple times.
        this._focusTrapStack = this._focusTrapStack.filter((ft) => ft !== focusTrap);
        let stack = this._focusTrapStack;
        if (stack.length) {
            stack[stack.length - 1]._disable();
        }
        stack.push(focusTrap);
        focusTrap._enable();
    }
    /**
     * Removes the FocusTrap from the stack, and activates the
     * FocusTrap that is the new top of the stack.
     */
    deregister(focusTrap) {
        focusTrap._disable();
        const stack = this._focusTrapStack;
        const i = stack.indexOf(focusTrap);
        if (i !== -1) {
            stack.splice(i, 1);
            if (stack.length) {
                stack[stack.length - 1]._enable();
            }
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: FocusTrapManager, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: FocusTrapManager, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: FocusTrapManager, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'root' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXMtdHJhcC1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2ZvY3VzLXRyYXAvZm9jdXMtdHJhcC1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILG9CQUFvQjtBQUVwQixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVkzQyxrRkFBa0Y7QUFFbEYsTUFBTSxPQUFPLGdCQUFnQjtJQUQ3QjtRQUVFLG1FQUFtRTtRQUNuRSw4QkFBOEI7UUFDdEIsb0JBQWUsR0FBdUIsRUFBRSxDQUFDO0tBcUNsRDtJQW5DQzs7O09BR0c7SUFDSCxRQUFRLENBQUMsU0FBMkI7UUFDbEMsa0RBQWtEO1FBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQUMsQ0FBQztRQUU3RSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBRWpDLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3JDLENBQUM7UUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RCLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN0QixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsVUFBVSxDQUFDLFNBQTJCO1FBQ3BDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVyQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO1FBRW5DLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUNiLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUNqQixLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNwQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7OEdBdkNVLGdCQUFnQjtrSEFBaEIsZ0JBQWdCLGNBREosTUFBTTs7MkZBQ2xCLGdCQUFnQjtrQkFENUIsVUFBVTttQkFBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQGxpY2Vuc2VcclxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICpcclxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcclxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxyXG4gKi9cclxuXHJcbi8qIGVzbGludC1kaXNhYmxlICovXHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKipcclxuICogQSBGb2N1c1RyYXAgbWFuYWdlZCBieSBGb2N1c1RyYXBNYW5hZ2VyLlxyXG4gKiBJbXBsZW1lbnRlZCBieSBDb25maWd1cmFibGVGb2N1c1RyYXAgdG8gYXZvaWQgY2lyY3VsYXIgZGVwZW5kZW5jeS5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgTWFuYWdlZEZvY3VzVHJhcCB7XHJcbiAgX2VuYWJsZSgpOiB2b2lkO1xyXG4gIF9kaXNhYmxlKCk6IHZvaWQ7XHJcbiAgZm9jdXNJbml0aWFsRWxlbWVudFdoZW5SZWFkeSgpOiBQcm9taXNlPGJvb2xlYW4+O1xyXG59XHJcblxyXG4vKiogSW5qZWN0YWJsZSB0aGF0IGVuc3VyZXMgb25seSB0aGUgbW9zdCByZWNlbnRseSBlbmFibGVkIEZvY3VzVHJhcCBpcyBhY3RpdmUuICovXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxyXG5leHBvcnQgY2xhc3MgRm9jdXNUcmFwTWFuYWdlciB7XHJcbiAgLy8gQSBzdGFjayBvZiB0aGUgRm9jdXNUcmFwcyBvbiB0aGUgcGFnZS4gT25seSB0aGUgRm9jdXNUcmFwIGF0IHRoZVxyXG4gIC8vIHRvcCBvZiB0aGUgc3RhY2sgaXMgYWN0aXZlLlxyXG4gIHByaXZhdGUgX2ZvY3VzVHJhcFN0YWNrOiBNYW5hZ2VkRm9jdXNUcmFwW10gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogRGlzYWJsZXMgdGhlIEZvY3VzVHJhcCBhdCB0aGUgdG9wIG9mIHRoZSBzdGFjaywgYW5kIHRoZW4gcHVzaGVzXHJcbiAgICogdGhlIG5ldyBGb2N1c1RyYXAgb250byB0aGUgc3RhY2suXHJcbiAgICovXHJcbiAgcmVnaXN0ZXIoZm9jdXNUcmFwOiBNYW5hZ2VkRm9jdXNUcmFwKTogdm9pZCB7XHJcbiAgICAvLyBEZWR1cGUgZm9jdXNUcmFwcyB0aGF0IHJlZ2lzdGVyIG11bHRpcGxlIHRpbWVzLlxyXG4gICAgdGhpcy5fZm9jdXNUcmFwU3RhY2sgPSB0aGlzLl9mb2N1c1RyYXBTdGFjay5maWx0ZXIoKGZ0KSA9PiBmdCAhPT0gZm9jdXNUcmFwKTtcclxuXHJcbiAgICBsZXQgc3RhY2sgPSB0aGlzLl9mb2N1c1RyYXBTdGFjaztcclxuXHJcbiAgICBpZiAoc3RhY2subGVuZ3RoKSB7XHJcbiAgICAgIHN0YWNrW3N0YWNrLmxlbmd0aCAtIDFdLl9kaXNhYmxlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhY2sucHVzaChmb2N1c1RyYXApO1xyXG4gICAgZm9jdXNUcmFwLl9lbmFibGUoKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlbW92ZXMgdGhlIEZvY3VzVHJhcCBmcm9tIHRoZSBzdGFjaywgYW5kIGFjdGl2YXRlcyB0aGVcclxuICAgKiBGb2N1c1RyYXAgdGhhdCBpcyB0aGUgbmV3IHRvcCBvZiB0aGUgc3RhY2suXHJcbiAgICovXHJcbiAgZGVyZWdpc3Rlcihmb2N1c1RyYXA6IE1hbmFnZWRGb2N1c1RyYXApOiB2b2lkIHtcclxuICAgIGZvY3VzVHJhcC5fZGlzYWJsZSgpO1xyXG5cclxuICAgIGNvbnN0IHN0YWNrID0gdGhpcy5fZm9jdXNUcmFwU3RhY2s7XHJcblxyXG4gICAgY29uc3QgaSA9IHN0YWNrLmluZGV4T2YoZm9jdXNUcmFwKTtcclxuICAgIGlmIChpICE9PSAtMSkge1xyXG4gICAgICBzdGFjay5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIGlmIChzdGFjay5sZW5ndGgpIHtcclxuICAgICAgICBzdGFja1tzdGFjay5sZW5ndGggLSAxXS5fZW5hYmxlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19