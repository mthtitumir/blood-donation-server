import { Prisma, Role } from "@prisma/client";
import * as bcrypt from 'bcrypt'
import prisma from "../../../shared/prisma";
import { Request } from "express";
import { IPaginationOptions } from "../../interfaces/pagination";
import { paginationHelper } from "../../../helpers/paginationHelper";
import { userSearchAbleFields } from "./user.constant";
import { IAuthUser } from "../../interfaces/common";
import { TUserFilterQuery } from "./user.interface";

const registerUser = async (payload: any) => {
    const {
        name,
        email,
        password,
        bloodType,
        location,
        age,
        bio,
        lastDonationDate,
    } = payload;
    const hashedPassword: string = await bcrypt.hash(password, 12);
    
    const userData = {
        email,
        password: hashedPassword,
    };

    const profileData = {
        name,
        bio,
        age,
        bloodType,
        location,
        lastDonationDate,
    };

    const result = await prisma.$transaction(async (transactionClient) => {
        const createdUserData = await transactionClient.user.create({
            data: userData,
        });
        const createdUserProfileData = await transactionClient.userProfile.create({
            data: { ...profileData, userId: createdUserData.id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    }
                }
            }
        });
        return createdUserProfileData;
    });
    return result;
};

const getAllFromDB = async (query: TUserFilterQuery, options: IPaginationOptions) => {
    const { page, limit, skip } = paginationHelper.calculatePagination(options);
    const { searchTerm, ...filterData } = query;

    const andConditions: Prisma.UserWhereInput[] = [];

    //console.log(filterData);
    if (query.searchTerm) {
        andConditions.push({
            OR: userSearchAbleFields.map(field => ({
                [field]: {
                    contains: query.searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };

    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => ({
                [key]: {
                    equals: (filterData as any)[key]
                }
            }))
        })
    };

    const whereConditions: Prisma.UserWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.user.findMany({
        where: whereConditions,
        skip,
        take: limit,
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            bloodType: true,
            location: true,
            availability: true,
            userProfile: {
                select: {
                    bio: true,
                    age: true,
                    lastDonationDate: true,
                }
            },
            createdAt: true,
            updatedAt: true,
        }
    });

    const total = await prisma.user.count({
        where: whereConditions
    });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
};

const changeUserRole = async (userId: string, role: Role ) => {
    const updateUserStatus = await prisma.user.update({
        where: {
            id: userId
        },
        data: {
            role
        }
    });

    return updateUserStatus;
};

const getMyProfile = async (user: IAuthUser) => {

    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            bloodType: true,
            location: true,
            availability: true,
            userProfile: {
                select: {
                    bio: true,
                    age: true,
                    lastDonationDate: true,
                }
            },
            createdAt: true,
            updatedAt: true,
        }
    });
    return userInfo;
};

const updateMyProfile = async (user: IAuthUser, req: Request) => {
    const userInfo = await prisma.user.findUniqueOrThrow({
        where: {
            email: user?.email,
        }
    });

    let profileInfo;

    if (userInfo.role === Role.SUPER_ADMIN) {
        profileInfo = await prisma.user.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }
    else if (userInfo.role === Role.ADMIN) {
        profileInfo = await prisma.user.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }
    else if (userInfo.role === Role.DOCTOR) {
        profileInfo = await prisma.doctor.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }
    else if (userInfo.role === Role.PATIENT) {
        profileInfo = await prisma.patient.update({
            where: {
                email: userInfo.email
            },
            data: req.body
        })
    }

    return { ...profileInfo };
}


export const userService = {
    registerUser,
    getAllFromDB,
    changeUserRole,
    getMyProfile,
    updateMyProfile
}