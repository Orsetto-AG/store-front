'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Bid {
  id: string;
  bidder: { name: string };
  amount: number;
  createdAt: string;
}

interface AuctionTabsProps {
  description: string;
  bids?: Bid[];
}

export default function AuctionTabs({ description, bids }: AuctionTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'shipping' | 'payment' | 'bids'>('description');

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
        <button 
          onClick={() => setActiveTab('bids')}
          className={cn(
            "px-8 py-3 font-medium transition-colors",
            activeTab === 'bids' 
              ? "text-[#ff6600] border-b-2 border-[#ff6600]" 
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          Gebotshistorie
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
        {activeTab === 'bids' && (
          <div className="space-y-4">
            {bids && bids.length > 0 ? (
              <div className="divide-y">
                {bids.map((bid) => (
                  <div key={bid.id} className="py-3 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-medium">
                        {bid.bidder.name.slice(0, 2)}***{bid.bidder.name.slice(-2)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(bid.createdAt).toLocaleString('de-CH')}
                      </div>
                    </div>
                    <div className="font-bold">
                      CHF {bid.amount.toLocaleString('de-CH', { minimumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Noch keine Gebote für diesen Artikel.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}