'use client';

import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Package } from 'lucide-react';

export default function ReviewListing({ data }) {
  return (
    <div className="space-y-8">
      {/* Title and Images */}
      <div>
        <h2 className="text-xl font-semibold mb-4">{data.title}</h2>
        <div className="grid grid-cols-4 gap-4">
          {data.images.map((image, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
              />
              {index === 0 && (
                <Badge className="absolute top-2 left-2">Cover</Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Product Details</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-500">Category</dt>
                <dd className="font-medium">{data.category}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Condition</dt>
                <dd className="font-medium">{data.condition}</dd>
              </div>
              <div>
                <dt className="text-gray-500 mb-1">Description</dt>
                <dd className="text-sm">{data.description}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-4">Pricing & Duration</h3>
            <dl className="space-y-2">
              <div className="flex justify-between">
                <dt className="text-gray-500">Type</dt>
                <dd className="font-medium">
                  {data.isAuction ? 'Auction' : 'Fixed Price'}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">
                  {data.isAuction ? 'Starting Price' : 'Price'}
                </dt>
                <dd className="font-medium">
                  CHF {data.isAuction ? data.startingPrice : data.price}
                </dd>
              </div>
              {data.isAuction && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Duration</dt>
                  <dd className="font-medium">{data.duration} days</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* Shipping */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-medium mb-4">Shipping & Location</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="h-5 w-5" />
              <span>{data.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Package className="h-5 w-5" />
              <span>Standard shipping available</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}