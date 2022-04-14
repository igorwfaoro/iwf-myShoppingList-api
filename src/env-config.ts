export const ENV_CONFIG: {
    HOST: string;
    PORT: number;

    DATABASE_HOST: string;
    DATABASE_USER: string;
    DATABASE_PASSWORD: string;
    DATABASE_SCHEMA: string;

    NODE_ENV: 'development' | 'production' | 'test';

} = process.env as any;

// export const DEFAULT_DATETIME_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';