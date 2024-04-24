"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  icon: React.ReactNode;
  title: string;
  href: string;
  className?: string;
}

export const NavLink = (props: NavLinkProps) => {
  const { icon, href, title, className } = props;
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary",
        {
          "bg-muted": pathname === href,
          "text-primary": pathname === href,
        },
        className
      )}
    >
      {icon}
      {title}
    </Link>
  );
};
