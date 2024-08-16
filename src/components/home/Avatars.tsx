import Image from "next/image";
import Button from "../ui/Button";
import { games } from "@/lib/data";

export default function Avatars() {
  const data = Object.keys(games);
  return (
    <div className="flex -space-x-6 my-2">
      {data.map((key) => {
        const id = parseInt(key);
        return (
          <Button variants={"avatar"} key={id}>
            <Image
              alt={games[id].name}
              src={games[id].img}
              height={512}
              width={512}
              className="rounded-lg size-8 max-lg:size-7"
            />
          </Button>
        );
      })}
    </div>
  );
}
