import Avatars from "@/components/home/Avatars";
import { games } from "@/lib/data";
import Link from "next/link";

export default function page() {
  const title = Object.keys(games).map((id) => games[parseInt(id)].name);
  return (
    <section className="flex flex-col items-center gap-4 py-6">
      <h1 className="font-bold text-[80px] max-lg:text-5xl leading-none text-center">
        Unlock your inner keys
      </h1>
      <Avatars />
      <p className="text-2xl max-lg:text-lg text-foreground/80 text-center">
        Get free unlimited promo codes for four different games on Hamster
        Kombat playground.
      </p>
      <p className="text-2xl max-lg:text-lg text-foreground/80 max-lg:hidden text-center">
        {title.join(", ")}
      </p>
      <div className="mt-8 w-full flex items-center justify-center max-lg:px-4">
        <Link href={"/generator"} className="button">
          <span className="z-10 w-full h-full flex items-center justify-center">
            Generate now!
          </span>
        </Link>
      </div>
    </section>
  );
}
