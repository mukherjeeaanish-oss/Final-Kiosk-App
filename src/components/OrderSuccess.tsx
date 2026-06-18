import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

type Props = {
  visible: boolean;
  orderNumber: number;
  total: number;
  onDone: () => void;
};

export function OrderSuccess({ visible, orderNumber, total, onDone }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.92)' }}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.7, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            className="flex flex-col items-center gap-6 px-10 py-12 rounded-3xl text-center"
            style={{
              background: 'var(--card)',
              border: '3px solid var(--secondary)',
              maxWidth: 440,
              width: '90vw',
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.15, damping: 15 }}
            >
              <CheckCircle size={80} style={{ color: '#22c55e' }} />
            </motion.div>

            <div>
              <div
                className="font-black text-3xl"
                style={{ color: 'var(--foreground)' }}
              >
                Order Placed! 🎉
              </div>
              <div
                className="font-black mt-1"
                style={{ color: 'var(--muted-foreground)' }}
              >
                உங்கள் உத்தரவு வைக்கப்பட்டது
              </div>
            </div>

            <div
              className="w-full py-4 rounded-2xl"
              style={{ background: 'var(--muted)' }}
            >
              <div
                className="text-sm font-bold"
                style={{ color: 'var(--muted-foreground)' }}
              >
                ORDER NUMBER
              </div>
              <div
                className="font-black text-5xl mt-1"
                style={{ color: 'var(--secondary)' }}
              >
                #{orderNumber}
              </div>
              <div
                className="font-black text-xl mt-1"
                style={{ color: 'var(--foreground)' }}
              >
                ₹{total}
              </div>
            </div>

            <p
              className="font-bold"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Please collect your token & proceed to counter.
              <br />
              <span style={{ color: 'var(--secondary)' }}>
                Estimated time: 15–20 mins
              </span>
            </p>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={onDone}
              className="w-full py-5 rounded-2xl font-black text-xl"
              style={{
                background: 'var(--primary)',
                color: 'var(--primary-foreground)',
              }}
            >
              START NEW ORDER
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
