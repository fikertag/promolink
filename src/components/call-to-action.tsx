import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-16 md:py-32 bg-muted-foreground/30">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Start Building
          </h2>
          <p className="mt-4">
            Whether you're a business looking to grow, an influencer wanting to
            monetize your audience.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700"
            >
              <Link href="/auth?mode=signup">
                <span>Get Started</span>
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="hover:bg-gray-100"
            >
              <Link href="/auth?mode=signin">
                <span>Login</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
