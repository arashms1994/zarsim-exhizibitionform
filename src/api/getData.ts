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

export function extractUsername(currentUser: string): string {
  let username = "";
  if (currentUser.includes("|")) {
    const parts = currentUser.split("|");
    if (parts.length > 0) {
      const lastPart = parts[parts.length - 1];
      if (lastPart.includes("\\")) {
        const splitParts = lastPart.split("\\");
        username = splitParts[splitParts.length - 1].toLowerCase();
      } else {
        username = lastPart.toLowerCase();
      }
    }
  } else {
    username = currentUser.toLowerCase();
  }
  return username;
}
