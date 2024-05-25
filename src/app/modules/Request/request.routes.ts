import express, { NextFunction, Request, Response } from "express";
import { RequestController } from "./request.controller";
import auth from "../../middlewares/auth";
import { RequestValidation } from "./request.validation";
import validateRequest from "../../middlewares/validateRequest";
import { Role } from "@prisma/client";

const router = express.Router();

router.post(
  "/",
  auth(
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.MODERATOR,
    Role.USER
  ),
  validateRequest(RequestValidation.AddRequest),
  RequestController.AddRequest
);

router.patch(
  "/:requestId",
  auth(
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.MODERATOR,
    Role.USER
  ),
  validateRequest(RequestValidation.UpdateRequest),
  RequestController.UpdateRequest
);

router.get(
  "/my-requests",
  auth(
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.MODERATOR,
    Role.USER
  ),
  RequestController.GetMyRequests
);

router.get(
  "/requests-to-me",
  auth(
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.MODERATOR,
    Role.USER
  ),
  RequestController.GetRequestsToMe
);

router.patch(
  "/:requestId/update-status",
  auth(
    Role.SUPER_ADMIN,
    Role.ADMIN,
    Role.MODERATOR
  ),
  RequestController.UpdateStatus
);

export const RequestRoutes = router;
