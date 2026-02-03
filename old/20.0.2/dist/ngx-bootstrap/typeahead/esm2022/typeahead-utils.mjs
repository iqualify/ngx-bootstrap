import { latinMap } from './latin-map';
export function latinize(str) {
    if (!str) {
        return '';
    }
    return str.replace(/[^A-Za-z0-9[\] ]/g, function (a) {
        return latinMap[a] || a;
    });
}
export function escapeRegexp(queryToEscape) {
    // Regex: capture the whole query string and replace it with the string
    // that will be used to match the results, for example if the capture is
    // 'a' the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}
export function tokenize(str, wordRegexDelimiters = ' ', phraseRegexDelimiters = '', delimitersForMultipleSearch) {
    let result = [];
    if (!delimitersForMultipleSearch) {
        result = tokenizeWordsAndPhrases(str, wordRegexDelimiters, phraseRegexDelimiters);
    }
    else {
        const multipleSearchRegexStr = `([${delimitersForMultipleSearch}]+)`;
        const delimitedTokens = str.split(new RegExp(multipleSearchRegexStr, 'g'));
        const lastToken = delimitedTokens[delimitedTokens.length - 1];
        if (lastToken > '') {
            if (wordRegexDelimiters && phraseRegexDelimiters) {
                result = tokenizeWordsAndPhrases(lastToken, wordRegexDelimiters, phraseRegexDelimiters);
            }
            else {
                result.push(lastToken);
            }
        }
    }
    return result;
}
function tokenizeWordsAndPhrases(str, wordRegexDelimiters, phraseRegexDelimiters) {
    const result = [];
    const regexStr = `(?:[${phraseRegexDelimiters}])([^${phraseRegexDelimiters}]+)` +
        `(?:[${phraseRegexDelimiters}])|([^${wordRegexDelimiters}]+)`;
    const preTokenized = str.split(new RegExp(regexStr, 'g'));
    const preTokenizedLength = preTokenized.length;
    let token;
    const replacePhraseDelimiters = new RegExp(`[${phraseRegexDelimiters}]+`, 'g');
    for (let i = 0; i < preTokenizedLength; i += 1) {
        token = preTokenized[i];
        if (token && token.length && token !== wordRegexDelimiters) {
            result.push(token.replace(replacePhraseDelimiters, ''));
        }
    }
    return result;
}
// eslint-disable-next-line
export function getValueFromObject(object, option) {
    if (!option || typeof object !== 'object') {
        return object.toString();
    }
    if (option.endsWith('()')) {
        const functionName = option.slice(0, option.length - 2);
        return object[functionName]().toString();
    }
    const properties = option
        .replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '');
    const propertiesArray = properties.split('.');
    for (const property of propertiesArray) {
        if (property in object) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            object = object[property];
        }
    }
    if (!object) {
        return '';
    }
    return object.toString();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3R5cGVhaGVhZC90eXBlYWhlYWQtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxNQUFNLFVBQVUsUUFBUSxDQUFDLEdBQVc7SUFDbEMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRUQsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLFVBQVMsQ0FBUztRQUN4RCxPQUFPLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxVQUFVLFlBQVksQ0FBQyxhQUFxQjtJQUNoRCx1RUFBdUU7SUFDdkUsd0VBQXdFO0lBQ3hFLDRCQUE0QjtJQUM1QixPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsd0JBQXdCLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDakUsQ0FBQztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBVyxFQUNYLG1CQUFtQixHQUFHLEdBQUcsRUFDekIscUJBQXFCLEdBQUcsRUFBRSxFQUFFLDJCQUFvQztJQUV2RixJQUFJLE1BQU0sR0FBYSxFQUFFLENBQUM7SUFDMUIsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDakMsTUFBTSxHQUFHLHVCQUF1QixDQUFDLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3BGLENBQUM7U0FBTSxDQUFDO1FBQ04sTUFBTSxzQkFBc0IsR0FBRyxLQUFLLDJCQUEyQixLQUFLLENBQUM7UUFDckUsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMs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Q1osQ0FBQztJQUVELE9BQU8sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsYXRpbk1hcCB9IGZyb20gJy4vbGF0aW4tbWFwJztcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBsYXRpbml6ZShzdHI6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgaWYgKCFzdHIpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIHJldHVybiBzdHIucmVwbGFjZSgvW15BLVphLXowLTlbXFxdIF0vZywgZnVuY3Rpb24oYTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgIHJldHVybiBsYXRpbk1hcFthXSB8fCBhO1xyXG4gIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZXNjYXBlUmVnZXhwKHF1ZXJ5VG9Fc2NhcGU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgLy8gUmVnZXg6IGNhcHR1cmUgdGhlIHdob2xlIHF1ZXJ5IHN0cmluZyBhbmQgcmVwbGFjZSBpdCB3aXRoIHRoZSBzdHJpbmdcclxuICAvLyB0aGF0IHdpbGwgYmUgdXNlZCB0byBtYXRjaCB0aGUgcmVzdWx0cywgZm9yIGV4YW1wbGUgaWYgdGhlIGNhcHR1cmUgaXNcclxuICAvLyAnYScgdGhlIHJlc3VsdCB3aWxsIGJlIFxcYVxyXG4gIHJldHVybiBxdWVyeVRvRXNjYXBlLnJlcGxhY2UoLyhbLj8qK14kW1xcXVxcXFwoKXt9fC1dKS9nLCAnXFxcXCQxJyk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b2tlbml6ZShzdHI6IHN0cmluZyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgIHdvcmRSZWdleERlbGltaXRlcnMgPSAnICcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICBwaHJhc2VSZWdleERlbGltaXRlcnMgPSAnJywgZGVsaW1pdGVyc0Zvck11bHRpcGxlU2VhcmNoPzogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XHJcblxyXG4gIGxldCByZXN1bHQ6IHN0cmluZ1tdID0gW107XHJcbiAgaWYgKCFkZWxpbWl0ZXJzRm9yTXVsdGlwbGVTZWFyY2gpIHtcclxuICAgIHJlc3VsdCA9IHRva2VuaXplV29yZHNBbmRQaHJhc2VzKHN0ciwgd29yZFJlZ2V4RGVsaW1pdGVycywgcGhyYXNlUmVnZXhEZWxpbWl0ZXJzKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc3QgbXVsdGlwbGVTZWFyY2hSZWdleFN0ciA9IGAoWyR7ZGVsaW1pdGVyc0Zvck11bHRpcGxlU2VhcmNofV0rKWA7XHJcbiAgICBjb25zdCBkZWxpbWl0ZWRUb2tlbnMgPSBzdHIuc3BsaXQobmV3IFJlZ0V4cChtdWx0aXBsZVNlYXJjaFJlZ2V4U3RyLCAnZycpKTtcclxuICAgIGNvbnN0IGxhc3RUb2tlbiA9IGRlbGltaXRlZFRva2Vuc1tkZWxpbWl0ZWRUb2tlbnMubGVuZ3RoIC0gMV07XHJcbiAgICBpZiAobGFzdFRva2VuID4gJycpIHtcclxuICAgICAgaWYgKHdvcmRSZWdleERlbGltaXRlcnMgJiYgcGhyYXNlUmVnZXhEZWxpbWl0ZXJzKSB7XHJcbiAgICAgICAgcmVzdWx0ID0gdG9rZW5pemVXb3Jkc0FuZFBocmFzZXMobGFzdFRva2VuLCB3b3JkUmVnZXhEZWxpbWl0ZXJzLCBwaHJhc2VSZWdleERlbGltaXRlcnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdC5wdXNoKGxhc3RUb2tlbik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHRva2VuaXplV29yZHNBbmRQaHJhc2VzKHN0cjogc3RyaW5nLCB3b3JkUmVnZXhEZWxpbWl0ZXJzOiBzdHJpbmcsIHBocmFzZVJlZ2V4RGVsaW1pdGVyczogc3RyaW5nKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgY29uc3QgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xyXG4gIGNvbnN0IHJlZ2V4U3RyID0gYCg/Olske3BocmFzZVJlZ2V4RGVsaW1pdGVyc31dKShbXiR7cGhyYXNlUmVnZXhEZWxpbWl0ZXJzfV0rKWAgK1xyXG4gICAgYCg/Olske3BocmFzZVJlZ2V4RGVsaW1pdGVyc31dKXwoW14ke3dvcmRSZWdleERlbGltaXRlcnN9XSspYDtcclxuICBjb25zdCBwcmVUb2tlbml6ZWQ6IHN0cmluZ1tdID0gc3RyLnNwbGl0KG5ldyBSZWdFeHAocmVnZXhTdHIsICdnJykpO1xyXG4gIGNvbnN0IHByZVRva2VuaXplZExlbmd0aDogbnVtYmVyID0gcHJlVG9rZW5pemVkLmxlbmd0aDtcclxuICBsZXQgdG9rZW46IHN0cmluZztcclxuICBjb25zdCByZXBsYWNlUGhyYXNlRGVsaW1pdGVycyA9IG5ldyBSZWdFeHAoYFske3BocmFzZVJlZ2V4RGVsaW1pdGVyc31dK2AsICdnJyk7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcHJlVG9rZW5pemVkTGVuZ3RoOyBpICs9IDEpIHtcclxuICAgIHRva2VuID0gcHJlVG9rZW5pemVkW2ldO1xyXG4gICAgaWYgKHRva2VuICYmIHRva2VuLmxlbmd0aCAmJiB0b2tlbiAhPT0gd29yZFJlZ2V4RGVsaW1pdGVycykge1xyXG4gICAgICByZXN1bHQucHVzaCh0b2tlbi5yZXBsYWNlKHJlcGxhY2VQaHJhc2VEZWxpbWl0ZXJzLCAnJykpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRWYWx1ZUZyb21PYmplY3Qob2JqZWN0OiBzdHJpbmcgfCBSZWNvcmQ8c3RyaW5nIHwgbnVtYmVyLCBhbnk+LCBvcHRpb24/OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gIGlmICghb3B0aW9uIHx8IHR5cGVvZiBvYmplY3QgIT09ICdvYmplY3QnKSB7XHJcbiAgICByZXR1cm4gb2JqZWN0LnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICBpZiAob3B0aW9uLmVuZHNXaXRoKCcoKScpKSB7XHJcbiAgICBjb25zdCBmdW5jdGlvbk5hbWUgPSBvcHRpb24uc2xpY2UoMCwgb3B0aW9uLmxlbmd0aCAtIDIpO1xyXG5cclxuICAgIHJldHVybiAob2JqZWN0W2Z1bmN0aW9uTmFtZV0gYXMgKCkgPT4gc3RyaW5nKSgpLnRvU3RyaW5nKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBwcm9wZXJ0aWVzOiBzdHJpbmcgPSBvcHRpb25cclxuICAgIC5yZXBsYWNlKC9cXFsoXFx3KylcXF0vZywgJy4kMScpXHJcbiAgICAucmVwbGFjZSgvXlxcLi8sICcnKTtcclxuICBjb25zdCBwcm9wZXJ0aWVzQXJyYXk6IHN0cmluZ1tdID0gcHJvcGVydGllcy5zcGxpdCgnLicpO1xyXG5cclxuICBmb3IgKGNvbnN0IHByb3BlcnR5IG9mIHByb3BlcnRpZXNBcnJheSkge1xyXG4gICAgaWYgKHByb3BlcnR5IGluIChvYmplY3QgYXMgUmVjb3JkPHN0cmluZywgdW5rbm93bj4pKSB7XHJcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcclxuICAgICAgLy8gQHRzLWlnbm9yZVxyXG4gICAgICBvYmplY3QgPSBvYmplY3RbcHJvcGVydHldO1xyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoIW9iamVjdCkge1xyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9iamVjdC50b1N0cmluZygpO1xyXG59XHJcbiJdfQ==