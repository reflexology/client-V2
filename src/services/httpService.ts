import axios, { AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { routes } from 'components/router/routes';
import history from 'utils/history';

import AuthService from './authService';

const HttpService = {
  async get<T = any>(url: string, config?: AxiosRequestConfig) {
    const res = await axios.get<T>(url, { ...config });
    return res.data;
  },

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    const res = await axios.post<T>(url, data, { ...config });

    return res.data;
  },

  async postFormData<T = any>(url: string, formData?: FormData, config?: AxiosRequestConfig) {
    return this.post<T>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      ...config
    });
  },

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    const res = await axios.put<T>(url, data, { ...config });
    return res.data;
  },

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig) {
    const res = await axios.patch<T>(url, data, { ...config });
    return res.data;
  },

  async delete<T = any>(url: string, config?: AxiosRequestConfig) {
    const res = await axios.delete<T>(url, { ...config });
    return res.data;
  }
};

axios.interceptors.request.use(config => {
  if (config.method === 'POST' || config.method === 'PATCH' || config.method === 'PUT')
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

  const accessToken = AuthService.getAccessToken();
  if (accessToken) config.headers.Authorization = 'Bearer ' + accessToken;

  return config;
});

// Function that will be called to refresh authorization
const refreshAuthLogic = (failedRequest: any) =>
  AuthService.refreshToken(AuthService.getRefreshToken()!)
    .then(data => {
      AuthService.storeTokens(data);
      failedRequest.response.config.headers['authorization'] = 'Bearer ' + data.accessToken;
      return Promise.resolve();
    })
    .catch(() => {
      AuthService.removeTokens();
      history.push(routes.login);
    });

createAuthRefreshInterceptor(axios, refreshAuthLogic);

export default HttpService;
