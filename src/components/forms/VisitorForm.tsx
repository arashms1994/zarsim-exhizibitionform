import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PRODUCT_OPTIONS } from "@/constants/constants";
import {
  visitorFormSchema,
  type VisitorFormData,
} from "@/validations/validation";
import { addListItem } from "@/api/addData";
import type { IBazdidKonandeganListItem } from "@/types/type";
import { useCities } from "@/hooks/useCities";
import { CityAutocomplete } from "@/components/ui/city-autocomplete";

export default function VisitorForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: cities = [] } = useCities();
  const form = useForm<VisitorFormData>({
    resolver: zodResolver(visitorFormSchema),
    defaultValues: {
      Title: "",
      Job_Title: "",
      Company_Name: "",
      Private_Number: "",
      City: "",
      Email: "",
      Purchase_Volume: "",
      Fav_Products: [],
      Description: "",
    },
  });

  const onSubmit = async (data: VisitorFormData) => {
    setIsSubmitting(true);
    try {
      const listItem: Partial<IBazdidKonandeganListItem> = {
        Title: data.Title,
        Job_Title: data.Job_Title,
        Company_Name: data.Company_Name,
        Private_Number: data.Private_Number,
        City: data.City,
        Email: data.Email,
        Purchase_Volume: data.Purchase_Volume,
        Fav_Products: Array.isArray(data.Fav_Products)
          ? data.Fav_Products.join("; ")
          : "",
        Description: data.Description || "",
        Phone_Number: "",
        Address: "",
        Type_Of_Ownership: "",
        Representation_Request: "0",
        Activity_Field: "",
      };

      await addListItem(listItem);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto mt-10 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="Title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="نام و نام خانوادگی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Job_Title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="سمت شغلی" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="Company_Name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="نام شرکت/سازمان" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="Private_Number"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="تلفن همراه" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="City"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <CityAutocomplete
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        placeholder="شهر را انتخاب کنید"
                        cities={cities}
                        className="border-[#0ead69]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input placeholder="ایمیل" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Monthly Purchase */}
            <FormField
              control={form.control}
              name="Purchase_Volume"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="میزان خرید ماهانه" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between items-center flex-row-reverse border border-[#0ead69] rounded-md p-2.5">
              <span>محصولات مورد علاقه</span>
              <FormField
                control={form.control}
                name="Fav_Products"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {PRODUCT_OPTIONS.map((product) => (
                        <FormField
                          key={product}
                          control={form.control}
                          name="Fav_Products"
                          render={({ field }) => {
                            const isChecked = field.value?.includes(product);
                            return (
                              <FormItem
                                key={product}
                                className="flex flex-row items-center space-x-2 rtl:space-x-reverse"
                              >
                                <FormControl>
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                      const checked = e.target.checked;
                                      return checked
                                        ? field.onChange([
                                            ...(field.value || []),
                                            product,
                                          ])
                                        : field.onChange(
                                            (field.value || []).filter(
                                              (p) => p !== product
                                            )
                                          );
                                    }}
                                    className="w-4 h-4 text-[#0ead69] focus:ring-[#0ead69] focus:ring-2 rounded"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {product}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="Description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="توضیحات و پیشنهادات" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div
              onClick={() => !isSubmitting && form.handleSubmit(onSubmit)()}
              className={`w-full max-w-3xs mx-auto bg-[#0ead69] text-white text-center py-2 rounded-md transition-all duration-300 ${
                isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:bg-[#0ead69]/80"
              }`}
            >
              {isSubmitting ? "در حال ثبت..." : "ثبت اطلاعات"}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
