import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class TabsetConfig {
    constructor() {
        /** provides default navigation context class: 'tabs' or 'pills' */
        this.type = 'tabs';
        /** provides possibility to set keyNavigations enable or disable, by default is enable */
        this.isKeysAllowed = true;
        /** aria label for tab list */
        this.ariaLabel = 'Tabs';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabsetConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabsetConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabsetConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90YWJzL3RhYnNldC5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFLM0MsTUFBTSxPQUFPLFlBQVk7SUFIekI7UUFJRSxtRUFBbUU7UUFDbkUsU0FBSSxHQUFHLE1BQU0sQ0FBQztRQUNkLHlGQUF5RjtRQUN6RixrQkFBYSxHQUFHLElBQUksQ0FBQztRQUNyQiw4QkFBOEI7UUFDOUIsY0FBUyxHQUFHLE1BQU0sQ0FBQztLQUNwQjs4R0FQWSxZQUFZO2tIQUFaLFlBQVksY0FGWCxNQUFNOzsyRkFFUCxZQUFZO2tCQUh4QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRhYnNldENvbmZpZyB7XHJcbiAgLyoqIHByb3ZpZGVzIGRlZmF1bHQgbmF2aWdhdGlvbiBjb250ZXh0IGNsYXNzOiAndGFicycgb3IgJ3BpbGxzJyAqL1xyXG4gIHR5cGUgPSAndGFicyc7XHJcbiAgLyoqIHByb3ZpZGVzIHBvc3NpYmlsaXR5IHRvIHNldCBrZXlOYXZpZ2F0aW9ucyBlbmFibGUgb3IgZGlzYWJsZSwgYnkgZGVmYXVsdCBpcyBlbmFibGUgKi9cclxuICBpc0tleXNBbGxvd2VkID0gdHJ1ZTtcclxuICAvKiogYXJpYSBsYWJlbCBmb3IgdGFiIGxpc3QgKi9cclxuICBhcmlhTGFiZWwgPSAnVGFicyc7XHJcbn1cclxuIl19