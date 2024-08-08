import Image from "next/image";
import React from "react";
import Button, { buttonClass } from "../ui/Button";
import { FaXTwitter } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import { PiCoffee } from "react-icons/pi";

export default function Header() {
  return (
    <header className="flex max-lg:flex-col items-center justify-between gap-y-4">
      <div className="lg:flex hidden items-center w-[250px]">
        <div className="rounded-full flex items-center w-full p-2 border border-border gap-2">
          <Link href={"https://x.com/mfraiyan"} target="_blank" className={buttonClass.icon}>
            <FaXTwitter size={32} />
          </Link>
          <Link href={"https://t.me/pengaruhbesar"} target="_blank" className={buttonClass.icon}>
            <FaTelegramPlane size={32} />
          </Link>
          <p className="text-xl font-medium  text-foreground/50">
            Contact us!
          </p>
        </div>
      </div>
      <div className="flex justify-center items-center max-lg:w-full">
        <div className="flex items-center justify-center max-lg:w-full gap-5 max-lg:gap-2 px-12 max-lg:py-2 py-5 border-8 max-lg:border-2 max-lg:border-t-0 border-t-0 rounded-b-[92px] max-lg:rounded-b-[52px] border-border">
          <div className="rounded-full bg-border/50 p-2 max-lg:p-1">
            <Image
              alt={"hamster kombat logo"}
              src={"/img/hamster-coin.webp"}
              height={512}
              width={512}
              className="size-[98px] max-lg:size-[62px] border-[4px] max-lg:border-2 border-border rounded-full"
            />
          </div>
          <h1 className="text-[32px] max-lg:text-[26px] font-medium">
            Hamster Kombat
          </h1>
        </div>
      </div>
      <div className="lg:flex hidden items-center w-[250px]">
        <Button className="w-full gap-6">
          Support us! <PiCoffee size={32} />
        </Button>
      </div>
      <div className="flex items-center justify-between lg:hidden w-full">
        <div className="flex items-center">
          <div className="rounded-full flex items-center w-full p-2 border border-border gap-1">
            <Link href={""} target="_blank" className={buttonClass.icon}>
              <FaXTwitter size={20} />
            </Link>
            <Link href={""} target="_blank" className={buttonClass.icon}>
              <FaTelegramPlane size={20} />
            </Link>
            <p className="lg:text-xl font-medium ml-3 text-foreground/50">
              Contact us!
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <Button className="w-full gap-4">
            Support us! <PiCoffee size={24} />
          </Button>
        </div>
      </div>
    </header>
  );
}
