import { useRef } from 'react';
import { ChevronLeft, ChevronRight, Heart, Timer, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { NoSSR } from './NoSSR';
import { cn } from '@/lib/utils';
import CountdownTimer from './CountdownTimer';

interface Product {
  id: number;
  title: string;
  price?: number;
  currentBid?: number;
  image: string;
  endTime?: string;
  type: 'auction' | 'fixed' | 'new';
  watchCount?: number;
  bids?: number;
  location?: string;
  isNew?: boolean;
}

interface ProductSliderProps {
  title: string;
  products: Product[];
  type: 'auction' | 'fixed' | 'new';
  viewAllHref: string;
}

export default function ProductSlider({ title, products, type, viewAllHref }: ProductSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.offsetWidth;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-0">
        <h2 className="text-base font-bold text-gray-800">
          {title}
          <div className="h-0.5 w-8 bg-[#ff6600] mt-1 rounded-full" />
        </h2>
        <Link 
          href={viewAllHref}
          className="text-[#008e9b] hover:text-[#006d77] text-sm font-medium"
        >
          Alle ansehen
        </Link>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 hidden sm:block"
          aria-label="Previous items"
        >
          <ChevronLeft size={16} />
        </button>

        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-1 px-4 sm:px-0"
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="flex-none w-[160px] xs:w-[180px] sm:w-[200px] lg:w-[calc((100%-5*1rem)/6)] snap-start"
            >
              <Card className="h-[90%] hover:shadow-md transition-all duration-200 border-gray-100"> {/* Reduce height to 90% */}
                <div className="relative">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover rounded-t-lg"
                      sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, (max-width: 1024px) 200px, 16.666vw"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-[#008e9b] hover:bg-[#008e9b] text-[10px] sm:text-xs">
                        Neu
                      </Badge>
                    )}
                  </div>
                  <button 
                    className="absolute top-2 right-2 p-1 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      // Add to wishlist logic
                    }}
                  >
                    <Heart size={14} className="text-gray-600 hover:text-[#ff6600]" />
                  </button>
                </div>

                <div className="p-2 sm:p-3">
                  <h3 className="text-xs font-medium mb-1 line-clamp-2 min-h-[32px] text-gray-700">
                    {product.title}
                  </h3>

                  <div className="space-y-1">
                    {type === 'auction' ? (
                      <>
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-500">
                          <span>Aktuelles Gebot</span>
                          <div className="flex items-center gap-1">
                            <Eye size={12} />
                            <span>{product.watchCount}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-bold">
                            CHF {product.currentBid?.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        {product.endTime && (
                          <div className="flex items-center gap-1.5 bg-gray-50 rounded-md p-1.5">
                            <Timer size={12} className="text-gray-500" />
                            <NoSSR>
                              <CountdownTimer 
                                endTime={new Date(product.endTime)} 
                                onEnd={() => {
                                  // Handle auction end
                                }}
                                className="text-[10px] sm:text-[11px] font-medium"
                              />
                            </NoSSR>
                          </div>
                        )}
                        <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-gray-500">
                          <span>{product.bids} {product.bids === 1 ? 'Gebot' : 'Gebote'}</span>
                          <span>{product.location}</span>
                        </div>
                        <Button 
                          size="sm"
                          className="w-full bg-[#008e9b] hover:bg-[#007a85] text-[10px] sm:text-[11px] h-6 sm:h-7"
                        >
                          Bieten
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-bold">
                            CHF {product.price?.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="text-[10px] sm:text-[11px] text-gray-500 mb-2">
                          {product.location}
                        </div>
                        <Button 
                          size="sm"
                          className="w-full bg-[#ff6600] hover:bg-[#e65c00] text-[10px] sm:text-[11px] h-6 sm:h-7"
                        >
                          Sofort kaufen
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-1.5 rounded-full shadow-md transition-all opacity-0 group-hover:opacity-100 hidden sm:block"
          aria-label="Next items"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
