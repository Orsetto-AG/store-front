import ProductPageClient from './ProductPageClient';

// Add static params for static export
export function generateStaticParams() {
  // Generate params for products 1-16
  return Array.from({ length: 16 }, (_, i) => ({
    id: (i + 1).toString()
  }));
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductPageClient id={params.id} />;
}