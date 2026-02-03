import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** Provides default configuration values for timepicker */
export class TimepickerConfig {
    constructor() {
        /** hours change step */
        this.hourStep = 1;
        /** minutes change step */
        this.minuteStep = 5;
        /** seconds changes step */
        this.secondsStep = 10;
        /** if true works in 12H mode and displays AM/PM. If false works in 24H mode and hides AM/PM */
        this.showMeridian = true;
        /** meridian labels based on locale */
        this.meridians = ['AM', 'PM'];
        /** if true hours and minutes fields will be readonly */
        this.readonlyInput = false;
        /** if true hours and minutes fields will be disabled */
        this.disabled = false;
        /** if true emptyTime is not marked as invalid */
        this.allowEmptyTime = false;
        /** if true scroll inside hours and minutes inputs will change time */
        this.mousewheel = true;
        /** if true the values of hours and minutes can be changed using the up/down arrow keys on the keyboard */
        this.arrowkeys = true;
        /** if true spinner arrows above and below the inputs will be shown */
        this.showSpinners = true;
        /** show seconds in timepicker */
        this.showSeconds = false;
        /** show minutes in timepicker */
        this.showMinutes = true;
        /** placeholder for hours field in timepicker */
        this.hoursPlaceholder = 'HH';
        /** placeholder for minutes field in timepicker */
        this.minutesPlaceholder = 'MM';
        /** placeholder for seconds field in timepicker */
        this.secondsPlaceholder = 'SS';
        /** hours aria label */
        this.ariaLabelHours = 'hours';
        /** minutes aria label */
        this.ariaLabelMinutes = 'minutes';
        /** seconds aria label */
        this.ariaLabelSeconds = 'seconds';
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TimepickerConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TimepickerConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TimepickerConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdGltZXBpY2tlci90aW1lcGlja2VyLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUUzQywyREFBMkQ7QUFJM0QsTUFBTSxPQUFPLGdCQUFnQjtJQUg3QjtRQUlFLHdCQUF3QjtRQUN4QixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsMEJBQTBCO1FBQzFCLGVBQVUsR0FBRyxDQUFDLENBQUM7UUFDZiwyQkFBMkI7UUFDM0IsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIsK0ZBQStGO1FBQy9GLGlCQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLHNDQUFzQztRQUN0QyxjQUFTLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekIsd0RBQXdEO1FBQ3hELGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLHdEQUF3RDtRQUN4RCxhQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ2pCLGlEQUFpRDtRQUNqRCxtQkFBYyxHQUFHLEtBQUssQ0FBQztRQUN2QixzRUFBc0U7UUFDdEUsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQiwwR0FBMEc7UUFDMUcsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixzRUFBc0U7UUFDdEUsaUJBQVksR0FBRyxJQUFJLENBQUM7UUFDcEIsaUNBQWlDO1FBQ2pDLGdCQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLGlDQUFpQztRQUNqQyxnQkFBVyxHQUFHLElBQUksQ0FBQztRQUtuQixnREFBZ0Q7UUFDaEQscUJBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLGtEQUFrRDtRQUNsRCx1QkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDMUIsa0RBQWtEO1FBQ2xELHVCQUFrQixHQUFHLElBQUksQ0FBQztRQUMxQix1QkFBdUI7UUFDdkIsbUJBQWMsR0FBRyxPQUFPLENBQUM7UUFDekIseUJBQXlCO1FBQ3pCLHFCQUFnQixHQUFHLFNBQVMsQ0FBQztRQUM3Qix5QkFBeUI7UUFDekIscUJBQWdCLEdBQUcsU0FBUyxDQUFDO0tBQzlCOzhHQTNDWSxnQkFBZ0I7a0hBQWhCLGdCQUFnQixjQUZmLE1BQU07OzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG4vKiogUHJvdmlkZXMgZGVmYXVsdCBjb25maWd1cmF0aW9uIHZhbHVlcyBmb3IgdGltZXBpY2tlciAqL1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUaW1lcGlja2VyQ29uZmlnIHtcclxuICAvKiogaG91cnMgY2hhbmdlIHN0ZXAgKi9cclxuICBob3VyU3RlcCA9IDE7XHJcbiAgLyoqIG1pbnV0ZXMgY2hhbmdlIHN0ZXAgKi9cclxuICBtaW51dGVTdGVwID0gNTtcclxuICAvKiogc2Vjb25kcyBjaGFuZ2VzIHN0ZXAgKi9cclxuICBzZWNvbmRzU3RlcCA9IDEwO1xyXG4gIC8qKiBpZiB0cnVlIHdvcmtzIGluIDEySCBtb2RlIGFuZCBkaXNwbGF5cyBBTS9QTS4gSWYgZmFsc2Ugd29ya3MgaW4gMjRIIG1vZGUgYW5kIGhpZGVzIEFNL1BNICovXHJcbiAgc2hvd01lcmlkaWFuID0gdHJ1ZTtcclxuICAvKiogbWVyaWRpYW4gbGFiZWxzIGJhc2VkIG9uIGxvY2FsZSAqL1xyXG4gIG1lcmlkaWFucyA9IFsnQU0nLCAnUE0nXTtcclxuICAvKiogaWYgdHJ1ZSBob3VycyBhbmQgbWludXRlcyBmaWVsZHMgd2lsbCBiZSByZWFkb25seSAqL1xyXG4gIHJlYWRvbmx5SW5wdXQgPSBmYWxzZTtcclxuICAvKiogaWYgdHJ1ZSBob3VycyBhbmQgbWludXRlcyBmaWVsZHMgd2lsbCBiZSBkaXNhYmxlZCAqL1xyXG4gIGRpc2FibGVkID0gZmFsc2U7XHJcbiAgLyoqIGlmIHRydWUgZW1wdHlUaW1lIGlzIG5vdCBtYXJrZWQgYXMgaW52YWxpZCAqL1xyXG4gIGFsbG93RW1wdHlUaW1lID0gZmFsc2U7XHJcbiAgLyoqIGlmIHRydWUgc2Nyb2xsIGluc2lkZSBob3VycyBhbmQgbWludXRlcyBpbnB1dHMgd2lsbCBjaGFuZ2UgdGltZSAqL1xyXG4gIG1vdXNld2hlZWwgPSB0cnVlO1xyXG4gIC8qKiBpZiB0cnVlIHRoZSB2YWx1ZXMgb2YgaG91cnMgYW5kIG1pbnV0ZXMgY2FuIGJlIGNoYW5nZWQgdXNpbmcgdGhlIHVwL2Rvd24gYXJyb3cga2V5cyBvbiB0aGUga2V5Ym9hcmQgKi9cclxuICBhcnJvd2tleXMgPSB0cnVlO1xyXG4gIC8qKiBpZiB0cnVlIHNwaW5uZXIgYXJyb3dzIGFib3ZlIGFuZCBiZWxvdyB0aGUgaW5wdXRzIHdpbGwgYmUgc2hvd24gKi9cclxuICBzaG93U3Bpbm5lcnMgPSB0cnVlO1xyXG4gIC8qKiBzaG93IHNlY29uZHMgaW4gdGltZXBpY2tlciAqL1xyXG4gIHNob3dTZWNvbmRzID0gZmFsc2U7XHJcbiAgLyoqIHNob3cgbWludXRlcyBpbiB0aW1lcGlja2VyICovXHJcbiAgc2hvd01pbnV0ZXMgPSB0cnVlO1xyXG4gIC8qKiBtaW5pbXVtIHRpbWUgdXNlciBjYW4gc2VsZWN0ICovXHJcbiAgbWluPzogRGF0ZTtcclxuICAvKiogbWF4aW11bSB0aW1lIHVzZXIgY2FuIHNlbGVjdCAqL1xyXG4gIG1heD86IERhdGU7XHJcbiAgLyoqIHBsYWNlaG9sZGVyIGZvciBob3VycyBmaWVsZCBpbiB0aW1lcGlja2VyICovXHJcbiAgaG91cnNQbGFjZWhvbGRlciA9ICdISCc7XHJcbiAgLyoqIHBsYWNlaG9sZGVyIGZvciBtaW51dGVzIGZpZWxkIGluIHRpbWVwaWNrZXIgKi9cclxuICBtaW51dGVzUGxhY2Vob2xkZXIgPSAnTU0nO1xyXG4gIC8qKiBwbGFjZWhvbGRlciBmb3Igc2Vjb25kcyBmaWVsZCBpbiB0aW1lcGlja2VyICovXHJcbiAgc2Vjb25kc1BsYWNlaG9sZGVyID0gJ1NTJztcclxuICAvKiogaG91cnMgYXJpYSBsYWJlbCAqL1xyXG4gIGFyaWFMYWJlbEhvdXJzID0gJ2hvdXJzJztcclxuICAvKiogbWludXRlcyBhcmlhIGxhYmVsICovXHJcbiAgYXJpYUxhYmVsTWludXRlcyA9ICdtaW51dGVzJztcclxuICAvKiogc2Vjb25kcyBhcmlhIGxhYmVsICovXHJcbiAgYXJpYUxhYmVsU2Vjb25kcyA9ICdzZWNvbmRzJztcclxufVxyXG4iXX0=