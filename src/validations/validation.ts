import z from "zod";
import { OWNERSHIP_TYPES } from "@/constants/constants";

export const formSchema = z.object({
  Title: z.string().optional(),
  Company_Name: z.string().optional(),
  Type_Of_Ownership: z.enum(OWNERSHIP_TYPES as [string, ...string[]], {
    message: "نوع مالکیت را انتخاب کنید",
  }).optional(),
  Private_Number: z.string().optional(),
  Phone_Number: z.string().optional(),
  City: z.string().optional(),
  Address: z.string().optional(),
  Activity_Field: z.array(z.string()).optional(),
  Description: z.string().optional(),
});

export type RepresentationFormData = z.infer<typeof formSchema>;

export const visitorFormSchema = z.object({
  Title: z.string().optional(),
  Job_Title: z.string().optional(),
  Company_Name: z.string().optional(),
  Private_Number: z.string().optional(),
  City: z.string().optional(),
  Email: z.string().optional().refine((val) => !val || z.string().email().safeParse(val).success, {
    message: "ایمیل معتبر نیست",
  }),
  Purchase_Volume: z.string().optional(),
  Fav_Products: z.array(z.string()).optional(),
  Description: z.string().optional(),
});

export type VisitorFormData = z.infer<typeof visitorFormSchema>;
