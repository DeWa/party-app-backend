const { API_VERSION, DB_URL, NODE_ENV, PORT, PASSWORD, CLIENT_API_KEY } = process.env;

const config = {
  API_VERSION,
  CLIENT_API_KEY,
  DB_URL,
  NODE_ENV,
  PASSWORD,
  PORT,
};

export default config;
