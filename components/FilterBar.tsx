import { MapPin, Clock, Banknote, Heart, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';

export type Filter = { id: string; icon: React.ElementType; href: string };

interface FilterBarProps {
  filters: Filter[];
}

export default function FilterBar({ filters }: FilterBarProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="py-0.5 sm:py-1.5">
          <h2 className="text-base font-bold text-gray-900 mb-1 sm:mb-2 text-left">
            {t('filters.title')}
          </h2>

          <div className="grid grid-cols-3 gap-1 sm:gap-2 items-center justify-center">
            {filters.map(({ id, icon: Icon, href }) => (
              <div key={id} className="flex flex-col items-center justify-center h-full">
                <a
                  href={href}
                  className={cn(
                    "flex items-center justify-center w-14 h-14 rounded-full shadow-md transition-all", 
                    "hover:border-orange-500 hover:shadow-xl hover:bg-orange-100 hover:scale-105",  
                    "text-gray-800 border-gray-300 bg-white border",
                    "mb-2"
                  )}
                >
                  <Icon size={20} className="text-orange-500" />
                </a>
                <span className="text-base font-bold mt-0.5">{t(`filters.${id}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
