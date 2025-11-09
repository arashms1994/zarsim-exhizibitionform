import { useState } from "react";
import { useForm } from "react-hook-form";
import { addListItem } from "@/api/addData";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent } from "@/components/ui/card";
import type { IBazdidKonandeganListItem } from "@/types/type";
import { ACTIVITY_FIELDS, OWNERSHIP_TYPES } from "@/constants/constants";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  formSchema,
  type RepresentationFormData,
} from "@/validations/validation";
import { useCities } from "@/hooks/useCities";
import { CityAutocomplete } from "@/components/ui/city-autocomplete";

export default function RepresentationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: cities = [] } = useCities();
  const form = useForm<RepresentationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Title: "",
      Company_Name: "",
      Type_Of_Ownership: undefined,
      Private_Number: "",
      Phone_Number: "",
      City: "",
      Address: "",
      Activity_Field: [],
      Description: "",
    },
  });

  const onSubmit = async (data: RepresentationFormData) => {
    setIsSubmitting(true);
    try {
      const listItem: Partial<IBazdidKonandeganListItem> = {
        Title: data.Title,
        Company_Name: data.Company_Name,
        Type_Of_Ownership: data.Type_Of_Ownership || "",
        Private_Number: data.Private_Number,
        Phone_Number: data.Phone_Number,
        City: data.City,
        Address: data.Address,
        Activity_Field: Array.isArray(data.Activity_Field)
          ? data.Activity_Field.join("; ")
          : "",
        Description: data.Description || "",
        Job_Title: "",
        Email: "",
        Purchase_Volume: "",
        Fav_Products: "",
        Representation_Request: "1",
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
    <Card className="max-w-2xl mx-auto mt-8 shadow-lg">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
              name="Company_Name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="نام فروشگاه/سازمان" {...field} />
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
                name="Phone_Number"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="تلفن ثابت" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="Address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="آدرس" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-row-reverse justify-between items-center border border-[#0ead69] rounded-md p-1.5">
                <span>نوع مالکیت</span>
                <FormField
                  control={form.control}
                  name="Type_Of_Ownership"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="flex space-x-4 rtl:space-x-reverse">
                          {OWNERSHIP_TYPES.map((type) => (
                            <label
                              key={type}
                              className="flex items-center space-x-2 rtl:space-x-reverse cursor-pointer"
                            >
                              <input
                                type="radio"
                                value={type}
                                checked={field.value === type}
                                onChange={(e) => field.onChange(e.target.value)}
                                className="w-4 h-4 text-[#0ead69] focus:ring-[#0ead69] focus:ring-2"
                              />
                              <span className="text-sm">{type}</span>
                            </label>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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

            <div className="flex justify-between items-center flex-row-reverse border border-[#0ead69] rounded-md p-2.5">
              <span>زمینه فعالیت</span>
              <FormField
                control={form.control}
                name="Activity_Field"
                render={() => (
                  <FormItem>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {ACTIVITY_FIELDS.map((fieldItem) => (
                        <FormField
                          key={fieldItem}
                          control={form.control}
                          name="Activity_Field"
                          render={({ field }) => {
                            const isChecked = field.value?.includes(fieldItem);
                            return (
                              <FormItem
                                key={fieldItem}
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
                                            fieldItem,
                                          ])
                                        : field.onChange(
                                            (field.value || []).filter(
                                              (f) => f !== fieldItem
                                            )
                                          );
                                    }}
                                    className="w-4 h-4 text-[#0ead69] focus:ring-[#0ead69] focus:ring-2 rounded"
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {fieldItem}
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
                    <Textarea placeholder="توضیحات کارشناس" {...field} />
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
