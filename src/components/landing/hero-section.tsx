import Image from "next/image";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { HeroHeader } from "@/components/landing/header";
import { LogoCloud } from "@/components/landing/logo-cloud";
import { GetStartedButton } from "@/components/ui/get-started-button";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring" as const,
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <div className=" w-full bg-[#f8fafc] relative">
        {/* Top Fade Dot Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: "#ffffff",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.15) 1px, transparent 0)",
            backgroundSize: "20px 20px",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
          }}
        />
        <main className="overflow-hidden [--color-primary-foreground:var(--color-white)] [--color-primary:var(--color-green-600)]">
          <section>
            <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 lg:pt-40">
              <div className="relative z-10 mx-auto max-w-4xl text-center">
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className=" text-4xl md:text-6xl font-normal"
                >
                  Digital Marketing Solutions
                </TextEffect>
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-6 max-w-2xl text-lg"
                >
                  Grow your business with us. Digital Marketing is easy and
                  effective.
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-10"
                >
                  <GetStartedButton>
                    <span className="text-lg px-2">Get Started</span>
                  </GetStartedButton>
                  <div className="relative">
                    <div className="absolute max-[700px]:hidden left-10 min-[800px]:left-25 top-15">
                      <Image
                        src="/Stefan.jpeg"
                        alt="Marketing Dashboard"
                        width={130}
                        height={130}
                        className="rounded-lg w-24 h-24 "
                      />
                    </div>
                    <div
                      aria-hidden
                      className="bg-radial from-primary/50 dark:from-primary/25 relative mx-auto mt-20 max-w-2xl to-transparent to-55% text-left"
                    >
                      <div className="bg-muted dark:bg-background/50 border-border/50 mx-auto w-80 translate-x-4 rounded-[2rem] border p-2 backdrop-blur-3xl [mask-image:linear-gradient(to_bottom,#000_50%,transparent_90%)]">
                        <div className="bg-background space-y-2 overflow-hidden rounded-[1.5rem] border p-2 shadow-xl dark:bg-white/5 dark:shadow-black dark:backdrop-blur-3xl">
                          <Image
                            src="/social"
                            alt="App Mockup"
                            width={320}
                            height={640}
                            className="w-full rounded-[1rem] bg-gray-200 object-cover"
                          />

                          <div className="bg-muted rounded-[1rem] p-4 pb-16 dark:bg-white/5"></div>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] mix-blend-overlay [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] dark:opacity-5"></div>
                    </div>
                    <div className="absolute right-2  max-[700px]:hidden md:right-15 -top-10">
                      <Image
                        src="/growth.jpg"
                        alt="Marketing Dashboard"
                        width={130}
                        height={130}
                        className="rounded-lg w-24 h-24 "
                      />
                    </div>
                  </div>
                </AnimatedGroup>
              </div>
            </div>
          </section>
          <LogoCloud />
        </main>
      </div>
    </>
  );
}
