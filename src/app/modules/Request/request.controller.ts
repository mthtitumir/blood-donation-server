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



export const RequestController = {
  AddRequest,
  GetMyRequests,
  UpdateRequest
};
