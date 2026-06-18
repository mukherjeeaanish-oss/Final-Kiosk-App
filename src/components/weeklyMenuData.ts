import type { MenuItem } from './menuData';

// ─── Types ───────────────────────────────────────────────────────────────────

export type DailyItem = {
  id: string;
  name: string;
  tamil: string;
  category: LunchCategory | DinnerCategory;
  price: number;
  isVeg: boolean;
  imageId: string; // <-- Added this to easily map to your local images
};

export type LunchCategory =
  | 'Biriyani'
  | 'Curd Rice'
  | 'Variety Rice'
  | 'Ponni Rice'
  | 'Sambar'
  | 'Rasam'
  | 'Kuzhambu'
  | 'Varuval'
  | 'Porival'
  | 'Keerai Kootu';

export type DinnerCategory = 'Bread' | 'Tiffin' | 'Sevai' | 'Sambar' | 'Curry';

export type DosaiVariety = {
  id: string;
  name: string;
  tamil: string;
  serves: string;
  description: string;
  price: number;
  imageId: string; // <-- Added here as well
};

export type DayMenu = {
  lunch: DailyItem[];
  dinner: DailyItem[];
};

// ─── Constants ───────────────────────────────────────────────────────────────

export const DAY_NAMES = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

export type DayName = (typeof DAY_NAMES)[number];

export const LUNCH_CATEGORY_ORDER: LunchCategory[] = [
  'Biriyani',
  'Variety Rice',
  'Ponni Rice',
  'Curd Rice',
  'Sambar',
  'Rasam',
  'Kuzhambu',
  'Varuval',
  'Porival',
  'Keerai Kootu',
];

export const DINNER_CATEGORY_ORDER: DinnerCategory[] = [
  'Tiffin',
  'Bread',
  'Sevai',
  'Sambar',
  'Curry',
];

export const CATEGORY_EMOJI: Record<string, string> = {
  Biriyani: '🍛',
  'Variety Rice': '🍚',
  'Ponni Rice': '🍚',
  'Curd Rice': '🥣',
  Sambar: '🫕',
  Rasam: '🍵',
  Kuzhambu: '🍲',
  Varuval: '🥘',
  Porival: '🥗',
  'Keerai Kootu': '🌿',
  Bread: '🫓',
  Tiffin: '🥞',
  Sevai: '🍜',
  Curry: '🍛',
};

// ─── Dosai Varieties (always available) ──────────────────────────────────────

export const DOSAI_VARIETIES: DosaiVariety[] = [
  {
    id: 'dosa_plain',
    name: 'Plain Dosai',
    tamil: 'சாதா தோசை',
    serves: '2 pcs',
    description:
      'Crispy thin rice & lentil crepe, served with sambar & chutney',
    price: 40,
    imageId: 'plain_dosai',
  },
  {
    id: 'dosa_ghee',
    name: 'Ghee Dosai',
    tamil: 'நெய் தோசை',
    serves: '2 pcs',
    description: 'Golden crispy dosai drizzled with pure ghee',
    price: 55,
    imageId: 'ghee_dosai',
  },
  {
    id: 'dosa_onion',
    name: 'Onion Dosai',
    tamil: 'வெங்காய தோசை',
    serves: '2 pcs',
    description: 'Soft dosai topped with sautéed onions & green chilli',
    price: 50,
    imageId: 'onion_dosai',
  },
  {
    id: 'dosa_masala',
    name: 'Masala Dosai',
    tamil: 'மசாலா தோசை',
    serves: '2 pcs',
    description: 'Crispy dosai filled with spiced potato masala',
    price: 65,
    imageId: 'masala_dosai',
  },
  {
    id: 'dosa_mixveg',
    name: 'Mix Veg Dosai',
    tamil: 'காய்கறி தோசை',
    serves: '2 pcs',
    description: 'Loaded with mixed seasonal vegetables',
    price: 60,
    imageId: 'mix_veg_dosai',
  },
  {
    id: 'dosa_benne',
    name: 'Mini Benne Dosai',
    tamil: 'மினி வெண்ணெய் தோசை',
    serves: '4 pcs',
    description: 'Bite-sized butter dosais, Karnataka style',
    price: 70,
    imageId: 'mini_benne_dosai',
  },
  {
    id: 'dosa_uthappam',
    name: 'Onion Uthappam',
    tamil: 'வெங்காய உத்தப்பம்',
    serves: '2 pcs',
    description: 'Thick soft pancake topped with onions & green chilli',
    price: 60,
    imageId: 'onion_uthappam',
  },
  {
    id: 'dosa_setidly',
    name: 'Set Idly',
    tamil: 'செட் இட்லி',
    serves: '4 pcs',
    description: 'Soft steamed rice cakes with sambar & chutneys',
    price: 55,
    imageId: 'set_idly',
  },
];

