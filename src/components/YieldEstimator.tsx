import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { CropType } from '@/data/mockData';

const baseYields: Record<CropType, number> = {
  Rice: 4500,
  Maize: 3200,
  Wheat: 3800,
  Potato: 15000,
  Millet: 2000,
};

const soilQualities = [
  { label: 'Poor', multiplier: 0.6 },
  { label: 'Average', multiplier: 0.85 },
  { label: 'Good', multiplier: 1.0 },
  { label: 'Excellent', multiplier: 1.2 },
];

const crops: CropType[] = ['Rice', 'Maize', 'Wheat', 'Potato', 'Millet'];

const YieldEstimator = () => {
  const [crop, setCrop] = useState<CropType>('Rice');
  const [fieldSize, setFieldSize] = useState('1');
  const [soilIdx, setSoilIdx] = useState(2);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const size = parseFloat(fieldSize);
    if (isNaN(size) || size <= 0) return;
    const base = baseYields[crop];
    const multiplier = soilQualities[soilIdx].multiplier;
    setResult(Math.round(size * base * multiplier));
  };

  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-soft">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/20">
          <Calculator className="h-5 w-5 text-secondary" />
        </div>
        <div>
          <h3 className="font-serif text-lg text-card-foreground">Yield Estimator</h3>
          <p className="text-sm text-muted-foreground">Calculate expected yield with soil quality factor</p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Crop</label>
          <select
            value={crop}
            onChange={(e) => setCrop(e.target.value as CropType)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {crops.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Field Size (hectares)</label>
          <input
            type="number"
            min="0.1"
            step="0.1"
            value={fieldSize}
            onChange={(e) => setFieldSize(e.target.value)}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">Soil Quality</label>
          <select
            value={soilIdx}
            onChange={(e) => setSoilIdx(Number(e.target.value))}
            className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {soilQualities.map((s, i) => (
              <option key={i} value={i}>{s.label} (×{s.multiplier})</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={calculate}
        className="mt-5 w-full rounded-lg bg-secondary px-4 py-2.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/90"
      >
        Estimate Yield
      </button>

      {result !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-lg bg-harvest/10 p-4 text-center"
        >
          <p className="text-sm text-muted-foreground">Expected yield for {crop}</p>
          <p className="mt-1 font-serif text-3xl text-foreground">{result.toLocaleString()} <span className="text-lg text-muted-foreground">kg</span></p>
          <p className="mt-1 text-xs text-muted-foreground">
            Base: {baseYields[crop].toLocaleString()} kg/ha × {fieldSize} ha × {soilQualities[soilIdx].multiplier} ({soilQualities[soilIdx].label} soil)
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default YieldEstimator;
