function defaultParsingFlags() {
    // We need to deep clone this object.
    return {
        empty: false,
        unusedTokens: [],
        unusedInput: [],
        overflow: -2,
        charsLeftOver: 0,
        nullInput: false,
        invalidMonth: null,
        invalidFormat: false,
        userInvalidated: false,
        iso: false,
        parsedDateParts: [],
        meridiem: null,
        rfc2822: false,
        weekdayMismatch: false
    };
}
export function getParsingFlags(config) {
    if (config._pf == null) {
        config._pf = defaultParsingFlags();
    }
    return config._pf;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyc2luZy1mbGFncy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jaHJvbm9zL2NyZWF0ZS9wYXJzaW5nLWZsYWdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLFNBQVMsbUJBQW1CO0lBQzFCLHFDQUFxQztJQUNyQyxPQUFPO1FBQ0wsS0FBSyxFQUFFLEtBQUs7UUFDWixZQUFZLEVBQUUsRUFBRTtRQUNoQixXQUFXLEVBQUUsRUFBRTtRQUNmLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDWixhQUFhLEVBQUUsQ0FBQztRQUNoQixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsSUFBSTtRQUNsQixhQUFhLEVBQUUsS0FBSztRQUNwQixlQUFlLEVBQUUsS0FBSztRQUN0QixHQUFHLEVBQUUsS0FBSztRQUNWLGVBQWUsRUFBRSxFQUFFO1FBQ25CLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEtBQUs7UUFDZCxlQUFlLEVBQUUsS0FBSztLQUN2QixDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxlQUFlLENBQUMsTUFBeUI7SUFDdkQsSUFBSSxNQUFNLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxHQUFHLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBRUQsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEYXRlUGFyc2luZ0NvbmZpZywgRGF0ZVBhcnNpbmdGbGFncyB9IGZyb20gJy4vcGFyc2luZy50eXBlcyc7XHJcblxyXG5mdW5jdGlvbiBkZWZhdWx0UGFyc2luZ0ZsYWdzKCk6IERhdGVQYXJzaW5nRmxhZ3Mge1xyXG4gIC8vIFdlIG5lZWQgdG8gZGVlcCBjbG9uZSB0aGlzIG9iamVjdC5cclxuICByZXR1cm4ge1xyXG4gICAgZW1wdHk6IGZhbHNlLFxyXG4gICAgdW51c2VkVG9rZW5zOiBbXSxcclxuICAgIHVudXNlZElucHV0OiBbXSxcclxuICAgIG92ZXJmbG93OiAtMixcclxuICAgIGNoYXJzTGVmdE92ZXI6IDAsXHJcbiAgICBudWxsSW5wdXQ6IGZhbHNlLFxyXG4gICAgaW52YWxpZE1vbnRoOiBudWxsLFxyXG4gICAgaW52YWxpZEZvcm1hdDogZmFsc2UsXHJcbiAgICB1c2VySW52YWxpZGF0ZWQ6IGZhbHNlLFxyXG4gICAgaXNvOiBmYWxzZSxcclxuICAgIHBhcnNlZERhdGVQYXJ0czogW10sXHJcbiAgICBtZXJpZGllbTogbnVsbCxcclxuICAgIHJmYzI4MjI6IGZhbHNlLFxyXG4gICAgd2Vla2RheU1pc21hdGNoOiBmYWxzZVxyXG4gIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJzaW5nRmxhZ3MoY29uZmlnOiBEYXRlUGFyc2luZ0NvbmZpZyk6IERhdGVQYXJzaW5nRmxhZ3Mge1xyXG4gIGlmIChjb25maWcuX3BmID09IG51bGwpIHtcclxuICAgIGNvbmZpZy5fcGYgPSBkZWZhdWx0UGFyc2luZ0ZsYWdzKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY29uZmlnLl9wZjtcclxufVxyXG4iXX0=