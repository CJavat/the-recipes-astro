import { defineAction } from "astro:actions";
import { z } from "astro/zod";

export const login = defineAction({
  accept: "form",
  input: z.object({
    email: z.string(),
    password: z.string(),
  }),
  handler: async ({ email, password }, context) => {
    return { msg: "Method not implemeted" };
    // TODO: TERMINARLO
  },
});
