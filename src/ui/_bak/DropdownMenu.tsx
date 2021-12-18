import { Menu } from "@headlessui/react";
import React from "react";

interface DropdownMenuProps {
  label: string;
  className?: string;
}

export const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  className = "button secondary md",
  label,
}) => {
  return (
    <Menu as="div" className="inline-block relative text-left">
      <div>
        <Menu.Button className={className}>
          {label}{" "}
          <span aria-hidden className="ml-2">
            ↓
          </span>
        </Menu.Button>
      </div>

      <Menu.Items className="absolute left-0 z-10 p-1 mt-2 w-56 bg-gray-50 rounded-md divide-y divide-gray-100 focus:outline-none ring-1 ring-black shadow-lg origin-top-right ring-opacity-5">
        {children}
      </Menu.Items>
    </Menu>
  );
};
