//! moment.js locale configuration
//! locale : Danish (Denmark) [da]
//! author : Per Hansen : https://github.com/perhp
export const daLocale = {
    abbr: 'da',
    months: 'Januar_Februar_Marts_April_Maj_Juni_Juli_August_September_Oktober_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_Maj_Jun_Jul_Aug_Sep_Okt_Nov_Dec'.split('_'),
    weekdays: 'Søndag_Mandag_Tirsdag_Onsdag_Torsdag_Fredag_Lørdag'.split('_'),
    weekdaysShort: 'Søn_Man_Tir_Ons_Tor_Fre_Lør'.split('_'),
    weekdaysMin: 'Sø_Ma_Ti_On_To_Fr_Lø'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D. MMMM YYYY',
        LLL: 'D. MMMM YYYY HH:mm',
        LLLL: 'dddd [d.] D. MMMM YYYY [kl.] HH:mm'
    },
    calendar: {
        sameDay: '[i dag kl.] LT',
        nextDay: '[i morgen kl.] LT',
        nextWeek: 'på dddd [kl.] LT',
        lastDay: '[i går kl.] LT',
        lastWeek: '[i] dddd[s kl.] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'om %s',
        past: '%s siden',
        s: 'få sekunder',
        m: 'et minut',
        mm: '%d minutter',
        h: 'en time',
        hh: '%d timer',
        d: 'en dag',
        dd: '%d dage',
        M: 'en måned',
        MM: '%d måneder',
        y: 'et år',
        yy: '%d år'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./,
    ordinal: '%d.',
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2RhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyxrQ0FBa0M7QUFDbEMsa0RBQWtEO0FBRWxELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZTtJQUNsQyxJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRyxxRkFBcUYsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3pHLFdBQVcsRUFBRyxpREFBaUQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFFLFFBQVEsRUFBRyxvREFBb0QsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFFLGFBQWEsRUFBRyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hELFdBQVcsRUFBRyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQy9DLGNBQWMsRUFBRztRQUNiLEVBQUUsRUFBRyxPQUFPO1FBQ1osR0FBRyxFQUFHLFVBQVU7UUFDaEIsQ0FBQyxFQUFHLFlBQVk7UUFDaEIsRUFBRSxFQUFHLGNBQWM7UUFDbkIsR0FBRyxFQUFHLG9CQUFvQjtRQUMxQixJQUFJLEVBQUcsb0NBQW9DO0tBQzlDO0lBQ0QsUUFBUSxFQUFHO1FBQ1AsT0FBTyxFQUFHLGdCQUFnQjtRQUMxQixPQUFPLEVBQUcsbUJBQW1CO1FBQzdCLFFBQVEsRUFBRyxrQkFBa0I7UUFDN0IsT0FBTyxFQUFHLGdCQUFnQjtRQUMxQixRQUFRLEVBQUcsb0JBQW9CO1FBQy9CLFFBQVEsRUFBRyxHQUFHO0tBQ2pCO0lBQ0QsWUFBWSxFQUFHO1FBQ1gsTUFBTSxFQUFHLE9BQU87UUFDaEIsSUFBSSxFQUFHLFVBQVU7UUFDakIsQ0FBQyxFQUFHLGFBQWE7UUFDakIsQ0FBQyxFQUFHLFVBQVU7UUFDZCxFQUFFLEVBQUcsYUFBYTtRQUNsQixDQUFDLEVBQUcsU0FBUztRQUNiLEVBQUUsRUFBRyxVQUFVO1FBQ2YsQ0FBQyxFQUFHLFFBQVE7UUFDWixFQUFFLEVBQUcsU0FBUztRQUNkLENBQUMsRUFBRyxVQUFVO1FBQ2QsRUFBRSxFQUFHLFlBQVk7UUFDakIsQ0FBQyxFQUFHLE9BQU87UUFDWCxFQUFFLEVBQUcsT0FBTztLQUNmO0lBQ0Qsc0JBQXNCLEVBQUUsV0FBVztJQUNuQyxPQUFPLEVBQUcsS0FBSztJQUNmLElBQUksRUFBRztRQUNILEdBQUcsRUFBRyxDQUFDLEVBQUUsdUNBQXVDO1FBQ2hELEdBQUcsRUFBRyxDQUFDLENBQUUsZ0VBQWdFO0tBQzVFO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2FsZURhdGEgfSBmcm9tICcuLi9sb2NhbGUvbG9jYWxlLmNsYXNzJztcclxuXHJcbi8vISBtb21lbnQuanMgbG9jYWxlIGNvbmZpZ3VyYXRpb25cclxuLy8hIGxvY2FsZSA6IERhbmlzaCAoRGVubWFyaykgW2RhXVxyXG4vLyEgYXV0aG9yIDogUGVyIEhhbnNlbiA6IGh0dHBzOi8vZ2l0aHViLmNvbS9wZXJocFxyXG5cclxuZXhwb3J0IGNvbnN0IGRhTG9jYWxlOiBMb2NhbGVEYXRhID0ge1xyXG4gIGFiYnI6ICdkYScsXHJcbiAgbW9udGhzIDogJ0phbnVhcl9GZWJydWFyX01hcnRzX0FwcmlsX01hal9KdW5pX0p1bGlfQXVndXN0X1NlcHRlbWJlcl9Pa3RvYmVyX05vdmVtYmVyX0RlY2VtYmVyJy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1Nob3J0IDogJ0phbl9GZWJfTWFyX0Fwcl9NYWpfSnVuX0p1bF9BdWdfU2VwX09rdF9Ob3ZfRGVjJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzIDogJ1PDuG5kYWdfTWFuZGFnX1RpcnNkYWdfT25zZGFnX1RvcnNkYWdfRnJlZGFnX0zDuHJkYWcnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNTaG9ydCA6ICdTw7huX01hbl9UaXJfT25zX1Rvcl9GcmVfTMO4cicuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c01pbiA6ICdTw7hfTWFfVGlfT25fVG9fRnJfTMO4Jy5zcGxpdCgnXycpLFxyXG4gIGxvbmdEYXRlRm9ybWF0IDoge1xyXG4gICAgICBMVCA6ICdISDptbScsXHJcbiAgICAgIExUUyA6ICdISDptbTpzcycsXHJcbiAgICAgIEwgOiAnREQvTU0vWVlZWScsXHJcbiAgICAgIExMIDogJ0QuIE1NTU0gWVlZWScsXHJcbiAgICAgIExMTCA6ICdELiBNTU1NIFlZWVkgSEg6bW0nLFxyXG4gICAgICBMTExMIDogJ2RkZGQgW2QuXSBELiBNTU1NIFlZWVkgW2tsLl0gSEg6bW0nXHJcbiAgfSxcclxuICBjYWxlbmRhciA6IHtcclxuICAgICAgc2FtZURheSA6ICdbaSBkYWcga2wuXSBMVCcsXHJcbiAgICAgIG5leHREYXkgOiAnW2kgbW9yZ2VuIGtsLl0gTFQnLFxyXG4gICAgICBuZXh0V2VlayA6ICdww6UgZGRkZCBba2wuXSBMVCcsXHJcbiAgICAgIGxhc3REYXkgOiAnW2kgZ8OlciBrbC5dIExUJyxcclxuICAgICAgbGFzdFdlZWsgOiAnW2ldIGRkZGRbcyBrbC5dIExUJyxcclxuICAgICAgc2FtZUVsc2UgOiAnTCdcclxuICB9LFxyXG4gIHJlbGF0aXZlVGltZSA6IHtcclxuICAgICAgZnV0dXJlIDogJ29tICVzJyxcclxuICAgICAgcGFzdCA6ICclcyBzaWRlbicsXHJcbiAgICAgIHMgOiAnZsOlIHNla3VuZGVyJyxcclxuICAgICAgbSA6ICdldCBtaW51dCcsXHJcbiAgICAgIG1tIDogJyVkIG1pbnV0dGVyJyxcclxuICAgICAgaCA6ICdlbiB0aW1lJyxcclxuICAgICAgaGggOiAnJWQgdGltZXInLFxyXG4gICAgICBkIDogJ2VuIGRhZycsXHJcbiAgICAgIGRkIDogJyVkIGRhZ2UnLFxyXG4gICAgICBNIDogJ2VuIG3DpW5lZCcsXHJcbiAgICAgIE1NIDogJyVkIG3DpW5lZGVyJyxcclxuICAgICAgeSA6ICdldCDDpXInLFxyXG4gICAgICB5eSA6ICclZCDDpXInXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn1cXC4vLFxyXG4gIG9yZGluYWwgOiAnJWQuJyxcclxuICB3ZWVrIDoge1xyXG4gICAgICBkb3cgOiAxLCAvLyBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cclxuICAgICAgZG95IDogNCAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gNHRoIGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxyXG4gIH1cclxufTtcclxuXHJcbiJdfQ==