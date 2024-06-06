"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const AddRequest = (requesterId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const requestData = Object.assign({ requesterId }, payload);
    const result = yield prisma_1.default.request.create({
        data: requestData
    });
    return {
        bloodType: result === null || result === void 0 ? void 0 : result.bloodType,
        dateOfDonation: result.dateOfDonation,
    };
});
const GetAllRequests = () => __awaiter(void 0, void 0, void 0, function* () {
    //need more work on filter and search
    const result = yield prisma_1.default.request.findMany({
        include: {
            donor: {
                select: {
                    userProfile: true
                }
            },
            requester: {
                select: {
                    userProfile: true
                }
            },
        }
    });
    return result;
});
const UpdateRequest = (id, requestId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.requestStatus) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
    }
    const result = yield prisma_1.default.request.update({
        where: {
            id: requestId,
            requesterId: id,
        },
        data: Object.assign({}, payload)
    });
    return result;
});
const GetMyRequests = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.request.findMany({
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
});
const GetRequestsToMe = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.request.findMany({
        where: {
            donorId: id
        },
        include: {
            donor: {
                select: {
                    userProfile: true
                }
            },
            requester: {
                select: {
                    userProfile: true
                }
            },
        }
    });
    return user;
});
const UpdateStatus = (requestId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.requestStatus) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Only status should be updated!");
    }
    const result = yield prisma_1.default.request.update({
        where: {
            id: requestId
        },
        data: Object.assign({}, payload)
    });
    return result;
});
exports.UserService = {
    AddRequest,
    GetAllRequests,
    UpdateRequest,
    GetMyRequests,
    GetRequestsToMe,
    UpdateStatus
};
