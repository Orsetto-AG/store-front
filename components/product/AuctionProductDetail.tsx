'use client';

import { useSession } from 'next-auth/react';
import { Heart, Share2, Clock, MapPin, Tag, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ImageGallery from './ImageGallery';
import SellerInfo from './SellerInfo';
import SimilarProducts from './SimilarProducts';
import CountdownTimer from '../CountdownTimer';
import AuctionTabs from './AuctionTabs';

interface AuctionProductDetailProps {
  product: any;
}

export default function AuctionProductDetail({ product }: AuctionProductDetailProps) {
  const { data: session } = useSession();
  const minBid = product.currentBid + (product.minIncrement || 10);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr),400px] gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Product Image */}
          <div className="bg-black rounded-lg overflow-hidden">
            <ImageGallery images={product.images} alt={product.title} />
          </div>

          {/* Technical Details */}
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold mb-6">Technische Details</h2>
            <div className="grid gap-y-6">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div key={key}>
                  <div className="text-gray-600 mb-1">{key}</div>
                  <div className="font-medium">{value as string}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description Tabs */}
          <AuctionTabs 
            description={product.description} 
            bids={product.bids}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>Eingestellt 07.01.2025, 10:47</span>
              <span>•</span>
              <span>Nr. {product.id}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Aktuelles Gebot</div>
              <div className="text-3xl font-bold">
                CHF {product.currentBid.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {product.endTime && (
            <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
              <Clock className="h-5 w-5" />
              <CountdownTimer endTime={new Date(product.endTime)} />
            </div>
          )}

          <div className="space-y-3">
            <div className="text-sm text-gray-600">
              Mindestgebot: CHF {minBid.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
            </div>
            <div className="flex gap-2">
              <Input
                type="number"
                defaultValue={minBid}
                min={minBid}
                step={product.minIncrement || 10}
                className="text-lg"
              />
              <Button 
                className="bg-[#ff6600] hover:bg-[#e65c00] px-8 text-lg font-medium"
              >
                Bieten
              </Button>
            </div>
          </div>

          <div className="space-y-3 bg-white rounded-lg border border-gray-100 p-4">
            <div className="flex items-center gap-3 text-gray-700">
              <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span>Standort: Schweiz</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Tag className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span>Versand: CHF 7.90 (B-Post)</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Shield className="h-5 w-5 text-gray-400 flex-shrink-0" />
              <span>Käuferschutz durch Orsetto</span>
            </div>
          </div>

          <SellerInfo seller={product.seller} />
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-8">
        <SimilarProducts productId={product.id} />
      </div>
    </div>
  );
}