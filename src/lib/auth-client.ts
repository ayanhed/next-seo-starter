import { createAuthClient } from "better-auth/react";
import { nextCookies } from "better-auth/next-js";
import { anonymousClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  plugins: [nextCookies(), anonymousClient()],
});
