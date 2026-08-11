import dotenv from 'dotenv'

dotenv.config()

export default {
  env: process.env.NODE_ENV,
  api: {
    port: process.env.PORT || '3333',
    key: process.env.API_KEY || 'e693fe84b1f0fa7fe0c8abfd9f29cd9b3f7c443b'
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
  },
  security: {
    key: process.env.SECRET_KEY || 'a3ffc7c125ed1ee9160ef9e6207012b2',
    iv: process.env.SECRET_IV || '3de0649724ad683f4162476b4dd8e4c5',
    method: process.env.ENCRYPTION_METHOD || 'aes-256-cbc',
  },
  cors: {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'x-api-key'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: '*',
    preflightContinue: false,
  }
}