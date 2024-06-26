import { Request, Response } from "express";
import { UserService } from "./request.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";

const AddRequest = catchAsync(async (req: Request & {user?: any}, res: Response) => { 
  const result = await UserService.AddRequest(req.user.id, req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Request successfully created!",
    data: result,
    });
});

const GetAllRequests = catchAsync(async (req: Request & {user?: any}, res: Response) => { 
  const result = await UserService.GetAllRequests();
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All requests successfully retrieved!",
    data: result,
    });
});

const UpdateRequest = catchAsync(async (req: Request & {user?: any}, res: Response) => { 
  const result = await UserService.UpdateRequest(req?.user?.id, req.params.requestId, req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Donation request status successfully updated",
    data: result,
    });
});

const GetMyRequests = catchAsync(async (req: Request & {user?: any}, res: Response) => { 
  const result = await UserService.GetMyRequests(req?.user?.id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Your requests retrieved successfully!",
    data: result,
    });
});

const GetRequestsToMe = catchAsync(async (req: Request & {user?: any}, res: Response) => { 
  const result = await UserService.GetRequestsToMe(req?.user?.id);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All requests to you successfully!",
    data: result,
    });
});

const UpdateStatus = catchAsync(async (req: Request & {user?: any}, res: Response) => { 
  const result = await UserService.UpdateStatus( req.params.requestId, req.body);
  
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Request status successfully updated",
    data: result,
    });
});

export const RequestController = {
  AddRequest,
  GetAllRequests,
  UpdateRequest,
  GetMyRequests,
  GetRequestsToMe,
  UpdateStatus
};
