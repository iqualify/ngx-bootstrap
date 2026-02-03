import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
export class DraggableItemService {
    constructor() {
        this.onCapture = new Subject();
    }
    dragStart(item) {
        this.draggableItem = item;
    }
    getItem() {
        return this.draggableItem;
    }
    captureItem(overZoneIndex, newIndex) {
        if (this.draggableItem && this.draggableItem.overZoneIndex !== overZoneIndex) {
            this.draggableItem.lastZoneIndex = this.draggableItem.overZoneIndex;
            this.draggableItem.overZoneIndex = overZoneIndex;
            this.onCapture.next(this.draggableItem);
            this.draggableItem = Object.assign({}, this.draggableItem, {
                overZoneIndex,
                i: newIndex
            });
        }
        return this.draggableItem;
    }
    onCaptureItem() {
        return this.onCapture;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: DraggableItemService, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: DraggableItemService, providedIn: 'platform' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: DraggableItemService, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'platform' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJhZ2dhYmxlLWl0ZW0uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9zb3J0YWJsZS9kcmFnZ2FibGUtaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQzs7QUFJL0IsTUFBTSxPQUFPLG9CQUFvQjtJQURqQztRQUlVLGNBQVMsR0FBMkIsSUFBSSxPQUFPLEVBQWlCLENBQUM7S0EyQjFFO0lBekJDLFNBQVMsQ0FBQyxJQUFtQjtRQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztJQUM1QixDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRUQsV0FBVyxDQUFDLGFBQXFCLEVBQUUsUUFBZ0I7UUFDakQsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxLQUFLLGFBQWEsRUFBRSxDQUFDO1lBQzdFLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO1lBQ3BFLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztZQUNqRCxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDeEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN6RCxhQUFhO2dCQUNiLENBQUMsRUFBRSxRQUFRO2FBQ1osQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztJQUM1QixDQUFDO0lBRUQsYUFBYTtRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzhHQTdCVSxvQkFBb0I7a0hBQXBCLG9CQUFvQixjQURSLFVBQVU7OzJGQUN0QixvQkFBb0I7a0JBRGhDLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsVUFBVSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcbmltcG9ydCB7IERyYWdnYWJsZUl0ZW0gfSBmcm9tICcuL2RyYWdnYWJsZS1pdGVtJztcclxuXHJcbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncGxhdGZvcm0nfSlcclxuZXhwb3J0IGNsYXNzIERyYWdnYWJsZUl0ZW1TZXJ2aWNlIHtcclxuICBwcml2YXRlIGRyYWdnYWJsZUl0ZW0/OiBEcmFnZ2FibGVJdGVtO1xyXG5cclxuICBwcml2YXRlIG9uQ2FwdHVyZTogU3ViamVjdDxEcmFnZ2FibGVJdGVtPiA9IG5ldyBTdWJqZWN0PERyYWdnYWJsZUl0ZW0+KCk7XHJcblxyXG4gIGRyYWdTdGFydChpdGVtOiBEcmFnZ2FibGVJdGVtKTogdm9pZCB7XHJcbiAgICB0aGlzLmRyYWdnYWJsZUl0ZW0gPSBpdGVtO1xyXG4gIH1cclxuXHJcbiAgZ2V0SXRlbSgpOiBEcmFnZ2FibGVJdGVtIHwgdW5kZWZpbmVkIHtcclxuICAgIHJldHVybiB0aGlzLmRyYWdnYWJsZUl0ZW07XHJcbiAgfVxyXG5cclxuICBjYXB0dXJlSXRlbShvdmVyWm9uZUluZGV4OiBudW1iZXIsIG5ld0luZGV4OiBudW1iZXIpOiBEcmFnZ2FibGVJdGVtIHwgdW5kZWZpbmVkIHtcclxuICAgIGlmICh0aGlzLmRyYWdnYWJsZUl0ZW0gJiYgdGhpcy5kcmFnZ2FibGVJdGVtLm92ZXJab25lSW5kZXggIT09IG92ZXJab25lSW5kZXgpIHtcclxuICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtLmxhc3Rab25lSW5kZXggPSB0aGlzLmRyYWdnYWJsZUl0ZW0ub3ZlclpvbmVJbmRleDtcclxuICAgICAgdGhpcy5kcmFnZ2FibGVJdGVtLm92ZXJab25lSW5kZXggPSBvdmVyWm9uZUluZGV4O1xyXG4gICAgICB0aGlzLm9uQ2FwdHVyZS5uZXh0KHRoaXMuZHJhZ2dhYmxlSXRlbSk7XHJcbiAgICAgIHRoaXMuZHJhZ2dhYmxlSXRlbSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuZHJhZ2dhYmxlSXRlbSwge1xyXG4gICAgICAgIG92ZXJab25lSW5kZXgsXHJcbiAgICAgICAgaTogbmV3SW5kZXhcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZHJhZ2dhYmxlSXRlbTtcclxuICB9XHJcblxyXG4gIG9uQ2FwdHVyZUl0ZW0oKTogU3ViamVjdDxEcmFnZ2FibGVJdGVtPiB7XHJcbiAgICByZXR1cm4gdGhpcy5vbkNhcHR1cmU7XHJcbiAgfVxyXG59XHJcbiJdfQ==