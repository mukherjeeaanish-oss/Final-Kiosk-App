import { useState, useMemo } from 'react';
import { CalendarDays, Sun, Moon, Leaf, Plus, Minus } from 'lucide-react';
import {
  WEEKLY_MENU,
  DAY_NAMES,
  CATEGORY_EMOJI,
  LUNCH_CATEGORY_ORDER,
  DINNER_CATEGORY_ORDER,
  dailyItemToMenuItem,
  type DailyItem,
  type DayName,
} from './weeklyMenuData';
import { DosaiSection } from './DosaiSection';
import type { MenuItem } from './menuData';

const today = new Date().toLocaleDateString('en-US', {
  weekday: 'long',
}) as DayName;

type CartItem = MenuItem & { qty: number };
type Props = {
  cart: CartItem[];
  onAdd: (item: MenuItem) => void;
  onRemove: (id: string) => void;
  onSound: () => void;
};

export function WeeklyMenuView({ cart, onAdd, onRemove, onSound }: Props) {
  const [selectedDay, setSelectedDay] = useState<DayName>(today);
  const [meal, setMeal] = useState<'lunch' | 'dinner'>('lunch');

  const dayMenu = WEEKLY_MENU[selectedDay];
  const items = meal === 'lunch' ? dayMenu.lunch : dayMenu.dinner;
  const categoryOrder =
    meal === 'lunch' ? LUNCH_CATEGORY_ORDER : DINNER_CATEGORY_ORDER;

  const grouped = useMemo(() => {
    const map: Record<string, DailyItem[]> = {};
    items.forEach((i) => {
      if (!map[i.category]) map[i.category] = [];
      map[i.category].push(i);
    });
    return categoryOrder
      .filter((c) => map[c])
      .map((c) => ({ category: c, items: map[c] }));
  }, [items, categoryOrder]);

  return (
    <div className="flex flex-col gap-4 bg-[#1a0f07] min-h-screen text-[#e5a060] font-sans pb-20">
      {/* Day Selector */}
      <div className="rounded-xl bg-[#2a1b0d] p-4 border border-[#4a321a] mx-4 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays size={16} className="text-[#e5a060]" />
          <span className="text-[#e5a060] font-black text-xs tracking-wider">
            SELECT DAY
          </span>
          <span className="bg-[#d34c19] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
            TODAY
          </span>
        </div>

        <div className="flex gap-2">
          {DAY_NAMES.map((day) => {
            const isSelected = selectedDay === day;
            const isToday = day === today;

            const bgColor = isSelected
              ? 'bg-[#d34c19]'
              : isToday
              ? 'bg-[#2a1b0d]'
              : 'bg-[#3d2715]';
            const borderColor = isSelected
              ? 'border-yellow-400'
              : isToday
              ? 'border-orange-500'
              : 'border-transparent';
            const textColor = isSelected ? 'text-yellow-400' : 'text-white';
            const dotColor =
              isSelected && isToday ? 'bg-yellow-400' : 'bg-orange-500';

            return (
              <button
                key={day}
                onClick={() => {
                  onSound();
                  setSelectedDay(day);
                }}
                className={`flex flex-col items-center justify-center flex-1 py-3 rounded-lg transition-all border ${bgColor} ${borderColor}`}
              >
                <span className={`${textColor} text-xs font-black`}>
                  {day.slice(0, 3)}
                </span>
                {isToday && (
                  <div className={`w-1 h-1 ${dotColor} rounded-full mt-1`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Meal Toggle */}
      <div className="flex bg-[#2a1b0d] p-1 rounded-lg border border-[#4a321a] mx-4">
        <button
          onClick={() => {
            onSound();
            setMeal('lunch');
          }}
          className={`flex-1 py-3 rounded-md font-black text-sm flex items-center justify-center gap-2 transition-all ${
            meal === 'lunch' ? 'bg-[#d34c19] text-white' : 'text-[#e5a060]'
          }`}
        >
          <span>☼ ☀️</span> Lunch Menu
        </button>
        <button
          onClick={() => {
            onSound();
            setMeal('dinner');
          }}
          className={`flex-1 py-3 rounded-md font-black text-sm flex items-center justify-center gap-2 transition-all ${
            meal === 'dinner' ? 'bg-[#d34c19] text-white' : 'text-[#e5a060]'
          }`}
        >
          <span>☽ 🌙</span> Dinner Menu
        </button>
      </div>

      {/* Divider with Line */}
      <div className="flex items-center gap-3 px-4 my-2">
        <div className="h-px flex-1 bg-[#4a321a]" />
        <span className="text-[#e5a060] text-xs font-black tracking-widest uppercase whitespace-nowrap">
          {selectedDay} · {meal === 'lunch' ? 'Lunch' : 'Dinner'}
        </span>
        <div className="h-px flex-1 bg-[#4a321a]" />
      </div>

      {/* Menu Items Grouped in Rounded Boxes */}
      <div className="flex flex-col gap-4 px-4">
        {grouped.map(({ category, items: catItems }) => (
          <div
            key={category}
            className="rounded-xl bg-[#2a1b0d] border border-[#4a321a] overflow-hidden"
          >
            <div className="px-4 py-3 flex items-center gap-2 bg-[#2a1b0d]">
              <span className="text-lg">{CATEGORY_EMOJI[category]}</span>
              <span className="font-black text-[#e5a060] text-sm tracking-wide">
                {category}
              </span>
            </div>

            {catItems.map((item) => {
              const qty = cart.find((c: any) => c.id === item.id)?.qty ?? 0;
              const menuItem = dailyItemToMenuItem(item, selectedDay, meal);
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between px-4 py-3 bg-[#1a0f07] border-t border-[#4a321a]"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <Leaf
                        size={11}
                        className={
                          item.isVeg ? 'text-green-500' : 'text-red-500'
                        }
                      />
                      <span className="text-white font-black text-sm">
                        {item.name}
                      </span>
                    </div>
                    {/* Tamil text exactly below */}
                    <div className="text-[10px] text-[#e5a060] opacity-70 ml-[19px] mt-0.5">
                      {item.tamil}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[#e5a060] font-black text-sm">
                      ₹{item.price}
                    </span>

                    {qty === 0 ? (
                      <button
                        onClick={() => onAdd(menuItem)}
                        className="bg-[#d34c19] hover:bg-orange-700 text-white px-4 py-1.5 rounded-lg text-xs font-black flex items-center gap-1"
                      >
                        <Plus size={12} /> ADD
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onRemove(item.id)}
                          className="w-7 h-7 flex items-center justify-center bg-[#2a1b0d] text-white rounded-lg border border-[#4a321a]"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-black text-white text-sm w-4 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => onAdd(menuItem)}
                          className="w-7 h-7 flex items-center justify-center bg-[#d34c19] text-white rounded-lg"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <DosaiSection cart={cart} onAdd={onAdd} onRemove={onRemove} />
    </div>
  );
}
