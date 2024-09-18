import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';
import { userControllers } from './user.controller';

const router = Router();
router.post(
  '/',
  // upload.single('file'),
  // parseData(),
  userControllers.insertUserIntodb,
);
router.get(
  '/profile',
  auth(USER_ROLE.applicant, USER_ROLE.admin),
  userControllers.getme,
);
router.patch(
  '/update-user/:id',
  auth(USER_ROLE.applicant, USER_ROLE.admin),
  userControllers.updateUser,
);
router.patch(
  '/',
  auth(USER_ROLE.applicant, USER_ROLE.admin),
  userControllers.updateUser,
);
router.get(
  '/:id',
  auth(USER_ROLE.applicant, USER_ROLE.admin),
  userControllers.getsingleUser,
);
router.delete(
  '/',
  auth(USER_ROLE.vendor, USER_ROLE.user),
  userControllers.deleteAccount,
);
export const userRoutes = router;
