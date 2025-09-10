import { computeAutoPlacement, getReferenceOffsets, getTargetOffsets } from '../utils';
export function initData(targetElement, hostElement, position, options) {
    if (!targetElement || !hostElement) {
        return;
    }
    const hostElPosition = getReferenceOffsets(targetElement, hostElement);
    if (!position.match(/^(auto)*\s*(left|right|top|bottom|start|end)*$/)
        && !position.match(/^(left|right|top|bottom|start|end)*(?: (left|right|top|bottom|start|end))*$/)) {
        position = 'auto';
    }
    const placementAuto = !!position.match(/auto/g);
    // support old placements 'auto left|right|top|bottom'
    let placement = position.match(/auto\s(left|right|top|bottom|start|end)/)
        ? position.split(' ')[1] || 'auto'
        : position;
    // Normalize placements that have identical main placement and variation ("right right" => "right").
    const matches = placement.match(/^(left|right|top|bottom|start|end)* ?(?!\1)(left|right|top|bottom|start|end)?/);
    if (matches) {
        placement = matches[1] + (matches[2] ? ` ${matches[2]}` : '');
    }
    // "left right", "top bottom" etc. placements also considered incorrect.
    if (['left right', 'right left', 'top bottom', 'bottom top'].indexOf(placement) !== -1) {
        placement = 'auto';
    }
    placement = computeAutoPlacement(placement, hostElPosition, targetElement, hostElement, options ? options.allowedPositions : undefined);
    const targetOffset = getTargetOffsets(targetElement, hostElPosition, placement);
    return {
        options: options || { modifiers: {} },
        instance: {
            target: targetElement,
            host: hostElement,
            arrow: void 0
        },
        offsets: {
            target: targetOffset,
            host: hostElPosition,
            arrow: void 0
        },
        positionFixed: false,
        placement,
        placementAuto
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdERhdGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvcG9zaXRpb25pbmcvbW9kaWZpZXJzL2luaXREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNqQixNQUFNLFVBQVUsQ0FBQztBQUlsQixNQUFNLFVBQVUsUUFBUSxDQUN0QixhQUErQixFQUFFLFdBQTZCLEVBQUUsUUFBZ0IsRUFBRSxPQUFpQjtJQUduRyxJQUFJLENBQUMsYUFBYSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkMsT0FBUTtJQUNWLENBQUM7SUFFRCxNQUFNLGNBQWMsR0FBRyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFdkUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsZ0RBQWdELENBQUM7V0FDaEUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLDZFQUE2RSxDQUFDLEVBQUUsQ0FBQztRQUM1RixRQUFRLEdBQUcsTUFBTSxDQUFDO0lBQzFCLENBQUM7SUFFSCxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVoRCxzREFBc0Q7SUFDdEQsSUFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyx5Q0FBeUMsQ0FBQztRQUN2RSxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxNQUFNO1FBQ2xDLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFFYixvR0FBb0c7SUFDcEcsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQywrRUFBK0UsQ0FBQyxDQUFDO0lBQ2pILElBQUksT0FBTyxFQUFFLENBQUM7UUFDWixTQUFTLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRUQsd0VBQXdFO0lBQ3hFLElBQUksQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN2RixTQUFTLEdBQUcsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxTQUFTLEdBQUcsb0JBQW9CLENBQzlCLFNBQVMsRUFDVCxjQUFjLEVBQ2QsYUFBYSxFQUNiLFdBQVcsRUFDWCxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUMvQyxDQUFDO0lBRUYsTUFBTSxZQUFZLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUVoRixPQUFPO1FBQ0wsT0FBTyxFQUFFLE9BQU8sSUFBSSxFQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUM7UUFDbkMsUUFBUSxFQUFFO1lBQ1IsTUFBTSxFQUFFLGFBQWE7WUFDckIsSUFBSSxFQUFFLFdBQVc7WUFDakIsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsTUFBTSxFQUFFLFlBQVk7WUFDcEIsSUFBSSxFQUFFLGNBQWM7WUFDcEIsS0FBSyxFQUFFLEtBQUssQ0FBQztTQUNkO1FBQ0QsYUFBYSxFQUFFLEtBQUs7UUFDcEIsU0FBUztRQUNULGFBQWE7S0FDZCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgY29tcHV0ZUF1dG9QbGFjZW1lbnQsXHJcbiAgZ2V0UmVmZXJlbmNlT2Zmc2V0cyxcclxuICBnZXRUYXJnZXRPZmZzZXRzXHJcbn0gZnJvbSAnLi4vdXRpbHMnO1xyXG5cclxuaW1wb3J0IHsgRGF0YSwgT3B0aW9ucyB9IGZyb20gJy4uL21vZGVscyc7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdERhdGEoXHJcbiAgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnR8bnVsbCwgaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50fG51bGwsIHBvc2l0aW9uOiBzdHJpbmcsIG9wdGlvbnM/OiBPcHRpb25zXHJcbik6IERhdGF8dW5kZWZpbmVkIHtcclxuXHJcbiAgaWYgKCF0YXJnZXRFbGVtZW50IHx8ICFob3N0RWxlbWVudCkge1xyXG4gICAgcmV0dXJuIDtcclxuICB9XHJcblxyXG4gIGNvbnN0IGhvc3RFbFBvc2l0aW9uID0gZ2V0UmVmZXJlbmNlT2Zmc2V0cyh0YXJnZXRFbGVtZW50LCBob3N0RWxlbWVudCk7XHJcblxyXG4gIGlmICghcG9zaXRpb24ubWF0Y2goL14oYXV0bykqXFxzKihsZWZ0fHJpZ2h0fHRvcHxib3R0b218c3RhcnR8ZW5kKSokLylcclxuICAgICYmICFwb3NpdGlvbi5tYXRjaCgvXihsZWZ0fHJpZ2h0fHRvcHxib3R0b218c3RhcnR8ZW5kKSooPzogKGxlZnR8cmlnaHR8dG9wfGJvdHRvbXxzdGFydHxlbmQpKSokLykpIHtcclxuICAgICAgICAgICAgcG9zaXRpb24gPSAnYXV0byc7XHJcbiAgICB9XHJcblxyXG4gIGNvbnN0IHBsYWNlbWVudEF1dG8gPSAhIXBvc2l0aW9uLm1hdGNoKC9hdXRvL2cpO1xyXG5cclxuICAvLyBzdXBwb3J0IG9sZCBwbGFjZW1lbnRzICdhdXRvIGxlZnR8cmlnaHR8dG9wfGJvdHRvbSdcclxuICBsZXQgcGxhY2VtZW50ID0gcG9zaXRpb24ubWF0Y2goL2F1dG9cXHMobGVmdHxyaWdodHx0b3B8Ym90dG9tfHN0YXJ0fGVuZCkvKVxyXG4gICAgPyBwb3NpdGlvbi5zcGxpdCgnICcpWzFdIHx8ICdhdXRvJ1xyXG4gICAgOiBwb3NpdGlvbjtcclxuXHJcbiAgLy8gTm9ybWFsaXplIHBsYWNlbWVudHMgdGhhdCBoYXZlIGlkZW50aWNhbCBtYWluIHBsYWNlbWVudCBhbmQgdmFyaWF0aW9uIChcInJpZ2h0IHJpZ2h0XCIgPT4gXCJyaWdodFwiKS5cclxuICBjb25zdCBtYXRjaGVzID0gcGxhY2VtZW50Lm1hdGNoKC9eKGxlZnR8cmlnaHR8dG9wfGJvdHRvbXxzdGFydHxlbmQpKiA/KD8hXFwxKShsZWZ0fHJpZ2h0fHRvcHxib3R0b218c3RhcnR8ZW5kKT8vKTtcclxuICBpZiAobWF0Y2hlcykge1xyXG4gICAgcGxhY2VtZW50ID0gbWF0Y2hlc1sxXSArIChtYXRjaGVzWzJdID8gYCAke21hdGNoZXNbMl19YCA6ICcnKTtcclxuICB9XHJcblxyXG4gIC8vIFwibGVmdCByaWdodFwiLCBcInRvcCBib3R0b21cIiBldGMuIHBsYWNlbWVudHMgYWxzbyBjb25zaWRlcmVkIGluY29ycmVjdC5cclxuICBpZiAoWydsZWZ0IHJpZ2h0JywgJ3JpZ2h0IGxlZnQnLCAndG9wIGJvdHRvbScsICdib3R0b20gdG9wJ10uaW5kZXhPZihwbGFjZW1lbnQpICE9PSAtMSkge1xyXG4gICAgcGxhY2VtZW50ID0gJ2F1dG8nO1xyXG4gIH1cclxuXHJcbiAgcGxhY2VtZW50ID0gY29tcHV0ZUF1dG9QbGFjZW1lbnQoXHJcbiAgICBwbGFjZW1lbnQsXHJcbiAgICBob3N0RWxQb3NpdGlvbixcclxuICAgIHRhcmdldEVsZW1lbnQsXHJcbiAgICBob3N0RWxlbWVudCxcclxuICAgIG9wdGlvbnMgPyBvcHRpb25zLmFsbG93ZWRQb3NpdGlvbnMgOiB1bmRlZmluZWRcclxuICApO1xyXG5cclxuICBjb25zdCB0YXJnZXRPZmZzZXQgPSBnZXRUYXJnZXRPZmZzZXRzKHRhcmdldEVsZW1lbnQsIGhvc3RFbFBvc2l0aW9uLCBwbGFjZW1lbnQpO1xyXG5cclxuICByZXR1cm4ge1xyXG4gICAgb3B0aW9uczogb3B0aW9ucyB8fCB7bW9kaWZpZXJzOiB7fX0sXHJcbiAgICBpbnN0YW5jZToge1xyXG4gICAgICB0YXJnZXQ6IHRhcmdldEVsZW1lbnQsXHJcbiAgICAgIGhvc3Q6IGhvc3RFbGVtZW50LFxyXG4gICAgICBhcnJvdzogdm9pZCAwXHJcbiAgICB9LFxyXG4gICAgb2Zmc2V0czoge1xyXG4gICAgICB0YXJnZXQ6IHRhcmdldE9mZnNldCxcclxuICAgICAgaG9zdDogaG9zdEVsUG9zaXRpb24sXHJcbiAgICAgIGFycm93OiB2b2lkIDBcclxuICAgIH0sXHJcbiAgICBwb3NpdGlvbkZpeGVkOiBmYWxzZSxcclxuICAgIHBsYWNlbWVudCxcclxuICAgIHBsYWNlbWVudEF1dG9cclxuICB9O1xyXG59XHJcbiJdfQ==