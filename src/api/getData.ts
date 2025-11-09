declare const _spPageContextInfo: { webAbsoluteUrl: string };

export async function getCurrentUser(): Promise<string> {
  const response = await fetch(
    `${_spPageContextInfo.webAbsoluteUrl}/_api/web/currentuser`,
    {
      headers: { Accept: "application/json;odata=verbose" },
      credentials: "same-origin",
    }
  );

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  const rawLoginName = data.d.LoginName;

  return rawLoginName;
}
