'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const durations = [
  { value: '3', label: '3 days' },
  { value: '5', label: '5 days' },
  { value: '7', label: '7 days' },
  { value: '14', label: '14 days' },
];

export default function PricingDuration({ data, updateData }) {
  return (
    <div className="space-y-8">
      {/* Listing Type */}
      <div className="space-y-4">
        <Label>Listing Type</Label>
        <RadioGroup
          defaultValue={data.isAuction ? 'auction' : 'fixed'}
          onValueChange={(value) => updateData({ isAuction: value === 'auction' })}
          className="grid grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 border rounded-lg p-4">
            <RadioGroupItem value="fixed" id="fixed" />
            <Label htmlFor="fixed" className="flex-1 cursor-pointer">
              <div className="font-medium">Fixed Price</div>
              <div className="text-sm text-gray-500">Set your selling price</div>
            </Label>
          </div>
          <div className="flex items-center space-x-2 border rounded-lg p-4">
            <RadioGroupItem value="auction" id="auction" />
            <Label htmlFor="auction" className="flex-1 cursor-pointer">
              <div className="font-medium">Auction</div>
              <div className="text-sm text-gray-500">Let buyers bid</div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Pricing Fields */}
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
            <Label htmlFor="minIncrement">Minimum Bid Increment (CHF)</Label>
            <Input
              id="minIncrement"
              type="number"
              min="1"
              step="1"
              defaultValue="1"
              className="mt-1.5"
            />
          </div>
          <div className="flex items-center justify-between border rounded-lg p-4">
            <div>
              <Label htmlFor="buyNow">Enable "Buy Now" Price</Label>
              <div className="text-sm text-gray-500">Allow immediate purchase</div>
            </div>
            <Switch id="buyNow" />
          </div>
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
            <Switch id="offers" />
          </div>
        </div>
      )}

      {/* Duration */}
      {data.isAuction && (
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
              {durations.map((duration) => (
                <SelectItem key={duration.value} value={duration.value}>
                  {duration.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Quantity */}
      {!data.isAuction && (
        <div>
          <Label htmlFor="quantity">Quantity Available</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            defaultValue="1"
            className="mt-1.5 w-32"
          />
        </div>
      )}
    </div>
  );
}