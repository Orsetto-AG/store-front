'use client';

import { useState } from 'react';
import { Trash2, Settings, Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

// Mock data for favorites
const mockFavorites = [
  {
    id: 1,
    title: 'Nintendo 3DS XL + Games',
    image: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=400&h=300&fit=crop',
    status: 'Offen',
    seller: 'rotti89',
    bids: 245,
    nextBid: 302.00,
    endTime: '32 Sek',
    condition: 'Gebraucht'
  },
  {
    id: 2,
    title: 'Apple Magic Mouse',
    image: 'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=400&h=300&fit=crop',
    status: 'Offen',
    seller: 'Falaffel',
    bids: 1,
    nextBid: 26.00,
    endTime: '12. Jan. 2025, 12:29',
    condition: 'Gebraucht'
  },
  {
    id: 3,
    title: 'Mercedes CLA 200 rouge à vendre',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=400&h=300&fit=crop',
    status: 'Offen',
    seller: 'luc_lry9',
    price: 14500.00,
    endTime: '3. Feb. 2025, 11:57',
    condition: 'Gebraucht'
  }
];

const mockSearches = [
  {
    id: 1,
    query: 'victorinox spirit x plus rachette',
    notifications: true
  }
];

const mockSellers = [
  {
    id: 1,
    name: 'Barbie19',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Barbie19',
    notifications: true
  },
  {
    id: 2,
    name: 'Dino_23',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dino23',
    notifications: true
  },
  {
    id: 3,
    name: 'Dobri48',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dobri48',
    notifications: false
  }
];

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState('articles');

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Meine Favoriten</h1>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger 
              value="articles"
              className="flex-1 sm:flex-none"
            >
              ARTIKEL
            </TabsTrigger>
            <TabsTrigger 
              value="searches"
              className="flex-1 sm:flex-none"
            >
              SUCHEN
            </TabsTrigger>
            <TabsTrigger 
              value="sellers"
              className="flex-1 sm:flex-none"
            >
              VERKÄUFER*INNEN
            </TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    Status
                  </Button>
                  <Button variant="outline" size="sm">
                    Kategorien
                  </Button>
                  <Button variant="outline" size="sm">
                    Verkäufer
                  </Button>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>

              <div className="divide-y">
                {mockFavorites.map((item) => (
                  <div key={item.id} className="p-4 flex gap-4">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link 
                            href={`/product/${item.id}`}
                            className="text-lg font-medium hover:text-[#ff6600] line-clamp-2"
                          >
                            {item.title}
                          </Link>
                          <div className="text-sm text-gray-500 mt-1">
                            {item.condition}
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="flex-shrink-0"
                        >
                          <Trash2 className="h-5 w-5 text-gray-400" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">
                          {item.status}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {item.endTime}
                        </span>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <Link 
                          href={`/seller/${item.seller}`}
                          className="text-sm text-[#008e9b] hover:underline"
                        >
                          {item.seller}
                        </Link>
                        <div className="text-right">
                          {item.bids && (
                            <div className="text-sm text-gray-500">
                              {item.bids} {item.bids === 1 ? 'Gebot' : 'Gebote'}
                            </div>
                          )}
                          <div className="font-bold">
                            {item.price ? (
                              <>
                                Sofort kaufen: CHF {item.price.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
                              </>
                            ) : (
                              <>
                                Nächstes Gebot: CHF {item.nextBid.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Searches Tab */}
          <TabsContent value="searches">
            <div className="bg-white rounded-lg shadow-sm divide-y">
              <div className="p-4">
                <div className="text-sm text-[#008e9b] mb-4">
                  Wie speichert man eine Suche?
                </div>
                {mockSearches.map((search) => (
                  <div key={search.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Search className="h-5 w-5 text-gray-400" />
                      <span>{search.query}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Switch
                        checked={search.notifications}
                        onCheckedChange={() => {}}
                      />
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-5 w-5 text-gray-400" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Sellers Tab */}
          <TabsContent value="sellers">
            <div className="bg-white rounded-lg shadow-sm divide-y">
              {mockSellers.map((seller) => (
                <div key={seller.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12">
                      <Image
                        src={seller.avatar}
                        alt={seller.name}
                        fill
                        className="rounded-full"
                      />
                    </div>
                    <Link 
                      href={`/seller/${seller.name}`}
                      className="text-[#008e9b] hover:underline"
                    >
                      {seller.name}
                    </Link>
                  </div>
                  <div className="flex items-center gap-4">
                    <Switch
                      checked={seller.notifications}
                      onCheckedChange={() => {}}
                    />
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-5 w-5 text-gray-400" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}