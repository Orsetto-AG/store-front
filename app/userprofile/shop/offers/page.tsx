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
import { Grid, List } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data
const mockProducts = [
  {
    id: 1,
    title: 'GLADIATOR MEDIABOOK BLU-RAY',
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=200&h=200&fit=crop',
    articleNumber: '1241388622',
    format: 'Blu-ray',
    condition: 'Neu',
    price: 25.00,
    bids: 0,
    endDate: 'Di, 14. Jan., 12:50'
  },
  {
    id: 2,
    title: 'FROM DUSK TILL DAWN 2&3 COLLECTION BLU-RAY',
    image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=200&h=200&fit=crop',
    articleNumber: '1251777700',
    format: 'Blu-ray',
    condition: 'Wie neu',
    price: 12.00,
    bids: 0,
    endDate: 'Mo, 13. Jan., 12:24'
  }
];

export default function ShopOffersPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    category: 'all',
    format: 'all',
    condition: 'all',
    sort: 'newest'
  });

  return (
    <>
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6 space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <Select value={filters.category} onValueChange={(value) => setFilters(prev => ({ ...prev, category: value }))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Kategorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Kategorien</SelectItem>
              <SelectItem value="movies">Filme & DVDs</SelectItem>
              <SelectItem value="music">Musik</SelectItem>
              <SelectItem value="games">Spiele</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.format} onValueChange={(value) => setFilters(prev => ({ ...prev, format: value }))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Formate</SelectItem>
              <SelectItem value="bluray">Blu-ray</SelectItem>
              <SelectItem value="dvd">DVD</SelectItem>
              <SelectItem value="cd">CD</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.condition} onValueChange={(value) => setFilters(prev => ({ ...prev, condition: value }))}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Zustand" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Zustände</SelectItem>
              <SelectItem value="new">Neu</SelectItem>
              <SelectItem value="like-new">Wie neu</SelectItem>
              <SelectItem value="used">Gebraucht</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1" />

          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          <Select value={filters.sort} onValueChange={(value) => setFilters(prev => ({ ...prev, sort: value }))}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sortierung" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Neueste zuerst</SelectItem>
              <SelectItem value="price-asc">Preis aufsteigend</SelectItem>
              <SelectItem value="price-desc">Preis absteigend</SelectItem>
              <SelectItem value="ending">Bald endend</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid/List */}
      <div className={cn(
        'grid gap-6',
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      )}>
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className={cn(
              'bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow',
              viewMode === 'list' && 'flex'
            )}
          >
            <div className={cn(
              'relative',
              viewMode === 'grid' ? 'aspect-square' : 'w-48 flex-shrink-0'
            )}>
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium text-lg mb-2 line-clamp-2">{product.title}</h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">
                  Artikel: {product.articleNumber}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {product.format}
                  </span>
                  <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                    {product.condition}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-lg">
                    CHF {product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.bids} {product.bids === 1 ? 'Gebot' : 'Gebote'}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Endet: {product.endDate}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}