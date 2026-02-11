import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Building2, ShoppingCart, Filter } from 'lucide-react';
import CropListingCard from '@/components/CropListingCard';
import { mockListings, CropType } from '@/data/mockData';

const crops: (CropType | 'All')[] = ['All', 'Rice', 'Maize', 'Wheat', 'Potato', 'Millet'];
const grades = ['All', 'A', 'B', 'C'];
const pesticides = ['All', 'Organic', 'Low-Pesticide', 'Conventional'];
const storages = ['All', 'Cold Storage', 'Dry Warehouse', 'Open Air'];
const months = ['All', 'March', 'April', 'May', 'June', 'July', 'August'];

const BusinessDashboard = () => {
  const [search, setSearch] = useState('');
  const [requiredCrop, setRequiredCrop] = useState<CropType | 'All'>('All');
  const [gradeFilter, setGradeFilter] = useState('All');
  const [pesticideFilter, setPesticideFilter] = useState('All');
  const [storageFilter, setStorageFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [listings, setListings] = useState(mockListings);

  const filtered = useMemo(() => {
    return listings
      .map((l) => ({
        ...l,
        isTopMatch: requiredCrop !== 'All' && l.crop === requiredCrop,
      }))
      .filter((l) => {
        if (requiredCrop !== 'All' && l.crop !== requiredCrop && !search) return true;
        if (search && !`${l.crop} ${l.variety} ${l.farmerName} ${l.location}`.toLowerCase().includes(search.toLowerCase())) return false;
        if (requiredCrop !== 'All' && l.crop !== requiredCrop) return false;
        if (gradeFilter !== 'All' && l.grade !== gradeFilter) return false;
        if (pesticideFilter !== 'All' && l.pesticideProfile !== pesticideFilter) return false;
        if (storageFilter !== 'All' && l.storageCondition !== storageFilter) return false;
        if (monthFilter !== 'All') {
          const m = new Date(l.availableFrom).toLocaleString('en', { month: 'long' });
          if (m !== monthFilter) return false;
        }
        return true;
      })
      .sort((a, b) => (b.isTopMatch ? 1 : 0) - (a.isTopMatch ? 1 : 0));
  }, [listings, search, requiredCrop, gradeFilter, pesticideFilter, storageFilter, monthFilter]);

  const handleReserve = (id: string, qty: number) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, reservedKg: Math.min(l.quantityKg, l.reservedKg + qty) } : l
      )
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="font-serif text-3xl text-foreground">Business Dashboard</h1>
        <p className="mt-1 text-muted-foreground">Find and reserve crops from verified farmers across Nepal.</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Building2, label: 'Active Orders', value: '12', color: 'bg-primary/10 text-primary' },
          { icon: ShoppingCart, label: 'Reserved This Month', value: '4,200 kg', color: 'bg-secondary/20 text-secondary' },
          { icon: Search, label: 'Available Listings', value: String(mockListings.length), color: 'bg-accent/10 text-accent' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex items-center gap-4 rounded-xl border border-border bg-card p-5 shadow-soft"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="font-serif text-2xl text-card-foreground">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="mb-6 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search crops, varieties, locations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors ${
              showFilters ? 'border-primary bg-primary text-primary-foreground' : 'border-border text-foreground hover:bg-muted'
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            className="grid gap-3 rounded-xl border border-border bg-card p-4 sm:grid-cols-5"
          >
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Required Crop</label>
              <select value={requiredCrop} onChange={(e) => setRequiredCrop(e.target.value as CropType | 'All')} className="w-full rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground">
                {crops.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Grade</label>
              <select value={gradeFilter} onChange={(e) => setGradeFilter(e.target.value)} className="w-full rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground">
                {grades.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Pesticide Profile</label>
              <select value={pesticideFilter} onChange={(e) => setPesticideFilter(e.target.value)} className="w-full rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground">
                {pesticides.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Storage</label>
              <select value={storageFilter} onChange={(e) => setStorageFilter(e.target.value)} className="w-full rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground">
                {storages.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-muted-foreground">Available Month</label>
              <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} className="w-full rounded-lg border border-input bg-background px-2 py-2 text-sm text-foreground">
                {months.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Smart Match Info */}
      {requiredCrop !== 'All' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 rounded-lg bg-success/10 p-3 text-sm text-success"
        >
          🎯 Smart Match active — showing <strong>{requiredCrop}</strong> listings first as "Top Match"
        </motion.div>
      )}

      {/* Listings */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((listing) => (
          <CropListingCard key={listing.id} listing={listing} showReserve onReserve={handleReserve} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No listings match your filters. Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default BusinessDashboard;
