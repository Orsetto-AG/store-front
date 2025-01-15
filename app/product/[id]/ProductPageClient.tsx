'use client';

import { useEffect, useState } from 'react';
import StandardProductDetail from '@/components/product/StandardProductDetail';
import AuctionProductDetail from '@/components/product/AuctionProductDetail';
import { Skeleton } from '@/components/ui/skeleton';

interface Product {
  id: string;
  title: string;
  price?: number;
  priceSuggestion: boolean;
  minPriceSuggestion: number;
  shippingcost: number;
  shippingtyp: ('A Post' | 'B Post' | 'Abholung')[];
  paymentsmethod: ('Überweisung' | 'Barzahlung')[];
  currentBid?: number;
  minIncrement?: number;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  type: 'standard' | 'auction';
  endTime?: string;
  bids?: Array<{
    id: string;
    bidder: { name: string };
    amount: number;
    createdAt: string;
  }>;
  seller: {
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    joinedAt: string;
    responseRate: number;
    activeListings: number;
    completedSales: number;
    isFollowed:boolean;
    location: string;
  };
}

export default function ProductPageClient({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Simulate API call with both standard and auction products
    const isAuction = parseInt(id) % 2 === 0; // Even IDs are auctions for demo
    
    const dummyProduct: Product = {
      id,
      title: isAuction ? 'Vintage Leica M6' : 'Sony A7 III',
      type: isAuction ? 'auction' : 'standard',
      price: isAuction ? undefined : 1899,
      priceSuggestion: true,
      minPriceSuggestion: 1500,
      shippingcost: 5.99,
      shippingtyp: ['B Post'],
      paymentsmethod: ['Überweisung', 'Barzahlung'],
      currentBid: isAuction ? 3150.00 : undefined,
      minIncrement: isAuction ? 50 : undefined,
      endTime: isAuction ? new Date(Date.now() + 86400000).toISOString() : undefined,
      images: [
        'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&h=600&fit=crop',
        'https://plus.unsplash.com/premium_photo-1684445034763-013f0525c40c?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      ],
      description: 'Professional camera with exceptional image quality and advanced features.',
      specifications: {
        'Sensor': isAuction ? '24MP Full-Frame' : '24.2MP Full-Frame CMOS',
        'ISO Range': '100-51200',
        'Autofocus': isAuction ? 'Manual' : '693-point AF system',
        'Video': '4K HDR',
        'Battery Life': isAuction ? '500 shots' : '710 shots'
      },
      bids: isAuction ? [
        {
          id: '1',
          bidder: { name: 'John Doe' },
          amount: 3150.00,
          createdAt: new Date(Date.now() - 3600000).toISOString()
        },
        {
          id: '2',
          bidder: { name: 'Jane Smith' },
          amount: 3100.00,
          createdAt: new Date(Date.now() - 7200000).toISOString()
        }
      ] : undefined,
      seller: {
        name: 'Camera Pro Shop',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        rating: 4.9,
        reviewCount: 128,
        joinedAt: '2023-01-01',
        responseRate: 98,
        activeListings: 45,
        completedSales: 1234,
        isFollowed: false,
        location: 'Zürich'
      }
    };

    setTimeout(() => {
      setProduct(dummyProduct);
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return product.type === 'auction' ? (
    <AuctionProductDetail product={product} />
  ) : (
    <StandardProductDetail product={product} />
  );
}

function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Skeleton className="aspect-[4/3] rounded-lg" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-1/3" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    </div>
  );
}