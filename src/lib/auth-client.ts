import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "better-auth/client/plugins";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { adminClient } from "better-auth/client/plugins";

import type { auth } from "./auth"; // Import your server-side auth configuration

// Create the auth client with additional fields inference
export const authClient = createAuthClient({
  plugins: [
    adminClient(),
    passkeyClient(), // Add the Passkey plugin
    inferAdditionalFields<typeof auth>(), // Infer additional fields from the server-side auth configuration
  ],
});

// Export the auth client methods
export const { signIn, signUp, signOut, useSession } = authClient;
