import z from "zod";
import { OWNERSHIP_TYPES } from "@/constants/constants";

export const formSchema = z.object({
  Title: z.string().min(2, "نام و نام خانوادگی الزامی است"),
  Company_Name: z.string().min(2, "نام فروشگاه/شرکت الزامی است"),
  Type_Of_Ownership: z.enum(OWNERSHIP_TYPES as [string, ...string[]], {
    message: "نوع مالکیت را انتخاب کنید",
  }),
  Private_Number: z.string().min(10, "شماره موبایل معتبر نیست"),
  Phone_Number: z.string().min(8, "شماره تلفن معتبر نیست"),
  City: z.string().min(2, "شهر را وارد کنید"),
  Address: z.string().min(5, "آدرس را وارد کنید"),
  Activity_Field: z
    .array(z.string())
    .min(1, "حداقل یک زمینه فعالیت را انتخاب کنید"),
  Description: z.string().optional(),
});

export type RepresentationFormData = z.infer<typeof formSchema>;

export const visitorFormSchema = z.object({
  Title: z.string().min(2, "نام خانوادگی الزامی است"),
  Job_Title: z.string().min(2, "سمت شغلی الزامی است"),
  Company_Name: z.string().min(2, "نام شرکت الزامی است"),
  Private_Number: z
    .string()
    .min(10, "شماره موبایل معتبر نیست")
    .regex(/^09\d{9}$/, "شماره موبایل باید با 09 شروع شود"),
  City: z.string().min(2, "شهر را وارد کنید"),
  Email: z.string().email("ایمیل معتبر نیست"),
  Purchase_Volume: z.string().min(1, "میزان خرید ماهانه را وارد کنید"),
  Fav_Products: z.array(z.string()).min(1, "حداقل یک محصول را انتخاب کنید"),
  Description: z.string().optional(),
});

export type VisitorFormData = z.infer<typeof visitorFormSchema>;
