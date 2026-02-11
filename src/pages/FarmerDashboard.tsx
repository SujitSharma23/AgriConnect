import { motion } from 'framer-motion';
import { Sprout, Package, TrendingUp, Plus } from 'lucide-react';
import HarvestPredictor from '@/components/HarvestPredictor';
import YieldEstimator from '@/components/YieldEstimator';
import CropListingCard from '@/components/CropListingCard';
import { mockListings } from '@/data/mockData';

const myListings = mockListings.slice(0, 3);

const FarmerDashboard = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-3xl text-foreground">Farmer Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your crops, predict harvests, and track your listings.
        </p>
      </motion.div>

      {/* Quick Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Sprout, label: 'Active Listings', value: '3', color: 'bg-primary/10 text-primary' },
          { icon: Package, label: 'Total Reserved', value: '5,500 kg', color: 'bg-secondary/20 text-secondary' },
          { icon: TrendingUp, label: 'Revenue (Est.)', value: 'NPR 185K', color: 'bg-success/10 text-success' },
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

      {/* Tools */}
      <div className="grid gap-6 lg:grid-cols-2">
        <HarvestPredictor />
        <YieldEstimator />
      </div>

      {/* Add New Listing Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10 rounded-xl border border-border bg-card p-6 shadow-soft"
      >
        <div className="mb-4 flex items-center gap-2">
          <Plus className="h-5 w-5 text-primary" />
          <h2 className="font-serif text-2xl text-foreground">Add New Listing</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input
            type="text"
            placeholder="Crop Name"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="number"
            placeholder="Quantity (kg)"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <input
            type="number"
            placeholder="Price per kg"
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
          />
          <button className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
            <Plus className="h-4 w-4" />
            Add Listing
          </button>
        </div>
      </motion.div>

      {/* My Listings */}
      <div className="mt-8">
        <h2 className="mb-4 font-serif text-2xl text-foreground">My Listings</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myListings.map((listing) => (
            <CropListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard;
