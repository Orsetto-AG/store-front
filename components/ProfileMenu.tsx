'use client';

import { User, LogOut, Heart, Settings, ShoppingBag, DollarSign, Store, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

interface ProfileMenuProps {
  isLoggedIn?: boolean;
}

export default function ProfileMenu({ isLoggedIn = false }: ProfileMenuProps) {
  const { t } = useLanguage();

  if (!isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-gray-100"
          >
            <User size={20} className="text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48 p-2 bg-white border border-gray-300 rounded-md shadow-md" align="center">
          <Link href="/signin">
            <DropdownMenuItem className="flex items-center justify-center w-full py-2 mb-2 text-white bg-orange-500 rounded-md cursor-pointer hover:bg-orange-600">
              <span>{t('header.signIn')}</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/signup">
            <DropdownMenuItem className="flex items-center justify-center w-full py-2 text-orange-500 border border-orange-500 rounded-md cursor-pointer hover:bg-orange-50">
              <span>{t('header.signUp')}</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-gray-100"
        >
          <User size={20} className="text-gray-600" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Mein Konto</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile/purchases">
            <DropdownMenuItem className="cursor-pointer">
              <ShoppingBag className="mr-2 h-4 w-4" />
              <span>Meine Käufe</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/profile/sales">
            <DropdownMenuItem className="cursor-pointer">
              <Store className="mr-2 h-4 w-4" />
              <span>Meine Verkäufe</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/profile/fees">
            <DropdownMenuItem className="cursor-pointer">
              <DollarSign className="mr-2 h-4 w-4" />
              <span>Gebühren</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile/settings">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Einstellungen</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/profile/public">
            <DropdownMenuItem className="cursor-pointer">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Öffentliches Profil</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Abmelden</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}