// ─── Weekly Menu Data ────────────────────────────────────────────────────────

// Shared Lunch Items
const PONNI_RICE = (day: string): DailyItem => ({
  id: `${day}_ponni`,
  name: 'Ponni Rice',
  tamil: 'பொன்னி சாதம்',
  category: 'Ponni Rice',
  price: 50,
  isVeg: true,
  imageId: 'ponni_rice',
});

const PARUPPU_RASAM = (day: string): DailyItem => ({
  id: `${day}_rasam`,
  name: 'Paruppu Rasam',
  tamil: 'பருப்பு ரசம்',
  category: 'Rasam',
  price: 25,
  isVeg: true,
  imageId: 'paruppu_rasam',
});

const URULAI_VARUVAL = (day: string): DailyItem => ({
  id: `${day}_varuval`,
  name: 'Urulai Podi Varuval',
  tamil: 'உருளை பொடி வறுவல்',
  category: 'Varuval',
  price: 40,
  isVeg: true,
  imageId: 'urulai_podi_varuval',
});

const SIRU_KEERAI = (day: string): DailyItem => ({
  id: `${day}_keerai`,
  name: 'Siru Keerai Kootu',
  tamil: 'சிறு கீரை கூட்டு',
  category: 'Keerai Kootu',
  price: 35,
  isVeg: true,
  imageId: 'siru_keerai_kootu',
});

// Shared Dinner Items
const dinnerItems = (day: string): DailyItem[] => [
  {
    id: `${day}_dn_idly`,
    name: 'Plain Idly',
    tamil: 'இட்லி',
    category: 'Tiffin',
    price: 12,
    isVeg: true,
    imageId: 'idly',
  },
  {
    id: `${day}_dn_samidly`,
    name: 'Sambar Idly',
    tamil: 'சாம்பார் இட்லி',
    category: 'Tiffin',
    price: 40,
    isVeg: true,
    imageId: 'sambar_idly',
  },
  {
    id: `${day}_dn_tpidly`,
    name: 'Thattu Podi Idly',
    tamil: 'தட்டு பொடி இட்லி',
    category: 'Tiffin',
    price: 45,
    isVeg: true,
    imageId: 'thattu_podi_idly',
  },
  {
    id: `${day}_dn_idi`,
    name: 'Idiyappam',
    tamil: 'இடியாப்பம்',
    category: 'Tiffin',
    price: 20,
    isVeg: true,
    imageId: 'idiyappam',
  },
  {
    id: `${day}_dn_chap`,
    name: 'Chapati',
    tamil: 'சப்பாத்தி',
    category: 'Bread',
    price: 15,
    isVeg: true,
    imageId: 'chapati',
  },
  {
    id: `${day}_dn_par`,
    name: 'Paratha',
    tamil: 'பராத்தா',
    category: 'Bread',
    price: 20,
    isVeg: true,
    imageId: 'paratha',
  },
  {
    id: `${day}_dn_sevai`,
    name: 'Sevai',
    tamil: 'சேவை',
    category: 'Sevai',
    price: 35,
    isVeg: true,
    imageId: 'lemon_sevai',
  },
  {
    id: `${day}_dn_tsam`,
    name: 'Tiffin Sambar',
    tamil: 'டிஃபின் சாம்பார்',
    category: 'Sambar',
    price: 25,
    isVeg: true,
    imageId: 'tiffin_sambar',
  },
  {
    id: `${day}_dn_vada`,
    name: 'Vadacurry',
    tamil: 'வட கறி',
    category: 'Curry',
    price: 40,
    isVeg: true,
    imageId: 'vadacurry',
  },
  {
    id: `${day}_dn_kur`,
    name: 'Kuruma',
    tamil: 'குருமா',
    category: 'Curry',
    price: 40,
    isVeg: true,
    imageId: 'urulai_pattani_kuruma',
  },
  {
    id: `${day}_dn_pan`,
    name: 'Paneer Curry',
    tamil: 'பனீர் கறி',
    category: 'Curry',
    price: 60,
    isVeg: true,
    imageId: 'paneer_butter_masala',
  },
];

