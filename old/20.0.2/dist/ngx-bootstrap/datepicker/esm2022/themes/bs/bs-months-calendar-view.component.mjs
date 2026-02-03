import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BsNavigationDirection } from '../../models';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./bs-calendar-layout.component";
import * as i3 from "./bs-datepicker-navigation-view.component";
export class BsMonthCalendarViewComponent {
    constructor() {
        this.onNavigate = new EventEmitter();
        this.onViewMode = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onHover = new EventEmitter();
    }
    navigateTo(event) {
        const step = BsNavigationDirection.DOWN === event ? -1 : 1;
        this.onNavigate.emit({ step: { year: step } });
    }
    viewMonth(month) {
        this.onSelect.emit(month);
    }
    hoverMonth(cell, isHovered) {
        this.onHover.emit({ cell, isHovered });
    }
    changeViewMode(event) {
        this.onViewMode.emit(event);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsMonthCalendarViewComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: BsMonthCalendarViewComponent, selector: "bs-month-calendar-view", inputs: { calendar: "calendar" }, outputs: { onNavigate: "onNavigate", onViewMode: "onViewMode", onSelect: "onSelect", onHover: "onHover" }, ngImport: i0, template: `
    <bs-calendar-layout>
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>

      <table role="grid" class="months">
        <tbody>
        <tr *ngFor="let row of calendar?.months">
          <td *ngFor="let month of row" role="gridcell"
              (click)="viewMonth(month)"
              (mouseenter)="hoverMonth(month, true)"
              (mouseleave)="hoverMonth(month, false)"
              [class.disabled]="month.isDisabled"
              [class.is-highlighted]="month.isHovered">
            <span [class.selected]="month.isSelected">{{ month.label }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </bs-calendar-layout>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i2.BsCalendarLayoutComponent, selector: "bs-calendar-layout" }, { kind: "component", type: i3.BsDatepickerNavigationViewComponent, selector: "bs-datepicker-navigation-view", inputs: ["calendar", "isDisabled"], outputs: ["onNavigate", "onViewMode"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsMonthCalendarViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-month-calendar-view',
                    template: `
    <bs-calendar-layout>
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>

      <table role="grid" class="months">
        <tbody>
        <tr *ngFor="let row of calendar?.months">
          <td *ngFor="let month of row" role="gridcell"
              (click)="viewMonth(month)"
              (mouseenter)="hoverMonth(month, true)"
              (mouseleave)="hoverMonth(month, false)"
              [class.disabled]="month.isDisabled"
              [class.is-highlighted]="month.isHovered">
            <span [class.selected]="month.isSelected">{{ month.label }}</span>
          </td>
        </tr>
        </tbody>
      </table>
    </bs-calendar-layout>
  `
                }]
        }], propDecorators: { calendar: [{
                type: Input
            }], onNavigate: [{
                type: Output
            }], onViewMode: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onHover: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtbW9udGhzLWNhbGVuZGFyLXZpZXcuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2RhdGVwaWNrZXIvdGhlbWVzL2JzL2JzLW1vbnRocy1jYWxlbmRhci12aWV3LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZFLE9BQU8sRUFFTCxxQkFBcUIsRUFLdEIsTUFBTSxjQUFjLENBQUM7Ozs7O0FBNkJ0QixNQUFNLE9BQU8sNEJBQTRCO0lBM0J6QztRQThCWSxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDbkQsZUFBVSxHQUFHLElBQUksWUFBWSxFQUF3QixDQUFDO1FBRXRELGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBeUIsQ0FBQztRQUNyRCxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7S0FrQnhEO0lBaEJDLFVBQVUsQ0FBQyxLQUE0QjtRQUNyQyxNQUFNLElBQUksR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNqRCxDQUFDO0lBRUQsU0FBUyxDQUFDLEtBQTRCO1FBQ3BDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBMkIsRUFBRSxTQUFrQjtRQUN4RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCxjQUFjLENBQUMsS0FBMkI7UUFDeEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBNkIsQ0FBQyxDQUFDO0lBQ3RELENBQUM7OEdBeEJVLDRCQUE0QjtrR0FBNUIsNEJBQTRCLDJNQXpCN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJUOzsyRkFFVSw0QkFBNEI7a0JBM0J4QyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSx3QkFBd0I7b0JBQ2xDLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7aUJBQ0Y7OEJBRVUsUUFBUTtzQkFBaEIsS0FBSztnQkFFSSxVQUFVO3NCQUFuQixNQUFNO2dCQUNHLFVBQVU7c0JBQW5CLE1BQU07Z0JBRUcsUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxPQUFPO3NCQUFoQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBCc0RhdGVwaWNrZXJWaWV3TW9kZSxcclxuICBCc05hdmlnYXRpb25EaXJlY3Rpb24sXHJcbiAgQnNOYXZpZ2F0aW9uRXZlbnQsXHJcbiAgQ2VsbEhvdmVyRXZlbnQsXHJcbiAgTW9udGhzQ2FsZW5kYXJWaWV3TW9kZWwsXHJcbiAgQ2FsZW5kYXJDZWxsVmlld01vZGVsXHJcbn0gZnJvbSAnLi4vLi4vbW9kZWxzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYnMtbW9udGgtY2FsZW5kYXItdmlldycsXHJcbiAgdGVtcGxhdGU6IGBcclxuICAgIDxicy1jYWxlbmRhci1sYXlvdXQ+XHJcbiAgICAgIDxicy1kYXRlcGlja2VyLW5hdmlnYXRpb24tdmlld1xyXG4gICAgICAgIFtjYWxlbmRhcl09XCJjYWxlbmRhclwiXHJcbiAgICAgICAgKG9uTmF2aWdhdGUpPVwibmF2aWdhdGVUbygkZXZlbnQpXCJcclxuICAgICAgICAob25WaWV3TW9kZSk9XCJjaGFuZ2VWaWV3TW9kZSgkZXZlbnQpXCJcclxuICAgICAgPjwvYnMtZGF0ZXBpY2tlci1uYXZpZ2F0aW9uLXZpZXc+XHJcblxyXG4gICAgICA8dGFibGUgcm9sZT1cImdyaWRcIiBjbGFzcz1cIm1vbnRoc1wiPlxyXG4gICAgICAgIDx0Ym9keT5cclxuICAgICAgICA8dHIgKm5nRm9yPVwibGV0IHJvdyBvZiBjYWxlbmRhcj8ubW9udGhzXCI+XHJcbiAgICAgICAgICA8dGQgKm5nRm9yPVwibGV0IG1vbnRoIG9mIHJvd1wiIHJvbGU9XCJncmlkY2VsbFwiXHJcbiAgICAgICAgICAgICAgKGNsaWNrKT1cInZpZXdNb250aChtb250aClcIlxyXG4gICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cImhvdmVyTW9udGgobW9udGgsIHRydWUpXCJcclxuICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJob3Zlck1vbnRoKG1vbnRoLCBmYWxzZSlcIlxyXG4gICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJtb250aC5pc0Rpc2FibGVkXCJcclxuICAgICAgICAgICAgICBbY2xhc3MuaXMtaGlnaGxpZ2h0ZWRdPVwibW9udGguaXNIb3ZlcmVkXCI+XHJcbiAgICAgICAgICAgIDxzcGFuIFtjbGFzcy5zZWxlY3RlZF09XCJtb250aC5pc1NlbGVjdGVkXCI+e3sgbW9udGgubGFiZWwgfX08L3NwYW4+XHJcbiAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICAgICAgPC90Ym9keT5cclxuICAgICAgPC90YWJsZT5cclxuICAgIDwvYnMtY2FsZW5kYXItbGF5b3V0PlxyXG4gIGBcclxufSlcclxuZXhwb3J0IGNsYXNzIEJzTW9udGhDYWxlbmRhclZpZXdDb21wb25lbnQge1xyXG4gIEBJbnB1dCgpIGNhbGVuZGFyITogTW9udGhzQ2FsZW5kYXJWaWV3TW9kZWw7XHJcblxyXG4gIEBPdXRwdXQoKSBvbk5hdmlnYXRlID0gbmV3IEV2ZW50RW1pdHRlcjxCc05hdmlnYXRpb25FdmVudD4oKTtcclxuICBAT3V0cHV0KCkgb25WaWV3TW9kZSA9IG5ldyBFdmVudEVtaXR0ZXI8QnNEYXRlcGlja2VyVmlld01vZGU+KCk7XHJcblxyXG4gIEBPdXRwdXQoKSBvblNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXI8Q2FsZW5kYXJDZWxsVmlld01vZGVsPigpO1xyXG4gIEBPdXRwdXQoKSBvbkhvdmVyID0gbmV3IEV2ZW50RW1pdHRlcjxDZWxsSG92ZXJFdmVudD4oKTtcclxuXHJcbiAgbmF2aWdhdGVUbyhldmVudDogQnNOYXZpZ2F0aW9uRGlyZWN0aW9uKTogdm9pZCB7XHJcbiAgICBjb25zdCBzdGVwID0gQnNOYXZpZ2F0aW9uRGlyZWN0aW9uLkRPV04gPT09IGV2ZW50ID8gLTEgOiAxO1xyXG4gICAgdGhpcy5vbk5hdmlnYXRlLmVtaXQoeyBzdGVwOiB7IHllYXI6IHN0ZXAgfSB9KTtcclxuICB9XHJcblxyXG4gIHZpZXdNb250aChtb250aDogQ2FsZW5kYXJDZWxsVmlld01vZGVsKSB7XHJcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQobW9udGgpO1xyXG4gIH1cclxuXHJcbiAgaG92ZXJNb250aChjZWxsOiBDYWxlbmRhckNlbGxWaWV3TW9kZWwsIGlzSG92ZXJlZDogYm9vbGVhbikge1xyXG4gICAgdGhpcy5vbkhvdmVyLmVtaXQoeyBjZWxsLCBpc0hvdmVyZWQgfSk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VWaWV3TW9kZShldmVudDogQnNEYXRlcGlja2VyVmlld01vZGUpOiB2b2lkIHtcclxuICAgIHRoaXMub25WaWV3TW9kZS5lbWl0KGV2ZW50IGFzIEJzRGF0ZXBpY2tlclZpZXdNb2RlKTtcclxuICB9XHJcbn1cclxuIl19