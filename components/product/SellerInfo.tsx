'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Heart, Star, Package, Calendar, MessageSquare, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SellerInfoProps {
  seller: {
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    joinedAt: string;
    responseRate: number;
    activeListings: number;
    completedSales: number;
    isFollowed: boolean;
  };
  variant?: 'compact' | 'full';
}

export default function SellerInfo({ seller, variant = 'compact' }: SellerInfoProps) {
  const [isFollowing, setIsFollowing] = useState(seller.isFollowed);

  return (
    <div className={`bg-white rounded-xl max-w-4xl mx-auto overflow-hidden ${variant === 'compact' ? 'compact' : 'full'}`}>
      {variant === 'compact' ? (
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Seller:</span>
              <span className="text-sm font-semibold text-gray-900">{seller.name}</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-green-100 rounded-md">
              <Star className="w-3 h-3 text-green-600 fill-current" />
              <span className="font-semibold text-green-600 text-xs">{seller.rating}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">About the Seller</h2>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              <Image
                src={seller.avatar}
                alt={seller.name}
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-grow relative">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-gray-900">{seller.name}</h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{seller.rating}</span>
                    <span className="text-xs text-gray-500">({seller.reviewCount})</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`sm:static absolute top-0 right-0 flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border transition-colors ${
                    isFollowing
                      ? 'bg-orange-50 border-orange-200 text-orange-600'
                      : 'border-gray-200 text-gray-600 hover:border-orange-200 hover:text-orange-600'
                  }`}
                >
                  <Heart className={`w-3 h-3 ${isFollowing ? 'fill-current' : ''}`} />
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Member since {new Date(seller.joinedAt).getFullYear()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MessageSquare className="w-4 h-4" />
                    <span className="text-sm">Response rate: {seller.responseRate}%</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="w-4 h-4" />
                    <span className="text-sm">{seller.activeListings} active listings</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <ShoppingBag className="w-4 h-4" />
                    <span className="text-sm">{seller.completedSales} total sales</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Button className="mt-4 w-full text-sm" variant="outline">
            Alle Angebote anzeigen
          </Button>

          <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Verifizierter Verkäufer
          </div>
        </div>
      )}
    </div>
  );
}