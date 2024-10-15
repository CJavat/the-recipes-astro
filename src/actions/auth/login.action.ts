import { ActionError, defineAction } from "astro:actions";
import { z } from "astro/zod";
import type { User } from "../../interface";

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
      const user = (await response.json()) as User;

      if ("message" in user) {
        throw new Error(
          Array.isArray(user.message) ? user.message[0] : user.message
        );
      }

      context.cookies.set("user", user, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        path: "/",
      });
      context.cookies.set("token", user.token, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        path: "/",
      });

      return user;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        console.log(error.message);
        throw new Error(error.message);
      }
      throw new Error(error as string);
    }
  },
});

//
