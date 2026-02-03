import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BsNavigationDirection } from '../../models';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class BsDatepickerNavigationViewComponent {
    constructor() {
        this.isDisabled = false;
        this.onNavigate = new EventEmitter();
        this.onViewMode = new EventEmitter();
    }
    navTo(down) {
        this.onNavigate.emit(down ? BsNavigationDirection.DOWN : BsNavigationDirection.UP);
    }
    view(viewMode) {
        if (this.isDisabled) {
            return;
        }
        this.onViewMode.emit(viewMode);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDatepickerNavigationViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: BsDatepickerNavigationViewComponent, selector: "bs-datepicker-navigation-view", inputs: { calendar: "calendar", isDisabled: "isDisabled" }, outputs: { onNavigate: "onNavigate", onViewMode: "onViewMode" }, ngImport: i0, template: `
    <button class="previous"
            [disabled]="calendar.disableLeftArrow"
            [style.visibility]="calendar.hideLeftArrow ? 'hidden' : 'visible'"
            type="button"
            (click)="navTo(true)">
      <span>&lsaquo;</span>
    </button>

    <ng-container *ngIf="calendar && calendar.monthTitle">
      &#8203;  <!-- zero-width space needed for correct alignment
                  with preserveWhitespaces: false in Angular -->

      <button class="current"
            type="button"
              (click)="view('month')"
              [disabled]="isDisabled"
      ><span>{{ calendar.monthTitle }}</span>
      </button>
    </ng-container>

    &#8203;  <!-- zero-width space needed for correct alignment
                  with preserveWhitespaces: false in Angular -->

    <button
      class="current"
      (click)="view('year')"
      type="button"
      [disabled]="isDisabled"
    >
      <span>{{ calendar.yearTitle }}</span>
    </button>

    &#8203;  <!-- zero-width space needed for correct alignment
                  with preserveWhitespaces: false in Angular -->

    <button class="next"
            [disabled]="calendar.disableRightArrow"
            [style.visibility]="calendar.hideRightArrow ? 'hidden' : 'visible'"
            type="button"
            (click)="navTo(false)"><span>&rsaquo;</span>
    </button>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDatepickerNavigationViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-datepicker-navigation-view',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <button class="previous"
            [disabled]="calendar.disableLeftArrow"
            [style.visibility]="calendar.hideLeftArrow ? 'hidden' : 'visible'"
            type="button"
            (click)="navTo(true)">
      <span>&lsaquo;</span>
    </button>

    <ng-container *ngIf="calendar && calendar.monthTitle">
      &#8203;  <!-- zero-width space needed for correct alignment
                  with preserveWhitespaces: false in Angular -->

      <button class="current"
            type="button"
              (click)="view('month')"
              [disabled]="isDisabled"
      ><span>{{ calendar.monthTitle }}</span>
      </button>
    </ng-container>

    &#8203;  <!-- zero-width space needed for correct alignment
                  with preserveWhitespaces: false in Angular -->

    <button
      class="current"
      (click)="view('year')"
      type="button"
      [disabled]="isDisabled"
    >
      <span>{{ calendar.yearTitle }}</span>
    </button>

    &#8203;  <!-- zero-width space needed for correct alignment
                  with preserveWhitespaces: false in Angular -->

    <button class="next"
            [disabled]="calendar.disableRightArrow"
            [style.visibility]="calendar.hideRightArrow ? 'hidden' : 'visible'"
            type="button"
            (click)="navTo(false)"><span>&rsaquo;</span>
    </button>
  `
                }]
        }], propDecorators: { calendar: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], onNavigate: [{
                type: Output
            }], onViewMode: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvdGhlbWVzL2JzL2JzLWRhdGVwaWNrZXItbmF2aWdhdGlvbi12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2hHLE9BQU8sRUFBd0IscUJBQXFCLEVBQXVCLE1BQU0sY0FBYyxDQUFDOzs7QUFpRGhHLE1BQU0sT0FBTyxtQ0FBbUM7SUEvQ2hEO1FBaURXLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFFbEIsZUFBVSxHQUFHLElBQUksWUFBWSxFQUF5QixDQUFDO1FBQ3ZELGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBd0IsQ0FBQztLQWVqRTtJQWJDLEtBQUssQ0FBQyxJQUFhO1FBQ2pCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNsQixJQUFJLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUM3RCxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksQ0FBQyxRQUE4QjtRQUNqQyxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNwQixPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7OEdBbkJVLG1DQUFtQztrR0FBbkMsbUNBQW1DLGtNQTVDcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBDVDs7MkZBRVUsbUNBQW1DO2tCQS9DL0MsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsK0JBQStCO29CQUN6QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQ1Q7aUJBQ0Y7OEJBRVUsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVJLFVBQVU7c0JBQW5CLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJWaWV3TW9kZSwgQnNOYXZpZ2F0aW9uRGlyZWN0aW9uLCBOYXZpZ2F0aW9uVmlld01vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYnMtZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXZpZXcnLFxyXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8YnV0dG9uIGNsYXNzPVwicHJldmlvdXNcIlxyXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiY2FsZW5kYXIuZGlzYWJsZUxlZnRBcnJvd1wiXHJcbiAgICAgICAgICAgIFtzdHlsZS52aXNpYmlsaXR5XT1cImNhbGVuZGFyLmhpZGVMZWZ0QXJyb3cgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJ1wiXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwibmF2VG8odHJ1ZSlcIj5cclxuICAgICAgPHNwYW4+JmxzYXF1bzs8L3NwYW4+XHJcbiAgICA8L2J1dHRvbj5cclxuXHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiY2FsZW5kYXIgJiYgY2FsZW5kYXIubW9udGhUaXRsZVwiPlxyXG4gICAgICAmIzgyMDM7ICA8IS0tIHplcm8td2lkdGggc3BhY2UgbmVlZGVkIGZvciBjb3JyZWN0IGFsaWdubWVudFxyXG4gICAgICAgICAgICAgICAgICB3aXRoIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlIGluIEFuZ3VsYXIgLS0+XHJcblxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiY3VycmVudFwiXHJcbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgIChjbGljayk9XCJ2aWV3KCdtb250aCcpXCJcclxuICAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiaXNEaXNhYmxlZFwiXHJcbiAgICAgID48c3Bhbj57eyBjYWxlbmRhci5tb250aFRpdGxlIH19PC9zcGFuPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICYjODIwMzsgIDwhLS0gemVyby13aWR0aCBzcGFjZSBuZWVkZWQgZm9yIGNvcnJlY3QgYWxpZ25tZW50XHJcbiAgICAgICAgICAgICAgICAgIHdpdGggcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UgaW4gQW5ndWxhciAtLT5cclxuXHJcbiAgICA8YnV0dG9uXHJcbiAgICAgIGNsYXNzPVwiY3VycmVudFwiXHJcbiAgICAgIChjbGljayk9XCJ2aWV3KCd5ZWFyJylcIlxyXG4gICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgW2Rpc2FibGVkXT1cImlzRGlzYWJsZWRcIlxyXG4gICAgPlxyXG4gICAgICA8c3Bhbj57eyBjYWxlbmRhci55ZWFyVGl0bGUgfX08L3NwYW4+XHJcbiAgICA8L2J1dHRvbj5cclxuXHJcbiAgICAmIzgyMDM7ICA8IS0tIHplcm8td2lkdGggc3BhY2UgbmVlZGVkIGZvciBjb3JyZWN0IGFsaWdubWVudFxyXG4gICAgICAgICAgICAgICAgICB3aXRoIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlIGluIEFuZ3VsYXIgLS0+XHJcblxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cIm5leHRcIlxyXG4gICAgICAgICAgICBbZGlzYWJsZWRdPVwiY2FsZW5kYXIuZGlzYWJsZVJpZ2h0QXJyb3dcIlxyXG4gICAgICAgICAgICBbc3R5bGUudmlzaWJpbGl0eV09XCJjYWxlbmRhci5oaWRlUmlnaHRBcnJvdyA/ICdoaWRkZW4nIDogJ3Zpc2libGUnXCJcclxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgIChjbGljayk9XCJuYXZUbyhmYWxzZSlcIj48c3Bhbj4mcnNhcXVvOzwvc3Bhbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJzRGF0ZXBpY2tlck5hdmlnYXRpb25WaWV3Q29tcG9uZW50IHtcclxuICBASW5wdXQoKSBjYWxlbmRhciE6IE5hdmlnYXRpb25WaWV3TW9kZWw7XHJcbiAgQElucHV0KCkgaXNEaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICBAT3V0cHV0KCkgb25OYXZpZ2F0ZSA9IG5ldyBFdmVudEVtaXR0ZXI8QnNOYXZpZ2F0aW9uRGlyZWN0aW9uPigpO1xyXG4gIEBPdXRwdXQoKSBvblZpZXdNb2RlID0gbmV3IEV2ZW50RW1pdHRlcjxCc0RhdGVwaWNrZXJWaWV3TW9kZT4oKTtcclxuXHJcbiAgbmF2VG8oZG93bjogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgdGhpcy5vbk5hdmlnYXRlLmVtaXQoXHJcbiAgICAgIGRvd24gPyBCc05hdmlnYXRpb25EaXJlY3Rpb24uRE9XTiA6IEJzTmF2aWdhdGlvbkRpcmVjdGlvbi5VUFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHZpZXcodmlld01vZGU6IEJzRGF0ZXBpY2tlclZpZXdNb2RlKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uVmlld01vZGUuZW1pdCh2aWV3TW9kZSk7XHJcbiAgfVxyXG59XHJcbiJdfQ==