import { toast } from "react-toastify";

export async function getDigest(webUrl: string): Promise<string> {
  try {
    const digestUrl = `${webUrl}/_api/contextinfo`;
    const response = await fetch(digestUrl, {
      method: "POST",
      headers: {
        Accept: "application/json;odata=verbose",
      },
      credentials: "same-origin",
    });

    if (!response.ok) {
      toast.error("خطا در دریافت اطلاعات احراز هویت");
      throw new Error("Failed to get request digest");
    }

    const data = await response.json();
    return data.d.GetContextWebInformation.FormDigestValue;
  } catch (error) {
    toast.error("خطا در اتصال به سرور");
    throw error;
  }
}
