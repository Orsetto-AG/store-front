'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductTabsProps {
  description: string;
}

export default function ProductTabs({ description }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'shipping' | 'payment'>('description');

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="flex border-b">
        <button 
          onClick={() => setActiveTab('description')}
          className={cn(
            "px-8 py-3 font-medium transition-colors",
            activeTab === 'description' 
              ? "text-[#ff6600] border-b-2 border-[#ff6600]" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          Beschreibung
        </button>
        <button 
          onClick={() => setActiveTab('shipping')}
          className={cn(
            "px-8 py-3 font-medium transition-colors",
            activeTab === 'shipping' 
              ? "text-[#ff6600] border-b-2 border-[#ff6600]" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          Versand
        </button>
        <button 
          onClick={() => setActiveTab('payment')}
          className={cn(
            "px-8 py-3 font-medium transition-colors",
            activeTab === 'payment' 
              ? "text-[#ff6600] border-b-2 border-[#ff6600]" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          Zahlung
        </button>
      </div>
      <div className="p-6">
        {activeTab === 'description' && (
          <p className="text-gray-700">{description}</p>
        )}
        {activeTab === 'shipping' && (
          <div className="space-y-4 text-gray-700">
            <h3 className="font-medium text-lg">Versandinformationen</h3>
            <p>Versand innerhalb der Schweiz:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>B-Post: CHF 7.90 (2-3 Werktage)</li>
              <li>A-Post: CHF 9.90 (1-2 Werktage)</li>
              <li>Express: CHF 16.90 (Nächster Werktag)</li>
            </ul>
          </div>
        )}
        {activeTab === 'payment' && (
          <div className="space-y-4 text-gray-700">
            <h3 className="font-medium text-lg">Zahlungsmöglichkeiten</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>TWINT</li>
              <li>Kreditkarte (Visa, Mastercard)</li>
              <li>PostFinance Card</li>
              <li>PayPal</li>
              <li>Rechnung (nach Prüfung)</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}