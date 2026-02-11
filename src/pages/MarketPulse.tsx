import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import SparkLine from '@/components/SparkLine';
import { marketRates } from '@/data/mockData';

const cropEmoji: Record<string, string> = {
  Rice: '🌾',
  Maize: '🌽',
  Wheat: '🌿',
  Potato: '🥔',
  Millet: '🫘',
};

const MarketPulse = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-3xl text-foreground">Market Pulse</h1>
        <p className="mt-1 text-muted-foreground">Current wholesale rates and 7-day trends across Nepal.</p>
      </motion.div>

      <div className="mt-8 overflow-hidden rounded-xl border border-border bg-card shadow-soft">
        <div className="grid grid-cols-5 gap-0 border-b border-border bg-muted/50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="col-span-2">Crop</span>
          <span>Price</span>
          <span>Change</span>
          <span>7-Day Trend</span>
        </div>

        {marketRates.map((rate, i) => {
          const positive = rate.change >= 0;
          return (
            <motion.div
              key={rate.crop}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="grid grid-cols-5 items-center gap-0 border-b border-border px-6 py-4 last:border-0"
            >
              <div className="col-span-2 flex items-center gap-3">
                <span className="text-2xl">{cropEmoji[rate.crop]}</span>
                <div>
                  <p className="font-medium text-foreground">{rate.crop}</p>
                  <p className="text-xs text-muted-foreground">Wholesale</p>
                </div>
              </div>
              <div>
                <p className="font-serif text-lg text-foreground">NPR {rate.pricePerKg}</p>
                <p className="text-xs text-muted-foreground">{rate.unit}</p>
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${positive ? 'text-success' : 'text-destructive'}`}>
                {positive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {positive ? '+' : ''}{rate.change}%
              </div>
              <div>
                <SparkLine data={rate.trend} positive={positive} />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-border bg-card p-6 shadow-soft">
        <h2 className="font-serif text-xl text-foreground">Market Summary</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Maize shows the strongest upward trend (+5.1%) driven by increased demand from poultry feed sector in the Terai region. 
          Rice prices continue steady climb with Basmati commanding premium rates. Potato prices have softened due to 
          above-average yields in Kailali and Morang districts. Millet demand remains robust in hill districts.
        </p>
        <p className="mt-3 text-xs text-muted-foreground">Last updated: February 11, 2026 • Source: Nepal Agricultural Market Information System</p>
      </div>
    </div>
  );
};

export default MarketPulse;
