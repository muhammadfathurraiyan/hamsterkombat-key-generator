// actions.ts
"use server";

export const login = async (clientId: string, appToken: string) => {
  const response = await fetch("https://api.gamepromo.io/promo/login-client", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      appToken,
      clientId,
      clientOrigin: "deviceid",
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  const data = await response.json();
  return data.clientToken;
};

export const emulateProgress = async (clientToken: string, promoId: string) => {
  const response = await fetch(
    "https://api.gamepromo.io/promo/register-event",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${clientToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        promoId,
        eventId: generateUUID(),
        eventOrigin: "undefined",
      }),
    }
  );

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return data.hasCode;
};

export const generateKey = async (clientToken: string, promoId: string) => {
  const response = await fetch("https://api.gamepromo.io/promo/create-code", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${clientToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      promoId,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to generate key");
  }

  const data = await response.json();
  return data.promoCode;
};

const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
