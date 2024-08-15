import Image from "next/image";
import Button from "../ui/Button";

export default function Avatars() {
  const icons = [
    { id: 1, src: "/img/cc2.png", alt: "Chain Cube 2048" },
    { id: 2, src: "/img/mca.png", alt: "My Clone Army" },
    { id: 3, src: "/img/r3d.png", alt: "Riding Extreme 3D" },
    { id: 4, src: "/img/tm.png", alt: "Train Miner" },
    { id: 5, src: "/img/ma.png", alt: "Merge Away!" },
  ];
  return (
    <div className="flex -space-x-6 my-2">
      {icons.map((data) => (
        <Button variants={"avatar"} key={data.id}>
          <Image
            alt={data.alt}
            src={data.src}
            height={512}
            width={512}
            className="rounded-lg size-8 max-lg:size-7"
          />
        </Button>
      ))}
    </div>
  );
}
