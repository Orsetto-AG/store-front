'use client';

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import BearLogo from './ui/BearLogo';
import { useLanguage } from '@/lib/i18n';

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'Youtube' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    about: [
      { label: t('footer.about.aboutUs'), href: '/about' },
      { label: t('footer.about.careers'), href: '/careers' },
      { label: t('footer.about.press'), href: '/press' },
      { label: t('footer.about.blog'), href: '/blog' },
    ],
    support: [
      { label: t('footer.support.helpCenter'), href: '/help' },
      { label: t('footer.support.safetyCenter'), href: '/safety' },
      { label: t('footer.support.communityGuidelines'), href: '/guidelines' },
    ],
    vendors: [
      { label: t('footer.vendors.sell'), href: '/sell' },
      { label: t('footer.vendors.portal'), href: '/vendor' },
      { label: t('footer.vendors.guidelines'), href: '/vendor/guidelines' },
      { label: t('footer.vendors.stories'), href: '/vendor/stories' },
    ],
  };

  return (
    <footer className="bg-white border-t">
      {/* Renkli Bar */}
      <div className="h-1 bg-gradient-to-r from-[#ff6600] via-[#ff8533] to-[#008e9b]" />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <BearLogo />
              <span className="text-[#ff6600] text-xl font-bold">Orsetto</span>
            </div>
            <p className="text-sm text-gray-600 mb-6 max-w-md">
              {t('footer.trustedMarketplace')}
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-[#ff6600] transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </Link>
              ))}
            </div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { title: t('footer.about.title'), links: footerLinks.about },
              { title: t('footer.support.title'), links: footerLinks.support },
              { title: t('footer.vendors.title'), links: footerLinks.vendors },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold text-gray-900 mb-4 uppercase text-sm tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-[#ff6600] transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Orsetto AG. {t('footer.legal.copyright')}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-[#ff6600]">
                {t('footer.legal.privacy')}
              </Link>
              <Link href="/cookies" className="text-sm text-gray-600 hover:text-[#ff6600]">
                {t('footer.legal.terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
