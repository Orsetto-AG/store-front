'use client';

import React, { useState } from 'react';
import { PriceProposal } from '@/types';
import { Truck, MapPin } from 'lucide-react';

interface PriceProposalFormProps {
  productPrice: number;
  onSubmit: (proposal: PriceProposal) => void;
}

export const PriceProposalForm: React.FC<PriceProposalFormProps> = ({
  productPrice,
  onSubmit,
}) => {
  const [amount, setAmount] = useState<number>(productPrice);
  const [shippingMethod, setShippingMethod] = useState<'pickup' | 'delivery'>('delivery');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      amount,
      shippingMethod,
      shippingCost: shippingMethod === 'delivery' ? 10.50 : 0,
    });
  };

  const total = amount + (shippingMethod === 'delivery' ? 10.50 : 0);
  const savings = productPrice - amount;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your Offer Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="pl-8 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-lg"
            min="0"
            step="1"
          />
        </div>
        {savings > 0 && (
          <p className="mt-2 text-sm text-green-600">
            You save ${savings.toFixed(2)} off the list price
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Delivery Options
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setShippingMethod('delivery')}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              shippingMethod === 'delivery'
                ? 'border-orange-600 bg-[#d6eadf]'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Truck className={`h-5 w-5 ${
                shippingMethod === 'delivery' ? 'text-orange-600' : 'text-gray-400'
              }`} />
              <div>
                <p className="font-medium">Delivery</p>
                <p className="text-sm text-gray-500">$10.50</p>
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setShippingMethod('pickup')}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              shippingMethod === 'pickup'
                ? 'border-orange-600 bg-[#d6eadf]'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <MapPin className={`h-5 w-5 ${
                shippingMethod === 'pickup' ? 'text-orange-600' : 'text-gray-400'
              }`} />
              <div>
                <p className="font-medium">Local Pickup</p>
                <p className="text-sm text-gray-500">Free</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-[#d6eadf] p-4 rounded-lg space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Offer Amount</span>
          <span className="font-medium">${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium">${shippingMethod === 'delivery' ? '10.50' : '0.00'}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-3 border-t border-orange-200">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg"
      >
        Submit Offer
      </button>
      
      <p className="text-sm text-gray-500 text-center">
        By submitting this offer, you agree to pay the total amount if accepted
      </p>
    </form>
  );
};