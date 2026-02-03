/***
 * pause (not yet supported) (?string='hover') - event group name which pauses
 * the cycling of the carousel, if hover pauses on mouseenter and resumes on
 * mouseleave keyboard (not yet supported) (?boolean=true) - if false
 * carousel will not react to keyboard events
 * note: swiping not yet supported
 */
/****
 * Problems:
 * 1) if we set an active slide via model changes, .active class remains on a
 * current slide.
 * 2) if we have only one slide, we shouldn't show prev/next nav buttons
 * 3) if first or last slide is active and noWrap is true, there should be
 * "disabled" class on the nav buttons.
 * 4) default interval should be equal 5000
 */
import { Component, EventEmitter, Input, NgZone, Output, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LinkedList, getBsVer } from 'ngx-bootstrap/utils';
import { CarouselConfig } from './carousel.config';
import { findLastIndex, chunkByNumber, isNumber } from './utils';
import * as i0 from "@angular/core";
import * as i1 from "./carousel.config";
import * as i2 from "@angular/common";
export var Direction;
(function (Direction) {
    Direction[Direction["UNKNOWN"] = 0] = "UNKNOWN";
    Direction[Direction["NEXT"] = 1] = "NEXT";
    Direction[Direction["PREV"] = 2] = "PREV";
})(Direction || (Direction = {}));
let _currentId = 1;
/**
 * Base element to create carousel
 */
