import { useLocation } from "react-router";

export function useMenuBasePath(defaultRole = "hr") {
  const { pathname } = useLocation();
  const roleFromPath = pathname.match(/^\/dashboard\/([^/]+)/)?.[1];
  const role = roleFromPath || defaultRole;

  return `/dashboard/${role}/menu`;
}
