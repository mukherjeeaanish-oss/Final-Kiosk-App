import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Minus, Plus, Trash2, X, ArrowLeft } from 'lucide-react';
import type { MenuItem } from './menuData';
import { useSoundEffects } from './useSoundEffects';

type CartItem = MenuItem & { qty: number };

type Props = {
  cart: CartItem[];
  onAdd: (item: MenuItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onPlaceOrder: () => void;
  open: boolean;
  onClose: () => void;
};

export function Cart({
  cart,
  onAdd,
  onRemove,
  onClear,
  onPlaceOrder,
  open,
  onClose,
}: Props) {
  const { playTap, playCategorySelect, playRemoveFromCart } = useSoundEffects();
  const [checkoutStep, setCheckoutStep] = useState<
    'items' | 'table' | 'payment'
  >('items');
  const [tableType, setTableType] = useState<'2' | '4' | 'family'>('2');
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const [bookedTables, setBookedTables] = useState<{
    '2': number[];
    '4': number[];
    family: number[];
  }>({
    '2': [],
    '4': [],
    family: [],
  });

  useEffect(() => {
    if (open) {
      setBookedTables({
        '2': [
          Math.floor(Math.random() * 5) + 1,
          Math.floor(Math.random() * 5) + 6,
        ],
        '4': [Math.floor(Math.random() * 6) + 1],
        family: [Math.floor(Math.random() * 3) + 1],
      });
      setTableType('2');
      setSelectedTable(null);
    }
  }, [open]);

  const tablesFor2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const tablesFor4 = [1, 2, 3, 4, 5, 6];
  const familyTables = [1, 2, 3];

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const getTablePrefix = (type: string) =>
    type === '2' ? 'T2-' : type === '4' ? 'T4-' : 'FAM-';

  const handleClose = () => {
    setCheckoutStep('items');
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70"
            onClick={handleClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 z-50 flex flex-col w-[min(420px,92vw)] bg-[var(--card)] border-l-2 border-[var(--border)]"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b-2 border-[var(--border)]">
              <div className="flex items-center gap-3">
                {checkoutStep !== 'items' && (
                  <button
                    onClick={() => {
                      playCategorySelect();
                      setCheckoutStep(
                        checkoutStep === 'payment' ? 'table' : 'items'
                      );
                    }}
                    className="p-1 rounded-lg bg-[var(--muted)] text-[var(--muted-foreground)]"
                  >
                    <ArrowLeft size={20} />
                  </button>
                )}
                <span className="font-black text-xl uppercase text-[var(--foreground)] tracking-wider">
                  {checkoutStep === 'items'
                    ? 'Your Order'
                    : checkoutStep === 'table'
                    ? 'Select Table'
                    : 'Payment'}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="text-[var(--muted-foreground)]"
              >
                <X size={22} />
              </button>
            </div>

            {checkoutStep === 'items' && (
              <>
                {cart.length === 0 ? (
                  /* Empty Cart View */
                  <div className="flex-1 flex flex-col items-center justify-center py-20 px-6 text-center">
                    <div className="text-6xl mb-4">🍽️</div>
                    <h3 className="text-white font-black text-lg">
                      Your cart is empty.
                    </h3>
                    <p className="text-[#e5a060] font-bold">
                      Add some delicious cuisine!
                    </p>
                  </div>
                ) : (
                  /* Filled Cart View */
                  <>
                    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 rounded-xl bg-[var(--muted)]"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-black text-sm text-[var(--foreground)]">
                              {item.name}
                            </div>
                            <div className="font-black text-[var(--secondary)]">
                              ₹{item.price * item.qty}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                playRemoveFromCart();
                                onRemove(item.id);
                              }}
                              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--card)] text-[var(--foreground)]"
                            >
                              {item.qty === 1 ? (
                                <Trash2 size={16} className="text-red-500" />
                              ) : (
                                <Minus size={16} />
                              )}
                            </button>
                            <span className="font-black w-6 text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => {
                                playTap();
                                onAdd(item);
                              }}
                              className="w-9 h-9 flex items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)]"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-4 py-4 border-t-2 border-[var(--border)]">
                      <button
                        onClick={() => {
                          playRemoveFromCart();
                          onClear();
                        }}
                        className="w-full py-2 mb-2 text-sm font-bold text-[var(--muted-foreground)] hover:text-red-500 transition-colors"
                      >
                        Clear Cart
                      </button>
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        onClick={() => {
                          playTap();
                          setCheckoutStep('table');
                        }}
                        className="w-full py-5 rounded-2xl font-black text-xl uppercase bg-[var(--primary)] text-[var(--primary-foreground)]"
                      >
                        Checkout · ₹{total}
                      </motion.button>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Table Selection and Payment Views remain the same */}
            {checkoutStep === 'table' && (
              <div className="flex-1 flex flex-col p-6 overflow-y-auto">
                <div className="flex gap-2 mb-6 justify-center">
                  {(['2', '4', 'family'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        playCategorySelect();
                        setTableType(type);
                        setSelectedTable(null);
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-black uppercase transition-all"
                      style={{
                        background:
                          tableType === type
                            ? 'var(--primary)'
                            : 'var(--muted)',
                        color:
                          tableType === type
                            ? 'var(--primary-foreground)'
                            : 'var(--muted-foreground)',
                      }}
                    >
                      {type === 'family' ? 'Family' : `Table for ${type}`}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {(tableType === '2'
                    ? tablesFor2
                    : tableType === '4'
                    ? tablesFor4
                    : familyTables
                  ).map((num) => {
                    const isBooked = bookedTables[tableType].includes(num);
                    const isSelected = selectedTable === num;
                    return (
                      <button
                        key={num}
                        disabled={isBooked}
                        onClick={() => {
                          playTap();
                          setSelectedTable(num);
                        }}
                        className="p-4 rounded-xl font-bold border-2 text-sm transition-all"
                        style={{
                          background: isBooked
                            ? 'var(--background)'
                            : isSelected
                            ? 'var(--primary)'
                            : 'var(--muted)',
                          borderColor: isSelected
                            ? 'var(--primary)'
                            : 'var(--border)',
                          color: isBooked
                            ? '#ef4444'
                            : isSelected
                            ? 'var(--primary-foreground)'
                            : 'var(--foreground)',
                        }}
                      >
                        {getTablePrefix(tableType)}
                        {num}
                      </button>
                    );
                  })}
                </div>
                <button
                  disabled={selectedTable === null}
                  onClick={() => {
                    playTap();
                    setCheckoutStep('payment');
                  }}
                  className="w-full py-5 rounded-2xl font-black text-xl tracking-wide uppercase bg-[var(--primary)] text-[var(--primary-foreground)]"
                >
                  Confirm Table
                </button>
              </div>
            )}

            {checkoutStep === 'payment' && (
              <div className="flex-1 flex flex-col p-6">
                <div className="flex flex-col gap-4 mb-6">
                  {[
                    'Cash on Delivery (COD)',
                    'UPI (GPay / PhonePe)',
                    'Credit / Debit Card',
                  ].map((method) => (
                    <button
                      key={method}
                      onClick={() => {
                        playCategorySelect();
                        setPaymentMethod(method);
                      }}
                      className="p-5 rounded-2xl border-2 text-left font-bold"
                      style={{
                        background:
                          paymentMethod === method
                            ? 'var(--primary)'
                            : 'var(--muted)',
                        borderColor:
                          paymentMethod === method
                            ? 'var(--primary)'
                            : 'var(--border)',
                        color:
                          paymentMethod === method
                            ? 'var(--primary-foreground)'
                            : 'var(--foreground)',
                      }}
                    >
                      {method}
                    </button>
                  ))}
                </div>
                <button
                  disabled={!paymentMethod}
                  onClick={() => {
                    onPlaceOrder();
                    setCheckoutStep('items');
                    setPaymentMethod('');
                  }}
                  className="w-full py-5 rounded-2xl font-black text-xl tracking-wide uppercase bg-orange-500 text-white"
                >
                  Place Final Order
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
