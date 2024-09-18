import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';
import { applicationControllers } from './application.controller';

const router = Router();

router.post(
  '/',
  auth(USER_ROLE.applicant),
  applicationControllers.insertApplicationintoDb,
);
router.get(
  '/',
  auth(USER_ROLE.applicant, USER_ROLE.admin),
  applicationControllers.getAllApplication,
);
router.get(
  '/my-applications',
  auth(USER_ROLE.applicant),
  applicationControllers.getMyApplications,
);

router.get(
  '/:id',
  auth(USER_ROLE.applicant, USER_ROLE.admin),
  applicationControllers.getsingleApplication,
);
router.patch(
  '/:id',
  auth(USER_ROLE.applicant, USER_ROLE.admin),
  applicationControllers.updateApplication,
);
router.delete(
  '/:id',
  auth(USER_ROLE.applicant, USER_ROLE.admin),
  applicationControllers.updateApplication,
);

export const applicationRoutes = router;
