import React from 'react';
import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  CalendarDays,
  LayoutList,
  Leaf,
  Plus,
  Minus,
} from 'lucide-react';
import { Cart } from './components/Cart';
import { OrderSuccess } from './components/OrderSuccess';
import { WeeklyMenuView } from './components/WeeklyMenuView';
import { DosaiSection } from './components/DosaiSection';
import { useSoundEffects } from './components/useSoundEffects';
import {
  WEEKLY_MENU,
  DAY_NAMES,
  LUNCH_CATEGORY_ORDER,
  DINNER_CATEGORY_ORDER,
  CATEGORY_EMOJI,
  dailyItemToMenuItem,
} from './components/weeklyMenuData';
import type { MenuItem } from './components/menuData';

type CartItem = MenuItem & { qty: number };
type AppTab = 'today' | 'all';

const TODAY_IDX = new Date().getDay();
const TODAY_NAME = DAY_NAMES[TODAY_IDX];

// All Items view
function AllItemsView({
  cart,
  onAdd,
  onRemove,
}: {
  cart: CartItem[];
  onAdd: (item: MenuItem) => void;
  onRemove: (id: string) => void;
}) {
  const [expandedDay, setExpandedDay] = useState<string | null>(TODAY_NAME);
  const [expandedMeal, setExpandedMeal] = useState<
    Record<string, 'lunch' | 'dinner'>
  >({});

  function getMeal(day: string): 'lunch' | 'dinner' {
    return expandedMeal[day] ?? 'lunch';
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        className="px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2"
        style={{ background: 'var(--muted)', color: 'var(--muted-foreground)' }}
      >
        <LayoutList size={15} style={{ color: 'var(--secondary)' }} />
        All menu items for every day of the week · Tap a day to browse
      </div>

      {DAY_NAMES.map((day) => {
        const isOpen = expandedDay === day;
        const isToday = day === TODAY_NAME;
        const meal = getMeal(day);
        const dayMenu = WEEKLY_MENU[day];
        const items = meal === 'lunch' ? dayMenu.lunch : dayMenu.dinner;
        const categoryOrder =
          meal === 'lunch'
            ? (LUNCH_CATEGORY_ORDER as string[])
            : (DINNER_CATEGORY_ORDER as string[]);

        const grouped = categoryOrder
          .map((cat) => ({
            cat,
            items: items.filter((i) => i.category === cat),
          }))
          .filter(({ items: its }) => its.length > 0);

        return (
          <div
            key={day}
            className="rounded-2xl overflow-hidden"
            style={{
              border: isOpen
                ? '2px solid var(--secondary)'
                : '2px solid var(--border)',
            }}
          >
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => setExpandedDay(isOpen ? null : day)}
              className="w-full flex items-center justify-between px-5 py-4"
              style={{
                background: isOpen
                  ? 'linear-gradient(90deg, #8b1a00 0%, #2d1100 100%)'
                  : 'var(--card)',
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="font-black text-base"
                  style={{ color: isOpen ? '#fff' : 'var(--foreground)' }}
                >
                  {day}
                </div>
                {isToday && (
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-black"
                    style={{ background: 'var(--primary)', color: '#fff' }}
                  >
                    TODAY
                  </span>
                )}
              </div>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  color: isOpen
                    ? 'var(--secondary)'
                    : 'var(--muted-foreground)',
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                ▾
              </motion.span>
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key={day + '-body'}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ overflow: 'hidden', background: 'var(--card)' }}
                >
                  <div className="px-4 pt-3 pb-2">
                    <div
                      className="flex p-1 rounded-xl gap-1"
                      style={{ background: 'var(--muted)' }}
                    >
                      {(['lunch', 'dinner'] as const).map((t) => (
                        <motion.button
                          key={t}
                          whileTap={{ scale: 0.95 }}
                          onClick={() =>
                            setExpandedMeal((prev) => ({ ...prev, [day]: t }))
                          }
                          className="flex-1 py-2 rounded-lg font-black text-xs flex items-center justify-center gap-1"
                          style={{
                            background:
                              meal === t ? 'var(--primary)' : 'transparent',
                            color:
                              meal === t ? '#fff' : 'var(--muted-foreground)',
                            transition: 'all 0.13s',
                          }}
                        >
                          {t === 'lunch' ? '☀️' : '🌙'}{' '}
                          {t === 'lunch' ? 'Lunch' : 'Dinner'}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="px-4 pb-4 flex flex-col gap-2">
                    {grouped.map(({ cat, items: catItems }) => (
                      <div
                        key={cat}
                        className="rounded-xl overflow-hidden"
                        style={{ border: '1.5px solid var(--border)' }}
                      >
                        <div
                          className="px-3 py-2 flex items-center gap-2"
                          style={{
                            background: 'var(--muted)',
                            borderBottom: '1px solid var(--border)',
                          }}
                        >
                          <span>{CATEGORY_EMOJI[cat] ?? '🍽️'}</span>
                          <span
                            className="font-black text-xs"
                            style={{ color: 'var(--secondary)' }}
                          >
                            {cat}
                          </span>
                        </div>
                        {catItems.map((item, idx) => {
                          const qty =
                            cart.find((c) => c.id === item.id)?.qty ?? 0;
                          const menuItem = dailyItemToMenuItem(item, day, meal);
                          return (
                            <div
                              key={item.id}
                              className="flex items-center justify-between px-3 py-2.5 gap-2"
                              style={
                                idx > 0
                                  ? { borderTop: '1px solid var(--border)' }
                                  : {}
                              }
                            >
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <Leaf
                                    size={10}
                                    style={{
                                      color: item.isVeg ? '#22c55e' : '#ef4444',
                                      flexShrink: 0,
                                    }}
                                  />
                                  <span
                                    className="font-black text-sm leading-tight"
                                    style={{ color: 'var(--foreground)' }}
                                  >
                                    {item.name}
                                  </span>
                                </div>
                                <div
                                  className="text-xs ml-4 mt-0.5"
                                  style={{ color: 'var(--muted-foreground)' }}
                                >
                                  {item.tamil}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <span
                                  className="font-black text-sm"
                                  style={{ color: 'var(--secondary)' }}
                                >
                                  ₹{item.price}
                                </span>
                                {qty === 0 ? (
                                  <motion.button
                                    whileTap={{ scale: 0.88 }}
                                    onClick={() => onAdd(menuItem)}
                                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg font-black text-xs"
                                    style={{
                                      background: 'var(--primary)',
                                      color: '#fff',
                                    }}
                                  >
                                    <Plus size={11} /> ADD
                                  </motion.button>
                                ) : (
                                  <div className="flex items-center gap-1.5">
                                    <motion.button
                                      whileTap={{ scale: 0.85 }}
                                      onClick={() => onRemove(item.id)}
                                      className="w-7 h-7 flex items-center justify-center rounded-lg"
                                      style={{
                                        background: 'var(--muted)',
                                        color: 'var(--foreground)',
                                      }}
                                    >
                                      <Minus size={12} />
                                    </motion.button>
                                    <span
                                      className="font-black text-sm w-4 text-center"
                                      style={{ color: 'var(--secondary)' }}
                                    >
                                      {qty}
                                    </span>
                                    <motion.button
                                      whileTap={{ scale: 0.85 }}
                                      onClick={() => onAdd(menuItem)}
                                      className="w-7 h-7 flex items-center justify-center rounded-lg"
                                      style={{
                                        background: 'var(--primary)',
                                        color: '#fff',
                                      }}
                                    >
                                      <Plus size={12} />
                                    </motion.button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState<AppTab>('today');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);
  const [lastOrderTotal, setLastOrderTotal] = useState(0);

  const sounds = useSoundEffects();

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleAdd = useCallback(
    (item: MenuItem) => {
      sounds.playAddToCart();
      setCart((prev) => {
        const existing = prev.find((c) => c.id === item.id);
        if (existing)
          return prev.map((c) =>
            c.id === item.id ? { ...c, qty: c.qty + 1 } : c
          );
        return [...prev, { ...item, qty: 1 }];
      });
    },
    [sounds]
  );

  const handleRemove = useCallback(
    (id: string) => {
      sounds.playRemoveFromCart();
      setCart((prev) => {
        const existing = prev.find((c) => c.id === id);
        if (!existing) return prev;
        if (existing.qty === 1) return prev.filter((c) => c.id !== id);
        return prev.map((c) => (c.id === id ? { ...c, qty: c.qty - 1 } : c));
      });
    },
    [sounds]
  );

  const handleCartOpen = useCallback(() => {
    sounds.playTap();
    setCartOpen(true);
  }, [sounds]);

  const handleTabSwitch = useCallback(
    (tab: AppTab) => {
      sounds.playCategorySelect();
      setActiveTab(tab);
    },
    [sounds]
  );

  const handlePlaceOrder = useCallback(() => {
    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    setLastOrderTotal(total);
    setOrderNumber(Math.floor(Math.random() * 900) + 100);
    sounds.playOrderPlaced();
    setCartOpen(false);
    setOrderSuccess(true);
  }, [cart, sounds]);

  const handleOrderDone = useCallback(() => {
    sounds.playTap();
    setOrderSuccess(false);
    setCart([]);
    setActiveTab('today');
  }, [sounds]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'var(--background)',
        fontFamily: "'Nunito', sans-serif",
        userSelect: 'none',
      }}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-30 flex items-center justify-between px-5 py-3"
        style={{
          background: 'var(--card)',
          borderBottom: '2px solid var(--border)',
        }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{ background: '#d34c19' }}
            >
              🍛
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-xl font-black text-[#ffb020] tracking-tight leading-none mb-1">
                GAMA GAMA
              </h1>
              <p className="text-[10px] font-bold text-[#e5a060] opacity-80 tracking-widest leading-none">
                BIRIYANI · CHENNAI
              </p>
            </div>
          </div>

          {/* Pill Button for Day */}
          <div className="border border-[#4a321a] bg-transparent px-3 py-1.5 rounded-full flex items-center gap-2">
            <CalendarDays size={14} className="text-[#e5a060]" />
            <span className="text-[#e5a060] font-black text-xs">
              {TODAY_NAME}
            </span>
          </div>
        </div>

        {/* Cart Button */}
        <motion.button
          whileTap={{ scale: 0.93 }}
          onClick={handleCartOpen}
          className="relative flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-sm flex-shrink-0 z-10"
          style={{ background: '#d34c19', color: '#fff' }}
        >
          <ShoppingBag size={18} />
          <span>Cart</span>

          {/* Yellow Cloud Badge */}
          {cartCount > 0 && (
            <motion.span
              key={cartCount}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black shadow-md z-50"
              style={{
                background: 'yellow',
                color: '#442200',
              }}
            >
              {cartCount}
            </motion.span>
          )}
        </motion.button>
      </header>

      {/* ── Hero Banner ────────────────────────────────────────── */}
      <div
        className="relative overflow-hidden flex items-center px-6 py-5"
        style={{
          background:
            'linear-gradient(135deg, #c8360a 0%, #8b1a00 50%, #1a0a00 100%)',
          minHeight: 105,
        }}
      >
        <div
          className="absolute left-0 top-0 bottom-0 w-14 opacity-10 pointer-events-none"
          style={{
            background:
              'repeating-linear-gradient(45deg, #f5a623 0px, transparent 2px, transparent 14px, #f5a623 16px)',
          }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-14 opacity-10 pointer-events-none"
          style={{
            background:
              'repeating-linear-gradient(-45deg, #f5a623 0px, transparent 2px, transparent 14px, #f5a623 16px)',
          }}
        />
        <div className="absolute right-0 top-0 bottom-0 w-2/5 opacity-15 pointer-events-none">
          <img
            src="https://content.jdmagicbox.com/v2/comp/chennai/n6/044pxx44.xx44.191212210702.e9n6/catalogue/maharaja-thali-aminjikarai-chennai-restaurants-0co2hj1v8e.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10">
          <div
            className="font-black leading-tight"
            style={{ color: '#fff', fontSize: 26 }}
          >
            Authentic Chennai Cuisine
          </div>
          <div
            className="font-bold mt-0.5"
            style={{ color: 'var(--secondary)', fontSize: 13 }}
          >
            சென்னையின் சுவையான பிரியாணி · Freshly cooked, every batch
          </div>
          <div
            className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black"
            style={{
              background: 'rgba(245,166,35,0.18)',
              border: '1px solid var(--secondary)',
              color: 'var(--secondary)',
            }}
          >
            📍 {TODAY_NAME}'s Menu is Live
          </div>
        </div>
      </div>

      {/* ── Tab Bar ────────────────────────────────────────────── */}
      <div
        className="sticky z-20 px-4 py-3"
        style={{
          top: 64,
          background: 'var(--background)',
          borderBottom: '2px solid var(--border)',
        }}
      >
        <div
          className="flex gap-2 p-1.5 rounded-2xl"
          style={{ background: 'var(--muted)' }}
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => handleTabSwitch('today')}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm"
            style={{
              background:
                activeTab === 'today' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'today' ? '#fff' : 'var(--muted-foreground)',
              transition: 'all 0.15s',
            }}
          >
            <CalendarDays size={16} />
            Today's Menu
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => handleTabSwitch('all')}
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-sm"
            style={{
              background:
                activeTab === 'all' ? 'var(--primary)' : 'transparent',
              color: activeTab === 'all' ? '#fff' : 'var(--muted-foreground)',
              transition: 'all 0.15s',
            }}
          >
            <LayoutList size={16} />
            All Items
          </motion.button>
        </div>
      </div>

      <main className="flex-1 px-4 py-4">
        <AnimatePresence mode="wait">
          {activeTab === 'today' ? (
            <motion.div
              key="today"
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.2 }}
            >
              <WeeklyMenuView
                cart={cart}
                onAdd={handleAdd}
                onRemove={handleRemove}
                onSound={sounds.playCategorySelect}
              />
            </motion.div>
          ) : (
            <motion.div
              key="all"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.2 }}
            >
              <AllItemsView
                cart={cart}
                onAdd={handleAdd}
                onRemove={handleRemove}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {cartCount > 0 && !cartOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="sticky bottom-0 z-30 px-4 pb-4 pt-2"
            style={{ background: 'var(--background)' }}
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleCartOpen}
              className="w-full py-5 rounded-2xl font-black text-xl flex items-center justify-between px-6"
              style={{ background: 'var(--primary)', color: '#fff' }}
            >
              <span
                className="px-3 py-1 rounded-lg font-black"
                style={{ background: 'rgba(255,255,255,0.2)' }}
              >
                {cartCount} item{cartCount > 1 ? 's' : ''}
              </span>
              <span>VIEW ORDER</span>
              <span className="font-black">₹{cartTotal}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <Cart
        cart={cart}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onClear={() => {
          sounds.playTap();
          setCart([]);
        }}
        onPlaceOrder={handlePlaceOrder}
        open={cartOpen}
        onClose={() => {
          sounds.playTap();
          setCartOpen(false);
        }}
      />

      <OrderSuccess
        visible={orderSuccess}
        orderNumber={orderNumber}
        total={lastOrderTotal}
        onDone={handleOrderDone}
      />
    </div>
  );
}
