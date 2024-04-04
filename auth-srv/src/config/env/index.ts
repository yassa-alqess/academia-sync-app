export const configuration = () => ({
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database: {
    url: process.env.DATABASE_URL,
    name: process.env.DB_NAME,
    schema: process.env.SCHEMA,
  },
  log_level: process.env.LOG_LEVEL,
  at_secret: process.env.AT_SECRET,
  rt_secret: process.env.RT_SECRET,
  mail_port: process.env.MAIL_PORT,
  mail_host: process.env.MAIL_HOST,
  mail_user: process.env.MAIL_USER,
  mail_password: process.env.MAIL_PASSWORD,
});
