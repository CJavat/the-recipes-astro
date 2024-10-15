/// <reference path="../.astro/types.d.ts" />

import type { User } from "./interface";

declare global {
  namespace App {
    interface Locals {
      isLoggedIn: boolean;
      user: User;
    }
  }
}
