'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Heart, Share2, Clock, MapPin, Tag, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ImageGallery from './ImageGallery';
import SellerInfo from './SellerInfo';
import SimilarProducts from './SimilarProducts';
import ProductTabs from './ProductTabs';
import { PriceProposalForm } from './PriceProposalForm';
import { PriceProposal } from '@/types';
import { ShareModal } from './ShareModal';

interface StandardProductDetailProps {
  product: any;
}

export default function StandardProductDetail({ product }: StandardProductDetailProps) {
  const { data: session } = useSession();

  // Heart button state
  const [isHearted, setIsHearted] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false); // Yeni eklenen modal state

  const handleHeartClick = () => {
    setIsHearted(!isHearted); // Toggle the heart state
  };

  const handleProposal = (proposal: PriceProposal) => {
    console.log('Price proposal submitted:', proposal);
    // Handle the proposal submission
  };

  const productUrl = typeof window !== 'undefined' ? window.location.href : ''; // Ürün URL'si

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,500px] gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Product Image */}
          <div className="bg-white rounded-xl max-w-4xl mx-auto overflow-hidden">
            <ImageGallery images={product.images} alt={product.title} />
          </div>

          {/* Technical Details */}
          <div className="bg-white rounded-xl max-w-4xl mx-auto overflow-hidden">
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
                  onClick={handleHeartClick} // Add click handler
                >
                  <Heart 
                    className={`h-5 w-5 ${isHearted ? 'text-[#ff6600]' : 'text-gray-400'}`} 
                    fill={isHearted ? '#ff6600' : 'none'} // Fill heart when active
                  />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-gray-50"
                  onClick={() => setShowShareModal(true)} // Share modal açılır
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

            {/* Make Offer Section */}
            <div className="flex items-center justify-between">
              <Button
                className="w-full bg-[#1F9160] hover:bg-[#1F9160] h-12 text-lg font-medium mt-2"
                onClick={() => setShowProposal(!showProposal)}
              >
                {showProposal ? 'Angebot Abbrechen' : 'Angebot Machen'}
              </Button>
            </div>
            {showProposal && (
              <PriceProposalForm
                productPrice={product.price}
                onSubmit={handleProposal}
              />
            )}

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

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        productUrl={productUrl}
      />
    </div>
  );
}
