'use client';

import { useEffect, useState } from 'react';
import { useLanguage } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe, ChevronDown } from 'lucide-react';

type Language = 'de' | 'en' | 'it' | 'fr';

const languages: { code: Language, label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'it', label: 'IT' },
  { code: 'fr', label: 'FR' },
];

export default function LanguageSelector() {
  const { setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [language, setLocalLanguage] = useState<Language>('de'); 
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLanguage(language); 
    
    
    const handleClickOutside = (event: MouseEvent) => {
      
      if (event.target instanceof HTMLElement) {
        if (!event.target.closest('.dropdown-menu-container') && isOpen) {
          setIsOpen(false); 
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [language, isOpen]);

  const handleLanguageChange = (code: Language) => {
    setLocalLanguage(code);
    setLanguage(code); 
    setIsOpen(false); 
  };

  const toggleDropdown = () => setIsOpen((prev) => !prev); 

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="sm"
        className="font-medium text-gray-700"
      >
        DE
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        asChild
        onClick={toggleDropdown} 
      >
        <Button 
          variant="ghost" 
          size="sm"
          className="font-medium text-gray-700 flex items-center"
        >
          <Globe className="w-5 h-5 mr-1" /> 
          {language.toUpperCase()}
          <ChevronDown 
            className={`w-4 h-4 ml-0.5 transition-transform transform ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`} 
            style={{ transitionDuration: '200ms' }} 
          />
        </Button>
      </DropdownMenuTrigger>

      {isOpen && (
        <DropdownMenuContent 
          align="end" 
          className="dropdown-menu-container py-1 mt-2 transition-all ease-out duration-200"
          style={{ width: '120px' }} 
        >
          {languages.map((lang) => (
            <DropdownMenuItem
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)} 
              className={`cursor-pointer py-1 px-2 rounded ${
                language === lang.code ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-200'
              }`}
            >
              <input 
                type="radio"
                id={lang.code}
                name="language"
                checked={language === lang.code}
                onChange={() => handleLanguageChange(lang.code)}
                className="mr-2"
              />
              {lang.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  );
}