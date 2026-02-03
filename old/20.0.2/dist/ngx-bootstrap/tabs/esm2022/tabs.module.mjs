import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgTranscludeDirective } from './ng-transclude.directive';
import { TabHeadingDirective } from './tab-heading.directive';
import { TabDirective } from './tab.directive';
import { TabsetComponent } from './tabset.component';
import * as i0 from "@angular/core";
export class TabsModule {
    static forRoot() {
        return {
            ngModule: TabsModule,
            providers: []
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.1", ngImport: i0, type: TabsModule, declarations: [NgTranscludeDirective,
            TabDirective,
            TabsetComponent,
            TabHeadingDirective], imports: [CommonModule], exports: [TabDirective,
            TabsetComponent,
            TabHeadingDirective,
            NgTranscludeDirective] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabsModule, imports: [CommonModule] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TabsModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    declarations: [
                        NgTranscludeDirective,
                        TabDirective,
                        TabsetComponent,
                        TabHeadingDirective
                    ],
                    exports: [
                        TabDirective,
                        TabsetComponent,
                        TabHeadingDirective,
                        NgTranscludeDirective
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdGFicy90YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFFOUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7QUFpQnJELE1BQU0sT0FBTyxVQUFVO0lBQ3JCLE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxFQUFFO1NBQ2QsQ0FBQztJQUNKLENBQUM7OEdBTlUsVUFBVTsrR0FBVixVQUFVLGlCQVpuQixxQkFBcUI7WUFDckIsWUFBWTtZQUNaLGVBQWU7WUFDZixtQkFBbUIsYUFMWCxZQUFZLGFBUXBCLFlBQVk7WUFDWixlQUFlO1lBQ2YsbUJBQW1CO1lBQ25CLHFCQUFxQjsrR0FHWixVQUFVLFlBZFgsWUFBWTs7MkZBY1gsVUFBVTtrQkFmdEIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFlBQVksRUFBRTt3QkFDWixxQkFBcUI7d0JBQ3JCLFlBQVk7d0JBQ1osZUFBZTt3QkFDZixtQkFBbUI7cUJBQ3BCO29CQUNELE9BQU8sRUFBRTt3QkFDUCxZQUFZO3dCQUNaLGVBQWU7d0JBQ2YsbUJBQW1CO3dCQUNuQixxQkFBcUI7cUJBQ3RCO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IE5nVHJhbnNjbHVkZURpcmVjdGl2ZSB9IGZyb20gJy4vbmctdHJhbnNjbHVkZS5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUYWJIZWFkaW5nRGlyZWN0aXZlIH0gZnJvbSAnLi90YWItaGVhZGluZy5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUYWJEaXJlY3RpdmUgfSBmcm9tICcuL3RhYi5kaXJlY3RpdmUnO1xyXG5pbXBvcnQgeyBUYWJzZXRDb21wb25lbnQgfSBmcm9tICcuL3RhYnNldC5jb21wb25lbnQnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcclxuICBkZWNsYXJhdGlvbnM6IFtcclxuICAgIE5nVHJhbnNjbHVkZURpcmVjdGl2ZSxcclxuICAgIFRhYkRpcmVjdGl2ZSxcclxuICAgIFRhYnNldENvbXBvbmVudCxcclxuICAgIFRhYkhlYWRpbmdEaXJlY3RpdmVcclxuICBdLFxyXG4gIGV4cG9ydHM6IFtcclxuICAgIFRhYkRpcmVjdGl2ZSxcclxuICAgIFRhYnNldENvbXBvbmVudCxcclxuICAgIFRhYkhlYWRpbmdEaXJlY3RpdmUsXHJcbiAgICBOZ1RyYW5zY2x1ZGVEaXJlY3RpdmVcclxuICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWJzTW9kdWxlIHtcclxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPFRhYnNNb2R1bGU+IHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIG5nTW9kdWxlOiBUYWJzTW9kdWxlLFxyXG4gICAgICBwcm92aWRlcnM6IFtdXHJcbiAgICB9O1xyXG4gIH1cclxufVxyXG4iXX0=