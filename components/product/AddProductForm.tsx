'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { HelpCircle } from 'lucide-react';
import ProductBasics from './steps/ProductBasics';
import ProductDetails from './steps/ProductDetails';

export default function AddProductForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
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
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <Progress value={currentStep === 1 ? 50 : 100} className="h-2" />
            <div className="flex justify-between mt-2">
              <div className={`text-sm ${currentStep >= 1 ? 'text-[#008e9b]' : 'text-gray-400'}`}>
                Product Information
              </div>
              <div className={`text-sm ${currentStep >= 2 ? 'text-[#008e9b]' : 'text-gray-400'}`}>
                Pricing & Shipping
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div 
            className="relative overflow-hidden bg-white rounded-lg shadow-sm"
            style={{ minHeight: '600px' }}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(-${(currentStep - 1) * 100}%)`,
                width: '200%'
              }}
            >
              <div className="w-full flex-shrink-0 p-6">
                <ProductBasics data={formData} updateData={updateFormData} />
              </div>
              <div className="w-full flex-shrink-0 p-6">
                <ProductDetails data={formData} updateData={updateFormData} />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-6 bg-white rounded-lg shadow-sm p-4">
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => console.log('Save as draft')}
              >
                Save as Draft
              </Button>
              <Button
                variant="outline"
                onClick={() => console.log('Preview listing')}
              >
                Preview
              </Button>
            </div>
            <div className="flex gap-4">
              {currentStep === 2 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
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
                className="bg-[#ff6600] hover:bg-[#e65c00]"
              >
                {currentStep === 2 ? 'Publish Listing' : 'Continue'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Help Button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg"
        onClick={() => console.log('Show help')}
      >
        <HelpCircle className="h-6 w-6" />
      </Button>
    </div>
  );
}