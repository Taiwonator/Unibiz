// pages/api/auth/[...nextauth].js
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { initUrqlClient } from 'next-urql';
import {
  CreatePasswordlessUserMutation,
  LoginCredentialsUser,
} from 'src/graphql/user/mutations.graphql';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  GetUserByEmail,
  GetUserByIdQuery,
} from 'src/graphql/user/queries.graphql';
import dotenv from 'dotenv';

dotenv.config();

type AuthOptions = (
  req: NextApiRequest,
  res: NextApiResponse
) => NextAuthOptions;

export const authOptions: AuthOptions = (req, res) => ({
  secret: process.env.NEXTAUTH_SECRET,
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
      async authorize(credentials, req) {
        const client = initUrqlClient(
          { url: process.env.NEXT_PUBLIC_API_ENDPOINT as string },
          false
        );
        const result = await client
          ?.mutation(LoginCredentialsUser, {
            email: req.body?.email,
            password: req.body?.password,
          })
          .toPromise();

        const returnedJWT = result?.data.loginCredentialsUser.jwt;

        const decodedToken = jwt.decode(returnedJWT, { complete: true });
        const payload: any = decodedToken?.payload;

        if (!returnedJWT) {
          throw new Error('Invalid credentials');
        }

        const expires = new Date(payload.exp * 1000); // Convert from seconds to milliseconds

        res.setHeader(
          'Set-Cookie',
          `custom.access_token=${returnedJWT};path=/;Domain=${
            process.env.NEXT_PUBLIC_API_DOMAIN
          };httpOnly=true;expires=${expires.toUTCString()};SameSite=None;Secure`
        );

        return { ...payload };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        console.log('User signed in with Google:', user);
        const client = initUrqlClient(
          { url: process.env.NEXT_PUBLIC_API_ENDPOINT as string },
          false
        );
        const result = await client
          ?.mutation(CreatePasswordlessUserMutation, {
            email: user.email,
            name: user.name,
          })
          .toPromise();
        const returnedJWT = result?.data.createPasswordlessUser.jwt;
        const decodedToken = jwt.decode(returnedJWT, { complete: true });
        const payload: any = decodedToken?.payload;
        if (!returnedJWT) {
          throw new Error('Invalid credentials');
        }
        const expires = new Date(payload.exp * 1000); // Convert from seconds to milliseconds

        res.setHeader(
          'Set-Cookie',
          `custom.access_token=${returnedJWT};path=/;Domain=${
            process.env.NEXT_PUBLIC_API_DOMAIN
          };httpOnly=true;expires=${expires.toUTCString()};SameSite=None;Secure`
        );
        return true;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const client = initUrqlClient(
          { url: process.env.NEXT_PUBLIC_API_ENDPOINT as string },
          false
        );
        const result = await client
          ?.query(GetUserByEmail, {
            email: user.email,
          })
          .toPromise();

        const userId = result?.data.FindUserByEmail.id;
        return { ...token, ...user, googleId: user.id, id: userId };
      } else {
        return { ...token };
      }
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
  events: {
    async signOut() {
      // res.setHeader(
      //   'Set-Cookie',
      //   `custom.access_token=deleted;path=/;Domain=localhost;httpOnly=true;Max-Age=0`
      // );
      res.setHeader(
        'Set-Cookie',
        `custom.access_token=deleted;path=/;Domain=${process.env.NEXT_PUBLIC_API_DOMAIN};httpOnly=true;expires=Max-Age=0;SameSite=None;Secure`
      );
    },
  },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
  },
});

// export default NextAuth(authOptions);

const auth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, authOptions(req, res));
};

export default auth;
