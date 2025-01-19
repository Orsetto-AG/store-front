import { cn } from '@/lib/utils';
import { useLanguage } from '@/lib/i18n';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export type Filter = { id: string; image: string; href: string };

const filters = [
  { id: 'forYou', image: '/images/1forYou.png', href: '/forYou' },
  { id: 'new', image: '/images/2new.png', href: '/new' },
  { id: 'nearby', image: '/images/3inMeinerNahe.png', href: '/nearby' },
  { id: 'fromOne', image: '/images/4chf1.png', href: '/from-one' },
  { id: 'endingSoon', image: '/images/5quick.png', href: '/ending-soon' },
  { id: 'popular', image: '/images/6week.png', href: '/popular' },
  { id: 'timeless', image: '/images/7zeitloss.png', href: '/timeless' },
];

export default function FilterBar() {
  const { t } = useLanguage();
  const [isMobile, setIsMobile] = useState(false); // Mobil görünüm kontrolü

  // Ekran genişliğini kontrol etme
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // 768px altı mobil olarak kabul edilir
    };

    handleResize(); // İlk yüklemede kontrol et
    window.addEventListener('resize', handleResize); // Ekran boyutu değiştiğinde kontrol et

    return () => {
      window.removeEventListener('resize', handleResize); // Temizleme
    };
  }, []);

  return (
    <div className="bg-transparent">
      <div className="container mx-auto px-2">
        <div className="py-0.5">
          {/* Title ve turuncu çizgi kaldırıldı, ancak boşluk korundu */}
          <div className="mb-2 ml-[2px] mt-[22px]">
            <div className="h-0.5 bg-transparent mt-[-5px] w-10" />
          </div>

          {/* Masaüstü görünümü (md: ve üzeri) */}
          {!isMobile && (
            <div className="grid grid-cols-7 gap-2 items-center justify-center">
              {filters.map(({ id, image, href }) => (
                <div key={id} className="flex flex-col items-center justify-center mt-[-2px]">
                  <a
                    href={href}
                    className={cn(
                      "flex items-center justify-center w-20 h-20 rounded-full border transition-all",
                      "hover:border-purple-400 hover:bg-purple-100 ",
                      "text-gray-950 border-purple-300 bg-white overflow-hidden"
                    )}
                  >
                    <Image
                      src={image}
                      alt={id}
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-full h-full"
                    />
                  </a>
                  <span className="text-sm font-medium mt-1">{t(`filters.${id}`)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Mobil görünümü (md: altı) */}
          {isMobile && (
            <div className="overflow-x-scroll whitespace-nowrap py-2">
              <div className="inline-flex gap-4"> {/* gap-4 ile butonlar arası boşluk */}
                {filters.map(({ id, image, href }) => (
                  <div key={id} className="flex flex-col items-center justify-center min-w-[80px]"> {/* min-w-[80px] ile sabit genişlik */}
                    <a
                      href={href}
                      className={cn(
                        "flex items-center justify-center w-14 h-14 rounded-full border transition-all",
                        "hover:border-purple-400 hover:bg-purple-100 ",
                        "text-gray-950 border-purple-300 bg-white overflow-hidden"
                      )}
                    >
                      <Image
                        src={image}
                        alt={id}
                        width={56}
                        height={56}
                        className="rounded-full object-cover w-full h-full"
                      />
                    </a>
                    {/* Metin alanının yüksekliği sabit tutuluyor ve metinler ortalanıyor */}
                    <div className="h-10 flex items-center justify-center"> {/* h-10 ile sabit yükseklik */}
                      <span className="text-xs font-medium text-center w-14 whitespace-normal">{t(`filters.${id}`)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}