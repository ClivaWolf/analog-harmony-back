export const jwtConstants = {
    secret: process.env.JWT_SECRET||'12345',
    signOptions: { expiresIn: '20h' },

    refreshSecret: process.env.JWT_REFRESH_SECRET||'123456',
    refreshSignOptions: { expiresIn: '21d' },
  };