export const WEEKLY_MENU: Record<DayName, DayMenu> = {
  Monday: {
    lunch: [
      {
        id: 'mon_bir',
        name: 'Seeraga Samba Veg Biriyani',
        tamil: 'சீரக சம்பா வெஜ் பிரியாணி',
        category: 'Biriyani',
        price: 120,
        isVeg: true,
        imageId: 'seeraga_samba_veg_biryani',
      },
      {
        id: 'mon_cr',
        name: 'Curd Rice & Pickle',
        tamil: 'தயிர் சாதம் & ஊறுகாய்',
        category: 'Curd Rice',
        price: 60,
        isVeg: true,
        imageId: 'curd_rice_urulai',
      },
      {
        id: 'mon_vr',
        name: 'Lemon Rice',
        tamil: 'எலுமிச்சை சாதம்',
        category: 'Variety Rice',
        price: 60,
        isVeg: true,
        imageId: 'lemon_rice',
      },
      PONNI_RICE('mon'),
      {
        id: 'mon_sam',
        name: 'Carrot & Beans Sambar',
        tamil: 'கேரட் பீன்ஸ் சாம்பார்',
        category: 'Sambar',
        price: 30,
        isVeg: true,
        imageId: 'carrot_beans_sambar',
      },
      PARUPPU_RASAM('mon'),
      {
        id: 'mon_kuz',
        name: 'Chinna Vengayam Puli Kuzhambu',
        tamil: 'சின்ன வெங்காயம் புளி குழம்பு',
        category: 'Kuzhambu',
        price: 40,
        isVeg: true,
        imageId: 'chinna_vengayam_kuzhambu',
      },
      {
        id: 'mon_var',
        name: 'Potato Varuval',
        tamil: 'உருளைக்கிழங்கு வறுவல்',
        category: 'Varuval',
        price: 40,
        isVeg: true,
        imageId: 'potato_varuval',
      },
      {
        id: 'mon_por',
        name: 'Cabbage & Carrot Porival',
        tamil: 'கோசு கேரட் பொரியல்',
        category: 'Porival',
        price: 30,
        isVeg: true,
        imageId: 'cabbage_carrot_thoran',
      },
      SIRU_KEERAI('mon'),
    ],
    dinner: dinnerItems('mon'),
  },

  Tuesday: {
    lunch: [
      {
        id: 'tue_bir',
        name: 'Seeraga Samba Veg Biriyani',
        tamil: 'சீரக சம்பா வெஜ் பிரியாணி',
        category: 'Biriyani',
        price: 120,
        isVeg: true,
        imageId: 'seeraga_samba_veg_biryani',
      },
      {
        id: 'tue_cr',
        name: 'Curd Rice & Potato Varuval',
        tamil: 'தயிர் சாதம் & உருளை வறுவல்',
        category: 'Curd Rice',
        price: 70,
        isVeg: true,
        imageId: 'curd_rice_urulai',
      },
      {
        id: 'tue_vr',
        name: 'Coconut Rice',
        tamil: 'தேங்காய் சாதம்',
        category: 'Variety Rice',
        price: 60,
        isVeg: true,
        imageId: 'coconut_rice',
      },
      PONNI_RICE('tue'),
      {
        id: 'tue_sam',
        name: 'Brinjal Sambar',
        tamil: 'கத்தரிக்காய் சாம்பார்',
        category: 'Sambar',
        price: 30,
        isVeg: true,
        imageId: 'brinjal_sambar',
      },
      PARUPPU_RASAM('tue'),
      {
        id: 'tue_kuz',
        name: 'Poonaikkai Mor Kuzhambu',
        tamil: 'பூணைக்காய் மோர் குழம்பு',
        category: 'Kuzhambu',
        price: 40,
        isVeg: true,
        imageId: 'poonaikkai_mor_kuzhambu',
      },
      URULAI_VARUVAL('tue'),
      {
        id: 'tue_por',
        name: 'Beans Uruli',
        tamil: 'பீன்ஸ் உருளி',
        category: 'Porival',
        price: 30,
        isVeg: true,
        imageId: 'beans_usili',
      },
      SIRU_KEERAI('tue'),
    ],
    dinner: dinnerItems('tue'),
  },

  Wednesday: {
    lunch: [
      {
        id: 'wed_bir',
        name: 'Seeraga Samba Veg Biriyani',
        tamil: 'சீரக சம்பா வெஜ் பிரியாணி',
        category: 'Biriyani',
        price: 120,
        isVeg: true,
        imageId: 'seeraga_samba_veg_biryani',
      },
      {
        id: 'wed_cr',
        name: 'Curd Rice & Pickle',
        tamil: 'தயிர் சாதம் & ஊறுகாய்',
        category: 'Curd Rice',
        price: 60,
        isVeg: true,
        imageId: 'curd_rice_urulai',
      },
      {
        id: 'wed_vr',
        name: 'Tomato Rice',
        tamil: 'தக்காளி சாதம்',
        category: 'Variety Rice',
        price: 60,
        isVeg: true,
        imageId: 'tomato_rice',
      },
      PONNI_RICE('wed'),
      {
        id: 'wed_sam',
        name: 'Arachvitta Sambar',
        tamil: 'அரைத்து விட்ட சாம்பார்',
        category: 'Sambar',
        price: 30,
        isVeg: true,
        imageId: 'arachvitta_sambar',
      },
      PARUPPU_RASAM('wed'),
      {
        id: 'wed_kuz',
        name: 'Manathakaali Vatha Kuzhambu',
        tamil: 'மணத்தக்காளி வத்த குழம்பு',
        category: 'Kuzhambu',
        price: 40,
        isVeg: true,
        imageId: 'manathakali_kuzhambu',
      },
      URULAI_VARUVAL('wed'),
      {
        id: 'wed_por',
        name: 'Brinjal Porival',
        tamil: 'கத்தரிக்காய் பொரியல்',
        category: 'Porival',
        price: 30,
        isVeg: true,
        imageId: 'brinjal_poriyal',
      },
      SIRU_KEERAI('wed'),
    ],
    dinner: dinnerItems('wed'),
  },

  Thursday: {
    lunch: [
      {
        id: 'thu_bir',
        name: 'Seeraga Samba Veg Biriyani',
        tamil: 'சீரக சம்பா வெஜ் பிரியாணி',
        category: 'Biriyani',
        price: 120,
        isVeg: true,
        imageId: 'seeraga_samba_veg_biryani',
      },
      {
        id: 'thu_cr',
        name: 'Curd Rice & Appalam',
        tamil: 'தயிர் சாதம் & அப்பளம்',
        category: 'Curd Rice',
        price: 65,
        isVeg: true,
        imageId: 'curd_rice_appalam',
      },
      {
        id: 'thu_vr',
        name: 'Tamarind Rice',
        tamil: 'புளியோதரை',
        category: 'Variety Rice',
        price: 65,
        isVeg: true,
        imageId: 'tamarind',
      },
      PONNI_RICE('thu'),
      {
        id: 'thu_sam',
        name: 'Arachvitta Sambar',
        tamil: 'அரைத்து விட்ட சாம்பார்',
        category: 'Sambar',
        price: 30,
        isVeg: true,
        imageId: 'arachvitta_sambar',
      },
      PARUPPU_RASAM('thu'),
      {
        id: 'thu_kuz',
        name: 'Mocha Kara Kuzhambu',
        tamil: 'மொச்சை கார குழம்பு',
        category: 'Kuzhambu',
        price: 40,
        isVeg: true,
        imageId: 'mochai_kuzhambu',
      },
      URULAI_VARUVAL('thu'),
      {
        id: 'thu_por',
        name: 'Cluster Beans Porival',
        tamil: 'கொத்தவரங்காய் பொரியல்',
        category: 'Porival',
        price: 30,
        isVeg: true,
        imageId: 'cluster_beans_poriyal',
      },
      SIRU_KEERAI('thu'),
    ],
    dinner: dinnerItems('thu'),
  },

  Friday: {
    lunch: [
      {
        id: 'fri_bir',
        name: 'Seeraga Samba Veg Biriyani',
        tamil: 'சீரக சம்பா வெஜ் பிரியாணி',
        category: 'Biriyani',
        price: 120,
        isVeg: true,
        imageId: 'seeraga_samba_veg_biryani',
      },
      {
        id: 'fri_cr',
        name: 'Curd Rice & Vadagam',
        tamil: 'தயிர் சாதம் & வடகம்',
        category: 'Curd Rice',
        price: 65,
        isVeg: true,
        imageId: 'curd_rice_vadagam',
      },
      {
        id: 'fri_vr',
        name: 'Peas Pulao',
        tamil: 'பட்டாணி புலாவ்',
        category: 'Variety Rice',
        price: 70,
        isVeg: true,
        imageId: 'peas_pulao',
      },
      PONNI_RICE('fri'),
      {
        id: 'fri_sam',
        name: 'Drumstick Sambar',
        tamil: 'முருங்கைக்காய் சாம்பார்',
        category: 'Sambar',
        price: 30,
        isVeg: true,
        imageId: 'brinjal_drumstick_sambar',
      },
      PARUPPU_RASAM('fri'),
      {
        id: 'fri_kuz',
        name: 'Vendakkai Puli Kuzhambu',
        tamil: 'வெண்டைக்காய் புளி குழம்பு',
        category: 'Kuzhambu',
        price: 40,
        isVeg: true,
        imageId: 'vendakkai_puli_kuzhambu',
      },
      URULAI_VARUVAL('fri'),
      {
        id: 'fri_por',
        name: 'Raw Banana Porival',
        tamil: 'வாழைக்காய் பொரியல்',
        category: 'Porival',
        price: 30,
        isVeg: true,
        imageId: 'raw_banana_poriyal',
      },
      SIRU_KEERAI('fri'),
    ],
    dinner: dinnerItems('fri'),
  },

  Saturday: {
    lunch: [
      {
        id: 'sat_bir',
        name: 'Veg Biriyani & Raitha',
        tamil: 'வெஜ் பிரியாணி & ரைத்தா',
        category: 'Biriyani',
        price: 140,
        isVeg: true,
        imageId: 'veg_brinji',
      },
      {
        id: 'sat_cr',
        name: 'Curd Rice & Pickle',
        tamil: 'தயிர் சாதம் & ஊறுகாய்',
        category: 'Curd Rice',
        price: 60,
        isVeg: true,
        imageId: 'curd_rice_urulai',
      },
      {
        id: 'sat_vr',
        name: 'Coconut Rice',
        tamil: 'தேங்காய் சாதம்',
        category: 'Variety Rice',
        price: 60,
        isVeg: true,
        imageId: 'coconut_rice',
      },
      PONNI_RICE('sat'),
      {
        id: 'sat_sam',
        name: 'Kadamba Sambar',
        tamil: 'கடம்ப சாம்பார்',
        category: 'Sambar',
        price: 30,
        isVeg: true,
        imageId: 'kadamba_sambar',
      },
      PARUPPU_RASAM('sat'),
      {
        id: 'sat_kuz',
        name: 'Bondu Mor Kuzhambu',
        tamil: 'பொண்டு மோர் குழம்பு',
        category: 'Kuzhambu',
        price: 40,
        isVeg: true,
        imageId: 'bonda_vathal_kuzhambu',
      },
      URULAI_VARUVAL('sat'),
      {
        id: 'sat_por',
        name: 'Capsicum Porival',
        tamil: 'குடமிளகாய் பொரியல்',
        category: 'Porival',
        price: 30,
        isVeg: true,
        imageId: 'capsicum_poriyal',
      },
      SIRU_KEERAI('sat'),
    ],
    dinner: dinnerItems('sat'),
  },

  Sunday: {
    lunch: [
      {
        id: 'sun_bir',
        name: 'Seeraga Samba Veg Biriyani',
        tamil: 'சீரக சம்பா வெஜ் பிரியாணி',
        category: 'Biriyani',
        price: 120,
        isVeg: true,
        imageId: 'seeraga_samba_veg_biryani',
      },
      {
        id: 'sun_cr',
        name: 'Curd Rice & Pickle',
        tamil: 'தயிர் சாதம் & ஊறுகாய்',
        category: 'Curd Rice',
        price: 60,
        isVeg: true,
        imageId: 'curd_rice_urulai',
      },
      {
        id: 'sun_vr',
        name: 'Sambar Rice',
        tamil: 'சாம்பார் சாதம்',
        category: 'Variety Rice',
        price: 60,
        isVeg: true,
        imageId: 'sambar_rice',
      },
      PONNI_RICE('sun'),
      {
        id: 'sun_sam',
        name: 'Muhing Sambar',
        tamil: 'முளைகட்டிய பயறு சாம்பார்',
        category: 'Sambar',
        price: 30,
        isVeg: true,
        imageId: 'mullangi_sambar',
      },
      PARUPPU_RASAM('sun'),
      {
        id: 'sun_kuz',
        name: 'Sundakkai Vatha Kuzhambu',
        tamil: 'சுண்டைக்காய் வத்த குழம்பு',
        category: 'Kuzhambu',
        price: 40,
        isVeg: true,
        imageId: 'sundakkai_vatha_kuzhambu',
      },
      URULAI_VARUVAL('sun'),
      {
        id: 'sun_por',
        name: 'Mixed Veg Porival',
        tamil: 'கலவை காய்கறி பொரியல்',
        category: 'Porival',
        price: 30,
        isVeg: true,
        imageId: 'mixed_veg_poriyal',
      },
      SIRU_KEERAI('sun'),
    ],
    dinner: dinnerItems('sun'),
  },
};

