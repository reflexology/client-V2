import HttpService from './httpService';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface AccessToken {
  _id: string;
  username: string;
}

export interface Credentials {
  username: string;
  password: string;
}

const refreshToken = 'refreshToken';
const accessToken = 'accessToken';

const baseEndPoint = process.env.REACT_APP_SERVER_API + '/api';

const AuthService = {
  login(credentials: Credentials) {
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
  },

  isAuthorized() {
    return !!this.getAccessToken();
  },

  getAccessTokenData() {
    try {
      return JSON.parse(atob(this.getAccessToken()!?.split('.')[1])) as AccessToken;
    } catch (e) {
      return null;
    }
  }
};

export default AuthService;
