'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Timer } from 'lucide-react';
import CountdownTimer from './CountdownTimer';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  watchers?: number;
  offers?: number;
  type: 'auction' | 'buy';
  endTime?: string;
  currentBid?: number;
  isEnded?: boolean;
}

interface ProductRowProps {
  title: string;
  products: Product[];
  type: 'auction' | 'buy';
  viewAllHref: string;
}

export default function ProductRow({ title, products, type, viewAllHref }: ProductRowProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {title}
          <div className="h-1 w-12 bg-[#ff6600] mt-2 rounded-full" />
        </h2>
        <Link 
          href={viewAllHref} 
          className="text-[#008e9b] hover:text-[#006d77] font-medium"
        >
          View All
        </Link>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id}>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all hover:-translate-y-1 group h-full">
              <div className="relative">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <button 
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    // Add to wishlist logic here
                  }}
                >
                  <Heart size={20} className="text-gray-600 hover:text-[#ff6600]" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-lg mb-2 text-gray-800 line-clamp-2">{product.title}</h3>
                <div className="flex flex-col space-y-2">
                  {type === 'auction' ? (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Current Bid</span>
                        <span className="text-xl font-bold text-gray-900">
                          CHF {product.currentBid?.toLocaleString('de-CH', { minimumFractionDigits: 2 }) || product.price.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                      {!product.isEnded && product.endTime && (
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Timer size={16} />
                          <CountdownTimer 
                            endTime={new Date(product.endTime)}
                            onEnd={() => {
                              // Handle auction end
                            }}
                          />
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        CHF {product.price.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
                      </span>
                      <div className="text-sm text-gray-500">
                        {product.watchers && (
                          <span>{product.watchers} watching</span>
                        )}
                        {product.offers && (
                          <span> · {product.offers} offers</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}