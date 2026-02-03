//! moment.js locale configuration
//! locale : German [de]
//! author : lluchs : https://github.com/lluchs
//! author: Menelion Elensúle: https://github.com/Oire
//! author : Mikolaj Dadela : https://github.com/mik01aj
function processRelativeTime(num, withoutSuffix, key, isFuture) {
    const format = {
        'm': ['eine Minute', 'einer Minute'],
        'h': ['eine Stunde', 'einer Stunde'],
        'd': ['ein Tag', 'einem Tag'],
        'dd': [num + ' Tage', num + ' Tagen'],
        'M': ['ein Monat', 'einem Monat'],
        'MM': [num + ' Monate', num + ' Monaten'],
        'y': ['ein Jahr', 'einem Jahr'],
        'yy': [num + ' Jahre', num + ' Jahren']
    };
    return withoutSuffix ? format[key][0] : format[key][1];
}
export const deLocale = {
    abbr: 'de',
    months: 'Januar_Februar_März_April_Mai_Juni_Juli_August_September_Oktober_November_Dezember'.split('_'),
    monthsShort: 'Jan._Feb._März_Apr._Mai_Juni_Juli_Aug._Sep._Okt._Nov._Dez.'.split('_'),
    monthsParseExact: true,
    weekdays: 'Sonntag_Montag_Dienstag_Mittwoch_Donnerstag_Freitag_Samstag'.split('_'),
    weekdaysShort: 'So._Mo._Di._Mi._Do._Fr._Sa.'.split('_'),
    weekdaysMin: 'So_Mo_Di_Mi_Do_Fr_Sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY HH:mm',
        LLLL: 'dddd, D. MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[heute um] LT [Uhr]',
        sameElse: 'L',
        nextDay: '[morgen um] LT [Uhr]',
        nextWeek: 'dddd [um] LT [Uhr]',
        lastDay: '[gestern um] LT [Uhr]',
        lastWeek: '[letzten] dddd [um] LT [Uhr]'
    },
    relativeTime: {
        future: 'in %s',
        past: 'vor %s',
        s: 'ein paar Sekunden',
        ss: '%d Sekunden',
        m: processRelativeTime,
        mm: '%d Minuten',
        h: processRelativeTime,
        hh: '%d Stunden',
        d: processRelativeTime,
        dd: processRelativeTime,
        M: processRelativeTime,
        MM: processRelativeTime,
        y: processRelativeTime,
        yy: processRelativeTime
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyx3QkFBd0I7QUFDeEIsK0NBQStDO0FBQy9DLHNEQUFzRDtBQUN0RCx3REFBd0Q7QUFFeEQsU0FBUyxtQkFBbUIsQ0FBQyxHQUFXLEVBQUUsYUFBc0IsRUFBRSxHQUFXLEVBQUUsUUFBaUI7SUFDOUYsTUFBTSxNQUFNLEdBQXdDO1FBQ2xELEdBQUcsRUFBRSxDQUFDLGFBQWEsRUFBRSxjQUFjLENBQUM7UUFDcEMsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLGNBQWMsQ0FBQztRQUNwQyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDO1FBQzdCLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxPQUFPLEVBQUUsR0FBRyxHQUFHLFFBQVEsQ0FBQztRQUNyQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDO1FBQ2pDLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxTQUFTLEVBQUUsR0FBRyxHQUFHLFVBQVUsQ0FBQztRQUN6QyxHQUFHLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO1FBQy9CLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxRQUFRLEVBQUUsR0FBRyxHQUFHLFNBQVMsQ0FBQztLQUN4QyxDQUFDO0lBQ0YsT0FBTyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pELENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWU7SUFDbEMsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUUsb0ZBQW9GLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUN2RyxXQUFXLEVBQUUsNERBQTRELENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNwRixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLFFBQVEsRUFBRSw2REFBNkQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ2xGLGFBQWEsRUFBRSw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3ZELFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzlDLGtCQUFrQixFQUFFLElBQUk7SUFDeEIsY0FBYyxFQUFFO1FBQ2QsRUFBRSxFQUFFLE9BQU87UUFDWCxHQUFHLEVBQUUsVUFBVTtRQUNmLENBQUMsRUFBRSxZQUFZO1FBQ2YsRUFBRSxFQUFFLGNBQWM7UUFDbEIsR0FBRyxFQUFFLG9CQUFvQjtRQUN6QixJQUFJLEVBQUUsMEJBQTBCO0tBQ2pDO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsT0FBTyxFQUFFLHFCQUFxQjtRQUM5QixRQUFRLEVBQUUsR0FBRztRQUNiLE9BQU8sRUFBRSxzQkFBc0I7UUFDL0IsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixPQUFPLEVBQUUsdUJBQXVCO1FBQ2hDLFFBQVEsRUFBRSw4QkFBOEI7S0FDekM7SUFDRCxZQUFZLEVBQUU7UUFDWixNQUFNLEVBQUUsT0FBTztRQUNmLElBQUksRUFBRSxRQUFRO1FBQ2QsQ0FBQyxFQUFFLG1CQUFtQjtRQUN0QixFQUFFLEVBQUUsYUFBYTtRQUNqQixDQUFDLEVBQUUsbUJBQW1CO1FBQ3RCLEVBQUUsRUFBRSxZQUFZO1FBQ2hCLENBQUMsRUFBRSxtQkFBbUI7UUFDdEIsRUFBRSxFQUFFLFlBQVk7UUFDaEIsQ0FBQyxFQUFFLG1CQUFtQjtRQUN0QixFQUFFLEVBQUUsbUJBQW1CO1FBQ3ZCLENBQUMsRUFBRSxtQkFBbUI7UUFDdEIsRUFBRSxFQUFFLG1CQUFtQjtRQUN2QixDQUFDLEVBQUUsbUJBQW1CO1FBQ3RCLEVBQUUsRUFBRSxtQkFBbUI7S0FDeEI7SUFDRCxzQkFBc0IsRUFBRSxXQUFXO0lBQ25DLE9BQU8sRUFBRSxLQUFLO0lBQ2QsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLENBQUMsRUFBRSx1Q0FBdUM7UUFDL0MsR0FBRyxFQUFFLENBQUMsQ0FBRSxnRUFBZ0U7S0FDekU7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xyXG5cclxuLy8hIG1vbWVudC5qcyBsb2NhbGUgY29uZmlndXJhdGlvblxyXG4vLyEgbG9jYWxlIDogR2VybWFuIFtkZV1cclxuLy8hIGF1dGhvciA6IGxsdWNocyA6IGh0dHBzOi8vZ2l0aHViLmNvbS9sbHVjaHNcclxuLy8hIGF1dGhvcjogTWVuZWxpb24gRWxlbnPDumxlOiBodHRwczovL2dpdGh1Yi5jb20vT2lyZVxyXG4vLyEgYXV0aG9yIDogTWlrb2xhaiBEYWRlbGEgOiBodHRwczovL2dpdGh1Yi5jb20vbWlrMDFhalxyXG5cclxuZnVuY3Rpb24gcHJvY2Vzc1JlbGF0aXZlVGltZShudW06IG51bWJlciwgd2l0aG91dFN1ZmZpeDogYm9vbGVhbiwga2V5OiBzdHJpbmcsIGlzRnV0dXJlOiBib29sZWFuKTogc3RyaW5nIHtcclxuICBjb25zdCBmb3JtYXQ6IHsgW2tleTogc3RyaW5nXTogW3N0cmluZywgc3RyaW5nXSB9ID0ge1xyXG4gICAgJ20nOiBbJ2VpbmUgTWludXRlJywgJ2VpbmVyIE1pbnV0ZSddLFxyXG4gICAgJ2gnOiBbJ2VpbmUgU3R1bmRlJywgJ2VpbmVyIFN0dW5kZSddLFxyXG4gICAgJ2QnOiBbJ2VpbiBUYWcnLCAnZWluZW0gVGFnJ10sXHJcbiAgICAnZGQnOiBbbnVtICsgJyBUYWdlJywgbnVtICsgJyBUYWdlbiddLFxyXG4gICAgJ00nOiBbJ2VpbiBNb25hdCcsICdlaW5lbSBNb25hdCddLFxyXG4gICAgJ01NJzogW251bSArICcgTW9uYXRlJywgbnVtICsgJyBNb25hdGVuJ10sXHJcbiAgICAneSc6IFsnZWluIEphaHInLCAnZWluZW0gSmFociddLFxyXG4gICAgJ3l5JzogW251bSArICcgSmFocmUnLCBudW0gKyAnIEphaHJlbiddXHJcbiAgfTtcclxuICByZXR1cm4gd2l0aG91dFN1ZmZpeCA/IGZvcm1hdFtrZXldWzBdIDogZm9ybWF0W2tleV1bMV07XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBkZUxvY2FsZTogTG9jYWxlRGF0YSA9IHtcclxuICBhYmJyOiAnZGUnLFxyXG4gIG1vbnRoczogJ0phbnVhcl9GZWJydWFyX03DpHJ6X0FwcmlsX01haV9KdW5pX0p1bGlfQXVndXN0X1NlcHRlbWJlcl9Pa3RvYmVyX05vdmVtYmVyX0RlemVtYmVyJy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1Nob3J0OiAnSmFuLl9GZWIuX03DpHJ6X0Fwci5fTWFpX0p1bmlfSnVsaV9BdWcuX1NlcC5fT2t0Ll9Ob3YuX0Rlei4nLnNwbGl0KCdfJyksXHJcbiAgbW9udGhzUGFyc2VFeGFjdDogdHJ1ZSxcclxuICB3ZWVrZGF5czogJ1Nvbm50YWdfTW9udGFnX0RpZW5zdGFnX01pdHR3b2NoX0Rvbm5lcnN0YWdfRnJlaXRhZ19TYW1zdGFnJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzU2hvcnQ6ICdTby5fTW8uX0RpLl9NaS5fRG8uX0ZyLl9TYS4nLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNNaW46ICdTb19Nb19EaV9NaV9Eb19Gcl9TYScuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c1BhcnNlRXhhY3Q6IHRydWUsXHJcbiAgbG9uZ0RhdGVGb3JtYXQ6IHtcclxuICAgIExUOiAnSEg6bW0nLFxyXG4gICAgTFRTOiAnSEg6bW06c3MnLFxyXG4gICAgTDogJ0RELk1NLllZWVknLFxyXG4gICAgTEw6ICdELiBNTU1NIFlZWVknLFxyXG4gICAgTExMOiAnRC4gTU1NTSBZWVlZIEhIOm1tJyxcclxuICAgIExMTEw6ICdkZGRkLCBELiBNTU1NIFlZWVkgSEg6bW0nXHJcbiAgfSxcclxuICBjYWxlbmRhcjoge1xyXG4gICAgc2FtZURheTogJ1toZXV0ZSB1bV0gTFQgW1Vocl0nLFxyXG4gICAgc2FtZUVsc2U6ICdMJyxcclxuICAgIG5leHREYXk6ICdbbW9yZ2VuIHVtXSBMVCBbVWhyXScsXHJcbiAgICBuZXh0V2VlazogJ2RkZGQgW3VtXSBMVCBbVWhyXScsXHJcbiAgICBsYXN0RGF5OiAnW2dlc3Rlcm4gdW1dIExUIFtVaHJdJyxcclxuICAgIGxhc3RXZWVrOiAnW2xldHp0ZW5dIGRkZGQgW3VtXSBMVCBbVWhyXSdcclxuICB9LFxyXG4gIHJlbGF0aXZlVGltZToge1xyXG4gICAgZnV0dXJlOiAnaW4gJXMnLFxyXG4gICAgcGFzdDogJ3ZvciAlcycsXHJcbiAgICBzOiAnZWluIHBhYXIgU2VrdW5kZW4nLFxyXG4gICAgc3M6ICclZCBTZWt1bmRlbicsXHJcbiAgICBtOiBwcm9jZXNzUmVsYXRpdmVUaW1lLFxyXG4gICAgbW06ICclZCBNaW51dGVuJyxcclxuICAgIGg6IHByb2Nlc3NSZWxhdGl2ZVRpbWUsXHJcbiAgICBoaDogJyVkIFN0dW5kZW4nLFxyXG4gICAgZDogcHJvY2Vzc1JlbGF0aXZlVGltZSxcclxuICAgIGRkOiBwcm9jZXNzUmVsYXRpdmVUaW1lLFxyXG4gICAgTTogcHJvY2Vzc1JlbGF0aXZlVGltZSxcclxuICAgIE1NOiBwcm9jZXNzUmVsYXRpdmVUaW1lLFxyXG4gICAgeTogcHJvY2Vzc1JlbGF0aXZlVGltZSxcclxuICAgIHl5OiBwcm9jZXNzUmVsYXRpdmVUaW1lXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn1cXC4vLFxyXG4gIG9yZGluYWw6ICclZC4nLFxyXG4gIHdlZWs6IHtcclxuICAgIGRvdzogMSwgLy8gTW9uZGF5IGlzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsuXHJcbiAgICBkb3k6IDQgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDR0aCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cclxuICB9XHJcbn07XHJcbiJdfQ==