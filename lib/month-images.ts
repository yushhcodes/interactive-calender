import type { MonthImage } from "@/types/calendar";


export const MONTH_IMAGES: Record<number, MonthImage> = {
  0: {
    url: "https://images.unsplash.com/photo-1704236041747-615d800a8b0a?q=80&auto=format&fit=crop&w=800&h=600",
    alt: "Snowy winter landscape",
    credit: "January — Winter Silence",
  },
    1: {
  url: "https://images.unsplash.com/photo-1742845918799-00756661ef14?q=80&auto=format&fit=crop&w=800&h=600",
  alt: "Frozen lake in winter",
  credit: "February — Frost & Ice",
},
2: {
  url: "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?q=80&auto=format&fit=crop&w=800&h=600",
  alt: "Cherry blossoms in spring",
  credit: "March — First Bloom",
},
3: {
  url: "https://images.unsplash.com/photo-1716562765369-9a526b58fa80?q=80&auto=format&fit=crop&w=800&h=600",
  alt: "Spring flowers in a field",
  credit: "April — Full Bloom",
},
4: {
  url: "https://images.unsplash.com/photo-1755585021243-5a7339d910b4?q=80&auto=format&fit=crop&w=800&h=600",
  alt: "Green meadow landscape",
  credit: "May — Verdant Days",
},
5: {
  url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&auto=format&fit=crop&w=800&h=600",
  alt: "Summer beach sunset",
  credit: "June — Solstice",
},
6: {
  url: "https://images.unsplash.com/photo-1552160793-cbaf3ebcba72?q=80&auto=format&fit=crop&w=800&h=600",
  alt: "Sunflower field",
  credit: "July — High Summer",
},
7: {
  url: "https://images.unsplash.com/photo-1759063916208-565f0e51be00?q=80&auto=format&fit=crop&w=800&h=600",
  alt: "Ocean cliffs",
  credit: "August — Last Warmth",
},
8: {
  url: "https://images.unsplash.com/photo-1761897190306-6592cbb61ba8?q=80&auto=format&fit=crop&w=800&h=600",
  alt: "Autumn mountains",
  credit: "September — Turning Leaves",
},
9: {
  url: "https://images.unsplash.com/photo-1762755126280-6d8a4f9d1115?q=80&auto=format&fit=crop&w=800&h=600",
  alt: "Foggy autumn forest",
  credit: "October — Harvest Moon",
},
10: {
  url: "https://images.unsplash.com/photo-1761963522000-2ca373bda066?q=80&auto=format&fit=crop&w=800&h=600",
  alt: "Autumn sunlight trees",
  credit: "November — Bare & Still",
},
11: {
  url: "https://images.unsplash.com/photo-1761991062157-df67faab3a23?q=80&auto=format&fit=crop&w=800&h=600",
  alt: "Snowy forest winter",
  credit: "December — Deep Winter",
},
};

// Fallback gradient per month if image fails
export const MONTH_GRADIENTS: Record<number, string> = {
  0: "from-slate-700 to-blue-900",
  1: "from-blue-800 to-indigo-900",
  2: "from-rose-400 to-pink-700",
  3: "from-pink-500 to-fuchsia-700",
  4: "from-emerald-500 to-green-800",
  5: "from-yellow-400 to-orange-600",
  6: "from-orange-400 to-amber-600",
  7: "from-amber-400 to-orange-700",
  8: "from-orange-600 to-red-800",
  9: "from-orange-700 to-red-900",
  10: "from-gray-500 to-slate-800",
  11: "from-blue-700 to-indigo-900",
};

