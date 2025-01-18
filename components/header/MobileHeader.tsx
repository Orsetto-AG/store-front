'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid, Tag, Heart, User, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useState } from 'react';
import { MouseEvent } from 'react';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/favorites', label: 'Favorites', icon: Heart },
  { href: '/sell', label: 'Sell', icon: Tag },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '#', label: 'Categories', icon: Grid },
];

const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    subcategories: [
      'Smartphones & Tablets',
      'Computers & Laptops',
      'Cameras & Photography',
      'Audio & Headphones',
      'Gaming & Consoles',
      'TV & Home Theater',
    ],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    subcategories: [
      "Men's Clothing",
      "Women's Clothing",
      'Kids & Baby',
      'Shoes',
      'Bags & Accessories',
      'Jewelry & Watches',
    ],
  },
  {
    id: 'home',
    name: 'Home & Living',
    subcategories: [
      'Furniture',
      'Kitchen & Dining',
      'Home Decor',
      'Bedding & Bath',
      'Storage & Organization',
      'Garden & Outdoor',
    ],
  },
  {
    id: 'sports',
    name: 'Sports & Outdoor',
    subcategories: [
      'Exercise Equipment',
      'Outdoor Recreation',
      'Team Sports',
      'Camping & Hiking',
      'Cycling',
      'Winter Sports',
    ],
  },
  {
    id: 'beauty',
    name: 'Beauty & Health',
    subcategories: [
      'Skincare',
      'Makeup',
      'Hair Care',
      'Fragrances',
      'Personal Care',
      'Health Supplements',
    ],
  },
  {
    id: 'automotive',
    name: 'Automotive',
    subcategories: [
      'Car Parts & Accessories',
      'Motorcycle Parts',
      'Tools & Equipment',
      'Car Electronics',
      'Tires & Wheels',
      'Car Care',
    ],
  },
  {
    id: 'toys',
    name: 'Toys & Hobbies',
    subcategories: [
      'Action Figures',
      'Building Toys',
      'Arts & Crafts',
      'Remote Control',
      'Board Games',
      'Collectibles',
    ],
  },
  {
    id: 'books',
    name: 'Books & Media',
    subcategories: [
      'Fiction Books',
      'Non-Fiction',
      'Textbooks',
      'Magazines',
      'eBooks',
      'Audiobooks',
    ],
  },
  {
    id: 'pets',
    name: 'Pet Supplies',
    subcategories: [
      'Dog Supplies',
      'Cat Supplies',
      'Fish & Aquarium',
      'Small Pets',
      'Pet Food',
      'Pet Healthcare',
    ],
  },
  {
    id: 'art',
    name: 'Art & Collectibles',
    subcategories: [
      'Fine Art',
      'Antiques',
      'Vintage Items',
      'Handmade Crafts',
      'Limited Editions',
      'Art Supplies',
    ],
  },
];


export default function MobileHeader() {
  const pathname = usePathname();
  const isTabletOrMobile = useMediaQuery('(max-width: 1024px)');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<string>(pathname); // Aktif item'i pathname'e göre ayarla

  if (!isTabletOrMobile) return null;

  const handleCategoriesClick = (e: MouseEvent) => {
    e.preventDefault();
    setIsCategoriesOpen(!isCategoriesOpen);
    setSelectedCategory(null); // Menü açıldığında seçili kategoriyi sıfırla
    setActiveItem('#'); // Categories'e tıklandığında aktif item'i güncelle
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId); // Tıklanan kategoriyi seç
  };

  const handleBackClick = () => {
    setSelectedCategory(null); // Geri butonuna basıldığında ana kategorilere dön
  };

  const handleNavItemClick = (href: string) => {
    setActiveItem(href); // Tıklanan nav item'ini aktif yap
    if (href !== '#') {
      setIsCategoriesOpen(false); // Categories dışındaki item'lere tıklandığında menüyü kapat
    }
  };

  return (
    <>
      {/* Kategoriler Menüsü */}
      {isCategoriesOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40">
          <div
            className="fixed left-0 right-0 bottom-16 bg-white shadow-lg overflow-y-auto max-h-[70vh]"
            onClick={(e) => e.stopPropagation()} // Menü içine tıklandığında overlay'i kapatma
          >
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold">Kategoriler</h2>
            </div>
            {selectedCategory ? (
              <>
                <button
                  onClick={handleBackClick}
                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 w-full"
                >
                  <ChevronLeft size={16} className="mr-2" />
                  Geri
                </button>
                <div className="border-b">
                  <div className="px-4 py-2 font-medium text-gray-800">
                    {categories.find((cat) => cat.id === selectedCategory)?.name}
                  </div>
                  <div className="pl-4">
                    {categories
                      .find((cat) => cat.id === selectedCategory)
                      ?.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory}
                          href={`/categories/${selectedCategory}/${subcategory
                            .toLowerCase()
                            .replace(/\s+/g, '-')}`}
                          className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50"
                        >
                          {subcategory}
                        </Link>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="block w-full px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 text-left"
                >
                  {category.name}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Alt Nav Itemleri */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t">
        <div className="flex items-center justify-around h-16">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = activeItem === href; // Aktif item kontrolü
            return (
              <div key={href} className="flex flex-col items-center justify-center w-full h-full">
                <button
                  onClick={(e) => {
                    if (label === 'Categories') {
                      handleCategoriesClick(e); // Categories'e tıklandığında
                    } else {
                      handleNavItemClick(href); // Diğer item'lere tıklandığında
                    }
                  }}
                  className={cn(
                    'flex flex-col items-center justify-center w-full h-full',
                    'text-[10px] font-medium transition-colors',
                    isActive ? 'text-[#ff6600]' : 'text-gray-600'
                  )}
                >
                  <Icon
                    size={24}
                    className={cn('mb-1', isActive && 'fill-current')}
                  />
                  <span>{label}</span>
                </button>
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
