'use client';

import { useSession } from 'next-auth/react';
import { Heart, Share2, Clock, MapPin, Tag, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ImageGallery from './ImageGallery';
import SellerInfo from './SellerInfo';
import SimilarProducts from './SimilarProducts';
import ProductTabs from './ProductTabs';

interface StandardProductDetailProps {
  product: any;
}

export default function StandardProductDetail({ product }: StandardProductDetailProps) {
  const { data: session } = useSession();

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Product Image */}
          <div className="bg-black rounded-xl overflow-hidden">
            <ImageGallery images={product.images} alt={product.title} />
          </div>

          {/* Technical Details */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-lg font-bold mb-4">Technische Details</h2>
            <div className="grid gap-y-4">
              {Object.entries(product.specifications || {}).map(([key, value]) => (
                <div key={key} className="grid grid-cols-2 gap-4 py-2 border-b border-gray-50 last:border-0">
                  <div className="text-gray-600">{key}</div>
                  <div className="font-medium text-right">{value as string}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Description Tabs */}
          <ProductTabs description={product.description} />
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Product Info Card */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Eingestellt {new Date().toLocaleDateString('de-CH')}</span>
                <span>•</span>
                <span>Nr. {product.id}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-3xl font-bold text-gray-900">
                CHF {product.price.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-gray-50"
                >
                  <Heart className="h-5 w-5" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-gray-50"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Button 
              className="w-full bg-[#ff6600] hover:bg-[#e65c00] h-12 text-lg font-medium mt-2"
            >
              Jetzt kaufen
            </Button>

            {/* Shipping & Protection Info */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span>Standort: {product.seller.location || 'Schweiz'}</span>
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
          </div>

          {/* Seller Info */}
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