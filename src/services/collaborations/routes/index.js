import { Router } from 'express';
import {
  addCollaboration,
  deleteCollaboration,
} from '../controller/collaborations-controller.js';
import validate from '../../../middlewares/validate.js';
import authenticateToken from '../../../middlewares/auth.js';
import {
  collaborationPayloadSchema,
  collaborationDeletePayloadSchema,
} from '../validator/scheme.js';

const router = Router();

router.post(
  '/',
  authenticateToken,
  validate(collaborationPayloadSchema),
  addCollaboration,
);
router.delete(
  '/',
  authenticateToken,
  validate(collaborationDeletePayloadSchema),
  deleteCollaboration,
);

export default router;
