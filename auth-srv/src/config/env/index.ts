export const configuration = () => ({
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database: {
    url: process.env.DATABASE_URL,
    name: process.env.DB_NAME,
    schema: process.env.SCHEMA,
  },
  log_level: process.env.LOG_LEVEL,
});
