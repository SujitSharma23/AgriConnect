import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import CropListingCard from '@/components/CropListingCard';
import { mockListings } from '@/data/mockData';

const Marketplace = () => {
  const [search, setSearch] = useState('');
  const [listings, setListings] = useState(mockListings);

  const filtered = listings.filter((l) =>
    `${l.crop} ${l.variety} ${l.farmerName} ${l.location} ${l.district}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleReserve = (id: string, qty: number) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === id ? { ...l, reservedKg: Math.min(l.quantityKg, l.reservedKg + qty) } : l
      )
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-serif text-3xl text-foreground">Marketplace</h1>
        <p className="mt-1 text-muted-foreground">Browse all crop listings from across Nepal.</p>
      </motion.div>

      <div className="relative mt-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search crops, locations, farmers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((listing) => (
          <CropListingCard key={listing.id} listing={listing} showReserve onReserve={handleReserve} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No listings found.</p>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
