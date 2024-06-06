"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidation = void 0;
const zod_1 = require("zod");
const AddRequest = zod_1.z.object({
    body: zod_1.z.object({
        donorId: zod_1.z.string().optional(),
        bloodType: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string({
            required_error: "Phone number is required!",
        }),
        dateOfDonation: zod_1.z.string({
            required_error: "Date of Donation is required!",
        }),
        hospitalName: zod_1.z.string({
            required_error: "Hospital Name is required!",
        }),
        hospitalAddress: zod_1.z.string({
            required_error: "Hospital Address is required!",
        }),
        reason: zod_1.z.string({
            required_error: "Reason is required!",
        }),
    }),
});
const UpdateRequest = zod_1.z.object({
    body: zod_1.z.object({
        donorId: zod_1.z.string().optional(),
        bloodType: zod_1.z.string().optional(),
        phoneNumber: zod_1.z.string().optional(),
        dateOfDonation: zod_1.z.string().optional(),
        hospitalName: zod_1.z.string().optional(),
        hospitalAddress: zod_1.z.string().optional(),
        reason: zod_1.z.string().optional(),
    }),
});
exports.RequestValidation = {
    AddRequest,
    UpdateRequest,
};
