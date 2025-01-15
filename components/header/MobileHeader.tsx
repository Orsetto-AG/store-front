'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Tag, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/categories', label: 'Categories', icon: Grid },
  { href: '/deals', label: 'Deals', icon: Tag },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function MobileHeader() {
  const pathname = usePathname();
  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)'); 
  if (!isTabletOrMobile) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center justify-center w-full h-full',
                'text-[10px] font-medium transition-colors',
                isActive ? 'text-[#ff6600]' : 'text-gray-600'
              )}
            >
              <Icon 
                size={24} 
                className={cn(
                  'mb-1',
                  isActive && 'fill-current'
                )} 
              />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
