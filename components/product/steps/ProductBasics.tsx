'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Category data structure with subcategories
const categories = {
  electronics: {
    label: 'Electronics',
    subcategories: [
      { value: 'computers', label: 'Computers & Laptops', brands: ['Apple', 'Dell', 'HP', 'Lenovo'] },
      { value: 'phones', label: 'Smartphones & Tablets', brands: ['Apple', 'Samsung', 'Google'] },
      { value: 'cameras', label: 'Cameras & Photography', brands: ['Canon', 'Nikon', 'Sony'] }
    ]
  },
  fashion: {
    label: 'Fashion',
    subcategories: [
      { value: 'mens', label: 'Men\'s Clothing', types: ['Shirts', 'Pants', 'Jackets'] },
      { value: 'womens', label: 'Women\'s Clothing', types: ['Dresses', 'Tops', 'Skirts'] },
      { value: 'accessories', label: 'Accessories', types: ['Bags', 'Belts', 'Scarves'] }
    ]
  }
};

const conditions = [
  { value: 'new', label: 'New with tags' },
  { value: 'like-new', label: 'Like new' },
  { value: 'very-good', label: 'Very good' },
  { value: 'good', label: 'Good' },
  { value: 'acceptable', label: 'Acceptable' }
];

export default function ProductBasics({ data, updateData }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFiles = (files: File[]) => {
    if (data.images.length + files.length > 8) {
      alert('Maximum 8 images allowed');
      return;
    }

    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length !== files.length) {
      alert('Some files were skipped. Only images up to 5MB are allowed.');
    }

    const newImages = validFiles.map(file => URL.createObjectURL(file));
    updateData({ images: [...data.images, ...newImages] });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Title */}
      <div>
        <Label htmlFor="title" className="text-base font-semibold">
          Product Title
        </Label>
        <Input
          id="title"
          value={data.title}
          onChange={(e) => updateData({ title: e.target.value })}
          maxLength={80}
          placeholder="Enter a descriptive title"
          className="mt-2"
        />
        <div className="flex justify-between mt-1.5">
          <span className="text-xs text-gray-500">
            Be specific and include important details
          </span>
          <span className="text-xs text-gray-500">
            {data.title.length}/80
          </span>
        </div>
      </div>

      {/* Media Upload */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-base font-semibold">
            Product Images
          </Label>
          <Button variant="outline" size="sm" className="relative">
            Upload Video
            <Badge 
              variant="secondary" 
              className="absolute -top-2 -right-2 bg-[#008e9b] text-white"
            >
              Premium
            </Badge>
          </Button>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive ? 'border-[#008e9b] bg-[#008e9b]/5' : 'border-gray-200'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <p className="text-sm font-medium">
              Drag and drop your images here, or{' '}
              <label className="text-[#008e9b] cursor-pointer hover:underline">
                browse
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleFiles(Array.from(e.target.files || []))}
                />
              </label>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              JPG, PNG, WEBP | Max 5MB per image | Up to 8 images
            </p>
          </div>
        </div>

        {/* Image Preview Grid */}
        {data.images.length > 0 && (
          <div className="grid grid-cols-4 gap-4 mt-4">
            {data.images.map((image, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square relative rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    const newImages = [...data.images];
                    newImages.splice(index, 1);
                    updateData({ images: newImages });
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
                {index === 0 && (
                  <Badge className="absolute top-2 left-2">Cover</Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Category Selection */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Category</Label>
        
        {/* Main Category */}
        <Select
          value={selectedMainCategory}
          onValueChange={(value) => {
            setSelectedMainCategory(value);
            setSelectedSubcategory('');
            updateData({ category: value, subcategory: '' });
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select main category" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(categories).map(([key, category]) => (
              <SelectItem key={key} value={key}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Subcategory - Only shown when main category is selected */}
        {selectedMainCategory && (
          <div className="mt-4 pl-4 border-l-2 border-gray-100">
            <Label className="text-sm font-medium text-gray-600">
              Subcategory
            </Label>
            <Select
              value={selectedSubcategory}
              onValueChange={(value) => {
                setSelectedSubcategory(value);
                updateData({ subcategory: value });
              }}
            >
              <SelectTrigger className="mt-1.5">
                <SelectValue placeholder="Select subcategory" />
              </SelectTrigger>
              <SelectContent>
                {categories[selectedMainCategory]?.subcategories.map((sub) => (
                  <SelectItem key={sub.value} value={sub.value}>
                    {sub.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <Label htmlFor="description" className="text-base font-semibold">
          Description
        </Label>
        <Textarea
          id="description"
          value={data.description}
          onChange={(e) => updateData({ description: e.target.value })}
          placeholder="Describe your product in detail. Include information about features, condition, and any other relevant details."
          className="mt-2 min-h-[200px] resize-none"
        />
        <div className="text-xs text-gray-500 mt-1.5">
          Minimum 100 characters required
        </div>
      </div>

      {/* Condition */}
      <div>
        <Label htmlFor="condition" className="text-base font-semibold">
          Condition
        </Label>
        <Select
          value={data.condition}
          onValueChange={(value) => updateData({ condition: value })}
        >
          <SelectTrigger id="condition" className="mt-2">
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