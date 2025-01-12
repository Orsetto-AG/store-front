'use client';

import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  subcategories: {
    id: string;
    name: string;
  }[];
}

const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    subcategories: [
      { id: 'phones', name: 'Phones & Tablets' },
      { id: 'computers', name: 'Computers & Laptops' },
      { id: 'cameras', name: 'Cameras & Photography' },
      { id: 'gaming', name: 'Gaming & Consoles' }
    ]
  },
  {
    id: 'fashion',
    name: 'Fashion',
    subcategories: [
      { id: 'mens', name: 'Men\'s Clothing' },
      { id: 'womens', name: 'Women\'s Clothing' },
      { id: 'accessories', name: 'Accessories' },
      { id: 'shoes', name: 'Shoes' }
    ]
  },
  {
    id: 'home',
    name: 'Home & Living',
    subcategories: [
      { id: 'furniture', name: 'Furniture' },
      { id: 'decor', name: 'Home Decor' },
      { id: 'kitchen', name: 'Kitchen & Dining' },
      { id: 'garden', name: 'Garden & Outdoor' }
    ]
  }
];

export default function Navigation() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <nav className="w-64 bg-white shadow-lg rounded-lg">
      <ul className="py-2">
        {categories.map((category) => (
          <li key={category.id} className="relative">
            <button
              onClick={() => toggleCategory(category.id)}
              className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
              aria-expanded={expandedCategories.has(category.id)}
            >
              <span className="font-medium">{category.name}</span>
              {expandedCategories.has(category.id) ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
            <ul
              className={cn(
                "pl-4 overflow-hidden transition-all duration-200 ease-in-out",
                expandedCategories.has(category.id) ? "max-h-96" : "max-h-0"
              )}
            >
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id}>
                  <a
                    href={`/category/${category.id}/${subcategory.id}`}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-[#ff6600] hover:bg-gray-50 rounded-md"
                  >
                    {subcategory.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}