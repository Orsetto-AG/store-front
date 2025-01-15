"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import { Heart, Share2, Clock, MapPin, Tag, Landmark, Coins, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ImageGallery from "./ImageGallery";
import SellerInfo from "./SellerInfo";
import SimilarProducts from "./SimilarProducts";
import ProductTabs from "./ProductTabs";
import { PriceProposalForm } from "./PriceProposalForm";
import { PriceProposal } from "@/types";
import { ShareModal } from "./ShareModal";
import Comments from "./Comments";
import { CommentProvider } from "@/context/CommentContext";
import { MessageCircle } from "lucide-react";
import { ComplaintModal } from './ComplaintModal';

interface StandardProductDetailProps {
  product: any;
}

export default function StandardProductDetail({ product }: StandardProductDetailProps) {
  const { data: session } = useSession();

  // Heart button state
  const [isHearted, setIsHearted] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false); // Yeni eklenen modal state
  const commentsRef = useRef<HTMLDivElement>(null);
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  const handleHeartClick = () => {
    setIsHearted(!isHearted); // Toggle the heart state
  };

  const handleProposal = (proposal: PriceProposal) => {
    console.log("Price proposal submitted:", proposal);
    // Handle the proposal submission
  };

  const productUrl = typeof window !== "undefined" ? window.location.href : ""; // Ürün URL'si

  const scrollToComments = () => {
    const targetElement = commentsRef.current;
    if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 160, // 20px yukarı kaydırma
      behavior: "smooth"
    });
   }
  };

  return (
    //<div className="container mx-auto px-4 py-6">
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr,500px] gap-4">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Product Image */}
          <div className="bg-white rounded-xl max-w-4xl mx-auto overflow-hidden">
            <ImageGallery images={product.images} alt={product.title} />
          </div>

          {/* Right Column Content for Mobile */}
          <div className="lg:hidden bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Eingestellt {new Date().toLocaleDateString("de-CH")}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0">
                 <SellerInfo seller={product.seller} variant="compact" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="text-3xl font-bold text-gray-900">
                CHF {product.price.toLocaleString("de-CH", { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full ring-0 hover:ring-2 hover:ring-[#ff6600] focus:ring-2 focus:ring-[#ff6600] transition-all duration-200"
                  onClick={handleHeartClick}
                  >
                  <Heart 
                    className={`h-5 w-5 ${isHearted ? "text-[#ff6600]" : "text-gray-900"}`} 
                    fill={isHearted ? "#ff6600" : "none"} 
                  />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-gray-50"
                  onClick={() => setShowShareModal(true)}
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

            <div className="flex items-center justify-between">
              <Button
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 h-12 text-lg font-medium mt-2"
                onClick={() => setShowProposal(!showProposal)}
              >
                {showProposal ? "Angebot Abbrechen" : "Angebot Machen"}
              </Button>
            </div>
            {showProposal && (
              <PriceProposalForm
                productPrice={product.price}
                onSubmit={handleProposal}
              />
            )}

            <div className="pt-5">
             <h2 className="text-lg font-semibold text-gray-800">Abholungsmöglichkeiten</h2>
             <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span>Standort: {product.seller.location}</span>
              </div>
                <div className="flex items-center gap-3 text-gray-700">
                <Tag className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span>Versand: {product.shippingcost} {product.shippingtyp} </span>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <h2 className="text-lg font-semibold text-gray-800">Zahlungsmöglichkeiten</h2>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <Landmark className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span>Überweisung</span>
                </div>
                {product.paymentsmethod.includes('Barzahlung') && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Coins className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span>Barzahlung</span>
                  </div>
                )}
              </div>
            </div>
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
          <div ref={commentsRef}>
            <CommentProvider>
              <Comments />
            </CommentProvider>
          </div>

          {/* Mobil Görünümde "Angebot Melden" Butonu */}
          <div className="lg:hidden flex justify-end mt-4">
            <button
              onClick={() => setShowComplaintModal(true)}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 py-2 px-4 rounded-lg transition-colors"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>Angebot Melden</span>
            </button>
          </div>

          {/* Seller Info */}
          <SellerInfo seller={product.seller} variant="full" />
        </div>

        {/* Right Column for Desktop */}
        <div className="hidden lg:block space-y-5 sticky-sidebar">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
              <div className="flex items-center justify-between">
                <div className="flex-shrink-0">
                 <SellerInfo seller={product.seller} variant="compact" />
                </div>
                <button
                  onClick={scrollToComments}
                  className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                >
                  <MessageCircle className="w-3 h-3" />
                  Ask the Seller
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 mt-8">
              <div className="text-3xl font-bold text-gray-900">
                CHF {product.price.toLocaleString("de-CH", { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full ring-0 hover:ring-2 hover:ring-[#ff6600] focus:ring-2 focus:ring-[#ff6600] transition-all duration-200"
                  onClick={handleHeartClick}
                >
                  <Heart 
                    className={`h-5 w-5 ${isHearted ? "text-[#ff6600]" : "text-gray-900"}`} 
                    fill={isHearted ? "#ff6600" : "none"} 
                  />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full hover:bg-gray-50"
                  onClick={() => setShowShareModal(true)}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              </div>

            <Button 
              className="w-full bg-[#ff6200] hover:bg-[#e65c00] h-12 text-lg font-medium mt-2"
            >
              Jetzt kaufen
            </Button>

            <div className="flex items-center justify-between">
              <Button
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 h-12 text-lg font-medium mt-2"
                onClick={() => setShowProposal(!showProposal)}
              >
                {showProposal ? "Angebot Abbrechen" : "Angebot Machen"}
              </Button>
            </div>
            {showProposal && (
              <PriceProposalForm
                productPrice={product.price}
                onSubmit={handleProposal}
              />
            )}
            <div className="pt-5">
             <h2 className="text-lg font-semibold text-gray-800">Abholungsmöglichkeiten</h2>
             <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span>Standort: {product.seller.location}</span>
              </div>
                <div className="flex items-center gap-3 text-gray-700">
                <Tag className="h-5 w-5 text-gray-400 flex-shrink-0" />
                <span>Versand: {product.shippingcost} {product.shippingtyp} </span>
                </div>
              </div>
            </div>
            <div className="pt-5">
              <h2 className="text-lg font-semibold text-gray-800">Zahlungsmöglichkeiten</h2>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-gray-700">
                  <Landmark className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  <span>Überweisung</span>
                </div>
                {product.paymentsmethod.includes('Barzahlung') && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <Coins className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    <span>Barzahlung</span>
                  </div>
                )}
              </div>
            </div>
          </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowComplaintModal(true)}
                className="flex items-center space-x-2 text-red-600 hover:text-red-700"
                >
                <AlertTriangle className="w-5 h-5" />
                <span>Angebot Melden</span>
              </button>
            </div>
        </div>
      </div>


      {/* Similar Products */}
      <div className="mt-8">
        <SimilarProducts productId={product.id} />
      </div>

      {showComplaintModal && (
      <ComplaintModal
      onClose={() => setShowComplaintModal(false)}
      />
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        productUrl={productUrl}
      />
    </div>

  );
}
