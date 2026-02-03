//! moment.js locale configuration
//! locale : Albanian [sq]
//! author : Agon Cecelia : https://github.com/agoncecelia
export const sqLocale = {
    abbr: 'sq',
    months: 'Janar_Shkurt_Mars_Prill_Maj_Qershor_Korrik_Gusht_Shtator_Tetor_Nëntor_Dhjetor'.split('_'),
    monthsShort: 'Jan_Shk_Mar_Pri_Maj_Qer_Kor_Gus_Sht_Tet_Nën_Dhj'.split('_'),
    weekdays: 'E Dielë_E Hënë_E Martë_E Mërkurë_E Enjte_E Premte_E Shtunë'.split('_'),
    weekdaysShort: 'Die_Hën_Mar_Mër_Enj_Pre_Sht'.split('_'),
    weekdaysMin: 'Di_He_Ma_Me_En_Pr_Sh'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd, D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Sot në] LT',
        nextDay: '[Nesër në] LT',
        nextWeek: 'dddd [në] LT',
        lastDay: '[Dje në] LT',
        lastWeek: 'dddd [e kaluar në] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'në %s',
        past: 'para %sve',
        s: 'disa sekonda',
        ss: '%d sekonda',
        m: 'një minut',
        mm: '%d minuta',
        h: 'një orë',
        hh: '%d orë',
        d: 'një ditë',
        dd: '%d ditë',
        M: 'një muaj',
        MM: '%d muaj',
        y: 'një vit',
        yy: '%d vite'
    },
    dayOfMonthOrdinalParse: /\d{1,2}\./, // need clarification
    ordinal: '%d.', // need clarification
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3EuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL3NxLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQywwQkFBMEI7QUFDMUIsMERBQTBEO0FBRTFELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZTtJQUNsQyxJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRywrRUFBK0UsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ25HLFdBQVcsRUFBRyxpREFBaUQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzFFLFFBQVEsRUFBRyw0REFBNEQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ2xGLGFBQWEsRUFBRyw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hELFdBQVcsRUFBRyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQy9DLGNBQWMsRUFBRztRQUNmLEVBQUUsRUFBRyxPQUFPO1FBQ1osR0FBRyxFQUFHLFVBQVU7UUFDaEIsQ0FBQyxFQUFHLFlBQVk7UUFDaEIsRUFBRSxFQUFHLGFBQWE7UUFDbEIsR0FBRyxFQUFHLG1CQUFtQjtRQUN6QixJQUFJLEVBQUcseUJBQXlCO0tBQ2pDO0lBQ0QsUUFBUSxFQUFHO1FBQ1QsT0FBTyxFQUFHLGFBQWE7UUFDdkIsT0FBTyxFQUFHLGVBQWU7UUFDekIsUUFBUSxFQUFHLGNBQWM7UUFDekIsT0FBTyxFQUFHLGFBQWE7UUFDdkIsUUFBUSxFQUFHLHVCQUF1QjtRQUNsQyxRQUFRLEVBQUcsR0FBRztLQUNmO0lBQ0QsWUFBWSxFQUFHO1FBQ2IsTUFBTSxFQUFHLE9BQU87UUFDaEIsSUFBSSxFQUFHLFdBQVc7UUFDbEIsQ0FBQyxFQUFHLGNBQWM7UUFDbEIsRUFBRSxFQUFHLFlBQVk7UUFDakIsQ0FBQyxFQUFHLFdBQVc7UUFDZixFQUFFLEVBQUcsV0FBVztRQUNoQixDQUFDLEVBQUcsU0FBUztRQUNiLEVBQUUsRUFBRyxRQUFRO1FBQ2IsQ0FBQyxFQUFHLFVBQVU7UUFDZCxFQUFFLEVBQUcsU0FBUztRQUNkLENBQUMsRUFBRyxVQUFVO1FBQ2QsRUFBRSxFQUFHLFNBQVM7UUFDZCxDQUFDLEVBQUcsU0FBUztRQUNiLEVBQUUsRUFBRyxTQUFTO0tBQ2Y7SUFDRCxzQkFBc0IsRUFBRSxXQUFXLEVBQUUscUJBQXFCO0lBQzFELE9BQU8sRUFBRyxLQUFLLEVBQUUscUJBQXFCO0lBQ3RDLElBQUksRUFBRztRQUNMLEdBQUcsRUFBRyxDQUFDLEVBQUUsdUNBQXVDO1FBQ2hELEdBQUcsRUFBRyxDQUFDLENBQUUsZ0VBQWdFO0tBQzFFO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExvY2FsZURhdGEgfSBmcm9tICcuLi9sb2NhbGUvbG9jYWxlLmNsYXNzJztcclxuXHJcbi8vISBtb21lbnQuanMgbG9jYWxlIGNvbmZpZ3VyYXRpb25cclxuLy8hIGxvY2FsZSA6IEFsYmFuaWFuIFtzcV1cclxuLy8hIGF1dGhvciA6IEFnb24gQ2VjZWxpYSA6IGh0dHBzOi8vZ2l0aHViLmNvbS9hZ29uY2VjZWxpYVxyXG5cclxuZXhwb3J0IGNvbnN0IHNxTG9jYWxlOiBMb2NhbGVEYXRhID0ge1xyXG4gIGFiYnI6ICdzcScsXHJcbiAgbW9udGhzIDogJ0phbmFyX1Noa3VydF9NYXJzX1ByaWxsX01hal9RZXJzaG9yX0tvcnJpa19HdXNodF9TaHRhdG9yX1RldG9yX07Dq250b3JfRGhqZXRvcicuc3BsaXQoJ18nKSxcclxuICBtb250aHNTaG9ydCA6ICdKYW5fU2hrX01hcl9QcmlfTWFqX1Flcl9Lb3JfR3VzX1NodF9UZXRfTsOrbl9EaGonLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXMgOiAnRSBEaWVsw6tfRSBIw6tuw6tfRSBNYXJ0w6tfRSBNw6tya3Vyw6tfRSBFbmp0ZV9FIFByZW10ZV9FIFNodHVuw6snLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNTaG9ydCA6ICdEaWVfSMOrbl9NYXJfTcOrcl9FbmpfUHJlX1NodCcuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c01pbiA6ICdEaV9IZV9NYV9NZV9Fbl9Qcl9TaCcuc3BsaXQoJ18nKSxcclxuICBsb25nRGF0ZUZvcm1hdCA6IHtcclxuICAgIExUIDogJ0hIOm1tJyxcclxuICAgIExUUyA6ICdISDptbTpzcycsXHJcbiAgICBMIDogJ0REL01NL1lZWVknLFxyXG4gICAgTEwgOiAnRCBNTU1NIFlZWVknLFxyXG4gICAgTExMIDogJ0QgTU1NTSBZWVlZIEhIOm1tJyxcclxuICAgIExMTEwgOiAnZGRkZCwgRCBNTU1NIFlZWVkgSEg6bW0nXHJcbiAgfSxcclxuICBjYWxlbmRhciA6IHtcclxuICAgIHNhbWVEYXkgOiAnW1NvdCBuw6tdIExUJyxcclxuICAgIG5leHREYXkgOiAnW05lc8OrciBuw6tdIExUJyxcclxuICAgIG5leHRXZWVrIDogJ2RkZGQgW27Dq10gTFQnLFxyXG4gICAgbGFzdERheSA6ICdbRGplIG7Dq10gTFQnLFxyXG4gICAgbGFzdFdlZWsgOiAnZGRkZCBbZSBrYWx1YXIgbsOrXSBMVCcsXHJcbiAgICBzYW1lRWxzZSA6ICdMJ1xyXG4gIH0sXHJcbiAgcmVsYXRpdmVUaW1lIDoge1xyXG4gICAgZnV0dXJlIDogJ27DqyAlcycsXHJcbiAgICBwYXN0IDogJ3BhcmEgJXN2ZScsXHJcbiAgICBzIDogJ2Rpc2Egc2Vrb25kYScsXHJcbiAgICBzcyA6ICclZCBzZWtvbmRhJyxcclxuICAgIG0gOiAnbmrDqyBtaW51dCcsXHJcbiAgICBtbSA6ICclZCBtaW51dGEnLFxyXG4gICAgaCA6ICduasOrIG9yw6snLFxyXG4gICAgaGggOiAnJWQgb3LDqycsXHJcbiAgICBkIDogJ25qw6sgZGl0w6snLFxyXG4gICAgZGQgOiAnJWQgZGl0w6snLFxyXG4gICAgTSA6ICduasOrIG11YWonLFxyXG4gICAgTU0gOiAnJWQgbXVhaicsXHJcbiAgICB5IDogJ25qw6sgdml0JyxcclxuICAgIHl5IDogJyVkIHZpdGUnXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn1cXC4vLCAvLyBuZWVkIGNsYXJpZmljYXRpb25cclxuICBvcmRpbmFsIDogJyVkLicsIC8vIG5lZWQgY2xhcmlmaWNhdGlvblxyXG4gIHdlZWsgOiB7XHJcbiAgICBkb3cgOiAxLCAvLyBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cclxuICAgIGRveSA6IDQgIC8vIFRoZSB3ZWVrIHRoYXQgY29udGFpbnMgSmFuIDR0aCBpcyB0aGUgZmlyc3Qgd2VlayBvZiB0aGUgeWVhci5cclxuICB9XHJcbn07XHJcblxyXG4iXX0=