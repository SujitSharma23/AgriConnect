export type CropType = 'Rice' | 'Maize' | 'Wheat' | 'Potato' | 'Millet';

export interface CropListing {
  id: string;
  farmerId: string;
  farmerName: string;
  crop: CropType;
  variety: string;
  grade: 'A' | 'B' | 'C';
  pesticideProfile: 'Organic' | 'Low-Pesticide' | 'Conventional';
  storageCondition: 'Cold Storage' | 'Dry Warehouse' | 'Open Air';
  location: string;
  district: string;
  quantityKg: number;
  reservedKg: number;
  pricePerKg: number;
  harvestDate: string;
  availableFrom: string;
  availableTo: string;
  plantDate: string;
  isTopMatch?: boolean;
}

export interface MarketRate {
  crop: CropType;
  pricePerKg: number;
  change: number;
  trend: number[];
  unit: string;
}

export const nepaliLocations = [
  { district: 'Chitwan', location: 'Bharatpur' },
  { district: 'Kaski', location: 'Pokhara' },
  { district: 'Rupandehi', location: 'Butwal' },
  { district: 'Morang', location: 'Biratnagar' },
  { district: 'Jhapa', location: 'Birtamod' },
  { district: 'Sunsari', location: 'Dharan' },
  { district: 'Bara', location: 'Kalaiya' },
  { district: 'Parsa', location: 'Birgunj' },
  { district: 'Banke', location: 'Nepalgunj' },
  { district: 'Kailali', location: 'Dhangadhi' },
  { district: 'Dang', location: 'Ghorahi' },
  { district: 'Kapilvastu', location: 'Taulihawa' },
];

export const cropVarieties: Record<CropType, string[]> = {
  Rice: ['Basmati', 'Mansuli', 'Radha-4', 'Sabitri', 'Hardinath-1'],
  Maize: ['Rampur Composite', 'Arun-2', 'Manakamana-3', 'Deuti'],
  Wheat: ['NL-971', 'Vijay', 'Gautam', 'Aditya'],
  Potato: ['Janakdev', 'Kufri Jyoti', 'Cardinal', 'Desiree'],
  Millet: ['Dalle', 'Okhle', 'Kabre Kodo-1', 'Sailung'],
};

export const cropGrowthDays: Record<CropType, number> = {
  Rice: 120,
  Maize: 90,
  Wheat: 110,
  Potato: 80,
  Millet: 100,
};

export const mockListings: CropListing[] = [
  {
    id: '1', farmerId: 'f1', farmerName: 'Ram Thapa',
    crop: 'Rice', variety: 'Basmati', grade: 'A',
    pesticideProfile: 'Organic', storageCondition: 'Dry Warehouse',
    location: 'Bharatpur', district: 'Chitwan',
    quantityKg: 5000, reservedKg: 1200, pricePerKg: 85,
    harvestDate: '2026-04-15', availableFrom: '2026-04-20', availableTo: '2026-07-20',
    plantDate: '2025-12-15',
  },
  {
    id: '2', farmerId: 'f2', farmerName: 'Sita Gurung',
    crop: 'Wheat', variety: 'Gautam', grade: 'A',
    pesticideProfile: 'Low-Pesticide', storageCondition: 'Cold Storage',
    location: 'Pokhara', district: 'Kaski',
    quantityKg: 3000, reservedKg: 800, pricePerKg: 52,
    harvestDate: '2026-03-20', availableFrom: '2026-03-25', availableTo: '2026-06-25',
    plantDate: '2025-11-30',
  },
  {
    id: '3', farmerId: 'f3', farmerName: 'Hari Yadav',
    crop: 'Maize', variety: 'Rampur Composite', grade: 'B',
    pesticideProfile: 'Conventional', storageCondition: 'Open Air',
    location: 'Butwal', district: 'Rupandehi',
    quantityKg: 8000, reservedKg: 3500, pricePerKg: 38,
    harvestDate: '2026-05-01', availableFrom: '2026-05-05', availableTo: '2026-08-05',
    plantDate: '2026-02-01',
  },
  {
    id: '4', farmerId: 'f4', farmerName: 'Maya Tamang',
    crop: 'Potato', variety: 'Janakdev', grade: 'A',
    pesticideProfile: 'Organic', storageCondition: 'Cold Storage',
    location: 'Biratnagar', district: 'Morang',
    quantityKg: 10000, reservedKg: 6000, pricePerKg: 32,
    harvestDate: '2026-03-10', availableFrom: '2026-03-15', availableTo: '2026-05-15',
    plantDate: '2025-12-20',
  },
  {
    id: '5', farmerId: 'f5', farmerName: 'Bishnu Chaudhary',
    crop: 'Millet', variety: 'Dalle', grade: 'B',
    pesticideProfile: 'Organic', storageCondition: 'Dry Warehouse',
    location: 'Dharan', district: 'Sunsari',
    quantityKg: 2000, reservedKg: 200, pricePerKg: 65,
    harvestDate: '2026-04-25', availableFrom: '2026-05-01', availableTo: '2026-08-01',
    plantDate: '2026-01-15',
  },
  {
    id: '6', farmerId: 'f6', farmerName: 'Kamala Sharma',
    crop: 'Rice', variety: 'Mansuli', grade: 'B',
    pesticideProfile: 'Low-Pesticide', storageCondition: 'Dry Warehouse',
    location: 'Birtamod', district: 'Jhapa',
    quantityKg: 6000, reservedKg: 1500, pricePerKg: 72,
    harvestDate: '2026-04-08', availableFrom: '2026-04-12', availableTo: '2026-07-12',
    plantDate: '2025-12-08',
  },
  {
    id: '7', farmerId: 'f7', farmerName: 'Dipak Magar',
    crop: 'Wheat', variety: 'NL-971', grade: 'C',
    pesticideProfile: 'Conventional', storageCondition: 'Open Air',
    location: 'Nepalgunj', district: 'Banke',
    quantityKg: 4000, reservedKg: 0, pricePerKg: 45,
    harvestDate: '2026-03-30', availableFrom: '2026-04-05', availableTo: '2026-07-05',
    plantDate: '2025-12-10',
  },
  {
    id: '8', farmerId: 'f8', farmerName: 'Anita Poudel',
    crop: 'Potato', variety: 'Kufri Jyoti', grade: 'A',
    pesticideProfile: 'Low-Pesticide', storageCondition: 'Cold Storage',
    location: 'Dhangadhi', district: 'Kailali',
    quantityKg: 7000, reservedKg: 2800, pricePerKg: 35,
    harvestDate: '2026-03-18', availableFrom: '2026-03-22', availableTo: '2026-06-22',
    plantDate: '2025-12-28',
  },
];

export const marketRates: MarketRate[] = [
  { crop: 'Rice', pricePerKg: 82, change: 3.2, trend: [75, 78, 76, 80, 82, 79, 82], unit: 'NPR/kg' },
  { crop: 'Wheat', pricePerKg: 50, change: -1.5, trend: [52, 53, 51, 50, 49, 51, 50], unit: 'NPR/kg' },
  { crop: 'Maize', pricePerKg: 40, change: 5.1, trend: [35, 36, 38, 37, 39, 38, 40], unit: 'NPR/kg' },
  { crop: 'Potato', pricePerKg: 33, change: -2.8, trend: [36, 35, 34, 35, 33, 34, 33], unit: 'NPR/kg' },
  { crop: 'Millet', pricePerKg: 68, change: 1.8, trend: [64, 65, 66, 65, 67, 66, 68], unit: 'NPR/kg' },
];
