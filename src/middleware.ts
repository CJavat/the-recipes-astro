import { defineMiddleware } from "astro:middleware";

const privateRoutes = ["/dashboard"];
const notAuthenticatedRoutes = ["/auth"];

export const onRequest = defineMiddleware((context, next) => {
  const { url, request, locals, redirect } = context;

  console.log({ cookies: request.headers.get("cookies") });

  const token = request.headers
    .get("cookies")
    ?.split(";")
    .find((cookie) => cookie.trim().startsWith("token="));

  const tokenValue = token?.split("=")[1];
  const isLoggedIn = !!tokenValue;

  //TODO: Agregar datos del usuario.
  // const user = ;

  // locals.isLoggedIn = isLoggedIn;
  // if(user) {
  //   locals.user = {

  //   }
  // }

  if (!isLoggedIn && url.pathname === "/") return redirect("/auth");
  else if (isLoggedIn && url.pathname === "/") return redirect("/dashboard");

  if (!isLoggedIn && privateRoutes.includes(url.pathname))
    return redirect("/auth");

  if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname))
    return redirect("/dashboard");

  return next();
});
