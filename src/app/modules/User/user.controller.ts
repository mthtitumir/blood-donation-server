import { Request, RequestHandler, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import { IAuthUser } from "../../interfaces/common";
import { userService } from "./user.service";
import { TUserFilterQuery } from "./user.interface";
import { stringToBoolean } from "../../../helpers/stringToBoolean";

const registerUser = catchAsync(async (req: Request, res: Response) => {

    const result = await userService.registerUser(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User registered successfully!",
        data: result
    })
});


const getAllUserFromDB = catchAsync(async (req: Request, res: Response) => {
    const result = await userService.getAllUserFromDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users data fetched!",
        data: result,
    })
});

const getAllDonorFromDB = catchAsync(async (req: Request, res: Response) => {
    // console.log(req.query)
    const filters = pick(req.query, userFilterableFields);
    let query: TUserFilterQuery = {...filters};
    if (filters && filters?.availability) {
      const availability = stringToBoolean(filters?.availability as string);
      query = { ...filters, availability }
    }
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])

    const result = await userService.getAllDonorFromDB(query, options)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Donors data fetched!",
        meta: result.meta,
        data: result.data
    })
});

const changeRole = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await userService.changeRole(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users role changed!",
        data: result
    })
});

const changeStatus = catchAsync(async (req: Request, res: Response) => {

    const { id } = req.params;
    const result = await userService.changeStatus(id, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Users profile status changed!",
        data: result
    })
});

const getSingleProfile = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const id = req?.params?.id;
    const result = await userService.getSingleProfile(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile data fetched!",
        data: result
    })
});

const getMyProfile = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    
    const result = await userService.getMyProfile(user as IAuthUser);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile data fetched!",
        data: result
    })
});

const updateMyProfile = catchAsync(async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user;
    const result = await userService.updateMyProfile(user as IAuthUser, req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "My profile updated!",
        data: result
    })
});

export const userController = {
    registerUser,
    getAllUserFromDB,
    getAllDonorFromDB,
    changeRole,
    changeStatus,
    getSingleProfile,
    getMyProfile,
    updateMyProfile
}