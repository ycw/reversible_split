// `String.raw` polyfill (POC)
// https://caniuse.com/mdn-javascript_builtins_string_raw

if (typeof String.raw !== 'function') {
  String.raw = ({ raw }, ...seps) =>
    raw.reduce((strs, i) => {
      strs.push(raw[i]);
      i < seps.length && strs.push(seps[i]);
      return strs;
    }, []).join('')
    ;
}