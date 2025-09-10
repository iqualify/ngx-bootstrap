//! moment.js locale configuration
//! locale : Japanese [ja]
//! author : LI Long : https://github.com/baryon
export const jaLocale = {
    abbr: 'ja',
    months: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
    weekdays: '日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日'.split('_'),
    weekdaysShort: '日_月_火_水_木_金_土'.split('_'),
    weekdaysMin: '日_月_火_水_木_金_土'.split('_'),
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'YYYY/MM/DD',
        LL: 'YYYY年M月D日',
        LLL: 'YYYY年M月D日 HH:mm',
        LLLL: 'YYYY年M月D日 HH:mm dddd',
        l: 'YYYY/MM/DD',
        ll: 'YYYY年M月D日',
        lll: 'YYYY年M月D日 HH:mm',
        llll: 'YYYY年M月D日 HH:mm dddd'
    },
    meridiemParse: /午前|午後/i,
    isPM(input) {
        return input === '午後';
    },
    meridiem(hour, minute, isLower) {
        if (hour < 12) {
            return '午前';
        }
        else {
            return '午後';
        }
    },
    calendar: {
        sameDay: '[今日] LT',
        nextDay: '[明日] LT',
        nextWeek: '[来週]dddd LT',
        lastDay: '[昨日] LT',
        lastWeek: '[前週]dddd LT',
        sameElse: 'L'
    },
    dayOfMonthOrdinalParse: /\d{1,2}日/,
    ordinal(num, period) {
        switch (period) {
            case 'd':
            case 'D':
            case 'DDD':
                return num + '日';
            default:
                return num.toString(10);
        }
    },
    relativeTime: {
        future: '%s後',
        past: '%s前',
        s: '数秒',
        ss: '%d秒',
        m: '1分',
        mm: '%d分',
        h: '1時間',
        hh: '%d時間',
        d: '1日',
        dd: '%d日',
        M: '1ヶ月',
        MM: '%dヶ月',
        y: '1年',
        yy: '%d年'
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvY2hyb25vcy9pMThuL2phLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLGtDQUFrQztBQUNsQywwQkFBMEI7QUFDMUIsZ0RBQWdEO0FBRWhELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBZ0I7SUFDbkMsSUFBSSxFQUFFLElBQUk7SUFDVixNQUFNLEVBQUcsd0NBQXdDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUM1RCxXQUFXLEVBQUcsd0NBQXdDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNqRSxRQUFRLEVBQUcsNkJBQTZCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUNuRCxhQUFhLEVBQUcsZUFBZSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDMUMsV0FBVyxFQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQ3hDLGNBQWMsRUFBRztRQUNmLEVBQUUsRUFBRyxPQUFPO1FBQ1osR0FBRyxFQUFHLFVBQVU7UUFDaEIsQ0FBQyxFQUFHLFlBQVk7UUFDaEIsRUFBRSxFQUFHLFdBQVc7UUFDaEIsR0FBRyxFQUFHLGlCQUFpQjtRQUN2QixJQUFJLEVBQUcsc0JBQXNCO1FBQzdCLENBQUMsRUFBRyxZQUFZO1FBQ2hCLEVBQUUsRUFBRyxXQUFXO1FBQ2hCLEdBQUcsRUFBRyxpQkFBaUI7UUFDdkIsSUFBSSxFQUFHLHNCQUFzQjtLQUM5QjtJQUNELGFBQWEsRUFBRSxRQUFRO0lBQ3ZCLElBQUksQ0FBRSxLQUFLO1FBQ1QsT0FBTyxLQUFLLEtBQUssSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFDRCxRQUFRLENBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPO1FBQzdCLElBQUksSUFBSSxHQUFHLEVBQUUsRUFBRSxDQUFDO1lBQ2QsT0FBTyxJQUFJLENBQUM7UUFDZCxDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7SUFDRCxRQUFRLEVBQUc7UUFDVCxPQUFPLEVBQUcsU0FBUztRQUNuQixPQUFPLEVBQUcsU0FBUztRQUNuQixRQUFRLEVBQUcsYUFBYTtRQUN4QixPQUFPLEVBQUcsU0FBUztRQUNuQixRQUFRLEVBQUcsYUFBYTtRQUN4QixRQUFRLEVBQUcsR0FBRztLQUNmO0lBQ0Qsc0JBQXNCLEVBQUcsVUFBVTtJQUNuQyxPQUFPLENBQUUsR0FBVyxFQUFFLE1BQWM7UUFDbEMsUUFBUSxNQUFNLEVBQUUsQ0FBQztZQUNmLEtBQUssR0FBRyxDQUFDO1lBQ1QsS0FBSyxHQUFHLENBQUM7WUFDVCxLQUFLLEtBQUs7Z0JBQ1IsT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDO1lBQ25CO2dCQUNFLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztJQUNELFlBQVksRUFBRztRQUNiLE1BQU0sRUFBRyxLQUFLO1FBQ2QsSUFBSSxFQUFHLEtBQUs7UUFDWixDQUFDLEVBQUcsSUFBSTtRQUNSLEVBQUUsRUFBRyxLQUFLO1FBQ1YsQ0FBQyxFQUFHLElBQUk7UUFDUixFQUFFLEVBQUcsS0FBSztRQUNWLENBQUMsRUFBRyxLQUFLO1FBQ1QsRUFBRSxFQUFHLE1BQU07UUFDWCxDQUFDLEVBQUcsSUFBSTtRQUNSLEVBQUUsRUFBRyxLQUFLO1FBQ1YsQ0FBQyxFQUFHLEtBQUs7UUFDVCxFQUFFLEVBQUcsTUFBTTtRQUNYLENBQUMsRUFBRyxJQUFJO1FBQ1IsRUFBRSxFQUFHLEtBQUs7S0FDWDtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2NhbGVEYXRhIH0gZnJvbSAnLi4vbG9jYWxlL2xvY2FsZS5jbGFzcyc7XHJcblxyXG4vLyEgbW9tZW50LmpzIGxvY2FsZSBjb25maWd1cmF0aW9uXHJcbi8vISBsb2NhbGUgOiBKYXBhbmVzZSBbamFdXHJcbi8vISBhdXRob3IgOiBMSSBMb25nIDogaHR0cHM6Ly9naXRodWIuY29tL2JhcnlvblxyXG5cclxuZXhwb3J0IGNvbnN0IGphTG9jYWxlOiBMb2NhbGVEYXRhID0gIHtcclxuICBhYmJyOiAnamEnLFxyXG4gIG1vbnRocyA6ICcx5pyIXzLmnIhfM+aciF805pyIXzXmnIhfNuaciF835pyIXzjmnIhfOeaciF8xMOaciF8xMeaciF8xMuaciCcuc3BsaXQoJ18nKSxcclxuICBtb250aHNTaG9ydCA6ICcx5pyIXzLmnIhfM+aciF805pyIXzXmnIhfNuaciF835pyIXzjmnIhfOeaciF8xMOaciF8xMeaciF8xMuaciCcuc3BsaXQoJ18nKSxcclxuICB3ZWVrZGF5cyA6ICfml6Xmm5zml6Vf5pyI5puc5pelX+eBq+abnOaXpV/msLTmm5zml6Vf5pyo5puc5pelX+mHkeabnOaXpV/lnJ/mm5zml6UnLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNTaG9ydCA6ICfml6Vf5pyIX+eBq1/msLRf5pyoX+mHkV/lnJ8nLnNwbGl0KCdfJyksXHJcbiAgd2Vla2RheXNNaW4gOiAn5pelX+aciF/ngatf5rC0X+acqF/ph5Ff5ZyfJy5zcGxpdCgnXycpLFxyXG4gIGxvbmdEYXRlRm9ybWF0IDoge1xyXG4gICAgTFQgOiAnSEg6bW0nLFxyXG4gICAgTFRTIDogJ0hIOm1tOnNzJyxcclxuICAgIEwgOiAnWVlZWS9NTS9ERCcsXHJcbiAgICBMTCA6ICdZWVlZ5bm0TeaciETml6UnLFxyXG4gICAgTExMIDogJ1lZWVnlubRN5pyIROaXpSBISDptbScsXHJcbiAgICBMTExMIDogJ1lZWVnlubRN5pyIROaXpSBISDptbSBkZGRkJyxcclxuICAgIGwgOiAnWVlZWS9NTS9ERCcsXHJcbiAgICBsbCA6ICdZWVlZ5bm0TeaciETml6UnLFxyXG4gICAgbGxsIDogJ1lZWVnlubRN5pyIROaXpSBISDptbScsXHJcbiAgICBsbGxsIDogJ1lZWVnlubRN5pyIROaXpSBISDptbSBkZGRkJ1xyXG4gIH0sXHJcbiAgbWVyaWRpZW1QYXJzZTogL+WNiOWJjXzljYjlvowvaSxcclxuICBpc1BNIChpbnB1dCkge1xyXG4gICAgcmV0dXJuIGlucHV0ID09PSAn5Y2I5b6MJztcclxuICB9LFxyXG4gIG1lcmlkaWVtIChob3VyLCBtaW51dGUsIGlzTG93ZXIpIHtcclxuICAgIGlmIChob3VyIDwgMTIpIHtcclxuICAgICAgcmV0dXJuICfljYjliY0nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuICfljYjlvownO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY2FsZW5kYXIgOiB7XHJcbiAgICBzYW1lRGF5IDogJ1vku4rml6VdIExUJyxcclxuICAgIG5leHREYXkgOiAnW+aYjuaXpV0gTFQnLFxyXG4gICAgbmV4dFdlZWsgOiAnW+adpemAsV1kZGRkIExUJyxcclxuICAgIGxhc3REYXkgOiAnW+aYqOaXpV0gTFQnLFxyXG4gICAgbGFzdFdlZWsgOiAnW+WJjemAsV1kZGRkIExUJyxcclxuICAgIHNhbWVFbHNlIDogJ0wnXHJcbiAgfSxcclxuICBkYXlPZk1vbnRoT3JkaW5hbFBhcnNlIDogL1xcZHsxLDJ95pelLyxcclxuICBvcmRpbmFsIChudW06IG51bWJlciwgcGVyaW9kOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgc3dpdGNoIChwZXJpb2QpIHtcclxuICAgICAgY2FzZSAnZCc6XHJcbiAgICAgIGNhc2UgJ0QnOlxyXG4gICAgICBjYXNlICdEREQnOlxyXG4gICAgICAgIHJldHVybiBudW0gKyAn5pelJztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gbnVtLnRvU3RyaW5nKDEwKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHJlbGF0aXZlVGltZSA6IHtcclxuICAgIGZ1dHVyZSA6ICclc+W+jCcsXHJcbiAgICBwYXN0IDogJyVz5YmNJyxcclxuICAgIHMgOiAn5pWw56eSJyxcclxuICAgIHNzIDogJyVk56eSJyxcclxuICAgIG0gOiAnMeWIhicsXHJcbiAgICBtbSA6ICclZOWIhicsXHJcbiAgICBoIDogJzHmmYLplpMnLFxyXG4gICAgaGggOiAnJWTmmYLplpMnLFxyXG4gICAgZCA6ICcx5pelJyxcclxuICAgIGRkIDogJyVk5pelJyxcclxuICAgIE0gOiAnMeODtuaciCcsXHJcbiAgICBNTSA6ICclZOODtuaciCcsXHJcbiAgICB5IDogJzHlubQnLFxyXG4gICAgeXkgOiAnJWTlubQnXHJcbiAgfVxyXG59O1xyXG4iXX0=