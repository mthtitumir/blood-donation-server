import { Role } from "@prisma/client";
import { z } from "zod";

const registerUser = z.object({
    body: z.object({
        name: z.string({
            required_error: "Name is required!"
        }),
        email: z.string({
            required_error: "Email is required!"
        }),
        password: z.string({
            required_error: "Password is required!"
        }),
        bloodType: z.string({
            required_error: "Blood type is required!"
        }),
        location: z.string({
            required_error: "Location is required!"
        }),
        availability: z.boolean().default(false).optional(),
        bio: z.string({
            required_error: "Bio is required!"
        }),
        age: z.number({
            required_error: "Age is required!"
        }),
        lastDonationDate: z.string({
            required_error: "Last donation date is required!"
        }),
    })
})

const UpdateMyProfile = z.object({
    body: z.object({
        bio: z.string().optional(),
        age: z.number().optional(),
        lastDonationDate: z.string().optional(),
    })
})

export const userValidation = {
    registerUser
}