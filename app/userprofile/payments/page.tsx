'use client';

import { useState } from 'react';
import { Search, Download, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface Product {
  id: string;
  name: string;
  price: number;
  date: string;
}

const mockProducts: Product[] = [
  {
    id: 'p1',
    name: 'iPhone 15 Pro Max - 256GB',
    price: 1299.00,
    date: '15. Jan. 2025'
  },
  {
    id: 'p2',
    name: 'MacBook Pro M3 Max',
    price: 3499.00,
    date: '14. Jan. 2025'
  },
  {
    id: 'p3',
    name: 'Sony A7 IV Kit',
    price: 1799.00,
    date: '13. Jan. 2025'
  }
];

interface PaymentRecord {
  id: string;
  type: 'Erfolgsprovision' | 'Mehrwertsteuer';
  productId: string;
  productName: string;
  date: string;
  status: 'Offen';
  amount: number;
}

const generatePaymentRecords = (products: Product[]): PaymentRecord[] => {
  return products.flatMap(product => [
    {
      id: `${product.id}-commission`,
      type: 'Erfolgsprovision',
      productId: product.id,
      productName: product.name,
      date: product.date,
      status: 'Offen',
      amount: product.price * 0.04 // 4% commission
    },
    {
      id: `${product.id}-tax`,
      type: 'Mehrwertsteuer',
      productId: product.id,
      productName: product.name,
      date: product.date,
      status: 'Offen',
      amount: product.price * 0.081 // 8.1% tax
    }
  ]);
};

export default function PaymentsPage() {
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');

  const paymentRecords = generatePaymentRecords(mockProducts);

  const toggleProductSelection = (productId: string) => {
    const newSelection = new Set(selectedProducts);
    if (newSelection.has(productId)) {
      newSelection.delete(productId);
    } else {
      newSelection.add(productId);
    }
    setSelectedProducts(newSelection);
  };

  const calculateTotal = () => {
    return paymentRecords
      .filter(record => selectedProducts.has(record.productId))
      .reduce((sum, record) => sum + record.amount, 0);
  };

  const filteredRecords = paymentRecords.filter(record =>
    record.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Zahlungen</h1>

          {/* Outstanding Fees Card */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-lg font-semibold mb-1">Offene Gebühren</h2>
                <div className="text-3xl font-bold">
                  CHF {calculateTotal().toFixed(2)}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Bitte bezahle den offenen Betrag bis spätestens 20. Jan. 2025.
                </p>
              </div>
              <Button 
                className="bg-[#008e9b] hover:bg-[#007a85]"
                disabled={selectedProducts.size === 0}
              >
                ZAHLEN
              </Button>
            </div>
          </Card>

          {/* Fees Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-4 border-b flex flex-col sm:flex-row justify-between gap-4">
              <h3 className="text-lg font-semibold">Fällige Gebühren</h3>
              <div className="flex gap-2">
                <Badge variant="outline" className="cursor-pointer">
                  Alle Transaktionen
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Badge>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Suche"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-4 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#008e9b] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Typ</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Artikel</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Datum</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Betrag</th>
                    <th className="w-[50px] px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr
                      key={record.id}
                      className={`hover:bg-gray-50 ${
                        selectedProducts.has(record.productId) ? 'bg-blue-50' : ''
                      }`}
                    >
                      <td className="px-4 py-3 text-sm">{record.type}</td>
                      <td className="px-4 py-3 text-sm">{record.productName}</td>
                      <td className="px-4 py-3 text-sm">{record.date}</td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                          {record.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        CHF {record.amount.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        {record.type === 'Erfolgsprovision' && (
                          <Checkbox
                            checked={selectedProducts.has(record.productId)}
                            onCheckedChange={() => toggleProductSelection(record.productId)}
                            className="data-[state=checked]:bg-[#008e9b] data-[state=checked]:border-[#008e9b]"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t flex justify-between items-center">
              <Button variant="outline" className="text-[#008e9b]">
                <Download className="mr-2 h-4 w-4" />
                HERUNTERLADEN
              </Button>
              <Button variant="ghost" className="text-[#008e9b]">
                MEHR SEHEN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}