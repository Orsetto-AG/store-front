import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // Protect all routes under /vendor and /profile
      const protectedPaths = ['/vendor', '/profile'];
      const isProtectedPath = protectedPaths.some(path => 
        req.nextUrl.pathname.startsWith(path)
      );
      
      return isProtectedPath ? !!token : true;
    },
  },
  pages: {
    signIn: '/signin',
    error: '/auth/error',
  },
});

export const config = {
  matcher: [
    '/vendor/:path*',
    '/profile/:path*',
  ],
};