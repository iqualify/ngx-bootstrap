import { getMonth } from '../utils/date-getters';
import { getDayOfWeek } from '../units/day-of-week';
//! moment.js locale configuration
//! locale : Polish [pl]
//! author : Rafal Hirsz : https://github.com/evoL
let monthsNominative = 'styczeń_luty_marzec_kwiecień_maj_czerwiec_lipiec_sierpień_wrzesień_październik_listopad_grudzień'.split('_');
let monthsSubjective = 'stycznia_lutego_marca_kwietnia_maja_czerwca_lipca_sierpnia_września_października_listopada_grudnia'.split('_');
function plural(num) {
    return (num % 10 < 5) && (num % 10 > 1) && ((~~(num / 10) % 10) !== 1);
}
function translate(num, withoutSuffix, key) {
    let result = num + ' ';
    switch (key) {
        case 'ss':
            return result + (plural(num) ? 'sekundy' : 'sekund');
        case 'm':
            return withoutSuffix ? 'minuta' : 'minutę';
        case 'mm':
            return result + (plural(num) ? 'minuty' : 'minut');
        case 'h':
            return withoutSuffix ? 'godzina' : 'godzinę';
        case 'hh':
            return result + (plural(num) ? 'godziny' : 'godzin');
        case 'MM':
            return result + (plural(num) ? 'miesiące' : 'miesięcy');
        case 'yy':
            return result + (plural(num) ? 'lata' : 'lat');
    }
}
export const plLocale = {
    abbr: 'pl',
    months(date, format, isUTC) {
        if (!date) {
            return monthsNominative;
        }
        else if (format === '') {
            // Hack: if format empty we know this is used to generate
            // RegExp by moment. Give then back both valid forms of months
            // in RegExp ready format.
            return '(' + monthsSubjective[getMonth(date, isUTC)] + '|' + monthsNominative[getMonth(date, isUTC)] + ')';
        }
        else if (/D MMMM/.test(format)) {
            return monthsSubjective[getMonth(date, isUTC)];
        }
        else {
            return monthsNominative[getMonth(date, isUTC)];
        }
    },
    monthsShort: 'sty_lut_mar_kwi_maj_cze_lip_sie_wrz_paź_lis_gru'.split('_'),
    weekdays: 'niedziela_poniedziałek_wtorek_środa_czwartek_piątek_sobota'.split('_'),
    weekdaysShort: 'ndz_pon_wt_śr_czw_pt_sob'.split('_'),
    weekdaysMin: 'Nd_Pn_Wt_Śr_Cz_Pt_So'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Dziś o] LT',
        nextDay: '[Jutro o] LT',
        nextWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[W niedzielę o] LT';
                case 2:
                    return '[We wtorek o] LT';
                case 3:
                    return '[W środę o] LT';
                case 5:
                    return '[W piątek o] LT';
                case 6:
                    return '[W sobotę o] LT';
                default:
                    return '[W] dddd [o] LT';
            }
        },
        lastDay: '[Wczoraj o] LT',
        lastWeek(date) {
            switch (getDayOfWeek(date)) {
                case 0:
                    return '[W zeszłą niedzielę o] LT';
                case 3:
                    return '[W zeszłą środę o] LT';
                case 4:
                    return '[W zeszłą czwartek o] LT';
                case 5:
                    return '[W zeszłą piątek o] LT';
                case 6:
                    return '[W zeszłą sobotę o] LT';
                default:
                    return '[W zeszły] dddd [o] LT';
            }
        },
        sameElse: 'L'
    },
    relativeTime: {
        future: 'za %s',
        past: '%s temu',
        s: 'kilka sekund',
        ss: translate,
        m: translate,
        mm: translate,
        h: translate,
        hh: translate,
        d: '1 dzień',
        dd: '%d dni',
        M: 'miesiąc',
        MM: translate,
        y: 'rok',
        yy: translate
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL3BsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFcEQsa0NBQWtDO0FBQ2xDLHdCQUF3QjtBQUN4QixrREFBa0Q7QUFFbEQsSUFBSSxnQkFBZ0IsR0FBRyxrR0FBa0csQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckksSUFBSSxnQkFBZ0IsR0FBRyxvR0FBb0csQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFFdkksU0FBUyxNQUFNLENBQUMsR0FBVztJQUN6QixPQUFPLENBQUMsR0FBRyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUN6RSxDQUFDO0FBRUQsU0FBUyxTQUFTLENBQUMsR0FBVyxFQUFFLGFBQXNCLEVBQUUsR0FBVztJQUNqRSxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ3ZCLFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDWixLQUFLLElBQUk7WUFDUCxPQUFPLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2RCxLQUFLLEdBQUc7WUFDTixPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDN0MsS0FBSyxJQUFJO1lBQ1AsT0FBTyxNQUFN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WUFDN0IsQ0FBQztRQUNILENBQUM7UUFDRCxPQUFPLEVBQUUsZ0JBQWdCO1FBQ3pCLFFBQVEsQ0FBQyxJQUFVO1lBQ2pCLFFBQVEsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQzNCLEtBQUssQ0FBQztvQkFDSixPQUFPLDJCQUEyQixDQUFDO2dCQUNyQyxLQUFLLENBQUM7b0JBQ0osT0FBTyx1QkFBdUIsQ0FBQztnQkFDakMsS0FBSyxDQUFDO29CQUNKLE9BQU8sMEJBQTBCLENBQUM7Z0JBQ3BDLEtBQUssQ0FBQztvQkFDSixPQUFPLHdCQUF3QixDQUFDO2dCQUNsQyxLQUFLLENBQUM7b0JBQ0osT0FBTyx3QkFBd0IsQ0FBQztnQkFDbEM7b0JBQ0UsT0FBTyx3QkFBd0IsQ0FBQztZQUNwQyxDQUFDO1FBQ0gsQ0FBQztRQUNELFFBQVEsRUFBRSxHQUFHO0tBQ2Q7SUFDRCxZQUFZLEVBQUU7UUFDWixNQUFNLEVBQUUsT0FBTztRQUNmLElBQUksRUFBRSxTQUFTO1FBQ2YsQ0FBQyxFQUFFLGNBQWM7UUFDakIsRUFBRSxFQUFFLFNBQVM7UUFDYixDQUFDLEVBQUUsU0FBUztRQUNaLEVBQUUsRUFBRSxTQUFTO1FBQ2IsQ0FBQyxFQUFFLFNBQVM7UUFDWixFQUFFLEVBQUUsU0FBUztRQUNiLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFFBQVE7UUFDWixDQUFDLEVBQUUsU0FBUztRQUNaLEVBQUUsRUFBRSxTQUFTO1FBQ2IsQ0FBQyxFQUFFLEtBQUs7UUFDUixFQUFFLEVBQUUsU0FBUztLQUNkO0lBQ0Qsc0JBQXNCLEVBQUUsV0FBVztJQUNuQyxPQUFPLEVBQUUsS0FBSztJQUNkLElBQUksRUFBRTtRQUNKLEdBQUcsRUFBRSxDQUFDLEVBQUUsdUNBQXVDO1FBQy9DLEdBQUcsRUFBRSxDQUFDLENBQUUsZ0VBQWdFO0tBQ3pFO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2FsZURhdGEgfSBmcm9tICcuLi9sb2NhbGUvbG9jYWxlLmNsYXNzJztcclxuaW1wb3J0IHsgZ2V0TW9udGggfSBmcm9tICcuLi91dGlscy9kYXRlLWdldHRlcnMnO1xyXG5pbXBvcnQgeyBnZXREYXlPZldlZWsgfSBmcm9tICcuLi91bml0cy9kYXktb2Ytd2Vlayc7XHJcblxyXG4vLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXHJcbi8vISBsb2NhbGUgOiBQb2xpc2ggW3BsXVxyXG4vLyEgYXV0aG9yIDogUmFmYWwgSGlyc3ogOiBodHRwczovL2dpdGh1Yi5jb20vZXZvTFxyXG5cclxubGV0IG1vbnRoc05vbWluYXRpdmUgPSAnc3R5Y3plxYRfbHV0eV9tYXJ6ZWNfa3dpZWNpZcWEX21hal9jemVyd2llY19saXBpZWNfc2llcnBpZcWEX3dyemVzaWXFhF9wYcW6ZHppZXJuaWtfbGlzdG9wYWRfZ3J1ZHppZcWEJy5zcGxpdCgnXycpO1xyXG5sZXQgbW9udGhzU3ViamVjdGl2ZSA9ICdzdHljem5pYV9sdXRlZ29fbWFyY2Ffa3dpZXRuaWFfbWFqYV9jemVyd2NhX2xpcGNhX3NpZXJwbmlhX3dyemXFm25pYV9wYcW6ZHppZXJuaWthX2xpc3RvcGFkYV9ncnVkbmlhJy5zcGxpdCgnXycpO1xyXG5cclxuZnVuY3Rpb24gcGx1cmFsKG51bTogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgcmV0dXJuIChudW0gJSAxMCA8IDUpICYmIChudW0gJSAxMCA+IDEpICYmICgofn4obnVtIC8gMTApICUgMTApICE9PSAxKTtcclxufVxyXG5cclxuZnVuY3Rpb24gdHJhbnNsYXRlKG51bTogbnVtYmVyLCB3aXRob3V0U3VmZml4OiBib29sZWFuLCBrZXk6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgbGV0IHJlc3VsdCA9IG51bSArICcgJztcclxuICBzd2l0Y2ggKGtleSkge1xyXG4gICAgY2FzZSAnc3MnOlxyXG4gICAgICByZXR1cm4gcmVzdWx0ICsgKHBsdXJhbChudW0pID8gJ3Nla3VuZHknIDogJ3Nla3VuZCcpO1xyXG4gICAgY2FzZSAnbSc6XHJcbiAgICAgIHJldHVybiB3aXRob3V0U3VmZml4ID8gJ21pbnV0YScgOiAnbWludXTEmSc7XHJcbiAgICBjYXNlICdtbSc6XHJcbiAgICAgIHJldHVybiByZXN1bHQgKyAocGx1cmFsKG51bSkgPyAnbWludXR5JyA6ICdtaW51dCcpO1xyXG4gICAgY2FzZSAnaCc6XHJcbiAgICAgIHJldHVybiB3aXRob3V0U3VmZml4ID8gJ2dvZHppbmEnIDogJ2dvZHppbsSZJztcclxuICAgIGNhc2UgJ2hoJzpcclxuICAgICAgcmV0dXJuIHJlc3VsdCArIChwbHVyYWwobnVtKSA/ICdnb2R6aW55JyA6ICdnb2R6aW4nKTtcclxuICAgIGNhc2UgJ01NJzpcclxuICAgICAgcmV0dXJuIHJlc3VsdCArIChwbHVyYWwobnVtKSA/ICdtaWVzacSFY2UnIDogJ21pZXNpxJljeScpO1xyXG4gICAgY2FzZSAneXknOlxyXG4gICAgICByZXR1cm4gcmVzdWx0ICsgKHBsdXJhbChudW0pID8gJ2xhdGEnIDogJ2xhdCcpO1xyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IHBsTG9jYWxlOiBMb2NhbGVEYXRhID0ge1xyXG4gIGFiYnI6ICdwbCcsXHJcbiAgbW9udGhzKGRhdGU6IERhdGUsIGZvcm1hdDogc3RyaW5nLCBpc1VUQz86IGJvb2xlYW4pOiBzdHJpbmcgfCBzdHJpbmdbXSB7XHJcbiAgICBpZiAoIWRhdGUpIHtcclxuICAgICAgcmV0dXJuIG1vbnRoc05vbWluYXRpdmU7XHJcbiAgICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gJycpIHtcclxuICAgICAgLy8gSGFjazogaWYgZm9ybWF0IGVtcHR5IHdlIGtub3cgdGhpcyBpcyB1c2VkIHRvIGdlbmVyYXRlXHJcbiAgICAgIC8vIFJlZ0V4cCBieSBtb21lbnQuIEdpdmUgdGhlbiBiYWNrIGJvdGggdmFsaWQgZm9ybXMgb2YgbW9udGhzXHJcbiAgICAgIC8vIGluIFJlZ0V4cCByZWFkeSBmb3JtYXQuXHJcbiAgICAgIHJldHVybiAnKCcgKyBtb250aHNTdWJqZWN0aXZlW2dldE1vbnRoKGRhdGUsIGlzVVRDKV0gKyAnfCcgKyBtb250aHNOb21pbmF0aXZlW2dldE1vbnRoKGRhdGUsIGlzVVRDKV0gKyAnKSc7XHJcbiAgICB9IGVsc2UgaWYgKC9EIE1NTU0vLnRlc3QoZm9ybWF0KSkge1xyXG4gICAgICByZXR1cm4gbW9udGhzU3ViamVjdGl2ZVtnZXRNb250aChkYXRlLCBpc1VUQyldO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG1vbnRoc05vbWluYXRpdmVbZ2V0TW9udGgoZGF0ZSwgaXNVVEMpXTtcclxuICAgIH1cclxuICB9LFxyXG4gIG1vbnRoc1Nob3J0OiAnc3R5X2x1dF9tYXJfa3dpX21hal9jemVfbGlwX3NpZV93cnpfcGHFul9saXNfZ3J1Jy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzOiAnbmllZHppZWxhX3BvbmllZHppYcWCZWtfd3RvcmVrX8Wbcm9kYV9jendhcnRla19wacSFdGVrX3NvYm90YScuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c1Nob3J0OiAnbmR6X3Bvbl93dF/Fm3JfY3p3X3B0X3NvYicuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c01pbjogJ05kX1BuX1d0X8Wacl9Del9QdF9Tbycuc3BsaXQoJ18nKSxcclxuICBsb25nRGF0ZUZvcm1hdDoge1xyXG4gICAgTFQ6ICdISDptbScsXHJcbiAgICBMVFM6ICdISDptbTpzcycsXHJcbiAgICBMOiAnREQuTU0uWVlZWScsXHJcbiAgICBMTDogJ0QgTU1NTSBZWVlZJyxcclxuICAgIExMTDogJ0QgTU1NTSBZWVlZIEhIOm1tJyxcclxuICAgIExMTEw6ICdkZGRkLCBEIE1NTU0gWVlZWSBISDptbSdcclxuICB9LFxyXG4gIGNhbGVuZGFyOiB7XHJcbiAgICBzYW1lRGF5OiAnW0R6acWbIG9dIExUJyxcclxuICAgIG5leHREYXk6ICdbSnV0cm8gb10gTFQnLFxyXG4gICAgbmV4dFdlZWsoZGF0ZTogRGF0ZSk6IHN0cmluZyB7XHJcbiAgICAgIHN3aXRjaCAoZ2V0RGF5T2ZXZWVrKGRhdGUpKSB7XHJcbiAgICAgICAgY2FzZSAwOlxyXG4gICAgICAgICAgcmV0dXJuICdbVyBuaWVkemllbMSZIG9dIExUJztcclxuXHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgcmV0dXJuICdbV2Ugd3RvcmVrIG9dIExUJztcclxuXHJcbiAgICAgICAgY2FzZSAzOlxyXG4gICAgICAgICAgcmV0dXJuICdbVyDFm3JvZMSZIG9dIExUJztcclxuXHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgcmV0dXJuICdbVyBwacSFdGVrIG9dIExUJztcclxuXHJcbiAgICAgICAgY2FzZSA2OlxyXG4gICAgICAgICAgcmV0dXJuICdbVyBzb2JvdMSZIG9dIExUJztcclxuXHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgIHJldHVybiAnW1ddIGRkZGQgW29dIExUJztcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIGxhc3REYXk6ICdbV2N6b3JhaiBvXSBMVCcsXHJcbiAgICBsYXN0V2VlayhkYXRlOiBEYXRlKTogc3RyaW5nIHtcclxuICAgICAgc3dpdGNoIChnZXREYXlPZldlZWsoZGF0ZSkpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICByZXR1cm4gJ1tXIHplc3rFgsSFIG5pZWR6aWVsxJkgb10gTFQnO1xyXG4gICAgICAgIGNhc2UgMzpcclxuICAgICAgICAgIHJldHVybiAnW1cgemVzesWCxIUgxZtyb2TEmSBvXSBMVCc7XHJcbiAgICAgICAgY2FzZSA0OlxyXG4gICAgICAgICAgcmV0dXJuICdbVyB6ZXN6xYLEhSBjendhcnRlayBvXSBMVCc7XHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgcmV0dXJuICdbVyB6ZXN6xYLEhSBwacSFdGVrIG9dIExUJztcclxuICAgICAgICBjYXNlIDY6XHJcbiAgICAgICAgICByZXR1cm4gJ1tXIHplc3rFgsSFIHNvYm90xJkgb10gTFQnO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICByZXR1cm4gJ1tXIHplc3rFgnldIGRkZGQgW29dIExUJztcclxuICAgICAgfVxyXG4gICAgfSxcclxuICAgIHNhbWVFbHNlOiAnTCdcclxuICB9LFxyXG4gIHJlbGF0aXZlVGltZToge1xyXG4gICAgZnV0dXJlOiAnemEgJXMnLFxyXG4gICAgcGFzdDogJyVzIHRlbXUnLFxyXG4gICAgczogJ2tpbGthIHNla3VuZCcsXHJcbiAgICBzczogdHJhbnNsYXRlLFxyXG4gICAgbTogdHJhbnNsYXRlLFxyXG4gICAgbW06IHRyYW5zbGF0ZSxcclxuICAgIGg6IHRyYW5zbGF0ZSxcclxuICAgIGhoOiB0cmFuc2xhdGUsXHJcbiAgICBkOiAnMSBkemllxYQnLFxyXG4gICAgZGQ6ICclZCBkbmknLFxyXG4gICAgTTogJ21pZXNpxIVjJyxcclxuICAgIE1NOiB0cmFuc2xhdGUsXHJcbiAgICB5OiAncm9rJyxcclxuICAgIHl5OiB0cmFuc2xhdGVcclxuICB9LFxyXG4gIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IC9cXGR7MSwyfVxcLi8sXHJcbiAgb3JkaW5hbDogJyVkLicsXHJcbiAgd2Vlazoge1xyXG4gICAgZG93OiAxLCAvLyBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cclxuICAgIGRveTogNCAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gNHRoIGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxyXG4gIH1cclxufTtcclxuIl19