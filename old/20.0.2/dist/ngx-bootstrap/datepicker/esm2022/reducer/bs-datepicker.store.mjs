import { Injectable } from '@angular/core';
import { MiniStore, MiniState } from 'ngx-bootstrap/mini-ngrx';
import { initialDatepickerState } from './bs-datepicker.state';
import { BehaviorSubject } from 'rxjs';
import { bsDatepickerReducer } from './bs-datepicker.reducer';
import * as i0 from "@angular/core";
export class BsDatepickerStore extends MiniStore {
    constructor() {
        const _dispatcher = new BehaviorSubject({
            type: '[datepicker] dispatcher init'
        });
        const state = new MiniState(initialDatepickerState, _dispatcher, bsDatepickerReducer);
        super(_dispatcher, bsDatepickerReducer, state);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDatepickerStore, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDatepickerStore, providedIn: 'platform' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDatepickerStore, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'platform' }]
        }], ctorParameters: () => [] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5zdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL3JlZHVjZXIvYnMtZGF0ZXBpY2tlci5zdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQVUsU0FBUyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDdkUsT0FBTyxFQUFxQixzQkFBc0IsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQ2xGLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFDdkMsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7O0FBRzlELE1BQU0sT0FBTyxpQkFBa0IsU0FBUSxTQUE0QjtJQUNqRTtRQUNFLE1BQU0sV0FBVyxHQUFHLElBQUksZUFBZSxDQUFTO1lBQzlDLElBQUksRUFBRSw4QkFBOEI7U0FDckMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQ3pCLHNCQUFzQixFQUN0QixXQUFXLEVBQ1gsbUJBQW1CLENBQ3BCLENBQUM7UUFDRixLQUFLLENBQUMsV0FBVyxFQUFFLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7OEdBWFUsaUJBQWlCO2tIQUFqQixpQkFBaUIsY0FETCxVQUFVOzsyRkFDdEIsaUJBQWlCO2tCQUQ3QixVQUFVO21CQUFDLEVBQUMsVUFBVSxFQUFFLFVBQVUsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTWluaVN0b3JlLCBBY3Rpb24sIE1pbmlTdGF0ZSB9IGZyb20gJ25neC1ib290c3RyYXAvbWluaS1uZ3J4JztcclxuaW1wb3J0IHsgQnNEYXRlcGlja2VyU3RhdGUsIGluaXRpYWxEYXRlcGlja2VyU3RhdGUgfSBmcm9tICcuL2JzLWRhdGVwaWNrZXIuc3RhdGUnO1xyXG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuaW1wb3J0IHsgYnNEYXRlcGlja2VyUmVkdWNlciB9IGZyb20gJy4vYnMtZGF0ZXBpY2tlci5yZWR1Y2VyJztcclxuXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncGxhdGZvcm0nfSlcclxuZXhwb3J0IGNsYXNzIEJzRGF0ZXBpY2tlclN0b3JlIGV4dGVuZHMgTWluaVN0b3JlPEJzRGF0ZXBpY2tlclN0YXRlPiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBjb25zdCBfZGlzcGF0Y2hlciA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWN0aW9uPih7XHJcbiAgICAgIHR5cGU6ICdbZGF0ZXBpY2tlcl0gZGlzcGF0Y2hlciBpbml0J1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBzdGF0ZSA9IG5ldyBNaW5pU3RhdGU8QnNEYXRlcGlja2VyU3RhdGU+KFxyXG4gICAgICBpbml0aWFsRGF0ZXBpY2tlclN0YXRlLFxyXG4gICAgICBfZGlzcGF0Y2hlcixcclxuICAgICAgYnNEYXRlcGlja2VyUmVkdWNlclxyXG4gICAgKTtcclxuICAgIHN1cGVyKF9kaXNwYXRjaGVyLCBic0RhdGVwaWNrZXJSZWR1Y2VyLCBzdGF0ZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==