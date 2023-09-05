declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_URI_DEV: string;
    DB_URL: string;
    DB_OPTION: string;
    APPLICATION_PORT: string;
    KAVENEGAR_API_KEY: string;
    KAVENEGAR_SENDER: string;
    ACCESS_TOKEN_SECRET: string;
    ACCESS_TOKEN_EXPIRES_IN: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CALLBACK: string;
    SIM_PROVIDER_API_KEY: string;
    AXIOS_TIMEOUT: string;
    AXIOS_MAX_REDIRECTS: string;
    BASE_URL: string;
    SOCKET_PORT: string;
    FRONT_END_URL: string;
  }
}
