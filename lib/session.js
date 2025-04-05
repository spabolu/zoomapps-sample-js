import { zoomApp } from '../config';

export const sessionOptions = {
  cookieName: 'zoom_app_session',
  password: zoomApp.sessionSecret,
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60, // 1 day
    sameSite: 'lax',
  },
};
