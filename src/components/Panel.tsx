import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function Panel({
  open,
  onClose,
  title,
  subtitle,
  children,
  wide,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close panel"
            onClick={onClose}
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ scale: 0.96, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, y: 16, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className={`glass-strong no-scrollbar relative max-h-[82vh] w-full overflow-y-auto rounded-[28px] p-6 sm:p-8 ${
              wide ? "sm:max-w-4xl" : "sm:max-w-xl"
            }`}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="font-display text-3xl tracking-wide text-flow-cream">{title}</h2>
                {subtitle && (
                  <p className="mt-1 text-sm text-white/55">{subtitle}</p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="shrink-0 rounded-full border border-white/15 p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}