export class CarouselComponent {
    /** Index of currently displayed slide(started for 0) */
    set activeSlide(index) {
        if (this.multilist) {
            return;
        }
        if (isNumber(index)) {
            this.customActiveSlide = index;
        }
        if (this._slides.length && index !== this._currentActiveSlide) {
            this._select(index);
        }
    }
    get activeSlide() {
        return this._currentActiveSlide || 0;
    }
    /**
     * Delay of item cycling in milliseconds. If false, carousel won't cycle
     * automatically.
     */
    get interval() {
        return this._interval;
    }
    set interval(value) {
        this._interval = value;
        this.restartTimer();
    }
    get slides() {
        return this._slides.toArray();
    }
    get isFirstSlideVisible() {
        const indexes = this.getVisibleIndexes();
        if (!indexes || (indexes instanceof Array && !indexes.length)) {
            return false;
        }
        return indexes.includes(0);
    }
    get isLastSlideVisible() {
        const indexes = this.getVisibleIndexes();
        if (!indexes || (indexes instanceof Array && !indexes.length)) {
            return false;
        }
        return indexes.includes(this._slides.length - 1);
    }
    get _bsVer() {
        return getBsVer();
    }
    constructor(config, ngZone, platformId) {
        this.ngZone = ngZone;
        this.platformId = platformId;
        /* If `true` — carousel will not cycle continuously and will have hard stops (prevent looping) */
        this.noWrap = false;
        /*  If `true` — will disable pausing on carousel mouse hover */
        this.noPause = false;
        /*  If `true` — carousel-indicators are visible  */
        this.showIndicators = true;
        /*  If `true` - autoplay will be stopped on focus */
        this.pauseOnFocus = false;
        /* If `true` - carousel indicators indicate slides chunks
           works ONLY if singleSlideOffset = FALSE */
        this.indicatorsByChunk = false;
        /* If value more then 1 — carousel works in multilist mode */
        this.itemsPerSlide = 1;
        /* If `true` — carousel shifts by one element. By default carousel shifts by number
           of visible elements (itemsPerSlide field) */
        this.singleSlideOffset = false;
        /** Turn on/off animation. Animation doesn't work for multilist carousel */
        this.isAnimated = false;
        /** Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property */
        this.activeSlideChange = new EventEmitter(false);
        /** Will be emitted when active slides has been changed in multilist mode */
        this.slideRangeChange = new EventEmitter();
        /* Index to start display slides from it */
        this.startFromIndex = 0;
        this._interval = 5000;
        this._slides = new LinkedList();
        this._currentVisibleSlidesIndex = 0;
        this.isPlaying = false;
        this.destroyed = false;
        this.currentId = 0;
        this.getActive = (slide) => slide.active;
        this.makeSlidesConsistent = (slides) => {
            slides.forEach((slide, index) => slide.item.order = index);
        };
        Object.assign(this, config);
        this.currentId = _currentId++;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            if (this.singleSlideOffset) {
                this.indicatorsByChunk = false;
            }
            if (this.multilist) {
                this._chunkedSlides = chunkByNumber(this.mapSlidesAndIndexes(), this.itemsPerSlide);
                this.selectInitialSlides();
            }
            if (this.customActiveSlide && !this.multilist) {
                this._select(this.customActiveSlide);
            }
        }, 0);
    }
    ngOnDestroy() {
        this.destroyed = true;
    }
    /**
     * Adds new slide. If this slide is first in collection - set it as active
     * and starts auto changing
     * @param slide
     */
    addSlide(slide) {
        this._slides.add(slide);
        if (this.multilist && this._slides.length <= this.itemsPerSlide) {
            slide.active = true;
        }
        if (!this.multilist && this.isAnimated) {
            slide.isAnimated = true;
        }
        if (!this.multilist && this._slides.length === 1) {
            this._currentActiveSlide = undefined;
            if (!this.customActiveSlide) {
                this.activeSlide = 0;
            }
            this.play();
        }
        if (this.multilist && this._slides.length > this.itemsPerSlide) {
            this.play();
        }
    }
    /**
     * Removes specified slide. If this slide is active - will roll to another
     * slide
     * @param slide
     */
    removeSlide(slide) {
        const remIndex = this._slides.indexOf(slide);
        if (this._currentActiveSlide === remIndex) {
            // removing of active slide
            let nextSlideIndex;
            if (this._slides.length > 1) {
                // if this slide last - will roll to first slide, if noWrap flag is
                // FALSE or to previous, if noWrap is TRUE in case, if this slide in
                // middle of collection, index of next slide is same to removed
                nextSlideIndex = !this.isLast(remIndex)
                    ? remIndex
                    : this.noWrap ? remIndex - 1 : 0;
            }
            this._slides.remove(remIndex);
            // prevents exception with changing some value after checking
            setTimeout(() => {
                this._select(nextSlideIndex);
            }, 0);
        }
        else {
            this._slides.remove(remIndex);
            const currentSlideIndex = this.getCurrentSlideIndex();
            setTimeout(() => {
                // after removing, need to actualize index of current active slide
                this._currentActiveSlide = currentSlideIndex;
                this.activeSlideChange.emit(this._currentActiveSlide);
            }, 0);
        }
    }
    nextSlideFromInterval(force = false) {
        this.move(Direction.NEXT, force);
    }
    /**
     * Rolling to next slide
     * @param force: {boolean} if true - will ignore noWrap flag
     */
    nextSlide(force = false) {
        if (this.isPlaying) {
            this.restartTimer();
        }
        this.move(Direction.NEXT, force);
    }
    /**
     * Rolling to previous slide
     * @param force: {boolean} if true - will ignore noWrap flag
     */
    previousSlide(force = false) {
        if (this.isPlaying) {
            this.restartTimer();
        }
        this.move(Direction.PREV, force);
    }
    getFirstVisibleIndex() {
        return this.slides.findIndex(this.getActive);
    }
    getLastVisibleIndex() {
        return findLastIndex(this.slides, this.getActive);
    }
    move(direction, force = false) {
        const firstVisibleIndex = this.getFirstVisibleIndex();
        const lastVisibleIndex = this.getLastVisibleIndex();
        if (this.noWrap) {
            if (direction === Direction.NEXT &&
                this.isLast(lastVisibleIndex) ||
                direction === Direction.PREV &&
                    firstVisibleIndex === 0) {
                return;
            }
        }
        if (!this.multilist) {
            this.activeSlide = this.findNextSlideIndex(direction, force) || 0;
        }
        else {
            this.moveMultilist(direction);
        }
    }
    /**
     * Swith slides by enter, space and arrows keys
     * @internal
     */
    keydownPress(event) {
        if (event.keyCode === 13 || event.key === 'Enter' || event.keyCode === 32 || event.key === 'Space') {
            this.nextSlide();
            event.preventDefault();
            return;
        }
        if (event.keyCode === 37 || event.key === 'LeftArrow') {
            this.previousSlide();
            return;
        }
        if (event.keyCode === 39 || event.key === 'RightArrow') {
            this.nextSlide();
            return;
        }
    }
    /**
     * Play on mouse leave
     * @internal
     */
    onMouseLeave() {
        if (!this.pauseOnFocus) {
            this.play();
        }
    }
    /**
     * Play on mouse up
     * @internal
     */
    onMouseUp() {
        if (!this.pauseOnFocus) {
            this.play();
        }
    }
    /**
     * When slides on focus autoplay is stopped(optional)
     * @internal
     */
    pauseFocusIn() {
        if (this.pauseOnFocus) {
            this.isPlaying = false;
            this.resetTimer();
        }
    }
    /**
     * When slides out of focus autoplay is started
     * @internal
     */
    pauseFocusOut() {
        this.play();
    }
    /**
     * Rolling to specified slide
     * @param index: {number} index of slide, which must be shown
     */
    selectSlide(index) {
        if (this.isPlaying) {
            this.restartTimer();
        }
        if (!this.multilist) {
            this.activeSlide = this.indicatorsByChunk ? index * this.itemsPerSlide : index;
        }
        else {
            this.selectSlideRange(this.indicatorsByChunk ? index * this.itemsPerSlide : index);
        }
    }
    /**
     * Starts a auto changing of slides
     */
    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.restartTimer();
        }
    }
    /**
     * Stops a auto changing of slides
     */
    pause() {
        if (!this.noPause) {
            this.isPlaying = false;
            this.resetTimer();
        }
    }
    /**
     * Finds and returns index of currently displayed slide
     */
    getCurrentSlideIndex() {
        return this._slides.findIndex(this.getActive);
    }
    /**
     * Defines, whether the specified index is last in collection
     * @param index
     */
    isLast(index) {
        return index + 1 >= this._slides.length;
    }
    /**
     * Defines, whether the specified index is first in collection
     * @param index
     */
    isFirst(index) {
        return index === 0;
    }
    indicatorsSlides() {
        return this.slides.filter((slide, index) => !this.indicatorsByChunk || index % this.itemsPerSlide === 0);
    }
    selectInitialSlides() {
        const startIndex = this.startFromIndex <= this._slides.length
            ? this.startFromIndex
            : 0;
        this.hideSlides();
        if (this.singleSlideOffset) {
            this._slidesWithIndexes = this.mapSlidesAndIndexes();
            if (this._slides.length - startIndex < this.itemsPerSlide) {
                const slidesToAppend = this._slidesWithIndexes.slice(0, startIndex);
                this._slidesWithIndexes = [
                    ...this._slidesWithIndexes,
                    ...slidesToAppend
                ]
                    .slice(slidesToAppend.length)
                    .slice(0, this.itemsPerSlide);
            }
            else {
                this._slidesWithIndexes = this._slidesWithIndexes.slice(startIndex, startIndex + this.itemsPerSlide);
            }
            this._slidesWithIndexes.forEach((slide) => slide.item.active = true);
            this.makeSlidesConsistent(this._slidesWithIndexes);
        }
        else {
            this.selectRangeByNestedIndex(startIndex);
        }
        this.slideRangeChange.emit(this.getVisibleIndexes());
    }
    /**
     * Defines next slide index, depending of direction
     * @param direction: Direction(UNKNOWN|PREV|NEXT)
     * @param force: {boolean} if TRUE - will ignore noWrap flag, else will
     *   return undefined if next slide require wrapping
     */
    findNextSlideIndex(direction, force) {
        let nextSlideIndex = 0;
        if (!force &&
            (this.isLast(this.activeSlide) &&
                direction !== Direction.PREV &&
                this.noWrap)) {
            return;
        }
        switch (direction) {
            case Direction.NEXT:
                // if this is last slide, not force, looping is disabled
                // and need to going forward - select current slide, as a next
                if (typeof this._currentActiveSlide === 'undefined') {
                    nextSlideIndex = 0;
                    break;
                }
                if (!this.isLast(this._currentActiveSlide)) {
                    nextSlideIndex = this._currentActiveSlide + 1;
                    break;
                }
                nextSlideIndex = !force && this.noWrap ? this._currentActiveSlide : 0;
                break;
            case Direction.PREV:
                // if this is first slide, not force, looping is disabled
                // and need to going backward - select current slide, as a next
                if (typeof this._currentActiveSlide === 'undefined') {
                    nextSlideIndex = 0;
                    break;
                }
                if (this._currentActiveSlide > 0) {
                    nextSlideIndex = this._currentActiveSlide - 1;
                    break;
                }
                if (!force && this.noWrap) {
                    nextSlideIndex = this._currentActiveSlide;
                    break;
                }
                nextSlideIndex = this._slides.length - 1;
                break;
            default:
                throw new Error('Unknown direction');
        }
        return nextSlideIndex;
    }
    mapSlidesAndIndexes() {
        return this.slides
            .slice()
            .map((slide, index) => {
            return {
                index,
                item: slide
            };
        });
    }
    selectSlideRange(index) {
        if (this.isIndexInRange(index)) {
            return;
        }
        this.hideSlides();
        if (!this.singleSlideOffset) {
            this.selectRangeByNestedIndex(index);
        }
        else {
            const startIndex = this.isIndexOnTheEdges(index)
                ? index
                : index - this.itemsPerSlide + 1;
            const endIndex = this.isIndexOnTheEdges(index)
                ? index + this.itemsPerSlide
                : index + 1;
            this._slidesWithIndexes = this.mapSlidesAndIndexes().slice(startIndex, endIndex);
            this.makeSlidesConsistent(this._slidesWithIndexes);
            this._slidesWithIndexes.forEach((slide) => slide.item.active = true);
        }
        this.slideRangeChange.emit(this.getVisibleIndexes());
    }
    selectRangeByNestedIndex(index) {
        if (!this._chunkedSlides) {
            return;
        }
        const selectedRange = this._chunkedSlides
            .map((slidesList, i) => {
            return {
                index: i,
                list: slidesList
            };
        })
            .find((slidesList) => {
            return slidesList.list.find(slide => slide.index === index) !== undefined;
        });
        if (!selectedRange) {
            return;
        }
        this._currentVisibleSlidesIndex = selectedRange.index;
        this._chunkedSlides[selectedRange.index].forEach((slide) => {
            slide.item.active = true;
        });
    }
    isIndexOnTheEdges(index) {
        return (index + 1 - this.itemsPerSlide <= 0 ||
            index + this.itemsPerSlide <= this._slides.length);
    }
    isIndexInRange(index) {
        if (this.singleSlideOffset && this._slidesWithIndexes) {
            const visibleIndexes = this._slidesWithIndexes.map((slide) => slide.index);
            return visibleIndexes.indexOf(index) >= 0;
        }
        return (index <= this.getLastVisibleIndex() &&
            index >= this.getFirstVisibleIndex());
    }
    hideSlides() {
        this.slides.forEach((slide) => slide.active = false);
    }
    isVisibleSlideListLast() {
        if (!this._chunkedSlides) {
            return false;
        }
        return this._currentVisibleSlidesIndex === this._chunkedSlides.length - 1;
    }
    isVisibleSlideListFirst() {
        return this._currentVisibleSlidesIndex === 0;
    }
    moveSliderByOneItem(direction) {
        let firstVisibleIndex;
        let lastVisibleIndex;
        let indexToHide;
        let indexToShow;
        if (this.noWrap) {
            firstVisibleIndex = this.getFirstVisibleIndex();
            lastVisibleIndex = this.getLastVisibleIndex();
            indexToHide = direction === Direction.NEXT
                ? firstVisibleIndex
                : lastVisibleIndex;
            indexToShow = direction !== Direction.NEXT
                ? firstVisibleIndex - 1
                : !this.isLast(lastVisibleIndex)
                    ? lastVisibleIndex + 1 : 0;
            const slideToHide = this._slides.get(indexToHide);
            if (slideToHide) {
                slideToHide.active = false;
            }
            const slideToShow = this._slides.get(indexToShow);
            if (slideToShow) {
                slideToShow.active = true;
            }
            const slidesToReorder = this.mapSlidesAndIndexes().filter((slide) => slide.item.active);
            this.makeSlidesConsistent(slidesToReorder);
            if (this.singleSlideOffset) {
                this._slidesWithIndexes = slidesToReorder;
            }
            this.slideRangeChange.emit(this.getVisibleIndexes());
            return;
        }
        if (!this._slidesWithIndexes || !this._slidesWithIndexes[0]) {
            return;
        }
        let index;
        firstVisibleIndex = this._slidesWithIndexes[0].index;
        lastVisibleIndex = this._slidesWithIndexes[this._slidesWithIndexes.length - 1].index;
        if (direction === Direction.NEXT) {
            this._slidesWithIndexes.shift();
            index = this.isLast(lastVisibleIndex)
                ? 0
                : lastVisibleIndex + 1;
            const item = this._slides.get(index);
            if (item) {
                this._slidesWithIndexes.push({ index, item });
            }
        }
        else {
            this._slidesWithIndexes.pop();
            index = this.isFirst(firstVisibleIndex)
                ? this._slides.length - 1
                : firstVisibleIndex - 1;
            const item = this._slides.get(index);
            if (item) {
                this._slidesWithIndexes = [{ index, item }, ...this._slidesWithIndexes];
            }
        }
        this.hideSlides();
        this._slidesWithIndexes.forEach(slide => slide.item.active = true);
        this.makeSlidesConsistent(this._slidesWithIndexes);
        this.slideRangeChange.emit(this._slidesWithIndexes.map((slide) => slide.index));
    }
    moveMultilist(direction) {
        if (this.singleSlideOffset) {
            this.moveSliderByOneItem(direction);
        }
        else {
            this.hideSlides();
            if (this.noWrap) {
                this._currentVisibleSlidesIndex = direction === Direction.NEXT
                    ? this._currentVisibleSlidesIndex + 1
                    : this._currentVisibleSlidesIndex - 1;
            }
            else if (direction === Direction.NEXT) {
                this._currentVisibleSlidesIndex = this.isVisibleSlideListLast()
                    ? 0
                    : this._currentVisibleSlidesIndex + 1;
            }
            else {
                if (this.isVisibleSlideListFirst()) {
                    this._currentVisibleSlidesIndex = this._chunkedSlides
                        ? this._chunkedSlides.length - 1
                        : 0;
                }
                else {
                    this._currentVisibleSlidesIndex = this._currentVisibleSlidesIndex - 1;
                }
            }
            if (this._chunkedSlides) {
                this._chunkedSlides[this._currentVisibleSlidesIndex].forEach((slide) => slide.item.active = true);
            }
            this.slideRangeChange.emit(this.getVisibleIndexes());
        }
    }
    getVisibleIndexes() {
        if (!this.singleSlideOffset && this._chunkedSlides) {
            return this._chunkedSlides[this._currentVisibleSlidesIndex]
                .map((slide) => slide.index);
        }
        if (this._slidesWithIndexes) {
            return this._slidesWithIndexes.map((slide) => slide.index);
        }
    }
    /**
     * Sets a slide, which specified through index, as active
     * @param index
     */
    _select(index) {
        if (isNaN(index)) {
            this.pause();
            return;
        }
        if (!this.multilist && typeof this._currentActiveSlide !== 'undefined') {
            const currentSlide = this._slides.get(this._currentActiveSlide);
            if (typeof currentSlide !== 'undefined') {
                currentSlide.active = false;
            }
        }
        const nextSlide = this._slides.get(index);
        if (typeof nextSlide !== 'undefined') {
            this._currentActiveSlide = index;
            nextSlide.active = true;
            this.activeSlide = index;
            this.activeSlideChange.emit(index);
        }
    }
    /**
     * Starts loop of auto changing of slides
     */
    restartTimer() {
        this.resetTimer();
        const interval = +this.interval;
        if (!isNaN(interval) && interval > 0 && isPlatformBrowser(this.platformId)) {
            this.currentInterval = this.ngZone.runOutsideAngular(() => {
                return window.setInterval(() => {
                    const nInterval = +this.interval;
                    this.ngZone.run(() => {
                        if (this.isPlaying &&
                            !isNaN(this.interval) &&
                            nInterval > 0 &&
                            this.slides.length) {
                            this.nextSlideFromInterval();
                        }
                        else {
                            this.pause();
                        }
                    });
                }, interval);
            });
        }
    }
    get multilist() {
        return this.itemsPerSlide > 1;
    }
    /**
     * Stops loop of auto changing of slides
     */
    resetTimer() {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = void 0;
        }
    }
    checkDisabledClass(buttonType) {
        if (buttonType === 'prev') {
            return (this.activeSlide === 0 && this.noWrap && !this.multilist) || (this.isFirstSlideVisible && this.noWrap && this.multilist);
        }
        return (this.isLast(this.activeSlide) && this.noWrap && !this.multilist) || (this.isLastSlideVisible && this.noWrap && this.multilist);
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CarouselComponent, deps: [{ token: i1.CarouselConfig }, { token: i0.NgZone }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.0.1", type: CarouselComponent, selector: "carousel", inputs: { noWrap: "noWrap", noPause: "noPause", showIndicators: "showIndicators", pauseOnFocus: "pauseOnFocus", indicatorsByChunk: "indicatorsByChunk", itemsPerSlide: "itemsPerSlide", singleSlideOffset: "singleSlideOffset", isAnimated: "isAnimated", activeSlide: "activeSlide", startFromIndex: "startFromIndex", interval: "interval" }, outputs: { activeSlideChange: "activeSlideChange", slideRangeChange: "slideRangeChange" }, ngImport: i0, template: "<div (mouseenter)=\"pause()\"\r\n     (mouseleave)=\"onMouseLeave()\"\r\n     (mouseup)=\"onMouseUp()\"\r\n     (keydown)=\"keydownPress($event)\"\r\n     (focusin)=\"pauseFocusIn()\"\r\n     (focusout)=\"pauseFocusOut()\"\r\n     [id]=\"'carousel' + currentId\"\r\n     class=\"carousel slide\" tabindex=\"0\">\r\n  <ng-container *ngIf=\"!_bsVer.isBs5 && showIndicators && slides.length > 1\">\r\n    <ol class=\"carousel-indicators\">\r\n      <li *ngFor=\"let slide of indicatorsSlides(); let i = index;\"\r\n          [class.active]=\"slide.active === true\"\r\n          (click)=\"selectSlide(i)\">\r\n      </li>\r\n    </ol>\r\n  </ng-container>\r\n  <ng-container *ngIf=\"_bsVer.isBs5 && showIndicators && slides.length > 1\">\r\n    <div class=\"carousel-indicators\">\r\n      <button\r\n        *ngFor=\"let slide of indicatorsSlides(); let i = index;\"\r\n        [class.active]=\"slide.active === true\"\r\n        (click)=\"selectSlide(i)\"\r\n        type=\"button\"\r\n        [attr.data-bs-target]=\"'#carousel' + currentId\"\r\n        [attr.data-bs-slide-to]=\"i\" aria-current=\"true\"\r\n      >\r\n      </button>\r\n    </div>\r\n  </ng-container>\r\n  <div class=\"carousel-inner\" [ngStyle]=\"{'display': multilist ? 'flex' : 'block'}\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n  <a class=\"left carousel-control carousel-control-prev\"\r\n     href=\"javascript:void(0);\"\r\n     [class.disabled]=\"checkDisabledClass('prev')\"\r\n     [attr.data-bs-target]=\"'#carousel' + currentId\"\r\n     *ngIf=\"slides.length > 1\"\r\n     (click)=\"previousSlide()\"\r\n     tabindex=\"0\" role=\"button\">\r\n    <span class=\"icon-prev carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n    <span class=\"sr-only visually-hidden\">Previous</span>\r\n  </a>\r\n\r\n  <a class=\"right carousel-control carousel-control-next\"\r\n     href=\"javascript:void(0);\"\r\n     *ngIf=\"slides.length > 1\"\r\n     (click)=\"nextSlide()\"\r\n     [class.disabled]=\"checkDisabledClass('next')\"\r\n     [attr.data-bs-target]=\"'#carousel' + currentId\"\r\n     tabindex=\"0\" role=\"button\">\r\n    <span class=\"icon-next carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n    <span class=\"sr-only visually-hidden\">Next</span>\r\n  </a>\r\n</div>\r\n", dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.1", ngImport: i0, type: CarouselComponent, decorators: [{
            type: Component,
            args: [{ selector: 'carousel', template: "<div (mouseenter)=\"pause()\"\r\n     (mouseleave)=\"onMouseLeave()\"\r\n     (mouseup)=\"onMouseUp()\"\r\n     (keydown)=\"keydownPress($event)\"\r\n     (focusin)=\"pauseFocusIn()\"\r\n     (focusout)=\"pauseFocusOut()\"\r\n     [id]=\"'carousel' + currentId\"\r\n     class=\"carousel slide\" tabindex=\"0\">\r\n  <ng-container *ngIf=\"!_bsVer.isBs5 && showIndicators && slides.length > 1\">\r\n    <ol class=\"carousel-indicators\">\r\n      <li *ngFor=\"let slide of indicatorsSlides(); let i = index;\"\r\n          [class.active]=\"slide.active === true\"\r\n          (click)=\"selectSlide(i)\">\r\n      </li>\r\n    </ol>\r\n  </ng-container>\r\n  <ng-container *ngIf=\"_bsVer.isBs5 && showIndicators && slides.length > 1\">\r\n    <div class=\"carousel-indicators\">\r\n      <button\r\n        *ngFor=\"let slide of indicatorsSlides(); let i = index;\"\r\n        [class.active]=\"slide.active === true\"\r\n        (click)=\"selectSlide(i)\"\r\n        type=\"button\"\r\n        [attr.data-bs-target]=\"'#carousel' + currentId\"\r\n        [attr.data-bs-slide-to]=\"i\" aria-current=\"true\"\r\n      >\r\n      </button>\r\n    </div>\r\n  </ng-container>\r\n  <div class=\"carousel-inner\" [ngStyle]=\"{'display': multilist ? 'flex' : 'block'}\">\r\n    <ng-content></ng-content>\r\n  </div>\r\n  <a class=\"left carousel-control carousel-control-prev\"\r\n     href=\"javascript:void(0);\"\r\n     [class.disabled]=\"checkDisabledClass('prev')\"\r\n     [attr.data-bs-target]=\"'#carousel' + currentId\"\r\n     *ngIf=\"slides.length > 1\"\r\n     (click)=\"previousSlide()\"\r\n     tabindex=\"0\" role=\"button\">\r\n    <span class=\"icon-prev carousel-control-prev-icon\" aria-hidden=\"true\"></span>\r\n    <span class=\"sr-only visually-hidden\">Previous</span>\r\n  </a>\r\n\r\n  <a class=\"right carousel-control carousel-control-next\"\r\n     href=\"javascript:void(0);\"\r\n     *ngIf=\"slides.length > 1\"\r\n     (click)=\"nextSlide()\"\r\n     [class.disabled]=\"checkDisabledClass('next')\"\r\n     [attr.data-bs-target]=\"'#carousel' + currentId\"\r\n     tabindex=\"0\" role=\"button\">\r\n    <span class=\"icon-next carousel-control-next-icon\" aria-hidden=\"true\"></span>\r\n    <span class=\"sr-only visually-hidden\">Next</span>\r\n  </a>\r\n</div>\r\n" }]
        }], ctorParameters: () => [{ type: i1.CarouselConfig }, { type: i0.NgZone }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }], propDecorators: { noWrap: [{
                type: Input
            }], noPause: [{
                type: Input
            }], showIndicators: [{
                type: Input
            }], pauseOnFocus: [{
                type: Input
            }], indicatorsByChunk: [{
                type: Input
            }], itemsPerSlide: [{
                type: Input
            }], singleSlideOffset: [{
                type: Input
            }], isAnimated: [{
                type: Input
            }], activeSlideChange: [{
                type: Output
            }], slideRangeChange: [{
                type: Output
            }], activeSlide: [{
                type: Input
            }], startFromIndex: [{
                type: Input
            }], interval: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2Nhcm91c2VsL2Nhcm91c2VsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uL3NyYy9jYXJvdXNlbC9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSDs7Ozs7Ozs7R0FRRztBQUVILE9BQU8sRUFDTCxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsTUFBTSxFQUFpQixNQUFNLEVBQUUsV0FBVyxFQUM5RixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUVwRCxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBYyxNQUFNLHFCQUFxQixDQUFDO0FBRXZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxTQUFTLENBQUM7Ozs7QUFHakUsTUFBTSxDQUFOLElBQVksU0FJWDtBQUpELFdBQVksU0FBUztJQUNuQiwrQ0FBTyxDQUFBO0lBQ1AseUNBQUksQ0FBQTtJQUNKLHlDQUFJLENBQUE7QUFDTixDQUFDLEVBSlcsU0FBUyxLQUFULFNBQVMsUUFJcEI7QUFFRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFFbkI7O0dBRUc7QUFLSCxNQUFNLE9BQU8saUJBQWlCO0lBNEI1Qix3REFBd0Q7SUFDeEQsSUFDSSxXQUFXLENBQUMsS0FBYTtRQUMzQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNuQixPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztR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aG92ZXInKSAtIGV2ZW50IGdyb3VwIG5hbWUgd2hpY2ggcGF1c2VzXHJcbiAqIHRoZSBjeWNsaW5nIG9mIHRoZSBjYXJvdXNlbCwgaWYgaG92ZXIgcGF1c2VzIG9uIG1vdXNlZW50ZXIgYW5kIHJlc3VtZXMgb25cclxuICogbW91c2VsZWF2ZSBrZXlib2FyZCAobm90IHlldCBzdXBwb3J0ZWQpICg/Ym9vbGVhbj10cnVlKSAtIGlmIGZhbHNlXHJcbiAqIGNhcm91c2VsIHdpbGwgbm90IHJlYWN0IHRvIGtleWJvYXJkIGV2ZW50c1xyXG4gKiBub3RlOiBzd2lwaW5nIG5vdCB5ZXQgc3VwcG9ydGVkXHJcbiAqL1xyXG4vKioqKlxyXG4gKiBQcm9ibGVtczpcclxuICogMSkgaWYgd2Ugc2V0IGFuIGFjdGl2ZSBzbGlkZSB2aWEgbW9kZWwgY2hhbmdlcywgLmFjdGl2ZSBjbGFzcyByZW1haW5zIG9uIGFcclxuICogY3VycmVudCBzbGlkZS5cclxuICogMikgaWYgd2UgaGF2ZSBvbmx5IG9uZSBzbGlkZSwgd2Ugc2hvdWxkbid0IHNob3cgcHJldi9uZXh0IG5hdiBidXR0b25zXHJcbiAqIDMpIGlmIGZpcnN0IG9yIGxhc3Qgc2xpZGUgaXMgYWN0aXZlIGFuZCBub1dyYXAgaXMgdHJ1ZSwgdGhlcmUgc2hvdWxkIGJlXHJcbiAqIFwiZGlzYWJsZWRcIiBjbGFzcyBvbiB0aGUgbmF2IGJ1dHRvbnMuXHJcbiAqIDQpIGRlZmF1bHQgaW50ZXJ2YWwgc2hvdWxkIGJlIGVxdWFsIDUwMDBcclxuICovXHJcblxyXG5pbXBvcnQge1xyXG4gIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIE91dHB1dCwgQWZ0ZXJWaWV3SW5pdCwgSW5qZWN0LCBQTEFURk9STV9JRFxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5pbXBvcnQgeyBMaW5rZWRMaXN0LCBnZXRCc1ZlciwgSUJzVmVyc2lvbiB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xyXG5pbXBvcnQgeyBTbGlkZUNvbXBvbmVudCB9IGZyb20gJy4vc2xpZGUuY29tcG9uZW50JztcclxuaW1wb3J0IHsgQ2Fyb3VzZWxDb25maWcgfSBmcm9tICcuL2Nhcm91c2VsLmNvbmZpZyc7XHJcbmltcG9ydCB7IGZpbmRMYXN0SW5kZXgsIGNodW5rQnlOdW1iZXIsIGlzTnVtYmVyIH0gZnJvbSAnLi91dGlscyc7XHJcbmltcG9ydCB7IFNsaWRlV2l0aEluZGV4LCBJbmRleGVkU2xpZGVMaXN0IH0gZnJvbSAnLi9tb2RlbHMnO1xyXG5cclxuZXhwb3J0IGVudW0gRGlyZWN0aW9uIHtcclxuICBVTktOT1dOLFxyXG4gIE5FWFQsXHJcbiAgUFJFVlxyXG59XHJcblxyXG5sZXQgX2N1cnJlbnRJZCA9IDE7XHJcblxyXG4vKipcclxuICogQmFzZSBlbGVtZW50IHRvIGNyZWF0ZSBjYXJvdXNlbFxyXG4gKi9cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdjYXJvdXNlbCcsXHJcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhcm91c2VsLmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIC8qIElmIGB0cnVlYCDigJQgY2Fyb3VzZWwgd2lsbCBub3QgY3ljbGUgY29udGludW91c2x5IGFuZCB3aWxsIGhhdmUgaGFyZCBzdG9wcyAocHJldmVudCBsb29waW5nKSAqL1xyXG4gIEBJbnB1dCgpIG5vV3JhcCA9IGZhbHNlO1xyXG4gIC8qICBJZiBgdHJ1ZWAg4oCUIHdpbGwgZGlzYWJsZSBwYXVzaW5nIG9uIGNhcm91c2VsIG1vdXNlIGhvdmVyICovXHJcbiAgQElucHV0KCkgbm9QYXVzZSA9IGZhbHNlO1xyXG4gIC8qICBJZiBgdHJ1ZWAg4oCUIGNhcm91c2VsLWluZGljYXRvcnMgYXJlIHZpc2libGUgICovXHJcbiAgQElucHV0KCkgc2hvd0luZGljYXRvcnMgPSB0cnVlO1xyXG4gIC8qICBJZiBgdHJ1ZWAgLSBhdXRvcGxheSB3aWxsIGJlIHN0b3BwZWQgb24gZm9jdXMgKi9cclxuICBASW5wdXQoKSBwYXVzZU9uRm9jdXMgPSBmYWxzZTtcclxuICAvKiBJZiBgdHJ1ZWAgLSBjYXJvdXNlbCBpbmRpY2F0b3JzIGluZGljYXRlIHNsaWRlcyBjaHVua3NcclxuICAgICB3b3JrcyBPTkxZIGlmIHNpbmdsZVNsaWRlT2Zmc2V0ID0gRkFMU0UgKi9cclxuICBASW5wdXQoKSBpbmRpY2F0b3JzQnlDaHVuayA9IGZhbHNlO1xyXG4gIC8qIElmIHZhbHVlIG1vcmUgdGhlbiAxIOKAlCBjYXJvdXNlbCB3b3JrcyBpbiBtdWx0aWxpc3QgbW9kZSAqL1xyXG4gIEBJbnB1dCgpIGl0ZW1zUGVyU2xpZGUgPSAxO1xyXG4gIC8qIElmIGB0cnVlYCDigJQgY2Fyb3VzZWwgc2hpZnRzIGJ5IG9uZSBlbGVtZW50LiBCeSBkZWZhdWx0IGNhcm91c2VsIHNoaWZ0cyBieSBudW1iZXJcclxuICAgICBvZiB2aXNpYmxlIGVsZW1lbnRzIChpdGVtc1BlclNsaWRlIGZpZWxkKSAqL1xyXG4gIEBJbnB1dCgpIHNpbmdsZVNsaWRlT2Zmc2V0ID0gZmFsc2U7XHJcbiAgLyoqIFR1cm4gb24vb2ZmIGFuaW1hdGlvbi4gQW5pbWF0aW9uIGRvZXNuJ3Qgd29yayBmb3IgbXVsdGlsaXN0IGNhcm91c2VsICovXHJcbiAgQElucHV0KCkgaXNBbmltYXRlZCA9IGZhbHNlO1xyXG5cclxuICAvKiogV2lsbCBiZSBlbWl0dGVkIHdoZW4gYWN0aXZlIHNsaWRlIGhhcyBiZWVuIGNoYW5nZWQuIFBhcnQgb2YgdHdvLXdheS1iaW5kYWJsZSBbKGFjdGl2ZVNsaWRlKV0gcHJvcGVydHkgKi9cclxuICBAT3V0cHV0KClcclxuICBhY3RpdmVTbGlkZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPihmYWxzZSk7XHJcblxyXG4gIC8qKiBXaWxsIGJlIGVtaXR0ZWQgd2hlbiBhY3RpdmUgc2xpZGVzIGhhcyBiZWVuIGNoYW5nZWQgaW4gbXVsdGlsaXN0IG1vZGUgKi9cclxuICBAT3V0cHV0KClcclxuICBzbGlkZVJhbmdlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXJbXXx2b2lkPigpO1xyXG5cclxuICAvKiogSW5kZXggb2YgY3VycmVudGx5IGRpc3BsYXllZCBzbGlkZShzdGFydGVkIGZvciAwKSAqL1xyXG4gIEBJbnB1dCgpXHJcbiAgc2V0IGFjdGl2ZVNsaWRlKGluZGV4OiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLm11bHRpbGlzdCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGlzTnVtYmVyKGluZGV4KSkge1xyXG4gICAgICB0aGlzLmN1c3RvbUFjdGl2ZVNsaWRlID0gaW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX3NsaWRlcy5sZW5ndGggJiYgaW5kZXggIT09IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSkge1xyXG4gICAgICB0aGlzLl9zZWxlY3QoaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZ2V0IGFjdGl2ZVNsaWRlKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlIHx8IDA7XHJcbiAgfVxyXG5cclxuICAvKiBJbmRleCB0byBzdGFydCBkaXNwbGF5IHNsaWRlcyBmcm9tIGl0ICovXHJcbiAgQElucHV0KClcclxuICBzdGFydEZyb21JbmRleCA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIERlbGF5IG9mIGl0ZW0gY3ljbGluZyBpbiBtaWxsaXNlY29uZHMuIElmIGZhbHNlLCBjYXJvdXNlbCB3b24ndCBjeWNsZVxyXG4gICAqIGF1dG9tYXRpY2FsbHkuXHJcbiAgICovXHJcbiAgQElucHV0KClcclxuICBnZXQgaW50ZXJ2YWwoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLl9pbnRlcnZhbDtcclxuICB9XHJcblxyXG4gIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLl9pbnRlcnZhbCA9IHZhbHVlO1xyXG4gICAgdGhpcy5yZXN0YXJ0VGltZXIoKTtcclxuICB9XHJcblxyXG4gIGdldCBzbGlkZXMoKTogU2xpZGVDb21wb25lbnRbXSB7XHJcbiAgICByZXR1cm4gdGhpcy5fc2xpZGVzLnRvQXJyYXkoKTtcclxuICB9XHJcblxyXG4gIGdldCBpc0ZpcnN0U2xpZGVWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgaW5kZXhlcyA9IHRoaXMuZ2V0VmlzaWJsZUluZGV4ZXMoKTtcclxuICAgIGlmICghaW5kZXhlcyB8fCAoaW5kZXhlcyBpbnN0YW5jZW9mIEFycmF5ICYmICFpbmRleGVzLmxlbmd0aCkpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBpbmRleGVzLmluY2x1ZGVzKDApO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlzTGFzdFNsaWRlVmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLmdldFZpc2libGVJbmRleGVzKCk7XHJcbiAgICBpZiAoIWluZGV4ZXMgfHwgKGluZGV4ZXMgaW5zdGFuY2VvZiBBcnJheSAmJiAhaW5kZXhlcy5sZW5ndGgpKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gaW5kZXhlcy5pbmNsdWRlcyh0aGlzLl9zbGlkZXMubGVuZ3RoIC0xKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjdXJyZW50SW50ZXJ2YWw/OiBudW1iZXI7XHJcbiAgcHJvdGVjdGVkIF9jdXJyZW50QWN0aXZlU2xpZGU/OiBudW1iZXI7XHJcbiAgcHJvdGVjdGVkIF9pbnRlcnZhbCA9IDUwMDA7XHJcbiAgcHJvdGVjdGVkIF9zbGlkZXM6IExpbmtlZExpc3Q8U2xpZGVDb21wb25lbnQ+ID0gbmV3IExpbmtlZExpc3Q8U2xpZGVDb21wb25lbnQ+KCk7XHJcbiAgcHJvdGVjdGVkIF9jaHVua2VkU2xpZGVzPzogU2xpZGVXaXRoSW5kZXhbXVtdO1xyXG4gIHByb3RlY3RlZCBfc2xpZGVzV2l0aEluZGV4ZXM/OiBTbGlkZVdpdGhJbmRleFtdO1xyXG4gIHByb3RlY3RlZCBfY3VycmVudFZpc2libGVTbGlkZXNJbmRleCA9IDA7XHJcbiAgcHJvdGVjdGVkIGlzUGxheWluZyA9IGZhbHNlO1xyXG4gIHByb3RlY3RlZCBkZXN0cm95ZWQgPSBmYWxzZTtcclxuICBwcml2YXRlIGN1c3RvbUFjdGl2ZVNsaWRlPzogbnVtYmVyO1xyXG4gIGN1cnJlbnRJZCA9IDA7XHJcblxyXG4gIGdldCBfYnNWZXIoKTogSUJzVmVyc2lvbiB7XHJcbiAgICByZXR1cm4gZ2V0QnNWZXIoKTtcclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yKGNvbmZpZzogQ2Fyb3VzZWxDb25maWcsIHByaXZhdGUgbmdab25lOiBOZ1pvbmUsIEBJbmplY3QoUExBVEZPUk1fSUQpIHB1YmxpYyBwbGF0Zm9ybUlkOiBudW1iZXIpIHtcclxuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcclxuICAgIHRoaXMuY3VycmVudElkID0gX2N1cnJlbnRJZCsrO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnNpbmdsZVNsaWRlT2Zmc2V0KSB7XHJcbiAgICAgICAgdGhpcy5pbmRpY2F0b3JzQnlDaHVuayA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLm11bHRpbGlzdCkge1xyXG4gICAgICAgIHRoaXMuX2NodW5rZWRTbGlkZXMgPSBjaHVua0J5TnVtYmVyKFxyXG4gICAgICAgICAgdGhpcy5tYXBTbGlkZXNBbmRJbmRleGVzKCksXHJcbiAgICAgICAgICB0aGlzLml0ZW1zUGVyU2xpZGVcclxuICAgICAgICApO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0SW5pdGlhbFNsaWRlcygpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5jdXN0b21BY3RpdmVTbGlkZSAmJiAhdGhpcy5tdWx0aWxpc3QpIHtcclxuICAgICAgICB0aGlzLl9zZWxlY3QodGhpcy5jdXN0b21BY3RpdmVTbGlkZSk7XHJcbiAgICAgIH1cclxuICAgIH0sIDApO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBBZGRzIG5ldyBzbGlkZS4gSWYgdGhpcyBzbGlkZSBpcyBmaXJzdCBpbiBjb2xsZWN0aW9uIC0gc2V0IGl0IGFzIGFjdGl2ZVxyXG4gICAqIGFuZCBzdGFydHMgYXV0byBjaGFuZ2luZ1xyXG4gICAqIEBwYXJhbSBzbGlkZVxyXG4gICAqL1xyXG4gIGFkZFNsaWRlKHNsaWRlOiBTbGlkZUNvbXBvbmVudCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc2xpZGVzLmFkZChzbGlkZSk7XHJcblxyXG4gICAgaWYgKHRoaXMubXVsdGlsaXN0ICYmIHRoaXMuX3NsaWRlcy5sZW5ndGggPD0gdGhpcy5pdGVtc1BlclNsaWRlKSB7XHJcbiAgICAgIHNsaWRlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm11bHRpbGlzdCAmJiB0aGlzLmlzQW5pbWF0ZWQpIHtcclxuICAgICAgc2xpZGUuaXNBbmltYXRlZCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm11bHRpbGlzdCAmJiB0aGlzLl9zbGlkZXMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9IHVuZGVmaW5lZDtcclxuICAgICAgaWYgKCF0aGlzLmN1c3RvbUFjdGl2ZVNsaWRlKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9IDA7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMubXVsdGlsaXN0ICYmIHRoaXMuX3NsaWRlcy5sZW5ndGggPiB0aGlzLml0ZW1zUGVyU2xpZGUpIHtcclxuICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZW1vdmVzIHNwZWNpZmllZCBzbGlkZS4gSWYgdGhpcyBzbGlkZSBpcyBhY3RpdmUgLSB3aWxsIHJvbGwgdG8gYW5vdGhlclxyXG4gICAqIHNsaWRlXHJcbiAgICogQHBhcmFtIHNsaWRlXHJcbiAgICovXHJcbiAgcmVtb3ZlU2xpZGUoc2xpZGU6IFNsaWRlQ29tcG9uZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCByZW1JbmRleCA9IHRoaXMuX3NsaWRlcy5pbmRleE9mKHNsaWRlKTtcclxuXHJcbiAgICBpZiAodGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlID09PSByZW1JbmRleCkge1xyXG4gICAgICAvLyByZW1vdmluZyBvZiBhY3RpdmUgc2xpZGVcclxuICAgICAgbGV0IG5leHRTbGlkZUluZGV4OiBudW1iZXI7XHJcbiAgICAgIGlmICh0aGlzLl9zbGlkZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIC8vIGlmIHRoaXMgc2xpZGUgbGFzdCAtIHdpbGwgcm9sbCB0byBmaXJzdCBzbGlkZSwgaWYgbm9XcmFwIGZsYWcgaXNcclxuICAgICAgICAvLyBGQUxTRSBvciB0byBwcmV2aW91cywgaWYgbm9XcmFwIGlzIFRSVUUgaW4gY2FzZSwgaWYgdGhpcyBzbGlkZSBpblxyXG4gICAgICAgIC8vIG1pZGRsZSBvZiBjb2xsZWN0aW9uLCBpbmRleCBvZiBuZXh0IHNsaWRlIGlzIHNhbWUgdG8gcmVtb3ZlZFxyXG4gICAgICAgIG5leHRTbGlkZUluZGV4ID0gIXRoaXMuaXNMYXN0KHJlbUluZGV4KVxyXG4gICAgICAgICAgPyByZW1JbmRleFxyXG4gICAgICAgICAgOiB0aGlzLm5vV3JhcCA/IHJlbUluZGV4IC0gMSA6IDA7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5fc2xpZGVzLnJlbW92ZShyZW1JbmRleCk7XHJcblxyXG4gICAgICAvLyBwcmV2ZW50cyBleGNlcHRpb24gd2l0aCBjaGFuZ2luZyBzb21lIHZhbHVlIGFmdGVyIGNoZWNraW5nXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX3NlbGVjdChuZXh0U2xpZGVJbmRleCk7XHJcbiAgICAgIH0sIDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fc2xpZGVzLnJlbW92ZShyZW1JbmRleCk7XHJcbiAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZUluZGV4ID0gdGhpcy5nZXRDdXJyZW50U2xpZGVJbmRleCgpO1xyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAvLyBhZnRlciByZW1vdmluZywgbmVlZCB0byBhY3R1YWxpemUgaW5kZXggb2YgY3VycmVudCBhY3RpdmUgc2xpZGVcclxuICAgICAgICB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgPSBjdXJyZW50U2xpZGVJbmRleDtcclxuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQodGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlKTtcclxuICAgICAgfSwgMCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZXh0U2xpZGVGcm9tSW50ZXJ2YWwoZm9yY2UgPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgdGhpcy5tb3ZlKERpcmVjdGlvbi5ORVhULCBmb3JjZSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb2xsaW5nIHRvIG5leHQgc2xpZGVcclxuICAgKiBAcGFyYW0gZm9yY2U6IHtib29sZWFufSBpZiB0cnVlIC0gd2lsbCBpZ25vcmUgbm9XcmFwIGZsYWdcclxuICAgKi9cclxuICBuZXh0U2xpZGUoZm9yY2UgPSBmYWxzZSk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNQbGF5aW5nKSB7XHJcbiAgICAgIHRoaXMucmVzdGFydFRpbWVyKCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm1vdmUoRGlyZWN0aW9uLk5FWFQsIGZvcmNlKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvbGxpbmcgdG8gcHJldmlvdXMgc2xpZGVcclxuICAgKiBAcGFyYW0gZm9yY2U6IHtib29sZWFufSBpZiB0cnVlIC0gd2lsbCBpZ25vcmUgbm9XcmFwIGZsYWdcclxuICAgKi9cclxuICBwcmV2aW91c1NsaWRlKGZvcmNlID0gZmFsc2UpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzUGxheWluZykge1xyXG4gICAgICB0aGlzLnJlc3RhcnRUaW1lcigpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5tb3ZlKERpcmVjdGlvbi5QUkVWLCBmb3JjZSk7XHJcbiAgfVxyXG5cclxuICBnZXRGaXJzdFZpc2libGVJbmRleCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLmZpbmRJbmRleCh0aGlzLmdldEFjdGl2ZSk7XHJcbiAgfVxyXG5cclxuICBnZXRMYXN0VmlzaWJsZUluZGV4KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gZmluZExhc3RJbmRleCh0aGlzLnNsaWRlcywgdGhpcy5nZXRBY3RpdmUpO1xyXG4gIH1cclxuXHJcbiAgZ2V0QWN0aXZlID0gKHNsaWRlOiBTbGlkZUNvbXBvbmVudCkgPT4gc2xpZGUuYWN0aXZlO1xyXG5cclxuICBtb3ZlKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBmb3JjZSA9IGZhbHNlKTogdm9pZCB7XHJcbiAgICBjb25zdCBmaXJzdFZpc2libGVJbmRleCA9IHRoaXMuZ2V0Rmlyc3RWaXNpYmxlSW5kZXgoKTtcclxuICAgIGNvbnN0IGxhc3RWaXNpYmxlSW5kZXggPSB0aGlzLmdldExhc3RWaXNpYmxlSW5kZXgoKTtcclxuXHJcbiAgICBpZiAodGhpcy5ub1dyYXApIHtcclxuICAgICAgaWYgKFxyXG4gICAgICAgIGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFQgJiZcclxuICAgICAgICB0aGlzLmlzTGFzdChsYXN0VmlzaWJsZUluZGV4KSB8fFxyXG4gICAgICAgIGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlBSRVYgJiZcclxuICAgICAgICBmaXJzdFZpc2libGVJbmRleCA9PT0gMFxyXG4gICAgICApIHtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAoIXRoaXMubXVsdGlsaXN0KSB7XHJcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB0aGlzLmZpbmROZXh0U2xpZGVJbmRleChkaXJlY3Rpb24sIGZvcmNlKSB8fCAwO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5tb3ZlTXVsdGlsaXN0KGRpcmVjdGlvbik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTd2l0aCBzbGlkZXMgYnkgZW50ZXIsIHNwYWNlIGFuZCBhcnJvd3Mga2V5c1xyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIGtleWRvd25QcmVzcyhldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzIHx8IGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXlDb2RlID09PSAzMiB8fCBldmVudC5rZXkgPT09ICdTcGFjZScpIHtcclxuICAgICAgdGhpcy5uZXh0U2xpZGUoKTtcclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzcgfHwgZXZlbnQua2V5ID09PSAnTGVmdEFycm93Jykge1xyXG4gICAgICB0aGlzLnByZXZpb3VzU2xpZGUoKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMzkgfHwgZXZlbnQua2V5ID09PSAnUmlnaHRBcnJvdycpIHtcclxuICAgICAgdGhpcy5uZXh0U2xpZGUoKTtcclxuXHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFBsYXkgb24gbW91c2UgbGVhdmVcclxuICAgKiBAaW50ZXJuYWxcclxuICAgKi9cclxuICBvbk1vdXNlTGVhdmUoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMucGF1c2VPbkZvY3VzKSB7XHJcbiAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUGxheSBvbiBtb3VzZSB1cFxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIG9uTW91c2VVcCgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5wYXVzZU9uRm9jdXMpIHtcclxuICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBXaGVuIHNsaWRlcyBvbiBmb2N1cyBhdXRvcGxheSBpcyBzdG9wcGVkKG9wdGlvbmFsKVxyXG4gICAqIEBpbnRlcm5hbFxyXG4gICAqL1xyXG4gIHBhdXNlRm9jdXNJbigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnBhdXNlT25Gb2N1cykge1xyXG4gICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnJlc2V0VGltZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFdoZW4gc2xpZGVzIG91dCBvZiBmb2N1cyBhdXRvcGxheSBpcyBzdGFydGVkXHJcbiAgICogQGludGVybmFsXHJcbiAgICovXHJcbiAgcGF1c2VGb2N1c091dCgpOiB2b2lkIHtcclxuICAgIHRoaXMucGxheSgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm9sbGluZyB0byBzcGVjaWZpZWQgc2xpZGVcclxuICAgKiBAcGFyYW0gaW5kZXg6IHtudW1iZXJ9IGluZGV4IG9mIHNsaWRlLCB3aGljaCBtdXN0IGJlIHNob3duXHJcbiAgICovXHJcbiAgc2VsZWN0U2xpZGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuaXNQbGF5aW5nKSB7XHJcbiAgICAgIHRoaXMucmVzdGFydFRpbWVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLm11bHRpbGlzdCkge1xyXG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gdGhpcy5pbmRpY2F0b3JzQnlDaHVuayA/IGluZGV4ICogdGhpcy5pdGVtc1BlclNsaWRlIDogaW5kZXg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNlbGVjdFNsaWRlUmFuZ2UodGhpcy5pbmRpY2F0b3JzQnlDaHVuayA/IGluZGV4ICogdGhpcy5pdGVtc1BlclNsaWRlIDogaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3RhcnRzIGEgYXV0byBjaGFuZ2luZyBvZiBzbGlkZXNcclxuICAgKi9cclxuICBwbGF5KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLmlzUGxheWluZykge1xyXG4gICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICAgIHRoaXMucmVzdGFydFRpbWVyKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdG9wcyBhIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzXHJcbiAgICovXHJcbiAgcGF1c2UoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMubm9QYXVzZSkge1xyXG4gICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnJlc2V0VGltZXIoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpbmRzIGFuZCByZXR1cm5zIGluZGV4IG9mIGN1cnJlbnRseSBkaXNwbGF5ZWQgc2xpZGVcclxuICAgKi9cclxuICBnZXRDdXJyZW50U2xpZGVJbmRleCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuX3NsaWRlcy5maW5kSW5kZXgodGhpcy5nZXRBY3RpdmUpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRGVmaW5lcywgd2hldGhlciB0aGUgc3BlY2lmaWVkIGluZGV4IGlzIGxhc3QgaW4gY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBpbmRleFxyXG4gICAqL1xyXG4gIGlzTGFzdChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gaW5kZXggKyAxID49IHRoaXMuX3NsaWRlcy5sZW5ndGg7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzLCB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgaW5kZXggaXMgZmlyc3QgaW4gY29sbGVjdGlvblxyXG4gICAqIEBwYXJhbSBpbmRleFxyXG4gICAqL1xyXG4gIGlzRmlyc3QoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIGluZGV4ID09PSAwO1xyXG4gIH1cclxuXHJcbiAgaW5kaWNhdG9yc1NsaWRlcygpOiBTbGlkZUNvbXBvbmVudFtdIHtcclxuICAgIHJldHVybiB0aGlzLnNsaWRlcy5maWx0ZXIoXHJcbiAgICAgIChzbGlkZTogU2xpZGVDb21wb25lbnQsIGluZGV4OiBudW1iZXIpID0+ICF0aGlzLmluZGljYXRvcnNCeUNodW5rIHx8IGluZGV4ICUgdGhpcy5pdGVtc1BlclNsaWRlID09PSAwXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBzZWxlY3RJbml0aWFsU2xpZGVzKCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMuc3RhcnRGcm9tSW5kZXggPD0gdGhpcy5fc2xpZGVzLmxlbmd0aFxyXG4gICAgICA/IHRoaXMuc3RhcnRGcm9tSW5kZXhcclxuICAgICAgOiAwO1xyXG5cclxuICAgIHRoaXMuaGlkZVNsaWRlcygpO1xyXG5cclxuICAgIGlmICh0aGlzLnNpbmdsZVNsaWRlT2Zmc2V0KSB7XHJcbiAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzID0gdGhpcy5tYXBTbGlkZXNBbmRJbmRleGVzKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5fc2xpZGVzLmxlbmd0aCAtIHN0YXJ0SW5kZXggPCB0aGlzLml0ZW1zUGVyU2xpZGUpIHtcclxuICAgICAgICBjb25zdCBzbGlkZXNUb0FwcGVuZCA9IHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLnNsaWNlKDAsIHN0YXJ0SW5kZXgpO1xyXG5cclxuICAgICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcyA9IFtcclxuICAgICAgICAgIC4uLnRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLFxyXG4gICAgICAgICAgLi4uc2xpZGVzVG9BcHBlbmRcclxuICAgICAgICBdXHJcbiAgICAgICAgICAuc2xpY2Uoc2xpZGVzVG9BcHBlbmQubGVuZ3RoKVxyXG4gICAgICAgICAgLnNsaWNlKDAsIHRoaXMuaXRlbXNQZXJTbGlkZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMgPSB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5zbGljZShcclxuICAgICAgICAgIHN0YXJ0SW5kZXgsXHJcbiAgICAgICAgICBzdGFydEluZGV4ICsgdGhpcy5pdGVtc1BlclNsaWRlXHJcbiAgICAgICAgKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMuZm9yRWFjaCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pdGVtLmFjdGl2ZSA9IHRydWUpO1xyXG4gICAgICB0aGlzLm1ha2VTbGlkZXNDb25zaXN0ZW50KHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0UmFuZ2VCeU5lc3RlZEluZGV4KHN0YXJ0SW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2xpZGVSYW5nZUNoYW5nZS5lbWl0KHRoaXMuZ2V0VmlzaWJsZUluZGV4ZXMoKSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBEZWZpbmVzIG5leHQgc2xpZGUgaW5kZXgsIGRlcGVuZGluZyBvZiBkaXJlY3Rpb25cclxuICAgKiBAcGFyYW0gZGlyZWN0aW9uOiBEaXJlY3Rpb24oVU5LTk9XTnxQUkVWfE5FWFQpXHJcbiAgICogQHBhcmFtIGZvcmNlOiB7Ym9vbGVhbn0gaWYgVFJVRSAtIHdpbGwgaWdub3JlIG5vV3JhcCBmbGFnLCBlbHNlIHdpbGxcclxuICAgKiAgIHJldHVybiB1bmRlZmluZWQgaWYgbmV4dCBzbGlkZSByZXF1aXJlIHdyYXBwaW5nXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBmaW5kTmV4dFNsaWRlSW5kZXgoZGlyZWN0aW9uOiBEaXJlY3Rpb24sIGZvcmNlOiBib29sZWFuKTogbnVtYmVyIHwgdm9pZCB7XHJcbiAgICBsZXQgbmV4dFNsaWRlSW5kZXggPSAwO1xyXG5cclxuICAgIGlmIChcclxuICAgICAgIWZvcmNlICYmXHJcbiAgICAgICh0aGlzLmlzTGFzdCh0aGlzLmFjdGl2ZVNsaWRlKSAmJlxyXG4gICAgICAgIGRpcmVjdGlvbiAhPT0gRGlyZWN0aW9uLlBSRVYgJiZcclxuICAgICAgICB0aGlzLm5vV3JhcClcclxuICAgICkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSBEaXJlY3Rpb24uTkVYVDpcclxuICAgICAgICAvLyBpZiB0aGlzIGlzIGxhc3Qgc2xpZGUsIG5vdCBmb3JjZSwgbG9vcGluZyBpcyBkaXNhYmxlZFxyXG4gICAgICAgIC8vIGFuZCBuZWVkIHRvIGdvaW5nIGZvcndhcmQgLSBzZWxlY3QgY3VycmVudCBzbGlkZSwgYXMgYSBuZXh0XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICBuZXh0U2xpZGVJbmRleCA9IDA7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzTGFzdCh0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpKSB7XHJcbiAgICAgICAgICBuZXh0U2xpZGVJbmRleCA9IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSArIDE7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV4dFNsaWRlSW5kZXggPSAhZm9yY2UgJiYgdGhpcy5ub1dyYXAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgOiAwO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIERpcmVjdGlvbi5QUkVWOlxyXG4gICAgICAgIC8vIGlmIHRoaXMgaXMgZmlyc3Qgc2xpZGUsIG5vdCBmb3JjZSwgbG9vcGluZyBpcyBkaXNhYmxlZFxyXG4gICAgICAgIC8vIGFuZCBuZWVkIHRvIGdvaW5nIGJhY2t3YXJkIC0gc2VsZWN0IGN1cnJlbnQgc2xpZGUsIGFzIGEgbmV4dFxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgbmV4dFNsaWRlSW5kZXggPSAwO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgPiAwKSB7XHJcbiAgICAgICAgICBuZXh0U2xpZGVJbmRleCA9IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSAtIDE7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFmb3JjZSAmJiB0aGlzLm5vV3JhcCkge1xyXG4gICAgICAgICAgbmV4dFNsaWRlSW5kZXggPSB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGU7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV4dFNsaWRlSW5kZXggPSB0aGlzLl9zbGlkZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZGlyZWN0aW9uJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG5leHRTbGlkZUluZGV4O1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBtYXBTbGlkZXNBbmRJbmRleGVzKCk6IFNsaWRlV2l0aEluZGV4W10ge1xyXG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzXHJcbiAgICAgIC5zbGljZSgpXHJcbiAgICAgIC5tYXAoKHNsaWRlOiBTbGlkZUNvbXBvbmVudCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBpbmRleCxcclxuICAgICAgICAgIGl0ZW06IHNsaWRlXHJcbiAgICAgICAgfTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxuXHJcbiAgcHJpdmF0ZSBzZWxlY3RTbGlkZVJhbmdlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmlzSW5kZXhJblJhbmdlKGluZGV4KSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5oaWRlU2xpZGVzKCk7XHJcblxyXG4gICAgaWYgKCF0aGlzLnNpbmdsZVNsaWRlT2Zmc2V0KSB7XHJcbiAgICAgIHRoaXMuc2VsZWN0UmFuZ2VCeU5lc3RlZEluZGV4KGluZGV4KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLmlzSW5kZXhPblRoZUVkZ2VzKGluZGV4KVxyXG4gICAgICAgID8gaW5kZXhcclxuICAgICAgICA6IGluZGV4IC0gdGhpcy5pdGVtc1BlclNsaWRlICsgMTtcclxuXHJcbiAgICAgIGNvbnN0IGVuZEluZGV4ID0gdGhpcy5pc0luZGV4T25UaGVFZGdlcyhpbmRleClcclxuICAgICAgICA/IGluZGV4ICsgdGhpcy5pdGVtc1BlclNsaWRlXHJcbiAgICAgICAgOiBpbmRleCArIDE7XHJcblxyXG4gICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcyA9IHRoaXMubWFwU2xpZGVzQW5kSW5kZXhlcygpLnNsaWNlKHN0YXJ0SW5kZXgsIGVuZEluZGV4KTtcclxuICAgICAgdGhpcy5tYWtlU2xpZGVzQ29uc2lzdGVudCh0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcyk7XHJcblxyXG4gICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5mb3JFYWNoKChzbGlkZTogU2xpZGVXaXRoSW5kZXgpID0+IHNsaWRlLml0ZW0uYWN0aXZlID0gdHJ1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zbGlkZVJhbmdlQ2hhbmdlLmVtaXQodGhpcy5nZXRWaXNpYmxlSW5kZXhlcygpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgc2VsZWN0UmFuZ2VCeU5lc3RlZEluZGV4KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5fY2h1bmtlZFNsaWRlcykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRSYW5nZSA9IHRoaXMuX2NodW5rZWRTbGlkZXNcclxuICAgICAgLm1hcCgoc2xpZGVzTGlzdCwgaTogbnVtYmVyKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGluZGV4OiBpLFxyXG4gICAgICAgICAgbGlzdDogc2xpZGVzTGlzdFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0pXHJcbiAgICAgIC5maW5kKFxyXG4gICAgICAgIChzbGlkZXNMaXN0OiBJbmRleGVkU2xpZGVMaXN0KSA9PiB7XHJcbiAgICAgICAgICByZXR1cm4gc2xpZGVzTGlzdC5saXN0LmZpbmQoc2xpZGUgPT4gc2xpZGUuaW5kZXggPT09IGluZGV4KSAhPT0gdW5kZWZpbmVkO1xyXG4gICAgICAgIH1cclxuICAgICAgKTtcclxuXHJcbiAgICBpZiAoIXNlbGVjdGVkUmFuZ2UpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggPSBzZWxlY3RlZFJhbmdlLmluZGV4O1xyXG5cclxuICAgIHRoaXMuX2NodW5rZWRTbGlkZXNbc2VsZWN0ZWRSYW5nZS5pbmRleF0uZm9yRWFjaCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiB7XHJcbiAgICAgIHNsaWRlLml0ZW0uYWN0aXZlID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0luZGV4T25UaGVFZGdlcyhpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBpbmRleCArIDEgLSB0aGlzLml0ZW1zUGVyU2xpZGUgPD0gMCB8fFxyXG4gICAgICBpbmRleCArIHRoaXMuaXRlbXNQZXJTbGlkZSA8PSB0aGlzLl9zbGlkZXMubGVuZ3RoXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBpc0luZGV4SW5SYW5nZShpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5zaW5nbGVTbGlkZU9mZnNldCAmJiB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcykge1xyXG4gICAgICBjb25zdCB2aXNpYmxlSW5kZXhlcyA9IHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLm1hcCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pbmRleCk7XHJcblxyXG4gICAgICByZXR1cm4gdmlzaWJsZUluZGV4ZXMuaW5kZXhPZihpbmRleCkgPj0gMDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKFxyXG4gICAgICBpbmRleCA8PSB0aGlzLmdldExhc3RWaXNpYmxlSW5kZXgoKSAmJlxyXG4gICAgICBpbmRleCA+PSB0aGlzLmdldEZpcnN0VmlzaWJsZUluZGV4KClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGhpZGVTbGlkZXMoKTogdm9pZCB7XHJcbiAgICB0aGlzLnNsaWRlcy5mb3JFYWNoKChzbGlkZTogU2xpZGVDb21wb25lbnQpID0+IHNsaWRlLmFjdGl2ZSA9IGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXNWaXNpYmxlU2xpZGVMaXN0TGFzdCgpOiBib29sZWFuIHtcclxuICAgIGlmICghdGhpcy5fY2h1bmtlZFNsaWRlcykge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggPT09IHRoaXMuX2NodW5rZWRTbGlkZXMubGVuZ3RoIC0gMTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaXNWaXNpYmxlU2xpZGVMaXN0Rmlyc3QoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCA9PT0gMDtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgbW92ZVNsaWRlckJ5T25lSXRlbShkaXJlY3Rpb246IERpcmVjdGlvbik6IHZvaWQge1xyXG4gICAgbGV0IGZpcnN0VmlzaWJsZUluZGV4OiBudW1iZXI7XHJcbiAgICBsZXQgbGFzdFZpc2libGVJbmRleDogbnVtYmVyO1xyXG4gICAgbGV0IGluZGV4VG9IaWRlOiBudW1iZXI7XHJcbiAgICBsZXQgaW5kZXhUb1Nob3c6IG51bWJlcjtcclxuXHJcbiAgICBpZiAodGhpcy5ub1dyYXApIHtcclxuICAgICAgZmlyc3RWaXNpYmxlSW5kZXggPSB0aGlzLmdldEZpcnN0VmlzaWJsZUluZGV4KCk7XHJcbiAgICAgIGxhc3RWaXNpYmxlSW5kZXggPSB0aGlzLmdldExhc3RWaXNpYmxlSW5kZXgoKTtcclxuXHJcbiAgICAgIGluZGV4VG9IaWRlID0gZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVFxyXG4gICAgICAgID8gZmlyc3RWaXNpYmxlSW5kZXhcclxuICAgICAgICA6IGxhc3RWaXNpYmxlSW5kZXg7XHJcblxyXG4gICAgICBpbmRleFRvU2hvdyA9IGRpcmVjdGlvbiAhPT0gRGlyZWN0aW9uLk5FWFRcclxuICAgICAgICA/IGZpcnN0VmlzaWJsZUluZGV4IC0gMVxyXG4gICAgICAgIDogIXRoaXMuaXNMYXN0KGxhc3RWaXNpYmxlSW5kZXgpXHJcbiAgICAgICAgICA/IGxhc3RWaXNpYmxlSW5kZXggKyAxIDogMDtcclxuXHJcbiAgICAgIGNvbnN0IHNsaWRlVG9IaWRlID0gdGhpcy5fc2xpZGVzLmdldChpbmRleFRvSGlkZSk7XHJcbiAgICAgIGlmIChzbGlkZVRvSGlkZSkge1xyXG4gICAgICAgIHNsaWRlVG9IaWRlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzbGlkZVRvU2hvdyA9IHRoaXMuX3NsaWRlcy5nZXQoaW5kZXhUb1Nob3cpO1xyXG4gICAgICBpZiAoc2xpZGVUb1Nob3cpIHtcclxuICAgICAgICBzbGlkZVRvU2hvdy5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjb25zdCBzbGlkZXNUb1Jlb3JkZXIgPSB0aGlzLm1hcFNsaWRlc0FuZEluZGV4ZXMoKS5maWx0ZXIoXHJcbiAgICAgICAgKHNsaWRlOiBTbGlkZVdpdGhJbmRleCkgPT4gc2xpZGUuaXRlbS5hY3RpdmVcclxuICAgICAgKTtcclxuXHJcbiAgICAgIHRoaXMubWFrZVNsaWRlc0NvbnNpc3RlbnQoc2xpZGVzVG9SZW9yZGVyKTtcclxuICAgICAgaWYgKHRoaXMuc2luZ2xlU2xpZGVPZmZzZXQpIHtcclxuICAgICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcyA9IHNsaWRlc1RvUmVvcmRlcjtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5zbGlkZVJhbmdlQ2hhbmdlLmVtaXQodGhpcy5nZXRWaXNpYmxlSW5kZXhlcygpKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMgfHwgIXRoaXMuX3NsaWRlc1dpdGhJbmRleGVzWzBdKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgaW5kZXg6IG51bWJlcjtcclxuXHJcbiAgICBmaXJzdFZpc2libGVJbmRleCA9IHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzWzBdLmluZGV4O1xyXG4gICAgbGFzdFZpc2libGVJbmRleCA9IHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzW3RoaXMuX3NsaWRlc1dpdGhJbmRleGVzLmxlbmd0aCAtIDFdLmluZGV4O1xyXG5cclxuICAgIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUKSB7XHJcbiAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLnNoaWZ0KCk7XHJcblxyXG4gICAgICBpbmRleCA9IHRoaXMuaXNMYXN0KGxhc3RWaXNpYmxlSW5kZXgpXHJcbiAgICAgICAgPyAwXHJcbiAgICAgICAgOiBsYXN0VmlzaWJsZUluZGV4ICsgMTtcclxuXHJcbiAgICAgIGNvbnN0IGl0ZW0gPSB0aGlzLl9zbGlkZXMuZ2V0KGluZGV4KTtcclxuXHJcbiAgICAgIGlmIChpdGVtKSB7XHJcbiAgICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMucHVzaCh7IGluZGV4LCBpdGVtIH0pO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5wb3AoKTtcclxuICAgICAgaW5kZXggPSB0aGlzLmlzRmlyc3QoZmlyc3RWaXNpYmxlSW5kZXgpXHJcbiAgICAgICAgPyB0aGlzLl9zbGlkZXMubGVuZ3RoIC0gMVxyXG4gICAgICAgIDogZmlyc3RWaXNpYmxlSW5kZXggLSAxO1xyXG5cclxuICAgICAgY29uc3QgaXRlbSA9IHRoaXMuX3NsaWRlcy5nZXQoaW5kZXgpO1xyXG4gICAgICBpZiAoaXRlbSkge1xyXG4gICAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzID0gW3sgaW5kZXgsIGl0ZW0gfSwgLi4udGhpcy5fc2xpZGVzV2l0aEluZGV4ZXNdO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5oaWRlU2xpZGVzKCk7XHJcblxyXG4gICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5pdGVtLmFjdGl2ZSA9IHRydWUpO1xyXG4gICAgdGhpcy5tYWtlU2xpZGVzQ29uc2lzdGVudCh0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcyk7XHJcblxyXG4gICAgdGhpcy5zbGlkZVJhbmdlQ2hhbmdlLmVtaXQoXHJcbiAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLm1hcCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pbmRleClcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIG1ha2VTbGlkZXNDb25zaXN0ZW50ID0gKHNsaWRlczogU2xpZGVXaXRoSW5kZXhbXSk6IHZvaWQgPT4ge1xyXG4gICAgc2xpZGVzLmZvckVhY2goKHNsaWRlOiBTbGlkZVdpdGhJbmRleCwgaW5kZXg6IG51bWJlcikgPT4gc2xpZGUuaXRlbS5vcmRlciA9IGluZGV4KTtcclxuICB9O1xyXG5cclxuICBwcml2YXRlIG1vdmVNdWx0aWxpc3QoZGlyZWN0aW9uOiBEaXJlY3Rpb24pOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLnNpbmdsZVNsaWRlT2Zmc2V0KSB7XHJcbiAgICAgIHRoaXMubW92ZVNsaWRlckJ5T25lSXRlbShkaXJlY3Rpb24pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5oaWRlU2xpZGVzKCk7XHJcblxyXG4gICAgICBpZiAodGhpcy5ub1dyYXApIHtcclxuICAgICAgICB0aGlzLl9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4ID0gZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVFxyXG4gICAgICAgICAgPyB0aGlzLl9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4ICsgMVxyXG4gICAgICAgICAgOiB0aGlzLl9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4IC0gMTtcclxuICAgICAgfSBlbHNlIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUKSB7XHJcbiAgICAgICAgdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCA9IHRoaXMuaXNWaXNpYmxlU2xpZGVMaXN0TGFzdCgpXHJcbiAgICAgICAgICA/IDBcclxuICAgICAgICAgIDogdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCArIDE7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNWaXNpYmxlU2xpZGVMaXN0Rmlyc3QoKSkge1xyXG4gICAgICAgICAgdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCA9IHRoaXMuX2NodW5rZWRTbGlkZXNcclxuICAgICAgICAgICAgPyB0aGlzLl9jaHVua2VkU2xpZGVzLmxlbmd0aCAtIDFcclxuICAgICAgICAgICAgOiAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4ID0gdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCAtIDE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGhpcy5fY2h1bmtlZFNsaWRlcykge1xyXG4gICAgICAgIHRoaXMuX2NodW5rZWRTbGlkZXNbdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleF0uZm9yRWFjaChcclxuICAgICAgICAgIChzbGlkZTogU2xpZGVXaXRoSW5kZXgpID0+IHNsaWRlLml0ZW0uYWN0aXZlID0gdHJ1ZVxyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5zbGlkZVJhbmdlQ2hhbmdlLmVtaXQodGhpcy5nZXRWaXNpYmxlSW5kZXhlcygpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2V0VmlzaWJsZUluZGV4ZXMoKTogbnVtYmVyW10gfCB2b2lkIHtcclxuICAgIGlmICghdGhpcy5zaW5nbGVTbGlkZU9mZnNldCAmJiB0aGlzLl9jaHVua2VkU2xpZGVzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9jaHVua2VkU2xpZGVzW3RoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXhdXHJcbiAgICAgICAgLm1hcCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzKSB7XHJcbiAgICAgIHJldHVybiB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5tYXAoKHNsaWRlOiBTbGlkZVdpdGhJbmRleCkgPT4gc2xpZGUuaW5kZXgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBhIHNsaWRlLCB3aGljaCBzcGVjaWZpZWQgdGhyb3VnaCBpbmRleCwgYXMgYWN0aXZlXHJcbiAgICogQHBhcmFtIGluZGV4XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfc2VsZWN0KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGlmIChpc05hTihpbmRleCkpIHtcclxuICAgICAgdGhpcy5wYXVzZSgpO1xyXG5cclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5tdWx0aWxpc3QgJiYgdHlwZW9mIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgY29uc3QgY3VycmVudFNsaWRlID0gdGhpcy5fc2xpZGVzLmdldCh0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpO1xyXG4gICAgICBpZiAodHlwZW9mIGN1cnJlbnRTbGlkZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICBjdXJyZW50U2xpZGUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBuZXh0U2xpZGUgPSB0aGlzLl9zbGlkZXMuZ2V0KGluZGV4KTtcclxuXHJcbiAgICBpZiAodHlwZW9mIG5leHRTbGlkZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlID0gaW5kZXg7XHJcbiAgICAgIG5leHRTbGlkZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gaW5kZXg7XHJcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGVDaGFuZ2UuZW1pdChpbmRleCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTdGFydHMgbG9vcCBvZiBhdXRvIGNoYW5naW5nIG9mIHNsaWRlc1xyXG4gICAqL1xyXG4gIHByaXZhdGUgcmVzdGFydFRpbWVyKCkge1xyXG4gICAgdGhpcy5yZXNldFRpbWVyKCk7XHJcbiAgICBjb25zdCBpbnRlcnZhbCA9ICt0aGlzLmludGVydmFsO1xyXG4gICAgaWYgKCFpc05hTihpbnRlcnZhbCkgJiYgaW50ZXJ2YWwgPiAwICYmIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcclxuICAgICAgdGhpcy5jdXJyZW50SW50ZXJ2YWwgPSB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcjxudW1iZXI+KCgpID0+IHtcclxuICAgICAgICByZXR1cm4gd2luZG93LnNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgIGNvbnN0IG5JbnRlcnZhbCA9ICt0aGlzLmludGVydmFsO1xyXG4gICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKFxyXG4gICAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nICYmXHJcbiAgICAgICAgICAgICAgIWlzTmFOKHRoaXMuaW50ZXJ2YWwpICYmXHJcbiAgICAgICAgICAgICAgbkludGVydmFsID4gMCAmJlxyXG4gICAgICAgICAgICAgIHRoaXMuc2xpZGVzLmxlbmd0aFxyXG4gICAgICAgICAgICApIHtcclxuICAgICAgICAgICAgICB0aGlzLm5leHRTbGlkZUZyb21JbnRlcnZhbCgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgaW50ZXJ2YWwpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGdldCBtdWx0aWxpc3QoKTogYm9vbGVhbiB7XHJcbiAgICByZXR1cm4gdGhpcy5pdGVtc1BlclNsaWRlID4gMTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN0b3BzIGxvb3Agb2YgYXV0byBjaGFuZ2luZyBvZiBzbGlkZXNcclxuICAgKi9cclxuICBwcml2YXRlIHJlc2V0VGltZXIoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5jdXJyZW50SW50ZXJ2YWwpIHtcclxuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmN1cnJlbnRJbnRlcnZhbCk7XHJcbiAgICAgIHRoaXMuY3VycmVudEludGVydmFsID0gdm9pZCAwO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgY2hlY2tEaXNhYmxlZENsYXNzKGJ1dHRvblR5cGU6ICdwcmV2JyB8ICduZXh0Jyk6IGJvb2xlYW4ge1xyXG4gICAgaWYgKGJ1dHRvblR5cGUgPT09ICdwcmV2Jykge1xyXG4gICAgICByZXR1cm4gKHRoaXMuYWN0aXZlU2xpZGUgPT09IDAgJiYgdGhpcy5ub1dyYXAgJiYgIXRoaXMubXVsdGlsaXN0KSB8fCAodGhpcy5pc0ZpcnN0U2xpZGVWaXNpYmxlICYmIHRoaXMubm9XcmFwICYmIHRoaXMubXVsdGlsaXN0KTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gKHRoaXMuaXNMYXN0KHRoaXMuYWN0aXZlU2xpZGUpICYmIHRoaXMubm9XcmFwICYmICF0aGlzLm11bHRpbGlzdCkgfHwgKHRoaXMuaXNMYXN0U2xpZGVWaXNpYmxlICYmIHRoaXMubm9XcmFwICYmIHRoaXMubXVsdGlsaXN0KTtcclxuICB9XHJcbn1cclxuIiwiPGRpdiAobW91c2VlbnRlcik9XCJwYXVzZSgpXCJcclxuICAgICAobW91c2VsZWF2ZSk9XCJvbk1vdXNlTGVhdmUoKVwiXHJcbiAgICAgKG1vdXNldXApPVwib25Nb3VzZVVwKClcIlxyXG4gICAgIChrZXlkb3duKT1cImtleWRvd25QcmVzcygkZXZlbnQpXCJcclxuICAgICAoZm9jdXNpbik9XCJwYXVzZUZvY3VzSW4oKVwiXHJcbiAgICAgKGZvY3Vzb3V0KT1cInBhdXNlRm9jdXNPdXQoKVwiXHJcbiAgICAgW2lkXT1cIidjYXJvdXNlbCcgKyBjdXJyZW50SWRcIlxyXG4gICAgIGNsYXNzPVwiY2Fyb3VzZWwgc2xpZGVcIiB0YWJpbmRleD1cIjBcIj5cclxuICA8bmctY29udGFpbmVyICpuZ0lmPVwiIV9ic1Zlci5pc0JzNSAmJiBzaG93SW5kaWNhdG9ycyAmJiBzbGlkZXMubGVuZ3RoID4gMVwiPlxyXG4gICAgPG9sIGNsYXNzPVwiY2Fyb3VzZWwtaW5kaWNhdG9yc1wiPlxyXG4gICAgICA8bGkgKm5nRm9yPVwibGV0IHNsaWRlIG9mIGluZGljYXRvcnNTbGlkZXMoKTsgbGV0IGkgPSBpbmRleDtcIlxyXG4gICAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJzbGlkZS5hY3RpdmUgPT09IHRydWVcIlxyXG4gICAgICAgICAgKGNsaWNrKT1cInNlbGVjdFNsaWRlKGkpXCI+XHJcbiAgICAgIDwvbGk+XHJcbiAgICA8L29sPlxyXG4gIDwvbmctY29udGFpbmVyPlxyXG4gIDxuZy1jb250YWluZXIgKm5nSWY9XCJfYnNWZXIuaXNCczUgJiYgc2hvd0luZGljYXRvcnMgJiYgc2xpZGVzLmxlbmd0aCA+IDFcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJvdXNlbC1pbmRpY2F0b3JzXCI+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICAqbmdGb3I9XCJsZXQgc2xpZGUgb2YgaW5kaWNhdG9yc1NsaWRlcygpOyBsZXQgaSA9IGluZGV4O1wiXHJcbiAgICAgICAgW2NsYXNzLmFjdGl2ZV09XCJzbGlkZS5hY3RpdmUgPT09IHRydWVcIlxyXG4gICAgICAgIChjbGljayk9XCJzZWxlY3RTbGlkZShpKVwiXHJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgW2F0dHIuZGF0YS1icy10YXJnZXRdPVwiJyNjYXJvdXNlbCcgKyBjdXJyZW50SWRcIlxyXG4gICAgICAgIFthdHRyLmRhdGEtYnMtc2xpZGUtdG9dPVwiaVwiIGFyaWEtY3VycmVudD1cInRydWVcIlxyXG4gICAgICA+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9uZy1jb250YWluZXI+XHJcbiAgPGRpdiBjbGFzcz1cImNhcm91c2VsLWlubmVyXCIgW25nU3R5bGVdPVwieydkaXNwbGF5JzogbXVsdGlsaXN0ID8gJ2ZsZXgnIDogJ2Jsb2NrJ31cIj5cclxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICA8L2Rpdj5cclxuICA8YSBjbGFzcz1cImxlZnQgY2Fyb3VzZWwtY29udHJvbCBjYXJvdXNlbC1jb250cm9sLXByZXZcIlxyXG4gICAgIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCJcclxuICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiY2hlY2tEaXNhYmxlZENsYXNzKCdwcmV2JylcIlxyXG4gICAgIFthdHRyLmRhdGEtYnMtdGFyZ2V0XT1cIicjY2Fyb3VzZWwnICsgY3VycmVudElkXCJcclxuICAgICAqbmdJZj1cInNsaWRlcy5sZW5ndGggPiAxXCJcclxuICAgICAoY2xpY2spPVwicHJldmlvdXNTbGlkZSgpXCJcclxuICAgICB0YWJpbmRleD1cIjBcIiByb2xlPVwiYnV0dG9uXCI+XHJcbiAgICA8c3BhbiBjbGFzcz1cImljb24tcHJldiBjYXJvdXNlbC1jb250cm9sLXByZXYtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgIDxzcGFuIGNsYXNzPVwic3Itb25seSB2aXN1YWxseS1oaWRkZW5cIj5QcmV2aW91czwvc3Bhbj5cclxuICA8L2E+XHJcblxyXG4gIDxhIGNsYXNzPVwicmlnaHQgY2Fyb3VzZWwtY29udHJvbCBjYXJvdXNlbC1jb250cm9sLW5leHRcIlxyXG4gICAgIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMCk7XCJcclxuICAgICAqbmdJZj1cInNsaWRlcy5sZW5ndGggPiAxXCJcclxuICAgICAoY2xpY2spPVwibmV4dFNsaWRlKClcIlxyXG4gICAgIFtjbGFzcy5kaXNhYmxlZF09XCJjaGVja0Rpc2FibGVkQ2xhc3MoJ25leHQnKVwiXHJcbiAgICAgW2F0dHIuZGF0YS1icy10YXJnZXRdPVwiJyNjYXJvdXNlbCcgKyBjdXJyZW50SWRcIlxyXG4gICAgIHRhYmluZGV4PVwiMFwiIHJvbGU9XCJidXR0b25cIj5cclxuICAgIDxzcGFuIGNsYXNzPVwiaWNvbi1uZXh0IGNhcm91c2VsLWNvbnRyb2wtbmV4dC1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJzci1vbmx5IHZpc3VhbGx5LWhpZGRlblwiPk5leHQ8L3NwYW4+XHJcbiAgPC9hPlxyXG48L2Rpdj5cclxuIl19