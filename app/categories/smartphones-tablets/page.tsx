'use client';

import { useState } from 'react';
import { Filter, ChevronDown, Grid, List, SlidersHorizontal, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ProductGrid from '@/components/ProductGrid';

// Mock data for filters
const brands = [
  'Apple',
  'Samsung',
  'Google',
  'Xiaomi',
  'OnePlus',
  'OPPO',
  'Huawei',
  'Sony',
];

const mockProducts = [
  {
    id: 1,
    title: 'iPhone 15 Pro Max - 256GB',
    price: 1299.00,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=300&fit=crop',
    bids: 12,
    location: 'Zürich',
    type: 'auction',
    condition: 'Neu'
  },
  {
    id: 2,
    title: 'Samsung Galaxy S23 Ultra',
    price: 899.00,
    image: 'https://images.unsplash.com/photo-1675785931264-766e651b07ce?w=400&h=300&fit=crop',
    location: 'Basel',
    type: 'buy',
    condition: 'Wie neu'
  },
];

const quickFilters = [
  { label: 'Neu', value: 'new' },
  { label: 'Sofort kaufen', value: 'buy-now' },
  { label: 'Auktionen', value: 'auctions' },
  { label: 'Mit Versand', value: 'shipping' },
];

export default function SmartphonesTabletsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([1, 3000]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceRange([priceRange[0], value]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Category Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Smartphones & Tablets</h1>
            <p className="text-gray-500 mt-1">
              {mockProducts.length} Artikel gefunden
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Button
              variant="outline"
              className="md:hidden"
              onClick={() => setShowMobileFilters(true)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className="hidden md:flex"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className="hidden md:flex"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {quickFilters.map(filter => (
            <Badge
              key={filter.value}
              variant={activeFilters.includes(filter.value) ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-gray-100 transition-colors"
              onClick={() => toggleFilter(filter.value)}
            >
              {filter.label}
              {activeFilters.includes(filter.value) && (
                <X className="h-3 w-3 ml-1" onClick={(e) => {
                  e.stopPropagation();
                  toggleFilter(filter.value);
                }} />
              )}
            </Badge>
          ))}
        </div>

        {/* Search and Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          {/* Search Bar */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="In dieser Kategorie suchen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#008e9b] focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Filters */}
          <div className="hidden md:block p-4">
            <div className="flex flex-wrap gap-4 items-center">
              {/* Main Filters */}
              <div className="flex flex-wrap gap-2 flex-1">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Kategorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Kategorien</SelectItem>
                    <SelectItem value="smartphones">Smartphones</SelectItem>
                    <SelectItem value="tablets">Tablets</SelectItem>
                    <SelectItem value="accessories">Zubehör</SelectItem>
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Marke" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Marken</SelectItem>
                    {brands.map(brand => (
                      <SelectItem key={brand} value={brand.toLowerCase()}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select defaultValue="all">
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Zustand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Alle Zustände</SelectItem>
                    <SelectItem value="new">Neu</SelectItem>
                    <SelectItem value="like-new">Wie neu</SelectItem>
                    <SelectItem value="used">Gebraucht</SelectItem>
                  </SelectContent>
                </Select>

                {/* Price Range Filter */}
                <div className="relative">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowPriceFilter(!showPriceFilter)}
                    className="w-[150px]"
                  >
                    Preis
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                  
                  {showPriceFilter && (
                    <div className="absolute top-full left-0 mt-2 p-4 bg-white rounded-lg shadow-lg w-[300px] z-50">
                      <div className="space-y-6">
                        <Slider
                          value={priceRange}
                          min={1}
                          max={3000}
                          step={1}
                          onValueChange={handlePriceChange}
                          className="mt-6"
                        />
                        
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <label className="text-sm text-gray-500 mb-1 block">Min.</label>
                            <input
                              type="number"
                              value={priceRange[0]}
                              onChange={handleMinPriceChange}
                              className="w-full px-3 py-1 border rounded-md text-sm"
                              min={1}
                              max={priceRange[1]}
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-sm text-gray-500 mb-1 block">Max.</label>
                            <input
                              type="number"
                              value={priceRange[1]}
                              onChange={handleMaxPriceChange}
                              className="w-full px-3 py-1 border rounded-md text-sm"
                              min={priceRange[0]}
                              max={3000}
                            />
                          </div>
                        </div>
                        
                        <Button
                          variant="outline"
                          onClick={() => setShowPriceFilter(false)}
                          className="w-full"
                        >
                          SCHLIESSEN
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sort and More Filters */}
              <div className="flex items-center gap-2">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sortierung" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevanz</SelectItem>
                    <SelectItem value="price-asc">Preis aufsteigend</SelectItem>
                    <SelectItem value="price-desc">Preis absteigend</SelectItem>
                    <SelectItem value="newest">Neueste zuerst</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  Mehr Filter
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Filters Modal */}
          {showMobileFilters && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
              <div className="absolute inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Filter & Sortierung</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
                  {/* Mobile Filter Content */}
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Kategorie</label>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Kategorie" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Alle Kategorien</SelectItem>
                          <SelectItem value="smartphones">Smartphones</SelectItem>
                          <SelectItem value="tablets">Tablets</SelectItem>
                          <SelectItem value="accessories">Zubehör</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Marke</label>
                      <Select defaultValue="all">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Marke" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Alle Marken</SelectItem>
                          {brands.map(brand => (
                            <SelectItem key={brand} value={brand.toLowerCase()}>{brand}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Preis (CHF)</label>
                      <div className="space-y-6">
                        <Slider
                          value={priceRange}
                          min={1}
                          max={3000}
                          step={1}
                          onValueChange={handlePriceChange}
                          className="mt-6"
                        />
                        
                        <div className="flex items-center gap-2">
                          <div className="flex-1">
                            <label className="text-sm text-gray-500 mb-1 block">Min.</label>
                            <input
                              type="number"
                              value={priceRange[0]}
                              onChange={handleMinPriceChange}
                              className="w-full px-3 py-1 border rounded-md text-sm"
                              min={1}
                              max={priceRange[1]}
                            />
                          </div>
                          <div className="flex-1">
                            <label className="text-sm text-gray-500 mb-1 block">Max.</label>
                            <input
                              type="number"
                              value={priceRange[1]}
                              onChange={handleMaxPriceChange}
                              className="w-full px-3 py-1 border rounded-md text-sm"
                              min={priceRange[0]}
                              max={3000}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Sortierung</label>
                      <Select defaultValue="relevance">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Sortierung" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="relevance">Relevanz</SelectItem>
                          <SelectItem value="price-asc">Preis aufsteigend</SelectItem>
                          <SelectItem value="price-desc">Preis absteigend</SelectItem>
                          <SelectItem value="newest">Neueste zuerst</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      Abbrechen
                    </Button>
                    <Button
                      className="flex-1 bg-[#008e9b] hover:bg-[#007a85]"
                      onClick={() => setShowMobileFilters(false)}
                    >
                      Filter anwenden
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Active Filters Display */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {activeFilters.map(filter => (
              <Badge
                key={filter}
                variant="secondary"
                className="bg-[#008e9b] text-white hover:bg-[#007a85]"
              >
                {quickFilters.find(f => f.value === filter)?.label}
                <X
                  className="h-3 w-3 ml-1 cursor-pointer"
                  onClick={() => toggleFilter(filter)}
                />
              </Badge>
            ))}
            {activeFilters.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-sm text-gray-500 hover:text-gray-700"
                onClick={() => setActiveFilters([])}
              >
                Alle Filter zurücksetzen
              </Button>
            )}
          </div>
        )}

        {/* Products Grid/List */}
        <ProductGrid viewMode={viewMode} />
      </div>
    </div>
  );
}