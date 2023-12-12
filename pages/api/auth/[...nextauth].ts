import { NextAuthOptions, User } from "next-auth";
import NextAuth from "next-auth/next";

import KakaoProvider from "next-auth/providers/kakao";

export const authOptions: NextAuthOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires: Date.now() + 1000 * 60 * 60 * 24 * 30,
          refreshToken: account.refreshToken,
          user,
        };
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as User;
      session.accessToken = token.accessToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      return session;
    },
  },
};

export default NextAuth(authOptions);
