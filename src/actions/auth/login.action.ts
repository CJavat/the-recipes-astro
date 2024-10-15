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

      // En el método de inicio de sesión
      if (data && data.token) {
        context.cookies.set("token", data.token, {
          maxAge: 60 * 60 * 24 * 7,
          httpOnly: true,
          path: "/",
        });
        console.log("Cookie establecida:", data.token);
      }

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
});

//
