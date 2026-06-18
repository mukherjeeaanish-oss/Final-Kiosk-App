// Core type used by Cart, OrderSuccess, and all item lists
export type MenuItem = {
  id: string;
  name: string;
  tamil: string;
  description: string;
  price: number;
  image: string;
  category: string;
  spicy: number;
  isVeg: boolean;
  popular?: boolean;
};

// Kept empty — all menu items now come from weeklyMenuData.ts
export const MENU_ITEMS: MenuItem[] = [];
export const CATEGORIES: {
  id: string;
  label: string;
  tamil: string;
  emoji: string;
}[] = [];
