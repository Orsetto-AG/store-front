'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Package, CheckCircle2, Truck, MapPin, Mail, Phone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const orderNumber = '39483991';

const orderTimeline = [
  {
    date: '15. Jan. 2025, 10:44',
    status: 'Artikel erhalten',
    description: 'Du hast den Artikel erhalten.',
    completed: true
  },
  {
    date: '13. Jan. 2025, 08:30',
    status: 'Versandt',
    description: 'Der Verkäufer hat den Artikel verschickt.',
    completed: true
  },
  {
    date: '12. Jan. 2025, 15:20',
    status: 'Zahlung erhalten',
    description: 'Der Verkäufer hat die Zahlung erhalten.',
    completed: true
  },
  {
    date: '12. Jan. 2025, 15:15',
    status: 'Bestellung aufgegeben',
    description: 'Gratuliere, der Artikel gehört dir!',
    completed: true
  }
];

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link 
              href="/userprofile/buying/bought"
              className="text-gray-500 hover:text-gray-700"
            >
              <ArrowLeft className="h-6 w-6" />
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Kauf {orderNumber}</h1>
                <Badge className="bg-green-100 text-green-800">
                  Abgeschlossen
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr,350px] gap-6">
            {/* Main Content */}
            <div className="space-y-6">
              {/* Timeline */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-6">Bestellverlauf</h2>
                <div className="relative">
                  {orderTimeline.map((event, index) => (
                    <div key={index} className="flex gap-4 mb-8 last:mb-0">
                      <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-[#008e9b] flex items-center justify-center">
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        </div>
                        {index !== orderTimeline.length - 1 && (
                          <div className="absolute top-8 left-1/2 bottom-[-32px] w-0.5 -translate-x-1/2 bg-[#008e9b]" />
                        )}
                      </div>
                      <div>
                        <div className="font-medium">{event.status}</div>
                        <div className="text-sm text-gray-500">{event.description}</div>
                        <div className="text-sm text-gray-500 mt-1">{event.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Shipping Details */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-6">Versanddetails</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                    <div>
                      <div className="font-medium">Lieferadresse</div>
                      <div className="text-gray-600">
                        Max Mustermann<br />
                        Musterstrasse 123<br />
                        8000 Zürich<br />
                        Schweiz
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Versandart</div>
                      <div className="text-gray-600">Paket A-Post</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-gray-400" />
                    <div>
                      <div className="font-medium">Tracking</div>
                      <div className="text-gray-600">98.12.765.432.10</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Order Summary */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Bestellübersicht</h2>
                <div className="flex gap-4 pb-4 border-b">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop"
                      alt="Product image"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">Leica M6 Classic</h3>
                    <div className="text-sm text-gray-500">Artikel: 1267317708</div>
                    <div className="text-sm font-medium mt-1">CHF 2'999.00</div>
                  </div>
                </div>
                <div className="space-y-2 py-4 border-b">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Zwischensumme</span>
                    <span>CHF 2'999.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Versandkosten</span>
                    <span>CHF 7.90</span>
                  </div>
                </div>
                <div className="flex justify-between pt-4 font-medium">
                  <span>Gesamtbetrag</span>
                  <span>CHF 3'006.90</span>
                </div>
              </Card>

              {/* Seller Info */}
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Verkäufer</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                      <Image
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=seller"
                        alt="Seller avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">Camera Pro Shop</div>
                      <div className="text-sm text-gray-500">Mitglied seit 2020</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-[#008e9b]">shop@camerapro.ch</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>+41 44 123 45 67</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}