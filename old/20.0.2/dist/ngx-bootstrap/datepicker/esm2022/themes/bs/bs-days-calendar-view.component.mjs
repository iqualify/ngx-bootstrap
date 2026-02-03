import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isSameDay } from 'ngx-bootstrap/chronos';
import { BsNavigationDirection } from '../../models';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import * as i0 from "@angular/core";
import * as i1 from "../../bs-datepicker.config";
import * as i2 from "@angular/common";
import * as i3 from "ngx-bootstrap/tooltip";
import * as i4 from "./bs-calendar-layout.component";
import * as i5 from "./bs-datepicker-day-decorator.directive";
import * as i6 from "./bs-datepicker-navigation-view.component";
export class BsDaysCalendarViewComponent {
    constructor(_config) {
        this._config = _config;
        this.onNavigate = new EventEmitter();
        this.onViewMode = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.onHover = new EventEmitter();
        this.onHoverWeek = new EventEmitter();
        this.isiOS = (/iPad|iPhone|iPod/.test(navigator.platform) ||
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1));
        if (this._config.dateTooltipTexts && this._config.dateTooltipTexts.length > 0) {
            this.isShowTooltip = true;
        }
    }
    navigateTo(event) {
        const step = BsNavigationDirection.DOWN === event ? -1 : 1;
        this.onNavigate.emit({ step: { month: step } });
    }
    changeViewMode(event) {
        this.onViewMode.emit(event);
    }
    selectDay(event) {
        this.onSelect.emit(event);
    }
    selectWeek(week) {
        if (!this._config.selectWeek && !this._config.selectWeekDateRange) {
            return;
        }
        if (week.days.length === 0) {
            return;
        }
        if (this._config.selectWeek && week.days[0]
            && !week.days[0].isDisabled
            && this._config.selectFromOtherMonth) {
            this.onSelect.emit(week.days[0]);
            return;
        }
        const selectedDay = week.days.find((day) => {
            return this._config.selectFromOtherMonth
                ? !day.isDisabled
                : !day.isOtherMonth && !day.isDisabled;
        });
        this.onSelect.emit(selectedDay);
        if (this._config.selectWeekDateRange) {
            const days = week.days.slice(0);
            const lastDayOfRange = days.reverse().find((day) => {
                return this._config.selectFromOtherMonth
                    ? !day.isDisabled
                    : !day.isOtherMonth && !day.isDisabled;
            });
            this.onSelect.emit(lastDayOfRange);
        }
    }
    weekHoverHandler(cell, isHovered) {
        if (!this._config.selectWeek && !this._config.selectWeekDateRange) {
            return;
        }
        const hasActiveDays = cell.days.find((day) => {
            return this._config.selectFromOtherMonth
                ? !day.isDisabled
                : !day.isOtherMonth && !day.isDisabled;
        });
        if (hasActiveDays) {
            cell.isHovered = isHovered;
            this.isWeekHovered = isHovered;
            this.onHoverWeek.emit(cell);
        }
    }
    hoverDay(cell, isHovered) {
        if (this._config.selectFromOtherMonth && cell.isOtherMonth) {
            cell.isOtherMonthHovered = isHovered;
        }
        if (this._config.dateTooltipTexts) {
            cell.tooltipText = '';
            this._config.dateTooltipTexts.forEach((dateData) => {
                if (isSameDay(dateData.date, cell.date)) {
                    cell.tooltipText = dateData.tooltipText;
                    return;
                }
            });
        }
        this.onHover.emit({ cell, isHovered });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDaysCalendarViewComponent, deps: [{ token: i1.BsDatepickerConfig }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: BsDaysCalendarViewComponent, selector: "bs-days-calendar-view", inputs: { calendar: "calendar", options: "options", isDisabled: "isDisabled" }, outputs: { onNavigate: "onNavigate", onViewMode: "onViewMode", onSelect: "onSelect", onHover: "onHover", onHoverWeek: "onHoverWeek" }, ngImport: i0, template: `
    <bs-calendar-layout>
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        [isDisabled]="!!isDisabled"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>
      <!--days matrix-->
      <table role="grid" class="days weeks">
        <thead>
        <tr>
          <!--if show weeks-->
          <th *ngIf="options && options.showWeekNumbers"></th>
          <th *ngFor="let weekday of calendar.weekdays; let i = index"
              aria-label="weekday">{{ calendar.weekdays[i] }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let week of calendar.weeks; let i = index">
          <td class="week" [class.active-week]="isWeekHovered"  *ngIf="options && options.showWeekNumbers">
            <span *ngIf="isiOS" (click)="selectWeek(week)">{{ calendar.weekNumbers[i] }}</span>
            <span *ngIf="!isiOS"
                (click)="selectWeek(week)"
                (mouseenter)="weekHoverHandler(week, true)"
                (mouseleave)="weekHoverHandler(week, false)">{{ calendar.weekNumbers[i] }}</span>
          </td>
          <td *ngFor="let day of week.days" role="gridcell">

            <!-- When we want to show tooltips for dates -->
            <span *ngIf="!isiOS && isShowTooltip" bsDatepickerDayDecorator
                [day]="day"
                (click)="selectDay(day)"
                tooltip="{{day.tooltipText}}"
                (mouseenter)="hoverDay(day, true)"
                (mouseleave)="hoverDay(day, false)">{{ day.label }} 3</span>
            <!-- When tooltips for dates are disabled -->
            <span *ngIf="!isiOS && !isShowTooltip" bsDatepickerDayDecorator
                  [day]="day"
                  (click)="selectDay(day)"
                  (mouseenter)="hoverDay(day, true)"
                  (mouseleave)="hoverDay(day, false)">{{ day.label }} 2</span>

            <!-- For mobile iOS view, tooltips are not needed -->
            <span *ngIf="isiOS" bsDatepickerDayDecorator
                  [day]="day"
                  (click)="selectDay(day)">{{ day.label }} 1</span>
          </td>
        </tr>
        </tbody>
      </table>

    </bs-calendar-layout>
  `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i3.TooltipDirective, selector: "[tooltip], [tooltipHtml]", inputs: ["adaptivePosition", "tooltip", "placement", "triggers", "container", "containerClass", "boundariesElement", "isOpen", "isDisabled", "delay", "tooltipHtml", "tooltipPlacement", "tooltipIsOpen", "tooltipEnable", "tooltipAppendToBody", "tooltipAnimation", "tooltipClass", "tooltipContext", "tooltipPopupDelay", "tooltipFadeDuration", "tooltipTrigger"], outputs: ["tooltipChange", "onShown", "onHidden", "tooltipStateChanged"], exportAs: ["bs-tooltip"] }, { kind: "component", type: i4.BsCalendarLayoutComponent, selector: "bs-calendar-layout" }, { kind: "component", type: i5.BsDatepickerDayDecoratorComponent, selector: "[bsDatepickerDayDecorator]", inputs: ["day"] }, { kind: "component", type: i6.BsDatepickerNavigationViewComponent, selector: "bs-datepicker-navigation-view", inputs: ["calendar", "isDisabled"], outputs: ["onNavigate", "onViewMode"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDaysCalendarViewComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'bs-days-calendar-view',
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    template: `
    <bs-calendar-layout>
      <bs-datepicker-navigation-view
        [calendar]="calendar"
        [isDisabled]="!!isDisabled"
        (onNavigate)="navigateTo($event)"
        (onViewMode)="changeViewMode($event)"
      ></bs-datepicker-navigation-view>
      <!--days matrix-->
      <table role="grid" class="days weeks">
        <thead>
        <tr>
          <!--if show weeks-->
          <th *ngIf="options && options.showWeekNumbers"></th>
          <th *ngFor="let weekday of calendar.weekdays; let i = index"
              aria-label="weekday">{{ calendar.weekdays[i] }}
          </th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let week of calendar.weeks; let i = index">
          <td class="week" [class.active-week]="isWeekHovered"  *ngIf="options && options.showWeekNumbers">
            <span *ngIf="isiOS" (click)="selectWeek(week)">{{ calendar.weekNumbers[i] }}</span>
            <span *ngIf="!isiOS"
                (click)="selectWeek(week)"
                (mouseenter)="weekHoverHandler(week, true)"
                (mouseleave)="weekHoverHandler(week, false)">{{ calendar.weekNumbers[i] }}</span>
          </td>
          <td *ngFor="let day of week.days" role="gridcell">

            <!-- When we want to show tooltips for dates -->
            <span *ngIf="!isiOS && isShowTooltip" bsDatepickerDayDecorator
                [day]="day"
                (click)="selectDay(day)"
                tooltip="{{day.tooltipText}}"
                (mouseenter)="hoverDay(day, true)"
                (mouseleave)="hoverDay(day, false)">{{ day.label }} 3</span>
            <!-- When tooltips for dates are disabled -->
            <span *ngIf="!isiOS && !isShowTooltip" bsDatepickerDayDecorator
                  [day]="day"
                  (click)="selectDay(day)"
                  (mouseenter)="hoverDay(day, true)"
                  (mouseleave)="hoverDay(day, false)">{{ day.label }} 2</span>

            <!-- For mobile iOS view, tooltips are not needed -->
            <span *ngIf="isiOS" bsDatepickerDayDecorator
                  [day]="day"
                  (click)="selectDay(day)">{{ day.label }} 1</span>
          </td>
        </tr>
        </tbody>
      </table>

    </bs-calendar-layout>
  `
                }]
        }], ctorParameters: () => [{ type: i1.BsDatepickerConfig }], propDecorators: { calendar: [{
                type: Input
            }], options: [{
                type: Input
            }], isDisabled: [{
                type: Input
            }], onNavigate: [{
                type: Output
            }], onViewMode: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onHover: [{
                type: Output
            }], onHoverWeek: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF5cy1jYWxlbmRhci12aWV3LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9kYXRlcGlja2VyL3RoZW1lcy9icy9icy1kYXlzLWNhbGVuZGFyLXZpZXcuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRWxELE9BQU8sRUFFTCxxQkFBcUIsRUFNdEIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7Ozs7Ozs7O0FBNkRoRSxNQUFNLE9BQU8sMkJBQTJCO0lBZ0J0QyxZQUFvQixPQUEyQjtRQUEzQixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQVhyQyxlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFDbkQsZUFBVSxHQUFHLElBQUksWUFBWSxFQUF3QixDQUFDO1FBRXRELGFBQVEsR0FBRyxJQUFJLFlBQVksRUFBZ0IsQ0FBQztRQUM1QyxZQUFPLEdBQUcsSUFBSSxZQUFZLEVBQWtCLENBQUM7UUFDN0MsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBaUIsQ0FBQztRQU94RCxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDdkQsQ0FBQyxTQUFTLENBQUMsUUFBUSxLQUFLLFVBQVUsSUFBSSxTQUFTLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkUsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLENBQUMsRUFB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UyxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDOzhHQS9HVSwyQkFBMkI7a0dBQTNCLDJCQUEyQixvUkF4RDVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzRFQ7OzJGQUVVLDJCQUEyQjtrQkEzRHZDLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtvQkFDakMsbURBQW1EO29CQUNuRCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNEVDtpQkFDRjt1RkFFVSxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUVJLFVBQVU7c0JBQW5CLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkFFRyxRQUFRO3NCQUFqQixNQUFNO2dCQUNHLE9BQU87c0JBQWhCLE1BQU07Z0JBQ0csV0FBVztzQkFBcEIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ29tcG9uZW50LFxyXG4gIEV2ZW50RW1pdHRlcixcclxuICBJbnB1dCxcclxuICBPdXRwdXRcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IGlzU2FtZURheSB9IGZyb20gJ25neC1ib290c3RyYXAvY2hyb25vcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIEJzRGF0ZXBpY2tlclZpZXdNb2RlLFxyXG4gIEJzTmF2aWdhdGlvbkRpcmVjdGlvbixcclxuICBCc05hdmlnYXRpb25FdmVudCxcclxuICBDZWxsSG92ZXJFdmVudCwgRGF0ZXBpY2tlckRhdGVUb29sdGlwVGV4dCxcclxuICBEYXRlcGlja2VyUmVuZGVyT3B0aW9ucyxcclxuICBEYXlzQ2FsZW5kYXJWaWV3TW9kZWwsXHJcbiAgRGF5Vmlld01vZGVsLCBXZWVrVmlld01vZGVsXHJcbn0gZnJvbSAnLi4vLi4vbW9kZWxzJztcclxuXHJcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckNvbmZpZyB9IGZyb20gJy4uLy4uL2JzLWRhdGVwaWNrZXIuY29uZmlnJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYnMtZGF5cy1jYWxlbmRhci12aWV3JyxcclxuICAvLyBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcclxuICB0ZW1wbGF0ZTogYFxyXG4gICAgPGJzLWNhbGVuZGFyLWxheW91dD5cclxuICAgICAgPGJzLWRhdGVwaWNrZXItbmF2aWdhdGlvbi12aWV3XHJcbiAgICAgICAgW2NhbGVuZGFyXT1cImNhbGVuZGFyXCJcclxuICAgICAgICBbaXNEaXNhYmxlZF09XCIhIWlzRGlzYWJsZWRcIlxyXG4gICAgICAgIChvbk5hdmlnYXRlKT1cIm5hdmlnYXRlVG8oJGV2ZW50KVwiXHJcbiAgICAgICAgKG9uVmlld01vZGUpPVwiY2hhbmdlVmlld01vZGUoJGV2ZW50KVwiXHJcbiAgICAgID48L2JzLWRhdGVwaWNrZXItbmF2aWdhdGlvbi12aWV3PlxyXG4gICAgICA8IS0tZGF5cyBtYXRyaXgtLT5cclxuICAgICAgPHRhYmxlIHJvbGU9XCJncmlkXCIgY2xhc3M9XCJkYXlzIHdlZWtzXCI+XHJcbiAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgIDx0cj5cclxuICAgICAgICAgIDwhLS1pZiBzaG93IHdlZWtzLS0+XHJcbiAgICAgICAgICA8dGggKm5nSWY9XCJvcHRpb25zICYmIG9wdGlvbnMuc2hvd1dlZWtOdW1iZXJzXCI+PC90aD5cclxuICAgICAgICAgIDx0aCAqbmdGb3I9XCJsZXQgd2Vla2RheSBvZiBjYWxlbmRhci53ZWVrZGF5czsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD1cIndlZWtkYXlcIj57eyBjYWxlbmRhci53ZWVrZGF5c1tpXSB9fVxyXG4gICAgICAgICAgPC90aD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgPHRib2R5PlxyXG4gICAgICAgIDx0ciAqbmdGb3I9XCJsZXQgd2VlayBvZiBjYWxlbmRhci53ZWVrczsgbGV0IGkgPSBpbmRleFwiPlxyXG4gICAgICAgICAgPHRkIGNsYXNzPVwid2Vla1wiIFtjbGFzcy5hY3RpdmUtd2Vla109XCJpc1dlZWtIb3ZlcmVkXCIgICpuZ0lmPVwib3B0aW9ucyAmJiBvcHRpb25zLnNob3dXZWVrTnVtYmVyc1wiPlxyXG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cImlzaU9TXCIgKGNsaWNrKT1cInNlbGVjdFdlZWsod2VlaylcIj57eyBjYWxlbmRhci53ZWVrTnVtYmVyc1tpXSB9fTwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCIhaXNpT1NcIlxyXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFdlZWsod2VlaylcIlxyXG4gICAgICAgICAgICAgICAgKG1vdXNlZW50ZXIpPVwid2Vla0hvdmVySGFuZGxlcih3ZWVrLCB0cnVlKVwiXHJcbiAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJ3ZWVrSG92ZXJIYW5kbGVyKHdlZWssIGZhbHNlKVwiPnt7IGNhbGVuZGFyLndlZWtOdW1iZXJzW2ldIH19PC9zcGFuPlxyXG4gICAgICAgICAgPC90ZD5cclxuICAgICAgICAgIDx0ZCAqbmdGb3I9XCJsZXQgZGF5IG9mIHdlZWsuZGF5c1wiIHJvbGU9XCJncmlkY2VsbFwiPlxyXG5cclxuICAgICAgICAgICAgPCEtLSBXaGVuIHdlIHdhbnQgdG8gc2hvdyB0b29sdGlwcyBmb3IgZGF0ZXMgLS0+XHJcbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIWlzaU9TICYmIGlzU2hvd1Rvb2x0aXBcIiBic0RhdGVwaWNrZXJEYXlEZWNvcmF0b3JcclxuICAgICAgICAgICAgICAgIFtkYXldPVwiZGF5XCJcclxuICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3REYXkoZGF5KVwiXHJcbiAgICAgICAgICAgICAgICB0b29sdGlwPVwie3tkYXkudG9vbHRpcFRleHR9fVwiXHJcbiAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJob3ZlckRheShkYXksIHRydWUpXCJcclxuICAgICAgICAgICAgICAgIChtb3VzZWxlYXZlKT1cImhvdmVyRGF5KGRheSwgZmFsc2UpXCI+e3sgZGF5LmxhYmVsIH19IDM8L3NwYW4+XHJcbiAgICAgICAgICAgIDwhLS0gV2hlbiB0b29sdGlwcyBmb3IgZGF0ZXMgYXJlIGRpc2FibGVkIC0tPlxyXG4gICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiFpc2lPUyAmJiAhaXNTaG93VG9vbHRpcFwiIGJzRGF0ZXBpY2tlckRheURlY29yYXRvclxyXG4gICAgICAgICAgICAgICAgICBbZGF5XT1cImRheVwiXHJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3REYXkoZGF5KVwiXHJcbiAgICAgICAgICAgICAgICAgIChtb3VzZWVudGVyKT1cImhvdmVyRGF5KGRheSwgdHJ1ZSlcIlxyXG4gICAgICAgICAgICAgICAgICAobW91c2VsZWF2ZSk9XCJob3ZlckRheShkYXksIGZhbHNlKVwiPnt7IGRheS5sYWJlbCB9fSAyPC9zcGFuPlxyXG5cclxuICAgICAgICAgICAgPCEtLSBGb3IgbW9iaWxlIGlPUyB2aWV3LCB0b29sdGlwcyBhcmUgbm90IG5lZWRlZCAtLT5cclxuICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJpc2lPU1wiIGJzRGF0ZXBpY2tlckRheURlY29yYXRvclxyXG4gICAgICAgICAgICAgICAgICBbZGF5XT1cImRheVwiXHJcbiAgICAgICAgICAgICAgICAgIChjbGljayk9XCJzZWxlY3REYXkoZGF5KVwiPnt7IGRheS5sYWJlbCB9fSAxPC9zcGFuPlxyXG4gICAgICAgICAgPC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgICAgIDwvdGJvZHk+XHJcbiAgICAgIDwvdGFibGU+XHJcblxyXG4gICAgPC9icy1jYWxlbmRhci1sYXlvdXQ+XHJcbiAgYFxyXG59KVxyXG5leHBvcnQgY2xhc3MgQnNEYXlzQ2FsZW5kYXJWaWV3Q29tcG9uZW50ICB7XHJcbiAgQElucHV0KCkgY2FsZW5kYXIhOiBEYXlzQ2FsZW5kYXJWaWV3TW9kZWw7XHJcbiAgQElucHV0KCkgb3B0aW9ucz86IERhdGVwaWNrZXJSZW5kZXJPcHRpb25zIHwgbnVsbDtcclxuICBASW5wdXQoKSBpc0Rpc2FibGVkPzogYm9vbGVhbjtcclxuXHJcbiAgQE91dHB1dCgpIG9uTmF2aWdhdGUgPSBuZXcgRXZlbnRFbWl0dGVyPEJzTmF2aWdhdGlvbkV2ZW50PigpO1xyXG4gIEBPdXRwdXQoKSBvblZpZXdNb2RlID0gbmV3IEV2ZW50RW1pdHRlcjxCc0RhdGVwaWNrZXJWaWV3TW9kZT4oKTtcclxuXHJcbiAgQE91dHB1dCgpIG9uU2VsZWN0ID0gbmV3IEV2ZW50RW1pdHRlcjxEYXlWaWV3TW9kZWw+KCk7XHJcbiAgQE91dHB1dCgpIG9uSG92ZXIgPSBuZXcgRXZlbnRFbWl0dGVyPENlbGxIb3ZlckV2ZW50PigpO1xyXG4gIEBPdXRwdXQoKSBvbkhvdmVyV2VlayA9IG5ldyBFdmVudEVtaXR0ZXI8V2Vla1ZpZXdNb2RlbD4oKTtcclxuXHJcbiAgaXNXZWVrSG92ZXJlZD86IGJvb2xlYW47XHJcbiAgaXNpT1M6IGJvb2xlYW47XHJcbiAgaXNTaG93VG9vbHRpcD86IGJvb2xlYW47XHJcblxyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NvbmZpZzogQnNEYXRlcGlja2VyQ29uZmlnKSB7XHJcbiAgICB0aGlzLmlzaU9TID0gKC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci5wbGF0Zm9ybSkgfHxcclxuICAgICAgKG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gJ01hY0ludGVsJyAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxKSk7XHJcbiAgICBpZiAodGhpcy5fY29uZmlnLmRhdGVUb29sdGlwVGV4dHMgJiYgdGhpcy5fY29uZmlnLmRhdGVUb29sdGlwVGV4dHMubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLmlzU2hvd1Rvb2x0aXAgPSB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmF2aWdhdGVUbyhldmVudDogQnNOYXZpZ2F0aW9uRGlyZWN0aW9uKTogdm9pZCB7XHJcbiAgICBjb25zdCBzdGVwID0gQnNOYXZpZ2F0aW9uRGlyZWN0aW9uLkRPV04gPT09IGV2ZW50ID8gLTEgOiAxO1xyXG4gICAgdGhpcy5vbk5hdmlnYXRlLmVtaXQoeyBzdGVwOiB7IG1vbnRoOiBzdGVwIH0gfSk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VWaWV3TW9kZShldmVudDogQnNEYXRlcGlja2VyVmlld01vZGUpOiB2b2lkIHtcclxuICAgIHRoaXMub25WaWV3TW9kZS5lbWl0KGV2ZW50KTtcclxuICB9XHJcblxyXG4gIHNlbGVjdERheShldmVudDogRGF5Vmlld01vZGVsKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uU2VsZWN0LmVtaXQoZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgc2VsZWN0V2Vlayh3ZWVrOiBXZWVrVmlld01vZGVsKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5zZWxlY3RXZWVrICYmICF0aGlzLl9jb25maWcuc2VsZWN0V2Vla0RhdGVSYW5nZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHdlZWsuZGF5cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLl9jb25maWcuc2VsZWN0V2VlayAmJiB3ZWVrLmRheXNbMF1cclxuICAgICAgICAmJiAhd2Vlay5kYXlzWzBdLmlzRGlzYWJsZWRcclxuICAgICAgICAmJiB0aGlzLl9jb25maWcuc2VsZWN0RnJvbU90aGVyTW9udGgpIHtcclxuXHJcbiAgICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KHdlZWsuZGF5c1swXSk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBzZWxlY3RlZERheSA9IHdlZWsuZGF5cy5maW5kKChkYXk6IERheVZpZXdNb2RlbCkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlbGVjdEZyb21PdGhlck1vbnRoXHJcbiAgICAgICAgPyAhZGF5LmlzRGlzYWJsZWRcclxuICAgICAgICA6ICFkYXkuaXNPdGhlck1vbnRoICYmICFkYXkuaXNEaXNhYmxlZDtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub25TZWxlY3QuZW1pdChzZWxlY3RlZERheSk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5zZWxlY3RXZWVrRGF0ZVJhbmdlKSB7XHJcbiAgICAgIGNvbnN0IGRheXMgPSB3ZWVrLmRheXMuc2xpY2UoMCk7XHJcbiAgICAgIGNvbnN0IGxhc3REYXlPZlJhbmdlID0gZGF5cy5yZXZlcnNlKCkuZmluZCgoZGF5OiBEYXlWaWV3TW9kZWwpID0+IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlbGVjdEZyb21PdGhlck1vbnRoXHJcbiAgICAgICAgICA/ICFkYXkuaXNEaXNhYmxlZFxyXG4gICAgICAgICAgOiAhZGF5LmlzT3RoZXJNb250aCAmJiAhZGF5LmlzRGlzYWJsZWQ7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5vblNlbGVjdC5lbWl0KGxhc3REYXlPZlJhbmdlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHdlZWtIb3ZlckhhbmRsZXIoY2VsbDogV2Vla1ZpZXdNb2RlbCwgaXNIb3ZlcmVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMuX2NvbmZpZy5zZWxlY3RXZWVrICYmICF0aGlzLl9jb25maWcuc2VsZWN0V2Vla0RhdGVSYW5nZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGFzQWN0aXZlRGF5cyA9IGNlbGwuZGF5cy5maW5kKChkYXk6IERheVZpZXdNb2RlbCkgPT4ge1xyXG4gICAgICByZXR1cm4gdGhpcy5fY29uZmlnLnNlbGVjdEZyb21PdGhlck1vbnRoXHJcbiAgICAgICAgPyAhZGF5LmlzRGlzYWJsZWRcclxuICAgICAgICA6ICFkYXkuaXNPdGhlck1vbnRoICYmICFkYXkuaXNEaXNhYmxlZDtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChoYXNBY3RpdmVEYXlzKSB7XHJcbiAgICAgIGNlbGwuaXNIb3ZlcmVkID0gaXNIb3ZlcmVkO1xyXG4gICAgICB0aGlzLmlzV2Vla0hvdmVyZWQgPSBpc0hvdmVyZWQ7XHJcbiAgICAgIHRoaXMub25Ib3ZlcldlZWsuZW1pdChjZWxsKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGhvdmVyRGF5KGNlbGw6IERheVZpZXdNb2RlbCwgaXNIb3ZlcmVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fY29uZmlnLnNlbGVjdEZyb21PdGhlck1vbnRoICYmIGNlbGwuaXNPdGhlck1vbnRoKSB7XHJcbiAgICAgIGNlbGwuaXNPdGhlck1vbnRoSG92ZXJlZCA9IGlzSG92ZXJlZDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fY29uZmlnLmRhdGVUb29sdGlwVGV4dHMpIHtcclxuICAgICAgY2VsbC50b29sdGlwVGV4dCA9ICcnO1xyXG4gICAgICB0aGlzLl9jb25maWcuZGF0ZVRvb2x0aXBUZXh0cy5mb3JFYWNoKChkYXRlRGF0YTogRGF0ZXBpY2tlckRhdGVUb29sdGlwVGV4dCkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoaXNTYW1lRGF5KGRhdGVEYXRhLmRhdGUsIGNlbGwuZGF0ZSkpIHtcclxuICAgICAgICAgIGNlbGwudG9vbHRpcFRleHQgPSBkYXRlRGF0YS50b29sdGlwVGV4dDtcclxuXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uSG92ZXIuZW1pdCh7IGNlbGwsIGlzSG92ZXJlZCB9KTtcclxuICB9XHJcbn1cclxuIl19