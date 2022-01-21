export const decodeProviderId = (encodedProviderId: string) => {
  // base64url
  const str = Buffer.from(encodedProviderId, "base64").toString();

  return (str + "===".slice((str.length + 3) % 4))
    .replace(/-/g, "+")
    .replace(/_/g, "/");
};
