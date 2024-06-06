"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const bcrypt = __importStar(require("bcrypt"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const user_constant_1 = require("./user.constant");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, bloodType, location, age, bio, lastDonationDate, } = payload;
    const hashedPassword = yield bcrypt.hash(password, 12);
    const userData = {
        email,
        password: hashedPassword,
    };
    // console.log(payload);
    const profileData = {
        name,
        bio,
        age,
        bloodType,
        location,
        lastDonationDate,
    };
    const result = yield prisma_1.default.$transaction((transactionClient) => __awaiter(void 0, void 0, void 0, function* () {
        const createdUserData = yield transactionClient.user.create({
            data: userData,
        });
        const createdUserProfileData = yield transactionClient.userProfile.create({
            data: Object.assign(Object.assign({}, profileData), { userId: createdUserData === null || createdUserData === void 0 ? void 0 : createdUserData.id }),
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
    }));
    return result;
});
const getAllUserFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.userProfile.findMany({
            select: {
                id: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        isBanned: true
                    }
                },
                name: true,
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
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Unable to fetch data from the database.");
    }
});
const getAllDonorFromDB = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const { searchTerm } = query, filterData = __rest(query, ["searchTerm"]);
    const andConditions = [];
    andConditions.push({
        user: {
            role: {
                notIn: ['ADMIN', 'SUPER_ADMIN', 'MODERATOR']
            },
            isBanned: false,
        }
    });
    if (searchTerm) {
        const searchConditions = user_constant_1.userSearchAbleFields.map(field => ({
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
                equals: filterData[key]
            }
        }));
        if (filterConditions.length > 0) {
            andConditions.push({ AND: filterConditions });
        }
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    try {
        const result = yield prisma_1.default.userProfile.findMany({
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
                name: true,
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
        const total = yield prisma_1.default.userProfile.count({
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
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw new Error("Unable to fetch data from the database.");
    }
});
const changeRole = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUserRole = yield prisma_1.default.user.update({
        where: {
            id
        },
        data: payload,
        select: {
            id: true,
            email: true,
            role: true,
        }
    });
    return updateUserRole;
});
const changeStatus = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updateUserRole = yield prisma_1.default.user.update({
        where: {
            id
        },
        data: payload,
        select: {
            id: true,
            email: true,
            role: true,
            isBanned: true,
        }
    });
    return updateUserRole;
});
const getSingleProfile = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userProfile.findUniqueOrThrow({
        where: {
            id,
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
            userId: true,
            name: true,
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
});
const getMyProfile = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.userProfile.findUniqueOrThrow({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.id,
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
            name: true,
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
});
const updateMyProfile = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.userProfile.update({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.id
        },
        data: payload
    });
    return Object.assign({}, payload);
});
exports.userService = {
    registerUser,
    getAllUserFromDB,
    getAllDonorFromDB,
    changeRole,
    changeStatus,
    getSingleProfile,
    getMyProfile,
    updateMyProfile
};
