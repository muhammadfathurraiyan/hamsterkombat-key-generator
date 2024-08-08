import React from "react";

export const buttonClass: { [key: string]: string } = {
  icon: `p-3 max-lg:p-1 rounded-full bg-border`,
  avatar: `p-3 rounded-full border-[5px] max-lg:border-3 border-background bg-border`,
  generate: `px-3 py-2 rounded-xl bg-gradient-to-r from-secondary to-primary`,
  default: `rounded-full flex items-center justify-center p-4 max-lg:p-3 max-lg:py-2 lg:text-xl font-medium bg-gradient-to-r from-primary via-background via-50% to-primary border border-primary`,
};

export default function Button({
  children,
  variants = "default",
  className,
  type = "button",
  onClick,
}: {
  children: React.ReactNode;
  variants?: string;
  className?: string;
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick && (() => onClick())}
      className={`${buttonClass[variants]}  ${className}`}
      type={type}
    >
      {children}
    </button>
  );
}
