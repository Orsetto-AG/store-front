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
import Header from '@/components/header';
import MobileHeader from "../header/MobileHeader";

interface StandardProductDetailProps {
  product: any;
}

export default function StandardProductDetail({ product }: StandardProductDetailProps) {
  const { data: session } = useSession();
  const [isHearted, setIsHearted] = useState(false);
  const [showProposal, setShowProposal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const commentsRef = useRef<HTMLDivElement>(null);
  const [showComplaintModal, setShowComplaintModal] = useState(false);

  const handleHeartClick = () => {
    setIsHearted(!isHearted);
  };

  const handleProposal = (proposal: PriceProposal) => {
    console.log("Price proposal submitted:", proposal);
  };

  const productUrl = typeof window !== "undefined" ? window.location.href : "";

  const scrollToComments = () => {
    const targetElement = commentsRef.current;
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 160,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MobileHeader />
      <div className="max-w-5xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-4">
          {/* Sol Kolon */}
          <div className="space-y-4 max-w-2xl">
            <div className="bg-white rounded-xl overflow-hidden">
              <ImageGallery images={product.images} alt={product.title} />
            </div>

            {/* Mobil Görünüm */}
            <div className="lg:hidden bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
              <div className="space-y-2">
                <h1 className="text-lg font-semibold text-gray-900">{product.title}</h1>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>Eingestellt {new Date().toLocaleDateString("de-CH")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-shrink-0">
                    <SellerInfo seller={product.seller} variant="compact" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-lg font-semibold text-gray-900">
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
                      className={`h-4 w-4 ${isHearted ? "text-[#ff6600]" : "text-gray-900"}`}
                      fill={isHearted ? "#ff6600" : "none"}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-gray-50"
                    onClick={() => setShowShareModal(true)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-[#ff6600] hover:bg-[#e65c00] h-10 text-sm font-medium">
                Jetzt kaufen
              </Button>

              <div className="flex items-center justify-between">
                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 h-10 text-sm font-medium"
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

              <div className="pt-3">
                <h2 className="text-sm font-semibold text-gray-800">Abholungsmöglichkeiten</h2>
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span>Standort: {product.seller.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Tag className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span>Versand: {product.shippingcost} {product.shippingtyp}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <h2 className="text-sm font-semibold text-gray-800">Zahlungsmöglichkeiten</h2>
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Landmark className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span>Überweisung</span>
                  </div>
                  {product.paymentsmethod.includes('Barzahlung') && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Coins className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span>Barzahlung</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Teknik Detaylar */}
            <div className="bg-white rounded-xl p-4">
              <h2 className="text-sm font-semibold mb-3">Technische Details</h2>
              <div className="grid gap-y-2">
                {Object.entries(product.specifications || {}).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="text-sm text-gray-600">{key}</div>
                    <div className="text-sm font-medium text-right">{value as string}</div>
                  </div>
                ))}
              </div>
            </div>

            <ProductTabs description={product.description} />

            <div ref={commentsRef}>
              <CommentProvider>
                <Comments />
              </CommentProvider>
            </div>

            <div className="lg:hidden flex justify-end mt-4">
              <button
                onClick={() => setShowComplaintModal(true)}
                className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700 py-2 px-4 rounded-lg transition-colors"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Angebot Melden</span>
              </button>
            </div>

            <SellerInfo seller={product.seller} variant="full" />
          </div>

          {/* Sağ Kolon */}
          <div className="hidden lg:block space-y-4 sticky-sidebar">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 space-y-3">
              <div className="space-y-2">
                <h1 className="text-lg font-semibold text-gray-900">{product.title}</h1>
                <div className="flex items-center justify-between">
                  <div className="flex-shrink-0">
                    <SellerInfo seller={product.seller} variant="compact" />
                  </div>
                  <button
                    onClick={scrollToComments}
                    className="flex items-center gap-1 px-2 py-1 text-xs bg-white border border-orange-200 text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Ask the Seller
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 mt-4">
                <div className="text-lg font-semibold text-gray-900">
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
                      className={`h-4 w-4 ${isHearted ? "text-[#ff6600]" : "text-gray-900"}`}
                      fill={isHearted ? "#ff6600" : "none"}
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-gray-50"
                    onClick={() => setShowShareModal(true)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-[#ff6600] hover:bg-[#e65c00] h-10 text-sm font-medium">
                Jetzt kaufen
              </Button>

              <div className="flex items-center justify-between">
                <Button
                  className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 h-10 text-sm font-medium"
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

              <div className="pt-3">
                <h2 className="text-sm font-semibold text-gray-800">Abholungsmöglichkeiten</h2>
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span>Standort: {product.seller.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Tag className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span>Versand: {product.shippingcost} {product.shippingtyp}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3">
                <h2 className="text-sm font-semibold text-gray-800">Zahlungsmöglichkeiten</h2>
                <div className="space-y-2 pt-1">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Landmark className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span>Überweisung</span>
                  </div>
                  {product.paymentsmethod.includes('Barzahlung') && (
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <Coins className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      <span>Barzahlung</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setShowComplaintModal(true)}
                className="flex items-center space-x-2 text-sm text-red-600 hover:text-red-700"
              >
                <AlertTriangle className="h-4 w-4" />
                <span>Angebot Melden</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <SimilarProducts productId={product.id} />
        </div>

        {showComplaintModal && (
          <ComplaintModal onClose={() => setShowComplaintModal(false)} />
        )}

        <ShareModal
          isOpen={showShareModal}
          onClose={() => setShowShareModal(false)}
          productUrl={productUrl}
        />
      </div>
    </div>
  );
}