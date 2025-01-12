'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

// Mock empty state illustration
const emptyStateImage = 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?w=400&h=400&fit=crop';

export default function OffersPricePage() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center text-center p-8">
      <div className="relative w-32 h-32 mb-6">
        <Image
          src={emptyStateImage}
          alt="Empty state illustration"
          fill
          className="object-contain"
        />
      </div>
      <h2 className="text-xl font-semibold mb-2">
        Hier werden deine Preisvorschläge angezeigt
      </h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Preisvorschläge ermöglichen es dir, Verkäufer*innen einen verbindlichen Betrag
        vorzuschlagen, den du für den direkten Kauf eines Produkts zu zahlen bereit bist.
      </p>
      <Button className="bg-[#ff6600] hover:bg-[#e65c00]">
        <ShoppingBag className="mr-2 h-4 w-4" />
        JETZT EINKAUFEN
      </Button>
    </div>
  );
}