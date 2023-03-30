import { cloneDeep } from 'lodash';

/**
 * Extending object that entered in first argument.
 *
 * Returns extended object or false if have no target object or incorrect type.
 *
 * If you wish to clone source object (without modify it), just use empty new
 * object as first argument, like this:
 *   deepExtend({}, yourObj_1, [yourObj_N]);
 */
export const deepExtend = function(...objects: Array<any>): any {
  if (arguments.length < 1 || typeof arguments[0] !== 'object') {
    return false;
  }

  if (arguments.length < 2) {
    return arguments[0];
  }

  const target = arguments[0];

  // convert arguments to array and cut off target object
  const args = Array.prototype.slice.call(arguments, 1);

  let val;
  let src;

  args.forEach((obj: any) => {
    // skip argument if it is array or isn't object
    if (typeof obj !== 'object' || Array.isArray(obj)) {
      return;
    }

    Object.keys(obj).forEach((key) => {
      src = target[key]; // source value
      val = obj[key]; // new value

      // recursion prevention
      if (val === target || val === null) {
        return;

        /**
         * if new value isn't object then just overwrite by new value
         * instead of extending.
         */
      } else if (typeof val !== 'object') {
        target[key] = val;
        return;

        // just clone arrays (and recursive clone objects inside)
      } else if (Array.isArray(val)) {
        target[key] = cloneDeep(val);
        return;

        // overwrite by new value if source isn't object or array
      } else if (typeof src !== 'object' || src === null || Array.isArray(src)) {
        target[key] = deepExtend({}, val);
        return;

        // source value and new value is objects both, extending...
      } else {
        target[key] = deepExtend(src, val);
        return;
      }
    });
  });

  return target;
};

export const dateFormat = (date: Date, format: string) => {
  const o = {
    'M+' : date.getMonth() + 1, // month
    'D+' : date.getDate(), // day
    'H+' : date.getHours(), // hour
    'm+' : date.getMinutes(), // minute
    's+' : date.getSeconds(), // second
    'q+' : Math.floor((date.getMonth() + 3) / 3), // quarter
    S : date.getMilliseconds() // millisecond
  };
  if (/(Y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return format;
};

export const formatWidth = (column) => {
  return column && !isNaN(column) && column > 0 && column <=12 ? column : 12;
}

export const formatAlertMessage = (message, variable) => {
  let alert = '';
  const text = message.split('%s');
  text.map((value, index) => {
    alert += value;
    alert += variable?.[index] ? variable?.[index] : '';
  });
  return alert;
}
