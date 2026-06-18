import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus, Utensils } from 'lucide-react';
import {
  DOSAI_VARIETIES,
  dosaiToMenuItem,
  type DosaiVariety,
} from './weeklyMenuData';
import type { MenuItem } from './menuData';

type CartItem = MenuItem & { qty: number };

type Props = {
  cart: CartItem[];
  onAdd: (item: MenuItem) => void;
  onRemove: (id: string) => void;
};

export function DosaiSection({ cart, onAdd, onRemove }: Props) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<DosaiVariety | null>(null);

  const cartQtyOf = (id: string) => cart.find((c) => c.id === id)?.qty ?? 0;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: '2px solid var(--secondary)' }}
    >
      {/* Toggle header */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4"
        style={{
          background: 'linear-gradient(90deg, #8b1a00 0%, #2d1100 100%)',
        }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
            style={{ background: 'var(--primary)' }}
          >
            🫓
          </div>
          <div className="text-left">
            <div className="font-black" style={{ color: '#fff', fontSize: 15 }}>
              Dosai — Add-On
            </div>
            <div
              className="text-xs font-bold"
              style={{ color: 'var(--secondary)' }}
            >
              தோசை · Available all day · Choose your type
            </div>
          </div>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22 }}
        >
          <ChevronDown size={22} style={{ color: 'var(--secondary)' }} />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="dosai-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden', background: 'var(--card)' }}
          >
            <div className="p-4 flex flex-col gap-4">
              {/* Dropdown selector */}
              <div>
                <label
                  className="block mb-1.5 font-black text-sm"
                  style={{ color: 'var(--secondary)' }}
                >
                  Choose Dosai Type:
                </label>
                <div className="relative">
                  <select
                    value={selected?.id ?? ''}
                    onChange={(e) => {
                      const found =
                        DOSAI_VARIETIES.find((d) => d.id === e.target.value) ??
                        null;
                      setSelected(found);
                    }}
                    className="w-full px-4 py-3 rounded-xl font-bold appearance-none pr-10"
                    style={{
                      background: 'var(--muted)',
                      color: selected
                        ? 'var(--foreground)'
                        : 'var(--muted-foreground)',
                      border: '2px solid var(--border)',
                      fontSize: 15,
                    }}
                  >
                    <option value="">— Select Dosai Type —</option>
                    {DOSAI_VARIETIES.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.serves}) · ₹{d.price}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: 'var(--secondary)' }}
                  />
                </div>
              </div>

              {/* Dosai cards */}
              <div
                className="grid gap-2"
                style={{
                  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                }}
              >
                {DOSAI_VARIETIES.map((d) => {
                  const qty = cartQtyOf(d.id);
                  const isSelected = selected?.id === d.id;
                  return (
                    <motion.div
                      key={d.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelected(d)}
                      className="p-3 rounded-xl cursor-pointer select-none"
                      style={{
                        background: isSelected
                          ? 'var(--primary)'
                          : 'var(--muted)',
                        border: isSelected
                          ? '2px solid var(--secondary)'
                          : '2px solid transparent',
                        transition: 'all 0.15s',
                      }}
                    >
                      <div
                        className="font-black text-sm leading-tight"
                        style={{
                          color: isSelected ? '#fff' : 'var(--foreground)',
                        }}
                      >
                        {d.name}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{
                          color: isSelected
                            ? 'rgba(255,255,255,0.65)'
                            : 'var(--muted-foreground)',
                        }}
                      >
                        {d.tamil} · {d.serves}
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span
                          className="font-black text-sm"
                          style={{ color: 'var(--secondary)' }}
                        >
                          ₹{d.price}
                        </span>
                        {qty === 0 ? (
                          <motion.button
                            whileTap={{ scale: 0.88 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onAdd(dosaiToMenuItem(d));
                            }}
                            className="flex items-center gap-1 px-2.5 py-1 rounded-lg font-black text-xs"
                            style={{
                              background: 'var(--primary)',
                              color: '#fff',
                            }}
                          >
                            <Plus size={11} /> ADD
                          </motion.button>
                        ) : (
                          <div
                            className="flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => onRemove(d.id)}
                              className="w-6 h-6 flex items-center justify-center rounded-lg"
                              style={{
                                background: 'rgba(255,255,255,0.18)',
                                color: '#fff',
                              }}
                            >
                              <Minus size={11} />
                            </motion.button>
                            <span
                              className="font-black text-sm w-4 text-center"
                              style={{
                                color: isSelected ? '#fff' : 'var(--secondary)',
                              }}
                            >
                              {qty}
                            </span>
                            <motion.button
                              whileTap={{ scale: 0.85 }}
                              onClick={() => onAdd(dosaiToMenuItem(d))}
                              className="w-6 h-6 flex items-center justify-center rounded-lg"
                              style={{
                                background: 'var(--primary)',
                                color: '#fff',
                              }}
                            >
                              <Plus size={11} />
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Selected dosai detail panel */}
              <AnimatePresence>
                {selected && (
                  <motion.div
                    key={selected.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="p-4 rounded-xl flex items-center justify-between gap-4"
                    style={{
                      background: 'var(--muted)',
                      border: '1.5px solid var(--border)',
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div
                        className="font-black text-sm"
                        style={{ color: 'var(--secondary)' }}
                      >
                        {selected.name}
                      </div>
                      <div
                        className="text-xs mt-0.5"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {selected.description} · {selected.serves} · ₹
                        {selected.price}
                      </div>
                    </div>
                    {cartQtyOf(selected.id) === 0 ? (
                      <motion.button
                        whileTap={{ scale: 0.93 }}
                        onClick={() => onAdd(dosaiToMenuItem(selected))}
                        className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-black text-sm flex-shrink-0"
                        style={{ background: 'var(--primary)', color: '#fff' }}
                      >
                        <Plus size={14} /> Add to Order
                      </motion.button>
                    ) : (
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <motion.button
                          whileTap={{ scale: 0.88 }}
                          onClick={() => onRemove(selected.id)}
                          className="w-9 h-9 flex items-center justify-center rounded-xl"
                          style={{
                            background: 'var(--card)',
                            color: 'var(--foreground)',
                          }}
                        >
                          <Minus size={15} />
                        </motion.button>
                        <span
                          className="font-black text-lg w-5 text-center"
                          style={{ color: 'var(--secondary)' }}
                        >
                          {cartQtyOf(selected.id)}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.88 }}
                          onClick={() => onAdd(dosaiToMenuItem(selected))}
                          className="w-9 h-9 flex items-center justify-center rounded-xl"
                          style={{
                            background: 'var(--primary)',
                            color: '#fff',
                          }}
                        >
                          <Plus size={15} />
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
