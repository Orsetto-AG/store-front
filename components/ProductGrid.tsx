'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

const dummyProducts = [
  {
    id: 1,
    title: 'Vintage Leica M6 Camera',
    description: 'Classic rangefinder camera in excellent condition with original leather case',
    price: 2999.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
    type: 'buy',
  },
  {
    id: 2,
    title: 'Custom Mechanical Keyboard',
    description: 'Hand-built mechanical keyboard with Cherry MX switches and PBT keycaps',
    price: 350,
    image: 'https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=400&h=300&fit=crop',
    type: 'auction',
  },
  {
    id: 3,
    title: 'Handcrafted Leather Messenger Bag',
    description: 'Premium full-grain leather bag with brass hardware and adjustable strap',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=400&h=300&fit=crop',
    type: 'buy',
  },
];

interface ProductGridProps {
  viewMode: 'grid' | 'list';
}

export default function ProductGrid({ viewMode }: ProductGridProps) {
  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        {dummyProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow flex"
          >
            <div className="relative w-80 h-64">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 p-6">
              <h3 className="font-semibold text-xl mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  CHF {product.price.toFixed(2)}
                </span>
                <Button 
                  size="lg"
                  variant={product.type === 'buy' ? 'default' : 'secondary'}
                  className={product.type === 'buy' ? 'bg-[#ff6600] hover:bg-[#e65c00]' : ''}
                >
                  {product.type === 'buy' ? 'Buy Now' : 'Place Bid'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {dummyProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all hover:-translate-y-1"
        >
          <div className="relative h-64">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">
                CHF {product.price.toFixed(2)}
              </span>
              <Button 
                variant={product.type === 'buy' ? 'default' : 'secondary'}
                className={product.type === 'buy' ? 'bg-[#ff6600] hover:bg-[#e65c00]' : ''}
              >
                {product.type === 'buy' ? 'Buy Now' : 'Place Bid'}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}