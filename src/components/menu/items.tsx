import { ReactNode } from "react";

export type MenuItem = {
  label: string | "divider";
  path?: string;
};
export type ActionMenuItem = {
  label: ReactNode | "divider";
  action?: () => void;
};
