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

const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(char => '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const AuthService = {
  login(credentials: Credentials) {
    return HttpService.post<Tokens>('/user/login', credentials);
  },

  refreshToken(refreshToken: string) {
    return HttpService.post<Tokens>('/auth/refreshToken', { refreshToken }, { skipAuthRefresh: true });
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
    const token = this.getAccessToken();
    return token ? (parseJwt(token) as AccessToken) : null;
  }
};

export default AuthService;
