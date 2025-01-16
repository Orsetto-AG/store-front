'use client';

import ProductSlider from '@/components/ProductSlider';
import FilterBar from '@/components/FilterBar';
import Footer from '@/components/Footer';
import BannerSection from '@/components/BannerSection';
import { Banknote, Clock, Heart, MapPin, Sparkles } from 'lucide-react';
import MobileHeader from '@/components/header/MobileHeader';
import Header from '@/components/header';
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SMSVerificationModal from '@/components/SMSVerificationModal';


// Extended mock data for better slider testing
const auctionProducts = [
  {
    id: 1,
    title: 'Vintage Leica M6 - Black Paint Edition (1984)',
    currentBid: 3150.00,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
    endTime: new Date(Date.now() + 86400000).toISOString(),
    type: 'auction',
    watchCount: 23,
    bids: 8,
    location: 'Zürich',
    isNew: true
  },
  {
    id: 2,
    title: 'Sony A7 III Full Frame Mirrorless Camera',
    currentBid: 1850.00,
    image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=400&h=300&fit=crop',
    endTime: new Date(Date.now() + 172800000).toISOString(),
    type: 'auction',
    watchCount: 45,
    bids: 12,
    location: 'Basel'
  },
  {
    id: 3,
    title: 'Canon EOS R5 with RF 24-70mm f/2.8',
    currentBid: 4200.00,
    image: 'https://images.unsplash.com/photo-1502982720700-bfff97f2ecac?w=400&h=300&fit=crop',
    endTime: new Date(Date.now() + 259200000).toISOString(),
    type: 'auction',
    watchCount: 67,
    bids: 18,
    location: 'Geneva'
  },
  {
    id: 4,
    title: 'Fujifilm X-T4 Mirrorless Camera Kit',
    currentBid: 2100.00,
    image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=400&h=300&fit=crop',
    endTime: new Date(Date.now() + 345600000).toISOString(),
    type: 'auction',
    watchCount: 34,
    bids: 9,
    location: 'Lausanne'
  },
  {
    id: 5,
    title: 'Gaming PC - RTX 4090, i9-13900K',
    currentBid: 4200.00,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=300&fit=crop',
    endTime: new Date(Date.now() + 432000000).toISOString(),
    type: 'auction',
    watchCount: 89,
    bids: 25,
    location: 'Bern',
    isNew: true
  },
  {
    id: 6,
    title: 'Rolex Submariner Date - Full Set',
    currentBid: 12500.00,
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=300&fit=crop',
    endTime: new Date(Date.now() + 518400000).toISOString(),
    type: 'auction',
    watchCount: 156,
    bids: 42,
    location: 'Geneva'
  },
  {
    id: 7,
    title: 'Gibson Les Paul Custom Shop 1959',
    currentBid: 5800.00,
    image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=400&h=300&fit=crop',
    endTime: new Date(Date.now() + 604800000).toISOString(),
    type: 'auction',
    watchCount: 67,
    bids: 15,
    location: 'Lausanne'
  },
  {
    id: 8,
    title: 'Limited Edition Art Print (1/50)',
    currentBid: 890.00,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop',
    endTime: new Date(Date.now() + 691200000).toISOString(),
    type: 'auction',
    watchCount: 34,
    bids: 9,
    location: 'Basel'
  }
];

