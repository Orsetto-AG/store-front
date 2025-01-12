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
import { Search, CreditCard } from 'lucide-react';

// Mock data
const mockPurchases = [
  {
    id: 1,
    title: 'Elisabeth Alida Van Kiershaanen (1809-1845) Gemälde',
    image: 'https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?w=200&h=200&fit=crop',
    articleNumber: '1277016198',
    seller: 'Barbie19',
    purchaseDate: '1. Jan. 2025',
    shipping: {
      method: 'Einschreiben',
      cost: 20.00
    },
    price: 389.00,
    status: 'Bezahlen'
  },
  {
    id: 2,
    title: 'Jean Miotte (1926-2016) grosses Gemälde',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=200&fit=crop',
    articleNumber: '1276807956',
    seller: 'Barbie19',
    purchaseDate: '29. Dez. 2024',
    shipping: {
      method: 'Kurier',
      cost: 150.00
    },
    price: 834.00,
    status: 'Bezahlen'
  }
];

export default function BoughtPage() {
  const [status, setStatus] = useState('all');
  const [sort, setSort] = useState('newest');

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
              <SelectItem value="unpaid">Unbezahlt</SelectItem>
              <SelectItem value="paid">Bezahlt</SelectItem>
              <SelectItem value="shipped">Versendet</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4">
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sortierung" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Neueste</SelectItem>
              <SelectItem value="oldest">Älteste</SelectItem>
              <SelectItem value="price-high">Höchster Preis</SelectItem>
              <SelectItem value="price-low">Niedrigster Preis</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Purchases List */}
      <div className="space-y-4">
        {mockPurchases.map((purchase) => (
          <div
            key={purchase.id}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="p-4">
              <div className="flex gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={purchase.image}
                    alt={purchase.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-medium text-lg">{purchase.title}</h3>
                      <div className="text-sm text-gray-500">
                        Artikel: {purchase.articleNumber}
                      </div>
                    </div>
                    <Button 
                      className="flex-shrink-0 bg-[#008e9b] hover:bg-[#007a85]"
                    >
                      <CreditCard className="mr-2 h-4 w-4" />
                      {purchase.status}
                    </Button>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Verkäufer</div>
                      <div>{purchase.seller}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Gekauft am</div>
                      <div>{purchase.purchaseDate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Versand</div>
                      <div>{purchase.shipping.method}</div>
                      <div className="text-sm text-gray-500">
                        CHF {purchase.shipping.cost.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Preis</div>
                      <div className="font-medium">
                        CHF {purchase.price.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}