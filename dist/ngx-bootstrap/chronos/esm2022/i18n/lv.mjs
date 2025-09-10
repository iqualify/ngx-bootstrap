//! moment.js locale configuration
//! locale : Latvian [lv]
//! author : Matiss Janis Aboltins : https://github.com/matissjanis
export const lvLocale = {
    abbr: 'lv',
    months: 'Janvāris_Februāris_Marts_Aprīlis_Maijs_Jūnijs_Jūlijs_Augusts_Septembris_Oktobris_Novembris_Decembris'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Mai_Jūn_Jūl_Aug_Sep_Okt_Nov_Dec'.split('_'),
    weekdays: 'Svētdiena_Pirmdiena_Otrdiena_Trešdiena_Ceturtdiena_Piektdiena_Sestdiena'.split('_'),
    weekdaysShort: 'Svētd_Pirmd_Otrd_Trešd_Ceturtd_Piektd_Sestd'.split('_'),
    weekdaysMin: 'Sv_Pi_Ot_Tr_Ce_Pk_Se'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Today at] LT',
        nextDay: '[Tomorrow at] LT',
        nextWeek: 'dddd [at] LT',
        lastDay: '[Yesterday at] LT',
        lastWeek: '[Last] dddd [at] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'pēc %s',
        past: 'pirms %s',
        s: 'dažām sekundēm',
        ss: '%d sekundēm',
        m: 'minūtes',
        mm: '%d minūtēm',
        h: 'stundas',
        hh: '%d stundām',
        d: 'dienas',
        dd: '%d dienām',
        M: 'mēneša',
        MM: '%d mēnešiem',
        y: 'gada',
        yy: '%d gadiem'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal(num) {
        return num + '.';
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibHYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2x2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyx5QkFBeUI7QUFDekIsbUVBQW1FO0FBRW5FLE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZTtJQUNsQyxJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRyxzR0FBc0csQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFILFdBQVcsRUFBRyxpREFBaUQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFFLFFBQVEsRUFBRyx5RUFBeUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQy9GLGFBQWEsRUFBRyw2Q0FBNkMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hFLFdBQVcsRUFBRyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQy9DLGNBQWMsRUFBRztRQUNmLEVBQUUsRUFBRyxPQUFPO1FBQ1osR0FBRyxFQUFHLFVBQVU7UUFDaEIsQ0FBQyxFQUFHLFlBQVk7UUFDaEIsRUFBRSxFQUFHLGFBQWE7UUFDbEIsR0FBRyxFQUFHLG1CQUFtQjtRQUN6QixJQUFJLEVBQUcseUJBQXlCO0tBQ2pDO0lBQ0QsUUFBUSxFQUFHO1FBQ1QsT0FBTyxFQUFHLGVBQWU7UUFDekIsT0FBTyxFQUFHLGtCQUFrQjtRQUM1QixRQUFRLEVBQUcsY0FBYztRQUN6QixPQUFPLEVBQUcsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRyxxQkFBcUI7UUFDaEMsUUFBUSxFQUFHLEdBQUc7S0FDZjtJQUNELFlBQVksRUFBRztRQUNiLE1BQU0sRUFBRyxRQUFRO1FBQ2pCLElBQUksRUFBRyxVQUFVO1FBQ2pCLENBQUMsRUFBRyxnQkFBZ0I7UUFDcEIsRUFBRSxFQUFHLGFBQWE7UUFDbEIsQ0FBQyxFQUFHLFNBQVM7UUFDYixFQUFFLEVBQUcsWUFBWTtRQUNqQixDQUFDLEVBQUcsU0FBUztRQUNiLEVBQUUsRUFBRyxZQUFZO1FBQ2pCLENBQUMsRUFBRyxRQUFRO1FBQ1osRUFBRSxFQUFHLFdBQVc7UUFDaEIsQ0FBQyxFQUFHLFFBQVE7UUFDWixFQUFFLEVBQUcsYUFBYTtRQUNsQixDQUFDLEVBQUcsTUFBTTtRQUNWLEVBQUUsRUFBRyxXQUFXO0tBQ2pCO0lBQ0Qsc0JBQXNCLEVBQUUsV0FBVztJQUNuQyxPQUFPLENBQUMsR0FBRztRQUNQLE9BQU8sR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNyQixDQUFDO0lBQ0QsSUFBSSxFQUFHO1FBQ0wsR0FBRyxFQUFHLENBQUMsRUFBRSx1Q0FBdUM7UUFDaEQsR0FBRyxFQUFHLENBQUMsQ0FBRSxnRUFBZ0U7S0FDMUU7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xyXG5cclxuLy8hIG1vbWVudC5qcyBsb2NhbGUgY29uZmlndXJhdGlvblxyXG4vLyEgbG9jYWxlIDogTGF0dmlhbiBbbHZdXHJcbi8vISBhdXRob3IgOiBNYXRpc3MgSmFuaXMgQWJvbHRpbnMgOiBodHRwczovL2dpdGh1Yi5jb20vbWF0aXNzamFuaXNcclxuXHJcbmV4cG9ydCBjb25zdCBsdkxvY2FsZTogTG9jYWxlRGF0YSA9IHtcclxuICBhYmJyOiAnbHYnLFxyXG4gIG1vbnRocyA6ICdKYW52xIFyaXNfRmVicnXEgXJpc19NYXJ0c19BcHLEq2xpc19NYWlqc19KxatuaWpzX0rFq2xpanNfQXVndXN0c19TZXB0ZW1icmlzX09rdG9icmlzX05vdmVtYnJpc19EZWNlbWJyaXMnLnNwbGl0KCdfJyksXHJcbiAgbW9udGhzU2hvcnQgOiAnSmFuX0ZlYl9NYXJfQXByX01haV9KxatuX0rFq2xfQXVnX1NlcF9Pa3RfTm92X0RlYycuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5cyA6ICdTdsSTdGRpZW5hX1Bpcm1kaWVuYV9PdHJkaWVuYV9UcmXFoWRpZW5hX0NldHVydGRpZW5hX1BpZWt0ZGllbmFfU2VzdGRpZW5hJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzU2hvcnQgOiAnU3bEk3RkX1Bpcm1kX090cmRfVHJlxaFkX0NldHVydGRfUGlla3RkX1Nlc3RkJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzTWluIDogJ1N2X1BpX090X1RyX0NlX1BrX1NlJy5zcGxpdCgnXycpLFxyXG4gIGxvbmdEYXRlRm9ybWF0IDoge1xyXG4gICAgTFQgOiAnSEg6bW0nLFxyXG4gICAgTFRTIDogJ0hIOm1tOnNzJyxcclxuICAgIEwgOiAnREQvTU0vWVlZWScsXHJcbiAgICBMTCA6ICdEIE1NTU0gWVlZWScsXHJcbiAgICBMTEwgOiAnRCBNTU1NIFlZWVkgSEg6bW0nLFxyXG4gICAgTExMTCA6ICdkZGRkLCBEIE1NTU0gWVlZWSBISDptbSdcclxuICB9LFxyXG4gIGNhbGVuZGFyIDoge1xyXG4gICAgc2FtZURheSA6ICdbVG9kYXkgYXRdIExUJyxcclxuICAgIG5leHREYXkgOiAnW1RvbW9ycm93IGF0XSBMVCcsXHJcbiAgICBuZXh0V2VlayA6ICdkZGRkIFthdF0gTFQnLFxyXG4gICAgbGFzdERheSA6ICdbWWVzdGVyZGF5IGF0XSBMVCcsXHJcbiAgICBsYXN0V2VlayA6ICdbTGFzdF0gZGRkZCBbYXRdIExUJyxcclxuICAgIHNhbWVFbHNlIDogJ0wnXHJcbiAgfSxcclxuICByZWxhdGl2ZVRpbWUgOiB7XHJcbiAgICBmdXR1cmUgOiAncMSTYyAlcycsXHJcbiAgICBwYXN0IDogJ3Bpcm1zICVzJyxcclxuICAgIHMgOiAnZGHFvsSBbSBzZWt1bmTEk20nLFxyXG4gICAgc3MgOiAnJWQgc2VrdW5kxJNtJyxcclxuICAgIG0gOiAnbWluxat0ZXMnLFxyXG4gICAgbW0gOiAnJWQgbWluxat0xJNtJyxcclxuICAgIGggOiAnc3R1bmRhcycsXHJcbiAgICBoaCA6ICclZCBzdHVuZMSBbScsXHJcbiAgICBkIDogJ2RpZW5hcycsXHJcbiAgICBkZCA6ICclZCBkaWVuxIFtJyxcclxuICAgIE0gOiAnbcSTbmXFoWEnLFxyXG4gICAgTU0gOiAnJWQgbcSTbmXFoWllbScsXHJcbiAgICB5IDogJ2dhZGEnLFxyXG4gICAgeXkgOiAnJWQgZ2FkaWVtJ1xyXG4gIH0sXHJcbiAgZGF5T2ZNb250aE9yZGluYWxQYXJzZTogL1xcZHsxLDJ9XFwuLyxcclxuICBvcmRpbmFsKG51bSkge1xyXG4gICAgICByZXR1cm4gbnVtICsgJy4nO1xyXG4gIH0sXHJcbiAgd2VlayA6IHtcclxuICAgIGRvdyA6IDEsIC8vIE1vbmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxyXG4gICAgZG95IDogNCAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gNHRoIGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxyXG4gIH1cclxufTtcclxuIl19