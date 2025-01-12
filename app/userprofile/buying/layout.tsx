'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function BuyingLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const tabs = [
    { name: 'Am Bieten', href: '/userprofile/buying/offers' },
    { name: 'Preisvorschläge', href: '/userprofile/buying/offers-price' },
    { name: 'Gekauft', href: '/userprofile/buying/bought' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Mein Kaufen</h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    'py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap',
                    pathname === tab.href
                      ? 'border-[#008e9b] text-[#008e9b]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  )}
                >
                  {tab.name}
                </Link>
              ))}
            </nav>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}