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
    <div className="bg-transparent">
      <div className="container mx-auto px-2">
        <div className="py-0.5">
          {/* Title and orange line - Container wrapping only them */}
          <div className="mb-2 ml-[2px] mt-[-4px]">
            <h2 className="text-base font-bold text-gray-800 mb-1 text-left">
              {t('filters.title')}
            </h2>
            <div className="h-0.5 bg-[#ff6600] mt-[-5px] w-10" />
          </div>

          <div className="grid grid-cols-3 gap-2 items-center justify-center">
            {filters.map(({ id, icon: Icon, href }) => (
              <div key={id} className="flex flex-col items-center justify-center mt-[-2px]">
                <a
                  href={href}
                  className={cn(
                    "flex items-center justify-center w-16 h-12 rounded-full border transition-all", 
                    "hover:border-orange-500 hover:bg-orange-100 ",  
                    "text-gray-950 border-orange-400 bg-white"
                  )}
                >
                  <Icon size={23} className="text-orange-500" />
                </a>
                <span className="text-sm font-medium mt-1">{t(`filters.${id}`)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
