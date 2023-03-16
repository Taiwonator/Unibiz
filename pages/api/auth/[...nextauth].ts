// pages/api/auth/[...nextauth].js
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { initUrqlClient } from 'next-urql';
import { LoginUser } from 'src/graphql/user/mutations.graphql';
import jwt from 'jsonwebtoken';

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    CredentialsProvider({
      name: 'Custom',
      type: 'credentials',
      credentials: {},
      async authorize(_, req) {
        const client = initUrqlClient({ url: 'http://localhost:4000' }, false);
        const result = await client
          ?.mutation(LoginUser, {
            email: req.body?.email,
            password: req.body?.password,
          })
          .toPromise();

        const returnedJWT = result?.data.loginUser.jwt;
        const decodedToken = jwt.decode(returnedJWT, { complete: true });
        const payload: any = decodedToken?.payload;

        if (!returnedJWT) {
          throw new Error('Invalid credentials');
        }

        return { ...payload };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = {
        ...session.user,
        ...token,
      };

      return { ...session };
    },
  },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
};

export default NextAuth(authOptions);
