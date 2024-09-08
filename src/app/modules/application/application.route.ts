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
  auth(USER_ROLE.applicant, USER_ROLE.applicant),
  applicationControllers.getAllApplication,
);
router.get(
  '/:id',
  auth(USER_ROLE.applicant, USER_ROLE.applicant),
  applicationControllers.getsingleApplication,
);
router.get(
  '/:id',
  auth(USER_ROLE.applicant, USER_ROLE.applicant),
  applicationControllers.getsingleApplication,
);
router.patch(
  '/:id',
  auth(USER_ROLE.applicant, USER_ROLE.applicant),
  applicationControllers.updateApplication,
);
router.delete(
  '/:id',
  auth(USER_ROLE.applicant, USER_ROLE.applicant),
  applicationControllers.updateApplication,
);

export const applicationRoutes = router;
