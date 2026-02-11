import { useState } from 'react';
import { MapPin, Award, Leaf, Warehouse, Truck, Calendar, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CropListing } from '@/data/mockData';

interface CropListingCardProps {
  listing: CropListing;
  showReserve?: boolean;
  onReserve?: (id: string, qty: number) => void;
}

const gradeColors: Record<string, string> = {
  A: 'bg-success/15 text-success',
  B: 'bg-warning/15 text-warning',
  C: 'bg-earth/15 text-earth',
};

const cropEmoji: Record<string, string> = {
  Rice: '🌾',
  Maize: '🌽',
  Wheat: '🌿',
  Potato: '🥔',
  Millet: '🫘',
};

const CropListingCard = ({ listing, showReserve = false, onReserve }: CropListingCardProps) => {
  const [showLogistics, setShowLogistics] = useState(false);
  const [reserveQty, setReserveQty] = useState('');
  const available = listing.quantityKg - listing.reservedKg;
  const reservedPct = (listing.reservedKg / listing.quantityKg) * 100;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elevated"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{cropEmoji[listing.crop]}</span>
          <div>
            <h3 className="font-serif text-lg text-card-foreground">
              {listing.crop} — {listing.variety}
            </h3>
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {listing.location}, {listing.district}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {listing.isTopMatch && (
            <span className="flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success animate-pulse-gentle">
              <ShieldCheck className="h-3.5 w-3.5" /> Top Match
            </span>
          )}
          <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${gradeColors[listing.grade]}`}>
            Grade {listing.grade}
          </span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Leaf className="h-3.5 w-3.5 flex-shrink-0" />
          {listing.pesticideProfile}
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Warehouse className="h-3.5 w-3.5 flex-shrink-0" />
          {listing.storageCondition}
        </div>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
          {listing.availableFrom.slice(5)}
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Price</p>
          <p className="font-serif text-xl text-foreground">NPR {listing.pricePerKg}<span className="text-sm text-muted-foreground">/kg</span></p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Available</p>
          <p className="text-sm font-semibold text-foreground">{available.toLocaleString()} kg</p>
        </div>
      </div>

      {/* Quantity Progress */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{listing.reservedKg.toLocaleString()} kg reserved</span>
          <span>{Math.round(reservedPct)}%</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${reservedPct}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full rounded-full bg-primary"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setShowLogistics(!showLogistics)}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <Truck className="h-4 w-4" />
          Logistics Quote
        </button>

        {showReserve && (
          <div className="flex flex-1 gap-1.5">
            <input
              type="number"
              placeholder="Qty (kg)"
              value={reserveQty}
              onChange={(e) => setReserveQty(e.target.value)}
              className="w-0 flex-1 rounded-lg border border-input bg-background px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={() => {
                const qty = parseInt(reserveQty);
                if (qty > 0 && qty <= available && onReserve) {
                  onReserve(listing.id, qty);
                  setReserveQty('');
                }
              }}
              className="rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90"
            >
              Reserve
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {showLogistics && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="text-sm font-semibold text-foreground">Logistics Estimate</h4>
              <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Origin</p>
                  <p className="font-medium text-foreground">{listing.location}, {listing.district}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Transport Mode</p>
                  <p className="font-medium text-foreground">Road (Truck)</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Est. Cost</p>
                  <p className="font-medium text-foreground">NPR {Math.round(available * 2.5).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Est. Transit</p>
                  <p className="font-medium text-foreground">2-4 days</p>
                </div>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                * Estimates are indicative. Final quote depends on destination and load.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CropListingCard;
