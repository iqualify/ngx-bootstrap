//! moment.js locale configuration
//! locale : French [fr]
//! author : John Fischer : https://github.com/jfroffice
export const frLocale = {
    abbr: 'fr',
    months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
    monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
    monthsParseExact: true,
    weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
    weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
    weekdaysMin: 'di_lu_ma_me_je_ve_sa'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM YYYY',
        LLL: 'D MMMM YYYY HH:mm',
        LLLL: 'dddd D MMMM YYYY HH:mm'
    },
    calendar: {
        sameDay: '[Aujourd’hui à] LT',
        nextDay: '[Demain à] LT',
        nextWeek: 'dddd [à] LT',
        lastDay: '[Hier à] LT',
        lastWeek: 'dddd [dernier à] LT',
        sameElse: 'L'
    },
    relativeTime: {
        future: 'dans %s',
        past: 'il y a %s',
        s: 'quelques secondes',
        ss: '%d secondes',
        m: 'une minute',
        mm: '%d minutes',
        h: 'une heure',
        hh: '%d heures',
        d: 'un jour',
        dd: '%d jours',
        M: 'un mois',
        MM: '%d mois',
        y: 'un an',
        yy: '%d ans'
    },
    dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
    ordinal(_num, period) {
        const num = Number(_num);
        switch (period) {
            // TODO: Return 'e' when day of month > 1. Move this case inside
            // block for masculine words below.
            // See https://github.com/moment/moment/issues/3375
            case 'D':
                return num + (num === 1 ? 'er' : '');
            // Words with masculine grammatical gender: mois, trimestre, jour
            default:
            case 'M':
            case 'Q':
            case 'DDD':
            case 'd':
                return num + (num === 1 ? 'er' : 'e');
            // Words with feminine grammatical gender: semaine
            case 'w':
            case 'W':
                return num + (num === 1 ? 're' : 'e');
        }
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4 // The week that contains Jan 4th is the first week of the year.
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2ZyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQyx3QkFBd0I7QUFDeEIsd0RBQXdEO0FBRXhELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZTtJQUNsQyxJQUFJLEVBQUUsSUFBSTtJQUNWLE1BQU0sRUFBRSxzRkFBc0YsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3pHLFdBQVcsRUFBRSxnRUFBZ0UsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hGLGdCQUFnQixFQUFFLElBQUk7SUFDdEIsUUFBUSxFQUFFLHFEQUFxRCxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDMUUsYUFBYSxFQUFFLG9DQUFvQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDOUQsV0FBVyxFQUFFLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDOUMsa0JBQWtCLEVBQUUsSUFBSTtJQUN4QixjQUFjLEVBQUU7UUFDZCxFQUFFLEVBQUUsT0FBTztRQUNYLEdBQUcsRUFBRSxVQUFVO1FBQ2YsQ0FBQyxFQUFFLFlBQVk7UUFDZixFQUFFLEVBQUUsYUFBYTtRQUNqQixHQUFHLEVBQUUsbUJBQW1CO1FBQ3hCLElBQUksRUFBRSx3QkFBd0I7S0FDL0I7SUFDRCxRQUFRLEVBQUU7UUFDUixPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLE9BQU8sRUFBRSxlQUFlO1FBQ3hCLFFBQVEsRUFBRSxhQUFhO1FBQ3ZCLE9BQU8sRUFBRSxhQUFhO1FBQ3RCLFFBQVEsRUFBRSxxQkFBcUI7UUFDL0IsUUFBUSxFQUFFLEdBQUc7S0FDZDtJQUNELFlBQVksRUFBRTtRQUNaLE1BQU0sRUFBRSxTQUFTO1FBQ2pCLElBQUksRUFBRSxXQUFXO1FBQ2pCLENBQUMsRUFBRSxtQkFBbUI7UUFDdEIsRUFBRSxFQUFFLGFBQWE7UUFDakIsQ0FBQyxFQUFFLFlBQVk7UUFDZixFQUFFLEVBQUUsWUFBWTtRQUNoQixDQUFDLEVBQUUsV0FBVztRQUNkLEVBQUUsRUFBRSxXQUFXO1FBQ2YsQ0FBQyxFQUFFLFNBQVM7UUFDWixFQUFFLEVBQUUsVUFBVTtRQUNkLENBQUMsRUFBRSxTQUFTO1FBQ1osRUFBRSxFQUFFLFNBQVM7UUFDYixDQUFDLEVBQUUsT0FBTztRQUNWLEVBQUUsRUFBRSxRQUFRO0tBQ2I7SUFDRCxzQkFBc0IsRUFBRSxjQUFjO0lBQ3RDLE9BQU8sQ0FBQyxJQUFZLEVBQUUsTUFBYztRQUNsQyxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsUUFBUSxNQUFNLEVBQUUsQ0FBQztZQUNmLGdFQUFnRTtZQUNoRSxtQ0FBbUM7WUFDbkMsbURBQW1EO1lBQ25ELEtBQUssR0FBRztnQkFDTixPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFdkMsaUVBQWlFO1lBQ2pFLFFBQVE7WUFDUixLQUFLLEdBQUcsQ0FBQztZQUNULEtBQUssR0FBRyxDQUFDO1lBQ1QsS0FBSyxLQUFLLENBQUM7WUFDWCxLQUFLLEdBQUc7Z0JBQ04sT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRXhDLGtEQUFrRDtZQUNsRCxLQUFLLEdBQUcsQ0FBQztZQUNULEtBQUssR0FBRztnQkFDTixPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUMsQ0FBQztJQUNILENBQUM7SUFDRCxJQUFJLEVBQUU7UUFDSixHQUFHLEVBQUUsQ0FBQyxFQUFFLHVDQUF1QztRQUMvQyxHQUFHLEVBQUUsQ0FBQyxDQUFFLGdFQUFnRTtLQUN6RTtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XHJcblxyXG4vLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXHJcbi8vISBsb2NhbGUgOiBGcmVuY2ggW2ZyXVxyXG4vLyEgYXV0aG9yIDogSm9obiBGaXNjaGVyIDogaHR0cHM6Ly9naXRodWIuY29tL2pmcm9mZmljZVxyXG5cclxuZXhwb3J0IGNvbnN0IGZyTG9jYWxlOiBMb2NhbGVEYXRhID0ge1xyXG4gIGFiYnI6ICdmcicsXHJcbiAgbW9udGhzOiAnamFudmllcl9mw6l2cmllcl9tYXJzX2F2cmlsX21haV9qdWluX2p1aWxsZXRfYW/Du3Rfc2VwdGVtYnJlX29jdG9icmVfbm92ZW1icmVfZMOpY2VtYnJlJy5zcGxpdCgnXycpLFxyXG4gIG1vbnRoc1Nob3J0OiAnamFudi5fZsOpdnIuX21hcnNfYXZyLl9tYWlfanVpbl9qdWlsLl9hb8O7dF9zZXB0Ll9vY3QuX25vdi5fZMOpYy4nLnNwbGl0KCdfJyksXHJcbiAgbW9udGhzUGFyc2VFeGFjdDogdHJ1ZSxcclxuICB3ZWVrZGF5czogJ2RpbWFuY2hlX2x1bmRpX21hcmRpX21lcmNyZWRpX2pldWRpX3ZlbmRyZWRpX3NhbWVkaScuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c1Nob3J0OiAnZGltLl9sdW4uX21hci5fbWVyLl9qZXUuX3Zlbi5fc2FtLicuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5c01pbjogJ2RpX2x1X21hX21lX2plX3ZlX3NhJy5zcGxpdCgnXycpLFxyXG4gIHdlZWtkYXlzUGFyc2VFeGFjdDogdHJ1ZSxcclxuICBsb25nRGF0ZUZvcm1hdDoge1xyXG4gICAgTFQ6ICdISDptbScsXHJcbiAgICBMVFM6ICdISDptbTpzcycsXHJcbiAgICBMOiAnREQvTU0vWVlZWScsXHJcbiAgICBMTDogJ0QgTU1NTSBZWVlZJyxcclxuICAgIExMTDogJ0QgTU1NTSBZWVlZIEhIOm1tJyxcclxuICAgIExMTEw6ICdkZGRkIEQgTU1NTSBZWVlZIEhIOm1tJ1xyXG4gIH0sXHJcbiAgY2FsZW5kYXI6IHtcclxuICAgIHNhbWVEYXk6ICdbQXVqb3VyZOKAmWh1aSDDoF0gTFQnLFxyXG4gICAgbmV4dERheTogJ1tEZW1haW4gw6BdIExUJyxcclxuICAgIG5leHRXZWVrOiAnZGRkZCBbw6BdIExUJyxcclxuICAgIGxhc3REYXk6ICdbSGllciDDoF0gTFQnLFxyXG4gICAgbGFzdFdlZWs6ICdkZGRkIFtkZXJuaWVyIMOgXSBMVCcsXHJcbiAgICBzYW1lRWxzZTogJ0wnXHJcbiAgfSxcclxuICByZWxhdGl2ZVRpbWU6IHtcclxuICAgIGZ1dHVyZTogJ2RhbnMgJXMnLFxyXG4gICAgcGFzdDogJ2lsIHkgYSAlcycsXHJcbiAgICBzOiAncXVlbHF1ZXMgc2Vjb25kZXMnLFxyXG4gICAgc3M6ICclZCBzZWNvbmRlcycsXHJcbiAgICBtOiAndW5lIG1pbnV0ZScsXHJcbiAgICBtbTogJyVkIG1pbnV0ZXMnLFxyXG4gICAgaDogJ3VuZSBoZXVyZScsXHJcbiAgICBoaDogJyVkIGhldXJlcycsXHJcbiAgICBkOiAndW4gam91cicsXHJcbiAgICBkZDogJyVkIGpvdXJzJyxcclxuICAgIE06ICd1biBtb2lzJyxcclxuICAgIE1NOiAnJWQgbW9pcycsXHJcbiAgICB5OiAndW4gYW4nLFxyXG4gICAgeXk6ICclZCBhbnMnXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlOiAvXFxkezEsMn0oZXJ8KS8sXHJcbiAgb3JkaW5hbChfbnVtOiBudW1iZXIsIHBlcmlvZDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIGNvbnN0IG51bSA9IE51bWJlcihfbnVtKTtcclxuICAgIHN3aXRjaCAocGVyaW9kKSB7XHJcbiAgICAgIC8vIFRPRE86IFJldHVybiAnZScgd2hlbiBkYXkgb2YgbW9udGggPiAxLiBNb3ZlIHRoaXMgY2FzZSBpbnNpZGVcclxuICAgICAgLy8gYmxvY2sgZm9yIG1hc2N1bGluZSB3b3JkcyBiZWxvdy5cclxuICAgICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tb21lbnQvbW9tZW50L2lzc3Vlcy8zMzc1XHJcbiAgICAgIGNhc2UgJ0QnOlxyXG4gICAgICAgIHJldHVybiBudW0gKyAobnVtID09PSAxID8gJ2VyJyA6ICcnKTtcclxuXHJcbiAgICAgIC8vIFdvcmRzIHdpdGggbWFzY3VsaW5lIGdyYW1tYXRpY2FsIGdlbmRlcjogbW9pcywgdHJpbWVzdHJlLCBqb3VyXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgIGNhc2UgJ00nOlxyXG4gICAgICBjYXNlICdRJzpcclxuICAgICAgY2FzZSAnREREJzpcclxuICAgICAgY2FzZSAnZCc6XHJcbiAgICAgICAgcmV0dXJuIG51bSArIChudW0gPT09IDEgPyAnZXInIDogJ2UnKTtcclxuXHJcbiAgICAgIC8vIFdvcmRzIHdpdGggZmVtaW5pbmUgZ3JhbW1hdGljYWwgZ2VuZGVyOiBzZW1haW5lXHJcbiAgICAgIGNhc2UgJ3cnOlxyXG4gICAgICBjYXNlICdXJzpcclxuICAgICAgICByZXR1cm4gbnVtICsgKG51bSA9PT0gMSA/ICdyZScgOiAnZScpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgd2Vlazoge1xyXG4gICAgZG93OiAxLCAvLyBNb25kYXkgaXMgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2Vlay5cclxuICAgIGRveTogNCAgLy8gVGhlIHdlZWsgdGhhdCBjb250YWlucyBKYW4gNHRoIGlzIHRoZSBmaXJzdCB3ZWVrIG9mIHRoZSB5ZWFyLlxyXG4gIH1cclxufTtcclxuXHJcbiJdfQ==