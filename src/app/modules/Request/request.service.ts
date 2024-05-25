import httpStatus, { UNAUTHORIZED } from "http-status";
import prisma from "../../../shared/prisma";
import ApiError from "../../errors/ApiError";

const AddRequest = async (requesterId: string, payload: any) => {
  const requestData = {
    requesterId,
    ...payload
  };

  const result = await prisma.request.create({
    data: requestData
  })
  return {
    bloodType: result?.bloodType,
    dateOfDonation: result.dateOfDonation,
  };
};

const UpdateRequest = async (id: string, requestId: string, payload: any) => {
  if (payload.requestStatus) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
  }
  const result = await prisma.request.update({
    where: {
      id: requestId,
      requesterId: id,
    },
    data: {
      ...payload
    }
  });
  return result;
}

const GetMyRequests = async (id: string) => {
  const user = await prisma.request.findMany({
    where: {
      requesterId: id
    },
    include: {
      donor: {
        include: {
          userProfile: true
        }
      }
    }
  });
  return user;
};



export const UserService = {
  AddRequest,
  GetMyRequests,
  UpdateRequest
};