// ─── Helper: convert DailyItem → MenuItem (for cart compatibility) ────────────

export function dailyItemToMenuItem(
  item: DailyItem,
  day: string,
  meal: 'lunch' | 'dinner'
): MenuItem {
  return {
    id: item.id,
    name: item.name,
    tamil: item.tamil,
    description: `${item.category} · ${day} ${
      meal === 'lunch' ? 'Lunch' : 'Dinner'
    }`,
    price: item.price,
    // Dynamically grabs the image based on the new imageId property
    image: `/images/${item.imageId}.png`,
    category: item.category.toLowerCase().replace(/\s+/g, '-'),
    spicy: 1,
    isVeg: item.isVeg,
  };
}

export function dosaiToMenuItem(d: DosaiVariety): MenuItem {
  return {
    id: d.id,
    name: `${d.name} (${d.serves})`,
    tamil: d.tamil,
    description: d.description,
    price: d.price,
    // Dynamically grabs the dosai image
    image: `/images/${d.imageId}.png`,
    category: 'dosai',
    spicy: 1,
    isVeg: true,
  };
}

// ─── All-items flat list (for "All Items" tab) ────────────────────────────────

export function getAllItems(): {
  day: DayName;
  meal: 'lunch' | 'dinner';
  item: DailyItem;
}[] {
  const result: { day: DayName; meal: 'lunch' | 'dinner'; item: DailyItem }[] =
    [];

  for (const day of DAY_NAMES) {
    for (const item of WEEKLY_MENU[day].lunch) {
      result.push({ day, meal: 'lunch', item });
    }

    for (const item of WEEKLY_MENU[day].dinner) {
      result.push({ day, meal: 'dinner', item });
    }
  }

  return result;
}
