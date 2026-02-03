import { ChangeDetectorRef, ContentChildren, Directive, forwardRef, HostBinding, HostListener, QueryList } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ButtonRadioDirective } from './button-radio.directive';
import * as i0 from "@angular/core";
export const RADIO_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ButtonRadioGroupDirective),
    multi: true
};
/**
 * A group of radio buttons.
 * A value of a selected button is bound to a variable specified via ngModel.
 */
export class ButtonRadioGroupDirective {
    constructor(cdr) {
        this.cdr = cdr;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.role = 'radiogroup';
        this._disabled = false;
    }
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
        this.onChange(value);
    }
    get disabled() {
        return this._disabled;
    }
    get tabindex() {
        if (this._disabled) {
            return null;
        }
        else {
            return 0;
        }
    }
    writeValue(value) {
        this._value = value;
        this.cdr.markForCheck();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(disabled) {
        if (this.radioButtons) {
            this._disabled = disabled;
            this.radioButtons.forEach(buttons => {
                buttons.setDisabledState(disabled);
            });
            this.cdr.markForCheck();
        }
    }
    onFocus() {
        if (this._disabled) {
            return;
        }
        const activeRadio = this.getActiveOrFocusedRadio();
        if (activeRadio) {
            activeRadio.focus();
            return;
        }
        if (this.radioButtons) {
            const firstEnabled = this.radioButtons.find(r => !r.disabled);
            if (firstEnabled) {
                firstEnabled.focus();
            }
        }
    }
    onBlur() {
        if (this.onTouched) {
            this.onTouched();
        }
    }
    selectNext(event) {
        this.selectInDirection('next');
        event.preventDefault();
    }
    selectPrevious(event) {
        this.selectInDirection('previous');
        event.preventDefault();
    }
    selectInDirection(direction) {
        if (this._disabled) {
            return;
        }
        function nextIndex(currentIndex, buttonRadioDirectives) {
            const step = direction === 'next' ? 1 : -1;
            let calcIndex = (currentIndex + step) % buttonRadioDirectives.length;
            if (calcIndex < 0) {
                calcIndex = buttonRadioDirectives.length - 1;
            }
            return calcIndex;
        }
        const activeRadio = this.getActiveOrFocusedRadio();
        if (activeRadio && this.radioButtons) {
            const buttonRadioDirectives = this.radioButtons.toArray();
            const currentActiveIndex = buttonRadioDirectives.indexOf(activeRadio);
            for (let i = nextIndex(currentActiveIndex, buttonRadioDirectives); i !== currentActiveIndex; i = nextIndex(i, buttonRadioDirectives)) {
                if (buttonRadioDirectives[i].canToggle()) {
                    buttonRadioDirectives[i].toggleIfAllowed();
                    buttonRadioDirectives[i].focus();
                    break;
                }
            }
        }
    }
    getActiveOrFocusedRadio() {
        if (!this.radioButtons) {
            return void 0;
        }
        return this.radioButtons.find(button => button.isActive)
            || this.radioButtons.find(button => button.hasFocus);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ButtonRadioGroupDirective, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.1", type: ButtonRadioGroupDirective, selector: "[btnRadioGroup]", host: { listeners: { "focus": "onFocus()", "blur": "onBlur()", "keydown.ArrowRight": "selectNext($event)", "keydown.ArrowDown": "selectNext($event)", "keydown.ArrowLeft": "selectPrevious($event)", "keydown.ArrowUp": "selectPrevious($event)" }, properties: { "attr.role": "this.role", "attr.tabindex": "this.tabindex" } }, providers: [RADIO_CONTROL_VALUE_ACCESSOR], queries: [{ propertyName: "radioButtons", predicate: i0.forwardRef(() => ButtonRadioDirective) }], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: ButtonRadioGroupDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[btnRadioGroup]',
                    providers: [RADIO_CONTROL_VALUE_ACCESSOR]
                }]
        }], ctorParameters: () => [{ type: i0.ChangeDetectorRef }], propDecorators: { role: [{
                type: HostBinding,
                args: ['attr.role']
            }], radioButtons: [{
                type: ContentChildren,
                args: [forwardRef(() => ButtonRadioDirective)]
            }], tabindex: [{
                type: HostBinding,
                args: ['attr.tabindex']
            }], onFocus: [{
                type: HostListener,
                args: ['focus']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }], selectNext: [{
                type: HostListener,
                args: ['keydown.ArrowRight', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.ArrowDown', ['$event']]
            }], selectPrevious: [{
                type: HostListener,
                args: ['keydown.ArrowLeft', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.ArrowUp', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLXJhZGlvLWdyb3VwLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9idXR0b25zL2J1dHRvbi1yYWRpby1ncm91cC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixXQUFXLEVBQ1gsWUFBWSxFQUVaLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0FBRWhFLE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUFhO0lBQ3BELE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQztJQUN4RCxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFFRjs7O0dBR0c7QUFLSCxNQUFNLE9BQU8seUJBQXlCO0lBU3BDLFlBQW9CLEdBQXNCO1FBQXRCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBUjFDLGFBQVEsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBQzlCLGNBQVMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDO1FBRUksU0FBSSxHQUFXLFlBQVksQ0FBQztRQW1CdkQsY0FBUyxHQUFHLEtBQUssQ0FBQztJQWIxQixDQUFDO0lBSUQsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUEwQjtRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFJRCxJQUFJLFFBQVE7UUFD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QUFvQjs7MkZBTjNDLHlCQUF5QjtrQkFKckMsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixTQUFTLEVBQUUsQ0FBQyw0QkFBNEIsQ0FBQztpQkFDMUM7c0ZBS29DLElBQUk7c0JBQXRDLFdBQVc7dUJBQUMsV0FBVztnQkFHeEIsWUFBWTtzQkFEWCxlQUFlO3VCQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztnQkF3Qm5ELFFBQVE7c0JBRFgsV0FBVzt1QkFBQyxlQUFlO2dCQWlDNUIsT0FBTztzQkFETixZQUFZO3VCQUFDLE9BQU87Z0JBb0JyQixNQUFNO3NCQURMLFlBQVk7dUJBQUMsTUFBTTtnQkFTcEIsVUFBVTtzQkFGVCxZQUFZO3VCQUFDLG9CQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDOztzQkFDN0MsWUFBWTt1QkFBQyxtQkFBbUIsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFRN0MsY0FBYztzQkFGYixZQUFZO3VCQUFDLG1CQUFtQixFQUFFLENBQUMsUUFBUSxDQUFDOztzQkFDNUMsWUFBWTt1QkFBQyxpQkFBaUIsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXHJcbiAgQ29udGVudENoaWxkcmVuLFxyXG4gIERpcmVjdGl2ZSxcclxuICBmb3J3YXJkUmVmLFxyXG4gIEhvc3RCaW5kaW5nLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBQcm92aWRlcixcclxuICBRdWVyeUxpc3RcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBCdXR0b25SYWRpb0RpcmVjdGl2ZSB9IGZyb20gJy4vYnV0dG9uLXJhZGlvLmRpcmVjdGl2ZSc7XHJcblxyXG5leHBvcnQgY29uc3QgUkFESU9fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUjogUHJvdmlkZXIgPSB7XHJcbiAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQnV0dG9uUmFkaW9Hcm91cERpcmVjdGl2ZSksXHJcbiAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBIGdyb3VwIG9mIHJhZGlvIGJ1dHRvbnMuXHJcbiAqIEEgdmFsdWUgb2YgYSBzZWxlY3RlZCBidXR0b24gaXMgYm91bmQgdG8gYSB2YXJpYWJsZSBzcGVjaWZpZWQgdmlhIG5nTW9kZWwuXHJcbiAqL1xyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1tidG5SYWRpb0dyb3VwXScsXHJcbiAgcHJvdmlkZXJzOiBbUkFESU9fQ09OVFJPTF9WQUxVRV9BQ0NFU1NPUl1cclxufSlcclxuZXhwb3J0IGNsYXNzIEJ1dHRvblJhZGlvR3JvdXBEaXJlY3RpdmUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XHJcbiAgb25DaGFuZ2UgPSBGdW5jdGlvbi5wcm90b3R5cGU7XHJcbiAgb25Ub3VjaGVkID0gRnVuY3Rpb24ucHJvdG90eXBlO1xyXG5cclxuICBASG9zdEJpbmRpbmcoJ2F0dHIucm9sZScpIHJlYWRvbmx5IHJvbGU6IHN0cmluZyA9ICdyYWRpb2dyb3VwJztcclxuXHJcbiAgQENvbnRlbnRDaGlsZHJlbihmb3J3YXJkUmVmKCgpID0+IEJ1dHRvblJhZGlvRGlyZWN0aXZlKSlcclxuICByYWRpb0J1dHRvbnM/OiBRdWVyeUxpc3Q8QnV0dG9uUmFkaW9EaXJlY3RpdmU+O1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3ZhbHVlPzogdW5rbm93bjtcclxuXHJcbiAgZ2V0IHZhbHVlKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gIH1cclxuXHJcbiAgc2V0IHZhbHVlKHZhbHVlOiB1bmtub3duIHwgdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xyXG4gICAgdGhpcy5vbkNoYW5nZSh2YWx1ZSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XHJcbiAgfVxyXG5cclxuICBASG9zdEJpbmRpbmcoJ2F0dHIudGFiaW5kZXgnKVxyXG4gIGdldCB0YWJpbmRleCgpOiBudWxsIHwgbnVtYmVyIHtcclxuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgd3JpdGVWYWx1ZSh2YWx1ZT86IHN0cmluZyk6IHZvaWQge1xyXG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcclxuICAgIHRoaXMuY2RyLm1hcmtGb3JDaGVjaygpO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xyXG4gICAgdGhpcy5vbkNoYW5nZSA9IGZuO1xyXG4gIH1cclxuXHJcbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkID0gZm47XHJcbiAgfVxyXG5cclxuICBzZXREaXNhYmxlZFN0YXRlKGRpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5yYWRpb0J1dHRvbnMpIHtcclxuICAgICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZDtcclxuICAgICAgdGhpcy5yYWRpb0J1dHRvbnMuZm9yRWFjaChidXR0b25zID0+IHtcclxuICAgICAgICBidXR0b25zLnNldERpc2FibGVkU3RhdGUoZGlzYWJsZWQpO1xyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5jZHIubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdmb2N1cycpXHJcbiAgb25Gb2N1cygpIHtcclxuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBjb25zdCBhY3RpdmVSYWRpbyA9IHRoaXMuZ2V0QWN0aXZlT3JGb2N1c2VkUmFkaW8oKTtcclxuICAgIGlmIChhY3RpdmVSYWRpbykge1xyXG4gICAgICBhY3RpdmVSYWRpby5mb2N1cygpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMucmFkaW9CdXR0b25zKSB7XHJcbiAgICAgIGNvbnN0IGZpcnN0RW5hYmxlZCA9IHRoaXMucmFkaW9CdXR0b25zLmZpbmQociA9PiAhci5kaXNhYmxlZCk7XHJcbiAgICAgIGlmIChmaXJzdEVuYWJsZWQpIHtcclxuICAgICAgICBmaXJzdEVuYWJsZWQuZm9jdXMoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignYmx1cicpXHJcbiAgb25CbHVyKCkge1xyXG4gICAgaWYgKHRoaXMub25Ub3VjaGVkKSB7XHJcbiAgICAgIHRoaXMub25Ub3VjaGVkKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdrZXlkb3duLkFycm93UmlnaHQnLCBbJyRldmVudCddKVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uQXJyb3dEb3duJywgWyckZXZlbnQnXSlcclxuICBzZWxlY3ROZXh0KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcbiAgICB0aGlzLnNlbGVjdEluRGlyZWN0aW9uKCduZXh0Jyk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5BcnJvd0xlZnQnLCBbJyRldmVudCddKVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uQXJyb3dVcCcsIFsnJGV2ZW50J10pXHJcbiAgc2VsZWN0UHJldmlvdXMoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuICAgIHRoaXMuc2VsZWN0SW5EaXJlY3Rpb24oJ3ByZXZpb3VzJyk7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZWxlY3RJbkRpcmVjdGlvbihkaXJlY3Rpb246ICduZXh0JyB8ICdwcmV2aW91cycpIHtcclxuICAgIGlmICh0aGlzLl9kaXNhYmxlZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbmV4dEluZGV4KGN1cnJlbnRJbmRleDogbnVtYmVyLCBidXR0b25SYWRpb0RpcmVjdGl2ZXM6IEJ1dHRvblJhZGlvRGlyZWN0aXZlW10pIHtcclxuICAgICAgY29uc3Qgc3RlcCA9IGRpcmVjdGlvbiA9PT0gJ25leHQnID8gMSA6IC0xO1xyXG4gICAgICBsZXQgY2FsY0luZGV4ID0gKGN1cnJlbnRJbmRleCArIHN0ZXApICUgYnV0dG9uUmFkaW9EaXJlY3RpdmVzLmxlbmd0aDtcclxuICAgICAgaWYgKGNhbGNJbmRleCA8IDApIHtcclxuICAgICAgICBjYWxjSW5kZXggPSBidXR0b25SYWRpb0RpcmVjdGl2ZXMubGVuZ3RoIC0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgcmV0dXJuIGNhbGNJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBhY3RpdmVSYWRpbyA9IHRoaXMuZ2V0QWN0aXZlT3JGb2N1c2VkUmFkaW8oKTtcclxuXHJcbiAgICBpZiAoYWN0aXZlUmFkaW8gJiYgdGhpcy5yYWRpb0J1dHRvbnMpIHtcclxuICAgICAgY29uc3QgYnV0dG9uUmFkaW9EaXJlY3RpdmVzID0gdGhpcy5yYWRpb0J1dHRvbnMudG9BcnJheSgpO1xyXG4gICAgICBjb25zdCBjdXJyZW50QWN0aXZlSW5kZXggPSBidXR0b25SYWRpb0RpcmVjdGl2ZXMuaW5kZXhPZihhY3RpdmVSYWRpbyk7XHJcbiAgICAgIGZvciAoXHJcbiAgICAgICAgbGV0IGkgPSBuZXh0SW5kZXgoY3VycmVudEFjdGl2ZUluZGV4LCBidXR0b25SYWRpb0RpcmVjdGl2ZXMpO1xyXG4gICAgICAgIGkgIT09IGN1cnJlbnRBY3RpdmVJbmRleDtcclxuICAgICAgICBpID0gbmV4dEluZGV4KGksIGJ1dHRvblJhZGlvRGlyZWN0aXZlcylcclxuICAgICAgKSB7XHJcbiAgICAgICAgaWYgKGJ1dHRvblJhZGlvRGlyZWN0aXZlc1tpXS5jYW5Ub2dnbGUoKSkge1xyXG4gICAgICAgICAgYnV0dG9uUmFkaW9EaXJlY3RpdmVzW2ldLnRvZ2dsZUlmQWxsb3dlZCgpO1xyXG4gICAgICAgICAgYnV0dG9uUmFkaW9EaXJlY3RpdmVzW2ldLmZvY3VzKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0QWN0aXZlT3JGb2N1c2VkUmFkaW8oKTogQnV0dG9uUmFkaW9EaXJlY3RpdmUgfCB1bmRlZmluZWQge1xyXG4gICAgaWYgKCF0aGlzLnJhZGlvQnV0dG9ucykge1xyXG4gICAgICByZXR1cm4gdm9pZCAwO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLnJhZGlvQnV0dG9ucy5maW5kKGJ1dHRvbiA9PiBidXR0b24uaXNBY3RpdmUpXHJcbiAgICAgIHx8IHRoaXMucmFkaW9CdXR0b25zLmZpbmQoYnV0dG9uID0+IGJ1dHRvbi5oYXNGb2N1cyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==