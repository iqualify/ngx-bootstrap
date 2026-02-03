import { Component, ElementRef, EventEmitter, HostBinding, Renderer2, ViewChild } from '@angular/core';
import { take } from 'rxjs/operators';
import { getFullYear, getMonth } from 'ngx-bootstrap/chronos';
import { PositioningService } from 'ngx-bootstrap/positioning';
import { TimepickerComponent } from 'ngx-bootstrap/timepicker';
import { BsDatepickerAbstractComponent } from '../../base/bs-datepicker-container';
import { BsDatepickerConfig } from '../../bs-datepicker.config';
import { BsDatepickerActions } from '../../reducer/bs-datepicker.actions';
import { BsDatepickerEffects } from '../../reducer/bs-datepicker.effects';
import { BsDatepickerStore } from '../../reducer/bs-datepicker.store';
import { datepickerAnimation } from '../../datepicker-animations';
import { dayInMilliseconds } from '../../reducer/_defaults';
import * as i0 from "@angular/core";
import * as i1 from "../../bs-datepicker.config";
import * as i2 from "../../reducer/bs-datepicker.store";
import * as i3 from "../../reducer/bs-datepicker.actions";
import * as i4 from "../../reducer/bs-datepicker.effects";
import * as i5 from "ngx-bootstrap/positioning";
import * as i6 from "@angular/common";
import * as i7 from "ngx-bootstrap/timepicker";
import * as i8 from "./bs-custom-dates-view.component";
import * as i9 from "./bs-days-calendar-view.component";
import * as i10 from "./bs-months-calendar-view.component";
import * as i11 from "./bs-years-calendar-view.component";
export class BsDaterangepickerContainerComponent extends BsDatepickerAbstractComponent {
    set value(value) {
        this._effects?.setRangeValue(value);
    }
    get isDatePickerDisabled() {
        return !!this._config.isDisabled;
    }
    get isDatepickerDisabled() {
        return this.isDatePickerDisabled ? '' : null;
    }
    get isDatepickerReadonly() {
        return this.isDatePickerDisabled ? '' : null;
    }
    constructor(_renderer, _config, _store, _element, _actions, _effects, _positionService) {
        super();
        this._config = _config;
        this._store = _store;
        this._element = _element;
        this._actions = _actions;
        this._positionService = _positionService;
        this.valueChange = new EventEmitter();
        this.animationState = 'void';
        this._rangeStack = [];
        this.chosenRange = [];
        this._subs = [];
        this.isRangePicker = true;
        this._effects = _effects;
        this.customRanges = this._config.ranges || [];
        this.customRangeBtnLbl = this._config.customRangeButtonLabel;
        _renderer.setStyle(_element.nativeElement, 'display', 'block');
        _renderer.setStyle(_element.nativeElement, 'position', 'absolute');
    }
    ngOnInit() {
        this._positionService.setOptions({
            modifiers: {
                flip: {
                    enabled: this._config.adaptivePosition
                },
                preventOverflow: {
                    enabled: this._config.adaptivePosition
                }
            },
            allowedPositions: this._config.allowedPositions
        });
        this._positionService.event$?.pipe(take(1)).subscribe(() => {
            this._positionService.disable();
            if (this._config.isAnimated) {
                this.animationState = this.isTopPosition ? 'animated-up' : 'animated-down';
                return;
            }
            this.animationState = 'unanimated';
        });
        this.containerClass = this._config.containerClass;
        this.isOtherMonthsActive = this._config.selectFromOtherMonth;
        this.withTimepicker = this._config.withTimepicker;
        this._effects
            ?.init(this._store)
            // intial state options
            // todo: fix this, split configs
            .setOptions(this._config)
            // data binding view --> model
            .setBindings(this)
            // set event handlers
            .setEventHandlers(this)
            .registerDatepickerSideEffects();
        let currentDate;
        // todo: move it somewhere else
        // on selected date change
        this._subs.push(this._store
            .select((state) => state.selectedRange)
            .subscribe((dateRange) => {
            currentDate = dateRange;
            this.valueChange.emit(dateRange);
            this.chosenRange = dateRange || [];
        }));
        this._subs.push(this._store
            .select((state) => state.selectedTime)
            .subscribe((time) => {
            if (!time ||
                !time[0] ||
                !time[1] ||
                !(time[0] instanceof Date) ||
                !(time[1] instanceof Date) ||
                (currentDate && time[0] === currentDate[0] && time[1] === currentDate[1])) {
                return;
            }
            this.valueChange.emit(time);
            this.chosenRange = time || [];
        }));
    }
    ngAfterViewInit() {
        this.selectedTimeSub.add(this.selectedTime?.subscribe((val) => {
            if (Array.isArray(val) && val.length >= 2) {
                this.startTimepicker?.writeValue(val[0]);
                this.endTimepicker?.writeValue(val[1]);
            }
        }));
        this.startTimepicker?.registerOnChange((val) => {
            this.timeSelectHandler(val, 0);
        });
        this.endTimepicker?.registerOnChange((val) => {
            this.timeSelectHandler(val, 1);
        });
    }
    get isTopPosition() {
        return this._element.nativeElement.classList.contains('top');
    }
    positionServiceEnable() {
        this._positionService.enable();
    }
    timeSelectHandler(date, index) {
        this._store.dispatch(this._actions.selectTime(date, index));
    }
    daySelectHandler(day) {
        if (!day) {
            return;
        }
        const isDisabled = this.isOtherMonthsActive ? day.isDisabled : day.isOtherMonth || day.isDisabled;
        if (isDisabled) {
            return;
        }
        this.rangesProcessing(day);
    }
    monthSelectHandler(day) {
        if (!day || day.isDisabled) {
            return;
        }
        day.isSelected = true;
        if (this._config.minMode !== 'month') {
            if (day.isDisabled) {
                return;
            }
            this._store.dispatch(this._actions.navigateTo({
                unit: {
                    month: getMonth(day.date),
                    year: getFullYear(day.date)
                },
                viewMode: 'day'
            }));
            return;
        }
        this.rangesProcessing(day);
    }
    yearSelectHandler(day) {
        if (!day || day.isDisabled) {
            return;
        }
        day.isSelected = true;
        if (this._config.minMode !== 'year') {
            if (day.isDisabled) {
                return;
            }
            this._store.dispatch(this._actions.navigateTo({
                unit: {
                    year: getFullYear(day.date)
                },
                viewMode: 'month'
            }));
            return;
        }
        this.rangesProcessing(day);
    }
    rangesProcessing(day) {
        // if only one date is already selected
        // and user clicks on previous date
        // start selection from new date
        // but if new date is after initial one
        // than finish selection
        if (this._rangeStack.length === 1) {
            this._rangeStack = day.date >= this._rangeStack[0] ? [this._rangeStack[0], day.date] : [day.date];
        }
        if (this._config.maxDateRange) {
            this.setMaxDateRangeOnCalendar(day.date);
        }
        if (this._rangeStack.length === 0) {
            this._rangeStack = [day.date];
            if (this._config.maxDateRange) {
                this.setMaxDateRangeOnCalendar(day.date);
            }
        }
        this._store.dispatch(this._actions.selectRange(this._rangeStack));
        if (this._rangeStack.length === 2) {
            this._rangeStack = [];
        }
    }
    ngOnDestroy() {
        for (const sub of this._subs) {
            sub.unsubscribe();
        }
        this.selectedTimeSub.unsubscribe();
        this._effects?.destroy();
    }
    setRangeOnCalendar(dates) {
        if (dates) {
            this._rangeStack = dates.value instanceof Date ? [dates.value] : dates.value;
        }
        this._store.dispatch(this._actions.selectRange(this._rangeStack));
    }
    setMaxDateRangeOnCalendar(currentSelection) {
        let maxDateRange = new Date(currentSelection);
        if (this._config.maxDate) {
            const maxDateValueInMilliseconds = this._config.maxDate.getTime();
            const maxDateRangeInMilliseconds = currentSelection.getTime() + (this._config.maxDateRange || 0) * dayInMilliseconds;
            maxDateRange =
                maxDateRangeInMilliseconds > maxDateValueInMilliseconds
                    ? new Date(this._config.maxDate)
                    : new Date(maxDateRangeInMilliseconds);
        }
        else {
            maxDateRange.setDate(currentSelection.getDate() + (this._config.maxDateRange || 0));
        }
        this._effects?.setMaxDate(maxDateRange);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDaterangepickerContainerComponent, deps: [{ token: i0.Renderer2 }, { token: i1.BsDatepickerConfig }, { token: i2.BsDatepickerStore }, { token: i0.ElementRef }, { token: i3.BsDatepickerActions }, { token: i4.BsDatepickerEffects }, { token: i5.PositioningService }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: BsDaterangepickerContainerComponent, selector: "bs-daterangepicker-container", host: { attributes: { "role": "dialog", "aria-label": "calendar" }, listeners: { "click": "_stopPropagation($event)" }, properties: { "attr.disabled": "this.isDatepickerDisabled", "attr.readonly": "this.isDatepickerReadonly" }, classAttribute: "bottom" }, providers: [BsDatepickerStore, BsDatepickerEffects], viewQueries: [{ propertyName: "startTimepicker", first: true, predicate: ["startTP"], descendants: true }, { propertyName: "endTimepicker", first: true, predicate: ["endTP"], descendants: true }], usesInheritance: true, ngImport: i0, template: "<!-- days calendar view mode -->\r\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\r\n  <div class=\"bs-datepicker-container\"\r\n    [@datepickerAnimation]=\"animationState\"\r\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\r\n    <!--calendars-->\r\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\r\n      <!--days calendar-->\r\n      <ng-container *ngSwitchCase=\"'day'\">\r\n        <div class=\"bs-media-container\">\r\n          <bs-days-calendar-view\r\n            *ngFor=\"let calendar of daysCalendar$ | async\"\r\n            [class.bs-datepicker-multiple]=\"multipleCalendars\"\r\n            [calendar]=\"calendar\"\r\n            [isDisabled]=\"isDatePickerDisabled\"\r\n            [options]=\"options$ | async\"\r\n            (onNavigate)=\"navigateTo($event)\"\r\n            (onViewMode)=\"setViewMode($event)\"\r\n            (onHover)=\"dayHoverHandler($event)\"\r\n            (onHoverWeek)=\"weekHoverHandler($event)\"\r\n            (onSelect)=\"daySelectHandler($event)\">\r\n          </bs-days-calendar-view>\r\n        </div>\r\n        <div *ngIf=\"withTimepicker\" class=\"bs-timepicker-in-datepicker-container\">\r\n          <timepicker #startTP [disabled]=\"isDatePickerDisabled\"></timepicker>\r\n          <timepicker #endTP *ngIf=\"isRangePicker\" [disabled]=\"isDatePickerDisabled\"></timepicker>\r\n        </div>\r\n      </ng-container>\r\n\r\n      <!--months calendar-->\r\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\r\n        <bs-month-calendar-view\r\n          *ngFor=\"let calendar of monthsCalendar | async\"\r\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\r\n          [calendar]=\"calendar\"\r\n          (onNavigate)=\"navigateTo($event)\"\r\n          (onViewMode)=\"setViewMode($event)\"\r\n          (onHover)=\"monthHoverHandler($event)\"\r\n          (onSelect)=\"monthSelectHandler($event)\">\r\n        </bs-month-calendar-view>\r\n      </div>\r\n\r\n      <!--years calendar-->\r\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\r\n        <bs-years-calendar-view\r\n          *ngFor=\"let calendar of yearsCalendar | async\"\r\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\r\n          [calendar]=\"calendar\"\r\n          (onNavigate)=\"navigateTo($event)\"\r\n          (onViewMode)=\"setViewMode($event)\"\r\n          (onHover)=\"yearHoverHandler($event)\"\r\n          (onSelect)=\"yearSelectHandler($event)\">\r\n        </bs-years-calendar-view>\r\n      </div>\r\n    </div>\r\n\r\n    <!--applycancel buttons-->\r\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\r\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\r\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\r\n    </div>\r\n\r\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"showTodayBtn || showClearBtn\">\r\n      <div class=\"btn-today-wrapper\"\r\n           [class.today-left]=\"todayPos === 'left'\"\r\n           [class.today-right]=\"todayPos === 'right'\"\r\n           [class.today-center]=\"todayPos === 'center'\"\r\n           *ngIf=\"showTodayBtn\">\r\n        <button class=\"btn btn-success\" (click)=\"setToday()\">{{todayBtnLbl}}</button>\r\n      </div>\r\n\r\n        <div class=\"btn-clear-wrapper\"\r\n        [class.clear-left]=\"clearPos === 'left'\"\r\n        [class.clear-right]=\"clearPos === 'right'\"\r\n        [class.clear-center]=\"clearPos === 'center'\"\r\n        *ngIf=\"showClearBtn\">\r\n          <button class=\"btn btn-success\" (click)=\"clearDate()\">{{clearBtnLbl}}</button>\r\n        </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <!--custom dates or date ranges picker-->\r\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges && customRanges.length > 0\">\r\n    <bs-custom-date-view\r\n      [selectedRange]=\"chosenRange\"\r\n      [ranges]=\"customRanges\"\r\n      [customRangeLabel]=\"customRangeBtnLbl\"\r\n      (onSelect)=\"setRangeOnCalendar($event)\">\r\n    </bs-custom-date-view>\r\n  </div>\r\n</div>\r\n", dependencies: [{ kind: "directive", type: i6.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i6.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i6.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i6.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i6.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i7.TimepickerComponent, selector: "timepicker", inputs: ["hourStep", "minuteStep", "secondsStep", "readonlyInput", "disabled", "mousewheel", "arrowkeys", "showSpinners", "showMeridian", "showMinutes", "showSeconds", "meridians", "min", "max", "hoursPlaceholder", "minutesPlaceholder", "secondsPlaceholder"], outputs: ["isValid", "meridianChange"] }, { kind: "component", type: i8.BsCustomDatesViewComponent, selector: "bs-custom-date-view", inputs: ["ranges", "selectedRange", "customRangeLabel"], outputs: ["onSelect"] }, { kind: "component", type: i9.BsDaysCalendarViewComponent, selector: "bs-days-calendar-view", inputs: ["calendar", "options", "isDisabled"], outputs: ["onNavigate", "onViewMode", "onSelect", "onHover", "onHoverWeek"] }, { kind: "component", type: i10.BsMonthCalendarViewComponent, selector: "bs-month-calendar-view", inputs: ["calendar"], outputs: ["onNavigate", "onViewMode", "onSelect", "onHover"] }, { kind: "component", type: i11.BsYearsCalendarViewComponent, selector: "bs-years-calendar-view", inputs: ["calendar"], outputs: ["onNavigate", "onViewMode", "onSelect", "onHover"] }, { kind: "pipe", type: i6.AsyncPipe, name: "async" }], animations: [datepickerAnimation] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDaterangepickerContainerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'bs-daterangepicker-container', providers: [BsDatepickerStore, BsDatepickerEffects], host: {
                        class: 'bottom',
                        '(click)': '_stopPropagation($event)',
                        role: 'dialog',
                        'aria-label': 'calendar'
                    }, animations: [datepickerAnimation], template: "<!-- days calendar view mode -->\r\n<div class=\"bs-datepicker\" [ngClass]=\"containerClass\" *ngIf=\"viewMode | async\">\r\n  <div class=\"bs-datepicker-container\"\r\n    [@datepickerAnimation]=\"animationState\"\r\n    (@datepickerAnimation.done)=\"positionServiceEnable()\">\r\n    <!--calendars-->\r\n    <div class=\"bs-calendar-container\" [ngSwitch]=\"viewMode | async\" role=\"application\">\r\n      <!--days calendar-->\r\n      <ng-container *ngSwitchCase=\"'day'\">\r\n        <div class=\"bs-media-container\">\r\n          <bs-days-calendar-view\r\n            *ngFor=\"let calendar of daysCalendar$ | async\"\r\n            [class.bs-datepicker-multiple]=\"multipleCalendars\"\r\n            [calendar]=\"calendar\"\r\n            [isDisabled]=\"isDatePickerDisabled\"\r\n            [options]=\"options$ | async\"\r\n            (onNavigate)=\"navigateTo($event)\"\r\n            (onViewMode)=\"setViewMode($event)\"\r\n            (onHover)=\"dayHoverHandler($event)\"\r\n            (onHoverWeek)=\"weekHoverHandler($event)\"\r\n            (onSelect)=\"daySelectHandler($event)\">\r\n          </bs-days-calendar-view>\r\n        </div>\r\n        <div *ngIf=\"withTimepicker\" class=\"bs-timepicker-in-datepicker-container\">\r\n          <timepicker #startTP [disabled]=\"isDatePickerDisabled\"></timepicker>\r\n          <timepicker #endTP *ngIf=\"isRangePicker\" [disabled]=\"isDatePickerDisabled\"></timepicker>\r\n        </div>\r\n      </ng-container>\r\n\r\n      <!--months calendar-->\r\n      <div *ngSwitchCase=\"'month'\" class=\"bs-media-container\">\r\n        <bs-month-calendar-view\r\n          *ngFor=\"let calendar of monthsCalendar | async\"\r\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\r\n          [calendar]=\"calendar\"\r\n          (onNavigate)=\"navigateTo($event)\"\r\n          (onViewMode)=\"setViewMode($event)\"\r\n          (onHover)=\"monthHoverHandler($event)\"\r\n          (onSelect)=\"monthSelectHandler($event)\">\r\n        </bs-month-calendar-view>\r\n      </div>\r\n\r\n      <!--years calendar-->\r\n      <div *ngSwitchCase=\"'year'\" class=\"bs-media-container\">\r\n        <bs-years-calendar-view\r\n          *ngFor=\"let calendar of yearsCalendar | async\"\r\n          [class.bs-datepicker-multiple]=\"multipleCalendars\"\r\n          [calendar]=\"calendar\"\r\n          (onNavigate)=\"navigateTo($event)\"\r\n          (onViewMode)=\"setViewMode($event)\"\r\n          (onHover)=\"yearHoverHandler($event)\"\r\n          (onSelect)=\"yearSelectHandler($event)\">\r\n        </bs-years-calendar-view>\r\n      </div>\r\n    </div>\r\n\r\n    <!--applycancel buttons-->\r\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"false\">\r\n      <button class=\"btn btn-success\" type=\"button\">Apply</button>\r\n      <button class=\"btn btn-default\" type=\"button\">Cancel</button>\r\n    </div>\r\n\r\n    <div class=\"bs-datepicker-buttons\" *ngIf=\"showTodayBtn || showClearBtn\">\r\n      <div class=\"btn-today-wrapper\"\r\n           [class.today-left]=\"todayPos === 'left'\"\r\n           [class.today-right]=\"todayPos === 'right'\"\r\n           [class.today-center]=\"todayPos === 'center'\"\r\n           *ngIf=\"showTodayBtn\">\r\n        <button class=\"btn btn-success\" (click)=\"setToday()\">{{todayBtnLbl}}</button>\r\n      </div>\r\n\r\n        <div class=\"btn-clear-wrapper\"\r\n        [class.clear-left]=\"clearPos === 'left'\"\r\n        [class.clear-right]=\"clearPos === 'right'\"\r\n        [class.clear-center]=\"clearPos === 'center'\"\r\n        *ngIf=\"showClearBtn\">\r\n          <button class=\"btn btn-success\" (click)=\"clearDate()\">{{clearBtnLbl}}</button>\r\n        </div>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <!--custom dates or date ranges picker-->\r\n  <div class=\"bs-datepicker-custom-range\" *ngIf=\"customRanges && customRanges.length > 0\">\r\n    <bs-custom-date-view\r\n      [selectedRange]=\"chosenRange\"\r\n      [ranges]=\"customRanges\"\r\n      [customRangeLabel]=\"customRangeBtnLbl\"\r\n      (onSelect)=\"setRangeOnCalendar($event)\">\r\n    </bs-custom-date-view>\r\n  </div>\r\n</div>\r\n" }]
        }], ctorParameters: () => [{ type: i0.Renderer2 }, { type: i1.BsDatepickerConfig }, { type: i2.BsDatepickerStore }, { type: i0.ElementRef }, { type: i3.BsDatepickerActions }, { type: i4.BsDatepickerEffects }, { type: i5.PositioningService }], propDecorators: { startTimepicker: [{
                type: ViewChild,
                args: ['startTP']
            }], endTimepicker: [{
                type: ViewChild,
                args: ['endTP']
            }], isDatepickerDisabled: [{
                type: HostBinding,
                args: ['attr.disabled']
            }], isDatepickerReadonly: [{
                type: HostBinding,
                args: ['attr.readonly']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXJhbmdlcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci90aGVtZXMvYnMvYnMtZGF0ZXJhbmdlcGlja2VyLWNvbnRhaW5lci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci90aGVtZXMvYnMvYnMtZGF0ZXBpY2tlci12aWV3Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFdBQVcsRUFHWCxTQUFTLEVBQ1QsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd0QyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBQzlELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQy9ELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRS9ELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRWhFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBRWxFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7Ozs7Ozs7Ozs7O0FBYzVELE1BQU0sT0FBTyxtQ0FDWCxTQUFR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WUFDTixZQUFZLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0RixDQUFDO1FBRUQsSUFBSSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDMUMsQ0FBQzs4R0FsUlUsbUNBQW1DO2tHQUFuQyxtQ0FBbUMsdVRBVm5DLENBQUMsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsc1BDL0JyRCxvaklBNEZBLDhyRERyRGMsQ0FBQyxtQkFBbUIsQ0FBQzs7MkZBRXRCLG1DQUFtQztrQkFaL0MsU0FBUzsrQkFDRSw4QkFBOEIsYUFDN0IsQ0FBQyxpQkFBaUIsRUFBRSxtQkFBbUIsQ0FBQyxRQUU3Qzt3QkFDSixLQUFLLEVBQUUsUUFBUTt3QkFDZixTQUFTLEVBQUUsMEJBQTBCO3dCQUNyQyxJQUFJLEVBQUUsUUFBUTt3QkFDZCxZQUFZLEVBQUUsVUFBVTtxQkFDekIsY0FDVyxDQUFDLG1CQUFtQixDQUFDOzZRQWtCWCxlQUFlO3NCQUFwQyxTQUFTO3VCQUFDLFNBQVM7Z0JBQ0EsYUFBYTtzQkFBaEMsU0FBUzt1QkFBQyxPQUFPO2dCQU1nQixvQkFBb0I7c0JBQXJELFdBQVc7dUJBQUMsZUFBZTtnQkFJTSxvQkFBb0I7c0JBQXJELFdBQVc7dUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdEJpbmRpbmcsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBSZW5kZXJlcjIsXHJcbiAgVmlld0NoaWxkXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyB0YWtlIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IGdldEZ1bGxZZWFyLCBnZXRNb250aCB9IGZyb20gJ25neC1ib290c3RyYXAvY2hyb25vcyc7XHJcbmltcG9ydCB7IFBvc2l0aW9uaW5nU2VydmljZSB9IGZyb20gJ25neC1ib290c3RyYXAvcG9zaXRpb25pbmcnO1xyXG5pbXBvcnQgeyBUaW1lcGlja2VyQ29tcG9uZW50IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC90aW1lcGlja2VyJztcclxuXHJcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckFic3RyYWN0Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vYmFzZS9icy1kYXRlcGlja2VyLWNvbnRhaW5lcic7XHJcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckNvbmZpZyB9IGZyb20gJy4uLy4uL2JzLWRhdGVwaWNrZXIuY29uZmlnJztcclxuaW1wb3J0IHsgQ2FsZW5kYXJDZWxsVmlld01vZGVsLCBEYXlWaWV3TW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMnO1xyXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJBY3Rpb25zIH0gZnJvbSAnLi4vLi4vcmVkdWNlci9icy1kYXRlcGlja2VyLmFjdGlvbnMnO1xyXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJFZmZlY3RzIH0gZnJvbSAnLi4vLi4vcmVkdWNlci9icy1kYXRlcGlja2VyLmVmZmVjdHMnO1xyXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJTdG9yZSB9IGZyb20gJy4uLy4uL3JlZHVjZXIvYnMtZGF0ZXBpY2tlci5zdG9yZSc7XHJcbmltcG9ydCB7IGRhdGVwaWNrZXJBbmltYXRpb24gfSBmcm9tICcuLi8uLi9kYXRlcGlja2VyLWFuaW1hdGlvbnMnO1xyXG5pbXBvcnQgeyBCc0N1c3RvbURhdGVzIH0gZnJvbSAnLi9icy1jdXN0b20tZGF0ZXMtdmlldy5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBkYXlJbk1pbGxpc2Vjb25kcyB9IGZyb20gJy4uLy4uL3JlZHVjZXIvX2RlZmF1bHRzJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnYnMtZGF0ZXJhbmdlcGlja2VyLWNvbnRhaW5lcicsXHJcbiAgcHJvdmlkZXJzOiBbQnNEYXRlcGlja2VyU3RvcmUsIEJzRGF0ZXBpY2tlckVmZmVjdHNdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi9icy1kYXRlcGlja2VyLXZpZXcuaHRtbCcsXHJcbiAgaG9zdDoge1xyXG4gICAgY2xhc3M6ICdib3R0b20nLFxyXG4gICAgJyhjbGljayknOiAnX3N0b3BQcm9wYWdhdGlvbigkZXZlbnQpJyxcclxuICAgIHJvbGU6ICdkaWFsb2cnLFxyXG4gICAgJ2FyaWEtbGFiZWwnOiAnY2FsZW5kYXInXHJcbiAgfSxcclxuICBhbmltYXRpb25zOiBbZGF0ZXBpY2tlckFuaW1hdGlvbl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJzRGF0ZXJhbmdlcGlja2VyQ29udGFpbmVyQ29tcG9uZW50XHJcbiAgZXh0ZW5kcyBCc0RhdGVwaWNrZXJBYnN0cmFjdENvbXBvbmVudFxyXG4gIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIEFmdGVyVmlld0luaXRcclxue1xyXG4gIHNldCB2YWx1ZSh2YWx1ZTogKERhdGUgfCB1bmRlZmluZWQpW10gfCB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMuX2VmZmVjdHM/LnNldFJhbmdlVmFsdWUodmFsdWUpO1xyXG4gIH1cclxuXHJcbiAgdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPERhdGVbXT4oKTtcclxuICBhbmltYXRpb25TdGF0ZSA9ICd2b2lkJztcclxuXHJcbiAgX3JhbmdlU3RhY2s6IERhdGVbXSA9IFtdO1xyXG4gIG92ZXJyaWRlIGNob3NlblJhbmdlOiBEYXRlW10gPSBbXTtcclxuICBfc3ViczogU3Vic2NyaXB0aW9uW10gPSBbXTtcclxuICBvdmVycmlkZSBpc1JhbmdlUGlja2VyID0gdHJ1ZTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnc3RhcnRUUCcpIHN0YXJ0VGltZXBpY2tlcj86IFRpbWVwaWNrZXJDb21wb25lbnQ7XHJcbiAgQFZpZXdDaGlsZCgnZW5kVFAnKSBlbmRUaW1lcGlja2VyPzogVGltZXBpY2tlckNvbXBvbmVudDtcclxuXHJcbiAgZ2V0IGlzRGF0ZVBpY2tlckRpc2FibGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuICEhdGhpcy5fY29uZmlnLmlzRGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ2F0dHIuZGlzYWJsZWQnKSBnZXQgaXNEYXRlcGlja2VyRGlzYWJsZWQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5pc0RhdGVQaWNrZXJEaXNhYmxlZCA/ICcnIDogbnVsbDtcclxuICB9XHJcblxyXG4gIEBIb3N0QmluZGluZygnYXR0ci5yZWFkb25seScpIGdldCBpc0RhdGVwaWNrZXJSZWFkb25seSgpIHtcclxuICAgIHJldHVybiB0aGlzLmlzRGF0ZVBpY2tlckRpc2FibGVkID8gJycgOiBudWxsO1xyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBfcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgX2NvbmZpZzogQnNEYXRlcGlja2VyQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBfc3RvcmU6IEJzRGF0ZXBpY2tlclN0b3JlLFxyXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgX2FjdGlvbnM6IEJzRGF0ZXBpY2tlckFjdGlvbnMsXHJcbiAgICBfZWZmZWN0czogQnNEYXRlcGlja2VyRWZmZWN0cyxcclxuICAgIHByaXZhdGUgX3Bvc2l0aW9uU2VydmljZTogUG9zaXRpb25pbmdTZXJ2aWNlXHJcbiAgKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gICAgdGhpcy5fZWZmZWN0cyA9IF9lZmZlY3RzO1xyXG5cclxuICAgIHRoaXMuY3VzdG9tUmFuZ2VzID0gdGhpcy5fY29uZmlnLnJhbmdlcyB8fCBbXTtcclxuICAgIHRoaXMuY3VzdG9tUmFuZ2VCdG5MYmwgPSB0aGlzLl9jb25maWcuY3VzdG9tUmFuZ2VCdXR0b25MYWJlbDtcclxuXHJcbiAgICBfcmVuZGVyZXIuc2V0U3R5bGUoX2VsZW1lbnQubmF0aXZlRWxlbWVudCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcclxuICAgIF9yZW5kZXJlci5zZXRTdHlsZShfZWxlbWVudC5uYXRpdmVFbGVtZW50LCAncG9zaXRpb24nLCAnYWJzb2x1dGUnKTtcclxuICB9XHJcblxyXG4gIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fcG9zaXRpb25TZXJ2aWNlLnNldE9wdGlvbnMoe1xyXG4gICAgICBtb2RpZmllcnM6IHtcclxuICAgICAgICBmbGlwOiB7XHJcbiAgICAgICAgICBlbmFibGVkOiB0aGlzLl9jb25maWcuYWRhcHRpdmVQb3NpdGlvblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XHJcbiAgICAgICAgICBlbmFibGVkOiB0aGlzLl9jb25maWcuYWRhcHRpdmVQb3NpdGlvblxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgYWxsb3dlZFBvc2l0aW9uczogdGhpcy5fY29uZmlnLmFsbG93ZWRQb3NpdGlvbnNcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuX3Bvc2l0aW9uU2VydmljZS5ldmVudCQ/LnBpcGUodGFrZSgxKSkuc3Vic2NyaWJlKCgpID0+IHtcclxuICAgICAgdGhpcy5fcG9zaXRpb25TZXJ2aWNlLmRpc2FibGUoKTtcclxuXHJcbiAgICAgIGlmICh0aGlzLl9jb25maWcuaXNBbmltYXRlZCkge1xyXG4gICAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSB0aGlzLmlzVG9wUG9zaXRpb24gPyAnYW5pbWF0ZWQtdXAnIDogJ2FuaW1hdGVkLWRvd24nO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuYW5pbWF0aW9uU3RhdGUgPSAndW5hbmltYXRlZCc7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY29udGFpbmVyQ2xhc3MgPSB0aGlzLl9jb25maWcuY29udGFpbmVyQ2xhc3M7XHJcbiAgICB0aGlzLmlzT3RoZXJNb250aHNBY3RpdmUgPSB0aGlzLl9jb25maWcuc2VsZWN0RnJvbU90aGVyTW9udGg7XHJcbiAgICB0aGlzLndpdGhUaW1lcGlja2VyID0gdGhpcy5fY29uZmlnLndpdGhUaW1lcGlja2VyO1xyXG4gICAgdGhpcy5fZWZmZWN0c1xyXG4gICAgICA/LmluaXQodGhpcy5fc3RvcmUpXHJcbiAgICAgIC8vIGludGlhbCBzdGF0ZSBvcHRpb25zXHJcbiAgICAgIC8vIHRvZG86IGZpeCB0aGlzLCBzcGxpdCBjb25maWdzXHJcbiAgICAgIC5zZXRPcHRpb25zKHRoaXMuX2NvbmZpZylcclxuICAgICAgLy8gZGF0YSBiaW5kaW5nIHZpZXcgLS0+IG1vZGVsXHJcbiAgICAgIC5zZXRCaW5kaW5ncyh0aGlzKVxyXG4gICAgICAvLyBzZXQgZXZlbnQgaGFuZGxlcnNcclxuICAgICAgLnNldEV2ZW50SGFuZGxlcnModGhpcylcclxuICAgICAgLnJlZ2lzdGVyRGF0ZXBpY2tlclNpZGVFZmZlY3RzKCk7XHJcbiAgICBsZXQgY3VycmVudERhdGU6IERhdGVbXSB8IHVuZGVmaW5lZDtcclxuICAgIC8vIHRvZG86IG1vdmUgaXQgc29tZXdoZXJlIGVsc2VcclxuICAgIC8vIG9uIHNlbGVjdGVkIGRhdGUgY2hhbmdlXHJcbiAgICB0aGlzLl9zdWJzLnB1c2goXHJcbiAgICAgIHRoaXMuX3N0b3JlXHJcbiAgICAgICAgLnNlbGVjdCgoc3RhdGUpID0+IHN0YXRlLnNlbGVjdGVkUmFuZ2UpXHJcbiAgICAgICAgLnN1YnNjcmliZSgoZGF0ZVJhbmdlKSA9PiB7XHJcbiAgICAgICAgICBjdXJyZW50RGF0ZSA9IGRhdGVSYW5nZTtcclxuICAgICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdChkYXRlUmFuZ2UpO1xyXG4gICAgICAgICAgdGhpcy5jaG9zZW5SYW5nZSA9IGRhdGVSYW5nZSB8fCBbXTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuXHJcbiAgICB0aGlzLl9zdWJzLnB1c2goXHJcbiAgICAgIHRoaXMuX3N0b3JlXHJcbiAgICAgICAgLnNlbGVjdCgoc3RhdGUpID0+IHN0YXRlLnNlbGVjdGVkVGltZSlcclxuICAgICAgICAuc3Vic2NyaWJlKCh0aW1lKSA9PiB7XHJcbiAgICAgICAgICBpZiAoXHJcbiAgICAgICAgICAgICF0aW1lIHx8XHJcbiAgICAgICAgICAgICF0aW1lWzBdIHx8XHJcbiAgICAgICAgICAgICF0aW1lWzFdIHx8XHJcbiAgICAgICAgICAgICEodGltZVswXSBpbnN0YW5jZW9mIERhdGUpIHx8XHJcbiAgICAgICAgICAgICEodGltZVsxXSBpbnN0YW5jZW9mIERhdGUpIHx8XHJcbiAgICAgICAgICAgIChjdXJyZW50RGF0ZSAmJiB0aW1lWzBdID09PSBjdXJyZW50RGF0ZVswXSAmJiB0aW1lWzFdID09PSBjdXJyZW50RGF0ZVsxXSlcclxuICAgICAgICAgICkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRpbWUpO1xyXG4gICAgICAgICAgdGhpcy5jaG9zZW5SYW5nZSA9IHRpbWUgfHwgW107XHJcbiAgICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNlbGVjdGVkVGltZVN1Yi5hZGQoXHJcbiAgICAgIHRoaXMuc2VsZWN0ZWRUaW1lPy5zdWJzY3JpYmUoKHZhbCkgPT4ge1xyXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbCkgJiYgdmFsLmxlbmd0aCA+PSAyKSB7XHJcbiAgICAgICAgICB0aGlzLnN0YXJ0VGltZXBpY2tlcj8ud3JpdGVWYWx1ZSh2YWxbMF0pO1xyXG4gICAgICAgICAgdGhpcy5lbmRUaW1lcGlja2VyPy53cml0ZVZhbHVlKHZhbFsxXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG4gICAgKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lcGlja2VyPy5yZWdpc3Rlck9uQ2hhbmdlKCh2YWwpID0+IHtcclxuICAgICAgdGhpcy50aW1lU2VsZWN0SGFuZGxlcih2YWwsIDApO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmVuZFRpbWVwaWNrZXI/LnJlZ2lzdGVyT25DaGFuZ2UoKHZhbCkgPT4ge1xyXG4gICAgICB0aGlzLnRpbWVTZWxlY3RIYW5kbGVyKHZhbCwgMSk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldCBpc1RvcFBvc2l0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ3RvcCcpO1xyXG4gIH1cclxuXHJcbiAgcG9zaXRpb25TZXJ2aWNlRW5hYmxlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fcG9zaXRpb25TZXJ2aWNlLmVuYWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgb3ZlcnJpZGUgdGltZVNlbGVjdEhhbmRsZXIoZGF0ZTogRGF0ZSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2godGhpcy5fYWN0aW9ucy5zZWxlY3RUaW1lKGRhdGUsIGluZGV4KSk7XHJcbiAgfVxyXG5cclxuICBvdmVycmlkZSBkYXlTZWxlY3RIYW5kbGVyKGRheTogRGF5Vmlld01vZGVsKTogdm9pZCB7XHJcbiAgICBpZiAoIWRheSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBpc0Rpc2FibGVkID0gdGhpcy5pc090aGVyTW9udGhzQWN0aXZlID8gZGF5LmlzRGlzYWJsZWQgOiBkYXkuaXNPdGhlck1vbnRoIHx8IGRheS5pc0Rpc2FibGVkO1xyXG5cclxuICAgIGlmIChpc0Rpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMucmFuZ2VzUHJvY2Vzc2luZyhkYXkpO1xyXG4gIH1cclxuXHJcbiAgb3ZlcnJpZGUgbW9udGhTZWxlY3RIYW5kbGVyKGRheTogQ2FsZW5kYXJDZWxsVmlld01vZGVsKTogdm9pZCB7XHJcbiAgICBpZiAoIWRheSB8fCBkYXkuaXNEaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZGF5LmlzU2VsZWN0ZWQgPSB0cnVlO1xyXG5cclxuICAgIGlmICh0aGlzLl9jb25maWcubWluTW9kZSAhPT0gJ21vbnRoJykge1xyXG4gICAgICBpZiAoZGF5LmlzRGlzYWJsZWQpIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goXHJcbiAgICAgICAgdGhpcy5fYWN0aW9ucy5uYXZpZ2F0ZVRvKHtcclxuICAgICAgICAgIHVuaXQ6IHtcclxuICAgICAgICAgICAgbW9udGg6IGdldE1vbnRoKGRheS5kYXRlKSxcclxuICAgICAgICAgICAgeWVhcjogZ2V0RnVsbFllYXIoZGF5LmRhdGUpXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdmlld01vZGU6ICdkYXknXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMucmFuZ2VzUHJvY2Vzc2luZyhkYXkpO1xyXG4gIH1cclxuXHJcbiAgb3ZlcnJpZGUgeWVhclNlbGVjdEhhbmRsZXIoZGF5OiBDYWxlbmRhckNlbGxWaWV3TW9kZWwpOiB2b2lkIHtcclxuICAgIGlmICghZGF5IHx8IGRheS5pc0Rpc2FibGVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBkYXkuaXNTZWxlY3RlZCA9IHRydWU7XHJcblxyXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5taW5Nb2RlICE9PSAneWVhcicpIHtcclxuICAgICAgaWYgKGRheS5pc0Rpc2FibGVkKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKFxyXG4gICAgICAgIHRoaXMuX2FjdGlvbnMubmF2aWdhdGVUbyh7XHJcbiAgICAgICAgICB1bml0OiB7XHJcbiAgICAgICAgICAgIHllYXI6IGdldEZ1bGxZZWFyKGRheS5kYXRlKVxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXdNb2RlOiAnbW9udGgnXHJcbiAgICAgICAgfSlcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMucmFuZ2VzUHJvY2Vzc2luZyhkYXkpO1xyXG4gIH1cclxuXHJcbiAgcmFuZ2VzUHJvY2Vzc2luZyhkYXk6IENhbGVuZGFyQ2VsbFZpZXdNb2RlbCk6IHZvaWQge1xyXG4gICAgLy8gaWYgb25seSBvbmUgZGF0ZSBpcyBhbHJlYWR5IHNlbGVjdGVkXHJcbiAgICAvLyBhbmQgdXNlciBjbGlja3Mgb24gcHJldmlvdXMgZGF0ZVxyXG4gICAgLy8gc3RhcnQgc2VsZWN0aW9uIGZyb20gbmV3IGRhdGVcclxuICAgIC8vIGJ1dCBpZiBuZXcgZGF0ZSBpcyBhZnRlciBpbml0aWFsIG9uZVxyXG4gICAgLy8gdGhhbiBmaW5pc2ggc2VsZWN0aW9uXHJcblxyXG4gICAgaWYgKHRoaXMuX3JhbmdlU3RhY2subGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHRoaXMuX3JhbmdlU3RhY2sgPSBkYXkuZGF0ZSA+PSB0aGlzLl9yYW5nZVN0YWNrWzBdID8gW3RoaXMuX3JhbmdlU3RhY2tbMF0sIGRheS5kYXRlXSA6IFtkYXkuZGF0ZV07XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5tYXhEYXRlUmFuZ2UpIHtcclxuICAgICAgdGhpcy5zZXRNYXhEYXRlUmFuZ2VPbkNhbGVuZGFyKGRheS5kYXRlKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fcmFuZ2VTdGFjay5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5fcmFuZ2VTdGFjayA9IFtkYXkuZGF0ZV07XHJcblxyXG4gICAgICBpZiAodGhpcy5fY29uZmlnLm1heERhdGVSYW5nZSkge1xyXG4gICAgICAgIHRoaXMuc2V0TWF4RGF0ZVJhbmdlT25DYWxlbmRhcihkYXkuZGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLnNlbGVjdFJhbmdlKHRoaXMuX3JhbmdlU3RhY2spKTtcclxuXHJcbiAgICBpZiAodGhpcy5fcmFuZ2VTdGFjay5sZW5ndGggPT09IDIpIHtcclxuICAgICAgdGhpcy5fcmFuZ2VTdGFjayA9IFtdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICBmb3IgKGNvbnN0IHN1YiBvZiB0aGlzLl9zdWJzKSB7XHJcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZWxlY3RlZFRpbWVTdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIHRoaXMuX2VmZmVjdHM/LmRlc3Ryb3koKTtcclxuICB9XHJcblxyXG4gIG92ZXJyaWRlIHNldFJhbmdlT25DYWxlbmRhcihkYXRlczogQnNDdXN0b21EYXRlcyk6IHZvaWQge1xyXG4gICAgaWYgKGRhdGVzKSB7XHJcbiAgICAgIHRoaXMuX3JhbmdlU3RhY2sgPSBkYXRlcy52YWx1ZSBpbnN0YW5jZW9mIERhdGUgPyBbZGF0ZXMudmFsdWVdIDogZGF0ZXMudmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLnNlbGVjdFJhbmdlKHRoaXMuX3JhbmdlU3RhY2spKTtcclxuICB9XHJcblxyXG4gIHNldE1heERhdGVSYW5nZU9uQ2FsZW5kYXIoY3VycmVudFNlbGVjdGlvbjogRGF0ZSk6IHZvaWQge1xyXG4gICAgbGV0IG1heERhdGVSYW5nZSA9IG5ldyBEYXRlKGN1cnJlbnRTZWxlY3Rpb24pO1xyXG5cclxuICAgIGlmICh0aGlzLl9jb25maWcubWF4RGF0ZSkge1xyXG4gICAgICBjb25zdCBtYXhEYXRlVmFsdWVJbk1pbGxpc2Vjb25kcyA9IHRoaXMuX2NvbmZpZy5tYXhEYXRlLmdldFRpbWUoKTtcclxuICAgICAgY29uc3QgbWF4RGF0ZVJhbmdlSW5NaWxsaXNlY29uZHMgPVxyXG4gICAgICAgIGN1cnJlbnRTZWxlY3Rpb24uZ2V0VGltZSgpICsgKHRoaXMuX2NvbmZpZy5tYXhEYXRlUmFuZ2UgfHwgMCkgKiBkYXlJbk1pbGxpc2Vjb25kcztcclxuICAgICAgbWF4RGF0ZVJhbmdlID1cclxuICAgICAgICBtYXhEYXRlUmFuZ2VJbk1pbGxpc2Vjb25kcyA+IG1heERhdGVWYWx1ZUluTWlsbGlzZWNvbmRzXHJcbiAgICAgICAgICA/IG5ldyBEYXRlKHRoaXMuX2NvbmZpZy5tYXhEYXRlKVxyXG4gICAgICAgICAgOiBuZXcgRGF0ZShtYXhEYXRlUmFuZ2VJbk1pbGxpc2Vjb25kcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBtYXhEYXRlUmFuZ2Uuc2V0RGF0ZShjdXJyZW50U2VsZWN0aW9uLmdldERhdGUoKSArICh0aGlzLl9jb25maWcubWF4RGF0ZVJhbmdlIHx8IDApKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9lZmZlY3RzPy5zZXRNYXhEYXRlKG1heERhdGVSYW5nZSk7XHJcbiAgfVxyXG59XHJcbiIsIjwhLS0gZGF5cyBjYWxlbmRhciB2aWV3IG1vZGUgLS0+XHJcbjxkaXYgY2xhc3M9XCJicy1kYXRlcGlja2VyXCIgW25nQ2xhc3NdPVwiY29udGFpbmVyQ2xhc3NcIiAqbmdJZj1cInZpZXdNb2RlIHwgYXN5bmNcIj5cclxuICA8ZGl2IGNsYXNzPVwiYnMtZGF0ZXBpY2tlci1jb250YWluZXJcIlxyXG4gICAgW0BkYXRlcGlja2VyQW5pbWF0aW9uXT1cImFuaW1hdGlvblN0YXRlXCJcclxuICAgIChAZGF0ZXBpY2tlckFuaW1hdGlvbi5kb25lKT1cInBvc2l0aW9uU2VydmljZUVuYWJsZSgpXCI+XHJcbiAgICA8IS0tY2FsZW5kYXJzLS0+XHJcbiAgICA8ZGl2IGNsYXNzPVwiYnMtY2FsZW5kYXItY29udGFpbmVyXCIgW25nU3dpdGNoXT1cInZpZXdNb2RlIHwgYXN5bmNcIiByb2xlPVwiYXBwbGljYXRpb25cIj5cclxuICAgICAgPCEtLWRheXMgY2FsZW5kYXItLT5cclxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdTd2l0Y2hDYXNlPVwiJ2RheSdcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnMtbWVkaWEtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICA8YnMtZGF5cy1jYWxlbmRhci12aWV3XHJcbiAgICAgICAgICAgICpuZ0Zvcj1cImxldCBjYWxlbmRhciBvZiBkYXlzQ2FsZW5kYXIkIHwgYXN5bmNcIlxyXG4gICAgICAgICAgICBbY2xhc3MuYnMtZGF0ZXBpY2tlci1tdWx0aXBsZV09XCJtdWx0aXBsZUNhbGVuZGFyc1wiXHJcbiAgICAgICAgICAgIFtjYWxlbmRhcl09XCJjYWxlbmRhclwiXHJcbiAgICAgICAgICAgIFtpc0Rpc2FibGVkXT1cImlzRGF0ZVBpY2tlckRpc2FibGVkXCJcclxuICAgICAgICAgICAgW29wdGlvbnNdPVwib3B0aW9ucyQgfCBhc3luY1wiXHJcbiAgICAgICAgICAgIChvbk5hdmlnYXRlKT1cIm5hdmlnYXRlVG8oJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChvblZpZXdNb2RlKT1cInNldFZpZXdNb2RlKCRldmVudClcIlxyXG4gICAgICAgICAgICAob25Ib3Zlcik9XCJkYXlIb3ZlckhhbmRsZXIoJGV2ZW50KVwiXHJcbiAgICAgICAgICAgIChvbkhvdmVyV2Vlayk9XCJ3ZWVrSG92ZXJIYW5kbGVyKCRldmVudClcIlxyXG4gICAgICAgICAgICAob25TZWxlY3QpPVwiZGF5U2VsZWN0SGFuZGxlcigkZXZlbnQpXCI+XHJcbiAgICAgICAgICA8L2JzLWRheXMtY2FsZW5kYXItdmlldz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2ICpuZ0lmPVwid2l0aFRpbWVwaWNrZXJcIiBjbGFzcz1cImJzLXRpbWVwaWNrZXItaW4tZGF0ZXBpY2tlci1jb250YWluZXJcIj5cclxuICAgICAgICAgIDx0aW1lcGlja2VyICNzdGFydFRQIFtkaXNhYmxlZF09XCJpc0RhdGVQaWNrZXJEaXNhYmxlZFwiPjwvdGltZXBpY2tlcj5cclxuICAgICAgICAgIDx0aW1lcGlja2VyICNlbmRUUCAqbmdJZj1cImlzUmFuZ2VQaWNrZXJcIiBbZGlzYWJsZWRdPVwiaXNEYXRlUGlja2VyRGlzYWJsZWRcIj48L3RpbWVwaWNrZXI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG5cclxuICAgICAgPCEtLW1vbnRocyBjYWxlbmRhci0tPlxyXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCInbW9udGgnXCIgY2xhc3M9XCJicy1tZWRpYS1jb250YWluZXJcIj5cclxuICAgICAgICA8YnMtbW9udGgtY2FsZW5kYXItdmlld1xyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IGNhbGVuZGFyIG9mIG1vbnRoc0NhbGVuZGFyIHwgYXN5bmNcIlxyXG4gICAgICAgICAgW2NsYXNzLmJzLWRhdGVwaWNrZXItbXVsdGlwbGVdPVwibXVsdGlwbGVDYWxlbmRhcnNcIlxyXG4gICAgICAgICAgW2NhbGVuZGFyXT1cImNhbGVuZGFyXCJcclxuICAgICAgICAgIChvbk5hdmlnYXRlKT1cIm5hdmlnYXRlVG8oJGV2ZW50KVwiXHJcbiAgICAgICAgICAob25WaWV3TW9kZSk9XCJzZXRWaWV3TW9kZSgkZXZlbnQpXCJcclxuICAgICAgICAgIChvbkhvdmVyKT1cIm1vbnRoSG92ZXJIYW5kbGVyKCRldmVudClcIlxyXG4gICAgICAgICAgKG9uU2VsZWN0KT1cIm1vbnRoU2VsZWN0SGFuZGxlcigkZXZlbnQpXCI+XHJcbiAgICAgICAgPC9icy1tb250aC1jYWxlbmRhci12aWV3PlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgIDwhLS15ZWFycyBjYWxlbmRhci0tPlxyXG4gICAgICA8ZGl2ICpuZ1N3aXRjaENhc2U9XCIneWVhcidcIiBjbGFzcz1cImJzLW1lZGlhLWNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxicy15ZWFycy1jYWxlbmRhci12aWV3XHJcbiAgICAgICAgICAqbmdGb3I9XCJsZXQgY2FsZW5kYXIgb2YgeWVhcnNDYWxlbmRhciB8IGFzeW5jXCJcclxuICAgICAgICAgIFtjbGFzcy5icy1kYXRlcGlja2VyLW11bHRpcGxlXT1cIm11bHRpcGxlQ2FsZW5kYXJzXCJcclxuICAgICAgICAgIFtjYWxlbmRhcl09XCJjYWxlbmRhclwiXHJcbiAgICAgICAgICAob25OYXZpZ2F0ZSk9XCJuYXZpZ2F0ZVRvKCRldmVudClcIlxyXG4gICAgICAgICAgKG9uVmlld01vZGUpPVwic2V0Vmlld01vZGUoJGV2ZW50KVwiXHJcbiAgICAgICAgICAob25Ib3Zlcik9XCJ5ZWFySG92ZXJIYW5kbGVyKCRldmVudClcIlxyXG4gICAgICAgICAgKG9uU2VsZWN0KT1cInllYXJTZWxlY3RIYW5kbGVyKCRldmVudClcIj5cclxuICAgICAgICA8L2JzLXllYXJzLWNhbGVuZGFyLXZpZXc+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPCEtLWFwcGx5Y2FuY2VsIGJ1dHRvbnMtLT5cclxuICAgIDxkaXYgY2xhc3M9XCJicy1kYXRlcGlja2VyLWJ1dHRvbnNcIiAqbmdJZj1cImZhbHNlXCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiB0eXBlPVwiYnV0dG9uXCI+QXBwbHk8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIj5DYW5jZWw8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG5cclxuICAgIDxkaXYgY2xhc3M9XCJicy1kYXRlcGlja2VyLWJ1dHRvbnNcIiAqbmdJZj1cInNob3dUb2RheUJ0biB8fCBzaG93Q2xlYXJCdG5cIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImJ0bi10b2RheS13cmFwcGVyXCJcclxuICAgICAgICAgICBbY2xhc3MudG9kYXktbGVmdF09XCJ0b2RheVBvcyA9PT0gJ2xlZnQnXCJcclxuICAgICAgICAgICBbY2xhc3MudG9kYXktcmlnaHRdPVwidG9kYXlQb3MgPT09ICdyaWdodCdcIlxyXG4gICAgICAgICAgIFtjbGFzcy50b2RheS1jZW50ZXJdPVwidG9kYXlQb3MgPT09ICdjZW50ZXInXCJcclxuICAgICAgICAgICAqbmdJZj1cInNob3dUb2RheUJ0blwiPlxyXG4gICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiAoY2xpY2spPVwic2V0VG9kYXkoKVwiPnt7dG9kYXlCdG5MYmx9fTwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1jbGVhci13cmFwcGVyXCJcclxuICAgICAgICBbY2xhc3MuY2xlYXItbGVmdF09XCJjbGVhclBvcyA9PT0gJ2xlZnQnXCJcclxuICAgICAgICBbY2xhc3MuY2xlYXItcmlnaHRdPVwiY2xlYXJQb3MgPT09ICdyaWdodCdcIlxyXG4gICAgICAgIFtjbGFzcy5jbGVhci1jZW50ZXJdPVwiY2xlYXJQb3MgPT09ICdjZW50ZXInXCJcclxuICAgICAgICAqbmdJZj1cInNob3dDbGVhckJ0blwiPlxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIChjbGljayk9XCJjbGVhckRhdGUoKVwiPnt7Y2xlYXJCdG5MYmx9fTwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gIDwvZGl2PlxyXG5cclxuICA8IS0tY3VzdG9tIGRhdGVzIG9yIGRhdGUgcmFuZ2VzIHBpY2tlci0tPlxyXG4gIDxkaXYgY2xhc3M9XCJicy1kYXRlcGlja2VyLWN1c3RvbS1yYW5nZVwiICpuZ0lmPVwiY3VzdG9tUmFuZ2VzICYmIGN1c3RvbVJhbmdlcy5sZW5ndGggPiAwXCI+XHJcbiAgICA8YnMtY3VzdG9tLWRhdGUtdmlld1xyXG4gICAgICBbc2VsZWN0ZWRSYW5nZV09XCJjaG9zZW5SYW5nZVwiXHJcbiAgICAgIFtyYW5nZXNdPVwiY3VzdG9tUmFuZ2VzXCJcclxuICAgICAgW2N1c3RvbVJhbmdlTGFiZWxdPVwiY3VzdG9tUmFuZ2VCdG5MYmxcIlxyXG4gICAgICAob25TZWxlY3QpPVwic2V0UmFuZ2VPbkNhbGVuZGFyKCRldmVudClcIj5cclxuICAgIDwvYnMtY3VzdG9tLWRhdGUtdmlldz5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==