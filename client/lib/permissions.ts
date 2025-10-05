// lib/permissions.ts
import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements } from "better-auth/plugins/admin/access";

// Define permissions (resources and actions). Extend defaults for admin/user.
const statement = {
  ...defaultStatements,
  // Add custom resource, e.g., for a "posts" resource
  posts: ["create", "read", "update", "delete"] as const,
} as const;

const ac = createAccessControl(statement);

// Define roles with permissions
export const userRole = ac.newRole({
  // Basic user permissions
  posts: ["read"],
});

export const adminRole = ac.newRole({
  // Full admin permissions (overrides defaults if needed; merge with ac.statements.user for more)
  ...ac.statements.user,
  posts: ["create", "read", "update", "delete"],
  user: ["list", "set-role", "ban", "delete"], // Admin-specific
});

export const moderatorRole = ac.newRole({
  // Custom moderator: Can moderate posts but not full admin
  posts: ["read", "update", "delete"], // No create
  user: ["list"], // Can view users but not manage them
});

// Export the access controller and roles for use in auth config
export { ac, userRole, adminRole, moderatorRole };