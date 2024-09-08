import { Router } from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { otpRoutes } from '../modules/otp/otp.routes';
import { userRoutes } from '../modules/user/user.route';

import { applicationRoutes } from '../modules/application/application.route';
import { notificationRoutes } from '../modules/notification/notificaiton.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/otp',
    route: otpRoutes,
  },

  {
    path: '/applications',
    route: applicationRoutes,
  },
  {
    path: '/notifications',
    route: notificationRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
