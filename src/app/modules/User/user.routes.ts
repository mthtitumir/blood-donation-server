import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
    "/",
    validateRequest(userValidation.registerUser),
    userController.registerUser
);

router.get(
    '/',
    auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR),
    userController.getAllUserFromDB
);

router.get(
    '/all-donors',
    userController.getAllDonorFromDB
);

router.get(
    '/me',
    auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER),
    userController.getMyProfile
)

router.get(
    '/:id',
    // auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER),
    userController.getSingleProfile
)

router.patch(
    '/:id/role',
    auth(Role.SUPER_ADMIN, Role.ADMIN),
    validateRequest(userValidation.changeRole),
    userController.changeRole
);

router.patch(
    '/:id/status',
    auth(Role.SUPER_ADMIN, Role.ADMIN),
    validateRequest(userValidation.changeStatus),
    userController.changeStatus
);

router.patch(
    "/update-my-profile",
    auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER),
    validateRequest(userValidation.updateMyProfile),
    userController.updateMyProfile
);


export const userRoutes = router;