import { z } from "zod";

const AddRequest = z.object({
  body: z.object({
    donorId: z.string().optional(),
    bloodType: z.string().optional(),
    phoneNumber: z.string({
      required_error: "Phone number is required!",
    }),
    dateOfDonation: z.string({
      required_error: "Date of Donation is required!",
    }),
    hospitalName: z.string({
      required_error: "Hospital Name is required!",
    }),
    hospitalAddress: z.string({
      required_error: "Hospital Address is required!",
    }),
    reason: z.string({
      required_error: "Reason is required!",
    }),
  }),
});

const UpdateRequest = z.object({
  body: z.object({
    donorId: z.string().optional(),
    bloodType: z.string().optional(),
    phoneNumber: z.string().optional(),
    dateOfDonation: z.string().optional(),
    hospitalName: z.string().optional(),
    hospitalAddress: z.string().optional(),
    reason: z.string().optional(),
    requestStatus: z.string().optional(),
  }),
});

export const RequestValidation = {
  AddRequest,
  UpdateRequest,
};
