export const encodeProviderId = (providerId: string) => {
  // base64url
  return Buffer.from(providerId)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
};
