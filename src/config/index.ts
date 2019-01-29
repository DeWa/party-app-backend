const {
  API_VERSION,
  DB_URL,
  NODE_ENV,
  PORT,
  PASSWORD,
  CLIENT_API_KEY,
  PHOTOBOOTH_API_KEY,
} = process.env;

const config = {
  API_VERSION,
  CLIENT_API_KEY,
  DB_URL,
  NODE_ENV,
  PASSWORD,
  PHOTOBOOTH_API_KEY,
  PORT,
};

export default config;
