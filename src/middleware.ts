// export { auth as middleware } from "@/auth";
import { auth } from "@/auth";

// Or like this if you need to do something here.
export default auth((req) => {
  console.log("Middleware");
  console.log(req.auth); //  { session: { user: { ... } } }
  console.log(req.url); //  /admin
  const isAuthenticated = !!req.auth;
  if (!isAuthenticated && req.nextUrl.pathname === "/admin") {
    return Response.redirect(new URL("/api/auth/signin", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