// Extended frank offers with more items
const frankOffers = [
  {
    id: 1,
    title: 'Vintage Polaroid Collection (1960s)',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
    type: 'fixed',
    location: 'Winterthur'
  },
  {
    id: 2,
    title: 'Antique Brass Telescope',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1501686962565-1350ab98237e?w=400&h=300&fit=crop',
    type: 'fixed',
    location: 'Thun',
    isNew: true
  },
  {
    id: 3,
    title: 'Classic Vinyl Records (Jazz)',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?w=400&h=300&fit=crop',
    type: 'fixed',
    location: 'Lugano'
  },
  {
    id: 4,
    title: 'Handcrafted Leather Journal',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1544487070-833e3aa8b85a?w=400&h=300&fit=crop',
    type: 'fixed',
    location: 'Chur'
  },
  {
    id: 5,
    title: 'Vintage Camera Collection',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=400&h=300&fit=crop',
    type: 'fixed',
    location: 'St. Gallen'
  },
  {
    id: 6,
    title: 'Handmade Ceramic Vase Set',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400&h=300&fit=crop',
    type: 'fixed',
    location: 'Biel'
  },
  {
    id: 7,
    title: 'Vintage Swiss Watch Parts',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&h=300&fit=crop',
    type: 'fixed',
    location: 'Zug'
  },
  {
    id: 8,
    title: 'Antique Pocket Watch Collection',
    price: 1.00,
    image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=400&h=300&fit=crop',
    type: 'fixed',
    location: 'Lucerne'
  }
];

// Extended new products with more items
const newProducts = [
  {
    id: 1,
    title: 'MacBook Pro M3 Max (2024)',
    price: 3499.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    type: 'new',
    location: 'Zug',
    isNew: true
  },
  {
    id: 2,
    title: 'Canon EOS R5 + RF 28-70mm f/2',
    price: 5299.99,
    image: 'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=400&h=300&fit=crop',
    type: 'new',
    location: 'Lucerne'
  },
  {
    id: 3,
    title: 'Herman Miller Aeron (2023)',
    price: 1699.99,
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=300&fit=crop',
    type: 'new',
    location: 'Aarau'
  },
  {
    id: 4,
    title: 'Sonos Arc + Sub + One SL',
    price: 2199.99,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=300&fit=crop',
    type: 'new',
    location: 'St. Gallen',
    isNew: true
  },
  {
    id: 5,
    title: 'iPad Pro 12.9" M2 (2024)',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
    type: 'new',
    location: 'Basel'
  },
  {
    id: 6,
    title: 'Sony WH-1000XM5 Headphones',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=300&fit=crop',
    type: 'new',
    location: 'Geneva'
  },
  {
    id: 7,
    title: 'DJI Mavic 3 Pro Combo',
    price: 2299.99,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop',
    type: 'new',
    location: 'Zurich'
  },
  {
    id: 8,
    title: 'Dyson V15 Detect Absolute',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=300&fit=crop',
    type: 'new',
    location: 'Bern'
  }
];

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("showModal") === "true") {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const firstFilterBarItems = [
    { id: 'nearby', icon: MapPin, href: '/nearby' },
    { id: 'endingSoon', icon: Clock, href: '/ending-soon' },
    { id: 'fromOne', icon: Banknote, href: '/from-one' },
  ];

  const secondFilterBarItems = [
    { id: 'popular', icon: Heart, href: '/popular' },
    { id: 'new', icon: Sparkles, href: '/new' },
    { id: 'recommended', icon: Sparkles, href: '/recommended' },
  ];

  return (

    <div className="min-h-screen bg-gray-50">
     <Header />
     <MobileHeader />
      {/* Banner Section */}
      <BannerSection />

      {/* Filter Bar - İlk */}
      <FilterBar filters={firstFilterBarItems} />

      {/* Product Sliders */}
      <div className="container mx-auto px-4 py-8">
        <ProductSlider
          title="Live Auktionen"
          products={auctionProducts}
          type="auction"
          viewAllHref="/auctions"
        />

        {/* Filter Bar - Tekrar */}
        <FilterBar filters={secondFilterBarItems} />

        <ProductSlider
          title="1 Frank Angebote"
          products={frankOffers}
          type="fixed"
          viewAllHref="/offers"
        />

        <ProductSlider
          title="Neue Produkte"
          products={newProducts}
          type="new"
          viewAllHref="/new"
        />
      </div>

      {/* Footer */}
      <Footer />
      <SMSVerificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
