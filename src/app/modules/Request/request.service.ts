import prisma from "../../../shared/prisma";

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

const GetMyRequests = async (userId: string) => {
  const user = await prisma.request.findMany({
    where: {
      donorId: userId
    },
    include: {
      requester: {
        select: {
          id: true,
          name: true,
          email: true,
          location: true,
          bloodType: true,
          availability: true,
        }
      }
    },
  });
  return user;
};

const UpdateRequest = async (donorId: string, requestId: string, payload: any) => {
  // console.log({donorId, requestId, payload});

  const result = await prisma.request.update({
    where: {
      id: requestId,
      donorId,
    },
    data: {
      ...payload
    }
  });
  return result;
}

export const UserService = {
  AddRequest,
  GetMyRequests,
  UpdateRequest
};
