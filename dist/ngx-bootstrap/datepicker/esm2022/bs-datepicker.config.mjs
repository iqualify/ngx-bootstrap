import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * For date range picker there are `BsDaterangepickerConfig` which inherits all properties,
 * except `displayMonths`, for range picker it default to `2`
 */
export class BsDatepickerConfig {
    constructor() {
        /** sets use adaptive position */
        this.adaptivePosition = false;
        /** sets use UTC date time format */
        this.useUtc = false;
        /** turn on/off animation */
        this.isAnimated = false;
        /**
         * The view that the datepicker should start in
         */
        this.startView = 'day';
        /**
         * If true, returns focus to the datepicker / daterangepicker input after date selection
         */
        this.returnFocusToInput = false;
        /** CSS class which will be applied to datepicker container,
         * usually used to set color theme
         */
        this.containerClass = 'theme-green';
        // DatepickerRenderOptions
        this.displayMonths = 1;
        /**
         * Allows to hide week numbers in datepicker
         */
        this.showWeekNumbers = true;
        this.dateInputFormat = 'L';
        // range picker
        this.rangeSeparator = ' - ';
        /**
         * Date format for date range input field
         */
        this.rangeInputFormat = 'L';
        // DatepickerFormatOptions
        this.monthTitle = 'MMMM';
        this.yearTitle = 'YYYY';
        this.dayLabel = 'D';
        this.monthLabel = 'MMMM';
        this.yearLabel = 'YYYY';
        this.weekNumbers = 'w';
        /**
         * Shows 'today' button
         */
        this.showTodayButton = false;
        /**
         * Shows clear button
         */
        this.showClearButton = false;
        /**
         * Positioning of 'today' button
         */
        this.todayPosition = 'center';
        /**
         * Positioning of 'clear' button
         */
        this.clearPosition = 'right';
        /**
         * Label for 'today' button
         */
        this.todayButtonLabel = 'Today';
        /**
         * Label for 'clear' button
         */
        this.clearButtonLabel = 'Clear';
        /**
         * Label for 'custom range' button
         */
        this.customRangeButtonLabel = 'Custom Range';
        /**
         * Shows timepicker under datepicker
         */
        this.withTimepicker = false;
        /**
         * Set allowed positions of container.
         */
        this.allowedPositions = ['top', 'bottom'];
        /**
         * Set rule for datepicker closing. If value is true datepicker closes only if date is changed, if user changes only time datepicker doesn't close. It is available only if property withTimepicker is set true
         * */
        this.keepDatepickerOpened = false;
        /**
         * Allows keep invalid dates in range. Can be used with minDate, maxDate
         * */
        this.keepDatesOutOfRules = false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDatepickerConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDatepickerConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: BsDatepickerConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZGF0ZXBpY2tlci9icy1kYXRlcGlja2VyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVUzQzs7O0dBR0c7QUFJSCxNQUFNLE9BQU8sa0JBQWtCO0lBSC9CO1FBSUUsaUNBQWlDO1FBQ2pDLHFCQUFnQixHQUFHLEtBQUssQ0FBQztRQUN6QixvQ0FBb0M7UUFDcEMsV0FBTSxHQUFHLEtBQUssQ0FBQztRQUNmLDRCQUE0QjtRQUM1QixlQUFVLEdBQUcsS0FBSyxDQUFDO1FBV25COztXQUVHO1FBQ0gsY0FBUyxHQUF5QixLQUFLLENBQUM7UUE4RHhDOztXQUVHO1FBQ0gsdUJBQWtCLEdBQUcsS0FBSyxDQUFDO1FBRTNCOztXQUVHO1FBQ0gsbUJBQWMsR0FBRyxhQUFhLENBQUM7UUFFL0IsMEJBQTBCO1FBQzFCLGtCQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCOztXQUVHO1FBQ0gsb0JBQWUsR0FBRyxJQUFJLENBQUM7UUFFdkIsb0JBQWUsR0FBRyxHQUFHLENBQUM7UUFDdEIsZUFBZTtRQUNmLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCOztXQUVHO1FBQ0gscUJBQWdCLEdBQUcsR0FBRyxDQUFDO1FBWXZCLDBCQUEwQjtRQUMxQixlQUFVLEdBQUcsTUFBTSxDQUFDO1FBQ3BCLGNBQVMsR0FBRyxNQUFNLENBQUM7UUFDbkIsYUFBUSxHQUFHLEdBQUcsQ0FBQztRQUNmLGVBQVUsR0FBRyxNQUFNLENBQUM7UUFDcEIsY0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNuQixnQkFBVyxHQUFHLEdBQUcsQ0FBQztRQUVsQjs7V0FFRztRQUNILG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBRXhCOztXQUVHO1FBQ0gsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFFeEI7O1dBRUc7UUFDSCxrQkFBYSxHQUFHLFFBQVEsQ0FBQztRQUV6Qjs7V0FFRztRQUNILGtCQUFhLEdBQUcsT0FBTyxDQUFDO1FBRXhCOztXQUVHO1FBQ0gscUJBQWdCLEdBQUcsT0FBTyxDQUFDO1FBRTNCOztXQUVHO1FBQ0gscUJBQWdCLEdBQUcsT0FBTyxDQUFDO1FBRTNCOztXQUVHO1FBQ0gsMkJBQXNCLEdBQUcsY0FBYyxDQUFDO1FBRXhDOztXQUVHO1FBQ0gsbUJBQWMsR0FBRyxLQUFLLENBQUM7UUFLdkI7O1dBRUc7UUFDSCxxQkFBZ0IsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyQzs7YUFFSztRQUNMLHlCQUFvQixHQUFHLEtBQUssQ0FBQztRQUM3Qjs7YUFFSztRQUNMLHdCQUFtQixHQUFHLEtBQUssQ0FBQztLQUM3Qjs4R0FwTFksa0JBQWtCO2tIQUFsQixrQkFBa0IsY0FGakIsTUFBTTs7MkZBRVAsa0JBQWtCO2tCQUg5QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtcclxuICBEYXRlcGlja2VyUmVuZGVyT3B0aW9ucyxcclxuICBCc0RhdGVwaWNrZXJWaWV3TW9kZSxcclxuICBEYXRlcGlja2VyRGF0ZUN1c3RvbUNsYXNzZXMsXHJcbiAgRGF0ZXBpY2tlckRhdGVUb29sdGlwVGV4dFxyXG59IGZyb20gJy4vbW9kZWxzJztcclxuaW1wb3J0IHsgQnNDdXN0b21EYXRlcyB9IGZyb20gJy4vdGhlbWVzL2JzL2JzLWN1c3RvbS1kYXRlcy12aWV3LmNvbXBvbmVudCc7XHJcblxyXG5cclxuLyoqXHJcbiAqIEZvciBkYXRlIHJhbmdlIHBpY2tlciB0aGVyZSBhcmUgYEJzRGF0ZXJhbmdlcGlja2VyQ29uZmlnYCB3aGljaCBpbmhlcml0cyBhbGwgcHJvcGVydGllcyxcclxuICogZXhjZXB0IGBkaXNwbGF5TW9udGhzYCwgZm9yIHJhbmdlIHBpY2tlciBpdCBkZWZhdWx0IHRvIGAyYFxyXG4gKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQnNEYXRlcGlja2VyQ29uZmlnIGltcGxlbWVudHMgRGF0ZXBpY2tlclJlbmRlck9wdGlvbnMge1xyXG4gIC8qKiBzZXRzIHVzZSBhZGFwdGl2ZSBwb3NpdGlvbiAqL1xyXG4gIGFkYXB0aXZlUG9zaXRpb24gPSBmYWxzZTtcclxuICAvKiogc2V0cyB1c2UgVVRDIGRhdGUgdGltZSBmb3JtYXQgKi9cclxuICB1c2VVdGMgPSBmYWxzZTtcclxuICAvKiogdHVybiBvbi9vZmYgYW5pbWF0aW9uICovXHJcbiAgaXNBbmltYXRlZCA9IGZhbHNlO1xyXG4gIHZhbHVlPzogRGF0ZSB8IERhdGVbXTtcclxuICBpc0Rpc2FibGVkPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBEZWZhdWx0IG1pbiBkYXRlIGZvciBhbGwgZGF0ZS9yYW5nZSBwaWNrZXJzXHJcbiAgICovXHJcbiAgbWluRGF0ZT86IERhdGU7XHJcbiAgLyoqXHJcbiAgICogRGVmYXVsdCBtYXggZGF0ZSBmb3IgYWxsIGRhdGUvcmFuZ2UgcGlja2Vyc1xyXG4gICAqL1xyXG4gIG1heERhdGU/OiBEYXRlO1xyXG4gIC8qKlxyXG4gICAqIFRoZSB2aWV3IHRoYXQgdGhlIGRhdGVwaWNrZXIgc2hvdWxkIHN0YXJ0IGluXHJcbiAgICovXHJcbiAgc3RhcnRWaWV3OiBCc0RhdGVwaWNrZXJWaWV3TW9kZSA9ICdkYXknO1xyXG4gIC8qKlxyXG4gICAqIERlZmF1bHQgZGF0ZSBjdXN0b20gY2xhc3NlcyBmb3IgYWxsIGRhdGUvcmFuZ2UgcGlja2Vyc1xyXG4gICAqL1xyXG4gIGRhdGVDdXN0b21DbGFzc2VzPzogRGF0ZXBpY2tlckRhdGVDdXN0b21DbGFzc2VzW107XHJcbiAgLyoqXHJcbiAgICogRGVmYXVsdCB0b29sdGlwIHRleHQgZm9yIGFsbCBkYXRlL3JhbmdlIHBpY2tlcnNcclxuICAgKi9cclxuICBkYXRlVG9vbHRpcFRleHRzPzogRGF0ZXBpY2tlckRhdGVUb29sdGlwVGV4dFtdO1xyXG4gIC8qKlxyXG4gICAqIERpc2FibGUgc3BlY2lmaWMgZGF5cywgZS5nLiBbMCw2XSB3aWxsIGRpc2FibGUgYWxsIFNhdHVyZGF5cyBhbmQgU3VuZGF5c1xyXG4gICAqL1xyXG4gIGRheXNEaXNhYmxlZD86IG51bWJlcltdO1xyXG4gIC8qKlxyXG4gICAqIERpc2FibGUgc3BlY2lmaWMgZGF0ZXNcclxuICAgKi9cclxuICBkYXRlc0Rpc2FibGVkPzogRGF0ZVtdO1xyXG4gIC8qKlxyXG4gICAqIFNob3cgb25lIG1vbnRocyBmb3Igc3BlY2lhbCBjYXNlcyAob25seSBmb3IgZGF0ZVJhbmdlUGlja2VyKVxyXG4gICAqIDEuIG1heERhdGUgaXMgZXF1YWwgdG8gdG9kYXkncyBkYXRlXHJcbiAgICogMi4gbWluRGF0ZSdzIG1vbnRoIGlzIGVxdWFsIHRvIG1heERhdGUncyBtb250aFxyXG4gICAqL1xyXG4gIGRpc3BsYXlPbmVNb250aFJhbmdlPzogYm9vbGVhbjtcclxuICAvKipcclxuICAgKiBFbmFibGUgc3BlY2lmaWMgZGF0ZXNcclxuICAgKi9cclxuICBkYXRlc0VuYWJsZWQ/OiBEYXRlW107XHJcbiAgLyoqXHJcbiAgICogTWFrZXMgZGF0ZXMgZnJvbSBvdGhlciBtb250aHMgYWN0aXZlXHJcbiAgICovXHJcbiAgc2VsZWN0RnJvbU90aGVyTW9udGg/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBBbGxvd3Mgc2VsZWN0IGZpcnN0IGRhdGUgb2YgdGhlIHdlZWsgYnkgY2xpY2sgb24gd2VlayBudW1iZXJcclxuICAgKi9cclxuICBzZWxlY3RXZWVrPzogYm9vbGVhbjtcclxuXHJcbiAgLyoqXHJcbiAgICogQWxsb3dzIHNlbGVjdCBkYXRlcmFuZ2UgYXMgZmlyc3QgYW5kIGxhc3QgZGF5IG9mIHdlZWsgYnkgY2xpY2sgb24gd2VlayBudW1iZXIgKGRhdGVSYW5nZVBpY2tlciBvbmx5KVxyXG4gICAqL1xyXG4gIHNlbGVjdFdlZWtEYXRlUmFuZ2U/OiBib29sZWFuO1xyXG5cclxuICAvKipcclxuICAgKiBTaG93cyBwcmV2aW91cyBhbmQgY3VycmVudCBtb250aCwgaW5zdGVhZCBvZiBjdXJyZW50IGFuZCBuZXh0IChkYXRlUmFuZ2VQaWNrZXIgb25seSlcclxuICAgKi9cclxuICBzaG93UHJldmlvdXNNb250aD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIFByZXZlbnRzIGNoYW5nZSB0byBuZXh0IG1vbnRoIGZvciByaWdodCBjYWxlbmRhciBpbiB0d28gY2FsZW5kYXJzIHZpZXcgKGRhdGVSYW5nZVBpY2tlciBvbmx5KVxyXG4gICAqL1xyXG4gIHByZXZlbnRDaGFuZ2VUb05leHRNb250aD86IGJvb2xlYW47XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBjbGFzcyB0byBjdXJyZW50IGRheVxyXG4gICAqL1xyXG4gIGN1c3RvbVRvZGF5Q2xhc3M/OiBzdHJpbmc7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlZmF1bHQgbW9kZSBmb3IgYWxsIGRhdGUgcGlja2Vyc1xyXG4gICAqL1xyXG4gIG1pbk1vZGU/OiBCc0RhdGVwaWNrZXJWaWV3TW9kZTtcclxuXHJcbiAgLyoqXHJcbiAgICogSWYgdHJ1ZSwgcmV0dXJucyBmb2N1cyB0byB0aGUgZGF0ZXBpY2tlciAvIGRhdGVyYW5nZXBpY2tlciBpbnB1dCBhZnRlciBkYXRlIHNlbGVjdGlvblxyXG4gICAqL1xyXG4gIHJldHVybkZvY3VzVG9JbnB1dCA9IGZhbHNlO1xyXG5cclxuICAvKiogQ1NTIGNsYXNzIHdoaWNoIHdpbGwgYmUgYXBwbGllZCB0byBkYXRlcGlja2VyIGNvbnRhaW5lcixcclxuICAgKiB1c3VhbGx5IHVzZWQgdG8gc2V0IGNvbG9yIHRoZW1lXHJcbiAgICovXHJcbiAgY29udGFpbmVyQ2xhc3MgPSAndGhlbWUtZ3JlZW4nO1xyXG5cclxuICAvLyBEYXRlcGlja2VyUmVuZGVyT3B0aW9uc1xyXG4gIGRpc3BsYXlNb250aHMgPSAxO1xyXG4gIC8qKlxyXG4gICAqIEFsbG93cyB0byBoaWRlIHdlZWsgbnVtYmVycyBpbiBkYXRlcGlja2VyXHJcbiAgICovXHJcbiAgc2hvd1dlZWtOdW1iZXJzID0gdHJ1ZTtcclxuXHJcbiAgZGF0ZUlucHV0Rm9ybWF0ID0gJ0wnO1xyXG4gIC8vIHJhbmdlIHBpY2tlclxyXG4gIHJhbmdlU2VwYXJhdG9yID0gJyAtICc7XHJcbiAgLyoqXHJcbiAgICogRGF0ZSBmb3JtYXQgZm9yIGRhdGUgcmFuZ2UgaW5wdXQgZmllbGRcclxuICAgKi9cclxuICByYW5nZUlucHV0Rm9ybWF0ID0gJ0wnO1xyXG5cclxuICAvKipcclxuICAgKiBQcmVkZWZpbmVkIHJhbmdlc1xyXG4gICAqL1xyXG4gIHJhbmdlcz86IEJzQ3VzdG9tRGF0ZXNbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogTWF4IERhdGUgUmFuZ2UgaW4gZGF5c1xyXG4gICAqL1xyXG4gIG1heERhdGVSYW5nZT86IG51bWJlcjtcclxuXHJcbiAgLy8gRGF0ZXBpY2tlckZvcm1hdE9wdGlvbnNcclxuICBtb250aFRpdGxlID0gJ01NTU0nO1xyXG4gIHllYXJUaXRsZSA9ICdZWVlZJztcclxuICBkYXlMYWJlbCA9ICdEJztcclxuICBtb250aExhYmVsID0gJ01NTU0nO1xyXG4gIHllYXJMYWJlbCA9ICdZWVlZJztcclxuICB3ZWVrTnVtYmVycyA9ICd3JztcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3MgJ3RvZGF5JyBidXR0b25cclxuICAgKi9cclxuICBzaG93VG9kYXlCdXR0b24gPSBmYWxzZTtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvd3MgY2xlYXIgYnV0dG9uXHJcbiAgICovXHJcbiAgc2hvd0NsZWFyQnV0dG9uID0gZmFsc2U7XHJcblxyXG4gIC8qKlxyXG4gICAqIFBvc2l0aW9uaW5nIG9mICd0b2RheScgYnV0dG9uXHJcbiAgICovXHJcbiAgdG9kYXlQb3NpdGlvbiA9ICdjZW50ZXInO1xyXG5cclxuICAvKipcclxuICAgKiBQb3NpdGlvbmluZyBvZiAnY2xlYXInIGJ1dHRvblxyXG4gICAqL1xyXG4gIGNsZWFyUG9zaXRpb24gPSAncmlnaHQnO1xyXG5cclxuICAvKipcclxuICAgKiBMYWJlbCBmb3IgJ3RvZGF5JyBidXR0b25cclxuICAgKi9cclxuICB0b2RheUJ1dHRvbkxhYmVsID0gJ1RvZGF5JztcclxuXHJcbiAgLyoqXHJcbiAgICogTGFiZWwgZm9yICdjbGVhcicgYnV0dG9uXHJcbiAgICovXHJcbiAgY2xlYXJCdXR0b25MYWJlbCA9ICdDbGVhcic7XHJcblxyXG4gIC8qKlxyXG4gICAqIExhYmVsIGZvciAnY3VzdG9tIHJhbmdlJyBidXR0b25cclxuICAgKi9cclxuICBjdXN0b21SYW5nZUJ1dHRvbkxhYmVsID0gJ0N1c3RvbSBSYW5nZSc7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3dzIHRpbWVwaWNrZXIgdW5kZXIgZGF0ZXBpY2tlclxyXG4gICAqL1xyXG4gIHdpdGhUaW1lcGlja2VyID0gZmFsc2U7XHJcbiAgLyoqXHJcbiAgICogU2V0IGN1cnJlbnQgaG91cnMsIG1pbnV0ZXMsIHNlY29uZHMgYW5kIG1pbGxpc2Vjb25kcyBmb3IgYnNWYWx1ZVxyXG4gICAqL1xyXG4gIGluaXRDdXJyZW50VGltZT86IGJvb2xlYW47XHJcbiAgLyoqXHJcbiAgICogU2V0IGFsbG93ZWQgcG9zaXRpb25zIG9mIGNvbnRhaW5lci5cclxuICAgKi9cclxuICBhbGxvd2VkUG9zaXRpb25zID0gWyd0b3AnLCAnYm90dG9tJ107XHJcbiAgLyoqXHJcbiAgICogU2V0IHJ1bGUgZm9yIGRhdGVwaWNrZXIgY2xvc2luZy4gSWYgdmFsdWUgaXMgdHJ1ZSBkYXRlcGlja2VyIGNsb3NlcyBvbmx5IGlmIGRhdGUgaXMgY2hhbmdlZCwgaWYgdXNlciBjaGFuZ2VzIG9ubHkgdGltZSBkYXRlcGlja2VyIGRvZXNuJ3QgY2xvc2UuIEl0IGlzIGF2YWlsYWJsZSBvbmx5IGlmIHByb3BlcnR5IHdpdGhUaW1lcGlja2VyIGlzIHNldCB0cnVlXHJcbiAgICogKi9cclxuICBrZWVwRGF0ZXBpY2tlck9wZW5lZCA9IGZhbHNlO1xyXG4gIC8qKlxyXG4gICAqIEFsbG93cyBrZWVwIGludmFsaWQgZGF0ZXMgaW4gcmFuZ2UuIENhbiBiZSB1c2VkIHdpdGggbWluRGF0ZSwgbWF4RGF0ZVxyXG4gICAqICovXHJcbiAga2VlcERhdGVzT3V0T2ZSdWxlcyA9IGZhbHNlO1xyXG59XHJcbiJdfQ==