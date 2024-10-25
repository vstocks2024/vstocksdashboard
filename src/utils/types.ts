import { z } from "zod";
export const addNewAdminSchema = z.object({
  adminname: z.string(),
  fullname: z.string(),
  email: z.string(),
  phone: z.string(),
  password: z.string(),
  imageurl: z.string().optional(),
});


export const authAdminSchema=z.object({
  adminId: z.string(),
  adminName: z.string(),
  fullName: z.string(),
  adminEmail: z.string(),
  adminPhone: z.string(),
  imageUrl: z.string(),
})