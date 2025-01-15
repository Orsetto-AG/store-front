'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ProductTabsProps {
  description: string;
}

export default function ProductTabs({ description }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'shipping'>('description');

  return (
    <div className="bg-white rounded-lg shadow-sm max-w-4xl mx-auto overflow-hidden">
      <div className="flex border-b">
        <button 
          onClick={() => setActiveTab('description')}
          className={cn(
            "px-8 py-3 font-medium transition-colors w-full",
            activeTab === 'description' 
              ? "text-[#ff6600]" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          Artikelbeschreibung des Verkäufers
        </button>
        <button 
          onClick={() => setActiveTab('shipping')}
          className={cn(
            "px-8 py-3 font-medium transition-colors w-full",
            activeTab === 'shipping' 
              ? "text-[#ff6600]" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          Wichtige Änderung
        </button>
      </div>
      <div className="p-6">
        {activeTab === 'description' && (
          <p className="text-gray-700">{description}</p>
        )}
        {activeTab === 'shipping' && (
          <div className="space-y-4 text-gray-700">
            <ul className="space-y-2">
              <li>Kein Änderung</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}