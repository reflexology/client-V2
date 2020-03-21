import { AxiosError } from 'axios';
import moment from 'moment';
import Dictionary from 'dictionary/dictionary';
import { DATE_FORMAT } from 'utils/constants';

const CommonService = {
  getErrorMessage(err: AxiosError): string {
    return (Dictionary.serverErrors as { [key: string]: string })[err.response?.data?.msg] || Dictionary.generalError;
  },
  getDurationFromNow(start: moment.Moment) {
    const now = moment.utc();

    return moment.duration(now.diff(start));
  },

  convertDateToAge(date: string) {
    const utcDate = moment.utc(date, DATE_FORMAT);
    const diff = this.getDurationFromNow(utcDate);

    return diff.isValid() && !utcDate.isAfter(moment()) ? diff.years() + '.' + diff.months() : '';
  }
};

String.prototype.format = function(...values) {
  let str = this.toString();

  if (values?.length > 0)
    for (const key in values) str = str.replace(new RegExp('\\{' + key + '\\}', 'gi'), values[key]);

  return str;
};
export default CommonService;
