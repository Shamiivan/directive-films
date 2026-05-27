import { actionGeneric } from "convex/server";
import { v } from "convex/values";

const action = actionGeneric;

/**
 * Validate the shared admin password against the `ADMIN_PASSWORD` env var
 * set on the Convex deployment (npx convex env set ADMIN_PASSWORD <secret>).
 *
 * Returns true if the submitted value matches, false otherwise. We deliberately
 * compare on the server so the secret never lives in the client bundle.
 *
 * If the env var is not set, the gate fails closed — no password unlocks it,
 * which forces the operator to configure it explicitly.
 */
export const validateAdminPassword = action({
  args: { password: v.string() },
  handler: async (_ctx, args): Promise<boolean> => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected || expected.length === 0) return false;
    return args.password === expected;
  },
});
