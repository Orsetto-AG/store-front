'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SimilarProductsProps {
  productId: string;
}

export default function SimilarProducts({ productId }: SimilarProductsProps) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch similar products
    // Replace with actual API call
  }, [productId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product: any) => (
          <Link
            key={product.id}
            href={`/product/${product.id}`}
            className="group"
          >
            <div className="relative aspect-square mb-2 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <h3 className="font-medium text-gray-900 group-hover:text-[#ff6600] line-clamp-2">
              {product.title}
            </h3>
            <div className="text-gray-900 font-bold mt-1">
              CHF {product.price.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}