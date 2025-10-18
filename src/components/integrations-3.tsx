import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function IntegrationsSection() {
  return (
    <section className="bg-background py-12 md:py-20">
      <div className="mx-auto max-w-5xl px-6 text-center space-y-10">
        {/* Header */}
        <div>
          <h2 className="text-4xl md:text-6xl font-normal">
            We Handle your Business From{" "}
            <span className="text-red-500 text-[4rem] leading-none block">
              ZERO
            </span>
          </h2>
        </div>

        {/* Image area */}
        <div className="bg-muted dark:bg-background/50 border-border/50 mx-auto w-80 md:w-120 rounded-[2rem] border p-2 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)]">
          <div className="bg-background space-y-2 overflow-hidden rounded-[1.5rem] border p-2 shadow-xl dark:bg-white/5 dark:shadow-black dark:backdrop-blur-3xl">
            <Image
              src="/car.jpg"
              alt="Marketing Dashboard"
              width={5000}
              height={3000}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* CTA Text */}
        <div>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Start your{" "}
            <span className="text-primary font-semibold">
              Digital Marketing
            </span>{" "}
            with us!
          </p>
          <Button
            variant="default"
            size="lg"
            className="bg-green-600 hover:bg-green-700"
            asChild
          >
            <Link href="/auth?mode=signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
