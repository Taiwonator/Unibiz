import { Token } from 'generated/graphql';
import { NextApiRequest } from 'next';
import { getToken, JWT } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextApiRequestCookies, redirect } from 'next/dist/server/api-utils';
import { NextResponse } from 'next/server';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
});

export const config = {
  matcher: [
    '/',
    '/events/:path*',
    '/hub/:path*',
    '/union/:path*',
    '/request/:path*',
    '/health/:path*',
    '/dump/:path*',
  ],
};

// if (
//   societyOnlyPaths.includes(`/${req.nextUrl.pathname}`) &&
//   !token.type.includes('society_admin')
// )
