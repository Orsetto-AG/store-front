"use client";

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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">
          Your Offer Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 text-xs">CHF</span>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="pl-14 block w-full h-12 rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm"
            min="0"
            step="1"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="block text-xs font-medium text-gray-700">
          Delivery Options
        </label>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setShippingMethod('delivery')}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              shippingMethod === 'delivery'
                ? 'border-orange-600'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <Truck className={`h-4 w-4 ${
                shippingMethod === 'delivery' ? 'text-orange-600' : 'text-gray-400'
              }`} />
              <div>
                <p className="font-medium text-sm">Delivery</p>
                <p className="text-xs text-gray-500">$10.50</p>
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setShippingMethod('pickup')}
            className={`p-4 rounded-lg border-2 text-left transition-all ${
              shippingMethod === 'pickup'
                ? 'border-orange-600'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <MapPin className={`h-4 w-4 ${
                shippingMethod === 'pickup' ? 'text-orange-600' : 'text-gray-400'
              }`} />
              <div>
                <p className="font-medium text-sm">Local Pickup</p>
                <p className="text-xs text-gray-500">Free</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="p-4 rounded-lg space-y-3">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Offer Amount</span>
          <span className="font-medium">${amount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500">Shipping</span>
          <span className="font-medium">${shippingMethod === 'delivery' ? '10.50' : '0.00'}</span>
        </div>
        <div className="flex justify-between text-sm font-bold pt-3 border-t border-orange-200">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-indigo-600 to-blue-500 text-white py-3 px-6 rounded-lg transition-colors font-medium text-sm"
      >
        Submit Offer
      </button>

      <p className="text-xs text-gray-500 text-center">
        By submitting this offer, you agree to pay the total amount if accepted
      </p>
    </form>
  );
};
