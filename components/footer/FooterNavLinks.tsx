'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';

export default function FooterNavLinks() {
  const { t } = useLanguage();

  return (
      <nav className="flex justify-center items-center w-full md:mt-12">
        <div className=" flex flex-wrap justify-center gap-4 w-full px-4 lg:pl-[600px] lg:flex-nowrap [@media(min-width:1024px)_and_(max-width:1300px)]:pl-[450px] ">
          <Link 
            href="/orsetto-agb" 
            className="text-gray-600 hover:text-[#ff6600] transition-colors duration-200 font-normal text-sm whitespace-nowrap"
          >
            {t('footer.termsOfService')}
          </Link>
          <Link 
            href="/privacy-policy" 
            className="text-gray-600 hover:text-[#ff6600] transition-colors duration-200 font-normal text-sm whitespace-nowrap"
          >
            {t('footer.privacyPolicy')}
          </Link>
          <Link 
            href="/cookies" 
            className="text-gray-600 hover:text-[#ff6600] transition-colors duration-200 font-normal text-sm whitespace-nowrap"
          >
            {t('footer.cookiesPolicy')}
          </Link>
          <Link 
            href="/imprint" 
            className="text-gray-600 hover:text-[#ff6600] transition-colors duration-200 font-normal text-sm whitespace-nowrap"
          >
            {t('footer.imprint')}
          </Link>
          <Link 
            href="/help" 
            className="text-gray-600 hover:text-[#ff6600] transition-colors duration-200 font-normal text-sm whitespace-nowrap"
          >
            {t('footer.helpCenter')}
          </Link>
        </div>
      </nav>
    
  );
}