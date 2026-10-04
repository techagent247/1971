/**
 * Thè 1971 — central approved knowledge base.
 * Every page AND the chatbot read from this file. Update facts here only.
 * Never add dishes, prices, awards, socials or URLs that the restaurant has not supplied.
 */

export const businessInfo = {
  name: "Thè 1971",
  tagline: "Bangladeshi Cuisine",
  address: { line1: "36 Station Rd", town: "Harpenden", postcode: "AL5 4ST", country: "United Kingdom" },
  phone: "01582 766954",
  phoneHref: "tel:+441582766954",
  email: "info@the1971.co.uk",
  mapsQuery: "36 Station Rd, Harpenden AL5 4ST",
};

/** Configurable integrations — leave empty until the restaurant supplies real URLs. */
export const siteConfig = {
  BOOKING_URL: "",
  ORDER_ONLINE_URL: "",
  socials: { facebook: "", instagram: "", tiktok: "", youtube: "" } as Record<string, string>,
};

export const openingHours = [
  { day: "Sunday", open: "5:30 PM", close: "10:30 PM" },
  { day: "Monday", open: "5:30 PM", close: "11:00 PM" },
  { day: "Tuesday", open: "5:30 PM", close: "11:00 PM" },
  { day: "Wednesday", open: "5:30 PM", close: "11:00 PM" },
  { day: "Thursday", open: "5:30 PM", close: "11:00 PM" },
  { day: "Friday", open: "5:30 PM", close: "11:30 PM" },
  { day: "Saturday", open: "5:30 PM", close: "11:30 PM" },
];

export const restaurantStory = {
  year1971:
    "The year 1971 is significant in the history of Bangladesh. It was the year of the Bangladeshi Liberation War, when Bangladesh became an independent country.",
  purpose:
    "Thè 1971 aims to honour that history and legacy while celebrating the historical contribution of Bangladeshi ancestors, their sacrifice for freedom and independence, and the many benefits passed down through generations.",
  contribution:
    "Many of the UK's Indian restaurants are run by Bangladeshi people. Thè 1971 wants to highlight the contribution of Bangladeshis to the UK restaurant and catering industry.",
  cuisine:
    "Thè 1971 specialises in Bangladeshi cuisine, celebrating the heritage and culinary traditions of Bangladesh through food, hospitality and storytelling.",
  legacy:
    "We thank you for loving our cuisine so much and we hope that the next time you enjoy a hearty curry, you will remember the legacy and contributions of the Bangladeshi community.",
};

export const allergenInformation = {
  notice: "If you suffer from allergies, then please inquire when ordering.",
  warning: "Customers with any allergy, eat at their own risk.",
  allergens: [
    "Gluten", "Crustaceans", "Eggs", "Fish", "Peanuts", "Soybeans", "Milk",
    "Nuts", "Celery", "Mustard", "Sesame", "Sulphur dioxide", "Lupin", "Molluscs",
  ],
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price?: string;
  category: string;
  dietary?: ("vegetarian" | "vegan")[];
  allergens?: string[];
  spicyLevel?: number;
  image?: string;
  featured?: boolean;
};

export const menuCategories = [
  "Starters", "Main Courses", "Bangladeshi Specialities", "Curries", "Rice",
  "Breads", "Side Dishes", "Desserts", "Drinks",
];

/** Awaiting the restaurant's real menu. Do not invent dishes or prices. */
export const menuItems: MenuItem[] = [];

export type Award = { id: string; title: string; year?: string; issuer?: string; description?: string };
/** Only real, supplied awards. */
export const awards: Award[] = [];

export const faq = [
  { q: "How do I book a table?", a: `Call us on ${businessInfo.phone}. Online booking will appear on the Book page once available.` },
  { q: "Where are you located?", a: "36 Station Rd, Harpenden AL5 4ST." },
];

export const bookingInformation = {
  method: siteConfig.BOOKING_URL ? `Book online at ${siteConfig.BOOKING_URL}` : `Book by phone on ${businessInfo.phone}.`,
  note: "Table availability can only be confirmed by the restaurant.",
};

/** Plain-text knowledge base fed to the chatbot. */
export function buildKnowledgeBase() {
  return JSON.stringify(
    {
      businessInfo,
      contactInformation: { phone: businessInfo.phone, email: businessInfo.email, address: businessInfo.address },
      openingHours,
      restaurantStory,
      allergenInformation,
      menuCategories,
      menuItems: menuItems.length ? menuItems : "The full menu has not yet been published on the website.",
      awards: awards.length ? awards : "No awards have been published yet.",
      bookingInformation,
      onlineOrdering: siteConfig.ORDER_ONLINE_URL || "No online ordering link has been provided.",
      takeawayOrDelivery: "Not specified in approved information.",
      faq,
    },
    null,
    2,
  );
}
