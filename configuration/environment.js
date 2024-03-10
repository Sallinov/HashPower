const path = require('path');
module.exports = {
  paths: {
    source: path.resolve(__dirname, '../assets/src/'),
    outputs: {
      development: path.resolve(__dirname, '/assets/build/dev'),
      production: path.resolve(__dirname, '/assets/build/prod')
    },
  },
  server: {
    host: 'localhost',
    port: 8001,
  },
  limits: {
    /* Image files size in bytes. Below this value the image file will be served as DataURL (inline base64). */
    imgs: 8192,

    /* Font files size in bytes. Below this value the font file will be served as DataURL (inline base64). */
    fonts: 8192,
  },
};
