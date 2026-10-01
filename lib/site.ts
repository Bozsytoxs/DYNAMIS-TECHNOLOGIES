// Single source of truth for company details. Empty strings are hidden in the UI.
export const site = {
  name: "Dynamis Technologies",
  tagline: "Power. Capability. Innovation.",
  contactPerson: "Amb J. S. Tapkum",
  phone: "08108515210",
  phoneIntl: "+2348108515210",
  whatsapp: "https://wa.me/2348108515210",
  locality: "Shendam",
  region: "Plateau State",
  country: "Nigeria",
  email: "Dynamistechnologies@gmail.com",
  cacNumber: "", // not registered yet: add the CAC number once issued
  socialName: "Dynamis Technology LTD", // same name on every platform; add URLs to `social` below
  whatsappCommunity: "https://chat.whatsapp.com/I1j0jBGqaOG9unDJxTXPJ9",
  social: { Facebook: "https://www.facebook.com/profile.php?id=61559955524471", YouTube: "https://www.youtube.com/@DynamisTechnologies" } as Record<string, string>, // add more platforms here
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
};
export const legalPages = ["privacy", "terms", "cookies", "accessibility"] as const;
