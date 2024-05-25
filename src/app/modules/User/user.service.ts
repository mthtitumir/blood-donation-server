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

    const andConditions: Prisma.UserProfileWhereInput[] = [];

    if (searchTerm) {
        const searchConditions = userSearchAbleFields.map(field => ({
            [field]: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        }));
        if (searchConditions.length > 0) {
            andConditions.push({ OR: searchConditions });
        }
    }

    if (Object.keys(filterData).length > 0) {
        const filterConditions = Object.keys(filterData).map(key => ({
            [key]: {
                equals: (filterData as any)[key]
            }
        }));
        if (filterConditions.length > 0) {
            andConditions.push({ AND: filterConditions });
        }
    }

    const whereConditions: Prisma.UserProfileWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};

    try {
        const result = await prisma.userProfile.findMany({
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
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    }
                },
                bloodType: true,
                location: true,
                availability: true,
                bio: true,
                age: true,
                lastDonationDate: true,
                createdAt: true,
                updatedAt: true,
            }
        });

        const total = await prisma.userProfile.count({
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
    } catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Unable to fetch data from the database.");
    }
};

const changeUserRole = async (userId: string, role: Role) => {
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
    const result = await prisma.userProfile.findUniqueOrThrow({
        where: {
            userId: user?.id,
        },
        select: {
            id: true,
            user: {
                select: {
                    id: true,
                    email: true,
                    role: true,
                }
            },
            bloodType: true,
            location: true,
            availability: true,
            bio: true,
            age: true,
            lastDonationDate: true,
            createdAt: true,
            updatedAt: true,
        }
    });
    return result;
};

const updateMyProfile = async (user: IAuthUser, payload: any) => {
    await prisma.userProfile.update({
        where: {
            userId: user?.id
        },
        data: payload
    })

    return {...payload};
}


export const userService = {
    registerUser,
    getAllFromDB,
    changeUserRole,
    getMyProfile,
    updateMyProfile
}