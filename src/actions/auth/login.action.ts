import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const login = defineAction({
  accept: "form",
  input: z.object({
    email: z.string(),
    password: z.string(),
  }),
  handler: async ({ email, password }, context) => {
    try {
      const response = await fetch(`${import.meta.env.API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (data && data.token) {
        context.cookies.set("token", data.token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          path: "/",
          // secure: true, // Comentar esta línea si no estás en HTTPS
          // httpOnly: true, // Comentar si necesitas acceso desde JavaScript
        });
      }

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
});

//
