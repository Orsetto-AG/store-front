'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Plus, Heart, Globe, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSelector from './LanguageSelector';
import CategoryBar from './CategoryBar';
import BearLogo from '../ui/BearLogo';
import ProfileMenu from '../ProfileMenu';
import { NoSSR } from '../NoSSR';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useLanguage } from '@/lib/i18n';
import { Notification } from './Notification';


export default function Header() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // MediaQuery hook kullanarak ekran boyutunu kontrol et
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo ve Slogan - Mobilde ve Masaüstünde aynı */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <BearLogo />
            <div className="flex flex-col">
              <span className="text-[#ff6600] text-xl md:text-3xl font-bold tracking-tight">Orsetto</span>
              <NoSSR>
                <span className="text-gray-500 text-xs md:text-sm italic ml-4 hidden sm:block">eifach bärig guet!</span>
              </NoSSR>
            </div>
          </Link>

          {/* Mobil İçeriği: Arama Butonu */}
          {isMobile && (
  <div className="flex justify-end items-center w-full">

    {/* Mobilde Dil Seçici ve Notification */}
    <div className="flex items-center gap-2">
      <Notification /> {/* Notification */}
      <LanguageSelector />
    </div>
  </div>
)}
          {/* Masaüstü İçeriği: Arama Çubuğu */}
          {!isMobile && (
            <div className="flex-1 max-w-2xl mx-4 hidden md:block">
              <div className="relative">
                <NoSSR>
                  <input
                    type="text"
                    placeholder={t('header.searchPlaceholder')}
                    className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl pl-12 focus:outline-none focus:border-[#ff6600] transition-colors"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </NoSSR>
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
              </div>
            </div>
          )}

          {/* Sağdaki Butonlar - Masaüstü ve Mobil */}
          <div className="flex items-center gap-2 md:gap-4">
          <Link href="/vendor/add-product">
  <Button
    className="bg-[#008e9b] hover:bg-[#007a85] text-white h-11 hidden lg:flex items-center gap-2"
  >
    <Plus size={18} />
    <NoSSR>{t('header.listItem')}</NoSSR>
  </Button>
</Link>


            {/* Favoriler Butonu */}
            {!isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 h-11 w-11 hidden lg:flex"
                aria-label="Favorites"
                onClick={() => router.push('/favorites')}
              >
                <Heart size={20} className="text-gray-600" />
              </Button>
            )}

            {/* Profil Menüsü */}
            <div className="hidden lg:block">
              <ProfileMenu isLoggedIn={false} />
            </div>
            <div className="hidden md:block">
              <Notification />
            </div>

            {/* Dil Seçici */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>

            {/* Bildirim (Notification) */}
           
          </div>
        </div>
      </div>

      {/* Renkli Bar */}
      <div className="h-1 bg-gradient-to-r from-[#ff6600] via-[#ff8533] to-[#008e9b]" />

      {/* Mobil Arama Çubuğu ve Diğer İçerik */}
      {isMobile && (
        <div className="px-4 py-2 flex flex-col gap-2">
          {/* Arama Çubuğu: Altta Açık */}
          <div className="relative">
            <NoSSR>
              <input
                type="text"
                placeholder="Was suchst du?"
                className="w-full h-11 px-4 py-2 border-2 border-gray-200 rounded-xl pl-12 focus:outline-none focus:border-[#ff6600] transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </NoSSR>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
          </div>
        </div>
      )}

      <CategoryBar />
    </div>
  );
}
