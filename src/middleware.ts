import { defineMiddleware } from "astro:middleware";
import type { User } from "./interface";
const privateRoutes = ["/dashboard"];
const notAuthenticatedRoutes = ["/auth"];

export const onRequest = defineMiddleware((context, next) => {
  const { url, locals, redirect, cookies } = context;

  const token = cookies.get("token")?.value;
  const user = cookies.get("user")?.value;
  const isLoggedIn = !!token;

  if (user) {
    locals.user = JSON.parse(user);
  }
  locals.isLoggedIn = isLoggedIn;

  if (!isLoggedIn) {
    if (url.pathname === "/" || privateRoutes.includes(url.pathname)) {
      return redirect("/auth");
    }
  } else {
    if (url.pathname === "/" || notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect("/dashboard");
    }
  }

  return next();
});
