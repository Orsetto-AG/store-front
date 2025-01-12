'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { MapPin } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const auctionDurations = [
  { value: '3', label: '3 days' },
  { value: '5', label: '5 days' },
  { value: '7', label: '7 days' },
  { value: '10', label: '10 days' }
];

export default function ProductDetails({ data, updateData }) {
  const [enableBuyNow, setEnableBuyNow] = useState(false);
  const [shippingMethods, setShippingMethods] = useState({
    local: false,
    standard: true,
    express: false
  });

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Pricing Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Pricing</h3>
        
        {/* Listing Type */}
        <RadioGroup
          defaultValue={data.isAuction ? 'auction' : 'fixed'}
          onValueChange={(value) => updateData({ isAuction: value === 'auction' })}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-[#008e9b] transition-colors">
            <RadioGroupItem value="fixed" id="fixed" />
            <Label htmlFor="fixed" className="flex-1 cursor-pointer">
              <div className="font-medium">Fixed Price</div>
              <div className="text-sm text-gray-500">Set your selling price</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4 hover:border-[#008e9b] transition-colors">
            <RadioGroupItem value="auction" id="auction" />
            <Label htmlFor="auction" className="flex-1 cursor-pointer">
              <div className="font-medium">Auction</div>
              <div className="text-sm text-gray-500">Let buyers bid</div>
            </Label>
          </div>
        </RadioGroup>

        {/* Price Fields */}
        {data.isAuction ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="startingPrice">Starting Price (CHF)</Label>
              <Input
                id="startingPrice"
                type="number"
                min="0"
                step="0.01"
                value={data.startingPrice}
                onChange={(e) => updateData({ startingPrice: e.target.value })}
                className="mt-1.5"
              />
            </div>
            
            <div>
              <Label htmlFor="increment">Minimum Bid Increment (CHF)</Label>
              <Input
                id="increment"
                type="number"
                min="1"
                step="1"
                defaultValue="1"
                className="mt-1.5"
              />
            </div>

            <div>
              <Label htmlFor="duration">Duration</Label>
              <Select
                value={data.duration}
                onValueChange={(value) => updateData({ duration: value })}
              >
                <SelectTrigger id="duration" className="mt-1.5">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {auctionDurations.map((duration) => (
                    <SelectItem key={duration.value} value={duration.value}>
                      {duration.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <Label htmlFor="buyNow">Enable "Buy Now" Price</Label>
                <div className="text-sm text-gray-500">Allow immediate purchase</div>
              </div>
              <Switch 
                id="buyNow"
                checked={enableBuyNow}
                onCheckedChange={setEnableBuyNow}
              />
            </div>

            {enableBuyNow && (
              <div>
                <Label htmlFor="buyNowPrice">Buy Now Price (CHF)</Label>
                <Input
                  id="buyNowPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  className="mt-1.5"
                />
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="price">Price (CHF)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={data.price}
                onChange={(e) => updateData({ price: e.target.value })}
                className="mt-1.5"
              />
            </div>
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <Label htmlFor="offers">Accept Offers</Label>
                <div className="text-sm text-gray-500">Allow buyers to negotiate</div>
              </div>
              <Switch 
                id="offers"
                checked={data.acceptOffers}
                onCheckedChange={(checked) => updateData({ acceptOffers: checked })}
              />
            </div>
          </div>
        )}
      </div>

      {/* Shipping Section */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Shipping</h3>

        {/* Location */}
        <div>
          <Label htmlFor="location">Pickup Location</Label>
          <div className="relative mt-1.5">
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="location"
              value={data.location}
              onChange={(e) => updateData({ location: e.target.value })}
              className="pl-10"
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Shipping Methods */}
        <div className="space-y-4">
          {/* Local Pickup */}
          <Card className="hover:border-[#008e9b] transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Local Pickup</CardTitle>
                  <CardDescription>Buyer collects the item</CardDescription>
                </div>
                <Switch
                  checked={shippingMethods.local}
                  onCheckedChange={(checked) => 
                    setShippingMethods(prev => ({ ...prev, local: checked }))
                  }
                />
              </div>
            </CardHeader>
          </Card>

          {/* Standard Shipping */}
          <Card className="hover:border-[#008e9b] transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Standard Shipping</CardTitle>
                  <CardDescription>2-3 business days</CardDescription>
                </div>
                <Switch
                  checked={shippingMethods.standard}
                  onCheckedChange={(checked) => 
                    setShippingMethods(prev => ({ ...prev, standard: checked }))
                  }
                />
              </div>
            </CardHeader>
            {shippingMethods.standard && (
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min="0"
                    step="0.1"
                    value={data.weight}
                    onChange={(e) => updateData({ weight: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="length">Length (cm)</Label>
                    <Input
                      id="length"
                      type="number"
                      min="0"
                      value={data.dimensions.length}
                      onChange={(e) => updateData({
                        dimensions: { ...data.dimensions, length: e.target.value }
                      })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="width">Width (cm)</Label>
                    <Input
                      id="width"
                      type="number"
                      min="0"
                      value={data.dimensions.width}
                      onChange={(e) => updateData({
                        dimensions: { ...data.dimensions, width: e.target.value }
                      })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      min="0"
                      value={data.dimensions.height}
                      onChange={(e) => updateData({
                        dimensions: { ...data.dimensions, height: e.target.value }
                      })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Express Shipping */}
          <Card className="hover:border-[#008e9b] transition-colors">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Express Shipping</CardTitle>
                  <CardDescription>Next business day</CardDescription>
                </div>
                <Switch
                  checked={shippingMethods.express}
                  onCheckedChange={(checked) => 
                    setShippingMethods(prev => ({ ...prev, express: checked }))
                  }
                />
              </div>
            </CardHeader>
            {shippingMethods.express && (
              <CardContent>
                <div>
                  <Label htmlFor="expressPrice">Shipping Price (CHF)</Label>
                  <Input
                    id="expressPrice"
                    type="number"
                    min="0"
                    step="0.1"
                    defaultValue="16.90"
                    className="mt-1.5"
                  />
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}