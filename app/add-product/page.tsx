'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AddProductRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/vendor/add-product');
  }, [router]);

  return null;
}