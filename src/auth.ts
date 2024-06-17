import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
// Your own logic for dealing with plaintext password strings; be careful!
// import { saltAndHashPassword } from "@/utils/password";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials);
        let user = null;

        // logic to salt and hash password
        // const pwHash = saltAndHashPassword(credentials.password);

        // logic to verify if user exists
        // user = await getUserFromDb(credentials.email, pwHash)
        user = {
          id: "1",
          name: "Cobroke Admin",
          email: "admin@cobroke.com",
          testabc: "test",
        };

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        // return user object with the their profile data
        return user;
      },
    }),
  ],
  // basePath: "/auth",
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ request, auth }) {
      const { pathname } = request.nextUrl;
      if (pathname === "/auth/signin") {
        return !!auth;
      }
      return true;
    },
    // session: async ({ session, user }) => {

    //   return session;
    // },
  },
});

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: number;
//       name: string;
//       email: string;
//       testabc: string;
//     } & DefaultSession["user"];
//   }
// }
