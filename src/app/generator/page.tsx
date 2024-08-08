import Generator from "@/components/generator/Generator";

export default function page() {
  return (
    <section className="flex flex-col items-center gap-6 py-6">
      <h1 className="font-bold text-[80px] max-lg:text-5xl leading-none text-center">
        Generate keys
      </h1>
      <Generator />
    </section>
  );
}
