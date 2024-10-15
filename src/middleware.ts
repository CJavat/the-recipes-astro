import { defineMiddleware } from "astro:middleware";
export const prerender = false;
const privateRoutes = ["/dashboard"];
const notAuthenticatedRoutes = ["/auth"];

export const onRequest = defineMiddleware((context, next) => {
  const { url, request, locals, redirect, cookies } = context;

  const token = cookies.get("token")?.value;
  const isLoggedIn = !!token;

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
