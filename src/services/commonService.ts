import { AxiosError } from 'axios';
import moment from 'moment';
import Dictionary from 'dictionary/dictionary';

const CommonService = {
  getErrorMessage(err: AxiosError): string {
    return (Dictionary.serverErrors as { [key: string]: string })[err.response?.data?.msg] || Dictionary.generalError;
  },
  getDurationFromNow(start: moment.Moment) {
    const now = moment.utc();

    return moment.duration(now.diff(start));
  },

  convertDateToAge(date: string) {
    const utcDate = moment.utc(date, 'DD/MM/YYYY');
    const diff = this.getDurationFromNow(utcDate);

    return diff.isValid() && !utcDate.isAfter(moment()) ? diff.years() + '.' + diff.months() : '';
  }
};

export default CommonService;
