const priorities = {};
export function addUnitPriority(unit, priority) {
    priorities[unit] = priority;
}
/*
export function getPrioritizedUnits(unitsObj) {
  const units = [];
  let unit;
  for (unit in unitsObj) {
    if (unitsObj.hasOwnProperty(unit)) {
      units.push({ unit, priority: priorities[unit] });
    }
  }
  units.sort(function (a, b) {
    return a.priority - b.priority;
  });

  return units;
}
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpb3JpdGllcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9jaHJvbm9zL3VuaXRzL3ByaW9yaXRpZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxVQUFVLEdBQTRCLEVBQUUsQ0FBQztBQUUvQyxNQUFNLFVBQVUsZUFBZSxDQUFDLElBQVksRUFBRSxRQUFnQjtJQUM1RCxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDO0FBQzlCLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7O0VBZUUiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBwcmlvcml0aWVzOiB7W2tleTogc3RyaW5nXTogbnVtYmVyfSA9IHt9O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVuaXRQcmlvcml0eSh1bml0OiBzdHJpbmcsIHByaW9yaXR5OiBudW1iZXIpOiB2b2lkIHtcclxuICBwcmlvcml0aWVzW3VuaXRdID0gcHJpb3JpdHk7XHJcbn1cclxuXHJcbi8qXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRQcmlvcml0aXplZFVuaXRzKHVuaXRzT2JqKSB7XHJcbiAgY29uc3QgdW5pdHMgPSBbXTtcclxuICBsZXQgdW5pdDtcclxuICBmb3IgKHVuaXQgaW4gdW5pdHNPYmopIHtcclxuICAgIGlmICh1bml0c09iai5oYXNPd25Qcm9wZXJ0eSh1bml0KSkge1xyXG4gICAgICB1bml0cy5wdXNoKHsgdW5pdCwgcHJpb3JpdHk6IHByaW9yaXRpZXNbdW5pdF0gfSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHVuaXRzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgIHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHVuaXRzO1xyXG59XHJcbiovXHJcbiJdfQ==