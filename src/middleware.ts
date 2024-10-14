import { defineMiddleware } from "astro:middleware";

const privateRoutes = ["/dashboard"];
const notAuthenticatedRoutes = ["/auth"];

export const onRequest = defineMiddleware((context, next) => {
  const { url, request, locals, redirect, cookies } = context;

  console.log(cookies.get("token")?.value);
  const token = cookies.get("token")?.value;

  const isLoggedIn = !!token;

  //TODO: Agregar datos del usuario.
  // const user = ;

  // locals.isLoggedIn = isLoggedIn;
  // if(user) {
  //   locals.user = {

  //   }
  // }

  //TODO: Revisar porque falla si lo descomento
  // if (!isLoggedIn && url.pathname === "/") return redirect("/auth");
  // else if (isLoggedIn && url.pathname === "/") return redirect("/dashboard");

  // if (!isLoggedIn && privateRoutes.includes(url.pathname))
  //   return redirect("/auth");

  // if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname))
  //   return redirect("/dashboard");

  return next();
});
