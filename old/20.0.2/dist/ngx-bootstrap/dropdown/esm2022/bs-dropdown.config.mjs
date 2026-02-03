import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** Default dropdown configuration */
export class BsDropdownConfig {
    constructor() {
        /** default dropdown auto closing behavior */
        this.autoClose = true;
        /** default dropdown auto closing behavior */
        this.insideClick = false;
        /** turn on/off animation */
        this.isAnimated = false;
        /** value true of stopOnClickPropagation allows event stopPropagation*/
        this.stopOnClickPropagation = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDropdownConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDropdownConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDropdownConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZHJvcGRvd24uY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Ryb3Bkb3duL2JzLWRyb3Bkb3duLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQyxxQ0FBcUM7QUFJckMsTUFBTSxPQUFPLGdCQUFnQjtJQUg3QjtRQUlFLDZDQUE2QztRQUM3QyxjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLDZDQUE2QztRQUM3QyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQiw0QkFBNEI7UUFDNUIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQUNuQix1RUFBdUU7UUFDdkUsMkJBQXNCLEdBQUcsS0FBSyxDQUFDO0tBQ2hDOzhHQVRZLGdCQUFnQjtrSEFBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbi8qKiBEZWZhdWx0IGRyb3Bkb3duIGNvbmZpZ3VyYXRpb24gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQnNEcm9wZG93bkNvbmZpZyB7XHJcbiAgLyoqIGRlZmF1bHQgZHJvcGRvd24gYXV0byBjbG9zaW5nIGJlaGF2aW9yICovXHJcbiAgYXV0b0Nsb3NlID0gdHJ1ZTtcclxuICAvKiogZGVmYXVsdCBkcm9wZG93biBhdXRvIGNsb3NpbmcgYmVoYXZpb3IgKi9cclxuICBpbnNpZGVDbGljayA9IGZhbHNlO1xyXG4gIC8qKiB0dXJuIG9uL29mZiBhbmltYXRpb24gKi9cclxuICBpc0FuaW1hdGVkID0gZmFsc2U7XHJcbiAgLyoqIHZhbHVlIHRydWUgb2Ygc3RvcE9uQ2xpY2tQcm9wYWdhdGlvbiBhbGxvd3MgZXZlbnQgc3RvcFByb3BhZ2F0aW9uKi9cclxuICBzdG9wT25DbGlja1Byb3BhZ2F0aW9uID0gZmFsc2U7XHJcbn1cclxuIl19