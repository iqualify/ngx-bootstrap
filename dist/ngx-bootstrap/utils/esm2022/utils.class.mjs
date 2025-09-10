import { window } from './facade/browser';
import { currentBsVersion } from './theme-provider';
export class Utils {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static reflow(element) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((bs) => bs)(element.offsetHeight);
    }
    // source: https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static getStyles(elem) {
        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        let view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
            view = window;
        }
        return view.getComputedStyle(elem);
    }
    static stackOverflowConfig() {
        const bsVer = currentBsVersion();
        return {
            crossorigin: "anonymous",
            integrity: bsVer === 'bs5' ? 'sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65' : 'sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2',
            cdnLink: bsVer === 'bs5' ? 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css' : 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuY2xhc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvdXRpbHMuY2xhc3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXBELE1BQU0sT0FBTyxLQUFLO0lBQ2hCLDhEQUE4RDtJQUM5RCxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQVk7UUFDeEIsOERBQThEO1FBQzlELENBQUMsQ0FBQyxFQUFPLEVBQVEsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsZ0ZBQWdGO0lBQ2hGLDhEQUE4RDtJQUM5RCxNQUFNLENBQUMsU0FBUyxDQUFDLElBQVM7UUFDeEIsdURBQXVEO1FBQ3ZELDBDQUEwQztRQUMxQywrRUFBK0U7UUFDL0UsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFFMUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxQixJQUFJLEdBQUcsTUFBTSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUEsTUFBTSxDQUFDLG1CQUFtQjtRQUN6QixNQUFNLEtBQUssR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO1FBQy9CLE9BQU87WUFDUCxXQUFXLEVBQUUsV0FBVztZQUN4QixTQUFTLEVBQUUsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMseUVBQXlFLENBQUMsQ0FBQyxDQUFDLHlFQUF5RTtZQUNsTCxPQUFPLEVBQUUsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMseUVBQXlFLENBQUMsQ0FBQyxDQUFDLHlFQUF5RTtTQUNqTCxDQUFDO0lBQ0gsQ0FBQztDQUNIIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd2luZG93IH0gZnJvbSAnLi9mYWNhZGUvYnJvd3Nlcic7XHJcbmltcG9ydCB7IGN1cnJlbnRCc1ZlcnNpb24gfSBmcm9tICcuL3RoZW1lLXByb3ZpZGVyJztcclxuXHJcbmV4cG9ydCBjbGFzcyBVdGlscyB7XHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBzdGF0aWMgcmVmbG93KGVsZW1lbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICAgICgoYnM6IGFueSk6IHZvaWQgPT4gYnMpKGVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcclxuICB9XHJcblxyXG4gIC8vIHNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL2pxdWVyeS9qcXVlcnkvYmxvYi9tYXN0ZXIvc3JjL2Nzcy92YXIvZ2V0U3R5bGVzLmpzXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcclxuICBzdGF0aWMgZ2V0U3R5bGVzKGVsZW06IGFueSk6IGFueSB7XHJcbiAgICAvLyBTdXBwb3J0OiBJRSA8PTExIG9ubHksIEZpcmVmb3ggPD0zMCAoIzE1MDk4LCAjMTQxNTApXHJcbiAgICAvLyBJRSB0aHJvd3Mgb24gZWxlbWVudHMgY3JlYXRlZCBpbiBwb3B1cHNcclxuICAgIC8vIEZGIG1lYW53aGlsZSB0aHJvd3Mgb24gZnJhbWUgZWxlbWVudHMgdGhyb3VnaCBcImRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGVcIlxyXG4gICAgbGV0IHZpZXcgPSBlbGVtLm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XHJcblxyXG4gICAgaWYgKCF2aWV3IHx8ICF2aWV3Lm9wZW5lcikge1xyXG4gICAgICB2aWV3ID0gd2luZG93O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2aWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbSk7XHJcbiAgfVxyXG5cclxuICAgc3RhdGljIHN0YWNrT3ZlcmZsb3dDb25maWcoKTogeyBjcm9zc29yaWdpbj86IHN0cmluZywgaW50ZWdyaXR5Pzogc3RyaW5nLCBjZG5MaW5rOiBzdHJpbmcgfSB7XHJcbiAgICBjb25zdCBic1ZlciA9IGN1cnJlbnRCc1ZlcnNpb24oKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgY3Jvc3NvcmlnaW46IFwiYW5vbnltb3VzXCIsXHJcbiAgICAgIGludGVncml0eTogYnNWZXIgPT09ICdiczUnID8gJ3NoYTM4NC1yYnNBMlZCS1FoZ2d3enhIN3BQQ2FBcU80Nk1nbk9NODB6VzFSV3VINjFER0x3WkpFZEsyS2FkcTJGOUNVRzY1JyA6ICdzaGEzODQtVFg4dDI3RWNSRTNlL2loVTd6bVF4Vm5jREF5NXVJS3o0ckVrZ0lYZU1lZDRNMGpsZklEUHZnNnVxS0kyeFhyMicsXHJcbiAgICAgIGNkbkxpbms6IGJzVmVyID09PSAnYnM1JyA/ICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2Jvb3RzdHJhcEA1LjIuMy9kaXN0L2Nzcy9ib290c3RyYXAubWluLmNzcycgOiAnaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9ib290c3RyYXBANC41LjMvZGlzdC9jc3MvYm9vdHN0cmFwLm1pbi5jc3MnLFxyXG4gICAgfTtcclxuICAgfVxyXG59XHJcbiJdfQ==