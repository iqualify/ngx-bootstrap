// ! moment.js locale configuration
// ! locale : Romanian [ro]
//! author : Vlad Gurdiga : https://github.com/gurdiga
//! author : Valentin Agachi : https://github.com/avaly
// ! author : Earle white: https://github.com/5earle
function relativeTimeWithPlural(num, withoutSuffix, key) {
    let format = {
        ss: 'secunde',
        mm: 'minute',
        hh: 'ore',
        dd: 'zile',
        MM: 'luni',
        yy: 'ani'
    };
    let separator = ' ';
    if (num % 100 >= 20 || (num >= 100 && num % 100 === 0)) {
        separator = ' de ';
    }
    return num + separator + format[key];
}
export const roLocale = {
    abbr: 'ro',
    months: 'ianuarie_februarie_martie_aprilie_mai_iunie_iulie_august_septembrie_octombrie_noiembrie_decembrie'.split('_'),
    monthsShort: 'ian._febr._mart._apr._mai_iun._iul._aug._sept._oct._nov._dec.'.split('_'),
    monthsParseExact: true,
    weekdays: 'duminică_luni_marți_miercuri_joi_vineri_sâmbătă'.split('_'),
    weekdaysShort: 'Dum_Lun_Mar_Mie_Joi_Vin_Sâm'.split('_'),
    weekdaysMin: 'Du_Lu_Ma_Mi_Jo_Vi_Sâ'.split('_'),
    longDateFormat: {
        LT: 'H:mm',
        LTS: 'H:mm:ss',
        L: 'DD.MM.YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY H:mm',
        LLLL: 'dddd, D MMMM YYYY H:mm'
    },
    calendar: {
        sameDay: '[azi la] LT',
        nextDay: '[mâine la] LT',
        nextWeek: 'dddd [la] LT',
        lastDay: '[ieri la] LT',
        lastWeek: '[fosta] dddd [la] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'peste %s',
        past: '%s în urmă',
        s: 'câteva secunde',
        ss: relativeTimeWithPlural,
        m: 'un minut',
        mm: relativeTimeWithPlural,
        h: 'o oră',
        hh: relativeTimeWithPlural,
        d: 'o zi',
        dd: relativeTimeWithPlural,
        M: 'o lună',
        MM: relativeTimeWithPlural,
        y: 'un an',
        yy: relativeTimeWithPlural
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 7 // The week that contains Jan 1st is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL3JvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLG1DQUFtQztBQUNuQywyQkFBMkI7QUFDM0Isc0RBQXNEO0FBQ3RELHVEQUF1RDtBQUN2RCxvREFBb0Q7QUFFcEQsU0FBUyxzQkFBc0IsQ0FBQyxHQUFXLEVBQUUsYUFBc0IsRUFBRSxHQUFXO0lBQzlFLElBQUksTUFBTSxHQUEyQjtRQUNuQyxFQUFFLEVBQUUsU0FBUztRQUNiLEVBQUUsRUFBRSxRQUFRO1FBQ1osRUFBRSxFQUFFLEtBQUs7UUFDVCxFQUFFLEVBQUUsTUFBTTtRQUNWLEVBQUUsRUFBRSxNQUFNO1FBQ1YsRUFBRSxFQUFFLEtBQUs7S0FDVixDQUFDO0lBRUYsSUFBSSxTQUFTLEdBQUcsR0FBRyxDQUFDO0lBQ3BCLElBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUN2RCxTQUFTLEdBQUcsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxPQUFPLEdBQUcsR0FBRyxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFHRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQWU7SUFDbEMsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUUsbUdBQW1HLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUN0SCxXQUFXLEVBQUUsK0RBQStELENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUN2RixnQkFBZ0IsRUFBRSxJQUFJO0lBQ3RCLFFBQVEsRUFBRSxpREFBaUQsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3RFLGFBQWEsRUFBRSw2QkFBNkIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3ZELFdBQVcsRUFBRSxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQzlDLGNBQWMsRUFBRTtRQUNkLEVBQUUsRUFBRSxNQUFNO1FBQ1YsR0FBRyxFQUFFLFNBQVM7UUFDZCxDQUFDLEVBQUUsWUFBWTtRQUNmLEVBQUUsRUFBRSxhQUFhO1FBQ2pCLEdBQUcsRUFBRSxrQkFBa0I7UUFDdkIsSUFBSSxFQUFFLHdCQUF3QjtLQUMvQjtJQUNELFFBQVEsRUFBRTtRQUNSLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLFFBQVEsRUFBRSxzQkFBc0I7UUFDaEMsUUFBUSxFQUFFLEdBQUc7S0FDZDtJQUNELFlBQVksRUFBRTtRQUNaLE1BQU0sRUFBRSxVQUFVO1FBQ2xCLElBQUksRUFBRSxZQUFZO1FBQ2xCLENBQUMsRUFBRSxnQkFBZ0I7UUFDbkIsRUFBRSxFQUFFLHNCQUFzQjtRQUMxQixDQUFDLEVBQUUsVUFBVTtRQUNiLEVBQUUsRUFBRSxzQkFBc0I7UUFDMUIsQ0FBQyxFQUFFLE9BQU87UUFDVixFQUFFLEVBQUUsc0JBQXNCO1FBQzFCLENBQUMsRUFBRSxNQUFNO1FBQ1QsRUFBRSxFQUFFLHNCQUFzQjtRQUMxQixDQUFDLEVBQUUsUUFBUTtRQUNYLEVBQUUsRUFBRSxzQkFBc0I7UUFDMUIsQ0FBQyxFQUFFLE9BQU87UUFDVixFQUFFLEVBQUUsc0JBQXNCO0tBQzNCO0lBQ0QsSUFBSSxFQUFFO1FBQ0osR0FBRyxFQUFFLENBQUMsRUFBRSx1Q0FBdUM7UUFDL0MsR0FBRyxFQUFFLENBQUMsQ0FBRSxnRUFBZ0U7S0FDekU7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9jYWxlRGF0YSB9IGZyb20gJy4uL2xvY2FsZS9sb2NhbGUuY2xhc3MnO1xyXG5cclxuLy8gISBtb21lbnQuanMgbG9jYWxlIGNvbmZpZ3VyYXRpb25cclxuLy8gISBsb2NhbGUgOiBSb21hbmlhbiBbcm9dXHJcbi8vISBhdXRob3IgOiBWbGFkIEd1cmRpZ2EgOiBodHRwczovL2dpdGh1Yi5jb20vZ3VyZGlnYVxyXG4vLyEgYXV0aG9yIDogVmFsZW50aW4gQWdhY2hpIDogaHR0cHM6Ly9naXRodWIuY29tL2F2YWx5XHJcbi8vICEgYXV0aG9yIDogRWFybGUgd2hpdGU6IGh0dHBzOi8vZ2l0aHViLmNvbS81ZWFybGVcclxuXHJcbmZ1bmN0aW9uIHJlbGF0aXZlVGltZVdpdGhQbHVyYWwobnVtOiBudW1iZXIsIHdpdGhvdXRTdWZmaXg6IGJvb2xlYW4sIGtleTogc3RyaW5nKTogc3RyaW5nIHtcclxuICBsZXQgZm9ybWF0OiB7W2tleTpzdHJpbmddOiBzdHJpbmd9ID0ge1xyXG4gICAgc3M6ICdzZWN1bmRlJyxcclxuICAgIG1tOiAnbWludXRlJyxcclxuICAgIGhoOiAnb3JlJyxcclxuICAgIGRkOiAnemlsZScsXHJcbiAgICBNTTogJ2x1bmknLFxyXG4gICAgeXk6ICdhbmknXHJcbiAgfTtcclxuXHJcbiAgbGV0IHNlcGFyYXRvciA9ICcgJztcclxuICBpZiAobnVtICUgMTAwID49IDIwIHx8IChudW0gPj0gMTAwICYmIG51bSAlIDEwMCA9PT0gMCkpIHtcclxuICAgIHNlcGFyYXRvciA9ICcgZGUgJztcclxuICB9XHJcbiAgcmV0dXJuIG51bSArIHNlcGFyYXRvciArIGZvcm1hdFtrZXldO1xyXG59XHJcblxyXG5cclxuZXhwb3J0IGNvbnN0IHJvTG9jYWxlOiBMb2NhbGVEYXRhID0ge1xyXG4gIGFiYnI6ICdybycsXHJcbiAgbW9udGhzOiAnaWFudWFyaWVfZmVicnVhcmllX21hcnRpZV9hcHJpbGllX21haV9pdW5pZV9pdWxpZV9hdWd1c3Rfc2VwdGVtYnJpZV9vY3RvbWJyaWVfbm9pZW1icmllX2RlY2VtYnJpZScuc3BsaXQoJ18nKSxcclxuICBtb250aHNTaG9ydDogJ2lhbi5fZmVici5fbWFydC5fYXByLl9tYWlfaXVuLl9pdWwuX2F1Zy5fc2VwdC5fb2N0Ll9ub3YuX2RlYy4nLnNwbGl0KCdfJyksXHJcbiAgbW9udGhzUGFyc2VFeGFjdDogdHJ1ZSxcclxuICB3ZWVrZGF5czogJ2R1bWluaWPEg19sdW5pX21hcsibaV9taWVyY3VyaV9qb2lfdmluZXJpX3PDom1ixIN0xIMnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNTaG9ydDogJ0R1bV9MdW5fTWFyX01pZV9Kb2lfVmluX1PDom0nLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNNaW46ICdEdV9MdV9NYV9NaV9Kb19WaV9Tw6InLnNwbGl0KCdfJyksXHJcbiAgbG9uZ0RhdGVGb3JtYXQ6IHtcclxuICAgIExUOiAnSDptbScsXHJcbiAgICBMVFM6ICdIOm1tOnNzJyxcclxuICAgIEw6ICdERC5NTS5ZWVlZJyxcclxuICAgIExMOiAnRCBNTU1NIFlZWVknLFxyXG4gICAgTExMOiAnRCBNTU1NIFlZWVkgSDptbScsXHJcbiAgICBMTExMOiAnZGRkZCwgRCBNTU1NIFlZWVkgSDptbSdcclxuICB9LFxyXG4gIGNhbGVuZGFyOiB7XHJcbiAgICBzYW1lRGF5OiAnW2F6aSBsYV0gTFQnLFxyXG4gICAgbmV4dERheTogJ1ttw6JpbmUgbGFdIExUJyxcclxuICAgIG5leHRXZWVrOiAnZGRkZCBbbGFdIExUJyxcclxuICAgIGxhc3REYXk6ICdbaWVyaSBsYV0gTFQnLFxyXG4gICAgbGFzdFdlZWs6ICdbZm9zdGFdIGRkZGQgW2xhXSBMVCcsXHJcbiAgICBzYW1lRWxzZTogJ0wnXHJcbiAgfSxcclxuICByZWxhdGl2ZVRpbWU6IHtcclxuICAgIGZ1dHVyZTogJ3Blc3RlICVzJyxcclxuICAgIHBhc3Q6ICclcyDDrm4gdXJtxIMnLFxyXG4gICAgczogJ2PDonRldmEgc2VjdW5kZScsXHJcbiAgICBzczogcmVsYXRpdmVUaW1lV2l0aFBsdXJhbCxcclxuICAgIG06ICd1biBtaW51dCcsXHJcbiAgICBtbTogcmVsYXRpdmVUaW1lV2l0aFBsdXJhbCxcclxuICAgIGg6ICdvIG9yxIMnLFxyXG4gICAgaGg6IHJlbGF0aXZlVGltZVdpdGhQbHVyYWwsXHJcbiAgICBkOiAnbyB6aScsXHJcbiAgICBkZDogcmVsYXRpdmVUaW1lV2l0aFBsdXJhbCxcclxuICAgIE06ICdvIGx1bsSDJyxcclxuICAgIE1NOiByZWxhdGl2ZVRpbWVXaXRoUGx1cmFsLFxyXG4gICAgeTogJ3VuIGFuJyxcclxuICAgIHl5OiByZWxhdGl2ZVRpbWVXaXRoUGx1cmFsXHJcbiAgfSxcclxuICB3ZWVrOiB7XHJcbiAgICBkb3c6IDEsIC8vIE1vbmRheSBpcyB0aGUgZmlyc3QgZGF5IG9mIHRoZSB3ZWVrLlxyXG4gICAgZG95OiA3ICAvLyBUaGUgd2VlayB0aGF0IGNvbnRhaW5zIEphbiAxc3QgaXMgdGhlIGZpcnN0IHdlZWsgb2YgdGhlIHllYXIuXHJcbiAgfVxyXG59O1xyXG4iXX0=