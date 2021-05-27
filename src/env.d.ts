declare namespace NodeJS {
  export interface ProcessEnv {
    RPC_USER: string
    RPC_PASSWORD: string
    RPC_IP: string
    RPC_MIN_CONF: string
    DB_NAME: string
    DB_USER: string
    DB_PASSWORD: string
    DB_LOGGING: string
    DB_SYNC: string
    CORS_ORIGIN: string
  }
}
