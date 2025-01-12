'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { HelpCircle } from 'lucide-react';
import ProductBasics from '@/components/product/steps/ProductBasics';
import ProductDetails from '@/components/product/steps/ProductDetails';

export default function AddProductPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    subcategory: '',
    description: '',
    condition: '',
    images: [],
    price: '',
    isAuction: false,
    quantity: 1,
    acceptOffers: false,
    shippingMethods: [],
    location: '',
    dimensions: { length: '', width: '', height: '' },
    weight: '',
  });

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">List an Item</h1>
          <p className="text-gray-500 mt-1">Fill in the details about your item</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            <span className={`text-sm font-medium ${currentStep >= 1 ? 'text-[#008e9b]' : 'text-gray-400'}`}>
              Product Information
            </span>
            <span className={`text-sm font-medium ${currentStep >= 2 ? 'text-[#008e9b]' : 'text-gray-400'}`}>
              Pricing & Shipping
            </span>
          </div>
          <Progress value={currentStep === 1 ? 50 : 100} className="h-1" />
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div 
            className="transition-transform duration-500 ease-in-out flex w-[200%]"
            style={{ transform: `translateX(-${(currentStep - 1) * 50}%)` }}
          >
            {/* Step 1: Product Basics */}
            <div className="w-1/2 flex-shrink-0 p-6">
              <ProductBasics data={formData} updateData={updateFormData} />
            </div>

            {/* Step 2: Product Details */}
            <div className="w-1/2 flex-shrink-0 p-6">
              <ProductDetails data={formData} updateData={updateFormData} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex items-center justify-between bg-white rounded-xl shadow-sm p-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => console.log('Save as draft')}
              className="h-12"
            >
              Save as Draft
            </Button>
            <Button
              variant="outline"
              onClick={() => console.log('Preview listing')}
              className="h-12"
            >
              Preview
            </Button>
          </div>
          <div className="flex gap-3">
            {currentStep === 2 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="h-12"
              >
                Back
              </Button>
            )}
            <Button
              onClick={() => {
                if (currentStep === 1) {
                  setCurrentStep(2);
                } else {
                  console.log('Publish listing', formData);
                }
              }}
              className="bg-[#007bff] hover:bg-[#0056b3] h-12 px-8 min-w-[120px]"
            >
              {currentStep === 2 ? 'Publish' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg bg-white"
        onClick={() => console.log('Show help')}
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}