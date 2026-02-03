// todo: split
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/** Provides default values for Pagination and pager components */
export class PaginationConfig {
    constructor() {
        this.main = {
            itemsPerPage: 10,
            boundaryLinks: false,
            directionLinks: true,
            firstText: 'First',
            previousText: 'Previous',
            nextText: 'Next',
            lastText: 'Last',
            pageBtnClass: '',
            rotate: true
        };
        this.pager = {
            itemsPerPage: 15,
            previousText: '« Previous',
            nextText: 'Next »',
            pageBtnClass: '',
            align: true
        };
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PaginationConfig, deps: [], target: i0.ɵɵFactoryTarget.Injectable }); }
    static { this.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PaginationConfig, providedIn: 'root' }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: PaginationConfig, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJM0Msa0VBQWtFO0FBSWxFLE1BQU0sT0FBTyxnQkFBZ0I7SUFIN0I7UUFJRSxTQUFJLEdBQXlCO1lBQzNCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLFNBQVMsRUFBRSxPQUFPO1lBQ2xCLFlBQVksRUFBRSxVQUFVO1lBQ3hCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFlBQVksRUFBRSxFQUFFO1lBQ2hCLE1BQU0sRUFBRSxJQUFJO1NBQ2IsQ0FBQztRQUNGLFVBQUssR0FBZTtZQUNsQixZQUFZLEVBQUUsRUFBRTtZQUNoQixZQUFZLEVBQUUsWUFBWTtZQUMxQixRQUFRLEVBQUUsUUFBUTtZQUNsQixZQUFZLEVBQUUsRUFBRTtZQUNoQixLQUFLLEVBQUUsSUFBSTtTQUNaLENBQUM7S0FDSDs4R0FuQlksZ0JBQWdCO2tIQUFoQixnQkFBZ0IsY0FGZixNQUFNOzsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdG9kbzogc3BsaXRcclxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnTW9kZWwsIFBhZ2VyTW9kZWwgfSBmcm9tICcuL21vZGVscyc7XHJcblxyXG4vKiogUHJvdmlkZXMgZGVmYXVsdCB2YWx1ZXMgZm9yIFBhZ2luYXRpb24gYW5kIHBhZ2VyIGNvbXBvbmVudHMgKi9cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbkNvbmZpZyB7XHJcbiAgbWFpbjogUGFydGlhbDxDb25maWdNb2RlbD4gPSB7XHJcbiAgICBpdGVtc1BlclBhZ2U6IDEwLFxyXG4gICAgYm91bmRhcnlMaW5rczogZmFsc2UsXHJcbiAgICBkaXJlY3Rpb25MaW5rczogdHJ1ZSxcclxuICAgIGZpcnN0VGV4dDogJ0ZpcnN0JyxcclxuICAgIHByZXZpb3VzVGV4dDogJ1ByZXZpb3VzJyxcclxuICAgIG5leHRUZXh0OiAnTmV4dCcsXHJcbiAgICBsYXN0VGV4dDogJ0xhc3QnLFxyXG4gICAgcGFnZUJ0bkNsYXNzOiAnJyxcclxuICAgIHJvdGF0ZTogdHJ1ZVxyXG4gIH07XHJcbiAgcGFnZXI6IFBhZ2VyTW9kZWwgPSB7XHJcbiAgICBpdGVtc1BlclBhZ2U6IDE1LFxyXG4gICAgcHJldmlvdXNUZXh0OiAnwqsgUHJldmlvdXMnLFxyXG4gICAgbmV4dFRleHQ6ICdOZXh0IMK7JyxcclxuICAgIHBhZ2VCdG5DbGFzczogJycsXHJcbiAgICBhbGlnbjogdHJ1ZVxyXG4gIH07XHJcbn1cclxuIl19