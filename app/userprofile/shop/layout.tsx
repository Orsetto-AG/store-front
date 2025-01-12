'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, MapPin, BadgeCheck, User } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock user data
const userProfile = {
  name: 'freioccasionen',
  location: '8004 Zürich',
  memberSince: '2005',
  verifications: {
    identity: true,
    address: true,
    professional: true
  },
  stats: {
    itemsSold: 5120,
    itemsBought: 71,
    successRate: 99.9
  }
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Profile Summary */}
          <Card className="p-6 mb-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                <User className="w-full h-full p-4 text-gray-400" />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-2">{userProfile.name}</h1>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{userProfile.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <BadgeCheck className="h-4 w-4" />
                    <span>Mitglied seit {userProfile.memberSince}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {userProfile.stats.successRate}%
                    </Badge>
                    <span className="text-gray-600">
                      {userProfile.stats.itemsSold} Artikel verkauft / {userProfile.stats.itemsBought} Artikel gekauft
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">Ausweis verifiziert</div>
                  <div className="text-sm text-gray-500">Identität bestätigt</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">Adresse verifiziert</div>
                  <div className="text-sm text-gray-500">Standort bestätigt</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gray-800">PRO</Badge>
                <div>
                  <div className="font-medium">Gewerblicher Verkäufer</div>
                  <div className="text-sm text-gray-500">Verifizierter Shop</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="flex space-x-8">
              <Link
                href="/userprofile/shop/offers"
                className={cn(
                  'py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
                  pathname === '/userprofile/shop/offers'
                    ? 'border-[#008e9b] text-[#008e9b]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                OFFENE ANGEBOTE
              </Link>
              <Link
                href="/userprofile/shop/ratings"
                className={cn(
                  'py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
                  pathname === '/userprofile/shop/ratings'
                    ? 'border-[#008e9b] text-[#008e9b]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                BEWERTUNGEN
              </Link>
            </nav>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}