'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
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
  };
}

export default function SellerInfo({ seller }: SellerInfoProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={seller.avatar}
            alt={seller.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="font-medium text-lg">{seller.name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-medium">{seller.rating}</span>
            <span className="text-gray-500">({seller.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-500">Mitglied seit</div>
            <div className="font-medium">{new Date(seller.joinedAt).getFullYear()}</div>
          </div>
          <div>
            <div className="text-gray-500">Antwortrate</div>
            <div className="font-medium">{seller.responseRate}%</div>
          </div>
          <div>
            <div className="text-gray-500">Aktive Angebote</div>
            <div className="font-medium">{seller.activeListings}</div>
          </div>
          <div>
            <div className="text-gray-500">Verkäufe</div>
            <div className="font-medium">{seller.completedSales}</div>
          </div>
        </div>

        <Button className="w-full" variant="outline">
          Verkäufer kontaktieren
        </Button>

        <Button className="w-full" variant="outline">
          Alle Angebote anzeigen
        </Button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Verifizierter Verkäufer
        </div>
      </div>
    </div>
  );
}