"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = require("zod");
const registerUser = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "Name is required!"
        }),
        email: zod_1.z.string({
            required_error: "Email is required!"
        }),
        password: zod_1.z.string({
            required_error: "Password is required!"
        }),
        bloodType: zod_1.z.string({
            required_error: "Blood type is required!"
        }),
        location: zod_1.z.string({
            required_error: "Location is required!"
        }),
        availability: zod_1.z.boolean().default(false).optional(),
        bio: zod_1.z.string({
            required_error: "Bio is required!"
        }),
        age: zod_1.z.number({
            required_error: "Age is required!"
        }),
        lastDonationDate: zod_1.z.string({
            required_error: "Last donation date is required!"
        }),
    })
});
const updateMyProfile = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z.string().optional(),
        password: zod_1.z.string().optional(),
        bloodType: zod_1.z.string().optional(),
        location: zod_1.z.string().optional(),
        availability: zod_1.z.boolean().optional(),
        bio: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        lastDonationDate: zod_1.z.string().optional(),
    })
});
const changeRole = zod_1.z.object({
    body: zod_1.z.object({
        role: zod_1.z.enum(['SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'USER'])
    })
});
const changeStatus = zod_1.z.object({
    body: zod_1.z.object({
        isBanned: zod_1.z.boolean()
    })
});
exports.userValidation = {
    registerUser,
    updateMyProfile,
    changeRole,
    changeStatus
};
