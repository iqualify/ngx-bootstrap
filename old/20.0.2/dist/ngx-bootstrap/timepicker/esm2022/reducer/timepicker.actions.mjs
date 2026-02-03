import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class TimepickerActions {
    static { this.WRITE_VALUE = '[timepicker] write value from ng model'; }
    static { this.CHANGE_HOURS = '[timepicker] change hours'; }
    static { this.CHANGE_MINUTES = '[timepicker] change minutes'; }
    static { this.CHANGE_SECONDS = '[timepicker] change seconds'; }
    static { this.SET_TIME_UNIT = '[timepicker] set time unit'; }
    static { this.UPDATE_CONTROLS = '[timepicker] update controls'; }
    writeValue(value) {
        return {
            type: TimepickerActions.WRITE_VALUE,
            payload: value
        };
    }
    changeHours(event) {
        return {
            type: TimepickerActions.CHANGE_HOURS,
            payload: event
        };
    }
    changeMinutes(event) {
        return {
            type: TimepickerActions.CHANGE_MINUTES,
            payload: event
        };
    }
    changeSeconds(event) {
        return {
            type: TimepickerActions.CHANGE_SECONDS,
            payload: event
        };
    }
    setTime(value) {
        return {
            type: TimepickerActions.SET_TIME_UNIT,
            payload: value
        };
    }
    updateControls(value) {
        return {
            type: TimepickerActions.UPDATE_CONTROLS,
            payload: value
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TimepickerActions, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TimepickerActions, providedIn: 'platform' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TimepickerActions, decorators: [{
            type: Injectable,
            args: [{ providedIn: 'platform' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXBpY2tlci5hY3Rpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3RpbWVwaWNrZXIvcmVkdWNlci90aW1lcGlja2VyLmFjdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFTM0MsTUFBTSxPQUFPLGlCQUFpQjthQUNaLGdCQUFXLEdBQUcsd0NBQXdDLEFBQTNDLENBQTRDO2FBQ3ZELGlCQUFZLEdBQUcsMkJBQTJCLEFBQTlCLENBQStCO2FBQzNDLG1CQUFjLEdBQUcsNkJBQTZCLEFBQWhDLENBQWlDO2FBQy9DLG1CQUFjLEdBQUcsNkJBQTZCLEFBQWhDLENBQWlDO2FBQy9DLGtCQUFhLEdBQUcsNEJBQTRCLEFBQS9CLENBQWdDO2FBQzdDLG9CQUFlLEdBQUcsOEJBQThCLEFBQWpDLENBQWtDO0lBRWpFLFVBQVUsQ0FBQyxLQUFxQjtRQUM5QixPQUFPO1lBQ0wsSUFBSSxFQUFFLGlCQUFpQixDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFzQjtRQUNoQyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGlCQUFpQixDQUFDLFlBQVk7WUFDcEMsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDO0lBQ0osQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFzQjtRQUNsQyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGlCQUFpQixDQUFDLGNBQWM7WUFDdEMsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDO0lBQ0osQ0FBQztJQUVELGFBQWEsQ0FBQyxLQUFzQjtRQUNsQyxPQUFPO1lBQ0wsSUFBSSxFQUFFLGlCQUFpQixDQUFDLGNBQWM7WUFDdEMsT0FBTyxFQUFFLEtBQUs7U0FDZixDQUFDO0lBQ0osQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFXO1FBQ2pCLE9BQU87WUFDTCxJQUFJLEVBQUUsaUJBQWlCLENBQUMsYUFBYTtZQUNyQyxPQUFPLEVBQUUsS0FBSztTQUNmLENBQUM7SUFDSixDQUFDO0lBRUQsY0FBYyxDQUFDLEtBQStCO1FBQzVDLE9BQU87WUFDTCxJQUFJLEVBQUUsaUJBQWlCLENBQUMsZUFBZTtZQUN2QyxPQUFPLEVBQUUsS0FBSztTQUNmLENBQUM7SUFDSixDQUFDOzhHQWhEVSxpQkFBaUI7a0hBQWpCLGlCQUFpQixjQURMLFVBQVU7OzJGQUN0QixpQkFBaUI7a0JBRDdCLFVBQVU7bUJBQUMsRUFBQyxVQUFVLEVBQUUsVUFBVSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICduZ3gtYm9vdHN0cmFwL21pbmktbmdyeCc7XHJcbmltcG9ydCB7XHJcbiAgVGltZUNoYW5nZUV2ZW50LFxyXG4gIFRpbWVwaWNrZXJDb21wb25lbnRTdGF0ZSxcclxuICBUaW1lXHJcbn0gZnJvbSAnLi4vdGltZXBpY2tlci5tb2RlbHMnO1xyXG5cclxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdwbGF0Zm9ybSd9KVxyXG5leHBvcnQgY2xhc3MgVGltZXBpY2tlckFjdGlvbnMge1xyXG4gIHN0YXRpYyByZWFkb25seSBXUklURV9WQUxVRSA9ICdbdGltZXBpY2tlcl0gd3JpdGUgdmFsdWUgZnJvbSBuZyBtb2RlbCc7XHJcbiAgc3RhdGljIHJlYWRvbmx5IENIQU5HRV9IT1VSUyA9ICdbdGltZXBpY2tlcl0gY2hhbmdlIGhvdXJzJztcclxuICBzdGF0aWMgcmVhZG9ubHkgQ0hBTkdFX01JTlVURVMgPSAnW3RpbWVwaWNrZXJdIGNoYW5nZSBtaW51dGVzJztcclxuICBzdGF0aWMgcmVhZG9ubHkgQ0hBTkdFX1NFQ09ORFMgPSAnW3RpbWVwaWNrZXJdIGNoYW5nZSBzZWNvbmRzJztcclxuICBzdGF0aWMgcmVhZG9ubHkgU0VUX1RJTUVfVU5JVCA9ICdbdGltZXBpY2tlcl0gc2V0IHRpbWUgdW5pdCc7XHJcbiAgc3RhdGljIHJlYWRvbmx5IFVQREFURV9DT05UUk9MUyA9ICdbdGltZXBpY2tlcl0gdXBkYXRlIGNvbnRyb2xzJztcclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZT86IERhdGUgfCBzdHJpbmcpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHR5cGU6IFRpbWVwaWNrZXJBY3Rpb25zLldSSVRFX1ZBTFVFLFxyXG4gICAgICBwYXlsb2FkOiB2YWx1ZVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNoYW5nZUhvdXJzKGV2ZW50OiBUaW1lQ2hhbmdlRXZlbnQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHR5cGU6IFRpbWVwaWNrZXJBY3Rpb25zLkNIQU5HRV9IT1VSUyxcclxuICAgICAgcGF5bG9hZDogZXZlbnRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VNaW51dGVzKGV2ZW50OiBUaW1lQ2hhbmdlRXZlbnQpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHR5cGU6IFRpbWVwaWNrZXJBY3Rpb25zLkNIQU5HRV9NSU5VVEVTLFxyXG4gICAgICBwYXlsb2FkOiBldmVudFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGNoYW5nZVNlY29uZHMoZXZlbnQ6IFRpbWVDaGFuZ2VFdmVudCk6IEFjdGlvbiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBUaW1lcGlja2VyQWN0aW9ucy5DSEFOR0VfU0VDT05EUyxcclxuICAgICAgcGF5bG9hZDogZXZlbnRcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBzZXRUaW1lKHZhbHVlOiBUaW1lKTogQWN0aW9uIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHR5cGU6IFRpbWVwaWNrZXJBY3Rpb25zLlNFVF9USU1FX1VOSVQsXHJcbiAgICAgIHBheWxvYWQ6IHZhbHVlXHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgdXBkYXRlQ29udHJvbHModmFsdWU6IFRpbWVwaWNrZXJDb21wb25lbnRTdGF0ZSk6IEFjdGlvbiB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICB0eXBlOiBUaW1lcGlja2VyQWN0aW9ucy5VUERBVEVfQ09OVFJPTFMsXHJcbiAgICAgIHBheWxvYWQ6IHZhbHVlXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=