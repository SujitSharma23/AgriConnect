import { useState } from 'react';
import { Calendar, CloudRain, Sun, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';
import { CropType, cropVarieties, cropGrowthDays } from '@/data/mockData';

const weatherAdjustments = [
  { label: 'Normal', days: 0, icon: Sun },
  { label: 'Unusual Cold', days: 5, icon: Thermometer },
  { label: 'Heavy Rain', days: 7, icon: CloudRain },
  { label: 'Drought', days: -3, icon: Sun },
  { label: 'Extended Monsoon', days: 10, icon: CloudRain },
];

const crops: CropType[] = ['Rice', 'Maize', 'Wheat', 'Potato', 'Millet'];

const HarvestPredictor = () => {
  const [crop, setCrop] = useState<CropType>('Rice');
  const [variety, setVariety] = useState(cropVarieties.Rice[0]);
  const [plantDate, setPlantDate] = useState('');
  const [weatherIdx, setWeatherIdx] = useState(0);
  const [result, setResult] = useState<string | null>(null);

  const predict = () => {
    if (!plantDate) return;
    const baseDays = cropGrowthDays[crop];
    const adjustment = weatherAdjustments[weatherIdx].days;
    const total = baseDays + adjustment;
    const start = new Date(plantDate);
    start.setDate(start.getDate() + total);
    setResult(start.toLocaleDateString('en-NP', { year: 'numeric', month: 'long', day: 'numeric' }));
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-serif text-lg text-card-foreground">Smart Harvest Predictor</h3>
          <p className="text-sm text-muted-foreground">Estimate your harvest date with weather adjustments</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Crop</label>
          <select
            value={crop}
            onChange={(e) => {
              const c = e.target.value as CropType;
              setCrop(c);
              setVariety(cropVarieties[c][0]);
            }}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {crops.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Variety</label>
          <select
            value={variety}
            onChange={(e) => setVariety(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {cropVarieties[crop].map((v) => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Plant Date</label>
          <input
            type="date"
            value={plantDate}
            onChange={(e) => setPlantDate(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Weather Adjustment</label>
          <select
            value={weatherIdx}
            onChange={(e) => setWeatherIdx(Number(e.target.value))}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {weatherAdjustments.map((w, i) => (
              <option key={i} value={i}>
                {w.label} ({w.days >= 0 ? '+' : ''}{w.days} days)
              </option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={predict}
        className="mt-5 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Predict Harvest Date
      </button>

      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg bg-success/10 p-4 text-center"
        >
          <p className="text-sm text-muted-foreground">Estimated harvest for {crop} ({variety})</p>
          <p className="mt-1 font-serif text-2xl text-success">{result}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Base: {cropGrowthDays[crop]} days | Adjustment: {weatherAdjustments[weatherIdx].days >= 0 ? '+' : ''}{weatherAdjustments[weatherIdx].days} days ({weatherAdjustments[weatherIdx].label})
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default HarvestPredictor;
