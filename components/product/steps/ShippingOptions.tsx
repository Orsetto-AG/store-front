'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { MapPin } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function ShippingOptions({ data, updateData }) {
  return (
    <div className="space-y-8">
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
        <Label>Shipping Methods</Label>
        
        {/* Local Pickup */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Local Pickup</CardTitle>
                <CardDescription>Buyer collects the item</CardDescription>
              </div>
              <Switch />
            </div>
          </CardHeader>
        </Card>

        {/* Standard Shipping */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Standard Shipping</CardTitle>
                <CardDescription>2-3 business days</CardDescription>
              </div>
              <Switch defaultChecked />
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="0"
                  step="0.1"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="shippingPrice">Price (CHF)</Label>
                <Input
                  id="shippingPrice"
                  type="number"
                  min="0"
                  step="0.1"
                  defaultValue="7.90"
                  className="mt-1.5"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="length">Length (cm)</Label>
                <Input
                  id="length"
                  type="number"
                  min="0"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="width">Width (cm)</Label>
                <Input
                  id="width"
                  type="number"
                  min="0"
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  min="0"
                  className="mt-1.5"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Express Shipping */}
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Express Shipping</CardTitle>
                <CardDescription>Next business day</CardDescription>
              </div>
              <Switch />
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}