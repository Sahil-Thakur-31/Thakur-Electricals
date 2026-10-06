export const siteConfig = {
  // Update once the real domain is live (Vercel project settings or here) —
  // metadata, the sitemap, and the structured data below all read from it.
  siteUrl: "https://thakurelectricals.vercel.app",
  name: "Thakur Electricals",
  tagline: "Powering Homes, Lighting Lives",
  taglineMarathi: "तुमची सेवा, आमची जबाबदारी!",
  description:
    "Trusted electrical sales, services and repairing in Vadgaon Budruk, Pune. Wholesale prices, ITI-trained technicians, and 24x7 home service.",
  owner: "Sagar Thakur",
  ownerTitle: "Proprietor · ITI Graduate",
  phone: "7448044549",
  phoneDisplay: "+91 74480 44549",
  email: "thakurelectricals2@gmail.com",
  address: {
    full: "Thakur Electricals, Shop No. 1, Ganesh Kripa, Charwad Wasti, near Azad Mitra Mandal, Nivrutti Nagar, Vadgaon Budruk, Pune, Maharashtra 411041",
    locality: "Vadgaon Budruk",
    region: "Maharashtra",
    postalCode: "411041",
    country: "IN",
  },
  // Locality-level coordinates for Vadgaon Budruk, Pune — close enough for
  // local-search relevance. Swap in the exact shop pin from Google Maps
  // (right-click the pin → the lat/lng shown) if you want it pinpoint-exact.
  geo: { lat: 18.4634, lng: 73.8318 },
  hours: "Available 24 hours — Day or Night",
  social: {
    whatsapp: "https://wa.me/917448044549",
    instagram: "#",
    facebook: "#",
  },
} as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Why Us", href: "#why-us" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export type Service = {
  title: string;
  description: string;
  icon: string;
};

export const services: Service[] = [
  {
    title: "Electrical Wiring",
    description: "New wiring, rewiring & modification done safely to code.",
    icon: "zap",
  },
  {
    title: "Fitting & Installation",
    description: "Switches, sockets, MCB, DB, lights, fans & more.",
    icon: "plug",
  },
  {
    title: "Repairing Services",
    description: "Quick & reliable appliance repair at your doorstep.",
    icon: "wrench",
  },
  {
    title: "LED Lights & Fixtures",
    description: "Installation and repair of all LED lighting solutions.",
    icon: "lightbulb",
  },
  {
    title: "Safety First",
    description: "Your safety is our top priority on every job.",
    icon: "shield-check",
  },
  {
    title: "All Home Solutions",
    description: "From small repairs to complete electrical work.",
    icon: "home",
  },
];

export type Product = {
  name: string;
  icon: string;
  issue: string;
};

export const products: Product[] = [
  { name: "Ceiling Fan", icon: "fan", issue: "Wobbling or running slow?" },
  { name: "Stand Fan", icon: "wind", issue: "Not oscillating properly?" },
  { name: "Exhaust Fan", icon: "air-vent", issue: "Stuck, noisy, or weak?" },
  { name: "Geyser", icon: "flame", issue: "No hot water at all?" },
  { name: "Water Boiler", icon: "droplets", issue: "Heating too slowly?" },
  { name: "Mixer Grinder", icon: "blend", issue: "Motor jammed or weak?" },
  { name: "Iron", icon: "shirt", issue: "Not heating evenly?" },
  { name: "Any Other Appliance", icon: "wrench", issue: "Not listed here? Ask us anyway." },
];

export const stats = [
  { label: "Years of Trust", value: 2, suffix: "+" },
  { label: "Appliances Repaired", value: 500, suffix: "+" },
  { label: "Happy Customers", value: 1000, suffix: "+" },
  { label: "Service", value: 24, suffix: "/7" },
];

export const trustPoints = [
  {
    title: "Home Services, Anytime",
    description: "Day or night — we're just a call away, all 24 hours.",
    icon: "clock",
  },
  {
    title: "Always Doing Good Work",
    description: "Quality work is our identity, on every single job.",
    icon: "badge-check",
  },
  {
    title: "Customer Safety Is First",
    description: "Safe work, safe home, and a happy you.",
    icon: "shield",
  },
  {
    title: "Honest Prices, Best Quality",
    description: "Wholesale rates on all electrical items, no surprises.",
    icon: "hand-coins",
  },
];

export const faqs = [
  {
    question: "Which areas do you serve?",
    answer:
      "We're based in Vadgaon Budruk and cover homes, shops, and offices across that part of Pune. Not sure if you're in range? Just call or WhatsApp us the location and we'll confirm.",
  },
  {
    question: "What electrical services do you offer?",
    answer:
      "Full electrical wiring and rewiring, switch/socket/MCB/DB fitting and installation, LED lights and fixtures, general safety checks, and all-round home electrical solutions — not just repairs.",
  },
  {
    question: "Do you repair home appliances too?",
    answer:
      "Yes — ceiling and stand fans, exhaust fans, geysers, water boilers, mixer grinders, irons, and most other electrical home appliances. If it's not listed on the site, ask us anyway.",
  },
  {
    question: "Are you available 24 hours a day?",
    answer:
      "Yes, day or night. For urgent issues like a tripped board or no power at home, call us directly rather than filling the form — it's faster.",
  },
  {
    question: "Do your prices really stay wholesale?",
    answer:
      "Yes. We sell electrical items at wholesale rates with no hidden markup, and quote the job cost upfront before starting work.",
  },
  {
    question: "Is the technician actually qualified?",
    answer:
      "Thakur Electricals is run by Sagar Thakur, an ITI graduate with hands-on electrical training — not an unlicensed handyman.",
  },
  {
    question: "How fast can you reach me after I call?",
    answer:
      "Most repairs within Vadgaon Budruk are handled the same day. For planned work like full-home wiring, we'll give you a clear time estimate before starting.",
  },
  {
    question: "Do you give a free quote before starting work?",
    answer:
      "Yes. Share the job details by call, WhatsApp, or the contact form, and we'll give you a free estimate before any work begins.",
  },
];
