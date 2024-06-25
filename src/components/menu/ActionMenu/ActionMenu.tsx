/// <reference types="vite-plugin-svgr/client" />
import Rectangle from "@/assets/rectangle18.svg?react";
import Typography from "@components/typography/Typography";
import React from "react";
import ReactDOM from "react-dom";
import { ActionMenuItem } from "../items";
import { Link } from "@tanstack/react-router";

interface ActionMenuProps {
  items: ActionMenuItem[];
  isOpen: boolean;
  target: HTMLDivElement | null;
}

const ActionMenu: React.FC<ActionMenuProps> = React.memo(
  ({ items, isOpen, target }: ActionMenuProps) => {
    return isOpen
      ? ReactDOM.createPortal(
          <div className="pointer-events-none relative z-50 ">
            <div className="pointer-events-auto absolute right-0 top-4">
              <div className=" rounded-md shadow-lg bg-mono/basic-10 border border-mono/basic-8 p-1">
                {items.map((item, i) =>
                  item.label !== "divider" ? (
                    <div
                      onClick={item.action}
                      className=" rounded-md hover:bg-mono/basic-13 focus:bg-mono/basic-14 focus:text-mono/basic-1 hover:cursor-pointer"
                      key={i}
                    >
                      {item.label}
                    </div>
                  ) : (
                    <Typography key={i} className="p-1">
                      <Rectangle />
                    </Typography>
                  )
                )}
              </div>
            </div>
          </div>,
          target!
        )
      : null;
  }
);

export default ActionMenu;
