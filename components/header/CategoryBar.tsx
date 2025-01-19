'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Menu } from 'lucide-react';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import {
  Tv,
  ShoppingBag,
  Home,
  Trophy,
  Heart,
  Car,
  Gamepad2,
  BookOpen,
  Dog,
  Palette,
} from "lucide-react";

const categories = [
  {
    id: 'electronics',
    name: 'Electronics und Technologie',
    subcategories: [
      'Smartphones & Tablets',
      'Computers & Laptops',
      'Cameras & Photography',
      'Audio & Headphones',
      'Gaming & Consoles',
      'TV & Home Theater'
    ]
  },
  {
    id: 'fashion',
    name: 'Mode und Accessoires',
    subcategories: [
      'Men\'s Clothing',
      'Women\'s Clothing',
      'Kids & Baby',
      'Shoes',
      'Bags & Accessories',
      'Jewelry & Watches'
    ]
  },
  {
    id: 'home',
    name: 'Haushalt und Wohnen',
    subcategories: [
      'Furniture',
      'Kitchen & Dining',
      'Home Decor',
      'Bedding & Bath',
      'Storage & Organization',
      'Garden & Outdoor'
    ]
  },
  {
    id: 'sports',
    name: 'Sports und Outdoor',
    subcategories: [
      'Exercise Equipment',
      'Outdoor Recreation',
      'Team Sports',
      'Camping & Hiking',
      'Cycling',
      'Winter Sports'
    ]
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
      'Health Supplements'
    ]
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
      'Car Care'
    ]
  },
  {
    id: 'toys',
    name: 'Spielzeug und Hobby',
    subcategories: [
      'Action Figures',
      'Building Toys',
      'Arts & Crafts',
      'Remote Control',
      'Board Games',
      'Collectibles'
    ]
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
      'Audiobooks'
    ]
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
      'Pet Healthcare'
    ]
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
      'Art Supplies'
    ]
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
      'Car Care'
    ]
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
      'Car Care'
    ]
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
      'Car Care'
    ]
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
      'Car Care'
    ]
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
      'Car Care'
    ]
  },
];

function getCategoryIcon(categoryName: string) {
  switch (categoryName) {
    case 'Electronics und Technologie':
      return <Tv size={16} />;
    case 'Mode und Accessoires':
      return <ShoppingBag size={16} />;
    case 'Haushalt und Wohnen':
      return <Home size={16} />;
    case 'Sports und Outdoor':
      return <Trophy size={16} />;
    case 'Beauty & Health':
      return <Heart size={16} />;
    case 'Automotive':
      return <Car size={16} />;
    case 'Spielzeug und Hobby':
      return <Gamepad2 size={16} />;
    case 'Books & Media':
      return <BookOpen size={16} />;
    case 'Pet Supplies':
      return <Dog size={16} />;
    case 'Art & Collectibles':
      return <Palette size={16} />;
    default:
      return null;
  }
}

export default function CategoryBar() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [hoverIntent, setHoverIntent] = useState<string | null>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout>();
  const isMobile = useMediaQuery('(max-width: 768px)');
  

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (categoryId: string) => {
    if (isMobile) return;
    
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    
    hoverTimerRef.current = setTimeout(() => {
      setActiveCategory(categoryId);
      setHoverIntent(categoryId);
    }, 100);
  };

  const excludedCategories = ['automotive', 'beauty', 'pets', 'books'];

  const handleMouseLeave = () => {
    if (isMobile) return;
    
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }
    
    hoverTimerRef.current = setTimeout(() => {
      setActiveCategory(null);
      setHoverIntent(null);
    }, 100);
  };

  // Mobil cihazlar için kategori barını gizle
  if (isMobile) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <ul className="flex items-center h-14">
          {/* All Categories Dropdown */}
          <li className="relative pr-6 border-r border-gray-100">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-[#ff6600] transition-colors">
                  <ChevronDown className="h-4 w-4" />
                  <span className="font-medium text-sm">Alle Kategorien</span>
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="start" sideOffset={1} className="custom-dropdown w-[268px] border border-gray-200 shadow-lg rounded-none max-h-[640px] overflow-y-auto">
                {categories.map((category) => (
                  <DropdownMenuSub key={category.id}>
                    <DropdownMenuSubTrigger className="flex items-center justify-between p-3 text-sm font-medium text-gray-800 hover:text-[#ff6600] hover:bg-gray-200 w-full">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(category.name)}
                        {category.name}
                      </div>
                    </DropdownMenuSubTrigger>

                    <DropdownMenuSubContent sideOffset={-5} className="w-[240px] border border-gray-200 shadow-lg rounded-none">
                      <div className="py-2">
                        {category.subcategories.map((subcategory, index) => (
                          <DropdownMenuItem key={index} className="px-3 py-2 hover:bg-gray-200">
                            <Link
                              href={`/category/${category.id}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-sm text-gray-700 hover:text-[#ff6600] w-full"
                            >
                              {subcategory}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          {/* Horizontal Category Menu */}
          {categories
          .filter((category) => !excludedCategories.includes(category.id)) // Exclude Automotive from the horizontal menu
          .map((category) => (
            <li
              key={category.id}
              className="relative flex-1 text-center"
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={cn(
                  "flex items-center justify-center space-x-2 px-3 py-2 text-gray-700 hover:text-[#ff6600]",
                  "transition-colors duration-200 whitespace-nowrap focus:outline-none text-sm w-full",
                  activeCategory === category.id && "text-[#ff6600]"
                )}
                aria-expanded={activeCategory === category.id}
                aria-controls={`dropdown-${category.id}`}
              >
                <span className="font-medium">{category.name}</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform duration-200",
                    activeCategory === category.id && "rotate-180"
                  )}
                />
              </button>

              {/* Dropdown Menu for Horizontal Menu */}
              <div
                id={`dropdown-${category.id}`}
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-64 bg-white shadow-lg rounded-md z-50",
                  "transition-all duration-200 origin-top",
                  activeCategory === category.id
                    ? "opacity-100 visible translate-y-1"
                    : "opacity-0 invisible translate-y-0 pointer-events-none"
                )}
                onMouseEnter={() => setHoverIntent(category.id)}
                onMouseLeave={handleMouseLeave}
                >
                <ul className="py-1">
                  {category.subcategories.map((subcategory, index) => (
                    <li key={index}>
                      <Link
                        href={`/category/${category.id}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                        className={cn(
                          "block px-4 py-2.5 text-sm text-gray-600 hover:text-[#ff6600] hover:bg-gray-50",
                          "transition-colors duration-200"
                        )}
                        onClick={() => setActiveCategory(null)}
                      >
                        {subcategory}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
