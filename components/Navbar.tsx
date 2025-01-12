'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';
import CategoryBar from './CategoryBar';
import BearLogo from './BearLogo';
import ProfileMenu from './ProfileMenu';
import { NoSSR } from './NoSSR';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const router = useRouter();

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Slogan */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <BearLogo />
            <div className="flex flex-col">
              <span className="text-[#ff6600] text-xl md:text-3xl font-bold tracking-tight">Orsetto</span>
              <NoSSR>
                <span className="text-gray-500 text-xs md:text-sm italic ml-4 hidden sm:block">eifach bärig guet!</span>
              </NoSSR>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="flex-1 max-w-2xl mx-4 hidden md:block">
            <div className="relative">
              <NoSSR>
                <input
                  type="text"
                  placeholder="Was suchst du?"
                  className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#ff6600] transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </NoSSR>
              <Search className="absolute right-3 top-3 text-gray-400" size={22} />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-11 w-11"
              aria-label="Search"
              onClick={() => setIsSearchVisible(!isSearchVisible)}
            >
              <Search size={24} className="text-gray-600" />
            </Button>

            <Link href="/vendor/add-product">
              <Button 
                className="bg-[#008e9b] hover:bg-[#007a85] text-white h-11 hidden sm:flex items-center gap-2"
              >
                <Plus size={18} />
                <NoSSR>Artikel einstellen</NoSSR>
              </Button>
            </Link>

            {/* Favorites Button - Hidden on mobile since it's in the bottom bar */}
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100 h-11 w-11 hidden md:flex"
              aria-label="Favorites"
              onClick={() => router.push('/favorites')}
            >
              <Heart size={20} className="text-gray-600" />
            </Button>

            {/* Profile Menu - Hidden on mobile since it's in the bottom bar */}
            <div className="hidden md:block">
              <ProfileMenu isLoggedIn={false} />
            </div>

            {/* Language Selector */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>
          </div>
        </div>
      </div>
      
      {/* Colored Bar */}
      <div className="h-1 bg-gradient-to-r from-[#ff6600] via-[#ff8533] to-[#008e9b]" />
      
      {/* Mobile Search Bar */}
      <div 
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isSearchVisible ? "h-[60px] border-b border-gray-100" : "h-0"
        )}
      >
        <div className="px-4 py-2">
          <div className="relative">
            <NoSSR>
              <input
                type="text"
                placeholder="Was suchst du?"
                className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-[#ff6600] transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </NoSSR>
            <Search className="absolute right-3 top-3 text-gray-400" size={22} />
          </div>
        </div>
      </div>
      
      <CategoryBar />
    </div>
  );
}