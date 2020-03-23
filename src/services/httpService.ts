import axios, { AxiosRequestConfig } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { routes } from 'components/router/routes';
import history from 'utils/history';

import AuthService from './authService';

const getAuthorizationHeader = (jwt: boolean) =>
  jwt ? { authorization: 'Bearer ' + AuthService.getAccessToken() } : null;

const HttpService = {
  async get<T = any>(url: string, config?: AxiosRequestConfig, jwt = false) {
    const headers = getHeaders(config, getAuthorizationHeader(jwt));
    const res = await axios.get<T>(url, { ...config, headers });
    return res.data;
  },

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig, jwt = false) {
    const headers = getHeaders(config, {
      'Content-Type': 'application/json;charset=utf-8',
      ...getAuthorizationHeader(jwt)
    });
    const res = await axios.post<T>(url, data, { ...config, headers });

    return res.data;
  },

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig, jwt = false) {
    const headers = getHeaders(config, {
      'Content-Type': 'application/json;charset=utf-8',
      ...getAuthorizationHeader(jwt)
    });

    const res = await axios.put<T>(url, data, { ...config, headers });
    return res.data;
  },

  async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig, jwt = false) {
    const headers = getHeaders(config, {
      'Content-Type': 'application/json;charset=utf-8',
      ...getAuthorizationHeader(jwt)
    });

    const res = await axios.patch<T>(url, data, { ...config, headers });
    return res.data;
  },

  async delete<T = any>(url: string, config?: AxiosRequestConfig, jwt = false) {
    const headers = getHeaders(config, getAuthorizationHeader(jwt));

    const res = await axios.delete<T>(url, { ...config, headers });
    return res.data;
  }
};

const getHeaders = (config: AxiosRequestConfig | undefined, headers: any) => {
  const configHeaders = config ? { ...config.headers } : null;

  return { ...configHeaders, ...headers };
};

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
