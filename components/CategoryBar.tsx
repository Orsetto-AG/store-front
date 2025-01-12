'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/use-media-query';
import { cn } from '@/lib/utils';

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
      'TV & Home Theater'
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
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
    name: 'Home & Living',
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
    name: 'Sports & Outdoor',
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
    name: 'Toys & Hobbies',
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
  }
];

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

  const handleClick = (categoryId: string) => {
    if (!isMobile) return;
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
  };

  // Hide on mobile
  if (isMobile) {
    return null;
  }

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="container mx-auto px-4">
        <ul className="flex items-center justify-between h-14">
          {categories.map((category) => (
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
                onClick={() => handleClick(category.id)}
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

              {/* Dropdown Menu */}
              <div
                id={`dropdown-${category.id}`}
                className={cn(
                  "absolute left-1/2 -translate-x-1/2 w-[250px] bg-white shadow-lg rounded-lg z-50",
                  "transition-all duration-200 origin-top",
                  activeCategory === category.id
                    ? "opacity-100 visible translate-y-1"
                    : "opacity-0 invisible translate-y-0 pointer-events-none"
                )}
                onMouseEnter={() => setHoverIntent(category.id)}
                onMouseLeave={handleMouseLeave}
              >
                <ul className="py-2 grid grid-cols-1 gap-1">
                  {category.subcategories.map((subcategory, index) => (
                    <li key={index}>
                      <Link
                        href={`/category/${category.id}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                        className={cn(
                          "block px-4 py-2 text-gray-700 hover:text-[#ff6600] text-sm",
                          "hover:bg-gray-50/50 transition-colors duration-200"
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