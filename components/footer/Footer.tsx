'use client';

import Link from 'next/link';
import X from "../../styles/images/footer/X.png";
import Facebook from "../../styles/images/footer/facebook.png";
import Instagram from "../../styles/images/footer/instagram.png";
import Linkedin from "../../styles/images/footer/linkedin.png";
import GooglePlay from "../../styles/images/footer/google-play-store.png";
import AppStore from "../../styles/images/footer/app-store.png";
import { useLanguage } from '@/lib/i18n';
import Image from 'next/image';
import FooterNavLinks from './FooterNavLinks';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t">
      {/* Gradient Bar */}
      <div className="h-1 bg-gradient-to-r from-[#ff6600] via-[#ff8533] to-[#008e9b]" />
      
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand and Links Section */}
          <div className="md:col-span-7 space-y-6 ">
            <div className="flex items-center gap-2 md:-mt-8">
              <span className="text-[#ff6600] text-2xl font-bold tracking-tight">
                Orsetto
              </span>
            </div>
            <FooterNavLinks/>
          </div>

          {/* Social Media Links */}
          <div className="md:col-span-5">
            <div className="flex justify-center md:justify-end gap-6">
              <Link 
                href="https://www.facebook.com/" 
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <Image 
                  src={Facebook} 
                  alt="Facebook"
                  className="w-8 h-8"
                  width={32}
                  height={32}
                />
              </Link>
              <Link 
                href="https://www.instagram.com/" 
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <Image 
                  src={Instagram} 
                  alt="Instagram"
                  className="w-8 h-8"
                  width={32}
                  height={32}
                />
              </Link>
              <Link 
                href="https://x.com/" 
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <Image 
                  src={X} 
                  alt="X"
                  className="w-8 h-8"
                  width={32}
                  height={32}
                />
              </Link>
              <Link 
                href="https://www.linkedin.com/" 
                className="transform hover:scale-110 transition-transform duration-200"
              >
                <Image 
                  src={Linkedin} 
                  alt="Linkedin"
                  className="w-8 h-8"
                  width={32}
                  height={32}
                />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */} 
        <div className="mt-8 pt-8 border-t border-gray-100 md-lg:border-none">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Copyright and Legal Links */}
            <div className="flex justify-center w-full md:col-span-2 md:mt-8 md-lg:justify-end md-lg:-mt-12">
  <p className="text-sm text-gray-500 text-center ">
    © {new Date().getFullYear()} Orsetto AG {t('footer.legal.copyright')}
  </p>
</div>


            {/* App Store Buttons - Only visible on mobile */}
            <div className="flex justify-center gap-4 md:hidden">
              <Link 
                href="https://play.google.com" 
                className="transform hover:scale-105 transition-transform duration-200 flex justify-center items-center"
              >
                <Image 
                  src={GooglePlay} 
                  alt="Get it on Google Play" 
                  width={200} 
                  height={200}
                  className="object-contain"
                />
              </Link>
              <Link 
                href="https://apps.apple.com" 
                className="transform hover:scale-105 transition-transform duration-200 flex justify-center items-center"
              >
                <Image 
                  src={AppStore} 
                  alt="Download on the App Store" 
                  width={200} 
                  height={200}
                  className="object-contain"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}