import { AxiosError } from 'axios';
import Dictionary from 'dictionary/dictionary';

const CommonService = {
  getErrorMessage(err: AxiosError): string {
    return (Dictionary.serverErrors as { [key: string]: string })[err.response?.data?.msg] || Dictionary.generalError;
  }
};

export default CommonService;
