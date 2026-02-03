// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function OnChange() {
    const sufix = 'Change';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function OnChangeHandler(target, propertyKey) {
        const _key = ` __${propertyKey}Value`;
        Object.defineProperty(target, propertyKey, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            get() {
                return this[_key];
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            set(value) {
                const prevValue = this[_key];
                this[_key] = value;
                if (prevValue !== value && this[propertyKey + sufix]) {
                    this[propertyKey + sufix].emit(value);
                }
            }
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy91dGlscy9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhEQUE4RDtBQUM5RCxNQUFNLFVBQVUsUUFBUTtJQUN0QixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUM7SUFFdkIsOERBQThEO0lBQzlELE9BQU8sU0FBUyxlQUFlLENBQUMsTUFBVyxFQUFFLFdBQW1CO1FBQzlELE1BQU0sSUFBSSxHQUFHLE1BQU0sV0FBVyxPQUFPLENBQUM7UUFDdEMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFO1lBQ3pDLDhEQUE4RDtZQUM5RCxHQUFHO2dCQUNELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3BCLENBQUM7WUFDRCw4REFBOEQ7WUFDOUQsR0FBRyxDQUFDLEtBQVU7Z0JBQ1osTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixJQUFJLFNBQVMsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUNyRCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDeEMsQ0FBQztZQUNILENBQUM7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuZXhwb3J0IGZ1bmN0aW9uIE9uQ2hhbmdlKCk6IGFueSB7XHJcbiAgY29uc3Qgc3VmaXggPSAnQ2hhbmdlJztcclxuXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICByZXR1cm4gZnVuY3Rpb24gT25DaGFuZ2VIYW5kbGVyKHRhcmdldDogYW55LCBwcm9wZXJ0eUtleTogc3RyaW5nKTogdm9pZCB7XHJcbiAgICBjb25zdCBfa2V5ID0gYCBfXyR7cHJvcGVydHlLZXl9VmFsdWVgO1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcGVydHlLZXksIHtcclxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICAgZ2V0KCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXNbX2tleV07XHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XHJcbiAgICAgIHNldCh2YWx1ZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgY29uc3QgcHJldlZhbHVlID0gdGhpc1tfa2V5XTtcclxuICAgICAgICB0aGlzW19rZXldID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHByZXZWYWx1ZSAhPT0gdmFsdWUgJiYgdGhpc1twcm9wZXJ0eUtleSArIHN1Zml4XSkge1xyXG4gICAgICAgICAgdGhpc1twcm9wZXJ0eUtleSArIHN1Zml4XS5lbWl0KHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuIl19