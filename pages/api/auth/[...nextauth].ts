import axios from "axios";
import { NextAuthOptions, User, Account, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
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
    async jwt({ token, user, account }: any) {
      if (account && user) {
        token.accessToken = account.accessToken;
        token.accessTokenExpires = account.expires_at;
        token.refreshToken = account.refreshToken;
        token.user = user;

        const nowTime = Math.round(Date.now() / 1000);
        const shouldRefreshTime =
          (token.accessTokenExpires as number) - 10 * 60 - nowTime;
        if (shouldRefreshTime < 0) {
          return token;
        }
        return refreshAccessToken(token);
      }

      if (account) {
        return {
          accessToken: account.accessToken,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refreshToken,
          user,
        };
      }

      return token;
    },

    async session({ session, token, user }) {
      session.user = token.user as User;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.accessTokenExpires = token.accessTokenExpires;
      session.error = token.error;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  redirect: async (url: any, baseUrl: any) =>
    url.startsWith(baseUrl) ? Promise.resolve(url) : Promise.resolve(baseUrl),
};

async function refreshAccessToken(token: JWT) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/renew`;

    const params = {
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    };

    const headers = {
      "Content-Type": "application/x-www-form-urlencoded",
    };

    const res = await axios.post(url, params.toString(), {
      headers,
      auth: {
        username: process.env.KAKAO_CLIENT_ID!,
        password: process.env.KAKAO_CLIENT_SECRET!,
      },
    });

    const refreshedToken = await res.data;

    if (res.status !== 200) {
      throw refreshedToken;
    }
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires:
        Math.round(Date.now() / 1000) + refreshedToken.expires_in,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth(authOptions);
