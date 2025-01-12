'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function MediaUpload({ data, updateData }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
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
    <div className="space-y-6">
      {/* Drag & Drop Zone */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
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
            JPG, PNG, WEBP | Max 5MB per image
          </p>
        </div>
      </div>

      {/* Image Preview Grid */}
      {data.images.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
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

      {/* Video Upload Button */}
      <div className="flex items-center justify-center">
        <Button variant="outline" className="relative">
          Upload Video
          <Badge variant="secondary" className="absolute -top-2 -right-2">
            Premium
          </Badge>
        </Button>
      </div>
    </div>
  );
}