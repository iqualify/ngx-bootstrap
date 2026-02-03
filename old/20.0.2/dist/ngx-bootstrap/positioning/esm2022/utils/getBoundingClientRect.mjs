/**
 * Get bounding client rect of given element
 */
import { getStyleComputedProperty } from './getStyleComputedProperty';
import { getBordersSize } from './getBordersSize';
import { getWindowSizes } from './getWindowSizes';
import { getClientRect } from './getClientRect';
import { isNumber } from './isNumeric';
export function getBoundingClientRect(element) {
    const rect = element.getBoundingClientRect();
    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    // try {
    //   if (isIE(10)) {
    //     const scrollTop = getScroll(element, 'top');
    //     const scrollLeft = getScroll(element, 'left');
    //     if (rect && isNumber(rect.top) && isNumber(rect.left) && isNumber(rect.bottom) && isNumber(rect.right)) {
    //       rect.top += scrollTop;
    //       rect.left += scrollLeft;
    //       rect.bottom += scrollTop;
    //       rect.right += scrollLeft;
    //     }
    //   }
    // } catch (e) {
    //   return rect;
    // }
    if (!(rect && isNumber(rect.top) && isNumber(rect.left) && isNumber(rect.bottom) && isNumber(rect.right))) {
        return rect;
    }
    const result = {
        left: rect.left,
        top: rect.top,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
    };
    // subtract scrollbar size from sizes
    const sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : undefined;
    const width = sizes?.width || element.clientWidth
        || isNumber(rect.right) && isNumber(result.left) && rect.right - result.left || 0;
    const height = sizes?.height || element.clientHeight
        || isNumber(rect.bottom) && isNumber(result.top) && rect.bottom - result.top || 0;
    let horizScrollbar = element.offsetWidth - width;
    let vertScrollbar = element.offsetHeight - height;
    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
        const styles = getStyleComputedProperty(element);
        horizScrollbar -= getBordersSize(styles, 'x');
        vertScrollbar -= getBordersSize(styles, 'y');
        result.width -= horizScrollbar;
        result.height -= vertScrollbar;
    }
    return getClientRect(result);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Qm91bmRpbmdDbGllbnRSZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL3Bvc2l0aW9uaW5nL3V0aWxzL2dldEJvdW5kaW5nQ2xpZW50UmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7R0FFRztBQUNILE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRWhELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFFdkMsTUFBTSxVQUFVLHFCQUFxQixDQUFDLE9BQW9CO0lBQ3hELE1BQU0sSUFBSSxHQUFZLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBRXRELG9EQUFvRDtJQUNwRCw2Q0FBNkM7SUFDN0MsNkRBQTZEO0lBQzdELFFBQVE7SUFDUixvQkFBb0I7SUFDcEIsbURBQW1EO0lBQ25ELHFEQUFxRDtJQUNyRCxnSEFBZ0g7SUFDaEgsK0JBQStCO0lBQy9CLGlDQUFpQztJQUNqQyxrQ0FBa0M7SUFDbEMsa0NBQWtDO0lBQ2xDLFFBQVE7SUFDUixNQUFNO0lBQ04sZ0JBQWdCO0lBQ2hCLGlCQUFpQjtJQUNqQixJQUFJO0lBRUosSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQzFHLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELE1BQU0sTUFBTSxHQUFZO1FBQ3RCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtRQUNmLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztRQUNiLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJO1FBQzdCLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHO0tBQy9CLENBQUM7SUFFRixxQ0FBcUM7SUFDckMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUM5RixNQUFNLEtBQUssR0FBRyxLQUFLLEVBQUUsS0FBSyxJQUFJLE9BQU8sQ0FBQyxXQUFXO1dBQzVDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO0lBQ3BGLE1BQU0sTUFBTSxHQUFHLEtBQUssRUFBRSxNQUFNLElBQUksT0FBTyxDQUFDLFlBQVk7V0FDL0MsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFFcEYsSUFBSSxjQUFjLEdBQUcsT0FBTyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDakQsSUFBSSxhQUFhLEdBQUcsT0FBTyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7SUFFbEQsZ0ZBQWdGO0lBQ2hGLHlEQUF5RDtJQUN6RCxJQUFJLGNBQWMsSUFBSSxhQUFhLEVBQUUsQ0FBQztRQUNwQyxNQUFNLE1BQU0sR0FBRyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxjQUFjLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM5QyxhQUFhLElBQUksY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUU3QyxNQUFNLENBQUMsS0FBSyxJQUFJLGNBQWMsQ0FBQztRQUMvQixNQUFNLENBQUMsTUFBTSxJQUFJLGFBQWEsQ0FBQztJQUNqQyxDQUFDO0lBRUQsT0FBTyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBHZXQgYm91bmRpbmcgY2xpZW50IHJlY3Qgb2YgZ2l2ZW4gZWxlbWVudFxyXG4gKi9cclxuaW1wb3J0IHsgZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5IH0gZnJvbSAnLi9nZXRTdHlsZUNvbXB1dGVkUHJvcGVydHknO1xyXG5pbXBvcnQgeyBnZXRCb3JkZXJzU2l6ZSB9IGZyb20gJy4vZ2V0Qm9yZGVyc1NpemUnO1xyXG5pbXBvcnQgeyBnZXRXaW5kb3dTaXplcyB9IGZyb20gJy4vZ2V0V2luZG93U2l6ZXMnO1xyXG5pbXBvcnQgeyBnZXRDbGllbnRSZWN0IH0gZnJvbSAnLi9nZXRDbGllbnRSZWN0JztcclxuaW1wb3J0IHsgT2Zmc2V0cyB9IGZyb20gJy4uL21vZGVscyc7XHJcbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnLi9pc051bWVyaWMnO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kaW5nQ2xpZW50UmVjdChlbGVtZW50OiBIVE1MRWxlbWVudCk6IE9mZnNldHMge1xyXG4gIGNvbnN0IHJlY3Q6IE9mZnNldHMgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAvLyBJRTEwIDEwIEZJWDogUGxlYXNlLCBkb24ndCBhc2ssIHRoZSBlbGVtZW50IGlzbid0XHJcbiAgLy8gY29uc2lkZXJlZCBpbiBET00gaW4gc29tZSBjaXJjdW1zdGFuY2VzLi4uXHJcbiAgLy8gVGhpcyBpc24ndCByZXByb2R1Y2libGUgaW4gSUUxMCBjb21wYXRpYmlsaXR5IG1vZGUgb2YgSUUxMVxyXG4gIC8vIHRyeSB7XHJcbiAgLy8gICBpZiAoaXNJRSgxMCkpIHtcclxuICAvLyAgICAgY29uc3Qgc2Nyb2xsVG9wID0gZ2V0U2Nyb2xsKGVsZW1lbnQsICd0b3AnKTtcclxuICAvLyAgICAgY29uc3Qgc2Nyb2xsTGVmdCA9IGdldFNjcm9sbChlbGVtZW50LCAnbGVmdCcpO1xyXG4gIC8vICAgICBpZiAocmVjdCAmJiBpc051bWJlcihyZWN0LnRvcCkgJiYgaXNOdW1iZXIocmVjdC5sZWZ0KSAmJiBpc051bWJlcihyZWN0LmJvdHRvbSkgJiYgaXNOdW1iZXIocmVjdC5yaWdodCkpIHtcclxuICAvLyAgICAgICByZWN0LnRvcCArPSBzY3JvbGxUb3A7XHJcbiAgLy8gICAgICAgcmVjdC5sZWZ0ICs9IHNjcm9sbExlZnQ7XHJcbiAgLy8gICAgICAgcmVjdC5ib3R0b20gKz0gc2Nyb2xsVG9wO1xyXG4gIC8vICAgICAgIHJlY3QucmlnaHQgKz0gc2Nyb2xsTGVmdDtcclxuICAvLyAgICAgfVxyXG4gIC8vICAgfVxyXG4gIC8vIH0gY2F0Y2ggKGUpIHtcclxuICAvLyAgIHJldHVybiByZWN0O1xyXG4gIC8vIH1cclxuXHJcbiAgaWYgKCEocmVjdCAmJiBpc051bWJlcihyZWN0LnRvcCkgJiYgaXNOdW1iZXIocmVjdC5sZWZ0KSAmJiBpc051bWJlcihyZWN0LmJvdHRvbSkgJiYgaXNOdW1iZXIocmVjdC5yaWdodCkpKSB7XHJcbiAgICByZXR1cm4gcmVjdDtcclxuICB9XHJcblxyXG4gIGNvbnN0IHJlc3VsdDogT2Zmc2V0cyA9IHtcclxuICAgIGxlZnQ6IHJlY3QubGVmdCxcclxuICAgIHRvcDogcmVjdC50b3AsXHJcbiAgICB3aWR0aDogcmVjdC5yaWdodCAtIHJlY3QubGVmdCxcclxuICAgIGhlaWdodDogcmVjdC5ib3R0b20gLSByZWN0LnRvcFxyXG4gIH07XHJcblxyXG4gIC8vIHN1YnRyYWN0IHNjcm9sbGJhciBzaXplIGZyb20gc2l6ZXNcclxuICBjb25zdCBzaXplcyA9IGVsZW1lbnQubm9kZU5hbWUgPT09ICdIVE1MJyA/IGdldFdpbmRvd1NpemVzKGVsZW1lbnQub3duZXJEb2N1bWVudCkgOiB1bmRlZmluZWQ7XHJcbiAgY29uc3Qgd2lkdGggPSBzaXplcz8ud2lkdGggfHwgZWxlbWVudC5jbGllbnRXaWR0aFxyXG4gICAgfHwgaXNOdW1iZXIocmVjdC5yaWdodCkgJiYgaXNOdW1iZXIocmVzdWx0LmxlZnQpICYmIHJlY3QucmlnaHQgLSByZXN1bHQubGVmdCB8fCAwO1xyXG4gIGNvbnN0IGhlaWdodCA9IHNpemVzPy5oZWlnaHQgfHwgZWxlbWVudC5jbGllbnRIZWlnaHRcclxuICAgIHx8IGlzTnVtYmVyKHJlY3QuYm90dG9tKSAmJiBpc051bWJlcihyZXN1bHQudG9wKSAmJiByZWN0LmJvdHRvbSAtIHJlc3VsdC50b3AgfHwgMDtcclxuXHJcbiAgbGV0IGhvcml6U2Nyb2xsYmFyID0gZWxlbWVudC5vZmZzZXRXaWR0aCAtIHdpZHRoO1xyXG4gIGxldCB2ZXJ0U2Nyb2xsYmFyID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgLSBoZWlnaHQ7XHJcblxyXG4gIC8vIGlmIGFuIGh5cG90aGV0aWNhbCBzY3JvbGxiYXIgaXMgZGV0ZWN0ZWQsIHdlIG11c3QgYmUgc3VyZSBpdCdzIG5vdCBhIGBib3JkZXJgXHJcbiAgLy8gd2UgbWFrZSB0aGlzIGNoZWNrIGNvbmRpdGlvbmFsIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXHJcbiAgaWYgKGhvcml6U2Nyb2xsYmFyIHx8IHZlcnRTY3JvbGxiYXIpIHtcclxuICAgIGNvbnN0IHN0eWxlcyA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShlbGVtZW50KTtcclxuICAgIGhvcml6U2Nyb2xsYmFyIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3gnKTtcclxuICAgIHZlcnRTY3JvbGxiYXIgLT0gZ2V0Qm9yZGVyc1NpemUoc3R5bGVzLCAneScpO1xyXG5cclxuICAgIHJlc3VsdC53aWR0aCAtPSBob3JpelNjcm9sbGJhcjtcclxuICAgIHJlc3VsdC5oZWlnaHQgLT0gdmVydFNjcm9sbGJhcjtcclxuICB9XHJcblxyXG4gIHJldHVybiBnZXRDbGllbnRSZWN0KHJlc3VsdCk7XHJcbn1cclxuIl19