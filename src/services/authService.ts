import HttpService from './httpService';
import axios from 'axios';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

const refreshToken = 'refreshToken';
const accessToken = 'accessToken';

const baseEndPoint = process.env.REACT_APP_SERVER_API + '/api';

const AuthService = {
  login(credentials: { username: string; password: string }) {
    return HttpService.post<Tokens>(baseEndPoint + '/user/login', credentials);
  },

  refreshToken(refreshToken: string) {
    return HttpService.post<Tokens>(baseEndPoint + '/auth/refreshToken', { refreshToken });
  },

  storeTokens(tokens: Tokens) {
    localStorage.setItem(accessToken, tokens.accessToken);
    localStorage.setItem(refreshToken, tokens.refreshToken);
  },

  getAccessToken() {
    return localStorage.getItem(accessToken);
  },

  getRefreshToken() {
    return localStorage.getItem(refreshToken);
  },

  removeTokens() {
    localStorage.removeItem(accessToken);
    localStorage.removeItem(refreshToken);
  }
};

axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer ' + AuthService.getAccessToken();

  return config;
});

export default AuthService;
