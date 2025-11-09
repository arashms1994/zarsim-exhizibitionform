import { BASE_URL, LIST_GUID } from "./base";
import { toast } from "react-toastify";
import type {
  AddListItemPayload,
  IBazdidKonandeganListItem,
} from "@/types/type";
import { getDigest } from "./getDigest";

export async function addListItem(
  data: Partial<IBazdidKonandeganListItem>
): Promise<unknown> {
  const webUrl = BASE_URL;
  const listUrl = `${webUrl}/_api/web/lists(guid'${LIST_GUID}')/items`;

  const payload: AddListItemPayload = {
    __metadata: {
      type: "SP.Data.Bazdidkonandegan_x005f_ListListItem",
    },
  };

  if (data.Title) payload.Title = data.Title;
  if (data.Company_Name) payload.Company_Name = data.Company_Name;
  if (data.Job_Title) payload.Job_Title = data.Job_Title;
  if (data.Phone_Number) payload.Phone_Number = data.Phone_Number;
  if (data.Private_Number) payload.Private_Number = data.Private_Number;
  if (data.Email) payload.Email = data.Email;
  if (data.Address) payload.Address = data.Address;
  if (data.Description) payload.Description = data.Description;
  if (data.Expert_Name) payload.Expert_Name = data.Expert_Name;
  if (data.Type_Of_Ownership)
    payload.Type_Of_Ownership = data.Type_Of_Ownership;
  if (data.Representation_Request)
    payload.Representation_Request = data.Representation_Request;
  if (data.City) payload.City = data.City;
  if (data.Purchase_Volume) payload.Purchase_Volume = data.Purchase_Volume;
  if (data.Fav_Products)
    payload.Fav_Products = Array.isArray(data.Fav_Products)
      ? data.Fav_Products.join(" - ")
      : data.Fav_Products;
  if (data.Activity_Field)
    payload.Activity_Field = Array.isArray(data.Activity_Field)
      ? data.Activity_Field.join(" - ")
      : data.Activity_Field;

  const response = await fetch(listUrl, {
    method: "POST",
    headers: {
      Accept: "application/json;odata=verbose",
      "Content-Type": "application/json;odata=verbose",
      "X-RequestDigest": await getDigest(webUrl),
    },
    credentials: "same-origin",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    toast.error("خطا در ثبت فرم. لطفاً دوباره تلاش کنید.");
    throw new Error(`Failed to add item: ${response.status} - ${errorText}`);
  }

  toast.success("فرم با موفقیت ثبت شد");
  return await response.json();
}
