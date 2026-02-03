import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TimepickerActions } from './reducer/timepicker.actions';
import { TimepickerStore } from './reducer/timepicker.store';
import { getControlsValue } from './timepicker-controls.util';
import { TimepickerConfig } from './timepicker.config';
import { isHourInputValid, isInputLimitValid, isInputValid, isMinuteInputValid, isOneOfDatesEmpty, isSecondInputValid, isValidDate, padNumber, parseTime } from './timepicker.utils';
import * as i0 from "@angular/core";
import * as i1 from "./timepicker.config";
import * as i2 from "./reducer/timepicker.store";
import * as i3 from "./reducer/timepicker.actions";
import * as i4 from "@angular/common";
export const TIMEPICKER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TimepickerComponent),
    multi: true
};
export class TimepickerComponent {
    constructor(_config, _cd, _store, _timepickerActions) {
        this._cd = _cd;
        this._store = _store;
        this._timepickerActions = _timepickerActions;
        /** hours change step */
        this.hourStep = 1;
        /** minutes change step */
        this.minuteStep = 5;
        /** seconds change step */
        this.secondsStep = 10;
        /** if true hours and minutes fields will be readonly */
        this.readonlyInput = false;
        /** if true hours and minutes fields will be disabled */
        this.disabled = false;
        /** if true scroll inside hours and minutes inputs will change time */
        this.mousewheel = true;
        /** if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard */
        this.arrowkeys = true;
        /** if true spinner arrows above and below the inputs will be shown */
        this.showSpinners = true;
        /** if true meridian button will be shown */
        this.showMeridian = true;
        /** show minutes in timepicker */
        this.showMinutes = true;
        /** show seconds in timepicker */
        this.showSeconds = false;
        /** meridian labels based on locale */
        this.meridians = ['AM', 'PM'];
        /** placeholder for hours field in timepicker */
        this.hoursPlaceholder = 'HH';
        /** placeholder for minutes field in timepicker */
        this.minutesPlaceholder = 'MM';
        /** placeholder for seconds field in timepicker */
        this.secondsPlaceholder = 'SS';
        /** emits true if value is a valid date */
        this.isValid = new EventEmitter();
        /** emits value of meridian*/
        this.meridianChange = new EventEmitter();
        // ui variables
        this.hours = '';
        this.minutes = '';
        this.seconds = '';
        this.meridian = '';
        // min\max validation for input fields
        this.invalidHours = false;
        this.invalidMinutes = false;
        this.invalidSeconds = false;
        // aria-label variables
        this.labelHours = 'hours';
        this.labelMinutes = 'minutes';
        this.labelSeconds = 'seconds';
        // time picker controls state
        this.canIncrementHours = true;
        this.canIncrementMinutes = true;
        this.canIncrementSeconds = true;
        this.canDecrementHours = true;
        this.canDecrementMinutes = true;
        this.canDecrementSeconds = true;
        this.canToggleMeridian = true;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onChange = Function.prototype;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.onTouched = Function.prototype;
        this.config = _config;
        Object.assign(this, this.config);
        this.timepickerSub = _store.select(state => state.value)
            .subscribe((value) => {
            // update UI values if date changed
            this._renderTime(value);
            this.onChange(value);
            this._store.dispatch(this._timepickerActions.updateControls(getControlsValue(this)));
        });
        _store.select(state => state.controls)
            .subscribe((controlsState) => {
            const isTimepickerInputValid = isInputValid(this.hours, this.minutes, this.seconds, this.isPM());
            const isValid = this.config.allowEmptyTime ?
                this.isOneOfDatesIsEmpty() || isTimepickerInputValid
                : isTimepickerInputValid;
            this.isValid.emit(isValid);
            Object.assign(this, controlsState);
            _cd.markForCheck();
        });
    }
    /** @deprecated - please use `isEditable` instead */
    get isSpinnersVisible() {
        return this.showSpinners && !this.readonlyInput;
    }
    get isEditable() {
        return !(this.readonlyInput || this.disabled);
    }
    resetValidation() {
        this.invalidHours = false;
        this.invalidMinutes = false;
        this.invalidSeconds = false;
    }
    isPM() {
        return this.showMeridian && this.meridian === this.meridians[1];
    }
    prevDef($event) {
        $event.preventDefault();
    }
    wheelSign($event) {
        return Math.sign($event.deltaY || 0) * -1;
    }
    ngOnChanges() {
        this._store.dispatch(this._timepickerActions.updateControls(getControlsValue(this)));
    }
    changeHours(step, source = '') {
        this.resetValidation();
        this._store.dispatch(this._timepickerActions.changeHours({ step, source }));
    }
    changeMinutes(step, source = '') {
        this.resetValidation();
        this._store.dispatch(this._timepickerActions.changeMinutes({ step, source }));
    }
    changeSeconds(step, source = '') {
        this.resetValidation();
        this._store.dispatch(this._timepickerActions.changeSeconds({ step, source }));
    }
    updateHours(target) {
        this.resetValidation();
        this.hours = target.value;
        const isTimepickerInputValid = isHourInputValid(this.hours, this.isPM()) && this.isValidLimit();
        const isValid = this.config.allowEmptyTime ?
            this.isOneOfDatesIsEmpty() || isTimepickerInputValid
            : isTimepickerInputValid;
        if (!isValid) {
            this.invalidHours = true;
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._updateTime();
    }
    updateMinutes(target) {
        this.resetValidation();
        this.minutes = target.value;
        const isTimepickerInputValid = isMinuteInputValid(this.minutes) && this.isValidLimit();
        const isValid = this.config.allowEmptyTime ?
            this.isOneOfDatesIsEmpty() || isTimepickerInputValid
            : isTimepickerInputValid;
        if (!isValid) {
            this.invalidMinutes = true;
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._updateTime();
    }
    updateSeconds(target) {
        this.resetValidation();
        this.seconds = target.value;
        const isTimepickerInputValid = isSecondInputValid(this.seconds) && this.isValidLimit();
        const isValid = this.config.allowEmptyTime ?
            this.isOneOfDatesIsEmpty() || isTimepickerInputValid
            : isTimepickerInputValid;
        if (!isValid) {
            this.invalidSeconds = true;
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._updateTime();
    }
    isValidLimit() {
        return isInputLimitValid({
            hour: this.hours,
            minute: this.minutes,
            seconds: this.seconds,
            isPM: this.isPM()
        }, this.max, this.min);
    }
    isOneOfDatesIsEmpty() {
        return isOneOfDatesEmpty(this.hours, this.minutes, this.seconds);
    }
    _updateTime() {
        const _seconds = this.showSeconds ? this.seconds : void 0;
        const _minutes = this.showMinutes ? this.minutes : void 0;
        const isTimepickerInputValid = isInputValid(this.hours, _minutes, _seconds, this.isPM());
        const isValid = this.config.allowEmptyTime ?
            this.isOneOfDatesIsEmpty() || isTimepickerInputValid
            : isTimepickerInputValid;
        if (!isValid) {
            this.isValid.emit(false);
            this.onChange(null);
            return;
        }
        this._store.dispatch(this._timepickerActions.setTime({
            hour: this.hours,
            minute: this.minutes,
            seconds: this.seconds,
            isPM: this.isPM()
        }));
    }
    toggleMeridian() {
        if (!this.showMeridian || !this.isEditable) {
            return;
        }
        const _hoursPerDayHalf = 12;
        this._store.dispatch(this._timepickerActions.changeHours({
            step: _hoursPerDayHalf,
            source: ''
        }));
    }
    /**
     * Write a new value to the element.
     */
    writeValue(obj) {
        if (isValidDate(obj)) {
            this.resetValidation();
            this._store.dispatch(this._timepickerActions.writeValue(parseTime(obj)));
        }
        else if (obj == null) {
            this._store.dispatch(this._timepickerActions.writeValue());
        }
    }
    /**
     * Set the function to be called when the control receives a change event.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * Set the function to be called when the control receives a touch event.
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * This function is called when the control status changes to or from "disabled".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param isDisabled
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
        this._cd.markForCheck();
    }
    ngOnDestroy() {
        this.timepickerSub?.unsubscribe();
    }
    _renderTime(value) {
        if (!value || !isValidDate(value)) {
            this.hours = '';
            this.minutes = '';
            this.seconds = '';
            this.meridian = this.meridians[0];
            this.meridianChange.emit(this.meridian);
            return;
        }
        const _value = parseTime(value);
        if (!_value) {
            return;
        }
        const _hoursPerDayHalf = 12;
        let _hours = _value.getHours();
        if (this.showMeridian) {
            this.meridian = this.meridians[_hours >= _hoursPerDayHalf ? 1 : 0];
            this.meridianChange.emit(this.meridian);
            _hours = _hours % _hoursPerDayHalf;
            // should be 12 PM, not 00 PM
            if (_hours === 0) {
                _hours = _hoursPerDayHalf;
            }
        }
        this.hours = padNumber(_hours);
        this.minutes = padNumber(_value.getMinutes());
        this.seconds = padNumber(_value.getUTCSeconds());
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TimepickerComponent, deps: [{ token: i1.TimepickerConfig }, { token: i0.ChangeDetectorRef }, { token: i2.TimepickerStore }, { token: i3.TimepickerActions }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: TimepickerComponent, selector: "timepicker", inputs: { hourStep: "hourStep", minuteStep: "minuteStep", secondsStep: "secondsStep", readonlyInput: "readonlyInput", disabled: "disabled", mousewheel: "mousewheel", arrowkeys: "arrowkeys", showSpinners: "showSpinners", showMeridian: "showMeridian", showMinutes: "showMinutes", showSeconds: "showSeconds", meridians: "meridians", min: "min", max: "max", hoursPlaceholder: "hoursPlaceholder", minutesPlaceholder: "minutesPlaceholder", secondsPlaceholder: "secondsPlaceholder" }, outputs: { isValid: "isValid", meridianChange: "meridianChange" }, providers: [TIMEPICKER_CONTROL_VALUE_ACCESSOR, TimepickerStore], usesOnChanges: true, ngImport: i0, template: "<table>\r\n  <tbody>\r\n  <tr class=\"text-center\" [hidden]=\"!showSpinners\">\r\n    <!-- increment hours button-->\r\n    <td>\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementHours || !isEditable\"\r\n         (click)=\"changeHours(hourStep)\"\r\n         href=\"javascript:void(0);\"\r\n      ><span class=\"bs-chevron bs-chevron-up\"></span></a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showMinutes\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- increment minutes button -->\r\n    <td *ngIf=\"showMinutes\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementMinutes || !isEditable\"\r\n         (click)=\"changeMinutes(minuteStep)\"\r\n         href=\"javascript:void(0);\"\r\n      ><span class=\"bs-chevron bs-chevron-up\"></span></a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showSeconds\">&nbsp;</td>\r\n    <!-- increment seconds button -->\r\n    <td *ngIf=\"showSeconds\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementSeconds || !isEditable\"\r\n         (click)=\"changeSeconds(secondsStep)\"\r\n         href=\"javascript:void(0);\"\r\n      >\r\n        <span class=\"bs-chevron bs-chevron-up\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- space between -->\r\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- meridian placeholder-->\r\n    <td *ngIf=\"showMeridian\"></td>\r\n  </tr>\r\n  <tr>\r\n    <!-- hours -->\r\n    <td class=\"form-group mb-3\" [class.has-error]=\"invalidHours\">\r\n      <input type=\"text\" [class.is-invalid]=\"invalidHours\"\r\n             class=\"form-control text-center bs-timepicker-field\"\r\n             [placeholder]=\"hoursPlaceholder\"\r\n             maxlength=\"2\"\r\n             [readonly]=\"readonlyInput\"\r\n             [disabled]=\"disabled\"\r\n             [value]=\"hours\"\r\n             (wheel)=\"prevDef($event);changeHours(hourStep * wheelSign($event), 'wheel')\"\r\n             (keydown.ArrowUp)=\"changeHours(hourStep, 'key')\"\r\n             (keydown.ArrowDown)=\"changeHours(-hourStep, 'key')\"\r\n             (change)=\"updateHours($event.target)\" [attr.aria-label]=\"labelHours\"></td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showMinutes\">&nbsp;:&nbsp;</td>\r\n    <!-- minutes -->\r\n    <td class=\"form-group mb-3\" *ngIf=\"showMinutes\" [class.has-error]=\"invalidMinutes\">\r\n      <input type=\"text\" [class.is-invalid]=\"invalidMinutes\"\r\n             class=\"form-control text-center bs-timepicker-field\"\r\n             [placeholder]=\"minutesPlaceholder\"\r\n             maxlength=\"2\"\r\n             [readonly]=\"readonlyInput\"\r\n             [disabled]=\"disabled\"\r\n             [value]=\"minutes\"\r\n             (wheel)=\"prevDef($event);changeMinutes(minuteStep * wheelSign($event), 'wheel')\"\r\n             (keydown.ArrowUp)=\"changeMinutes(minuteStep, 'key')\"\r\n             (keydown.ArrowDown)=\"changeMinutes(-minuteStep, 'key')\"\r\n             (change)=\"updateMinutes($event.target)\" [attr.aria-label]=\"labelMinutes\">\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showSeconds\">&nbsp;:&nbsp;</td>\r\n    <!-- seconds -->\r\n    <td class=\"form-group mb-3\" *ngIf=\"showSeconds\" [class.has-error]=\"invalidSeconds\">\r\n      <input type=\"text\" [class.is-invalid]=\"invalidSeconds\"\r\n             class=\"form-control text-center bs-timepicker-field\"\r\n             [placeholder]=\"secondsPlaceholder\"\r\n             maxlength=\"2\"\r\n             [readonly]=\"readonlyInput\"\r\n             [disabled]=\"disabled\"\r\n             [value]=\"seconds\"\r\n             (wheel)=\"prevDef($event);changeSeconds(secondsStep * wheelSign($event), 'wheel')\"\r\n             (keydown.ArrowUp)=\"changeSeconds(secondsStep, 'key')\"\r\n             (keydown.ArrowDown)=\"changeSeconds(-secondsStep, 'key')\"\r\n             (change)=\"updateSeconds($event.target)\" [attr.aria-label]=\"labelSeconds\">\r\n    </td>\r\n    <!-- space between -->\r\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- meridian -->\r\n    <td *ngIf=\"showMeridian\">\r\n      <button type=\"button\" class=\"btn btn-default text-center\"\r\n              [disabled]=\"!isEditable || !canToggleMeridian\"\r\n              [class.disabled]=\"!isEditable || !canToggleMeridian\"\r\n              (click)=\"toggleMeridian()\"\r\n      >{{ meridian }}\r\n      </button>\r\n    </td>\r\n  </tr>\r\n  <tr class=\"text-center\" [hidden]=\"!showSpinners\">\r\n    <!-- decrement hours button-->\r\n    <td>\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementHours || !isEditable\"\r\n         (click)=\"changeHours(-hourStep)\"\r\n         href=\"javascript:void(0);\"\r\n      >\r\n        <span class=\"bs-chevron bs-chevron-down\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showMinutes\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- decrement minutes button-->\r\n    <td *ngIf=\"showMinutes\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementMinutes || !isEditable\"\r\n         (click)=\"changeMinutes(-minuteStep)\"\r\n         href=\"javascript:void(0);\"\r\n      >\r\n        <span class=\"bs-chevron bs-chevron-down\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showSeconds\">&nbsp;</td>\r\n    <!-- decrement seconds button-->\r\n    <td *ngIf=\"showSeconds\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementSeconds || !isEditable\"\r\n         (click)=\"changeSeconds(-secondsStep)\"\r\n         href=\"javascript:void(0);\"\r\n      >\r\n        <span class=\"bs-chevron bs-chevron-down\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- space between -->\r\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- meridian placeholder-->\r\n    <td *ngIf=\"showMeridian\"></td>\r\n  </tr>\r\n  </tbody>\r\n</table>\r\n", styles: [".bs-chevron{border-style:solid;display:block;width:9px;height:9px;position:relative;border-width:3px 0px 0 3px}.bs-chevron-up{-webkit-transform:rotate(45deg);transform:rotate(45deg);top:2px}.bs-chevron-down{-webkit-transform:rotate(-135deg);transform:rotate(-135deg);top:-2px}.bs-timepicker-field{width:65px;padding:.375rem .55rem}\n"], dependencies: [{ kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TimepickerComponent, decorators: [{
            type: Component,
            args: [{ selector: 'timepicker', changeDetection: ChangeDetectionStrategy.OnPush, providers: [TIMEPICKER_CONTROL_VALUE_ACCESSOR, TimepickerStore], encapsulation: ViewEncapsulation.None, template: "<table>\r\n  <tbody>\r\n  <tr class=\"text-center\" [hidden]=\"!showSpinners\">\r\n    <!-- increment hours button-->\r\n    <td>\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementHours || !isEditable\"\r\n         (click)=\"changeHours(hourStep)\"\r\n         href=\"javascript:void(0);\"\r\n      ><span class=\"bs-chevron bs-chevron-up\"></span></a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showMinutes\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- increment minutes button -->\r\n    <td *ngIf=\"showMinutes\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementMinutes || !isEditable\"\r\n         (click)=\"changeMinutes(minuteStep)\"\r\n         href=\"javascript:void(0);\"\r\n      ><span class=\"bs-chevron bs-chevron-up\"></span></a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showSeconds\">&nbsp;</td>\r\n    <!-- increment seconds button -->\r\n    <td *ngIf=\"showSeconds\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canIncrementSeconds || !isEditable\"\r\n         (click)=\"changeSeconds(secondsStep)\"\r\n         href=\"javascript:void(0);\"\r\n      >\r\n        <span class=\"bs-chevron bs-chevron-up\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- space between -->\r\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- meridian placeholder-->\r\n    <td *ngIf=\"showMeridian\"></td>\r\n  </tr>\r\n  <tr>\r\n    <!-- hours -->\r\n    <td class=\"form-group mb-3\" [class.has-error]=\"invalidHours\">\r\n      <input type=\"text\" [class.is-invalid]=\"invalidHours\"\r\n             class=\"form-control text-center bs-timepicker-field\"\r\n             [placeholder]=\"hoursPlaceholder\"\r\n             maxlength=\"2\"\r\n             [readonly]=\"readonlyInput\"\r\n             [disabled]=\"disabled\"\r\n             [value]=\"hours\"\r\n             (wheel)=\"prevDef($event);changeHours(hourStep * wheelSign($event), 'wheel')\"\r\n             (keydown.ArrowUp)=\"changeHours(hourStep, 'key')\"\r\n             (keydown.ArrowDown)=\"changeHours(-hourStep, 'key')\"\r\n             (change)=\"updateHours($event.target)\" [attr.aria-label]=\"labelHours\"></td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showMinutes\">&nbsp;:&nbsp;</td>\r\n    <!-- minutes -->\r\n    <td class=\"form-group mb-3\" *ngIf=\"showMinutes\" [class.has-error]=\"invalidMinutes\">\r\n      <input type=\"text\" [class.is-invalid]=\"invalidMinutes\"\r\n             class=\"form-control text-center bs-timepicker-field\"\r\n             [placeholder]=\"minutesPlaceholder\"\r\n             maxlength=\"2\"\r\n             [readonly]=\"readonlyInput\"\r\n             [disabled]=\"disabled\"\r\n             [value]=\"minutes\"\r\n             (wheel)=\"prevDef($event);changeMinutes(minuteStep * wheelSign($event), 'wheel')\"\r\n             (keydown.ArrowUp)=\"changeMinutes(minuteStep, 'key')\"\r\n             (keydown.ArrowDown)=\"changeMinutes(-minuteStep, 'key')\"\r\n             (change)=\"updateMinutes($event.target)\" [attr.aria-label]=\"labelMinutes\">\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showSeconds\">&nbsp;:&nbsp;</td>\r\n    <!-- seconds -->\r\n    <td class=\"form-group mb-3\" *ngIf=\"showSeconds\" [class.has-error]=\"invalidSeconds\">\r\n      <input type=\"text\" [class.is-invalid]=\"invalidSeconds\"\r\n             class=\"form-control text-center bs-timepicker-field\"\r\n             [placeholder]=\"secondsPlaceholder\"\r\n             maxlength=\"2\"\r\n             [readonly]=\"readonlyInput\"\r\n             [disabled]=\"disabled\"\r\n             [value]=\"seconds\"\r\n             (wheel)=\"prevDef($event);changeSeconds(secondsStep * wheelSign($event), 'wheel')\"\r\n             (keydown.ArrowUp)=\"changeSeconds(secondsStep, 'key')\"\r\n             (keydown.ArrowDown)=\"changeSeconds(-secondsStep, 'key')\"\r\n             (change)=\"updateSeconds($event.target)\" [attr.aria-label]=\"labelSeconds\">\r\n    </td>\r\n    <!-- space between -->\r\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- meridian -->\r\n    <td *ngIf=\"showMeridian\">\r\n      <button type=\"button\" class=\"btn btn-default text-center\"\r\n              [disabled]=\"!isEditable || !canToggleMeridian\"\r\n              [class.disabled]=\"!isEditable || !canToggleMeridian\"\r\n              (click)=\"toggleMeridian()\"\r\n      >{{ meridian }}\r\n      </button>\r\n    </td>\r\n  </tr>\r\n  <tr class=\"text-center\" [hidden]=\"!showSpinners\">\r\n    <!-- decrement hours button-->\r\n    <td>\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementHours || !isEditable\"\r\n         (click)=\"changeHours(-hourStep)\"\r\n         href=\"javascript:void(0);\"\r\n      >\r\n        <span class=\"bs-chevron bs-chevron-down\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showMinutes\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- decrement minutes button-->\r\n    <td *ngIf=\"showMinutes\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementMinutes || !isEditable\"\r\n         (click)=\"changeMinutes(-minuteStep)\"\r\n         href=\"javascript:void(0);\"\r\n      >\r\n        <span class=\"bs-chevron bs-chevron-down\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- divider -->\r\n    <td *ngIf=\"showSeconds\">&nbsp;</td>\r\n    <!-- decrement seconds button-->\r\n    <td *ngIf=\"showSeconds\">\r\n      <a class=\"btn btn-link\" [class.disabled]=\"!canDecrementSeconds || !isEditable\"\r\n         (click)=\"changeSeconds(-secondsStep)\"\r\n         href=\"javascript:void(0);\"\r\n      >\r\n        <span class=\"bs-chevron bs-chevron-down\"></span>\r\n      </a>\r\n    </td>\r\n    <!-- space between -->\r\n    <td *ngIf=\"showMeridian\">&nbsp;&nbsp;&nbsp;</td>\r\n    <!-- meridian placeholder-->\r\n    <td *ngIf=\"showMeridian\"></td>\r\n  </tr>\r\n  </tbody>\r\n</table>\r\n", styles: [".bs-chevron{border-style:solid;display:block;width:9px;height:9px;position:relative;border-width:3px 0px 0 3px}.bs-chevron-up{-webkit-transform:rotate(45deg);transform:rotate(45deg);top:2px}.bs-chevron-down{-webkit-transform:rotate(-135deg);transform:rotate(-135deg);top:-2px}.bs-timepicker-field{width:65px;padding:.375rem .55rem}\n"] }]
        }], ctorParameters: () => [{ type: i1.TimepickerConfig }, { type: i0.ChangeDetectorRef }, { type: i2.TimepickerStore }, { type: i3.TimepickerActions }], propDecorators: { hourStep: [{
                type: Input
            }], minuteStep: [{
                type: Input
            }], secondsStep: [{
                type: Input
            }], readonlyInput: [{
                type: Input
            }], disabled: [{
                type: Input
            }], mousewheel: [{
                type: Input
            }], arrowkeys: [{
                type: Input
            }], showSpinners: [{
                type: Input
            }], showMeridian: [{
                type: Input
            }], showMinutes: [{
                type: Input
            }], showSeconds: [{
                type: Input
            }], meridians: [{
                type: Input
            }], min: [{
                type: Input
            }], max: [{
                type: Input
            }], hoursPlaceholder: [{
                type: Input
            }], minutesPlaceholder: [{
                type: Input
            }], secondsPlaceholder: [{
                type: Input
            }], isValid: [{
                type: Output
            }], meridianChange: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdGltZXBpY2tlci90aW1lcGlja2VyLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy90aW1lcGlja2VyL3RpbWVwaWNrZXIuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUdMLE1BQU0sRUFDTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUF3QixpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBTXpFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUl2RCxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osa0JBQWtCLEVBQ2xCLGlCQUFpQixFQUNqQixrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLFNBQVMsRUFDVCxTQUFTLEVBQ1YsTUFBTSxvQkFBb0IsQ0FBQzs7Ozs7O0FBRTVCLE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUE4QjtJQUMxRSxPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7SUFDbEQsS0FBSyxFQUFFLElBQUk7Q0FDWixDQUFDO0FBb0NGLE1BQU0sT0FBTyxtQkFBbUI7SUEwRTlCLFlBQ0UsT0FBeUIsRUFDakIsR0FBc0IsRUFDdEIsTUFBdUIsRUFD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S0FBSztnQkFFRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBRUksT0FBTztzQkFBaEIsTUFBTTtnQkFFRyxjQUFjO3NCQUF2QixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBDb21wb25lbnQsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIGZvcndhcmRSZWYsXHJcbiAgSW5wdXQsXHJcbiAgT25DaGFuZ2VzLFxyXG4gIE9uRGVzdHJveSxcclxuICBPdXRwdXQsXHJcbiAgVmlld0VuY2Fwc3VsYXRpb25cclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuXHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3JNb2RlbCB9IGZyb20gJy4vbW9kZWxzJztcclxuXHJcbmltcG9ydCB7IFRpbWVwaWNrZXJBY3Rpb25zIH0gZnJvbSAnLi9yZWR1Y2VyL3RpbWVwaWNrZXIuYWN0aW9ucyc7XHJcbmltcG9ydCB7IFRpbWVwaWNrZXJTdG9yZSB9IGZyb20gJy4vcmVkdWNlci90aW1lcGlja2VyLnN0b3JlJztcclxuaW1wb3J0IHsgZ2V0Q29udHJvbHNWYWx1ZSB9IGZyb20gJy4vdGltZXBpY2tlci1jb250cm9scy51dGlsJztcclxuaW1wb3J0IHsgVGltZXBpY2tlckNvbmZpZyB9IGZyb20gJy4vdGltZXBpY2tlci5jb25maWcnO1xyXG5cclxuaW1wb3J0IHsgVGltZUNoYW5nZVNvdXJjZSwgVGltZXBpY2tlckNvbXBvbmVudFN0YXRlLCBUaW1lcGlja2VyQ29udHJvbHMgfSBmcm9tICcuL3RpbWVwaWNrZXIubW9kZWxzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgaXNIb3VySW5wdXRWYWxpZCxcclxuICBpc0lucHV0TGltaXRWYWxpZCxcclxuICBpc0lucHV0VmFsaWQsXHJcbiAgaXNNaW51dGVJbnB1dFZhbGlkLFxyXG4gIGlzT25lT2ZEYXRlc0VtcHR5LFxyXG4gIGlzU2Vjb25kSW5wdXRWYWxpZCxcclxuICBpc1ZhbGlkRGF0ZSxcclxuICBwYWROdW1iZXIsXHJcbiAgcGFyc2VUaW1lXHJcbn0gZnJvbSAnLi90aW1lcGlja2VyLnV0aWxzJztcclxuXHJcbmV4cG9ydCBjb25zdCBUSU1FUElDS0VSX0NPTlRST0xfVkFMVUVfQUNDRVNTT1I6IENvbnRyb2xWYWx1ZUFjY2Vzc29yTW9kZWwgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGltZXBpY2tlckNvbXBvbmVudCksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAndGltZXBpY2tlcicsXHJcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXHJcbiAgcHJvdmlkZXJzOiBbVElNRVBJQ0tFUl9DT05UUk9MX1ZBTFVFX0FDQ0VTU09SLCBUaW1lcGlja2VyU3RvcmVdLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aW1lcGlja2VyLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZXM6IFtgXHJcbiAgICAuYnMtY2hldnJvbiB7XHJcbiAgICAgIGJvcmRlci1zdHlsZTogc29saWQ7XHJcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgICB3aWR0aDogOXB4O1xyXG4gICAgICBoZWlnaHQ6IDlweDtcclxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgICBib3JkZXItd2lkdGg6IDNweCAwcHggMCAzcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLmJzLWNoZXZyb24tdXAge1xyXG4gICAgICAtd2Via2l0LXRyYW5zZm9ybTogcm90YXRlKDQ1ZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xyXG4gICAgICB0b3A6IDJweDtcclxuICAgIH1cclxuXHJcbiAgICAuYnMtY2hldnJvbi1kb3duIHtcclxuICAgICAgLXdlYmtpdC10cmFuc2Zvcm06IHJvdGF0ZSgtMTM1ZGVnKTtcclxuICAgICAgdHJhbnNmb3JtOiByb3RhdGUoLTEzNWRlZyk7XHJcbiAgICAgIHRvcDogLTJweDtcclxuICAgIH1cclxuXHJcbiAgICAuYnMtdGltZXBpY2tlci1maWVsZCB7XHJcbiAgICAgIHdpZHRoOiA2NXB4O1xyXG4gICAgICBwYWRkaW5nOiAuMzc1cmVtIC41NXJlbTtcclxuICAgIH1cclxuICBgXSxcclxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lcGlja2VyQ29tcG9uZW50XHJcbiAgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvcixcclxuICAgIFRpbWVwaWNrZXJDb21wb25lbnRTdGF0ZSxcclxuICAgIFRpbWVwaWNrZXJDb250cm9scyxcclxuICAgIE9uQ2hhbmdlcyxcclxuICAgIE9uRGVzdHJveSB7XHJcbiAgLyoqIGhvdXJzIGNoYW5nZSBzdGVwICovXHJcbiAgQElucHV0KCkgaG91clN0ZXAgPSAxO1xyXG4gIC8qKiBtaW51dGVzIGNoYW5nZSBzdGVwICovXHJcbiAgQElucHV0KCkgbWludXRlU3RlcCA9IDU7XHJcbiAgLyoqIHNlY29uZHMgY2hhbmdlIHN0ZXAgKi9cclxuICBASW5wdXQoKSBzZWNvbmRzU3RlcCA9IDEwO1xyXG4gIC8qKiBpZiB0cnVlIGhvdXJzIGFuZCBtaW51dGVzIGZpZWxkcyB3aWxsIGJlIHJlYWRvbmx5ICovXHJcbiAgQElucHV0KCkgcmVhZG9ubHlJbnB1dCA9IGZhbHNlO1xyXG4gIC8qKiBpZiB0cnVlIGhvdXJzIGFuZCBtaW51dGVzIGZpZWxkcyB3aWxsIGJlIGRpc2FibGVkICovXHJcbiAgQElucHV0KCkgZGlzYWJsZWQgPSBmYWxzZTtcclxuICAvKiogaWYgdHJ1ZSBzY3JvbGwgaW5zaWRlIGhvdXJzIGFuZCBtaW51dGVzIGlucHV0cyB3aWxsIGNoYW5nZSB0aW1lICovXHJcbiAgQElucHV0KCkgbW91c2V3aGVlbCA9IHRydWU7XHJcbiAgLyoqIGlmIHRydWUgdGhlIHZhbHVlcyBvZiBob3VycyBhbmQgbWludXRlcyBjYW4gYmUgY2hhbmdlZCB1c2luZyB0aGUgdXAvZG93biBhcnJvdyBrZXlzIG9uIHRoZSBrZXlib2FyZCAqL1xyXG4gIEBJbnB1dCgpIGFycm93a2V5cyA9IHRydWU7XHJcbiAgLyoqIGlmIHRydWUgc3Bpbm5lciBhcnJvd3MgYWJvdmUgYW5kIGJlbG93IHRoZSBpbnB1dHMgd2lsbCBiZSBzaG93biAqL1xyXG4gIEBJbnB1dCgpIHNob3dTcGlubmVycyA9IHRydWU7XHJcbiAgLyoqIGlmIHRydWUgbWVyaWRpYW4gYnV0dG9uIHdpbGwgYmUgc2hvd24gKi9cclxuICBASW5wdXQoKSBzaG93TWVyaWRpYW4gPSB0cnVlO1xyXG4gIC8qKiBzaG93IG1pbnV0ZXMgaW4gdGltZXBpY2tlciAqL1xyXG4gIEBJbnB1dCgpIHNob3dNaW51dGVzID0gdHJ1ZTtcclxuICAvKiogc2hvdyBzZWNvbmRzIGluIHRpbWVwaWNrZXIgKi9cclxuICBASW5wdXQoKSBzaG93U2Vjb25kcyA9IGZhbHNlO1xyXG4gIC8qKiBtZXJpZGlhbiBsYWJlbHMgYmFzZWQgb24gbG9jYWxlICovXHJcbiAgQElucHV0KCkgbWVyaWRpYW5zOiBzdHJpbmdbXSA9IFsnQU0nLCAnUE0nXTtcclxuICAvKiogbWluaW11bSB0aW1lIHVzZXIgY2FuIHNlbGVjdCAqL1xyXG4gIEBJbnB1dCgpIG1pbj86IERhdGU7XHJcbiAgLyoqIG1heGltdW0gdGltZSB1c2VyIGNhbiBzZWxlY3QgKi9cclxuICBASW5wdXQoKSBtYXg/OiBEYXRlO1xyXG4gIC8qKiBwbGFjZWhvbGRlciBmb3IgaG91cnMgZmllbGQgaW4gdGltZXBpY2tlciAqL1xyXG4gIEBJbnB1dCgpIGhvdXJzUGxhY2Vob2xkZXIgPSAnSEgnO1xyXG4gIC8qKiBwbGFjZWhvbGRlciBmb3IgbWludXRlcyBmaWVsZCBpbiB0aW1lcGlja2VyICovXHJcbiAgQElucHV0KCkgbWludXRlc1BsYWNlaG9sZGVyID0gJ01NJztcclxuICAvKiogcGxhY2Vob2xkZXIgZm9yIHNlY29uZHMgZmllbGQgaW4gdGltZXBpY2tlciAqL1xyXG4gIEBJbnB1dCgpIHNlY29uZHNQbGFjZWhvbGRlciA9ICdTUyc7XHJcbiAgLyoqIGVtaXRzIHRydWUgaWYgdmFsdWUgaXMgYSB2YWxpZCBkYXRlICovXHJcbiAgQE91dHB1dCgpIGlzVmFsaWQgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcbiAgLyoqIGVtaXRzIHZhbHVlIG9mIG1lcmlkaWFuKi9cclxuICBAT3V0cHV0KCkgbWVyaWRpYW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAvLyB1aSB2YXJpYWJsZXNcclxuICBob3VycyA9ICcnO1xyXG4gIG1pbnV0ZXMgPSAnJztcclxuICBzZWNvbmRzID0gJyc7XHJcbiAgbWVyaWRpYW4gPSAnJztcclxuICAvLyBtaW5cXG1heCB2YWxpZGF0aW9uIGZvciBpbnB1dCBmaWVsZHNcclxuICBpbnZhbGlkSG91cnMgPSBmYWxzZTtcclxuICBpbnZhbGlkTWludXRlcyA9IGZhbHNlO1xyXG4gIGludmFsaWRTZWNvbmRzID0gZmFsc2U7XHJcbiAgLy8gYXJpYS1sYWJlbCB2YXJpYWJsZXNcclxuICBsYWJlbEhvdXJzID0gJ2hvdXJzJztcclxuICBsYWJlbE1pbnV0ZXMgPSAnbWludXRlcyc7XHJcbiAgbGFiZWxTZWNvbmRzID0gJ3NlY29uZHMnO1xyXG4gIC8vIHRpbWUgcGlja2VyIGNvbnRyb2xzIHN0YXRlXHJcbiAgY2FuSW5jcmVtZW50SG91cnMgPSB0cnVlO1xyXG4gIGNhbkluY3JlbWVudE1pbnV0ZXMgPSB0cnVlO1xyXG4gIGNhbkluY3JlbWVudFNlY29uZHMgPSB0cnVlO1xyXG4gIGNhbkRlY3JlbWVudEhvdXJzID0gdHJ1ZTtcclxuICBjYW5EZWNyZW1lbnRNaW51dGVzID0gdHJ1ZTtcclxuICBjYW5EZWNyZW1lbnRTZWNvbmRzID0gdHJ1ZTtcclxuICBjYW5Ub2dnbGVNZXJpZGlhbiA9IHRydWU7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBvbkNoYW5nZSA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gIG9uVG91Y2hlZCA9IEZ1bmN0aW9uLnByb3RvdHlwZTtcclxuXHJcbiAgY29uZmlnOiBUaW1lcGlja2VyQ29uZmlnO1xyXG5cclxuICAvLyBjb250cm9sIHZhbHVlIGFjY2Vzc29yIG1ldGhvZHNcclxuICB0aW1lcGlja2VyU3ViPzogU3Vic2NyaXB0aW9uO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgX2NvbmZpZzogVGltZXBpY2tlckNvbmZpZyxcclxuICAgIHByaXZhdGUgX2NkOiBDaGFuZ2VEZXRlY3RvclJlZixcclxuICAgIHByaXZhdGUgX3N0b3JlOiBUaW1lcGlja2VyU3RvcmUsXHJcbiAgICBwcml2YXRlIF90aW1lcGlja2VyQWN0aW9uczogVGltZXBpY2tlckFjdGlvbnNcclxuICApIHtcclxuICAgIHRoaXMuY29uZmlnID0gX2NvbmZpZztcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgdGhpcy5jb25maWcpO1xyXG4gICAgdGhpcy50aW1lcGlja2VyU3ViID0gX3N0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS52YWx1ZSlcclxuICAgICAgLnN1YnNjcmliZSgodmFsdWU6IERhdGUgfCB1bmRlZmluZWQpID0+IHtcclxuICAgICAgICAvLyB1cGRhdGUgVUkgdmFsdWVzIGlmIGRhdGUgY2hhbmdlZFxyXG4gICAgICAgIHRoaXMuX3JlbmRlclRpbWUodmFsdWUpO1xyXG4gICAgICAgIHRoaXMub25DaGFuZ2UodmFsdWUpO1xyXG5cclxuICAgICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChcclxuICAgICAgICAgIHRoaXMuX3RpbWVwaWNrZXJBY3Rpb25zLnVwZGF0ZUNvbnRyb2xzKGdldENvbnRyb2xzVmFsdWUodGhpcykpXHJcbiAgICAgICAgKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgX3N0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5jb250cm9scylcclxuICAgICAgLnN1YnNjcmliZSgoY29udHJvbHNTdGF0ZTogVGltZXBpY2tlckNvbnRyb2xzKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaXNUaW1lcGlja2VySW5wdXRWYWxpZCA9IGlzSW5wdXRWYWxpZCh0aGlzLmhvdXJzLCB0aGlzLm1pbnV0ZXMsIHRoaXMuc2Vjb25kcywgdGhpcy5pc1BNKCkpO1xyXG4gICAgICAgIGNvbnN0IGlzVmFsaWQgPSB0aGlzLmNvbmZpZy5hbGxvd0VtcHR5VGltZT9cclxuICAgICAgICAgIHRoaXMuaXNPbmVPZkRhdGVzSXNFbXB0eSgpIHx8IGlzVGltZXBpY2tlcklucHV0VmFsaWRcclxuICAgICAgICAgIDogaXNUaW1lcGlja2VySW5wdXRWYWxpZDtcclxuICAgICAgICB0aGlzLmlzVmFsaWQuZW1pdChpc1ZhbGlkKTtcclxuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMsIGNvbnRyb2xzU3RhdGUpO1xyXG4gICAgICAgIF9jZC5tYXJrRm9yQ2hlY2soKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuICAvKiogQGRlcHJlY2F0ZWQgLSBwbGVhc2UgdXNlIGBpc0VkaXRhYmxlYCBpbnN0ZWFkICovXHJcbiAgZ2V0IGlzU3Bpbm5lcnNWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hvd1NwaW5uZXJzICYmICF0aGlzLnJlYWRvbmx5SW5wdXQ7XHJcbiAgfVxyXG5cclxuICBnZXQgaXNFZGl0YWJsZSgpOiBib29sZWFuIHtcclxuICAgIHJldHVybiAhKHRoaXMucmVhZG9ubHlJbnB1dCB8fCB0aGlzLmRpc2FibGVkKTtcclxuICB9XHJcblxyXG4gIHJlc2V0VmFsaWRhdGlvbigpOiB2b2lkIHtcclxuICAgIHRoaXMuaW52YWxpZEhvdXJzID0gZmFsc2U7XHJcbiAgICB0aGlzLmludmFsaWRNaW51dGVzID0gZmFsc2U7XHJcbiAgICB0aGlzLmludmFsaWRTZWNvbmRzID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBpc1BNKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2hvd01lcmlkaWFuICYmIHRoaXMubWVyaWRpYW4gPT09IHRoaXMubWVyaWRpYW5zWzFdO1xyXG4gIH1cclxuXHJcbiAgcHJldkRlZigkZXZlbnQ6IEV2ZW50KSB7XHJcbiAgICAkZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB9XHJcblxyXG4gIHdoZWVsU2lnbigkZXZlbnQ6IFdoZWVsRXZlbnRJbml0KTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLnNpZ24oJGV2ZW50LmRlbHRhWSB8fCAwKSAqIC0xO1xyXG4gIH1cclxuXHJcbiAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChcclxuICAgICAgdGhpcy5fdGltZXBpY2tlckFjdGlvbnMudXBkYXRlQ29udHJvbHMoZ2V0Q29udHJvbHNWYWx1ZSh0aGlzKSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VIb3VycyhzdGVwOiBudW1iZXIsIHNvdXJjZTogVGltZUNoYW5nZVNvdXJjZSA9ICcnKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlc2V0VmFsaWRhdGlvbigpO1xyXG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2godGhpcy5fdGltZXBpY2tlckFjdGlvbnMuY2hhbmdlSG91cnMoeyBzdGVwLCBzb3VyY2UgfSkpO1xyXG4gIH1cclxuXHJcbiAgY2hhbmdlTWludXRlcyhzdGVwOiBudW1iZXIsIHNvdXJjZTogVGltZUNoYW5nZVNvdXJjZSA9ICcnKTogdm9pZCB7XHJcbiAgICB0aGlzLnJlc2V0VmFsaWRhdGlvbigpO1xyXG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goXHJcbiAgICAgIHRoaXMuX3RpbWVwaWNrZXJBY3Rpb25zLmNoYW5nZU1pbnV0ZXMoeyBzdGVwLCBzb3VyY2UgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VTZWNvbmRzKHN0ZXA6IG51bWJlciwgc291cmNlOiBUaW1lQ2hhbmdlU291cmNlID0gJycpOiB2b2lkIHtcclxuICAgIHRoaXMucmVzZXRWYWxpZGF0aW9uKCk7XHJcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChcclxuICAgICAgdGhpcy5fdGltZXBpY2tlckFjdGlvbnMuY2hhbmdlU2Vjb25kcyh7IHN0ZXAsIHNvdXJjZSB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZUhvdXJzKHRhcmdldD86IFBhcnRpYWw8RXZlbnRUYXJnZXQ+IHwgbnVsbCk6IHZvaWQge1xyXG4gICAgdGhpcy5yZXNldFZhbGlkYXRpb24oKTtcclxuICAgIHRoaXMuaG91cnMgPSAodGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG5cclxuICAgIGNvbnN0IGlzVGltZXBpY2tlcklucHV0VmFsaWQgPSBpc0hvdXJJbnB1dFZhbGlkKHRoaXMuaG91cnMsIHRoaXMuaXNQTSgpKSAmJiB0aGlzLmlzVmFsaWRMaW1pdCgpO1xyXG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuY29uZmlnLmFsbG93RW1wdHlUaW1lID9cclxuICAgICAgdGhpcy5pc09uZU9mRGF0ZXNJc0VtcHR5KCkgfHwgaXNUaW1lcGlja2VySW5wdXRWYWxpZFxyXG4gICAgICA6IGlzVGltZXBpY2tlcklucHV0VmFsaWQ7XHJcblxyXG4gICAgaWYgKCFpc1ZhbGlkKSB7XHJcbiAgICAgIHRoaXMuaW52YWxpZEhvdXJzID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pc1ZhbGlkLmVtaXQoZmFsc2UpO1xyXG4gICAgICB0aGlzLm9uQ2hhbmdlKG51bGwpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3VwZGF0ZVRpbWUoKTtcclxuICB9XHJcblxyXG4gIHVwZGF0ZU1pbnV0ZXModGFyZ2V0OiBQYXJ0aWFsPEV2ZW50VGFyZ2V0PiB8IG51bGwpIHtcclxuICAgIHRoaXMucmVzZXRWYWxpZGF0aW9uKCk7XHJcbiAgICB0aGlzLm1pbnV0ZXMgPSAodGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQpLnZhbHVlO1xyXG5cclxuICAgIGNvbnN0IGlzVGltZXBpY2tlcklucHV0VmFsaWQgPSBpc01pbnV0ZUlucHV0VmFsaWQodGhpcy5taW51dGVzKSAmJiB0aGlzLmlzVmFsaWRMaW1pdCgpO1xyXG4gICAgY29uc3QgaXNWYWxpZCA9IHRoaXMuY29uZmlnLmFsbG93RW1wdHlUaW1lID9cclxuICAgICAgdGhpcy5pc09uZU9mRGF0ZXNJc0VtcHR5KCkgfHwgaXNUaW1lcGlja2VySW5wdXRWYWxpZFxyXG4gICAgICA6IGlzVGltZXBpY2tlcklucHV0VmFsaWQ7XHJcblxyXG4gICAgaWYgKCFpc1ZhbGlkKSB7XHJcbiAgICAgIHRoaXMuaW52YWxpZE1pbnV0ZXMgPSB0cnVlO1xyXG4gICAgICB0aGlzLmlzVmFsaWQuZW1pdChmYWxzZSk7XHJcbiAgICAgIHRoaXMub25DaGFuZ2UobnVsbCk7XHJcblxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fdXBkYXRlVGltZSgpO1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlU2Vjb25kcyh0YXJnZXQ6IFBhcnRpYWw8RXZlbnRUYXJnZXQ+IHwgbnVsbCkge1xyXG4gICAgdGhpcy5yZXNldFZhbGlkYXRpb24oKTtcclxuICAgIHRoaXMuc2Vjb25kcyA9ICh0YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XHJcblxyXG4gICAgY29uc3QgaXNUaW1lcGlja2VySW5wdXRWYWxpZCA9IGlzU2Vjb25kSW5wdXRWYWxpZCh0aGlzLnNlY29uZHMpICYmIHRoaXMuaXNWYWxpZExpbWl0KCk7XHJcbiAgICBjb25zdCBpc1ZhbGlkID0gdGhpcy5jb25maWcuYWxsb3dFbXB0eVRpbWUgP1xyXG4gICAgICB0aGlzLmlzT25lT2ZEYXRlc0lzRW1wdHkoKSB8fCBpc1RpbWVwaWNrZXJJbnB1dFZhbGlkXHJcbiAgICAgIDogaXNUaW1lcGlja2VySW5wdXRWYWxpZDtcclxuXHJcbiAgICBpZiAoIWlzVmFsaWQpIHtcclxuICAgICAgdGhpcy5pbnZhbGlkU2Vjb25kcyA9IHRydWU7XHJcbiAgICAgIHRoaXMuaXNWYWxpZC5lbWl0KGZhbHNlKTtcclxuICAgICAgdGhpcy5vbkNoYW5nZShudWxsKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl91cGRhdGVUaW1lKCk7XHJcbiAgfVxyXG5cclxuICBpc1ZhbGlkTGltaXQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNJbnB1dExpbWl0VmFsaWQoe1xyXG4gICAgICBob3VyOiB0aGlzLmhvdXJzLFxyXG4gICAgICBtaW51dGU6IHRoaXMubWludXRlcyxcclxuICAgICAgc2Vjb25kczogdGhpcy5zZWNvbmRzLFxyXG4gICAgICBpc1BNOiB0aGlzLmlzUE0oKVxyXG4gICAgfSwgdGhpcy5tYXgsIHRoaXMubWluKTtcclxuICB9XHJcblxyXG4gIGlzT25lT2ZEYXRlc0lzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaXNPbmVPZkRhdGVzRW1wdHkoXHJcbiAgICAgIHRoaXMuaG91cnMsXHJcbiAgICAgIHRoaXMubWludXRlcyxcclxuICAgICAgdGhpcy5zZWNvbmRzKTtcclxuICB9XHJcblxyXG4gIF91cGRhdGVUaW1lKCkge1xyXG4gICAgY29uc3QgX3NlY29uZHMgPSB0aGlzLnNob3dTZWNvbmRzID8gdGhpcy5zZWNvbmRzIDogdm9pZCAwO1xyXG4gICAgY29uc3QgX21pbnV0ZXMgPSB0aGlzLnNob3dNaW51dGVzID8gdGhpcy5taW51dGVzIDogdm9pZCAwO1xyXG4gICAgY29uc3QgaXNUaW1lcGlja2VySW5wdXRWYWxpZCA9IGlzSW5wdXRWYWxpZCh0aGlzLmhvdXJzLCBfbWludXRlcywgX3NlY29uZHMsIHRoaXMuaXNQTSgpKTtcclxuICAgIGNvbnN0IGlzVmFsaWQgPSB0aGlzLmNvbmZpZy5hbGxvd0VtcHR5VGltZSA/XHJcbiAgICAgIHRoaXMuaXNPbmVPZkRhdGVzSXNFbXB0eSgpIHx8IGlzVGltZXBpY2tlcklucHV0VmFsaWRcclxuICAgICAgOiBpc1RpbWVwaWNrZXJJbnB1dFZhbGlkO1xyXG4gICAgaWYgKCFpc1ZhbGlkKSB7XHJcbiAgICAgIHRoaXMuaXNWYWxpZC5lbWl0KGZhbHNlKTtcclxuICAgICAgdGhpcy5vbkNoYW5nZShudWxsKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChcclxuICAgICAgdGhpcy5fdGltZXBpY2tlckFjdGlvbnMuc2V0VGltZSh7XHJcbiAgICAgICAgaG91cjogdGhpcy5ob3VycyxcclxuICAgICAgICBtaW51dGU6IHRoaXMubWludXRlcyxcclxuICAgICAgICBzZWNvbmRzOiB0aGlzLnNlY29uZHMsXHJcbiAgICAgICAgaXNQTTogdGhpcy5pc1BNKClcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICB0b2dnbGVNZXJpZGlhbigpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5zaG93TWVyaWRpYW4gfHwgIXRoaXMuaXNFZGl0YWJsZSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgX2hvdXJzUGVyRGF5SGFsZiA9IDEyO1xyXG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goXHJcbiAgICAgIHRoaXMuX3RpbWVwaWNrZXJBY3Rpb25zLmNoYW5nZUhvdXJzKHtcclxuICAgICAgICBzdGVwOiBfaG91cnNQZXJEYXlIYWxmLFxyXG4gICAgICAgIHNvdXJjZTogJydcclxuICAgICAgfSlcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXcml0ZSBhIG5ldyB2YWx1ZSB0byB0aGUgZWxlbWVudC5cclxuICAgKi9cclxuICB3cml0ZVZhbHVlKG9iaj86IHN0cmluZyB8IERhdGUpOiB2b2lkIHtcclxuICAgIGlmIChpc1ZhbGlkRGF0ZShvYmopKSB7XHJcbiAgICAgIHRoaXMucmVzZXRWYWxpZGF0aW9uKCk7XHJcbiAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX3RpbWVwaWNrZXJBY3Rpb25zLndyaXRlVmFsdWUocGFyc2VUaW1lKG9iaikpKTtcclxuICAgIH0gZWxzZSBpZiAob2JqID09IG51bGwpIHtcclxuICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2godGhpcy5fdGltZXBpY2tlckFjdGlvbnMud3JpdGVWYWx1ZSgpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGNvbnRyb2wgcmVjZWl2ZXMgYSBjaGFuZ2UgZXZlbnQuXHJcbiAgICovXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAoXzogYW55KSA9PiB2b2lkKTogdm9pZCB7XHJcbiAgICB0aGlzLm9uQ2hhbmdlID0gZm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBjb250cm9sIHJlY2VpdmVzIGEgdG91Y2ggZXZlbnQuXHJcbiAgICovXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHRoZSBjb250cm9sIHN0YXR1cyBjaGFuZ2VzIHRvIG9yIGZyb20gXCJkaXNhYmxlZFwiLlxyXG4gICAqIERlcGVuZGluZyBvbiB0aGUgdmFsdWUsIGl0IHdpbGwgZW5hYmxlIG9yIGRpc2FibGUgdGhlIGFwcHJvcHJpYXRlIERPTSBlbGVtZW50LlxyXG4gICAqXHJcbiAgICogQHBhcmFtIGlzRGlzYWJsZWRcclxuICAgKi9cclxuICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgdGhpcy5fY2QubWFya0ZvckNoZWNrKCk7XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMudGltZXBpY2tlclN1Yj8udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JlbmRlclRpbWUodmFsdWU/OiBzdHJpbmcgfCBEYXRlKTogdm9pZCB7XHJcbiAgICBpZiAoIXZhbHVlIHx8ICFpc1ZhbGlkRGF0ZSh2YWx1ZSkpIHtcclxuICAgICAgdGhpcy5ob3VycyA9ICcnO1xyXG4gICAgICB0aGlzLm1pbnV0ZXMgPSAnJztcclxuICAgICAgdGhpcy5zZWNvbmRzID0gJyc7XHJcbiAgICAgIHRoaXMubWVyaWRpYW4gPSB0aGlzLm1lcmlkaWFuc1swXTtcclxuICAgICAgdGhpcy5tZXJpZGlhbkNoYW5nZS5lbWl0KHRoaXMubWVyaWRpYW4pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgX3ZhbHVlID0gcGFyc2VUaW1lKHZhbHVlKTtcclxuICAgIGlmICghX3ZhbHVlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBfaG91cnNQZXJEYXlIYWxmID0gMTI7XHJcbiAgICBsZXQgX2hvdXJzID0gX3ZhbHVlLmdldEhvdXJzKCk7XHJcblxyXG4gICAgaWYgKHRoaXMuc2hvd01lcmlkaWFuKSB7XHJcbiAgICAgIHRoaXMubWVyaWRpYW4gPSB0aGlzLm1lcmlkaWFuc1tfaG91cnMgPj0gX2hvdXJzUGVyRGF5SGFsZiA/IDEgOiAwXTtcclxuICAgICAgdGhpcy5tZXJpZGlhbkNoYW5nZS5lbWl0KHRoaXMubWVyaWRpYW4pO1xyXG4gICAgICBfaG91cnMgPSBfaG91cnMgJSBfaG91cnNQZXJEYXlIYWxmO1xyXG4gICAgICAvLyBzaG91bGQgYmUgMTIgUE0sIG5vdCAwMCBQTVxyXG4gICAgICBpZiAoX2hvdXJzID09PSAwKSB7XHJcbiAgICAgICAgX2hvdXJzID0gX2hvdXJzUGVyRGF5SGFsZjtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaG91cnMgPSBwYWROdW1iZXIoX2hvdXJzKTtcclxuICAgIHRoaXMubWludXRlcyA9IHBhZE51bWJlcihfdmFsdWUuZ2V0TWludXRlcygpKTtcclxuICAgIHRoaXMuc2Vjb25kcyA9IHBhZE51bWJlcihfdmFsdWUuZ2V0VVRDU2Vjb25kcygpKTtcclxuICB9XHJcbn1cclxuIiwiPHRhYmxlPlxyXG4gIDx0Ym9keT5cclxuICA8dHIgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiIFtoaWRkZW5dPVwiIXNob3dTcGlubmVyc1wiPlxyXG4gICAgPCEtLSBpbmNyZW1lbnQgaG91cnMgYnV0dG9uLS0+XHJcbiAgICA8dGQ+XHJcbiAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmRpc2FibGVkXT1cIiFjYW5JbmNyZW1lbnRIb3VycyB8fCAhaXNFZGl0YWJsZVwiXHJcbiAgICAgICAgIChjbGljayk9XCJjaGFuZ2VIb3Vycyhob3VyU3RlcClcIlxyXG4gICAgICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiXHJcbiAgICAgID48c3BhbiBjbGFzcz1cImJzLWNoZXZyb24gYnMtY2hldnJvbi11cFwiPjwvc3Bhbj48L2E+XHJcbiAgICA8L3RkPlxyXG4gICAgPCEtLSBkaXZpZGVyIC0tPlxyXG4gICAgPHRkICpuZ0lmPVwic2hvd01pbnV0ZXNcIj4mbmJzcDsmbmJzcDsmbmJzcDs8L3RkPlxyXG4gICAgPCEtLSBpbmNyZW1lbnQgbWludXRlcyBidXR0b24gLS0+XHJcbiAgICA8dGQgKm5nSWY9XCJzaG93TWludXRlc1wiPlxyXG4gICAgICA8YSBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuSW5jcmVtZW50TWludXRlcyB8fCAhaXNFZGl0YWJsZVwiXHJcbiAgICAgICAgIChjbGljayk9XCJjaGFuZ2VNaW51dGVzKG1pbnV0ZVN0ZXApXCJcclxuICAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIlxyXG4gICAgICA+PHNwYW4gY2xhc3M9XCJicy1jaGV2cm9uIGJzLWNoZXZyb24tdXBcIj48L3NwYW4+PC9hPlxyXG4gICAgPC90ZD5cclxuICAgIDwhLS0gZGl2aWRlciAtLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dTZWNvbmRzXCI+Jm5ic3A7PC90ZD5cclxuICAgIDwhLS0gaW5jcmVtZW50IHNlY29uZHMgYnV0dG9uIC0tPlxyXG4gICAgPHRkICpuZ0lmPVwic2hvd1NlY29uZHNcIj5cclxuICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhbkluY3JlbWVudFNlY29uZHMgfHwgIWlzRWRpdGFibGVcIlxyXG4gICAgICAgICAoY2xpY2spPVwiY2hhbmdlU2Vjb25kcyhzZWNvbmRzU3RlcClcIlxyXG4gICAgICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiXHJcbiAgICAgID5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImJzLWNoZXZyb24gYnMtY2hldnJvbi11cFwiPjwvc3Bhbj5cclxuICAgICAgPC9hPlxyXG4gICAgPC90ZD5cclxuICAgIDwhLS0gc3BhY2UgYmV0d2VlbiAtLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dNZXJpZGlhblwiPiZuYnNwOyZuYnNwOyZuYnNwOzwvdGQ+XHJcbiAgICA8IS0tIG1lcmlkaWFuIHBsYWNlaG9sZGVyLS0+XHJcbiAgICA8dGQgKm5nSWY9XCJzaG93TWVyaWRpYW5cIj48L3RkPlxyXG4gIDwvdHI+XHJcbiAgPHRyPlxyXG4gICAgPCEtLSBob3VycyAtLT5cclxuICAgIDx0ZCBjbGFzcz1cImZvcm0tZ3JvdXAgbWItM1wiIFtjbGFzcy5oYXMtZXJyb3JdPVwiaW52YWxpZEhvdXJzXCI+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIFtjbGFzcy5pcy1pbnZhbGlkXT1cImludmFsaWRIb3Vyc1wiXHJcbiAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCB0ZXh0LWNlbnRlciBicy10aW1lcGlja2VyLWZpZWxkXCJcclxuICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJob3Vyc1BsYWNlaG9sZGVyXCJcclxuICAgICAgICAgICAgIG1heGxlbmd0aD1cIjJcIlxyXG4gICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5SW5wdXRcIlxyXG4gICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgICAgIFt2YWx1ZV09XCJob3Vyc1wiXHJcbiAgICAgICAgICAgICAod2hlZWwpPVwicHJldkRlZigkZXZlbnQpO2NoYW5nZUhvdXJzKGhvdXJTdGVwICogd2hlZWxTaWduKCRldmVudCksICd3aGVlbCcpXCJcclxuICAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlSG91cnMoaG91clN0ZXAsICdrZXknKVwiXHJcbiAgICAgICAgICAgICAoa2V5ZG93bi5BcnJvd0Rvd24pPVwiY2hhbmdlSG91cnMoLWhvdXJTdGVwLCAna2V5JylcIlxyXG4gICAgICAgICAgICAgKGNoYW5nZSk9XCJ1cGRhdGVIb3VycygkZXZlbnQudGFyZ2V0KVwiIFthdHRyLmFyaWEtbGFiZWxdPVwibGFiZWxIb3Vyc1wiPjwvdGQ+XHJcbiAgICA8IS0tIGRpdmlkZXIgLS0+XHJcbiAgICA8dGQgKm5nSWY9XCJzaG93TWludXRlc1wiPiZuYnNwOzombmJzcDs8L3RkPlxyXG4gICAgPCEtLSBtaW51dGVzIC0tPlxyXG4gICAgPHRkIGNsYXNzPVwiZm9ybS1ncm91cCBtYi0zXCIgKm5nSWY9XCJzaG93TWludXRlc1wiIFtjbGFzcy5oYXMtZXJyb3JdPVwiaW52YWxpZE1pbnV0ZXNcIj5cclxuICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgW2NsYXNzLmlzLWludmFsaWRdPVwiaW52YWxpZE1pbnV0ZXNcIlxyXG4gICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2wgdGV4dC1jZW50ZXIgYnMtdGltZXBpY2tlci1maWVsZFwiXHJcbiAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwibWludXRlc1BsYWNlaG9sZGVyXCJcclxuICAgICAgICAgICAgIG1heGxlbmd0aD1cIjJcIlxyXG4gICAgICAgICAgICAgW3JlYWRvbmx5XT1cInJlYWRvbmx5SW5wdXRcIlxyXG4gICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcclxuICAgICAgICAgICAgIFt2YWx1ZV09XCJtaW51dGVzXCJcclxuICAgICAgICAgICAgICh3aGVlbCk9XCJwcmV2RGVmKCRldmVudCk7Y2hhbmdlTWludXRlcyhtaW51dGVTdGVwICogd2hlZWxTaWduKCRldmVudCksICd3aGVlbCcpXCJcclxuICAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlTWludXRlcyhtaW51dGVTdGVwLCAna2V5JylcIlxyXG4gICAgICAgICAgICAgKGtleWRvd24uQXJyb3dEb3duKT1cImNoYW5nZU1pbnV0ZXMoLW1pbnV0ZVN0ZXAsICdrZXknKVwiXHJcbiAgICAgICAgICAgICAoY2hhbmdlKT1cInVwZGF0ZU1pbnV0ZXMoJGV2ZW50LnRhcmdldClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImxhYmVsTWludXRlc1wiPlxyXG4gICAgPC90ZD5cclxuICAgIDwhLS0gZGl2aWRlciAtLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dTZWNvbmRzXCI+Jm5ic3A7OiZuYnNwOzwvdGQ+XHJcbiAgICA8IS0tIHNlY29uZHMgLS0+XHJcbiAgICA8dGQgY2xhc3M9XCJmb3JtLWdyb3VwIG1iLTNcIiAqbmdJZj1cInNob3dTZWNvbmRzXCIgW2NsYXNzLmhhcy1lcnJvcl09XCJpbnZhbGlkU2Vjb25kc1wiPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBbY2xhc3MuaXMtaW52YWxpZF09XCJpbnZhbGlkU2Vjb25kc1wiXHJcbiAgICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbCB0ZXh0LWNlbnRlciBicy10aW1lcGlja2VyLWZpZWxkXCJcclxuICAgICAgICAgICAgIFtwbGFjZWhvbGRlcl09XCJzZWNvbmRzUGxhY2Vob2xkZXJcIlxyXG4gICAgICAgICAgICAgbWF4bGVuZ3RoPVwiMlwiXHJcbiAgICAgICAgICAgICBbcmVhZG9ubHldPVwicmVhZG9ubHlJbnB1dFwiXHJcbiAgICAgICAgICAgICBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxyXG4gICAgICAgICAgICAgW3ZhbHVlXT1cInNlY29uZHNcIlxyXG4gICAgICAgICAgICAgKHdoZWVsKT1cInByZXZEZWYoJGV2ZW50KTtjaGFuZ2VTZWNvbmRzKHNlY29uZHNTdGVwICogd2hlZWxTaWduKCRldmVudCksICd3aGVlbCcpXCJcclxuICAgICAgICAgICAgIChrZXlkb3duLkFycm93VXApPVwiY2hhbmdlU2Vjb25kcyhzZWNvbmRzU3RlcCwgJ2tleScpXCJcclxuICAgICAgICAgICAgIChrZXlkb3duLkFycm93RG93bik9XCJjaGFuZ2VTZWNvbmRzKC1zZWNvbmRzU3RlcCwgJ2tleScpXCJcclxuICAgICAgICAgICAgIChjaGFuZ2UpPVwidXBkYXRlU2Vjb25kcygkZXZlbnQudGFyZ2V0KVwiIFthdHRyLmFyaWEtbGFiZWxdPVwibGFiZWxTZWNvbmRzXCI+XHJcbiAgICA8L3RkPlxyXG4gICAgPCEtLSBzcGFjZSBiZXR3ZWVuIC0tPlxyXG4gICAgPHRkICpuZ0lmPVwic2hvd01lcmlkaWFuXCI+Jm5ic3A7Jm5ic3A7Jm5ic3A7PC90ZD5cclxuICAgIDwhLS0gbWVyaWRpYW4gLS0+XHJcbiAgICA8dGQgKm5nSWY9XCJzaG93TWVyaWRpYW5cIj5cclxuICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4gYnRuLWRlZmF1bHQgdGV4dC1jZW50ZXJcIlxyXG4gICAgICAgICAgICAgIFtkaXNhYmxlZF09XCIhaXNFZGl0YWJsZSB8fCAhY2FuVG9nZ2xlTWVyaWRpYW5cIlxyXG4gICAgICAgICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCIhaXNFZGl0YWJsZSB8fCAhY2FuVG9nZ2xlTWVyaWRpYW5cIlxyXG4gICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGVNZXJpZGlhbigpXCJcclxuICAgICAgPnt7IG1lcmlkaWFuIH19XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC90ZD5cclxuICA8L3RyPlxyXG4gIDx0ciBjbGFzcz1cInRleHQtY2VudGVyXCIgW2hpZGRlbl09XCIhc2hvd1NwaW5uZXJzXCI+XHJcbiAgICA8IS0tIGRlY3JlbWVudCBob3VycyBidXR0b24tLT5cclxuICAgIDx0ZD5cclxuICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLWxpbmtcIiBbY2xhc3MuZGlzYWJsZWRdPVwiIWNhbkRlY3JlbWVudEhvdXJzIHx8ICFpc0VkaXRhYmxlXCJcclxuICAgICAgICAgKGNsaWNrKT1cImNoYW5nZUhvdXJzKC1ob3VyU3RlcClcIlxyXG4gICAgICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiXHJcbiAgICAgID5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImJzLWNoZXZyb24gYnMtY2hldnJvbi1kb3duXCI+PC9zcGFuPlxyXG4gICAgICA8L2E+XHJcbiAgICA8L3RkPlxyXG4gICAgPCEtLSBkaXZpZGVyIC0tPlxyXG4gICAgPHRkICpuZ0lmPVwic2hvd01pbnV0ZXNcIj4mbmJzcDsmbmJzcDsmbmJzcDs8L3RkPlxyXG4gICAgPCEtLSBkZWNyZW1lbnQgbWludXRlcyBidXR0b24tLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dNaW51dGVzXCI+XHJcbiAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1saW5rXCIgW2NsYXNzLmRpc2FibGVkXT1cIiFjYW5EZWNyZW1lbnRNaW51dGVzIHx8ICFpc0VkaXRhYmxlXCJcclxuICAgICAgICAgKGNsaWNrKT1cImNoYW5nZU1pbnV0ZXMoLW1pbnV0ZVN0ZXApXCJcclxuICAgICAgICAgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKTtcIlxyXG4gICAgICA+XHJcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJicy1jaGV2cm9uIGJzLWNoZXZyb24tZG93blwiPjwvc3Bhbj5cclxuICAgICAgPC9hPlxyXG4gICAgPC90ZD5cclxuICAgIDwhLS0gZGl2aWRlciAtLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dTZWNvbmRzXCI+Jm5ic3A7PC90ZD5cclxuICAgIDwhLS0gZGVjcmVtZW50IHNlY29uZHMgYnV0dG9uLS0+XHJcbiAgICA8dGQgKm5nSWY9XCJzaG93U2Vjb25kc1wiPlxyXG4gICAgICA8YSBjbGFzcz1cImJ0biBidG4tbGlua1wiIFtjbGFzcy5kaXNhYmxlZF09XCIhY2FuRGVjcmVtZW50U2Vjb25kcyB8fCAhaXNFZGl0YWJsZVwiXHJcbiAgICAgICAgIChjbGljayk9XCJjaGFuZ2VTZWNvbmRzKC1zZWNvbmRzU3RlcClcIlxyXG4gICAgICAgICBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApO1wiXHJcbiAgICAgID5cclxuICAgICAgICA8c3BhbiBjbGFzcz1cImJzLWNoZXZyb24gYnMtY2hldnJvbi1kb3duXCI+PC9zcGFuPlxyXG4gICAgICA8L2E+XHJcbiAgICA8L3RkPlxyXG4gICAgPCEtLSBzcGFjZSBiZXR3ZWVuIC0tPlxyXG4gICAgPHRkICpuZ0lmPVwic2hvd01lcmlkaWFuXCI+Jm5ic3A7Jm5ic3A7Jm5ic3A7PC90ZD5cclxuICAgIDwhLS0gbWVyaWRpYW4gcGxhY2Vob2xkZXItLT5cclxuICAgIDx0ZCAqbmdJZj1cInNob3dNZXJpZGlhblwiPjwvdGQ+XHJcbiAgPC90cj5cclxuICA8L3Rib2R5PlxyXG48L3RhYmxlPlxyXG4iXX0=