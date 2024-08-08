import React from "react";
import { buttonClass } from "../ui/Button";
import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center lg:h-56 h-36">
      <div className="flex items-center">
        <div className="rounded-full flex items-center w-full p-2 border border-border gap-2">
          <Link href={"https://x.com/mfraiyan"} target="_blank" className={buttonClass.icon}>
            <FaXTwitter size={32} />
          </Link>
          <Link href={"https://t.me/pengaruhbesar"} target="_blank" className={buttonClass.icon}>
            <FaTelegramPlane size={32} />
          </Link>
          <Link href={"https://github.com/muhammadfathurraiyan"} target="_blank" className={buttonClass.icon}>
            <FaGithub size={32} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
