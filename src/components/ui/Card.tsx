import Image from "next/image";
import Button from "./Button";

type Props = {
  title: string;
  src: string;
  id: number;
  action: (data: FormData) => Promise<void>;
};

export default function Card({ title, src, id, action }: Props) {
  return (
    <div className="rounded-xl bg-gradient-to-b from-border to-border/90 w-full p-6 border-l-secondary border-l-[5px]">
      <Image
        alt={"data.alt"}
        src={src}
        height={512}
        width={512}
        className="rounded-lg w-full"
        priority
      />
      <h2 className="text-2xl font-medium my-2">{title}</h2>
      <p className="text-lg text-foreground/80">
        Get all four promo codes for {title}.
      </p>
      <form action={action} className="mt-4">
        <input type="hidden" value={id} name="id" />
        <Button variants="generate" type="submit">
          Generate
        </Button>
      </form>
    </div>
  );
}
