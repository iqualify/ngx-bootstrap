import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadDirective } from './typeahead.directive';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { PositioningService } from 'ngx-bootstrap/positioning';
import * as i0 from "@angular/core";
export class TypeaheadModule {
    static forRoot() {
        return {
            ngModule: TypeaheadModule,
            providers: [ComponentLoaderFactory, PositioningService]
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TypeaheadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: TypeaheadModule, declarations: [TypeaheadContainerComponent, TypeaheadDirective], imports: [CommonModule], exports: [TypeaheadContainerComponent, TypeaheadDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TypeaheadModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TypeaheadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [TypeaheadContainerComponent, TypeaheadDirective],
                    exports: [TypeaheadContainerComponent, TypeaheadDirective]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlYWhlYWQvdHlwZWFoZWFkLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0FBTy9ELE1BQU0sT0FBTyxlQUFlO0lBQzFCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLFNBQVMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLGtCQUFrQixDQUFDO1NBQ3hELENBQUM7SUFDSixDQUFDOzhHQU5VLGVBQWU7K0dBQWYsZUFBZSxpQkFIVCwyQkFBMkIsRUFBRSxrQkFBa0IsYUFEcEQsWUFBWSxhQUVaLDJCQUEyQixFQUFFLGtCQUFrQjsrR0FFaEQsZUFBZSxZQUpkLFlBQVk7OzJGQUliLGVBQWU7a0JBTDNCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO29CQUN2QixZQUFZLEVBQUUsQ0FBQywyQkFBMkIsRUFBRSxrQkFBa0IsQ0FBQztvQkFDL0QsT0FBTyxFQUFFLENBQUMsMkJBQTJCLEVBQUUsa0JBQWtCLENBQUM7aUJBQzdEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudCB9IGZyb20gJy4vdHlwZWFoZWFkLWNvbnRhaW5lci5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWREaXJlY3RpdmUgfSBmcm9tICcuL3R5cGVhaGVhZC5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBDb21wb25lbnRMb2FkZXJGYWN0b3J5IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyJztcclxuaW1wb3J0IHsgUG9zaXRpb25pbmdTZXJ2aWNlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZyc7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtUeXBlYWhlYWRDb250YWluZXJDb21wb25lbnQsIFR5cGVhaGVhZERpcmVjdGl2ZV0sXHJcbiAgICBleHBvcnRzOiBbVHlwZWFoZWFkQ29udGFpbmVyQ29tcG9uZW50LCBUeXBlYWhlYWREaXJlY3RpdmVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUeXBlYWhlYWRNb2R1bGUge1xyXG4gIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8VHlwZWFoZWFkTW9kdWxlPiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuZ01vZHVsZTogVHlwZWFoZWFkTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtDb21wb25lbnRMb2FkZXJGYWN0b3J5LCBQb3NpdGlvbmluZ1NlcnZpY2VdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=