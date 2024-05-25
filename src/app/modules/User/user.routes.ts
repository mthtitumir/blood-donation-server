import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
    "/",
    userController.registerUser
);

router.get(
    '/',
    auth(Role.SUPER_ADMIN, Role.ADMIN),
    userController.getAllFromDB
);

router.get(
    '/me',
    auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER),
    userController.getMyProfile
)

router.patch(
    '/:id/status',
    auth(Role.SUPER_ADMIN, Role.ADMIN),
    validateRequest(userValidation.updateStatus),
    userController.changeProfileStatus
);

router.patch(
    "/update-my-profile",
    auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER),
    userController.updateMyProfie

);


export const userRoutes = router;