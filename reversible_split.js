// ---
// reversible_split proposal (https://github.com/ycw/reversible_split) POC
// by ycw (https://github.com/ycw) @2022-01-26
// ---

; (function () {

  // ---
  // Splitter
  // ---

  String.SplitN = class {
    constructor(sep = '', n = Infinity) {
      if (n < 1) {
        throw new RangeError("SplitN is irreversible for n < 1");
      }
      this.separator = sep;
      this.max_count = n;
    }

    [Symbol.split](str) {
      return (this.separator instanceof RegExp)
        ? split_regexp(this.separator, this.max_count, str)
        : split_string(this.separator, this.max_count, str)
        ;
    }
  }

  function split_string(sep, count, str) {
    return (sep.length)
      ? split_regexp(new RegExp(sep), count, str)
      : split_empty(count, str) // empty str 
  }

  function split_empty(count, str) {
    const items = [];
    const seps = [];
    const chars = [...str];
    chars.some((ch, i) => {
      if (i === count) {
        return true;
      }
      if (i === count - 1) {
        items.push(chars.slice(i).join(''));
        return true;
      }
      items.push(ch);
      seps.push('');
      return false;
    });

    items.separators = seps;
    items.groups = [];
    return items;
  }

  function split_regexp(sep, count, str) {
    const items = [];
    const seps = [];
    const groups = [];
    const re = clone_regexp(sep, 'g');

    let at = 0;
    while (re.lastIndex < str.length) {
      if (items.length === count) {
        break;
      }

      if (items.length === count - 1) {
        items.push(str.slice(at));
        break;
      }

      const exec = re.exec(str);

      if (!exec) {
        items.push(str.slice(at));
        break;
      }

      items.push(str.slice(at, re.lastIndex - exec[0].length));
      seps.push(exec[0]); // fullmatch
      groups.push(...exec.slice(1)) // spread matched groups
      at = re.lastIndex;
    }

    items.separators = seps;
    items.groups = groups;
    return items;
  }

  function clone_regexp(re, flags) {
    const merged = new Set(...re.flags, ...flags);
    return new RegExp(re, [...merged].join(''));
  }

  // ---
  // Join
  // ---

  const _join = Array.prototype.join;

  Array.prototype.join = function (sep) {
    return Array.isArray(sep)
      ? join_array(this, sep)
      : join_string(this, sep)
      ;
  }

  function join_string(items, sep) {
    return _join.call(items, sep);
  }

  function join_array(items, seps) {
    return String.raw({ raw: items }, ...seps);
  }

})();