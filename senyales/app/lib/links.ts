// Public links, configured with environment variables (see .env.example).
// Anything left empty is simply hidden on the site.
export const links = {
  shop: process.env.NEXT_PUBLIC_SHOP_URL || "",
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "",
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || "",
};
