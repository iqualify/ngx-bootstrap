import { getMonth } from '../utils/date-getters';
//! moment.js locale configuration
//! locale : Dutch [nl]
//! author : Joris Röling : https://github.com/jorisroling
//! author : Jacob Middag : https://github.com/middagj
let monthsShortWithDots = 'jan._feb._mrt._apr._mei_jun._jul._aug._sep._okt._nov._dec.'.split('_'), monthsShortWithoutDots = 'jan_feb_mrt_apr_mei_jun_jul_aug_sep_okt_nov_dec'.split('_');
let monthsParse = [/^jan/i, /^feb/i, /^maart|mrt.?$/i, /^apr/i, /^mei$/i, /^jun[i.]?$/i, /^jul[i.]?$/i, /^aug/i, /^sep/i, /^okt/i, /^nov/i, /^dec/i];
let monthsRegex = /^(januari|februari|maart|april|mei|april|ju[nl]i|augustus|september|oktober|november|december|jan\.?|feb\.?|mrt\.?|apr\.?|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i;
export const nlLocale = {
    abbr: 'nl',
    months: 'januari_februari_maart_april_mei_juni_juli_augustus_september_oktober_november_december'.split('_'),
    monthsShort(date, format, isUTC) {
        if (!date) {
            return monthsShortWithDots;
        }
        else if (/-MMM-/.test(format)) {
            return monthsShortWithoutDots[getMonth(date, isUTC)];
        }
        else {
            return monthsShortWithDots[getMonth(date, isUTC)];
        }
    },
    monthsRegex,
    monthsShortRegex: monthsRegex,
    monthsStrictRegex: /^(januari|februari|maart|mei|ju[nl]i|april|augustus|september|oktober|november|december)/i,
    monthsShortStrictRegex: /^(jan\.?|feb\.?|mrt\.?|apr\.?|mei|ju[nl]\.?|aug\.?|sep\.?|okt\.?|nov\.?|dec\.?)/i,
    monthsParse,
    longMonthsParse: monthsParse,
    shortMonthsParse: monthsParse,
    weekdays: 'zondag_maandag_dinsdag_woensdag_donderdag_vrijdag_zaterdag'.split('_'),
    weekdaysShort: 'zo._ma._di._wo._do._vr._za.'.split('_'),
    weekdaysMin: 'zo_ma_di_wo_do_vr_za'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD-MM-YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[vandaag om] LT',
        nextDay: '[morgen om] LT',
        nextWeek: 'dddd [om] LT',
        lastDay: '[gisteren om] LT',
        lastWeek: '[afgelopen] dddd [om] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'over %s',
        past: '%s geleden',
        s: 'een paar seconden',
        ss: '%d seconden',
        m: 'één minuut',
        mm: '%d minuten',
        h: 'één uur',
        hh: '%d uur',
        d: 'één dag',
        dd: '%d dagen',
        M: 'één maand',
        MM: '%d maanden',
        y: 'één jaar',
        yy: '%d jaar'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(ste|de)/,
    ordinal(_num) {
        const num = Number(_num);
        return num + ((num === 1 || num === 8 || num >= 20) ? 'ste' : 'de');
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL25sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUVqRCxrQ0FBa0M7QUFDbEMsdUJBQXVCO0FBQ3ZCLDBEQUEwRDtBQUMxRCxzREFBc0Q7QUFFdEQsSUFBSSxtQkFBbUIsR0FBRyw0REFBNEQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQy9GLHNCQUFzQixHQUFHLGlEQUFpRCxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUV4RixJQUFJLFdBQVcsR0FBRyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztBQUNySixJQUFJLFdBQVcsR0FBRywwS0FBMEssQ0FBQztBQUU3TCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWU7SUFDbEMsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUcseUZBQXlGLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUM3RyxXQUFXLENBQUUsSUFBVSxFQUFFLE1BQWMsRUFBRSxLQUFlO1FBQ3RELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNWLE9BQU8sbUJBQW1CLENBQUM7UUFDN0IsQ0FBQzthQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hDLE9BQU8sc0JBQXNCLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDcEQsQ0FBQztJQUNILENBQUM7SUFFRCxXQUFXO0lBQ1gsZ0JBQWdCLEVBQUUsV0FBVztJQUM3QixpQkFBaUIsRUFBRSwyRkFBMkY7SUFDOUcsc0JBQXNCLEVBQUUsa0ZBQWtGO0lBRTFHLFdBQVc7SUFDWCxlQUFlLEVBQUcsV0FBVztJQUM3QixnQkFBZ0IsRUFBRyxXQUFXO0lBRTlCLFFBQVEsRUFBRyw0REFBNEQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ2xGLGFBQWEsRUFBRyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hELFdBQVcsRUFBRyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQy9DLGtCQUFrQixFQUFHLElBQUk7SUFDekIsY0FBYyxFQUFHO1FBQ2YsRUFBRSxFQUFHLE9BQU87UUFDWixHQUFHLEVBQUcsVUFBVTtRQUNoQixDQUFDLEVBQUcsWUFBWTtRQUNoQixFQUFFLEVBQUcsYUFBYTtRQUNsQixHQUFHLEVBQUcsbUJBQW1CO1FBQ3pCLElBQUksRUFBRyx3QkFBd0I7S0FDaEM7SUFDRCxRQUFRLEVBQUc7UUFDVCxPQUFPLEVBQUUsaUJBQWlCO1FBQzFCLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsUUFBUSxFQUFFLGNBQWM7UUFDeEIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixRQUFRLEVBQUUsMEJBQTBCO1FBQ3BDLFFBQVEsRUFBRSxHQUFHO0tBQ2Q7SUFDRCxZQUFZLEVBQUc7UUFDYixNQUFNLEVBQUcsU0FBUztRQUNsQixJQUFJLEVBQUcsWUFBWTtRQUNuQixDQUFDLEVBQUcsbUJBQW1CO1FBQ3ZCLEVBQUUsRUFBRyxhQUFhO1FBQ2xCLENBQUMsRUFBRyxZQUFZO1FBQ2hCLEVBQUUsRUFBRyxZQUFZO1FBQ2pCLENBQUMsRUFBRyxTQUFTO1FBQ2IsRUFBRSxFQUFHLFFBQVE7UUFDYixDQUFDLEVBQUcsU0FBUztRQUNiLEVBQUUsRUFBRyxVQUFVO1FBQ2YsQ0FBQyxFQUFHLFdBQVc7UUFDZixFQUFFLEVBQUcsWUFBWTtRQUNqQixDQUFDLEVBQUcsVUFBVTtRQUNkLEVBQUUsRUFBRyxTQUFTO0tBQ2Y7SUFDRCxzQkFBc0IsRUFBRSxpQkFBaUI7SUFDekMsT0FBTyxDQUFFLElBQVk7UUFDbkIsTUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLE9BQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFDRCxJQUFJLEVBQUc7UUFDTCxHQUFHLEVBQUcsQ0FBQyxFQUFFLHVDQUF1QztRQUNoRCxHQUFHLEVBQUcsQ0FBQyxDQUFFLGdFQUFnRTtLQUMxRTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XHJcbmltcG9ydCB7IGdldE1vbnRoIH0gZnJvbSAnLi4vdXRpbHMvZGF0ZS1nZXR0ZXJzJztcclxuXHJcbi8vISBtb21lbnQuanMgbG9jYWxlIGNvbmZpZ3VyYXRpb25cclxuLy8hIGxvY2FsZSA6IER1dGNoIFtubF1cclxuLy8hIGF1dGhvciA6IEpvcmlzIFLDtmxpbmcgOiBodHRwczovL2dpdGh1Yi5jb20vam9yaXNyb2xpbmdcclxuLy8hIGF1dGhvciA6IEphY29iIE1pZGRhZyA6IGh0dHBzOi8vZ2l0aHViLmNvbS9taWRkYWdqXHJcblxyXG5sZXQgbW9udGhzU2hvcnRXaXRoRG90cyA9ICdqYW4uX2ZlYi5fbXJ0Ll9hcHIuX21laV9qdW4uX2p1bC5fYXVnLl9zZXAuX29rdC5fbm92Ll9kZWMuJy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1Nob3J0V2l0aG91dERvdHMgPSAnamFuX2ZlYl9tcnRfYXByX21laV9qdW5fanVsX2F1Z19zZXBfb2t0X25vdl9kZWMnLnNwbGl0KCdfJyk7XHJcblxyXG5sZXQgbW9udGhzUGFyc2UgPSBbL15qYW4vaSwgL15mZWIvaSwgL15tYWFydHxtcnQuPyQvaSwgL15hcHIvaSwgL15tZWkkL2ksIC9eanVuW2kuXT8kL2ksIC9eanVsW2kuXT8kL2ksIC9eYXVnL2ksIC9ec2VwL2ksIC9eb2t0L2ksIC9ebm92L2ksIC9eZGVjL2ldO1xyXG5sZXQgbW9udGhzUmVnZXggPSAvXihqYW51YXJpfGZlYnJ1YXJpfG1hYXJ0fGFwcmlsfG1laXxhcHJpbHxqdVtubF1pfGF1Z3VzdHVzfHNlcHRlbWJlcnxva3RvYmVyfG5vdmVtYmVyfGRlY2VtYmVyfGphblxcLj98ZmViXFwuP3xtcnRcXC4/fGFwclxcLj98anVbbmxdXFwuP3xhdWdcXC4/fHNlcFxcLj98b2t0XFwuP3xub3ZcXC4/fGRlY1xcLj8pL2k7XHJcblxyXG5leHBvcnQgY29uc3QgbmxMb2NhbGU6IExvY2FsZURhdGEgPSB7XHJcbiAgYWJicjogJ25sJyxcclxuICBtb250aHMgOiAnamFudWFyaV9mZWJydWFyaV9tYWFydF9hcHJpbF9tZWlfanVuaV9qdWxpX2F1Z3VzdHVzX3NlcHRlbWJlcl9va3RvYmVyX25vdmVtYmVyX2RlY2VtYmVyJy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1Nob3J0IChkYXRlOiBEYXRlLCBmb3JtYXQ6IHN0cmluZywgaXNVVEM/OiBib29sZWFuKTogc3RyaW5nIHwgc3RyaW5nW10ge1xyXG4gICAgaWYgKCFkYXRlKSB7XHJcbiAgICAgIHJldHVybiBtb250aHNTaG9ydFdpdGhEb3RzO1xyXG4gICAgfSBlbHNlIGlmICgvLU1NTS0vLnRlc3QoZm9ybWF0KSkge1xyXG4gICAgICByZXR1cm4gbW9udGhzU2hvcnRXaXRob3V0RG90c1tnZXRNb250aChkYXRlLCBpc1VUQyldO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIG1vbnRoc1Nob3J0V2l0aERvdHNbZ2V0TW9udGgoZGF0ZSwgaXNVVEMpXTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBtb250aHNSZWdleCxcclxuICBtb250aHNTaG9ydFJlZ2V4OiBtb250aHNSZWdleCxcclxuICBtb250aHNTdHJpY3RSZWdleDogL14oamFudWFyaXxmZWJydWFyaXxtYWFydHxtZWl8anVbbmxdaXxhcHJpbHxhdWd1c3R1c3xzZXB0ZW1iZXJ8b2t0b2Jlcnxub3ZlbWJlcnxkZWNlbWJlcikvaSxcclxuICBtb250aHNTaG9ydFN0cmljdFJlZ2V4OiAvXihqYW5cXC4/fGZlYlxcLj98bXJ0XFwuP3xhcHJcXC4/fG1laXxqdVtubF1cXC4/fGF1Z1xcLj98c2VwXFwuP3xva3RcXC4/fG5vdlxcLj98ZGVjXFwuPykvaSxcclxuXHJcbiAgbW9udGhzUGFyc2UsXHJcbiAgbG9uZ01vbnRoc1BhcnNlIDogbW9udGhzUGFyc2UsXHJcbiAgc2hvcnRNb250aHNQYXJzZSA6IG1vbnRoc1BhcnNlLFxyXG5cclxuICB3ZWVrZGF5cyA6ICd6b25kYWdfbWFhbmRhZ19kaW5zZGFnX3dvZW5zZGFnX2RvbmRlcmRhZ192cmlqZGFnX3phdGVyZGFnJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzU2hvcnQgOiAnem8uX21hLl9kaS5fd28uX2RvLl92ci5femEuJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzTWluIDogJ3pvX21hX2RpX3dvX2RvX3ZyX3phJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzUGFyc2VFeGFjdCA6IHRydWUsXHJcbiAgbG9uZ0RhdGVGb3JtYXQgOiB7XHJcbiAgICBMVCA6ICdISDptbScsXHJcbiAgICBMVFMgOiAnSEg6bW06c3MnLFxyXG4gICAgTCA6ICdERC1NTS1ZWVlZJyxcclxuICAgIExMIDogJ0QgTU1NTSBZWVlZJyxcclxuICAgIExMTCA6ICdEIE1NTU0gWVlZWSBISDptbScsXHJcbiAgICBMTExMIDogJ2RkZGQgRCBNTU1NIFlZWVkgSEg6bW0nXHJcbiAgfSxcclxuICBjYWxlbmRhciA6IHtcclxuICAgIHNhbWVEYXk6ICdbdmFuZGFhZyBvbV0gTFQnLFxyXG4gICAgbmV4dERheTogJ1ttb3JnZW4gb21dIExUJyxcclxuICAgIG5leHRXZWVrOiAnZGRkZCBbb21dIExUJyxcclxuICAgIGxhc3REYXk6ICdbZ2lzdGVyZW4gb21dIExUJyxcclxuICAgIGxhc3RXZWVrOiAnW2FmZ2Vsb3Blbl0gZGRkZCBbb21dIExUJyxcclxuICAgIHNhbWVFbHNlOiAnTCdcclxuICB9LFxyXG4gIHJlbGF0aXZlVGltZSA6IHtcclxuICAgIGZ1dHVyZSA6ICdvdmVyICVzJyxcclxuICAgIHBhc3QgOiAnJXMgZ2VsZWRlbicsXHJcbiAgICBzIDogJ2VlbiBwYWFyIHNlY29uZGVuJyxcclxuICAgIHNzIDogJyVkIHNlY29uZGVuJyxcclxuICAgIG0gOiAnw6nDqW4gbWludXV0JyxcclxuICAgIG1tIDogJyVkIG1pbnV0ZW4nLFxyXG4gICAgaCA6ICfDqcOpbiB1dXInLFxyXG4gICAgaGggOiAnJWQgdXVyJyxcclxuICAgIGQgOiAnw6nDqW4gZGFnJyxcclxuICAgIGRkIDogJyVkIGRhZ2VuJyxcclxuICAgIE0gOiAnw6nDqW4gbWFhbmQnLFxyXG4gICAgTU0gOiAnJWQgbWFhbmRlbicsXHJcbiAgICB5IDogJ8Opw6luIGphYXInLFxyXG4gICAgeXkgOiAnJWQgamFhcidcclxuICB9LFxyXG4gIGRheU9mTW9udGhPcmRpbmFsUGFyc2U6IC9cXGR7MSwyfShzdGV8ZGUpLyxcclxuICBvcmRpbmFsIChfbnVtOiBudW1iZXIpOiBzdHJpbmcge1xyXG4gICAgY29uc3QgbnVtID0gTnVtYmVyKF9udW0pO1xyXG4gICAgcmV0dXJuIG51bSArICgobnVtID09PSAxIHx8IG51bSA9PT0gOCB8fCBudW0gPj0gMjApID8gJ3N0ZScgOiAnZGUnKTtcclxuICB9LFxyXG4gIHdlZWsgOiB7XHJcbiAgICBkb3cgOiAxLCAvLyBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cclxuICAgIGRveSA6IDQgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDR0aCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cclxuICB9XHJcbn07XHJcbiJdfQ==