/// <reference types="react-scripts" />

interface String {
  format: (...values: string[]) => string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
    REACT_APP_SERVER_API: string;
  }
}
