import { message } from 'antd';
import { AxiosError } from 'axios';
import moment from 'moment';

import Dictionary from 'dictionary/dictionary';
import { DATE_FORMAT } from 'utils/constants';

const CommonService = {
  getErrorMessage(err: AxiosError): string {
    return (
      (Dictionary.serverErrors as { [key: string]: string })[(err.response?.data as { msg: string })?.msg] ||
      Dictionary.generalError
    );
  },

  showErrorMessage(err: AxiosError, errorMessage?: string) {
    if (err?.response?.status === 401) return;
    message.error(errorMessage || Dictionary.generalError);
  },

  getDurationFromNow(start: moment.Moment) {
    const now = moment.utc();

    return moment.duration(now.diff(start));
  },

  convertDateToAge(date: string) {
    const utcDate = moment.utc(date, DATE_FORMAT);
    const diff = this.getDurationFromNow(utcDate);

    return diff.isValid() && !utcDate.isAfter(moment()) ? diff.years() + '.' + diff.months() : '';
  },

  isEmpty: (obj: any) => [Object, Array].includes((obj || {}).constructor) && !Object.entries(obj || {}).length,

  isNotEmpty: (obj: any) => !CommonService.isEmpty(obj),

  replaceItemAtIndex: <T>(arr: T[], index: number, newValue: T) => [
    ...arr.slice(0, index),
    newValue,
    ...arr.slice(index + 1)
  ],

  getMomentDateFromString: (date: any): undefined | moment.Moment =>
    !date || moment.isMoment(date) ? date : moment(date)
};

String.prototype.format = function (...values) {
  let str = this.toString();

  if (values?.length > 0)
    for (const key in values) str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), values[key]);

  return str;
};
export default CommonService;
