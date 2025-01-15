/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export' kaldırılabilir veya ayarlanabilir
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
