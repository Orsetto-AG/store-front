'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const conditions = [
  { value: 'new', label: 'New' },
  { value: 'like-new', label: 'Like New' },
  { value: 'used', label: 'Used' },
  { value: 'for-parts', label: 'For Parts' },
];

export default function BasicInfo({ data, updateData }) {
  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="title">Product Title</Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => updateData({ title: e.target.value })}
          maxLength={80}
          placeholder="Enter a descriptive title"
          className="mt-1.5"
        />
        <div className="text-xs text-gray-500 mt-1">
          {data.title.length}/80 characters
        </div>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={data.category}
          onValueChange={(value) => updateData({ category: value })}
        >
          <SelectTrigger id="category" className="mt-1.5">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="fashion">Fashion</SelectItem>
            <SelectItem value="home">Home & Living</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          placeholder="Describe your product in detail"
          className="mt-1.5 min-h-[200px]"
        />
        <div className="text-xs text-gray-500 mt-1">
          Minimum 100 characters required
        </div>
      </div>

      <div>
        <Label htmlFor="condition">Condition</Label>
        <Select
          value={data.condition}
          onValueChange={(value) => updateData({ condition: value })}
        >
          <SelectTrigger id="condition" className="mt-1.5">
            <SelectValue placeholder="Select condition" />
          </SelectTrigger>
          <SelectContent>
            {conditions.map((condition) => (
              <SelectItem key={condition.value} value={condition.value}>
                {condition.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}