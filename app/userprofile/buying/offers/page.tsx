'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

// Mock data
const mockOffers = [
  {
    id: 1,
    title: 'Vintage Leica M6 Camera',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop',
    articleNumber: '1276310620',
    endDate: '22. Dez. 2024, 21:16',
    status: 'Verloren',
    price: 3504.00
  },
  {
    id: 2,
    title: 'Sony A7 III Full Frame Camera',
    image: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?w=200&h=200&fit=crop',
    articleNumber: '1264890338',
    endDate: '27. Juli 2024, 21:35',
    status: 'Verloren',
    price: 254.00
  }
];

export default function OffersPage() {
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('date');

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <div className="flex gap-4">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Status</SelectItem>
              <SelectItem value="active">Aktiv</SelectItem>
              <SelectItem value="lost">Verloren</SelectItem>
              <SelectItem value="won">Gewonnen</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sortierung" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Enddatum (nächste zuerst)</SelectItem>
              <SelectItem value="price-asc">Preis aufsteigend</SelectItem>
              <SelectItem value="price-desc">Preis absteigend</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 px-4 py-2 text-sm text-gray-500">
        <div>Artikel</div>
        <div>Enddatum</div>
        <div>Status</div>
        <div className="text-right">Preis</div>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {mockOffers.map((offer) => (
          <div
            key={offer.id}
            className="grid grid-cols-[2fr,1fr,1fr,1fr] gap-4 items-center bg-white p-4 rounded-lg shadow-sm"
          >
            <div className="flex gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <div className="font-medium">{offer.title}</div>
                <div className="text-sm text-gray-500">Artikel: {offer.articleNumber}</div>
              </div>
            </div>
            <div className="text-sm">{offer.endDate}</div>
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                {offer.status}
              </span>
            </div>
            <div className="text-right font-medium">
              CHF {offer.price.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}