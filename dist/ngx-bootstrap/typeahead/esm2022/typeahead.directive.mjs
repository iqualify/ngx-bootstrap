import { ChangeDetectorRef, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ComponentLoaderFactory } from 'ngx-bootstrap/component-loader';
import { EMPTY, from, isObservable } from 'rxjs';
import { debounceTime, filter, mergeMap, switchMap, tap, toArray } from 'rxjs/operators';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadMatch } from './typeahead-match.class';
import { getValueFromObject, latinize, tokenize } from './typeahead-utils';
import { TypeaheadConfig } from './typeahead.config';
import * as i0 from "@angular/core";
import * as i1 from "ngx-bootstrap/component-loader";
import * as i2 from "./typeahead.config";
import * as i3 from "@angular/forms";
export class TypeaheadDirective {
    constructor(cis, config, changeDetection, element, ngControl, renderer, viewContainerRef) {
        this.changeDetection = changeDetection;
        this.element = element;
        this.ngControl = ngControl;
        this.renderer = renderer;
        /** minimal no of characters that needs to be entered before
         * typeahead kicks-in. When set to 0, typeahead shows on focus with full
         * list of options (limited as normal by typeaheadOptionsLimit)
         */
        this.typeaheadMinLength = 1;
        /** sets use adaptive position */
        this.adaptivePosition = false;
        /** turn on/off animation */
        this.isAnimated = false;
        /** minimal wait time after last character typed before typeahead kicks-in */
        this.typeaheadWaitMs = 0;
        /** match latin symbols.
         * If true the word súper would match super and vice versa.
         */
        this.typeaheadLatinize = true;
        /** Can be use to search words by inserting a single white space between each characters
         *  for example 'C a l i f o r n i a' will match 'California'.
         */
        this.typeaheadSingleWords = true;
        /** should be used only in case typeaheadSingleWords attribute is true.
         * Sets the word delimiter to break words. Defaults to space.
         */
        this.typeaheadWordDelimiters = ' ';
        /** should be used only in case typeaheadMultipleSearch attribute is true.
         * Sets the multiple search delimiter to know when to start a new search. Defaults to comma.
         * If space needs to be used, then explicitly set typeaheadWordDelimiters to something else than space
         * because space is used by default OR set typeaheadSingleWords attribute to false if you don't need
         * to use it together with multiple search.
         */
        this.typeaheadMultipleSearchDelimiters = ',';
        /** should be used only in case typeaheadSingleWords attribute is true.
         * Sets the word delimiter to match exact phrase.
         * Defaults to simple and double quotes.
         */
        this.typeaheadPhraseDelimiters = '\'"';
        /** specifies if typeahead is scrollable  */
        this.typeaheadScrollable = false;
        /** specifies number of options to show in scroll view  */
        this.typeaheadOptionsInScrollableView = 5;
        /** fired when an options list was opened and the user clicked Tab
         * If a value equal true, it will be chosen first or active item in the list
         * If value equal false, it will be chosen an active item in the list or nothing
         */
        this.typeaheadSelectFirstItem = true;
        /** makes active first item in a list */
        this.typeaheadIsFirstItemActive = true;
        /** fired when 'busy' state of this component was changed,
         * fired on async mode only, returns boolean
         */
        this.typeaheadLoading = new EventEmitter();
        /** fired on every key event and returns true
         * in case of matches are not detected
         */
        this.typeaheadNoResults = new EventEmitter();
        /** fired when option was selected, return object with data of this option. */
        this.typeaheadOnSelect = new EventEmitter();
        /** fired when option was previewed, return object with data of this option. */
        this.typeaheadOnPreview = new EventEmitter();
        /** fired when blur event occurs. returns the active item */
        this.typeaheadOnBlur = new EventEmitter();
        /** This attribute indicates that the dropdown should be opened upwards */
        this.dropup = false;
        this.isOpen = false;
        this.list = 'list';
        this.isActiveItemChanged = false;
        this.isFocused = false;
        this.cancelRequestOnFocusLost = false;
        this.selectItemOnBlur = false;
        this.keyUpEventEmitter = new EventEmitter();
        this.placement = 'bottom left';
        this._matches = [];
        this._subscriptions = [];
        this._outsideClickListener = () => void 0;
        this._typeahead = cis
            .createLoader(element, viewContainerRef, renderer)
            .provide({ provide: TypeaheadConfig, useValue: config });
        Object.assign(this, {
            typeaheadHideResultsOnBlur: config.hideResultsOnBlur,
            cancelRequestOnFocusLost: config.cancelRequestOnFocusLost,
            typeaheadSelectFirstItem: config.selectFirstItem,
            typeaheadIsFirstItemActive: config.isFirstItemActive,
            typeaheadMinLength: config.minLength,
            adaptivePosition: config.adaptivePosition,
            isAnimated: config.isAnimated,
            selectItemOnBlur: config.selectItemOnBlur
        });
    }
    get matches() {
        return this._matches;
    }
    ngOnInit() {
        this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
        this.typeaheadMinLength = this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
        // async should be false in case of array
        if (this.typeaheadAsync === undefined && !isObservable(this.typeahead)) {
            this.typeaheadAsync = false;
        }
        if (isObservable(this.typeahead)) {
            this.typeaheadAsync = true;
        }
        if (this.typeaheadAsync) {
            this.asyncActions();
        }
        else {
            this.syncActions();
        }
        this.checkDelimitersConflict();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onInput(e) {
        // For `<input>`s, use the `value` property. For others that don't have a
        // `value` (such as `<span contenteditable="true">`), use either
        // `textContent` or `innerText` (depending on which one is supported, i.e.
        // Firefox or IE).
        const value = e.target.value !== undefined
            ? e.target.value
            : e.target.textContent !== undefined
                ? e.target.textContent
                : e.target.innerText;
        if (value != null && value.trim().length >= this.typeaheadMinLength) {
            this.typeaheadLoading.emit(true);
            this.keyUpEventEmitter.emit(e.target.value);
        }
        else {
            this.typeaheadLoading.emit(false);
            this.typeaheadNoResults.emit(false);
            this.hide();
        }
    }
    onChange(event) {
        if (this._container) {
            // esc
            if (event.keyCode === 27 || event.key === 'Escape') {
                this.hide();
                return;
            }
            // up
            if (event.keyCode === 38 || event.key === 'ArrowUp') {
                this.isActiveItemChanged = true;
                this._container.prevActiveMatch();
                return;
            }
            // down
            if (event.keyCode === 40 || event.key === 'ArrowDown') {
                this.isActiveItemChanged = true;
                this._container.nextActiveMatch();
                return;
            }
            // enter
            if (event.keyCode === 13 || event.key === 'Enter') {
                this._container.selectActiveMatch();
                return;
            }
        }
    }
    onFocus() {
        this.isFocused = true;
        // add setTimeout to fix issue #5251
        // to get and emit updated value if it's changed on focus
        setTimeout(() => {
            if (this.typeaheadMinLength === 0) {
                this.typeaheadLoading.emit(true);
                this.keyUpEventEmitter.emit(this.element.nativeElement.value || '');
            }
        }, 0);
    }
    onBlur() {
        this.isFocused = false;
        if (this._container && !this._container.isFocused) {
            this.typeaheadOnBlur.emit(this._container.active);
        }
        if (!this.container && this._matches?.length === 0) {
            this.typeaheadOnBlur.emit(new TypeaheadMatch(this.element.nativeElement.value, this.element.nativeElement.value, false));
        }
    }
    onKeydown(event) {
        // no container - no problems
        if (!this._container) {
            return;
        }
        if (event.keyCode === 9 || event.key === 'Tab') {
            this.onBlur();
        }
        if (event.keyCode === 9 || event.key === 'Tab' || event.keyCode === 13 || event.key === 'Enter') {
            event.preventDefault();
            if (this.typeaheadSelectFirstItem) {
                this._container.selectActiveMatch();
                return;
            }
            if (!this.typeaheadSelectFirstItem) {
                this._container.selectActiveMatch(this.isActiveItemChanged);
                this.isActiveItemChanged = false;
                this.hide();
            }
        }
    }
    changeModel(match) {
        if (!match) {
            return;
        }
        let valueStr;
        if (this.typeaheadMultipleSearch && this._allEnteredValue) {
            const tokens = this._allEnteredValue.split(new RegExp(`([${this.typeaheadMultipleSearchDelimiters}]+)`));
            this._allEnteredValue = tokens
                .slice(0, tokens.length - 1)
                .concat(match.value)
                .join('');
            valueStr = this._allEnteredValue;
        }
        else {
            valueStr = match.value;
        }
        this.ngControl.viewToModelUpdate(valueStr);
        this.ngControl.control?.setValue(valueStr);
        this.changeDetection.markForCheck();
        this.hide();
    }
    show() {
        this._typeahead
            .attach(TypeaheadContainerComponent)
            .to(this.container)
            .position({ attachment: `${this.dropup ? 'top' : 'bottom'} left` })
            .show({
            typeaheadRef: this,
            placement: this.placement,
            animation: false,
            dropup: this.dropup
        });
        this._outsideClickListener = this.renderer.listen('document', 'click', (event) => {
            if (this.typeaheadMinLength === 0 && this.element.nativeElement.contains(event.target)) {
                return;
            }
            if (!this.typeaheadHideResultsOnBlur || this.element.nativeElement.contains(event.target)) {
                return;
            }
            this.onOutsideClick();
        });
        if (!this._typeahead.instance || !this.ngControl.control) {
            return;
        }
        this._container = this._typeahead.instance;
        this._container.parent = this;
        // This improves the speed as it won't have to be done for each list item
        const normalizedQuery = (this.typeaheadLatinize ? latinize(this.ngControl.control.value) : this.ngControl.control.value)
            .toString()
            .toLowerCase();
        this._container.query = this.tokenizeQuery(normalizedQuery);
        this._container.matches = this._matches;
        this.element.nativeElement.focus();
        this._container.activeChangeEvent.subscribe((activeId) => {
            this.activeDescendant = activeId;
            this.changeDetection.markForCheck();
        });
        this.isOpen = true;
    }
    hide() {
        if (this._typeahead.isShown) {
            this._typeahead.hide();
            this._outsideClickListener();
            this._container = void 0;
            this.isOpen = false;
            this.changeDetection.markForCheck();
        }
        this.typeaheadOnPreview.emit();
    }
    onOutsideClick() {
        if (this._container && !this._container.isFocused) {
            this.hide();
        }
    }
    ngOnDestroy() {
        // clean up subscriptions
        for (const sub of this._subscriptions) {
            sub.unsubscribe();
        }
        this._typeahead.dispose();
    }
    asyncActions() {
        this._subscriptions.push(this.keyUpEventEmitter
            .pipe(debounceTime(this.typeaheadWaitMs), tap((value) => (this._allEnteredValue = value)), switchMap(() => {
            if (!this.typeahead) {
                return EMPTY;
            }
            return this.typeahead;
        }))
            .subscribe((matches) => {
            this.finalizeAsyncCall(matches);
        }));
    }
    syncActions() {
        this._subscriptions.push(this.keyUpEventEmitter
            .pipe(debounceTime(this.typeaheadWaitMs), mergeMap((value) => {
            this._allEnteredValue = value;
            const normalizedQuery = this.normalizeQuery(value);
            if (!this.typeahead) {
                return EMPTY;
            }
            const typeahead = isObservable(this.typeahead) ? this.typeahead : from(this.typeahead);
            return typeahead.pipe(filter((option) => {
                return !!option && this.testMatch(this.normalizeOption(option), normalizedQuery);
            }), toArray());
        }))
            .subscribe((matches) => {
            this.finalizeAsyncCall(matches);
        }));
    }
    normalizeOption(option) {
        const optionValue = getValueFromObject(option, this.typeaheadOptionField);
        const normalizedOption = this.typeaheadLatinize ? latinize(optionValue) : optionValue;
        return normalizedOption.toLowerCase();
    }
    tokenizeQuery(currentQuery) {
        let query = currentQuery;
        if (this.typeaheadMultipleSearch && this.typeaheadSingleWords) {
            if (!this.haveCommonCharacters(`${this.typeaheadPhraseDelimiters}${this.typeaheadWordDelimiters}`, this.typeaheadMultipleSearchDelimiters)) {
                // single words and multiple search delimiters are different, can be used together
                query = tokenize(query, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters, this.typeaheadMultipleSearchDelimiters);
            }
        }
        else if (this.typeaheadSingleWords) {
            query = tokenize(query, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters);
        }
        else {
            // multiple searches
            query = tokenize(query, void 0, void 0, this.typeaheadMultipleSearchDelimiters);
        }
        return query;
    }
    normalizeQuery(value) {
        // If singleWords, break model here to not be doing extra work on each iteration
        let normalizedQuery = (this.typeaheadLatinize ? latinize(value) : value)
            .toString()
            .toLowerCase();
        normalizedQuery = this.tokenizeQuery(normalizedQuery);
        return normalizedQuery;
    }
    testMatch(match, test) {
        let spaceLength;
        if (typeof test === 'object') {
            spaceLength = test.length;
            for (let i = 0; i < spaceLength; i += 1) {
                if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
                    return false;
                }
            }
            return true;
        }
        return match.indexOf(test) >= 0;
    }
    finalizeAsyncCall(matches) {
        this.prepareMatches(matches || []);
        this.typeaheadLoading.emit(false);
        this.typeaheadNoResults.emit(!this.hasMatches());
        if (!this.hasMatches()) {
            this.hide();
            return;
        }
        if (!this.isFocused && this.cancelRequestOnFocusLost) {
            return;
        }
        if (this._container && this.ngControl.control) {
            // fix: remove usage of ngControl internals
            const _controlValue = (this.typeaheadLatinize ? latinize(this.ngControl.control.value) : this.ngControl.control.value) || '';
            // This improves the speed as it won't have to be done for each list item
            const normalizedQuery = _controlValue.toString().toLowerCase();
            this._container.query = this.tokenizeQuery(normalizedQuery);
            this._container.matches = this._matches;
        }
        else {
            this.show();
        }
    }
    prepareMatches(options) {
        const limited = options.slice(0, this.typeaheadOptionsLimit);
        const sorted = !this.typeaheadOrderBy ? limited : this.orderMatches(limited);
        if (this.typeaheadGroupField) {
            let matches = [];
            // extract all group names
            const groups = sorted
                .map((option) => getValueFromObject(option, this.typeaheadGroupField))
                .filter((v, i, a) => a.indexOf(v) === i);
            groups.forEach((group) => {
                // add group header to array of matches
                matches.push(new TypeaheadMatch(group, group, true));
                // add each item of group to array of matches
                matches = matches.concat(sorted
                    .filter((option) => getValueFromObject(option, this.typeaheadGroupField) === group)
                    .map((option) => new TypeaheadMatch(option, getValueFromObject(option, this.typeaheadOptionField))));
            });
            this._matches = matches;
        }
        else {
            this._matches = sorted.map(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (option) => new TypeaheadMatch(option, getValueFromObject(option, this.typeaheadOptionField)));
        }
    }
    orderMatches(options) {
        if (!options.length) {
            return options;
        }
        if (this.typeaheadOrderBy !== null &&
            this.typeaheadOrderBy !== undefined &&
            typeof this.typeaheadOrderBy === 'object' &&
            Object.keys(this.typeaheadOrderBy).length === 0) {
            console.error('Field and direction properties for typeaheadOrderBy have to be set according to documentation!');
            return options;
        }
        const { field, direction } = this.typeaheadOrderBy || {};
        if (!direction || !(direction === 'asc' || direction === 'desc')) {
            console.error('typeaheadOrderBy direction has to equal "asc" or "desc". Please follow the documentation.');
            return options;
        }
        if (typeof options[0] === 'string') {
            return direction === 'asc' ? options.sort() : options.sort().reverse();
        }
        if (!field || typeof field !== 'string') {
            console.error('typeaheadOrderBy field has to set according to the documentation.');
            return options;
        }
        return options.sort((a, b) => {
            const stringA = getValueFromObject(a, field);
            const stringB = getValueFromObject(b, field);
            if (stringA < stringB) {
                return direction === 'asc' ? -1 : 1;
            }
            if (stringA > stringB) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
    }
    hasMatches() {
        return this._matches.length > 0;
    }
    checkDelimitersConflict() {
        if (this.typeaheadMultipleSearch &&
            this.typeaheadSingleWords &&
            this.haveCommonCharacters(`${this.typeaheadPhraseDelimiters}${this.typeaheadWordDelimiters}`, this.typeaheadMultipleSearchDelimiters)) {
            throw new Error(`Delimiters used in typeaheadMultipleSearchDelimiters must be different
          from delimiters used in typeaheadWordDelimiters (current value: ${this.typeaheadWordDelimiters}) and
          typeaheadPhraseDelimiters (current value: ${this.typeaheadPhraseDelimiters}).
          Please refer to the documentation`);
        }
    }
    haveCommonCharacters(str1, str2) {
        for (let i = 0; i < str1.length; i++) {
            if (str1.charAt(i).indexOf(str2) > -1) {
                return true;
            }
        }
        return false;
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TypeaheadDirective, deps: [{ token: i1.ComponentLoaderFactory }, { token: i2.TypeaheadConfig }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }, { token: i3.NgControl }, { token: i0.Renderer2 }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "18.0.1", type: TypeaheadDirective, selector: "[typeahead]", inputs: { typeahead: "typeahead", typeaheadMinLength: "typeaheadMinLength", adaptivePosition: "adaptivePosition", isAnimated: "isAnimated", typeaheadWaitMs: "typeaheadWaitMs", typeaheadOptionsLimit: "typeaheadOptionsLimit", typeaheadOptionField: "typeaheadOptionField", typeaheadGroupField: "typeaheadGroupField", typeaheadOrderBy: "typeaheadOrderBy", typeaheadAsync: "typeaheadAsync", typeaheadLatinize: "typeaheadLatinize", typeaheadSingleWords: "typeaheadSingleWords", typeaheadWordDelimiters: "typeaheadWordDelimiters", typeaheadMultipleSearch: "typeaheadMultipleSearch", typeaheadMultipleSearchDelimiters: "typeaheadMultipleSearchDelimiters", typeaheadPhraseDelimiters: "typeaheadPhraseDelimiters", typeaheadItemTemplate: "typeaheadItemTemplate", optionsListTemplate: "optionsListTemplate", typeaheadScrollable: "typeaheadScrollable", typeaheadOptionsInScrollableView: "typeaheadOptionsInScrollableView", typeaheadHideResultsOnBlur: "typeaheadHideResultsOnBlur", typeaheadSelectFirstItem: "typeaheadSelectFirstItem", typeaheadIsFirstItemActive: "typeaheadIsFirstItemActive", container: "container", dropup: "dropup" }, outputs: { typeaheadLoading: "typeaheadLoading", typeaheadNoResults: "typeaheadNoResults", typeaheadOnSelect: "typeaheadOnSelect", typeaheadOnPreview: "typeaheadOnPreview", typeaheadOnBlur: "typeaheadOnBlur" }, host: { listeners: { "input": "onInput($event)", "keyup": "onChange($event)", "click": "onFocus()", "focus": "onFocus()", "blur": "onBlur()", "keydown": "onKeydown($event)" }, properties: { "attr.aria-activedescendant": "activeDescendant", "attr.aria-owns": "isOpen ? this._container.popupId : null", "attr.aria-expanded": "isOpen", "attr.aria-autocomplete": "list" } }, exportAs: ["bs-typeahead"], ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: TypeaheadDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[typeahead]',
                    exportAs: 'bs-typeahead',
                    // eslint-disable-next-line @angular-eslint/no-host-metadata-property
                    host: {
                        '[attr.aria-activedescendant]': 'activeDescendant',
                        '[attr.aria-owns]': 'isOpen ? this._container.popupId : null',
                        '[attr.aria-expanded]': 'isOpen',
                        '[attr.aria-autocomplete]': 'list'
                    }
                }]
        }], ctorParameters: () => [{ type: i1.ComponentLoaderFactory }, { type: i2.TypeaheadConfig }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }, { type: i3.NgControl }, { type: i0.Renderer2 }, { type: i0.ViewContainerRef }], propDecorators: { typeahead: [{
                type: Input
            }], typeaheadMinLength: [{
                type: Input
            }], adaptivePosition: [{
                type: Input
            }], isAnimated: [{
                type: Input
            }], typeaheadWaitMs: [{
                type: Input
            }], typeaheadOptionsLimit: [{
                type: Input
            }], typeaheadOptionField: [{
                type: Input
            }], typeaheadGroupField: [{
                type: Input
            }], typeaheadOrderBy: [{
                type: Input
            }], typeaheadAsync: [{
                type: Input
            }], typeaheadLatinize: [{
                type: Input
            }], typeaheadSingleWords: [{
                type: Input
            }], typeaheadWordDelimiters: [{
                type: Input
            }], typeaheadMultipleSearch: [{
                type: Input
            }], typeaheadMultipleSearchDelimiters: [{
                type: Input
            }], typeaheadPhraseDelimiters: [{
                type: Input
            }], typeaheadItemTemplate: [{
                type: Input
            }], optionsListTemplate: [{
                type: Input
            }], typeaheadScrollable: [{
                type: Input
            }], typeaheadOptionsInScrollableView: [{
                type: Input
            }], typeaheadHideResultsOnBlur: [{
                type: Input
            }], typeaheadSelectFirstItem: [{
                type: Input
            }], typeaheadIsFirstItemActive: [{
                type: Input
            }], typeaheadLoading: [{
                type: Output
            }], typeaheadNoResults: [{
                type: Output
            }], typeaheadOnSelect: [{
                type: Output
            }], typeaheadOnPreview: [{
                type: Output
            }], typeaheadOnBlur: [{
                type: Output
            }], container: [{
                type: Input
            }], dropup: [{
                type: Input
            }], 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onInput: [{
                type: HostListener,
                args: ['input', ['$event']]
            }], onChange: [{
                type: HostListener,
                args: ['keyup', ['$event']]
            }], onFocus: [{
                type: HostListener,
                args: ['click']
            }, {
                type: HostListener,
                args: ['focus']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }], onKeydown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90eXBlYWhlYWQvdHlwZWFoZWFkLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBR0wsTUFBTSxFQUNOLFNBQVMsRUFDVCxXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2pCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQW1CLHNCQUFzQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFFekYsT0FBTyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUE0QixNQUFNLE1BQU0sQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUd6RixPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFekQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7Ozs7O0FBaUJyRCxNQUFNLE9BQU8sa0JBQWtCO0lBZ0o3QixZQUNFLEdBQTJCLEVBQzNCLE1BQXVCLEVBQ2YsZUFBa0MsRUFDbEMsT0FBbUIsRUFDbkIsU0FBb0IsRUFDcEIsUUFBbUIsRUFDM0IsZ0JBQWtDO1FBSjFCLG9CQUFlLEdBQWYsZUFBZSxDQUFtQjtRQUNsQyxZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25C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LE9BQU87c0JBRk4sWUFBWTt1QkFBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7Z0JBeUJqQyxRQUFRO3NCQURQLFlBQVk7dUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQXFDakMsT0FBTztzQkFGTixZQUFZO3VCQUFDLE9BQU87O3NCQUNwQixZQUFZO3VCQUFDLE9BQU87Z0JBY3JCLE1BQU07c0JBREwsWUFBWTt1QkFBQyxNQUFNO2dCQWVwQixTQUFTO3NCQURSLFlBQVk7dUJBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBDaGFuZ2VEZXRlY3RvclJlZixcclxuICBEaXJlY3RpdmUsXHJcbiAgRWxlbWVudFJlZixcclxuICBFdmVudEVtaXR0ZXIsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsXHJcbiAgT3V0cHV0LFxyXG4gIFJlbmRlcmVyMixcclxuICBUZW1wbGF0ZVJlZixcclxuICBWaWV3Q29udGFpbmVyUmVmXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IE5nQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgQ29tcG9uZW50TG9hZGVyLCBDb21wb25lbnRMb2FkZXJGYWN0b3J5IH0gZnJvbSAnbmd4LWJvb3RzdHJhcC9jb21wb25lbnQtbG9hZGVyJztcclxuXHJcbmltcG9ydCB7IEVNUFRZLCBmcm9tLCBpc09ic2VydmFibGUsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGZpbHRlciwgbWVyZ2VNYXAsIHN3aXRjaE1hcCwgdGFwLCB0b0FycmF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRPcHRpb25JdGVtQ29udGV4dCwgVHlwZWFoZWFkT3B0aW9uTGlzdENvbnRleHQgfSBmcm9tICcuL21vZGVscyc7XHJcblxyXG5pbXBvcnQgeyBUeXBlYWhlYWRDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuL3R5cGVhaGVhZC1jb250YWluZXIuY29tcG9uZW50JztcclxuaW1wb3J0IHsgVHlwZWFoZWFkTWF0Y2ggfSBmcm9tICcuL3R5cGVhaGVhZC1tYXRjaC5jbGFzcyc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZE9yZGVyIH0gZnJvbSAnLi90eXBlYWhlYWQtb3JkZXIuY2xhc3MnO1xyXG5pbXBvcnQgeyBnZXRWYWx1ZUZyb21PYmplY3QsIGxhdGluaXplLCB0b2tlbml6ZSB9IGZyb20gJy4vdHlwZWFoZWFkLXV0aWxzJztcclxuaW1wb3J0IHsgVHlwZWFoZWFkQ29uZmlnIH0gZnJvbSAnLi90eXBlYWhlYWQuY29uZmlnJztcclxuXHJcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxyXG50eXBlIFR5cGVhaGVhZE9wdGlvbiA9IHN0cmluZyB8IFJlY29yZDxzdHJpbmcgfCBudW1iZXIsIGFueT47XHJcbnR5cGUgVHlwZWFoZWFkT3B0aW9uQXJyID0gVHlwZWFoZWFkT3B0aW9uW10gfCBPYnNlcnZhYmxlPFR5cGVhaGVhZE9wdGlvbj47XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICBzZWxlY3RvcjogJ1t0eXBlYWhlYWRdJyxcclxuICBleHBvcnRBczogJ2JzLXR5cGVhaGVhZCcsXHJcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEBhbmd1bGFyLWVzbGludC9uby1ob3N0LW1ldGFkYXRhLXByb3BlcnR5XHJcbiAgaG9zdDoge1xyXG4gICAgJ1thdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF0nOiAnYWN0aXZlRGVzY2VuZGFudCcsXHJcbiAgICAnW2F0dHIuYXJpYS1vd25zXSc6ICdpc09wZW4gPyB0aGlzLl9jb250YWluZXIucG9wdXBJZCA6IG51bGwnLFxyXG4gICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2lzT3BlbicsXHJcbiAgICAnW2F0dHIuYXJpYS1hdXRvY29tcGxldGVdJzogJ2xpc3QnXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVHlwZWFoZWFkRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qKiBvcHRpb25zIHNvdXJjZSwgY2FuIGJlIEFycmF5IG9mIHN0cmluZ3MsIG9iamVjdHMgb3JcclxuICAgKiBhbiBPYnNlcnZhYmxlIGZvciBleHRlcm5hbCBtYXRjaGluZyBwcm9jZXNzXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkPzogVHlwZWFoZWFkT3B0aW9uQXJyO1xyXG4gIC8qKiBtaW5pbWFsIG5vIG9mIGNoYXJhY3RlcnMgdGhhdCBuZWVkcyB0byBiZSBlbnRlcmVkIGJlZm9yZVxyXG4gICAqIHR5cGVhaGVhZCBraWNrcy1pbi4gV2hlbiBzZXQgdG8gMCwgdHlwZWFoZWFkIHNob3dzIG9uIGZvY3VzIHdpdGggZnVsbFxyXG4gICAqIGxpc3Qgb2Ygb3B0aW9ucyAobGltaXRlZCBhcyBub3JtYWwgYnkgdHlwZWFoZWFkT3B0aW9uc0xpbWl0KVxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZE1pbkxlbmd0aCA9IDE7XHJcbiAgLyoqIHNldHMgdXNlIGFkYXB0aXZlIHBvc2l0aW9uICovXHJcbiAgQElucHV0KCkgYWRhcHRpdmVQb3NpdGlvbiA9IGZhbHNlO1xyXG4gIC8qKiB0dXJuIG9uL29mZiBhbmltYXRpb24gKi9cclxuICBASW5wdXQoKSBpc0FuaW1hdGVkID0gZmFsc2U7XHJcbiAgLyoqIG1pbmltYWwgd2FpdCB0aW1lIGFmdGVyIGxhc3QgY2hhcmFjdGVyIHR5cGVkIGJlZm9yZSB0eXBlYWhlYWQga2lja3MtaW4gKi9cclxuICBASW5wdXQoKSB0eXBlYWhlYWRXYWl0TXMgPSAwO1xyXG4gIC8qKiBtYXhpbXVtIGxlbmd0aCBvZiBvcHRpb25zIGl0ZW1zIGxpc3QuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIDIwICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkT3B0aW9uc0xpbWl0PzogbnVtYmVyO1xyXG4gIC8qKiB3aGVuIG9wdGlvbnMgc291cmNlIGlzIGFuIGFycmF5IG9mIG9iamVjdHMsIHRoZSBuYW1lIG9mIGZpZWxkXHJcbiAgICogdGhhdCBjb250YWlucyB0aGUgb3B0aW9ucyB2YWx1ZSwgd2UgdXNlIGFycmF5IGl0ZW0gYXMgb3B0aW9uIGluIGNhc2VcclxuICAgKiBvZiB0aGlzIGZpZWxkIGlzIG1pc3NpbmcuIFN1cHBvcnRzIG5lc3RlZCBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZE9wdGlvbkZpZWxkPzogc3RyaW5nO1xyXG4gIC8qKiB3aGVuIG9wdGlvbnMgc291cmNlIGlzIGFuIGFycmF5IG9mIG9iamVjdHMsIHRoZSBuYW1lIG9mIGZpZWxkIHRoYXRcclxuICAgKiBjb250YWlucyB0aGUgZ3JvdXAgdmFsdWUsIG1hdGNoZXMgYXJlIGdyb3VwZWQgYnkgdGhpcyBmaWVsZCB3aGVuIHNldC5cclxuICAgKi9cclxuICBASW5wdXQoKSB0eXBlYWhlYWRHcm91cEZpZWxkPzogc3RyaW5nO1xyXG4gIC8qKiBVc2VkIHRvIHNwZWNpZnkgYSBjdXN0b20gb3JkZXIgb2YgbWF0Y2hlcy4gV2hlbiBvcHRpb25zIHNvdXJjZSBpcyBhbiBhcnJheSBvZiBvYmplY3RzXHJcbiAgICogYSBmaWVsZCBmb3Igc29ydGluZyBoYXMgdG8gYmUgc2V0IHVwLiBJbiBjYXNlIG9mIG9wdGlvbnMgc291cmNlIGlzIGFuIGFycmF5IG9mIHN0cmluZyxcclxuICAgKiBhIGZpZWxkIGZvciBzb3J0aW5nIGlzIGFic2VudC4gVGhlIG9yZGVyaW5nIGRpcmVjdGlvbiBjb3VsZCBiZSBjaGFuZ2VkIHRvIGFzY2VuZGluZyBvciBkZXNjZW5kaW5nLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZE9yZGVyQnk/OiBUeXBlYWhlYWRPcmRlcjtcclxuICAvKiogc2hvdWxkIGJlIHVzZWQgb25seSBpbiBjYXNlIG9mIHR5cGVhaGVhZCBhdHRyaWJ1dGUgaXMgT2JzZXJ2YWJsZSBvZiBhcnJheS5cclxuICAgKiBJZiB0cnVlIC0gbG9hZGluZyBvZiBvcHRpb25zIHdpbGwgYmUgYXN5bmMsIG90aGVyd2lzZSAtIHN5bmMuXHJcbiAgICogdHJ1ZSBtYWtlIHNlbnNlIGlmIG9wdGlvbnMgYXJyYXkgaXMgbGFyZ2UuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkQXN5bmM/OiBib29sZWFuO1xyXG4gIC8qKiBtYXRjaCBsYXRpbiBzeW1ib2xzLlxyXG4gICAqIElmIHRydWUgdGhlIHdvcmQgc8O6cGVyIHdvdWxkIG1hdGNoIHN1cGVyIGFuZCB2aWNlIHZlcnNhLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZExhdGluaXplID0gdHJ1ZTtcclxuICAvKiogQ2FuIGJlIHVzZSB0byBzZWFyY2ggd29yZHMgYnkgaW5zZXJ0aW5nIGEgc2luZ2xlIHdoaXRlIHNwYWNlIGJldHdlZW4gZWFjaCBjaGFyYWN0ZXJzXHJcbiAgICogIGZvciBleGFtcGxlICdDIGEgbCBpIGYgbyByIG4gaSBhJyB3aWxsIG1hdGNoICdDYWxpZm9ybmlhJy5cclxuICAgKi9cclxuICBASW5wdXQoKSB0eXBlYWhlYWRTaW5nbGVXb3JkcyA9IHRydWU7XHJcbiAgLyoqIHNob3VsZCBiZSB1c2VkIG9ubHkgaW4gY2FzZSB0eXBlYWhlYWRTaW5nbGVXb3JkcyBhdHRyaWJ1dGUgaXMgdHJ1ZS5cclxuICAgKiBTZXRzIHRoZSB3b3JkIGRlbGltaXRlciB0byBicmVhayB3b3Jkcy4gRGVmYXVsdHMgdG8gc3BhY2UuXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkV29yZERlbGltaXRlcnMgPSAnICc7XHJcbiAgLyoqIENhbiBiZSB1c2VkIHRvIGNvbmR1Y3QgYSBzZWFyY2ggb2YgbXVsdGlwbGUgaXRlbXMgYW5kIGhhdmUgc3VnZ2VzdGlvbiBub3QgZm9yIHRoZVxyXG4gICAqIHdob2xlIHZhbHVlIG9mIHRoZSBpbnB1dCBidXQgZm9yIHRoZSB2YWx1ZSB0aGF0IGNvbWVzIGFmdGVyIGEgZGVsaW1pdGVyIHByb3ZpZGVkIHZpYVxyXG4gICAqIHR5cGVhaGVhZE11bHRpcGxlU2VhcmNoRGVsaW1pdGVycyBhdHRyaWJ1dGUuIFRoaXMgb3B0aW9uIGNhbiBvbmx5IGJlIHVzZWQgdG9nZXRoZXIgd2l0aFxyXG4gICAqIHR5cGVhaGVhZFNpbmdsZVdvcmRzIG9wdGlvbiBpZiB0eXBlYWhlYWRXb3JkRGVsaW1pdGVycyBhbmQgdHlwZWFoZWFkUGhyYXNlRGVsaW1pdGVyc1xyXG4gICAqIGFyZSBkaWZmZXJlbnQgZnJvbSB0eXBlYWhlYWRNdWx0aXBsZVNlYXJjaERlbGltaXRlcnMgdG8gYXZvaWQgY29uZmxpY3QgaW4gZGV0ZXJtaW5pbmdcclxuICAgKiB3aGVuIHRvIGRlbGltaXQgbXVsdGlwbGUgc2VhcmNoZXMgYW5kIHdoZW4gYSBzaW5nbGUgd29yZC5cclxuICAgKi9cclxuICBASW5wdXQoKSB0eXBlYWhlYWRNdWx0aXBsZVNlYXJjaD86IGJvb2xlYW47XHJcbiAgLyoqIHNob3VsZCBiZSB1c2VkIG9ubHkgaW4gY2FzZSB0eXBlYWhlYWRNdWx0aXBsZVNlYXJjaCBhdHRyaWJ1dGUgaXMgdHJ1ZS5cclxuICAgKiBTZXRzIHRoZSBtdWx0aXBsZSBzZWFyY2ggZGVsaW1pdGVyIHRvIGtub3cgd2hlbiB0byBzdGFydCBhIG5ldyBzZWFyY2guIERlZmF1bHRzIHRvIGNvbW1hLlxyXG4gICAqIElmIHNwYWNlIG5lZWRzIHRvIGJlIHVzZWQsIHRoZW4gZXhwbGljaXRseSBzZXQgdHlwZWFoZWFkV29yZERlbGltaXRlcnMgdG8gc29tZXRoaW5nIGVsc2UgdGhhbiBzcGFjZVxyXG4gICAqIGJlY2F1c2Ugc3BhY2UgaXMgdXNlZCBieSBkZWZhdWx0IE9SIHNldCB0eXBlYWhlYWRTaW5nbGVXb3JkcyBhdHRyaWJ1dGUgdG8gZmFsc2UgaWYgeW91IGRvbid0IG5lZWRcclxuICAgKiB0byB1c2UgaXQgdG9nZXRoZXIgd2l0aCBtdWx0aXBsZSBzZWFyY2guXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkTXVsdGlwbGVTZWFyY2hEZWxpbWl0ZXJzID0gJywnO1xyXG4gIC8qKiBzaG91bGQgYmUgdXNlZCBvbmx5IGluIGNhc2UgdHlwZWFoZWFkU2luZ2xlV29yZHMgYXR0cmlidXRlIGlzIHRydWUuXHJcbiAgICogU2V0cyB0aGUgd29yZCBkZWxpbWl0ZXIgdG8gbWF0Y2ggZXhhY3QgcGhyYXNlLlxyXG4gICAqIERlZmF1bHRzIHRvIHNpbXBsZSBhbmQgZG91YmxlIHF1b3Rlcy5cclxuICAgKi9cclxuICBASW5wdXQoKSB0eXBlYWhlYWRQaHJhc2VEZWxpbWl0ZXJzID0gJ1xcJ1wiJztcclxuICAvKiogdXNlZCB0byBzcGVjaWZ5IGEgY3VzdG9tIGl0ZW0gdGVtcGxhdGUuXHJcbiAgICogVGVtcGxhdGUgdmFyaWFibGVzIGV4cG9zZWQgYXJlIGNhbGxlZCBpdGVtIGFuZCBpbmRleDtcclxuICAgKi9cclxuICBASW5wdXQoKSB0eXBlYWhlYWRJdGVtVGVtcGxhdGU/OiBUZW1wbGF0ZVJlZjxUeXBlYWhlYWRPcHRpb25JdGVtQ29udGV4dD47XHJcbiAgLyoqIHVzZWQgdG8gc3BlY2lmeSBhIGN1c3RvbSBvcHRpb25zIGxpc3QgdGVtcGxhdGUuXHJcbiAgICogVGVtcGxhdGUgdmFyaWFibGVzOiBtYXRjaGVzLCBpdGVtVGVtcGxhdGUsIHF1ZXJ5XHJcbiAgICovXHJcbiAgQElucHV0KCkgb3B0aW9uc0xpc3RUZW1wbGF0ZT86IFRlbXBsYXRlUmVmPFR5cGVhaGVhZE9wdGlvbkxpc3RDb250ZXh0PjtcclxuICAvKiogc3BlY2lmaWVzIGlmIHR5cGVhaGVhZCBpcyBzY3JvbGxhYmxlICAqL1xyXG4gIEBJbnB1dCgpIHR5cGVhaGVhZFNjcm9sbGFibGUgPSBmYWxzZTtcclxuICAvKiogc3BlY2lmaWVzIG51bWJlciBvZiBvcHRpb25zIHRvIHNob3cgaW4gc2Nyb2xsIHZpZXcgICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkT3B0aW9uc0luU2Nyb2xsYWJsZVZpZXcgPSA1O1xyXG4gIC8qKiB1c2VkIHRvIGhpZGUgcmVzdWx0IG9uIGJsdXIgKi9cclxuICBASW5wdXQoKSB0eXBlYWhlYWRIaWRlUmVzdWx0c09uQmx1cj86IGJvb2xlYW47XHJcbiAgLyoqIGZpcmVkIHdoZW4gYW4gb3B0aW9ucyBsaXN0IHdhcyBvcGVuZWQgYW5kIHRoZSB1c2VyIGNsaWNrZWQgVGFiXHJcbiAgICogSWYgYSB2YWx1ZSBlcXVhbCB0cnVlLCBpdCB3aWxsIGJlIGNob3NlbiBmaXJzdCBvciBhY3RpdmUgaXRlbSBpbiB0aGUgbGlzdFxyXG4gICAqIElmIHZhbHVlIGVxdWFsIGZhbHNlLCBpdCB3aWxsIGJlIGNob3NlbiBhbiBhY3RpdmUgaXRlbSBpbiB0aGUgbGlzdCBvciBub3RoaW5nXHJcbiAgICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkU2VsZWN0Rmlyc3RJdGVtID0gdHJ1ZTtcclxuICAvKiogbWFrZXMgYWN0aXZlIGZpcnN0IGl0ZW0gaW4gYSBsaXN0ICovXHJcbiAgQElucHV0KCkgdHlwZWFoZWFkSXNGaXJzdEl0ZW1BY3RpdmUgPSB0cnVlO1xyXG4gIC8qKiBmaXJlZCB3aGVuICdidXN5JyBzdGF0ZSBvZiB0aGlzIGNvbXBvbmVudCB3YXMgY2hhbmdlZCxcclxuICAgKiBmaXJlZCBvbiBhc3luYyBtb2RlIG9ubHksIHJldHVybnMgYm9vbGVhblxyXG4gICAqL1xyXG4gIEBPdXRwdXQoKSB0eXBlYWhlYWRMb2FkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG4gIC8qKiBmaXJlZCBvbiBldmVyeSBrZXkgZXZlbnQgYW5kIHJldHVybnMgdHJ1ZVxyXG4gICAqIGluIGNhc2Ugb2YgbWF0Y2hlcyBhcmUgbm90IGRldGVjdGVkXHJcbiAgICovXHJcbiAgQE91dHB1dCgpIHR5cGVhaGVhZE5vUmVzdWx0cyA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcclxuICAvKiogZmlyZWQgd2hlbiBvcHRpb24gd2FzIHNlbGVjdGVkLCByZXR1cm4gb2JqZWN0IHdpdGggZGF0YSBvZiB0aGlzIG9wdGlvbi4gKi9cclxuICBAT3V0cHV0KCkgdHlwZWFoZWFkT25TZWxlY3QgPSBuZXcgRXZlbnRFbWl0dGVyPFR5cGVhaGVhZE1hdGNoPigpO1xyXG4gIC8qKiBmaXJlZCB3aGVuIG9wdGlvbiB3YXMgcHJldmlld2VkLCByZXR1cm4gb2JqZWN0IHdpdGggZGF0YSBvZiB0aGlzIG9wdGlvbi4gKi9cclxuICBAT3V0cHV0KCkgdHlwZWFoZWFkT25QcmV2aWV3ID0gbmV3IEV2ZW50RW1pdHRlcjxUeXBlYWhlYWRNYXRjaD4oKTtcclxuICAvKiogZmlyZWQgd2hlbiBibHVyIGV2ZW50IG9jY3Vycy4gcmV0dXJucyB0aGUgYWN0aXZlIGl0ZW0gKi9cclxuICBAT3V0cHV0KCkgdHlwZWFoZWFkT25CbHVyID0gbmV3IEV2ZW50RW1pdHRlcjxUeXBlYWhlYWRNYXRjaCB8IHVuZGVmaW5lZD4oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBzZWxlY3RvciBzcGVjaWZ5aW5nIHRoZSBlbGVtZW50IHRoZSB0eXBlYWhlYWQgc2hvdWxkIGJlIGFwcGVuZGVkIHRvLlxyXG4gICAqL1xyXG4gIEBJbnB1dCgpIGNvbnRhaW5lcj86IHN0cmluZztcclxuXHJcbiAgLyoqIFRoaXMgYXR0cmlidXRlIGluZGljYXRlcyB0aGF0IHRoZSBkcm9wZG93biBzaG91bGQgYmUgb3BlbmVkIHVwd2FyZHMgKi9cclxuICBASW5wdXQoKSBkcm9wdXAgPSBmYWxzZTtcclxuXHJcbiAgLy8gbm90IHlldCBpbXBsZW1lbnRlZFxyXG4gIC8qKiBpZiBmYWxzZSByZXN0cmljdCBtb2RlbCB2YWx1ZXMgdG8gdGhlIG9uZXMgc2VsZWN0ZWQgZnJvbSB0aGUgcG9wdXAgb25seSB3aWxsIGJlIHByb3ZpZGVkICovXHJcbiAgLy8gQElucHV0KCkgcHJvdGVjdGVkIHR5cGVhaGVhZEVkaXRhYmxlOmJvb2xlYW47XHJcbiAgLyoqIGlmIGZhbHNlIHRoZSBmaXJzdCBtYXRjaCBhdXRvbWF0aWNhbGx5IHdpbGwgbm90IGJlIGZvY3VzZWQgYXMgeW91IHR5cGUgKi9cclxuICAvLyBASW5wdXQoKSBwcm90ZWN0ZWQgdHlwZWFoZWFkRm9jdXNGaXJzdDpib29sZWFuO1xyXG4gIC8qKiBmb3JtYXQgdGhlIG5nLW1vZGVsIHJlc3VsdCBhZnRlciBzZWxlY3Rpb24gKi9cclxuICAvLyBASW5wdXQoKSBwcm90ZWN0ZWQgdHlwZWFoZWFkSW5wdXRGb3JtYXR0ZXI6YW55O1xyXG4gIC8qKiBpZiB0cnVlIGF1dG9tYXRpY2FsbHkgc2VsZWN0IGFuIGl0ZW0gd2hlbiB0aGVyZSBpcyBvbmUgb3B0aW9uIHRoYXQgZXhhY3RseSBtYXRjaGVzIHRoZSB1c2VyIGlucHV0ICovXHJcbiAgLy8gQElucHV0KCkgcHJvdGVjdGVkIHR5cGVhaGVhZFNlbGVjdE9uRXhhY3Q6Ym9vbGVhbjtcclxuICAvKiogIGlmIHRydWUgc2VsZWN0IHRoZSBjdXJyZW50bHkgaGlnaGxpZ2h0ZWQgbWF0Y2ggb24gYmx1ciAqL1xyXG4gIC8vIEBJbnB1dCgpIHByb3RlY3RlZCB0eXBlYWhlYWRTZWxlY3RPbkJsdXI6Ym9vbGVhbjtcclxuICAvKiogIGlmIGZhbHNlIGRvbid0IGZvY3VzIHRoZSBpbnB1dCBlbGVtZW50IHRoZSB0eXBlYWhlYWQgZGlyZWN0aXZlIGlzIGFzc29jaWF0ZWQgd2l0aCBvbiBzZWxlY3Rpb24gKi9cclxuICAvLyBASW5wdXQoKSBwcm90ZWN0ZWQgdHlwZWFoZWFkRm9jdXNPblNlbGVjdDpib29sZWFuO1xyXG5cclxuICBhY3RpdmVEZXNjZW5kYW50Pzogc3RyaW5nO1xyXG4gIGlzT3BlbiA9IGZhbHNlO1xyXG4gIGxpc3QgPSAnbGlzdCc7XHJcbiAgX2NvbnRhaW5lcj86IFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudDtcclxuICBpc0FjdGl2ZUl0ZW1DaGFuZ2VkID0gZmFsc2U7XHJcbiAgaXNGb2N1c2VkID0gZmFsc2U7XHJcbiAgY2FuY2VsUmVxdWVzdE9uRm9jdXNMb3N0ID0gZmFsc2U7XHJcbiAgc2VsZWN0SXRlbU9uQmx1ciA9IGZhbHNlO1xyXG4gIHByb3RlY3RlZCBrZXlVcEV2ZW50RW1pdHRlciA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG4gIHByb3RlY3RlZCBwbGFjZW1lbnQgPSAnYm90dG9tIGxlZnQnO1xyXG4gIHByb3RlY3RlZCBfbWF0Y2hlczogVHlwZWFoZWFkTWF0Y2hbXSA9IFtdO1xyXG5cclxuICBwcml2YXRlIF90eXBlYWhlYWQ6IENvbXBvbmVudExvYWRlcjxUeXBlYWhlYWRDb250YWluZXJDb21wb25lbnQ+O1xyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XHJcbiAgcHJpdmF0ZSBfYWxsRW50ZXJlZFZhbHVlPzogc3RyaW5nO1xyXG4gIHByaXZhdGUgX291dHNpZGVDbGlja0xpc3RlbmVyOiAoKSA9PiB2b2lkID0gKCkgPT4gdm9pZCAwO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIGNpczogQ29tcG9uZW50TG9hZGVyRmFjdG9yeSxcclxuICAgIGNvbmZpZzogVHlwZWFoZWFkQ29uZmlnLFxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdG9yUmVmLFxyXG4gICAgcHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcclxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcclxuICAgIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWZcclxuICApIHtcclxuICAgIHRoaXMuX3R5cGVhaGVhZCA9IGNpc1xyXG4gICAgICAuY3JlYXRlTG9hZGVyPFR5cGVhaGVhZENvbnRhaW5lckNvbXBvbmVudD4oZWxlbWVudCwgdmlld0NvbnRhaW5lclJlZiwgcmVuZGVyZXIpXHJcbiAgICAgIC5wcm92aWRlKHsgcHJvdmlkZTogVHlwZWFoZWFkQ29uZmlnLCB1c2VWYWx1ZTogY29uZmlnIH0pO1xyXG5cclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xyXG4gICAgICB0eXBlYWhlYWRIaWRlUmVzdWx0c09uQmx1cjogY29uZmlnLmhpZGVSZXN1bHRzT25CbHVyLFxyXG4gICAgICBjYW5jZWxSZXF1ZXN0T25Gb2N1c0xvc3Q6IGNvbmZpZy5jYW5jZWxSZXF1ZXN0T25Gb2N1c0xvc3QsXHJcbiAgICAgIHR5cGVhaGVhZFNlbGVjdEZpcnN0SXRlbTogY29uZmlnLnNlbGVjdEZpcnN0SXRlbSxcclxuICAgICAgdHlwZWFoZWFkSXNGaXJzdEl0ZW1BY3RpdmU6IGNvbmZpZy5pc0ZpcnN0SXRlbUFjdGl2ZSxcclxuICAgICAgdHlwZWFoZWFkTWluTGVuZ3RoOiBjb25maWcubWluTGVuZ3RoLFxyXG4gICAgICBhZGFwdGl2ZVBvc2l0aW9uOiBjb25maWcuYWRhcHRpdmVQb3NpdGlvbixcclxuICAgICAgaXNBbmltYXRlZDogY29uZmlnLmlzQW5pbWF0ZWQsXHJcbiAgICAgIHNlbGVjdEl0ZW1PbkJsdXI6IGNvbmZpZy5zZWxlY3RJdGVtT25CbHVyXHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGdldCBtYXRjaGVzKCk6IFR5cGVhaGVhZE1hdGNoW10ge1xyXG4gICAgcmV0dXJuIHRoaXMuX21hdGNoZXM7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMudHlwZWFoZWFkT3B0aW9uc0xpbWl0ID0gdGhpcy50eXBlYWhlYWRPcHRpb25zTGltaXQgfHwgMjA7XHJcblxyXG4gICAgdGhpcy50eXBlYWhlYWRNaW5MZW5ndGggPSB0aGlzLnR5cGVhaGVhZE1pbkxlbmd0aCA9PT0gdm9pZCAwID8gMSA6IHRoaXMudHlwZWFoZWFkTWluTGVuZ3RoO1xyXG5cclxuICAgIC8vIGFzeW5jIHNob3VsZCBiZSBmYWxzZSBpbiBjYXNlIG9mIGFycmF5XHJcbiAgICBpZiAodGhpcy50eXBlYWhlYWRBc3luYyA9PT0gdW5kZWZpbmVkICYmICFpc09ic2VydmFibGUodGhpcy50eXBlYWhlYWQpKSB7XHJcbiAgICAgIHRoaXMudHlwZWFoZWFkQXN5bmMgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaXNPYnNlcnZhYmxlKHRoaXMudHlwZWFoZWFkKSkge1xyXG4gICAgICB0aGlzLnR5cGVhaGVhZEFzeW5jID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy50eXBlYWhlYWRBc3luYykge1xyXG4gICAgICB0aGlzLmFzeW5jQWN0aW9ucygpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zeW5jQWN0aW9ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2hlY2tEZWxpbWl0ZXJzQ29uZmxpY3QoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2lucHV0JywgWyckZXZlbnQnXSlcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gIG9uSW5wdXQoZTogYW55KTogdm9pZCB7XHJcbiAgICAvLyBGb3IgYDxpbnB1dD5gcywgdXNlIHRoZSBgdmFsdWVgIHByb3BlcnR5LiBGb3Igb3RoZXJzIHRoYXQgZG9uJ3QgaGF2ZSBhXHJcbiAgICAvLyBgdmFsdWVgIChzdWNoIGFzIGA8c3BhbiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+YCksIHVzZSBlaXRoZXJcclxuICAgIC8vIGB0ZXh0Q29udGVudGAgb3IgYGlubmVyVGV4dGAgKGRlcGVuZGluZyBvbiB3aGljaCBvbmUgaXMgc3VwcG9ydGVkLCBpLmUuXHJcbiAgICAvLyBGaXJlZm94IG9yIElFKS5cclxuICAgIGNvbnN0IHZhbHVlID1cclxuICAgICAgZS50YXJnZXQudmFsdWUgIT09IHVuZGVmaW5lZFxyXG4gICAgICAgID8gZS50YXJnZXQudmFsdWVcclxuICAgICAgICA6IGUudGFyZ2V0LnRleHRDb250ZW50ICE9PSB1bmRlZmluZWRcclxuICAgICAgICA/IGUudGFyZ2V0LnRleHRDb250ZW50XHJcbiAgICAgICAgOiBlLnRhcmdldC5pbm5lclRleHQ7XHJcblxyXG4gICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdmFsdWUudHJpbSgpLmxlbmd0aCA+PSB0aGlzLnR5cGVhaGVhZE1pbkxlbmd0aCkge1xyXG4gICAgICB0aGlzLnR5cGVhaGVhZExvYWRpbmcuZW1pdCh0cnVlKTtcclxuICAgICAgdGhpcy5rZXlVcEV2ZW50RW1pdHRlci5lbWl0KGUudGFyZ2V0LnZhbHVlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudHlwZWFoZWFkTG9hZGluZy5lbWl0KGZhbHNlKTtcclxuICAgICAgdGhpcy50eXBlYWhlYWROb1Jlc3VsdHMuZW1pdChmYWxzZSk7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKVxyXG4gIG9uQ2hhbmdlKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fY29udGFpbmVyKSB7XHJcbiAgICAgIC8vIGVzY1xyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcgfHwgZXZlbnQua2V5ID09PSAnRXNjYXBlJykge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIHVwXHJcbiAgICAgIGlmIChldmVudC5rZXlDb2RlID09PSAzOCB8fCBldmVudC5rZXkgPT09ICdBcnJvd1VwJykge1xyXG4gICAgICAgIHRoaXMuaXNBY3RpdmVJdGVtQ2hhbmdlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLnByZXZBY3RpdmVNYXRjaCgpO1xyXG5cclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIGRvd25cclxuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDQwIHx8IGV2ZW50LmtleSA9PT0gJ0Fycm93RG93bicpIHtcclxuICAgICAgICB0aGlzLmlzQWN0aXZlSXRlbUNoYW5nZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5uZXh0QWN0aXZlTWF0Y2goKTtcclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBlbnRlclxyXG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMgfHwgZXZlbnQua2V5ID09PSAnRW50ZXInKSB7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLnNlbGVjdEFjdGl2ZU1hdGNoKCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzJylcclxuICBvbkZvY3VzKCk6IHZvaWQge1xyXG4gICAgdGhpcy5pc0ZvY3VzZWQgPSB0cnVlO1xyXG4gICAgLy8gYWRkIHNldFRpbWVvdXQgdG8gZml4IGlzc3VlICM1MjUxXHJcbiAgICAvLyB0byBnZXQgYW5kIGVtaXQgdXBkYXRlZCB2YWx1ZSBpZiBpdCdzIGNoYW5nZWQgb24gZm9jdXNcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy50eXBlYWhlYWRNaW5MZW5ndGggPT09IDApIHtcclxuICAgICAgICB0aGlzLnR5cGVhaGVhZExvYWRpbmcuZW1pdCh0cnVlKTtcclxuICAgICAgICB0aGlzLmtleVVwRXZlbnRFbWl0dGVyLmVtaXQodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUgfHwgJycpO1xyXG4gICAgICB9XHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxyXG4gIG9uQmx1cigpOiB2b2lkIHtcclxuICAgIHRoaXMuaXNGb2N1c2VkID0gZmFsc2U7XHJcbiAgICBpZiAodGhpcy5fY29udGFpbmVyICYmICF0aGlzLl9jb250YWluZXIuaXNGb2N1c2VkKSB7XHJcbiAgICAgIHRoaXMudHlwZWFoZWFkT25CbHVyLmVtaXQodGhpcy5fY29udGFpbmVyLmFjdGl2ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLmNvbnRhaW5lciAmJiB0aGlzLl9tYXRjaGVzPy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy50eXBlYWhlYWRPbkJsdXIuZW1pdChcclxuICAgICAgICBuZXcgVHlwZWFoZWFkTWF0Y2godGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQudmFsdWUsIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LnZhbHVlLCBmYWxzZSlcclxuICAgICAgKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxyXG4gIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG4gICAgLy8gbm8gY29udGFpbmVyIC0gbm8gcHJvYmxlbXNcclxuICAgIGlmICghdGhpcy5fY29udGFpbmVyKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gOSB8fCBldmVudC5rZXkgPT09ICdUYWInKSB7XHJcbiAgICAgIHRoaXMub25CbHVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDkgfHwgZXZlbnQua2V5ID09PSAnVGFiJyB8fCBldmVudC5rZXlDb2RlID09PSAxMyB8fCBldmVudC5rZXkgPT09ICdFbnRlcicpIHtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgaWYgKHRoaXMudHlwZWFoZWFkU2VsZWN0Rmlyc3RJdGVtKSB7XHJcbiAgICAgICAgdGhpcy5fY29udGFpbmVyLnNlbGVjdEFjdGl2ZU1hdGNoKCk7XHJcblxyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKCF0aGlzLnR5cGVhaGVhZFNlbGVjdEZpcnN0SXRlbSkge1xyXG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5zZWxlY3RBY3RpdmVNYXRjaCh0aGlzLmlzQWN0aXZlSXRlbUNoYW5nZWQpO1xyXG4gICAgICAgIHRoaXMuaXNBY3RpdmVJdGVtQ2hhbmdlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBjaGFuZ2VNb2RlbChtYXRjaD86IFR5cGVhaGVhZE1hdGNoKTogdm9pZCB7XHJcbiAgICBpZiAoIW1hdGNoKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGxldCB2YWx1ZVN0cjogc3RyaW5nO1xyXG4gICAgaWYgKHRoaXMudHlwZWFoZWFkTXVsdGlwbGVTZWFyY2ggJiYgdGhpcy5fYWxsRW50ZXJlZFZhbHVlKSB7XHJcbiAgICAgIGNvbnN0IHRva2VucyA9IHRoaXMuX2FsbEVudGVyZWRWYWx1ZS5zcGxpdChuZXcgUmVnRXhwKGAoWyR7dGhpcy50eXBlYWhlYWRNdWx0aXBsZVNlYXJjaERlbGltaXRlcnN9XSspYCkpO1xyXG4gICAgICB0aGlzLl9hbGxFbnRlcmVkVmFsdWUgPSB0b2tlbnNcclxuICAgICAgICAuc2xpY2UoMCwgdG9rZW5zLmxlbmd0aCAtIDEpXHJcbiAgICAgICAgLmNvbmNhdChtYXRjaC52YWx1ZSlcclxuICAgICAgICAuam9pbignJyk7XHJcbiAgICAgIHZhbHVlU3RyID0gdGhpcy5fYWxsRW50ZXJlZFZhbHVlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmFsdWVTdHIgPSBtYXRjaC52YWx1ZTtcclxuICAgIH1cclxuICAgIHRoaXMubmdDb250cm9sLnZpZXdUb01vZGVsVXBkYXRlKHZhbHVlU3RyKTtcclxuICAgIHRoaXMubmdDb250cm9sLmNvbnRyb2w/LnNldFZhbHVlKHZhbHVlU3RyKTtcclxuICAgIHRoaXMuY2hhbmdlRGV0ZWN0aW9uLm1hcmtGb3JDaGVjaygpO1xyXG4gICAgdGhpcy5oaWRlKCk7XHJcbiAgfVxyXG5cclxuICBzaG93KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fdHlwZWFoZWFkXHJcbiAgICAgIC5hdHRhY2goVHlwZWFoZWFkQ29udGFpbmVyQ29tcG9uZW50KVxyXG4gICAgICAudG8odGhpcy5jb250YWluZXIpXHJcbiAgICAgIC5wb3NpdGlvbih7IGF0dGFjaG1lbnQ6IGAke3RoaXMuZHJvcHVwID8gJ3RvcCcgOiAnYm90dG9tJ30gbGVmdGAgfSlcclxuICAgICAgLnNob3coe1xyXG4gICAgICAgIHR5cGVhaGVhZFJlZjogdGhpcyxcclxuICAgICAgICBwbGFjZW1lbnQ6IHRoaXMucGxhY2VtZW50LFxyXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXHJcbiAgICAgICAgZHJvcHVwOiB0aGlzLmRyb3B1cFxyXG4gICAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9vdXRzaWRlQ2xpY2tMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCdkb2N1bWVudCcsICdjbGljaycsIChldmVudDogTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy50eXBlYWhlYWRNaW5MZW5ndGggPT09IDAgJiYgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBpZiAoIXRoaXMudHlwZWFoZWFkSGlkZVJlc3VsdHNPbkJsdXIgfHwgdGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSkge1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLm9uT3V0c2lkZUNsaWNrKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIXRoaXMuX3R5cGVhaGVhZC5pbnN0YW5jZSB8fCAhdGhpcy5uZ0NvbnRyb2wuY29udHJvbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fY29udGFpbmVyID0gdGhpcy5fdHlwZWFoZWFkLmluc3RhbmNlO1xyXG4gICAgdGhpcy5fY29udGFpbmVyLnBhcmVudCA9IHRoaXM7XHJcbiAgICAvLyBUaGlzIGltcHJvdmVzIHRoZSBzcGVlZCBhcyBpdCB3b24ndCBoYXZlIHRvIGJlIGRvbmUgZm9yIGVhY2ggbGlzdCBpdGVtXHJcblxyXG4gICAgY29uc3Qgbm9ybWFsaXplZFF1ZXJ5ID0gKFxyXG4gICAgICB0aGlzLnR5cGVhaGVhZExhdGluaXplID8gbGF0aW5pemUodGhpcy5uZ0NvbnRyb2wuY29udHJvbC52YWx1ZSkgOiB0aGlzLm5nQ29udHJvbC5jb250cm9sLnZhbHVlXHJcbiAgICApXHJcbiAgICAgIC50b1N0cmluZygpXHJcbiAgICAgIC50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgIHRoaXMuX2NvbnRhaW5lci5xdWVyeSA9IHRoaXMudG9rZW5pemVRdWVyeShub3JtYWxpemVkUXVlcnkpO1xyXG5cclxuICAgIHRoaXMuX2NvbnRhaW5lci5tYXRjaGVzID0gdGhpcy5fbWF0Y2hlcztcclxuICAgIHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XHJcblxyXG4gICAgdGhpcy5fY29udGFpbmVyLmFjdGl2ZUNoYW5nZUV2ZW50LnN1YnNjcmliZSgoYWN0aXZlSWQ6IHN0cmluZykgPT4ge1xyXG4gICAgICB0aGlzLmFjdGl2ZURlc2NlbmRhbnQgPSBhY3RpdmVJZDtcclxuICAgICAgdGhpcy5jaGFuZ2VEZXRlY3Rpb24ubWFya0ZvckNoZWNrKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIGhpZGUoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fdHlwZWFoZWFkLmlzU2hvd24pIHtcclxuICAgICAgdGhpcy5fdHlwZWFoZWFkLmhpZGUoKTtcclxuICAgICAgdGhpcy5fb3V0c2lkZUNsaWNrTGlzdGVuZXIoKTtcclxuICAgICAgdGhpcy5fY29udGFpbmVyID0gdm9pZCAwO1xyXG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmNoYW5nZURldGVjdGlvbi5tYXJrRm9yQ2hlY2soKTtcclxuICAgIH1cclxuICAgIHRoaXMudHlwZWFoZWFkT25QcmV2aWV3LmVtaXQoKTtcclxuICB9XHJcblxyXG4gIG9uT3V0c2lkZUNsaWNrKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2NvbnRhaW5lciAmJiAhdGhpcy5fY29udGFpbmVyLmlzRm9jdXNlZCkge1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25EZXN0cm95KCkge1xyXG4gICAgLy8gY2xlYW4gdXAgc3Vic2NyaXB0aW9uc1xyXG4gICAgZm9yIChjb25zdCBzdWIgb2YgdGhpcy5fc3Vic2NyaXB0aW9ucykge1xyXG4gICAgICBzdWIudW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxuICAgIHRoaXMuX3R5cGVhaGVhZC5kaXNwb3NlKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYXN5bmNBY3Rpb25zKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9ucy5wdXNoKFxyXG4gICAgICB0aGlzLmtleVVwRXZlbnRFbWl0dGVyXHJcbiAgICAgICAgLnBpcGUoXHJcbiAgICAgICAgICBkZWJvdW5jZVRpbWU8c3RyaW5nPih0aGlzLnR5cGVhaGVhZFdhaXRNcyksXHJcbiAgICAgICAgICB0YXAoKHZhbHVlKSA9PiAodGhpcy5fYWxsRW50ZXJlZFZhbHVlID0gdmFsdWUpKSxcclxuICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50eXBlYWhlYWQpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gRU1QVFk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudHlwZWFoZWFkO1xyXG4gICAgICAgICAgfSlcclxuICAgICAgICApXHJcbiAgICAgICAgLnN1YnNjcmliZSgobWF0Y2hlcykgPT4ge1xyXG4gICAgICAgICAgdGhpcy5maW5hbGl6ZUFzeW5jQ2FsbChtYXRjaGVzKTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBzeW5jQWN0aW9ucygpOiB2b2lkIHtcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcclxuICAgICAgdGhpcy5rZXlVcEV2ZW50RW1pdHRlclxyXG4gICAgICAgIC5waXBlKFxyXG4gICAgICAgICAgZGVib3VuY2VUaW1lPHN0cmluZz4odGhpcy50eXBlYWhlYWRXYWl0TXMpLFxyXG4gICAgICAgICAgbWVyZ2VNYXAoKHZhbHVlOiBzdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5fYWxsRW50ZXJlZFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRRdWVyeSA9IHRoaXMubm9ybWFsaXplUXVlcnkodmFsdWUpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCF0aGlzLnR5cGVhaGVhZCkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBFTVBUWTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgdHlwZWFoZWFkID0gaXNPYnNlcnZhYmxlKHRoaXMudHlwZWFoZWFkKSA/IHRoaXMudHlwZWFoZWFkIDogZnJvbSh0aGlzLnR5cGVhaGVhZCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdHlwZWFoZWFkLnBpcGUoXHJcbiAgICAgICAgICAgICAgZmlsdGVyKChvcHRpb246IFR5cGVhaGVhZE9wdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEhb3B0aW9uICYmIHRoaXMudGVzdE1hdGNoKHRoaXMubm9ybWFsaXplT3B0aW9uKG9wdGlvbiksIG5vcm1hbGl6ZWRRdWVyeSk7XHJcbiAgICAgICAgICAgICAgfSksXHJcbiAgICAgICAgICAgICAgdG9BcnJheSgpXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgICB9KVxyXG4gICAgICAgIClcclxuICAgICAgICAuc3Vic2NyaWJlKChtYXRjaGVzOiBUeXBlYWhlYWRPcHRpb25bXSkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5maW5hbGl6ZUFzeW5jQ2FsbChtYXRjaGVzKTtcclxuICAgICAgICB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBub3JtYWxpemVPcHRpb24ob3B0aW9uOiBUeXBlYWhlYWRPcHRpb24pOiBzdHJpbmcge1xyXG4gICAgY29uc3Qgb3B0aW9uVmFsdWU6IHN0cmluZyA9IGdldFZhbHVlRnJvbU9iamVjdChvcHRpb24sIHRoaXMudHlwZWFoZWFkT3B0aW9uRmllbGQpO1xyXG4gICAgY29uc3Qgbm9ybWFsaXplZE9wdGlvbiA9IHRoaXMudHlwZWFoZWFkTGF0aW5pemUgPyBsYXRpbml6ZShvcHRpb25WYWx1ZSkgOiBvcHRpb25WYWx1ZTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplZE9wdGlvbi50b0xvd2VyQ2FzZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHRva2VuaXplUXVlcnkoY3VycmVudFF1ZXJ5OiBzdHJpbmcgfCBzdHJpbmdbXSk6IHN0cmluZyB8IHN0cmluZ1tdIHtcclxuICAgIGxldCBxdWVyeSA9IGN1cnJlbnRRdWVyeTtcclxuICAgIGlmICh0aGlzLnR5cGVhaGVhZE11bHRpcGxlU2VhcmNoICYmIHRoaXMudHlwZWFoZWFkU2luZ2xlV29yZHMpIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgICF0aGlzLmhhdmVDb21tb25DaGFyYWN0ZXJzKFxyXG4gICAgICAgICAgYCR7dGhpcy50eXBlYWhlYWRQaHJhc2VEZWxpbWl0ZXJzfSR7dGhpcy50eXBlYWhlYWRXb3JkRGVsaW1pdGVyc31gLFxyXG4gICAgICAgICAgdGhpcy50eXBlYWhlYWRNdWx0aXBsZVNlYXJjaERlbGltaXRlcnNcclxuICAgICAgICApXHJcbiAgICAgICkge1xyXG4gICAgICAgIC8vIHNpbmdsZSB3b3JkcyBhbmQgbXVsdGlwbGUgc2VhcmNoIGRlbGltaXRlcnMgYXJlIGRpZmZlcmVudCwgY2FuIGJlIHVzZWQgdG9nZXRoZXJcclxuICAgICAgICBxdWVyeSA9IHRva2VuaXplKFxyXG4gICAgICAgICAgcXVlcnkgYXMgc3RyaW5nLFxyXG4gICAgICAgICAgdGhpcy50eXBlYWhlYWRXb3JkRGVsaW1pdGVycyxcclxuICAgICAgICAgIHRoaXMudHlwZWFoZWFkUGhyYXNlRGVsaW1pdGVycyxcclxuICAgICAgICAgIHRoaXMudHlwZWFoZWFkTXVsdGlwbGVTZWFyY2hEZWxpbWl0ZXJzXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmICh0aGlzLnR5cGVhaGVhZFNpbmdsZVdvcmRzKSB7XHJcbiAgICAgIHF1ZXJ5ID0gdG9rZW5pemUocXVlcnkgYXMgc3RyaW5nLCB0aGlzLnR5cGVhaGVhZFdvcmREZWxpbWl0ZXJzLCB0aGlzLnR5cGVhaGVhZFBocmFzZURlbGltaXRlcnMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gbXVsdGlwbGUgc2VhcmNoZXNcclxuICAgICAgcXVlcnkgPSB0b2tlbml6ZShxdWVyeSBhcyBzdHJpbmcsIHZvaWQgMCwgdm9pZCAwLCB0aGlzLnR5cGVhaGVhZE11bHRpcGxlU2VhcmNoRGVsaW1pdGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHF1ZXJ5O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIG5vcm1hbGl6ZVF1ZXJ5KHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgfCBzdHJpbmdbXSB7XHJcbiAgICAvLyBJZiBzaW5nbGVXb3JkcywgYnJlYWsgbW9kZWwgaGVyZSB0byBub3QgYmUgZG9pbmcgZXh0cmEgd29yayBvbiBlYWNoIGl0ZXJhdGlvblxyXG4gICAgbGV0IG5vcm1hbGl6ZWRRdWVyeTogc3RyaW5nIHwgc3RyaW5nW10gPSAodGhpcy50eXBlYWhlYWRMYXRpbml6ZSA/IGxhdGluaXplKHZhbHVlKSA6IHZhbHVlKVxyXG4gICAgICAudG9TdHJpbmcoKVxyXG4gICAgICAudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBub3JtYWxpemVkUXVlcnkgPSB0aGlzLnRva2VuaXplUXVlcnkobm9ybWFsaXplZFF1ZXJ5KTtcclxuXHJcbiAgICByZXR1cm4gbm9ybWFsaXplZFF1ZXJ5O1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHRlc3RNYXRjaChtYXRjaDogc3RyaW5nLCB0ZXN0OiBzdHJpbmdbXSB8IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgbGV0IHNwYWNlTGVuZ3RoOiBudW1iZXI7XHJcblxyXG4gICAgaWYgKHR5cGVvZiB0ZXN0ID09PSAnb2JqZWN0Jykge1xyXG4gICAgICBzcGFjZUxlbmd0aCA9IHRlc3QubGVuZ3RoO1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNwYWNlTGVuZ3RoOyBpICs9IDEpIHtcclxuICAgICAgICBpZiAodGVzdFtpXS5sZW5ndGggPiAwICYmIG1hdGNoLmluZGV4T2YodGVzdFtpXSkgPCAwKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbWF0Y2guaW5kZXhPZih0ZXN0KSA+PSAwO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGZpbmFsaXplQXN5bmNDYWxsKG1hdGNoZXM/OiBUeXBlYWhlYWRPcHRpb24gfCBUeXBlYWhlYWRPcHRpb25bXSk6IHZvaWQge1xyXG4gICAgdGhpcy5wcmVwYXJlTWF0Y2hlcyhtYXRjaGVzIHx8IFtdKTtcclxuXHJcbiAgICB0aGlzLnR5cGVhaGVhZExvYWRpbmcuZW1pdChmYWxzZSk7XHJcbiAgICB0aGlzLnR5cGVhaGVhZE5vUmVzdWx0cy5lbWl0KCF0aGlzLmhhc01hdGNoZXMoKSk7XHJcblxyXG4gICAgaWYgKCF0aGlzLmhhc01hdGNoZXMoKSkge1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMuaXNGb2N1c2VkICYmIHRoaXMuY2FuY2VsUmVxdWVzdE9uRm9jdXNMb3N0KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5fY29udGFpbmVyICYmIHRoaXMubmdDb250cm9sLmNvbnRyb2wpIHtcclxuICAgICAgLy8gZml4OiByZW1vdmUgdXNhZ2Ugb2YgbmdDb250cm9sIGludGVybmFsc1xyXG4gICAgICBjb25zdCBfY29udHJvbFZhbHVlID1cclxuICAgICAgICAodGhpcy50eXBlYWhlYWRMYXRpbml6ZSA/IGxhdGluaXplKHRoaXMubmdDb250cm9sLmNvbnRyb2wudmFsdWUpIDogdGhpcy5uZ0NvbnRyb2wuY29udHJvbC52YWx1ZSkgfHwgJyc7XHJcblxyXG4gICAgICAvLyBUaGlzIGltcHJvdmVzIHRoZSBzcGVlZCBhcyBpdCB3b24ndCBoYXZlIHRvIGJlIGRvbmUgZm9yIGVhY2ggbGlzdCBpdGVtXHJcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRRdWVyeSA9IF9jb250cm9sVmFsdWUudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpO1xyXG5cclxuICAgICAgdGhpcy5fY29udGFpbmVyLnF1ZXJ5ID0gdGhpcy50b2tlbml6ZVF1ZXJ5KG5vcm1hbGl6ZWRRdWVyeSk7XHJcbiAgICAgIHRoaXMuX2NvbnRhaW5lci5tYXRjaGVzID0gdGhpcy5fbWF0Y2hlcztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHByZXBhcmVNYXRjaGVzKG9wdGlvbnM6IFR5cGVhaGVhZE9wdGlvbiB8IFR5cGVhaGVhZE9wdGlvbltdKTogdm9pZCB7XHJcbiAgICBjb25zdCBsaW1pdGVkID0gb3B0aW9ucy5zbGljZSgwLCB0aGlzLnR5cGVhaGVhZE9wdGlvbnNMaW1pdCk7XHJcbiAgICBjb25zdCBzb3J0ZWQgPSAhdGhpcy50eXBlYWhlYWRPcmRlckJ5ID8gbGltaXRlZCA6IHRoaXMub3JkZXJNYXRjaGVzKGxpbWl0ZWQpO1xyXG5cclxuICAgIGlmICh0aGlzLnR5cGVhaGVhZEdyb3VwRmllbGQpIHtcclxuICAgICAgbGV0IG1hdGNoZXM6IFR5cGVhaGVhZE1hdGNoW10gPSBbXTtcclxuXHJcbiAgICAgIC8vIGV4dHJhY3QgYWxsIGdyb3VwIG5hbWVzXHJcbiAgICAgIGNvbnN0IGdyb3VwcyA9IHNvcnRlZFxyXG4gICAgICAgIC5tYXAoKG9wdGlvbjogVHlwZWFoZWFkT3B0aW9uKSA9PiBnZXRWYWx1ZUZyb21PYmplY3Qob3B0aW9uLCB0aGlzLnR5cGVhaGVhZEdyb3VwRmllbGQpKVxyXG4gICAgICAgIC5maWx0ZXIoKHY6IHN0cmluZywgaTogbnVtYmVyLCBhOiBzdHJpbmdbXSkgPT4gYS5pbmRleE9mKHYpID09PSBpKTtcclxuXHJcbiAgICAgIGdyb3Vwcy5mb3JFYWNoKChncm91cDogc3RyaW5nKSA9PiB7XHJcbiAgICAgICAgLy8gYWRkIGdyb3VwIGhlYWRlciB0byBhcnJheSBvZiBtYXRjaGVzXHJcbiAgICAgICAgbWF0Y2hlcy5wdXNoKG5ldyBUeXBlYWhlYWRNYXRjaChncm91cCwgZ3JvdXAsIHRydWUpKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGVhY2ggaXRlbSBvZiBncm91cCB0byBhcnJheSBvZiBtYXRjaGVzXHJcbiAgICAgICAgbWF0Y2hlcyA9IG1hdGNoZXMuY29uY2F0KFxyXG4gICAgICAgICAgc29ydGVkXHJcbiAgICAgICAgICAgIC5maWx0ZXIoKG9wdGlvbjogVHlwZWFoZWFkT3B0aW9uKSA9PiBnZXRWYWx1ZUZyb21PYmplY3Qob3B0aW9uLCB0aGlzLnR5cGVhaGVhZEdyb3VwRmllbGQpID09PSBncm91cClcclxuICAgICAgICAgICAgLm1hcChcclxuICAgICAgICAgICAgICAob3B0aW9uOiBUeXBlYWhlYWRPcHRpb24pID0+XHJcbiAgICAgICAgICAgICAgICBuZXcgVHlwZWFoZWFkTWF0Y2gob3B0aW9uLCBnZXRWYWx1ZUZyb21PYmplY3Qob3B0aW9uLCB0aGlzLnR5cGVhaGVhZE9wdGlvbkZpZWxkKSlcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgICk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5fbWF0Y2hlcyA9IG1hdGNoZXM7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9tYXRjaGVzID0gc29ydGVkLm1hcChcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxyXG4gICAgICAgIChvcHRpb246IGFueSkgPT4gbmV3IFR5cGVhaGVhZE1hdGNoKG9wdGlvbiwgZ2V0VmFsdWVGcm9tT2JqZWN0KG9wdGlvbiwgdGhpcy50eXBlYWhlYWRPcHRpb25GaWVsZCkpXHJcbiAgICAgICk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgb3JkZXJNYXRjaGVzKG9wdGlvbnM6IFR5cGVhaGVhZE9wdGlvbltdKTogVHlwZWFoZWFkT3B0aW9uW10ge1xyXG4gICAgaWYgKCFvcHRpb25zLmxlbmd0aCkge1xyXG4gICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMudHlwZWFoZWFkT3JkZXJCeSAhPT0gbnVsbCAmJlxyXG4gICAgICB0aGlzLnR5cGVhaGVhZE9yZGVyQnkgIT09IHVuZGVmaW5lZCAmJlxyXG4gICAgICB0eXBlb2YgdGhpcy50eXBlYWhlYWRPcmRlckJ5ID09PSAnb2JqZWN0JyAmJlxyXG4gICAgICBPYmplY3Qua2V5cyh0aGlzLnR5cGVhaGVhZE9yZGVyQnkpLmxlbmd0aCA9PT0gMFxyXG4gICAgKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZpZWxkIGFuZCBkaXJlY3Rpb24gcHJvcGVydGllcyBmb3IgdHlwZWFoZWFkT3JkZXJCeSBoYXZlIHRvIGJlIHNldCBhY2NvcmRpbmcgdG8gZG9jdW1lbnRhdGlvbiEnKTtcclxuXHJcbiAgICAgIHJldHVybiBvcHRpb25zO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHsgZmllbGQsIGRpcmVjdGlvbiB9ID0gdGhpcy50eXBlYWhlYWRPcmRlckJ5IHx8IHt9O1xyXG5cclxuICAgIGlmICghZGlyZWN0aW9uIHx8ICEoZGlyZWN0aW9uID09PSAnYXNjJyB8fCBkaXJlY3Rpb24gPT09ICdkZXNjJykpIHtcclxuICAgICAgY29uc29sZS5lcnJvcigndHlwZWFoZWFkT3JkZXJCeSBkaXJlY3Rpb24gaGFzIHRvIGVxdWFsIFwiYXNjXCIgb3IgXCJkZXNjXCIuIFBsZWFzZSBmb2xsb3cgdGhlIGRvY3VtZW50YXRpb24uJyk7XHJcblxyXG4gICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICBpZiAodHlwZW9mIG9wdGlvbnNbMF0gPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIHJldHVybiBkaXJlY3Rpb24gPT09ICdhc2MnID8gb3B0aW9ucy5zb3J0KCkgOiBvcHRpb25zLnNvcnQoKS5yZXZlcnNlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFmaWVsZCB8fCB0eXBlb2YgZmllbGQgIT09ICdzdHJpbmcnKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ3R5cGVhaGVhZE9yZGVyQnkgZmllbGQgaGFzIHRvIHNldCBhY2NvcmRpbmcgdG8gdGhlIGRvY3VtZW50YXRpb24uJyk7XHJcblxyXG4gICAgICByZXR1cm4gb3B0aW9ucztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gb3B0aW9ucy5zb3J0KChhOiBUeXBlYWhlYWRPcHRpb24sIGI6IFR5cGVhaGVhZE9wdGlvbikgPT4ge1xyXG4gICAgICBjb25zdCBzdHJpbmdBID0gZ2V0VmFsdWVGcm9tT2JqZWN0KGEsIGZpZWxkKTtcclxuICAgICAgY29uc3Qgc3RyaW5nQiA9IGdldFZhbHVlRnJvbU9iamVjdChiLCBmaWVsZCk7XHJcblxyXG4gICAgICBpZiAoc3RyaW5nQSA8IHN0cmluZ0IpIHtcclxuICAgICAgICByZXR1cm4gZGlyZWN0aW9uID09PSAnYXNjJyA/IC0xIDogMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKHN0cmluZ0EgPiBzdHJpbmdCKSB7XHJcbiAgICAgICAgcmV0dXJuIGRpcmVjdGlvbiA9PT0gJ2FzYycgPyAxIDogLTE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHJldHVybiAwO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaGFzTWF0Y2hlcygpOiBib29sZWFuIHtcclxuICAgIHJldHVybiB0aGlzLl9tYXRjaGVzLmxlbmd0aCA+IDA7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY2hlY2tEZWxpbWl0ZXJzQ29uZmxpY3QoKTogdm9pZCB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMudHlwZWFoZWFkTXVsdGlwbGVTZWFyY2ggJiZcclxuICAgICAgdGhpcy50eXBlYWhlYWRTaW5nbGVXb3JkcyAmJlxyXG4gICAgICB0aGlzLmhhdmVDb21tb25DaGFyYWN0ZXJzKFxyXG4gICAgICAgIGAke3RoaXMudHlwZWFoZWFkUGhyYXNlRGVsaW1pdGVyc30ke3RoaXMudHlwZWFoZWFkV29yZERlbGltaXRlcnN9YCxcclxuICAgICAgICB0aGlzLnR5cGVhaGVhZE11bHRpcGxlU2VhcmNoRGVsaW1pdGVyc1xyXG4gICAgICApXHJcbiAgICApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKGBEZWxpbWl0ZXJzIHVzZWQgaW4gdHlwZWFoZWFkTXVsdGlwbGVTZWFyY2hEZWxpbWl0ZXJzIG11c3QgYmUgZGlmZmVyZW50XHJcbiAgICAgICAgICBmcm9tIGRlbGltaXRlcnMgdXNlZCBpbiB0eXBlYWhlYWRXb3JkRGVsaW1pdGVycyAoY3VycmVudCB2YWx1ZTogJHt0aGlzLnR5cGVhaGVhZFdvcmREZWxpbWl0ZXJzfSkgYW5kXHJcbiAgICAgICAgICB0eXBlYWhlYWRQaHJhc2VEZWxpbWl0ZXJzIChjdXJyZW50IHZhbHVlOiAke3RoaXMudHlwZWFoZWFkUGhyYXNlRGVsaW1pdGVyc30pLlxyXG4gICAgICAgICAgUGxlYXNlIHJlZmVyIHRvIHRoZSBkb2N1bWVudGF0aW9uYCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgaGF2ZUNvbW1vbkNoYXJhY3RlcnMoc3RyMTogc3RyaW5nLCBzdHIyOiBzdHJpbmcpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyMS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoc3RyMS5jaGFyQXQoaSkuaW5kZXhPZihzdHIyKSA+IC0xKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiJdfQ==